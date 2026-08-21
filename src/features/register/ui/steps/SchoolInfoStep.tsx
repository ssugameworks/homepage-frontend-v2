import { formatStudentId, isValidStudentId, studentIdSchema } from "@/shared/lib";
import { Select, TextField } from "@/shared/ui";
import { MAJOR_OPTIONS } from "../../model/constants";
import type { RegisterForm } from "../../model/types";
import type { RegisterFormApi } from "../../model/useRegisterForm";

type SchoolInfoStepProps = {
  form: RegisterFormApi;
};

export function SchoolInfoStep({ form }: SchoolInfoStepProps) {
  return (
    <div className="flex flex-col gap-4 md:gap-6">
      <p className="typo-subheading typo-medium text-primary-950">학교 정보를 알려주세요</p>

      <form.Field name="major">
        {(majorField) => (
          <>
            <Select
              label="학과"
              placeholder="학과를 입력해주세요"
              options={MAJOR_OPTIONS}
              value={majorField.state.value}
              onChange={(major) => {
                if (major !== majorField.state.value) {
                  form.setFieldValue("studentId", "");
                }
                majorField.handleChange(major);
              }}
            />

            <form.Field name="studentId" validators={{ onChange: studentIdSchema }}>
              {(studentIdField) => {
                const message = studentIdField.state.meta.errors[0]?.message;
                const hasError = studentIdField.state.value !== "" && Boolean(message);
                return (
                  <TextField
                    label="학번"
                    name="studentId"
                    inputMode="numeric"
                    maxLength={8}
                    placeholder="학번 8자리를 입력해주세요"
                    value={studentIdField.state.value}
                    onChange={(e) => studentIdField.handleChange(formatStudentId(e.target.value))}
                    hint={hasError ? message : undefined}
                    state={hasError ? "error" : "default"}
                  />
                );
              }}
            </form.Field>
          </>
        )}
      </form.Field>
    </div>
  );
}

export function canProceedSchoolInfo(form: RegisterForm) {
  return Boolean(form.major.trim()) && isValidStudentId(form.studentId);
}
