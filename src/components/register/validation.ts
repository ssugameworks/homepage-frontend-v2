import type { RegisterForm } from "./types";

/** Stub for future Notion / validation API integration. */
export function validateRegisterField(
  _field: keyof RegisterForm,
  _value: unknown
): { ok: boolean; message?: string } {
  return { ok: true };
}

export function isValidName(name: string) {
  return name.trim().length >= 2;
}

/** 010 + 8자리 (총 11자리 숫자) */
export function isValidPhone(phone: string) {
  const digits = phone.replace(/\D/g, "");
  return /^010\d{8}$/.test(digits);
}

export function isValidMotivation(text: string) {
  const trimmed = text.trim();
  return trimmed.length >= 50 && trimmed.length <= 150;
}

export function isValidUrl(url: string) {
  if (!url.trim()) return false;
  try {
    const parsed = new URL(url.trim());
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
}
