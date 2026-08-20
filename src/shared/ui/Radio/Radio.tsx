import type { InputHTMLAttributes, ReactNode } from "react";
import { tv } from "tailwind-variants";
import { IconRadioChecked, IconRadioDot } from "@/shared/assets";

export type RadioProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "name"> & {
  label: ReactNode;
  /** 같은 그룹의 라디오는 동일한 name을 공유해야 한다. */
  name: string;
};

const label = tv({
  base: [
    "group inline-flex cursor-pointer items-center gap-2.75",
    "has-disabled:cursor-not-allowed has-disabled:opacity-50",
  ],
});

export function Radio({ label: labelText, className, ...rest }: RadioProps) {
  return (
    <label className={label({ className })}>
      <span className="relative size-5 shrink-0">
        <input type="radio" className="peer sr-only" {...rest} />
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-full border border-solid border-gray-300 transition-colors duration-150 group-hover:border-primary-600"
        />
        <IconRadioChecked
          aria-hidden
          className="pointer-events-none absolute inset-0 size-full max-w-none scale-75 opacity-0 transition-all duration-150 peer-checked:scale-100 peer-checked:opacity-100"
        />
        <span
          aria-hidden
          className="pointer-events-none absolute inset-1/4 scale-50 overflow-clip opacity-0 transition-all duration-150 peer-checked:scale-100 peer-checked:opacity-100"
        >
          <IconRadioDot aria-hidden className="absolute inset-0 block size-full max-w-none" />
        </span>
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-full peer-focus-visible:outline peer-focus-visible:outline-offset-2 peer-focus-visible:outline-primary-600"
        />
      </span>
      <span className="typo-caption text-black md:typo-body1">{labelText}</span>
    </label>
  );
}
