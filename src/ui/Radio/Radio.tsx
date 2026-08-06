import type { InputHTMLAttributes, ReactNode } from "react";
import radioChecked from "@/assets/icons/register/radio-checked.svg";
import radioDefault from "@/assets/icons/register/radio-default.svg";
import radioDot from "@/assets/icons/register/radio-dot.svg";

export type RadioProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type"> & {
  label: ReactNode;
};

export function Radio({ label, className, checked, ...rest }: RadioProps) {
  return (
    <label
      className={[
        "inline-flex cursor-pointer items-center gap-[0.6875rem]",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <span className="relative size-5 shrink-0 overflow-clip">
        <input
          type="radio"
          className="peer sr-only"
          checked={checked}
          {...rest}
        />
        <img
          src={checked ? radioChecked : radioDefault}
          alt=""
          className="absolute inset-0 block size-full max-w-none"
        />
        {checked ? (
          <span className="absolute inset-1/4 overflow-clip">
            <img
              src={radioDot}
              alt=""
              className="absolute inset-0 block size-full max-w-none"
            />
          </span>
        ) : null}
      </span>
      <span className="typo-body1 typo-light tracking-[-0.03em] text-black whitespace-nowrap">
        {label}
      </span>
    </label>
  );
}
