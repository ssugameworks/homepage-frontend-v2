import type { InputHTMLAttributes, ReactNode } from "react";
import { IconCheckmark } from "@/assets/icons";
import { cx } from "@/utils";

export type CheckboxProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type"> & {
  label: ReactNode;
};

export function Checkbox({ label, className, ...rest }: CheckboxProps) {
  return (
    <label
      className={cx(
        "group inline-flex cursor-pointer items-center gap-2.75",
        "has-disabled:cursor-not-allowed has-disabled:opacity-50",
        className
      )}
    >
      <span className="relative size-4.5 shrink-0">
        <input type="checkbox" className="peer sr-only" {...rest} />
        <span
          aria-hidden
          className={[
            "pointer-events-none absolute inset-0 overflow-clip rounded-[0.1875rem] transition-colors duration-150",
            "border border-solid border-gray-300 bg-transparent",
            "group-hover:border-primary-600",
            "peer-checked:border-transparent peer-checked:bg-primary-600",
            "peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-primary-600",
          ].join(" ")}
        />
        <span
          aria-hidden
          className="pointer-events-none absolute inset-[22%_17%_26%_17%] hidden overflow-clip text-white peer-checked:block"
        >
          <IconCheckmark aria-hidden className="absolute inset-0 block size-full max-w-none" />
        </span>
      </span>
      <span className="typo-body1 typo-light text-black">{label}</span>
    </label>
  );
}
