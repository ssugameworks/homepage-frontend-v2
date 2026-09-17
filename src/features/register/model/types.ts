export type RegisterForm = {
  name: string;
  phone: string;
  studentId: string;
  privacyConsent: boolean;
  overseasTransferConsent: boolean;
  paymentStatus: string | null;
  paymentDate: string;
  turnstileToken: string;
};
