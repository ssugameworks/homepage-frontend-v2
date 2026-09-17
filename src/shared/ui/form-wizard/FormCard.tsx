import type { ReactNode } from "react";
import { tv } from "tailwind-variants";

type FormCardProps = {
  children: ReactNode;
  className?: string;
  footer?: ReactNode;
};

// 모바일/데스크톱 구분 없이 데스크톱 시안 값(폭/라운드/높이/패딩)을 그대로 쓴다.
const card = tv({
  base: [
    "relative flex w-full flex-col bg-surface-white shadow-[0_4px_16px_rgba(0,0,0,0.08)]",
    "max-w-130 rounded-[1.25rem]",
    "h-146.5 min-h-0 overflow-visible",
    "short:h-125",
  ],
});

export function FormCard({ children, className, footer }: FormCardProps) {
  return (
    <div className={card({ className })}>
      <div className="flex min-h-0 flex-1 flex-col overflow-visible px-12.75 pt-6 pb-6">
        {children}
      </div>
      {footer ? <div className="relative z-0 mt-auto shrink-0 px-12.75 pb-10">{footer}</div> : null}
    </div>
  );
}
