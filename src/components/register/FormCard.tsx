import type { ReactNode } from "react";

type FormCardProps = {
  children: ReactNode;
  className?: string;
  footer?: ReactNode;
};

export function FormCard({ children, className, footer }: FormCardProps) {
  return (
    <div
      className={[
        "relative flex w-full flex-col bg-surface-white shadow-[0_4px_16px_rgba(0,0,0,0.08)]",
        "max-w-[20.5rem] rounded-[0.9375rem]",
        "min-h-[24.6875rem] overflow-visible",
        "md:max-w-[32.5rem] md:rounded-[1.25rem] md:h-[36.625rem] md:min-h-0",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="flex min-h-0 flex-1 flex-col overflow-visible px-9 pt-[1.125rem] pb-4 md:px-[3.1875rem] md:pt-10 md:pb-6">
        {children}
      </div>
      {footer ? (
        <div className="relative z-0 mt-auto shrink-0 px-9 pb-5 md:px-[3.1875rem] md:pb-10">
          {footer}
        </div>
      ) : null}
    </div>
  );
}
