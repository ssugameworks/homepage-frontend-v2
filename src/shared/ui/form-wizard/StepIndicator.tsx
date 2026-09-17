import NumberFlow from "@number-flow/react";
import { clamp } from "es-toolkit";
import { tv } from "tailwind-variants";

type StepIndicatorProps = {
  step: number;
  total: number;
  className?: string;
};

const root = tv({ base: "flex w-full flex-col items-start" });

export function StepIndicator({ step, total, className }: StepIndicatorProps) {
  const safeTotal = total > 0 ? total : 1;
  const safeStep = clamp(step, 0, safeTotal);
  const progress = safeStep / safeTotal;

  return (
    <div className={root({ className })}>
      <div className="flex flex-col items-center justify-center py-1">
        <p className="flex typo-subheading text-(--color-button-outline)">
          <NumberFlow value={safeStep} />/<NumberFlow value={safeTotal} />
        </p>
      </div>
      <div
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={safeTotal}
        aria-valuenow={safeStep}
        aria-valuetext={`${safeStep}/${safeTotal}`}
        className="relative h-1.5 w-full max-w-60 overflow-hidden rounded-full bg-gray-200"
      >
        <div
          className="absolute inset-y-0 left-0 rounded-full bg-(--color-button-outline) transition-[width] duration-200 ease-out"
          style={{ width: `${progress * 100}%` }}
        />
      </div>
    </div>
  );
}
