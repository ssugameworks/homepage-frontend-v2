import { z } from "zod";
import type { RegisterForm } from "./types";

export function validateRegisterField(
  _field: keyof RegisterForm,
  _value: unknown
): { ok: boolean; message?: string } {
  return { ok: true };
}

export const nameSchema = z.string().trim().min(2, "이름을 2자 이상 입력해주세요");

/** 010 + 8자리 (총 11자리 숫자) */
export const phoneSchema = z
  .string()
  .transform((phone) => phone.replace(/\D/g, ""))
  .pipe(z.string().regex(/^010\d{8}$/, "올바른 휴대폰 번호를 입력해주세요"));

export const studentIdSchema = z
  .string()
  .trim()
  .regex(/^\d{8}$/, "학번 8자리를 숫자로 입력해주세요");

export const motivationSchema = z
  .string()
  .trim()
  .min(50, "지원 계기를 최소 50자 이상 작성해주세요")
  .max(150, "지원 계기는 150자 이내로 작성해주세요");

export const urlSchema = z
  .string()
  .trim()
  .refine(
    (url) => {
      try {
        const parsed = new URL(url);
        return parsed.protocol === "http:" || parsed.protocol === "https:";
      } catch {
        return false;
      }
    },
    { message: "올바른 URL을 입력해주세요" }
  );

export const emailSchema = z.string().trim().pipe(z.email());

export function isValidName(name: string) {
  return nameSchema.safeParse(name).success;
}

export function isValidPhone(phone: string) {
  return phoneSchema.safeParse(phone).success;
}

export function isValidStudentId(studentId: string) {
  return studentIdSchema.safeParse(studentId).success;
}

export function isValidMotivation(text: string) {
  return motivationSchema.safeParse(text).success;
}

export function isValidUrl(url: string) {
  return urlSchema.safeParse(url).success;
}

export function isValidEmail(email: string) {
  return emailSchema.safeParse(email).success;
}
