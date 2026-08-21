import { type AnyFormApi, useStore } from "@tanstack/react-form";
import { AnimatePresence, motion } from "framer-motion";
import { type ReactNode, useEffect, useState } from "react";
import { Button } from "@/shared/ui";
import { FormCard } from "./FormCard";
import { StepIndicator } from "./StepIndicator";
import type { StepDefinition } from "./types";

type PersistedProgress = { stepId: string; values: unknown };

function readProgress(storageKey: string): PersistedProgress | null {
  try {
    const raw = sessionStorage.getItem(storageKey);
    return raw ? (JSON.parse(raw) as PersistedProgress) : null;
  } catch {
    return null;
  }
}

const mobileCtaClass =
  "max-md:h-13 max-md:min-h-0 max-md:w-full max-md:rounded-2xl max-md:px-6 max-md:py-3 max-md:typo-subheading max-md:typo-bold";

const mobilePairClass =
  "max-md:h-13 max-md:min-h-0 max-md:w-auto max-md:flex-1 max-md:rounded-2xl max-md:px-4 max-md:py-3 max-md:typo-subheading max-md:typo-bold";

const stepVariants = {
  enter: (direction: 1 | -1) => ({ opacity: 0, x: direction * 16 }),
  center: { opacity: 1, x: 0 },
  exit: (direction: 1 | -1) => ({ opacity: 0, x: direction * -16 }),
};

type FormWizardProps<TFormApi extends AnyFormApi> = {
  form: TFormApi;
  steps: StepDefinition<TFormApi>[];
  title: ReactNode;
  completeSlot: ReactNode;
  submitLabel?: string;
  completeLabel?: string;
  /** sessionStorage에 진행 상황(스텝+입력값)을 저장할 때 쓰는 키. 폼마다 고유해야 함. */
  storageKey: string;
  /** Called once, right before moving into the complete step. Throw to stay on the last step and show the error. */
  onComplete: () => void | Promise<void>;
  /** Called when the primary button is clicked on the complete step. */
  onFinish: () => void;
  /** Called when "이전" is clicked on the first step. */
  onExit: () => void;
};

export function FormWizard<TFormApi extends AnyFormApi>({
  form,
  steps,
  title,
  completeSlot,
  submitLabel = "제출하기",
  completeLabel = "다음",
  storageKey,
  onComplete,
  onFinish,
  onExit,
}: FormWizardProps<TFormApi>) {
  const [stepIndex, setStepIndex] = useState<number | "complete">(() => {
    const saved = readProgress(storageKey);
    if (!saved) return 0;
    // 저장된 스텝을 id로 다시 찾는다 — Notion 폼 구조가 바뀌어 순서/개수가
    // 달라졌을 때 엉뚱한 스텝으로 복원되는 것을 막는다. 못 찾으면 처음부터 시작한다.
    const idx = steps.findIndex((step) => step.id === saved.stepId);
    return idx === -1 ? 0 : idx;
  });
  const [direction, setDirection] = useState<1 | -1>(1);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const values = useStore(form.store, (state) => state.values);

  // 저장된 입력값 복원 — 마운트 시 한 번만.
  // biome-ignore lint/correctness/useExhaustiveDependencies: 마운트 시 1회만 실행되어야 함
  useEffect(() => {
    const saved = readProgress(storageKey);
    if (saved) form.reset(saved.values as never);
  }, []);

  const currentStep = stepIndex === "complete" ? null : steps[stepIndex];

  useEffect(() => {
    if (stepIndex === "complete" || !currentStep) return;
    const { turnstileToken: _turnstileToken, ...persistableValues } = values as Record<
      string,
      unknown
    >;
    sessionStorage.setItem(
      storageKey,
      JSON.stringify({
        stepId: currentStep.id,
        values: persistableValues,
      } satisfies PersistedProgress)
    );
  }, [storageKey, stepIndex, currentStep, values]);

  const isFirstStep = stepIndex === 0;
  const isLastStep = stepIndex === steps.length - 1;
  const progressTotal = steps.filter((step) => step.includeInProgress !== false).length;
  const progressStep =
    stepIndex === "complete"
      ? progressTotal
      : steps.slice(0, stepIndex + 1).filter((step) => step.includeInProgress !== false).length;
  const showProgress =
    stepIndex !== "complete" && currentStep?.includeInProgress !== false && progressTotal > 0;

  const goPrev = () => {
    if (stepIndex === "complete") return;
    if (isFirstStep) {
      sessionStorage.removeItem(storageKey);
      onExit();
      return;
    }
    setDirection(-1);
    setStepIndex(stepIndex - 1);
  };

  const goNext = async () => {
    if (stepIndex === "complete") {
      onFinish();
      return;
    }
    if (!currentStep?.canProceed(values)) return;

    setDirection(1);

    if (isLastStep) {
      setSubmitError(null);
      setSubmitting(true);
      try {
        await onComplete();
        sessionStorage.removeItem(storageKey);
        setStepIndex("complete");
      } catch (err) {
        setSubmitError(err instanceof Error ? err.message : "제출에 실패했어요");
        setRetryCount((n) => n + 1);
      } finally {
        setSubmitting(false);
      }
      return;
    }

    setStepIndex(stepIndex + 1);
  };

  const nextEnabled =
    stepIndex === "complete" || (Boolean(currentStep?.canProceed(values)) && !submitting);
  const nextLabel = isLastStep ? (submitting ? "제출 중…" : submitLabel) : "다음";

  const footer =
    stepIndex === "complete" ? (
      <Button size="xl" fullWidth className={mobileCtaClass} onClick={goNext}>
        {completeLabel}
      </Button>
    ) : isFirstStep ? (
      <Button
        size="xl"
        fullWidth
        className={mobileCtaClass}
        disabled={!nextEnabled}
        onClick={goNext}
      >
        {nextLabel}
      </Button>
    ) : (
      <div className="flex items-center justify-between gap-3 md:gap-4">
        <Button size="lg" variant="outline" className={mobilePairClass} onClick={goPrev}>
          이전
        </Button>
        <Button size="lg" className={mobilePairClass} disabled={!nextEnabled} onClick={goNext}>
          {nextLabel}
        </Button>
      </div>
    );

  return (
    <div className="flex flex-1 flex-col items-center justify-center px-5 py-16 short:md:py-8 md:px-6 md:py-22">
      <div className="flex w-full max-w-82 flex-col items-center gap-6 short:md:gap-4 md:max-w-130 md:gap-6.75">
        {title}

        <FormCard
          footer={footer}
          className={stepIndex === "complete" ? "min-h-80 md:h-112 md:min-h-0" : undefined}
        >
          {showProgress ? (
            <StepIndicator
              step={progressStep}
              total={progressTotal}
              direction={direction}
              className="mb-4 md:mb-6"
            />
          ) : null}

          <AnimatePresence mode="wait" initial={false} custom={direction}>
            <motion.div
              key={stepIndex}
              custom={direction}
              variants={stepVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              {stepIndex === "complete" ? completeSlot : currentStep?.render(form, { retryCount })}
            </motion.div>
          </AnimatePresence>

          {submitError ? (
            <p className="mt-4 typo-body2 text-accent-red" role="alert">
              {submitError}
            </p>
          ) : null}
        </FormCard>
      </div>
    </div>
  );
}
