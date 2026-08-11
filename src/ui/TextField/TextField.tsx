import { type InputHTMLAttributes, useId } from "react";
import { cx } from "@/utils";

export type TextFieldState = "default" | "error";

export type TextFieldProps = Omit<InputHTMLAttributes<HTMLInputElement>, "size"> & {
  label?: string;
  state?: TextFieldState;
  hint?: string;
};

export function TextField({
  label,
  state = "default",
  hint,
  className,
  id,
  ...rest
}: TextFieldProps) {
  const generatedId = useId();
  const fieldId = id ?? generatedId;
  const hintId = hint ? `${fieldId}-hint` : undefined;
  const borderClass =
    state === "error"
      ? "border-accent-red"
      : "border-gray-200 focus:border-[color:var(--color-button-outline)]";

  return (
    <div className={cx("flex w-full flex-col items-start", className)}>
      {label ? (
        <label htmlFor={fieldId} className="px-2 py-1 typo-caption text-primary-950 md:typo-body1">
          {label}
        </label>
      ) : null}
      <input
        id={fieldId}
        aria-invalid={state === "error" || undefined}
        aria-describedby={hintId}
        className={cx(
          "w-full border-solid bg-transparent outline-none",
          "typo-caption text-primary-950",
          "placeholder:font-medium placeholder:text-gray-400",
          "h-auto rounded-[0.625rem] border px-2 py-1.5",
          "md:h-12.75 md:rounded-2xl md:border-2 md:px-4.25 md:py-0",
          "md:typo-subheading md:typo-medium",
          borderClass
        )}
        {...rest}
      />
      {hint ? (
        <p
          id={hintId}
          className={cx(
            "mt-1 px-2 typo-body2 typo-light",
            state === "error" ? "text-accent-red" : "text-primary-600"
          )}
        >
          {hint}
        </p>
      ) : null}
    </div>
  );
}
