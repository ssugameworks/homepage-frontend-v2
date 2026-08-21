import dayjs from "dayjs";

export function isValidPaymentDate(value: string) {
  return /^\d{4}\/\d{2}\/\d{2}$/.test(value) && dayjs(value, "YYYY/MM/DD", true).isValid();
}

export function toIsoDate(value: string) {
  return dayjs(value, "YYYY/MM/DD", true).format("YYYY-MM-DD");
}

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
