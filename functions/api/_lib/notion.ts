export type Env = {
  NOTION_TOKEN: string;
  NOTION_ACTIVITY_DATA_SOURCE_ID: string;
  NOTION_RESPONSE_DATA_SOURCE_ID: string;
  NOTION_REGISTER_DATA_SOURCE_ID: string;
  TURNSTILE_SECRET_KEY: string;
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
  const toDots = (iso: string) => (iso ? iso.split("T")[0]?.replaceAll("-", ".") : "");
  const start = toDots(range.start);
  const end = range.end ? toDots(range.end) : start;
  return start ? `${start} ~ ${end}` : "";
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
  return results[0] ?? null;
}
