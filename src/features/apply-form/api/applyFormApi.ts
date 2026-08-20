import { apiGet, apiPost } from "@/shared/api";
import type { NotionFormSchema } from "../model/types";

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
