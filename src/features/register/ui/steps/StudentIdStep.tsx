import { TextField } from "@/shared/ui";
import type { RegisterForm } from "../../model/types";
import type { RegisterFormApi } from "../../model/useRegisterForm";
import { formatStudentId, isValidStudentId, studentIdSchema } from "../../model/validation";

export function StudentIdStep({ form }: { form: RegisterFormApi }) {
  return (
    <div className="flex flex-col gap-4 md:gap-6">
      <p className="typo-subheading typo-medium text-primary-950">학번을 입력해주세요</p>

      <form.Field name="studentId" validators={{ onChange: studentIdSchema }}>
        {(field) => {
          const message = field.state.meta.errors[0]?.message;
          const hasError = field.state.value !== "" && Boolean(message);
          return (
            <TextField
              label="학번"
              name="studentId"
              inputMode="numeric"
              maxLength={8}
              placeholder="학번 8자리를 입력해주세요"
              value={field.state.value}
              onChange={(e) => field.handleChange(formatStudentId(e.target.value))}
              hint={hasError ? message : undefined}
              state={hasError ? "error" : "default"}
            />
          );
        }}
      </form.Field>
    </div>
  );
}

export function canProceedStudentId(form: RegisterForm) {
  return isValidStudentId(form.studentId);
}
