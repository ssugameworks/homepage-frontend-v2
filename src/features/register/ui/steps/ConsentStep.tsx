import { Checkbox } from "@/shared/ui";
import type { RegisterForm } from "../../model/types";
import type { RegisterFormApi } from "../../model/useRegisterForm";

const POLICY_ITEMS = [
  ["개인정보 관리 책임", "게임웍스 회장 조영찬"],
  ["수집 항목", "이름, 학번, 전화번호"],
  ["수집 및 이용 목적", "2026년 게임웍스 회비 납부자 확인"],
  ["개인정보 보유 및 이용기간", "수집·이용 동의일로부터 개인정보의 수집·이용목적을 달성할 때까지"],
] as const;

export function ConsentStep({ form }: { form: RegisterFormApi }) {
  return (
    <div className="flex flex-col gap-4 md:gap-6">
      <p className="typo-subheading typo-medium text-primary-950">
        개인정보 수집 및 이용에 동의해주세요
      </p>

      <div className="flex flex-col gap-2 rounded-2xl border-2 border-solid border-gray-200 p-4.25">
        {POLICY_ITEMS.map(([label, value]) => (
          <p key={label} className="typo-body2 text-gray-700">
            <span className="typo-medium text-primary-950">{label}: </span>
            {value}
          </p>
        ))}
      </div>

      <form.Field name="privacyConsent">
        {(field) => (
          <Checkbox
            name="privacyConsent"
            checked={field.state.value}
            onChange={(e) => field.handleChange(e.target.checked)}
            label="본인은 위의 동의서 내용을 충분히 숙지하였으며, 개인정보 수집, 이용, 제공하는 것에 동의합니다."
          />
        )}
      </form.Field>
    </div>
  );
}

export function canProceedConsent(form: RegisterForm) {
  return form.privacyConsent === true;
}
