import { TextField } from "@/ui";
import type { RegisterForm } from "../types";
import type { RegisterFormApi } from "../useRegisterForm";
import { isValidName, isValidPhone, nameSchema, phoneSchema } from "../validation";

type BasicInfoStepProps = {
  form: RegisterFormApi;
};

function formatPhoneInput(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length < 4) return digits;
  if (digits.length < 8) return `${digits.slice(0, 3)}-${digits.slice(3)}`;
  return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7)}`;
}

export function BasicInfoStep({ form }: BasicInfoStepProps) {
  return (
    <div className="flex flex-col gap-4 md:gap-6">
      <p className="typo-body1 typo-medium text-primary-950 md:typo-subheading">
        <span className="md:hidden">
          지원자님의
          <br />
          기본 정보를 알려주세요
        </span>
        <span className="hidden md:inline">지원자님의 기본 정보를 알려주세요</span>
      </p>

      <form.Field name="name" validators={{ onChange: nameSchema }}>
        {(field) => {
          const message = field.state.meta.errors[0]?.message;
          const hasError = field.state.value !== "" && Boolean(message);
          return (
            <TextField
              label="이름"
              name="name"
              autoComplete="name"
              placeholder="이름을 입력해주세요"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              hint={hasError ? message : undefined}
              state={hasError ? "error" : "default"}
            />
          );
        }}
      </form.Field>

      <form.Subscribe selector={(state) => state.values.name}>
        {(name) =>
          isValidName(name) ? (
            <form.Field name="phone" validators={{ onChange: phoneSchema }}>
              {(field) => {
                const message = field.state.meta.errors[0]?.message;
                const hasError = field.state.value !== "" && Boolean(message);
                return (
                  <TextField
                    label="휴대폰 번호"
                    name="phone"
                    type="tel"
                    inputMode="numeric"
                    autoComplete="tel"
                    maxLength={13}
                    placeholder="휴대폰 번호를 입력해주세요"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(formatPhoneInput(e.target.value))}
                    hint={hasError ? message : undefined}
                    state={hasError ? "error" : "default"}
                  />
                );
              }}
            </form.Field>
          ) : null
        }
      </form.Subscribe>
    </div>
  );
}

export function canProceedBasicInfo(form: RegisterForm) {
  return isValidName(form.name) && isValidPhone(form.phone);
}
