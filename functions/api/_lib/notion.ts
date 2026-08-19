import dayjs, { type Dayjs } from "dayjs";
import utc from "dayjs/plugin/utc";

import type { KVNamespace } from "./lock";

dayjs.extend(utc);

export type Env = {
  NOTION_TOKEN: string;
  NOTION_ACTIVITY_DATA_SOURCE_ID: string;
  NOTION_RESPONSE_DATA_SOURCE_ID: string;
  NOTION_REGISTER_DATA_SOURCE_ID: string;
  TURNSTILE_SECRET_KEY: string;
  SUBMIT_LOCKS: KVNamespace;
};

const NOTION_VERSION = "2025-09-03";
const NOTION_API = "https://api.notion.com/v1";

export type NotionProperties = Record<string, unknown>;
export type NotionPage = { id: string; properties: NotionProperties };

function notionHeaders(env: Env) {
  return {
    Authorization: `Bearer ${env.NOTION_TOKEN}`,
    "Notion-Version": NOTION_VERSION,
    "Content-Type": "application/json",
  };
}

async function notionFetch(env: Env, path: string, init?: RequestInit) {
  const res = await fetch(`${NOTION_API}${path}`, { ...init, headers: notionHeaders(env) });
  if (!res.ok) {
    throw new Error(`Notion API ${path} failed: ${res.status} ${await res.text()}`);
  }
  return res.json();
}

export function queryDataSource(
  env: Env,
  dataSourceId: string,
  body: { filter?: unknown; sorts?: unknown[] }
): Promise<{ results: NotionPage[] }> {
  return notionFetch(env, `/data_sources/${dataSourceId}/query`, {
    method: "POST",
    body: JSON.stringify(body),
  });
}

/** Steps live in a database nested inside the activity page — find it and return its queryable data source id. */
export async function findChildDataSourceId(env: Env, pageId: string): Promise<string | null> {
  const children = await notionFetch(env, `/blocks/${pageId}/children?page_size=50`);
  const childDb = (children as { results: { id: string; type: string }[] }).results.find(
    (block) => block.type === "child_database"
  );
  if (!childDb) return null;

  const database = await notionFetch(env, `/databases/${childDb.id}`);
  const dataSources = (database as { data_sources: { id: string }[] }).data_sources;
  return dataSources[0]?.id ?? null;
}

export function createPage(
  env: Env,
  dataSourceId: string,
  properties: NotionProperties
): Promise<NotionPage> {
  return notionFetch(env, "/pages", {
    method: "POST",
    body: JSON.stringify({ parent: { data_source_id: dataSourceId }, properties }),
  });
}

export function updatePage(
  env: Env,
  pageId: string,
  properties: NotionProperties
): Promise<NotionPage> {
  return notionFetch(env, `/pages/${pageId}`, {
    method: "PATCH",
    body: JSON.stringify({ properties }),
  });
}

export function richText(name: string, page: NotionPage): string {
  const prop = page.properties[name] as { rich_text?: { plain_text: string }[] } | undefined;
  return (prop?.rich_text ?? []).map((t) => t.plain_text).join("");
}

export function title(name: string, page: NotionPage): string {
  const prop = page.properties[name] as { title?: { plain_text: string }[] } | undefined;
  return (prop?.title ?? []).map((t) => t.plain_text).join("");
}

export function select(name: string, page: NotionPage): string | null {
  const prop = page.properties[name] as { select?: { name: string } | null } | undefined;
  return prop?.select?.name ?? null;
}

export function checkbox(name: string, page: NotionPage): boolean {
  const prop = page.properties[name] as { checkbox?: boolean } | undefined;
  return prop?.checkbox ?? false;
}

export function numberProp(name: string, page: NotionPage): number {
  const prop = page.properties[name] as { number?: number | null } | undefined;
  return prop?.number ?? 0;
}

export function dateRange(name: string, page: NotionPage): { start: string; end: string | null } {
  const prop = page.properties[name] as
    | { date?: { start: string; end: string | null } | null }
    | undefined;
  return { start: prop?.date?.start ?? "", end: prop?.date?.end ?? null };
}

export function formatDateRange(range: { start: string; end: string | null }): string {
  if (!range.start) return "";
  const start = dayjs(range.start).format("YYYY.MM.DD");
  const end = range.end ? dayjs(range.end).format("YYYY.MM.DD") : start;
  return `${start} ~ ${end}`;
}

/** 인스턴트/날짜 문자열을 KST(UTC+9) 기준 캘린더 날짜(YYYY-MM-DD)로 정규화한다. */
function kstDateString(value: string | Dayjs = dayjs.utc()): string {
  return dayjs.utc(value).add(9, "hour").format("YYYY-MM-DD");
}

/**
 * 신청기간(있으면) 안에 있는지 검사한다 — 시작일 이전, 종료일 이후 모두 막는다.
 * now/range 모두 KST 캘린더 날짜로 정규화한 뒤 비교한다 — 서버(UTC)와 신청기간(KST) 기준이
 * 달라 시작일이 최대 9시간 늦게 열리거나 종료일 이후에도 최대 9시간 신청이 허용되는 것을 막는다.
 */
export function isWithinDateRange(
  range: { start: string; end: string | null },
  now: string | Dayjs = dayjs.utc()
): boolean {
  if (!range.start) return true;
  const today = kstDateString(now);
  if (today < kstDateString(range.start)) return false;
  if (!range.end) return true;
  return today <= kstDateString(range.end);
}

const RICH_TEXT_CHUNK_SIZE = 2000;
const RICH_TEXT_MAX_ITEMS = 100;

/** Notion rich_text 속성은 항목당 2000자, 배열 최대 100개 제한이 있다 — 길면 나눠 담고, 그래도 넘치면 null. */
export function toRichText(content: string): { text: { content: string } }[] | null {
  const chunks: string[] = [];
  for (let i = 0; i < content.length; i += RICH_TEXT_CHUNK_SIZE) {
    chunks.push(content.slice(i, i + RICH_TEXT_CHUNK_SIZE));
  }
  if (chunks.length > RICH_TEXT_MAX_ITEMS) return null;
  return chunks.map((text) => ({ text: { content: text } }));
}

/** Notion date 프로퍼티는 시간까지 포함할 수 있다 — 날짜만 남긴 YYYY-MM-DD로 자른다. */
export function dateOnly(iso: string): string {
  return iso ? (iso.split("T")[0] ?? "") : "";
}

/** files & media 프로퍼티의 첫 번째 파일 URL. Notion에 업로드된 파일의 URL은 약 1시간 후 만료된다. */
export function filesUrl(name: string, page: NotionPage): string {
  const prop = page.properties[name] as
    | { files?: { file?: { url: string }; external?: { url: string } }[] }
    | undefined;
  const first = prop?.files?.[0];
  return first?.file?.url ?? first?.external?.url ?? "";
}

/** Returns today's calendar date in KST (UTC+9) as YYYY-MM-DD, regardless of server-local timezone. */
function todayKstDateString(): string {
  return kstDateString();
}

export async function findActivityBySlug(env: Env, slug: string): Promise<NotionPage | null> {
  const { results } = await queryDataSource(env, env.NOTION_ACTIVITY_DATA_SOURCE_ID, {
    filter: {
      and: [
        { property: "slug", rich_text: { equals: slug } },
        { property: "상태", select: { does_not_equal: "초안" } },
      ],
    },
  });
  const activity = results[0];
  if (!activity) return null;

  const applyEnd = dateRange("신청기간", activity).end;
  if (applyEnd && applyEnd.split("T")[0]! < todayKstDateString()) {
    return null;
  }
  return activity;
}
