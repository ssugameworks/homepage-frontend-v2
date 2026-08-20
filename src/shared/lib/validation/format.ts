import { z } from "zod";

/** 010 + 8자리 (총 11자리 숫자) */
export const phoneSchema = z
  .string()
  .transform((phone) => phone.replace(/\D/g, ""))
  .pipe(z.string().regex(/^010\d{8}$/, "올바른 휴대폰 번호를 입력해주세요"));

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

export const emailSchema = z.string().trim().pipe(z.email("올바른 이메일을 입력해주세요"));

export function isValidPhone(phone: string) {
  return phoneSchema.safeParse(phone).success;
}

export function isValidUrl(url: string) {
  return urlSchema.safeParse(url).success;
}

export function isValidEmail(email: string) {
  return emailSchema.safeParse(email).success;
}
