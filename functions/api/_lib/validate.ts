export function isHttpUrl(value: string) {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

/** 010 + 8자리 숫자(하이픈 등 구분자 무관) */
export function isValidPhone(value: string) {
  return /^010\d{8}$/.test(value.replace(/\D/g, ""));
}
