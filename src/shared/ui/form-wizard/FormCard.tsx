import type { ReactNode } from "react";
import { tv } from "tailwind-variants";

type FormCardProps = {
  children: ReactNode;
  className?: string;
  footer?: ReactNode;
};

const card = tv({
  base: [
    "relative flex w-full flex-col bg-surface-white shadow-[0_4px_16px_rgba(0,0,0,0.08)]",
    "max-w-82 rounded-[0.9375rem]",
    "min-h-98.75 overflow-visible",
    "md:max-w-130 md:rounded-[1.25rem] md:h-146.5 md:min-h-0",
    "short:md:h-125",
  ],
});

export function FormCard({ children, className, footer }: FormCardProps) {
  return (
    <div className={card({ className })}>
      <div className="flex min-h-0 flex-1 flex-col overflow-visible px-9 pt-4.5 pb-4 md:px-12.75 md:pt-10 md:pb-6">
        {children}
      </div>
      {footer ? (
        <div className="relative z-0 mt-auto shrink-0 px-9 pb-5 md:px-12.75 md:pb-10">{footer}</div>
      ) : null}
    </div>
  );
}
