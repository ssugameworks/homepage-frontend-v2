import { cx } from "@/utils";
import type { ButtonProps, ButtonSize, ButtonVariant } from "./Button.types";

const sizeClass: Record<ButtonSize, string> = {
  xs: "h-auto min-h-0 w-17.5 rounded px-1 py-1 text-caption font-bold leading-normal",
  sm: "h-10 min-w-45 rounded-[0.625rem] px-6 py-2 text-body1 font-bold leading-normal",
  md: "h-12 min-w-25 rounded-[0.625rem] px-2.5 py-2 text-subheading font-bold leading-normal",
  lg: "h-14 w-50 rounded-2xl px-8 py-3.5 text-subheading font-medium leading-normal",
  xl: "h-14 w-full max-w-104.5 rounded-2xl px-8 py-3.5 text-heading3 font-medium leading-normal",
};

/** background-image은 transition이 안 붙어서 after 오버레이를 페이드시켜 흉내낸다. */
const hoverFadeOverlay = [
  "after:absolute after:-inset-0.5 after:-z-10 after:rounded-[inherit]",
  "after:[background-image:var(--color-button-primary-hover)]",
  "after:opacity-0 after:transition-opacity after:duration-150",
  "hover:enabled:after:opacity-100",
].join(" ");

const variantClass: Record<ButtonVariant, string> = {
  primary: [
    "relative isolate box-border border-2 border-solid border-transparent text-white",
    "[background-image:var(--color-button-primary)]",
    "disabled:[background-image:var(--color-button-disabled)]",
    "disabled:text-[color:var(--color-button-disabled-text)]",
    hoverFadeOverlay,
  ].join(" "),
  primarySolid: [
    "box-border border-2 border-solid border-transparent bg-[var(--color-button-solid)] text-white",
    "hover:enabled:bg-[var(--color-button-solid-hover)]",
    "disabled:bg-gray-600 disabled:text-white",
  ].join(" "),
  outline: [
    "relative isolate box-border border-2 border-solid border-[color:var(--color-button-outline)] bg-transparent text-[color:var(--color-button-outline)]",
    "hover:enabled:border-transparent hover:enabled:text-white",
    "disabled:border-transparent disabled:[background-image:var(--color-button-disabled)]",
    "disabled:text-[color:var(--color-button-disabled-text)]",
    hoverFadeOverlay,
  ].join(" "),
};

export function Button({
  variant = "primary",
  size = "md",
  fullWidth = false,
  disabled = false,
  className,
  children,
  type = "button",
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled}
      className={cx(
        "inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap transition-colors",
        "disabled:cursor-not-allowed",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600",
        sizeClass[size],
        variantClass[variant],
        fullWidth && "w-full max-w-none min-w-0",
        className
      )}
      {...rest}
    >
      {children}
    </button>
  );
}
