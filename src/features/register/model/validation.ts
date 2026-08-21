import { z } from "zod";
import type { RegisterForm } from "./types";

export {
  emailSchema,
  formatStudentId,
  isValidEmail,
  isValidPhone,
  isValidStudentId,
  isValidUrl,
  phoneSchema,
  studentIdSchema,
  urlSchema,
} from "@/shared/lib";

export function validateRegisterField(
  _field: keyof RegisterForm,
  _value: unknown
): { ok: boolean; message?: string } {
  return { ok: true };
}

export const nameSchema = z.string().trim().min(2, "이름을 2자 이상 입력해주세요");

export const motivationSchema = z
  .string()
  .trim()
  .min(50, "지원 계기를 최소 50자 이상 작성해주세요")
  .max(150, "지원 계기는 150자 이내로 작성해주세요");

export function isValidName(name: string) {
  return nameSchema.safeParse(name).success;
}

export function isValidMotivation(text: string) {
  return motivationSchema.safeParse(text).success;
}
