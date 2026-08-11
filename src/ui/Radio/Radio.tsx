import type { InputHTMLAttributes, ReactNode } from "react";
import { IconRadioChecked, IconRadioDot } from "@/assets/icons";
import { cx } from "@/utils";

export type RadioProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "name"> & {
  label: ReactNode;
  name: string;
};

export function Radio({ label, className, ...rest }: RadioProps) {
  return (
    <label
      className={cx(
        "group inline-flex cursor-pointer items-center gap-2.75",
        "has-disabled:cursor-not-allowed has-disabled:opacity-50",
        className
      )}
    >
      <span className="relative size-5 shrink-0">
        <input type="radio" className="peer sr-only" {...rest} />
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-full border border-solid border-gray-300 transition-colors duration-150 group-hover:border-primary-600 peer-checked:hidden"
        />
        <IconRadioChecked
          aria-hidden
          className="pointer-events-none absolute inset-0 !hidden size-full max-w-none peer-checked:!block"
        />
        <span
          aria-hidden
          className="pointer-events-none absolute inset-1/4 hidden overflow-clip peer-checked:block"
        >
          <IconRadioDot aria-hidden className="absolute inset-0 block size-full max-w-none" />
        </span>
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-full peer-focus-visible:outline peer-focus-visible:outline-offset-2 peer-focus-visible:outline-primary-600"
        />
      </span>
      <span className="typo-body1 typo-light text-black">{label}</span>
    </label>
  );
}
