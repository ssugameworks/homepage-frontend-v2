import type { TextareaHTMLAttributes } from "react";

export type TextAreaState = "default" | "error";

export type TextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
  state?: TextAreaState;
  maxLengthDisplay?: number;
};

function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export function TextArea({
  label,
  state = "default",
  maxLengthDisplay,
  className,
  id,
  value,
  ...rest
}: TextAreaProps) {
  const fieldId = id ?? (label ? `area-${label}` : undefined);
  const length = typeof value === "string" ? value.length : 0;
  const borderClass =
    state === "error"
      ? "border-accent-red"
      : "border-gray-200 focus:border-[color:var(--color-button-outline)]";

  return (
    <div className={cx("flex w-full flex-col items-start", className)}>
      {label ? (
        <label
          htmlFor={fieldId}
          className="mb-4 text-[length:var(--font-size-subheading)] font-medium leading-[1.5] text-primary-950"
        >
          {label}
        </label>
      ) : null}
      <textarea
        id={fieldId}
        value={value}
        className={cx(
          "h-[15.375rem] w-full resize-none rounded-2xl border-2 border-solid bg-transparent px-[1.0625rem] py-[0.6875rem]",
          "text-[length:var(--font-size-subheading)] font-medium leading-[1.5] text-primary-950 outline-none",
          "placeholder:font-medium placeholder:text-gray-400",
          borderClass
        )}
        {...rest}
      />
      {typeof maxLengthDisplay === "number" ? (
        <p className="mt-1 self-end px-2.5 py-1 text-[length:var(--font-size-body2)] font-light leading-[1.5] tracking-[-0.03em] text-primary-600">
          {length}/{maxLengthDisplay}
        </p>
      ) : null}
    </div>
  );
}
