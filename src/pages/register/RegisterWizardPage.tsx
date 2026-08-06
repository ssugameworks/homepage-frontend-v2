import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FormCard,
  INITIAL_REGISTER_FORM,
  StepIndicator,
  type RegisterForm,
  type RegisterStep,
} from "@/components/register";
import {
  BasicInfoStep,
  canProceedBasicInfo,
  CompleteStep,
  GradeStep,
  canProceedGrade,
  MotivationStep,
  canProceedMotivation,
  PartStep,
  canProceedPart,
  PortfolioStep,
  canProceedPortfolio,
  SchoolInfoStep,
  canProceedSchoolInfo,
} from "@/components/register/steps";
import { ROUTES } from "@/router/routes";
import { Button } from "@/ui";

const mobileCtaClass =
  "max-md:h-auto max-md:min-h-0 max-md:w-full max-md:rounded-[0.625rem] max-md:px-6 max-md:py-[0.5625rem] max-md:text-[length:var(--font-size-body1)] max-md:font-bold max-md:leading-[1.5]";

const mobilePairClass =
  "max-md:h-auto max-md:min-h-0 max-md:w-auto max-md:flex-1 max-md:rounded-[0.625rem] max-md:px-4 max-md:py-[0.5625rem] max-md:text-[length:var(--font-size-body1)] max-md:font-bold max-md:leading-[1.5]";

function canProceed(step: RegisterStep, form: RegisterForm) {
  switch (step) {
    case 1:
      return canProceedBasicInfo(form);
    case 2:
      return canProceedSchoolInfo(form);
    case 3:
      return canProceedGrade(form);
    case 4:
      return canProceedPart(form);
    case 5:
      return canProceedMotivation(form);
    case 6:
      return canProceedPortfolio(form);
    default:
      return false;
  }
}

export default function RegisterWizardPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState<RegisterStep>(1);
  const [form, setForm] = useState<RegisterForm>(INITIAL_REGISTER_FORM);

  const patchForm = (patch: Partial<RegisterForm>) => {
    setForm((prev) => ({ ...prev, ...patch }));
  };

  const goPrev = () => {
    if (step === 1) {
      navigate(ROUTES.REGISTER);
      return;
    }
    if (typeof step === "number") {
      setStep((step - 1) as RegisterStep);
    }
  };

  const goNext = () => {
    if (step === "complete") {
      navigate(ROUTES.ACTIVITIES);
      return;
    }
    if (!canProceed(step, form)) return;

    if (step === 6) {
      // Stub: submit to Notion / API later.
      // await submitRegisterForm(form);
      setStep("complete");
      return;
    }

    setStep((step + 1) as RegisterStep);
  };

  const nextEnabled = step === "complete" || canProceed(step, form);
  const nextLabel = step === 6 ? "제출하기" : "다음";

  const footer =
    step === "complete" ? (
      <Button size="xl" fullWidth className={mobileCtaClass} onClick={goNext}>
        다음
      </Button>
    ) : step === 1 ? (
      <Button
        size="xl"
        fullWidth
        className={mobileCtaClass}
        disabled={!nextEnabled}
        onClick={goNext}
      >
        다음
      </Button>
    ) : (
      <div className="flex items-center justify-between gap-3 md:gap-4">
        <Button
          size="lg"
          variant="outline"
          className={mobilePairClass}
          onClick={goPrev}
        >
          이전
        </Button>
        <Button
          size="lg"
          className={mobilePairClass}
          disabled={!nextEnabled}
          onClick={goNext}
        >
          {nextLabel}
        </Button>
      </div>
    );

  return (
    <div className="flex flex-1 flex-col items-center px-5 py-16 md:px-6 md:py-[5.5rem]">
      <div className="flex w-full max-w-[20.5rem] flex-col items-center gap-6 md:max-w-[32.5rem] md:gap-[1.6875rem]">
        <h1 className="text-center font-bold text-primary-950">
          <span className="typo-heading3 md:hidden">GAMEWORKS에 지원하기</span>
          <span className="hidden flex-wrap items-center justify-center md:flex">
            <span className="typo-heading1">GAMEWORKS</span>
            <span className="text-[2.25rem] leading-[1.5]">에 지원하기</span>
          </span>
        </h1>

        <FormCard
          footer={footer}
          className={
            step === "complete" ? "min-h-[20rem] md:h-[28rem] md:min-h-0" : undefined
          }
        >
          {step !== "complete" ? (
            <StepIndicator step={step} className="mb-4 md:mb-6" />
          ) : null}

          {step === 1 ? (
            <BasicInfoStep form={form} onChange={patchForm} />
          ) : null}
          {step === 2 ? (
            <SchoolInfoStep form={form} onChange={patchForm} />
          ) : null}
          {step === 3 ? <GradeStep form={form} onChange={patchForm} /> : null}
          {step === 4 ? <PartStep form={form} onChange={patchForm} /> : null}
          {step === 5 ? (
            <MotivationStep form={form} onChange={patchForm} />
          ) : null}
          {step === 6 ? (
            <PortfolioStep form={form} onChange={patchForm} />
          ) : null}
          {step === "complete" ? <CompleteStep /> : null}
        </FormCard>
      </div>
    </div>
  );
}
