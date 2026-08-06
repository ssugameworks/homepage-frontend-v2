import type { InputHTMLAttributes } from "react";

export type TextFieldState = "default" | "error";

export type TextFieldProps = Omit<InputHTMLAttributes<HTMLInputElement>, "size"> & {
  label?: string;
  state?: TextFieldState;
  hint?: string;
};

function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export function TextField({
  label,
  state = "default",
  hint,
  className,
  id,
  ...rest
}: TextFieldProps) {
  const fieldId = id ?? (label ? `field-${label}` : undefined);
  const borderClass =
    state === "error"
      ? "border-accent-red"
      : "border-gray-200 focus:border-[color:var(--color-button-outline)]";

  return (
    <div className={cx("flex w-full flex-col items-start", className)}>
      {label ? (
        <label
          htmlFor={fieldId}
          className="px-2 py-1 text-[length:var(--font-size-caption)] font-medium leading-[1.5] text-primary-950 md:text-[length:var(--font-size-body1)]"
        >
          {label}
        </label>
      ) : null}
      <input
        id={fieldId}
        className={cx(
          "w-full border-solid bg-transparent outline-none",
          "text-[length:var(--font-size-caption)] font-medium leading-[1.5] text-primary-950",
          "placeholder:font-medium placeholder:text-gray-400",
          "h-auto rounded-[0.625rem] border px-2 py-1.5",
          "md:h-[3.1875rem] md:rounded-2xl md:border-2 md:px-[1.0625rem] md:py-0",
          "md:text-[length:var(--font-size-subheading)]",
          borderClass
        )}
        {...rest}
      />
      {hint ? (
        <p
          className={cx(
            "mt-1 px-2 text-[length:var(--font-size-body2)] font-light leading-[1.5] tracking-[-0.03em]",
            state === "error" ? "text-accent-red" : "text-primary-600"
          )}
        >
          {hint}
        </p>
      ) : null}
    </div>
  );
}
