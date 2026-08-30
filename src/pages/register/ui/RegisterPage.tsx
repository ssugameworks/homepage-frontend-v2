import { useStore } from "@tanstack/react-form";
import { useNavigate } from "react-router-dom";
import {
  BasicInfoStep,
  ConsentStep,
  canProceedBasicInfo,
  canProceedConsent,
  canProceedPaymentDate,
  canProceedPaymentInfo,
  canProceedStudentId,
  MILITARY_LEAVE,
  PaymentDateStep,
  PaymentInfoStep,
  type RegisterFormApi,
  StudentIdStep,
  submitRegisterForm,
  useRegisterForm,
} from "@/features/register";
import { ROUTES } from "@/shared/config";
import {
  CompleteStep,
  createCaptchaStep,
  FormWizard,
  type StepDefinition,
} from "@/shared/ui/form-wizard";

const TURNSTILE_SITE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY as string;

export default function RegisterPage() {
  const navigate = useNavigate();
  const form = useRegisterForm();
  const paymentStatus = useStore(form.store, (state) => state.values.paymentStatus);

  const steps: StepDefinition<RegisterFormApi>[] = [
    { id: "consent", render: (f) => <ConsentStep form={f} />, canProceed: canProceedConsent },
    {
      id: "basic-info",
      render: (f) => <BasicInfoStep form={f} />,
      canProceed: canProceedBasicInfo,
    },
    {
      id: "student-id",
      render: (f) => <StudentIdStep form={f} />,
      canProceed: canProceedStudentId,
    },
    {
      id: "payment-info",
      render: (f) => <PaymentInfoStep form={f} />,
      canProceed: canProceedPaymentInfo,
    },
    // 군휴학생은 회비가 면제되므로 납부 날짜를 물어볼 필요가 없다.
    ...(paymentStatus === MILITARY_LEAVE
      ? []
      : [
          {
            id: "payment-date",
            render: (f) => <PaymentDateStep form={f} />,
            canProceed: canProceedPaymentDate,
          } satisfies StepDefinition<RegisterFormApi>,
        ]),
    createCaptchaStep<RegisterFormApi>(TURNSTILE_SITE_KEY),
  ];

  return (
    <FormWizard
      form={form}
      steps={steps}
      storageKey="register-form"
      title={
        <h1 className="flex flex-wrap items-center justify-center text-center font-bold text-primary-950">
          <span className="typo-heading2 md:typo-heading1">GAMEWORKS</span>
          <span className="typo-heading3 md:text-4xl md:leading-normal">에 지원하기</span>
        </h1>
      }
      completeSlot={<CompleteStep />}
      onComplete={() => submitRegisterForm(form.state.values)}
      onFinish={() => navigate(ROUTES.ACTIVITIES)}
      onExit={() => navigate(ROUTES.HOME)}
    />
  );
}
