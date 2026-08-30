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

export const PAYMENT_COMPLETED = "입금 완료 했습니다";
export const MILITARY_LEAVE = "군휴학생입니다";

export const PAYMENT_AMOUNT_TEXT = "납부 금액: 20,000원";

const PAYMENT_BANK_NAME = "신한은행";
const PAYMENT_ACCOUNT_NUMBER = "110619446488";
const PAYMENT_ACCOUNT_HOLDER_NAME = "박*영";

export const PAYMENT_ACCOUNT_TEXT = `입금 계좌: ${PAYMENT_BANK_NAME} ${PAYMENT_ACCOUNT_NUMBER}`;
export const PAYMENT_ACCOUNT_HOLDER_TEXT = `예금주: ${PAYMENT_ACCOUNT_HOLDER_NAME}`;
/** 복사 버튼이 클립보드에 넣는 값 — "은행 계좌번호 예금주" 형태로 붙여넣기 좋게 묶는다 */
export const PAYMENT_ACCOUNT_COPY_TEXT = `${PAYMENT_BANK_NAME} ${PAYMENT_ACCOUNT_NUMBER} ${PAYMENT_ACCOUNT_HOLDER_NAME}`;
