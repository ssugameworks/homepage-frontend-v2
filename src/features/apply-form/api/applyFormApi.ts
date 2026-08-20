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

/** 학번이 가입 신청 DB에 존재하는지 확인한다 — 가입 신청을 완료한 사람만 활동에 신청할 수 있다. */
export function checkMembership(studentId: string): Promise<{ exists: boolean }> {
  return apiGet<{ exists: boolean }>(
    `/register/check?studentId=${encodeURIComponent(studentId)}`,
    "가입 여부를 확인하지 못했어요"
  );
}
