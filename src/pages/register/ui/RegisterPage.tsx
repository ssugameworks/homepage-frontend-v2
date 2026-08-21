import { useNavigate } from "react-router-dom";
import {
  BasicInfoStep,
  canProceedBasicInfo,
  canProceedGrade,
  canProceedMotivation,
  canProceedPart,
  canProceedPortfolio,
  canProceedSchoolInfo,
  GradeStep,
  MotivationStep,
  PartStep,
  PortfolioStep,
  type RegisterFormApi,
  SchoolInfoStep,
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

const REGISTER_STEPS: StepDefinition<RegisterFormApi>[] = [
  {
    id: "basic-info",
    render: (form) => <BasicInfoStep form={form} />,
    canProceed: canProceedBasicInfo,
  },
  {
    id: "school-info",
    render: (form) => <SchoolInfoStep form={form} />,
    canProceed: canProceedSchoolInfo,
  },
  { id: "grade", render: (form) => <GradeStep form={form} />, canProceed: canProceedGrade },
  { id: "part", render: (form) => <PartStep form={form} />, canProceed: canProceedPart },
  {
    id: "motivation",
    render: (form) => <MotivationStep form={form} />,
    canProceed: canProceedMotivation,
  },
  {
    id: "portfolio",
    render: (form) => <PortfolioStep form={form} />,
    canProceed: canProceedPortfolio,
  },
  createCaptchaStep<RegisterFormApi>(TURNSTILE_SITE_KEY),
];

export default function RegisterPage() {
  const navigate = useNavigate();
  const form = useRegisterForm();

  return (
    <FormWizard
      form={form}
      steps={REGISTER_STEPS}
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
