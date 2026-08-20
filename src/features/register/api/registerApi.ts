import { apiPost } from "@/shared/api/client";
import type { RegisterForm } from "../model/types";

export async function submitRegisterForm(values: RegisterForm): Promise<void> {
  const { turnstileToken, ...rest } = values;
  await apiPost("/register/submit", { ...rest, turnstileToken }, "제출에 실패했어요");
}
