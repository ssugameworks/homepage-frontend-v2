import type { RegisterForm } from "../types";
import { PART_OPTIONS } from "../types";
import { Checkbox } from "@/ui";

type PartStepProps = {
  form: RegisterForm;
  onChange: (patch: Partial<RegisterForm>) => void;
};

export function PartStep({ form, onChange }: PartStepProps) {
  const togglePart = (part: string) => {
    const exists = form.parts.includes(part);
    onChange({
      parts: exists
        ? form.parts.filter((item) => item !== part)
        : [...form.parts, part],
    });
  };

  return (
    <div className="flex flex-col gap-6">
      <p className="typo-body1 typo-medium text-primary-950 md:typo-subheading">
        경험해보고 싶은 파트를 모두 선택해 주세요
      </p>

      <div className="flex flex-col gap-[1.6875rem]">
        {PART_OPTIONS.map((option) => (
          <Checkbox
            key={option}
            name="parts"
            value={option}
            label={option}
            checked={form.parts.includes(option)}
            onChange={() => togglePart(option)}
          />
        ))}
      </div>
    </div>
  );
}

export function canProceedPart(form: RegisterForm) {
  return form.parts.length > 0;
}
