import type { RegisterForm } from "@/components/register";
import { apiPost } from "./client";

export async function submitRegisterForm(values: RegisterForm): Promise<void> {
  const { turnstileToken, ...rest } = values;
  await apiPost("/register/submit", { ...rest, turnstileToken }, "제출에 실패했어요");
}
