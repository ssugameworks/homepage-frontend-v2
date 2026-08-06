import IconWarning from "@/assets/icons/register/icon-warning.svg?react";
import type { RegisterForm } from "../types";
import { isValidMotivation } from "../validation";

const MAX_LENGTH = 150;
const MIN_LENGTH = 50;

type MotivationStepProps = {
  form: RegisterForm;
  onChange: (patch: Partial<RegisterForm>) => void;
};

export function MotivationStep({ form, onChange }: MotivationStepProps) {
  const length = form.motivation.length;
  const isError = !isValidMotivation(form.motivation);

  return (
    <div className="flex flex-col">
      <p className="mb-4 typo-body1 typo-medium text-primary-950 md:mb-6 md:typo-subheading">
        어떤 계기로 지원하게 되었는지 자유롭게 적어주세요
      </p>

      <textarea
        name="motivation"
        placeholder="내용을 입력해 주세요"
        maxLength={MAX_LENGTH}
        value={form.motivation}
        onChange={(e) => onChange({ motivation: e.target.value })}
        className={[
          "w-full resize-none bg-transparent outline-none",
          "h-40 rounded-[0.625rem] border border-solid px-2 py-1.5",
          "typo-caption text-primary-950",
          "placeholder:font-medium placeholder:text-gray-400",
          "md:h-61.5 md:rounded-2xl md:border-2 md:px-4.25 md:py-2.75",
          "md:typo-subheading md:typo-medium",
          isError && length > 0 ? "border-accent-red" : "border-gray-200",
        ].join(" ")}
      />

      <div className="mt-1 flex items-center justify-between gap-3 px-2 py-1">
        <div className="flex min-w-0 items-center gap-2.5">
          {isError ? (
            <>
              <span className="relative size-6 shrink-0 overflow-clip">
                <IconWarning aria-hidden className="absolute inset-0 block size-full max-w-none" />
              </span>
              <p className="typo-body2 typo-light text-accent-red">
                지원 계기를 최소 {MIN_LENGTH}자 이상 작성해주세요
              </p>
            </>
          ) : null}
        </div>
        <p className="shrink-0 typo-body2 typo-light text-primary-600">
          {length}/{MAX_LENGTH}
        </p>
      </div>
    </div>
  );
}

export function canProceedMotivation(form: RegisterForm) {
  return isValidMotivation(form.motivation);
}
