import type { FieldKind, FieldSpec } from "@/components/forms";
import { apiGet, apiPost } from "./client";

export type NotionFieldSpec = FieldSpec & { kind: FieldKind };

export type NotionActivityInfo = {
  applyPeriod: string;
  activityPeriod: string;
  location: string;
  description: string;
};

export type NotionFormSchema = {
  slug: string;
  title: string;
  activity: NotionActivityInfo;
  fields: NotionFieldSpec[];
};

export function fetchFormSchema(slug: string): Promise<NotionFormSchema> {
  return apiGet<NotionFormSchema>(
    `/forms/${encodeURIComponent(slug)}`,
    `폼을 찾을 수 없어요: ${slug}`
  );
}

export async function submitFormAnswers(
  slug: string,
  input: { studentId: string; answers: Record<string, string | string[]>; turnstileToken: string }
): Promise<void> {
  await apiPost(`/forms/${encodeURIComponent(slug)}/submit`, input, "제출에 실패했어요");
}
