import dayjs from "dayjs";
import { z } from "zod";

export const paymentDateSchema = z
  .string()
  .trim()
  .regex(/^\d{4}\/\d{2}\/\d{2}$/, "납부 날짜를 YYYY/MM/DD 형식으로 입력해주세요")
  .refine((value) => dayjs(value, "YYYY/MM/DD", true).isValid(), "존재하지 않는 날짜예요");

export function formatPaymentDate(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 8);
  const year = digits.slice(0, 4);
  const month = digits.slice(4, 6);
  const day = digits.slice(6, 8);
  return [year, month, day].filter(Boolean).join("/");
}

export function isValidPaymentDate(value: string) {
  return paymentDateSchema.safeParse(value).success;
}
