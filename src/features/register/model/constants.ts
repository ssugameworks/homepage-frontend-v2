import type { RegisterForm } from "./types";

export const INITIAL_REGISTER_FORM: RegisterForm = {
  name: "",
  phone: "",
  studentId: "",
  privacyConsent: false,
  paymentStatus: null,
  paymentDate: "",
  turnstileToken: "",
};

export const PAYMENT_STATUS_OPTIONS = ["입금 완료 했습니다", "군휴학생입니다"] as const;

export const PAYMENT_AMOUNT_TEXT = "납부 금액: 20,000원";
export const PAYMENT_ACCOUNT_TEXT = "입금 계좌: 신한은행 110619446488 (예금주: 박서영)";
