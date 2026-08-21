import { z } from "zod";
import type { RegisterForm } from "./types";

export {
  emailSchema,
  formatPaymentDate,
  formatStudentId,
  isValidEmail,
  isValidPaymentDate,
  isValidPhone,
  isValidStudentId,
  isValidUrl,
  paymentDateSchema,
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

export function isValidName(name: string) {
  return nameSchema.safeParse(name).success;
}
