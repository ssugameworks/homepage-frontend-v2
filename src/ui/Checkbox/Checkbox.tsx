import type { InputHTMLAttributes, ReactNode } from "react";
import checkmark from "@/assets/icons/register/checkmark.svg";

export type CheckboxProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type"> & {
  label: ReactNode;
};

export function Checkbox({ label, className, checked, ...rest }: CheckboxProps) {
  return (
    <label
      className={[
        "inline-flex cursor-pointer items-center gap-[0.6875rem]",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <span
        className={[
          "relative size-[1.125rem] shrink-0 overflow-clip rounded-[0.1875rem]",
          checked
            ? "bg-primary-600"
            : "border border-solid border-gray-300 bg-transparent",
        ].join(" ")}
      >
        <input
          type="checkbox"
          className="peer sr-only"
          checked={checked}
          {...rest}
        />
        {checked ? (
          <span className="absolute inset-[22%_17%_26%_17%] overflow-clip">
            <img
              src={checkmark}
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
