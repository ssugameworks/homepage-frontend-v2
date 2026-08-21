import { useId } from "react";
import { Radio } from "@/shared/ui";
import { GRADE_OPTIONS } from "../../model/constants";
import type { RegisterForm } from "../../model/types";
import type { RegisterFormApi } from "../../model/useRegisterForm";

export function GradeStep({ form }: { form: RegisterFormApi }) {
  const labelId = useId();

  return (
    <div className="flex flex-col gap-6">
      <p id={labelId} className="typo-subheading typo-medium text-primary-950">
        현재 해당하시는 학년을 선택해 주세요
      </p>

      <form.Field name="grade">
        {(field) => (
          <div
            role="radiogroup"
            aria-labelledby={labelId}
            className="flex flex-col gap-4 md:gap-6.75"
          >
            {GRADE_OPTIONS.map((option) => (
              <Radio
                key={option}
                name="grade"
                value={option}
                label={option}
                checked={field.state.value === option}
                onChange={() => field.handleChange(option)}
              />
            ))}
          </div>
        )}
      </form.Field>
    </div>
  );
}

export function canProceedGrade(form: RegisterForm) {
  return form.grade != null;
}
