import { type ChangeEvent, type TextareaHTMLAttributes, useId, useState } from "react";
import { tv } from "tailwind-variants";
import { FieldHint } from "../FieldHint";

export type TextAreaState = "default" | "error";

export type TextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
  state?: TextAreaState;
  hint?: string;
  maxLengthDisplay?: number;
};

function initialLength(value: TextAreaProps["value"], defaultValue: TextAreaProps["defaultValue"]) {
  if (typeof value === "string") return value.length;
  if (typeof value === "number") return String(value).length;
  if (typeof defaultValue === "string") return defaultValue.length;
  if (typeof defaultValue === "number") return String(defaultValue).length;
  return 0;
}

const textArea = tv({
  slots: {
    base: "flex w-full flex-col items-start",
    label: "mb-4 typo-subheading typo-medium text-primary-950",
    textarea: [
      "h-61.5 w-full resize-none rounded-2xl border-2 border-solid bg-transparent px-4.25 py-2.75",
      "typo-subheading typo-medium text-primary-950 outline-none transition-colors duration-150",
      "placeholder:font-medium placeholder:text-gray-400",
    ],
    counter: "mt-1 self-end px-2.5 py-1 typo-body2 typo-light",
  },
  variants: {
    state: {
      default: {
        textarea:
          "border-gray-200 hover:border-[color:var(--color-button-outline)]/50 focus:border-[color:var(--color-button-outline)]",
        counter: "text-primary-600",
      },
      error: {
        textarea: "border-accent-red hover:border-accent-red/70",
        counter: "text-accent-red",
      },
    },
  },
  defaultVariants: {
    state: "default",
  },
});

export function TextArea({
  label,
  state = "default",
  hint,
  maxLengthDisplay,
  className,
  id,
  value,
  defaultValue,
  onChange,
  ...rest
}: TextAreaProps) {
  const generatedId = useId();
  const fieldId = id ?? generatedId;
  const hintId = hint ? `${fieldId}-hint` : undefined;
  const counterMax =
    maxLengthDisplay ?? (typeof rest.maxLength === "number" ? rest.maxLength : undefined);
  const counterId = typeof counterMax === "number" ? `${fieldId}-counter` : undefined;
  const describedBy = [hintId, counterId].filter(Boolean).join(" ") || undefined;
  const isControlled = value !== undefined;
  const [uncontrolledLength, setUncontrolledLength] = useState(() =>
    initialLength(value, defaultValue)
  );
  const length = isControlled ? initialLength(value, undefined) : uncontrolledLength;
  const { base, label: labelClass, textarea: textareaClass, counter } = textArea({ state });

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    if (!isControlled) {
      setUncontrolledLength(event.target.value.length);
    }
    onChange?.(event);
  };

  return (
    <div className={base({ className })}>
      {label ? (
        <label htmlFor={fieldId} className={labelClass()}>
          {label}
        </label>
      ) : null}
      <textarea
        id={fieldId}
        value={value}
        defaultValue={defaultValue}
        onChange={handleChange}
        aria-invalid={state === "error" || undefined}
        aria-describedby={describedBy}
        className={textareaClass()}
        {...rest}
      />
      <FieldHint id={hintId} state={state}>
        {hint}
      </FieldHint>
      {typeof counterMax === "number" ? (
        <p id={counterId} className={counter()}>
          {length}/{counterMax}
        </p>
      ) : null}
    </div>
  );
}
