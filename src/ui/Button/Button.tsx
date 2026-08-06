import type { ButtonProps, ButtonSize, ButtonVariant } from "@/ui";

const sizeClass: Record<ButtonSize, string> = {
  // 활동 mobile — caption Bold, radius 4, width 70
  xs: "h-auto min-h-0 w-17.5 rounded px-1 py-1 text-caption font-bold leading-normal",
  // overlay / 지원하기 ver2 — body1 Bold, radius 10
  sm: "h-10 min-w-45 rounded-[0.625rem] px-6 py-2 text-body1 font-bold leading-normal",
  // 활동 web — subheading Bold, radius 10, ~100×48
  md: "h-12 min-w-25 rounded-[0.625rem] px-2.5 py-2 text-subheading font-bold leading-normal",
  // 지원하기 ver3/4 — subheading Medium, radius 16, ~200×56
  lg: "h-14 w-50 rounded-2xl px-8 py-3.5 text-subheading font-medium leading-normal",
  // 지원하기 ver1 — heading3 Medium, radius 16, tall CTA
  xl: "h-14 w-full max-w-104.5 rounded-2xl px-8 py-3.5 text-heading3 font-medium leading-normal",
};

const variantClass: Record<ButtonVariant, string> = {
  primary: [
    "box-border border-2 border-solid border-transparent text-white",
    "[background-image:var(--color-button-primary)]",
    "hover:enabled:[background-image:var(--color-button-primary-hover)]",
    "disabled:[background-image:var(--color-button-disabled)]",
    "disabled:text-[color:var(--color-button-disabled-text)]",
  ].join(" "),
  primarySolid: [
    "box-border border-2 border-solid border-transparent bg-[var(--color-button-solid)] text-white",
    "hover:enabled:bg-[var(--color-button-solid-hover)]",
    "disabled:bg-gray-600 disabled:text-white",
  ].join(" "),
  outline: [
    "box-border border-2 border-solid border-[color:var(--color-button-outline)] bg-transparent text-[color:var(--color-button-outline)]",
    "hover:enabled:border-transparent hover:enabled:text-white",
    "hover:enabled:[background-image:var(--color-button-primary-hover)]",
    "disabled:border-transparent disabled:[background-image:var(--color-button-disabled)]",
    "disabled:text-[color:var(--color-button-disabled-text)]",
  ].join(" "),
};

function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

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
