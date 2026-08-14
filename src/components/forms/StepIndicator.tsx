import { AnimatePresence, motion } from "framer-motion";
import { cx } from "@/utils";

type StepIndicatorProps = {
  step: number;
  total: number;
  direction?: 1 | -1;
  className?: string;
};

const stepTextVariants = {
  enter: (direction: 1 | -1) => ({ opacity: 0, y: direction * 6 }),
  center: { opacity: 1, y: 0 },
  exit: (direction: 1 | -1) => ({ opacity: 0, y: direction * -6 }),
};

export function StepIndicator({ step, total, direction = 1, className }: StepIndicatorProps) {
  const safeTotal = total > 0 ? total : 1;
  const safeStep = Math.min(Math.max(step, 0), safeTotal);
  const progress = safeStep / safeTotal;

  return (
    <div className={cx("flex w-full flex-col items-start", className)}>
      <div className="sr-only flex-col items-center justify-center py-1 md:not-sr-only md:flex">
        <p className="flex typo-subheading text-(--color-button-outline)">
          <span className="overflow-hidden">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.span
                key={safeStep}
                custom={direction}
                variants={stepTextVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.15, ease: "easeOut" }}
                className="inline-block"
              >
                {safeStep}
              </motion.span>
            </AnimatePresence>
          </span>
          /{safeTotal}
        </p>
      </div>
      <div
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={safeTotal}
        aria-valuenow={safeStep}
        aria-valuetext={`${safeStep}/${safeTotal}`}
        className="relative h-0.5 w-full max-w-60 overflow-hidden rounded-full bg-gray-200 md:h-1"
      >
        <div
          className="absolute inset-y-0 left-0 rounded-full bg-(--color-button-outline) transition-[width] duration-200 ease-out"
          style={{ width: `${progress * 100}%` }}
        />
      </div>
    </div>
  );
}
