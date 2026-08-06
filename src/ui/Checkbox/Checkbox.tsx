import type { InputHTMLAttributes, ReactNode } from "react";
import Checkmark from "@/assets/icons/register/checkmark.svg?react";

export type CheckboxProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type"> & {
  label: ReactNode;
};

export function Checkbox({ label, className, ...rest }: CheckboxProps) {
  return (
    <label
      className={["inline-flex cursor-pointer items-center gap-2.75", className]
        .filter(Boolean)
        .join(" ")}
    >
      <span className="relative size-4.5 shrink-0">
        <input type="checkbox" className="peer sr-only" {...rest} />
        <span
          aria-hidden
          className={[
            "pointer-events-none absolute inset-0 overflow-clip rounded-[0.1875rem]",
            "border border-solid border-gray-300 bg-transparent",
            "peer-checked:border-transparent peer-checked:bg-primary-600",
            "peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-primary-600",
          ].join(" ")}
        />
        <span
          aria-hidden
          className="pointer-events-none absolute inset-[22%_17%_26%_17%] hidden overflow-clip peer-checked:block"
        >
          <Checkmark aria-hidden className="absolute inset-0 block size-full max-w-none" />
        </span>
      </span>
      <span className="typo-body1 typo-light text-black whitespace-nowrap">{label}</span>
    </label>
  );
}
