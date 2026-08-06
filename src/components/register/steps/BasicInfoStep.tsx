import type { RegisterForm } from "../types";
import { isValidName, isValidPhone } from "../validation";
import { TextField } from "@/ui";

type BasicInfoStepProps = {
  form: RegisterForm;
  onChange: (patch: Partial<RegisterForm>) => void;
};

export function BasicInfoStep({ form, onChange }: BasicInfoStepProps) {
  const showPhone = isValidName(form.name);

  return (
    <div className="flex flex-col gap-4 md:gap-6">
      <p className="typo-body1 typo-medium text-primary-950 md:typo-subheading">
        <span className="md:hidden">
          지원자님의
          <br />
          기본 정보를 알려주세요
        </span>
        <span className="hidden md:inline">
          지원자님의 기본 정보를 알려주세요
        </span>
      </p>

      <TextField
        label="이름"
        name="name"
        autoComplete="name"
        placeholder="이름을 입력해주세요"
        value={form.name}
        onChange={(e) => onChange({ name: e.target.value })}
      />

      {showPhone ? (
        <TextField
          label="휴대폰 번호"
          name="phone"
          type="tel"
          inputMode="numeric"
          autoComplete="tel"
          placeholder="휴대폰 번호를 입력해주세요"
          value={form.phone}
          onChange={(e) => onChange({ phone: e.target.value })}
          hint={
            form.phone && !isValidPhone(form.phone)
              ? "올바른 휴대폰 번호를 입력해주세요"
              : undefined
          }
          state={form.phone && !isValidPhone(form.phone) ? "error" : "default"}
        />
      ) : null}
    </div>
  );
}

export function canProceedBasicInfo(form: RegisterForm) {
  return isValidName(form.name) && isValidPhone(form.phone);
}
