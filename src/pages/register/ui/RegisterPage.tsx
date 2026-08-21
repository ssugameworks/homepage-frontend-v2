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
    ...(paymentStatus === "군휴학생입니다"
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
        <h1 className="text-center font-bold text-primary-950">
          <span className="typo-heading2 md:hidden">GAMEWORKS에 지원하기</span>
          <span className="hidden flex-wrap items-center justify-center md:flex">
            <span className="typo-heading1">GAMEWORKS</span>
            <span className="text-4xl leading-normal">에 지원하기</span>
          </span>
        </h1>
      }
      completeSlot={<CompleteStep />}
      onComplete={() => submitRegisterForm(form.state.values)}
      onFinish={() => navigate(ROUTES.ACTIVITIES)}
      onExit={() => navigate(ROUTES.HOME)}
    />
  );
}
