const TOTAL_STEPS = 6;

type StepIndicatorProps = {
  step: number;
  total?: number;
  className?: string;
};

export function StepIndicator({ step, total = TOTAL_STEPS, className }: StepIndicatorProps) {
  const progress = Math.min(Math.max(step / total, 0), 1);

  return (
    <div className={["flex w-full flex-col items-start", className].filter(Boolean).join(" ")}>
      <div className="hidden flex-col items-center justify-center py-1 md:flex">
        <p className="typo-subheading text-(--color-button-outline)">
          {step}/{total}
        </p>
      </div>
      <div className="relative h-0.5 w-full max-w-60 overflow-hidden rounded-full bg-gray-200 md:h-1">
        <div
          className="absolute inset-y-0 left-0 rounded-full bg-(--color-button-outline)"
          style={{ width: `${progress * 100}%` }}
        />
      </div>
    </div>
  );
}
