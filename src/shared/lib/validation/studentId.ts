import { z } from "zod";

export const studentIdSchema = z
  .string()
  .trim()
  .regex(/^\d{8}$/, "학번 8자리를 숫자로 입력해주세요");

export function formatStudentId(value: string) {
  return value.replace(/\D/g, "").slice(0, 8);
}

export function isValidStudentId(studentId: string) {
  return studentIdSchema.safeParse(studentId).success;
}
