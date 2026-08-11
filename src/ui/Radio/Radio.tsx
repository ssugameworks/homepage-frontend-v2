import type { InputHTMLAttributes, ReactNode } from "react";
import { IconRadioChecked, IconRadioDefault, IconRadioDot } from "@/assets/icons";

export type RadioProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type"> & {
  label: ReactNode;
};

export function Radio({ label, className, ...rest }: RadioProps) {
  return (
    <label
      className={["inline-flex cursor-pointer items-center gap-2.75", className]
        .filter(Boolean)
        .join(" ")}
    >
      <span className="relative size-5 shrink-0">
        <input type="radio" className="peer sr-only" {...rest} />
        <IconRadioDefault
          aria-hidden
          className="pointer-events-none absolute inset-0 block size-full max-w-none text-gray-300 peer-checked:hidden peer-focus-visible:opacity-90"
        />
        <IconRadioChecked
          aria-hidden
          className="pointer-events-none absolute inset-0 hidden size-full max-w-none peer-checked:block"
        />
        <span
          aria-hidden
          className="pointer-events-none absolute inset-1/4 hidden overflow-clip peer-checked:block"
        >
          <IconRadioDot aria-hidden className="absolute inset-0 block size-full max-w-none" />
        </span>
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-full peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-primary-600"
        />
      </span>
      <span className="typo-body1 typo-light text-black whitespace-nowrap">{label}</span>
    </label>
  );
}
