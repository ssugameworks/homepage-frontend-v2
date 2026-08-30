import { type InputHTMLAttributes, type ReactNode, useId } from "react";
import { tv } from "tailwind-variants";
import { FieldHint } from "../FieldHint";

export type TextFieldState = "default" | "error";

export type TextFieldProps = Omit<InputHTMLAttributes<HTMLInputElement>, "size"> & {
  label?: ReactNode;
  state?: TextFieldState;
  /** 도움말 또는 에러 메시지. input의 `aria-describedby`에 자동 연결된다. */
  hint?: string;
  /** 인풋 오른쪽에 붙는 버튼 등 보조 요소. */
  addon?: ReactNode;
};

const textField = tv({
  slots: {
    base: "flex w-full flex-col items-start",
    label: "px-2 py-1 typo-caption text-primary-950 md:typo-body1",
    input: [
      "h-12.75 w-full rounded-2xl border-2 border-solid bg-transparent px-4.25 py-0 outline-none transition-colors duration-150",
      "typo-subheading typo-medium text-primary-950",
      "placeholder:font-medium placeholder:text-gray-400",
    ],
  },
  variants: {
    state: {
      default: {
        input:
          "border-gray-200 hover:border-[color:var(--color-button-outline)]/50 focus:border-[color:var(--color-button-outline)]",
      },
      error: {
        input: "border-accent-red hover:border-accent-red/70",
      },
    },
  },
  defaultVariants: {
    state: "default",
  },
});

/**
 * 라벨 + 인풋 + 힌트/에러 메시지가 한 세트인 텍스트 입력 필드.
 *
 * @example
 * <TextField label="휴대폰 번호" state={isError ? "error" : "default"} hint={message} />
 */
export function TextField({
  label,
  state = "default",
  hint,
  addon,
  className,
  id,
  ...rest
}: TextFieldProps) {
  const generatedId = useId();
  const fieldId = id ?? generatedId;
  const hintId = hint ? `${fieldId}-hint` : undefined;
  const { base, label: labelClass, input } = textField({ state });

  const inputElement = (
    <input
      id={fieldId}
      aria-invalid={state === "error" || undefined}
      aria-describedby={hintId}
      className={input()}
      {...rest}
    />
  );

  return (
    <div className={base({ className })}>
      {label ? (
        <label htmlFor={fieldId} className={labelClass()}>
          {label}
        </label>
      ) : null}
      {addon ? (
        <div className="flex w-full min-w-0 items-stretch gap-2">
          <div className="min-w-0 flex-1">{inputElement}</div>
          {addon}
        </div>
      ) : (
        inputElement
      )}
      <FieldHint id={hintId} state={state}>
        {hint}
      </FieldHint>
    </div>
  );
}
