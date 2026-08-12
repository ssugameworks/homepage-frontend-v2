import type { FieldKind, FieldSpec } from "@/components/forms";

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

export async function fetchFormSchema(slug: string): Promise<NotionFormSchema> {
  const res = await fetch(`/api/forms/${encodeURIComponent(slug)}`);
  if (!res.ok) {
    const body = await res.json().catch(() => null);
    throw new Error(body?.error ?? `폼을 찾을 수 없어요: ${slug}`);
  }
  return res.json();
}

export async function submitFormAnswers(
  slug: string,
  input: { studentId: string; answers: Record<string, string | string[]>; turnstileToken: string }
): Promise<void> {
  const res = await fetch(`/api/forms/${encodeURIComponent(slug)}/submit`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  if (!res.ok) {
    const body = await res.json().catch(() => null);
    throw new Error(body?.error ?? "제출에 실패했어요");
  }
}
