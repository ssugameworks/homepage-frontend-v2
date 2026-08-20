import { tv } from "tailwind-variants";
import { IconWarning } from "@/shared/assets/icons";
import type { RegisterForm } from "../../model/types";
import type { RegisterFormApi } from "../../model/useRegisterForm";
import { isValidMotivation, motivationSchema } from "../../model/validation";

const MAX_LENGTH = 150;

type MotivationStepProps = {
  form: RegisterFormApi;
};

const textarea = tv({
  base: [
    "w-full resize-none bg-transparent outline-none",
    "h-40 rounded-[0.625rem] border border-solid px-2 py-1.5",
    "typo-caption text-primary-950",
    "placeholder:font-medium placeholder:text-gray-400",
    "md:h-61.5 md:rounded-2xl md:border-2 md:px-4.25 md:py-2.75",
    "short:md:h-50",
    "md:typo-subheading md:typo-medium",
  ],
  variants: {
    hasError: {
      true: "border-accent-red",
      false: "border-gray-200",
    },
  },
  defaultVariants: {
    hasError: false,
  },
});

export function MotivationStep({ form }: MotivationStepProps) {
  return (
    <div className="flex flex-col">
      <p className="mb-4 typo-body1 typo-medium text-primary-950 md:mb-6 md:typo-subheading">
        어떤 계기로 지원하게 되었는지 자유롭게 적어주세요
      </p>

      <form.Field name="motivation" validators={{ onChange: motivationSchema }}>
        {(field) => {
          const length = field.state.value.length;
          const message = field.state.meta.errors[0]?.message;
          const hasError = length > 0 && Boolean(message);
          const errorId = "motivation-error";

          return (
            <>
              <textarea
                name="motivation"
                placeholder="내용을 입력해 주세요"
                maxLength={MAX_LENGTH}
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                aria-invalid={hasError}
                aria-describedby={hasError ? errorId : undefined}
                className={textarea({ hasError })}
              />

              <div className="mt-1 flex items-center justify-between gap-3 px-2 py-1">
                <div className="flex min-w-0 items-center gap-2.5">
                  {hasError ? (
                    <>
                      <span className="relative size-6 shrink-0 overflow-clip text-accent-red">
                        <IconWarning
                          aria-hidden
                          className="absolute inset-0 block size-full max-w-none"
                        />
                      </span>
                      <p
                        id={errorId}
                        role="alert"
                        className="typo-body2 typo-light text-accent-red"
                      >
                        {message}
                      </p>
                    </>
                  ) : null}
                </div>
                <p className="shrink-0 typo-body2 typo-light text-primary-600">
                  {length}/{MAX_LENGTH}
                </p>
              </div>
            </>
          );
        }}
      </form.Field>
    </div>
  );
}

export function canProceedMotivation(form: RegisterForm) {
  return isValidMotivation(form.motivation);
}
