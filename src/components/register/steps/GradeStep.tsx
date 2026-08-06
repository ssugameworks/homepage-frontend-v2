import type { RegisterForm } from "../types";
import { GRADE_OPTIONS } from "../types";
import { Radio } from "@/ui";

type GradeStepProps = {
  form: RegisterForm;
  onChange: (patch: Partial<RegisterForm>) => void;
};

export function GradeStep({ form, onChange }: GradeStepProps) {
  return (
    <div className="flex flex-col gap-6">
      <p className="typo-body1 typo-medium text-primary-950 md:typo-subheading">
        현재 해당하시는 학년을 선택해 주세요
      </p>

      <div className="flex flex-col gap-[1.6875rem]">
        {GRADE_OPTIONS.map((option) => (
          <Radio
            key={option}
            name="grade"
            value={option}
            label={option}
            checked={form.grade === option}
            onChange={() => onChange({ grade: option })}
          />
        ))}
      </div>
    </div>
  );
}

export function canProceedGrade(form: RegisterForm) {
  return form.grade != null;
}
