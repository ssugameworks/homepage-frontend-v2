import { useId } from "react";
import { Checkbox } from "@/shared/ui";
import { PART_OPTIONS } from "../../model/constants";
import type { RegisterForm } from "../../model/types";
import type { RegisterFormApi } from "../../model/useRegisterForm";

type PartStepProps = {
  form: RegisterFormApi;
};

export function PartStep({ form }: PartStepProps) {
  const labelId = useId();

  return (
    <div className="flex flex-col gap-6">
      <p id={labelId} className="typo-body1 typo-medium text-primary-950 md:typo-subheading">
        경험해보고 싶은 파트를 모두 선택해 주세요
      </p>

      <form.Field name="parts">
        {(field) => (
          <fieldset
            aria-labelledby={labelId}
            className="m-0 flex flex-col gap-4 border-0 p-0 md:gap-6.75"
          >
            {PART_OPTIONS.map((option) => {
              const checked = field.state.value.includes(option);
              return (
                <Checkbox
                  key={option}
                  name="parts"
                  value={option}
                  label={option}
                  checked={checked}
                  onChange={() =>
                    field.handleChange(
                      checked
                        ? field.state.value.filter((item) => item !== option)
                        : [...field.state.value, option]
                    )
                  }
                />
              );
            })}
          </fieldset>
        )}
      </form.Field>
    </div>
  );
}

export function canProceedPart(form: RegisterForm) {
  return form.parts.length > 0;
}
