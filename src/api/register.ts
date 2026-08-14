import type { RegisterForm } from "@/components/register";

export async function submitRegisterForm(values: RegisterForm): Promise<void> {
  const { turnstileToken, ...rest } = values;
  const res = await fetch("/api/register/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...rest, turnstileToken }),
  });
  if (!res.ok) {
    const body = await res.json().catch(() => null);
    throw new Error(body?.error ?? "제출에 실패했어요");
  }
}
