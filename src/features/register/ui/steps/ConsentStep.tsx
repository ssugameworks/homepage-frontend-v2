import type { RegisterFormApi } from "@/features/register";
import { PrivacyConsentField } from "@/shared/ui";
import type { RegisterForm } from "../../model/types";

const POLICY_ITEMS = [
  ["개인정보 관리 책임", "게임웍스 회장"],
  ["수집 항목", "이름, 학번, 전화번호"],
  [
    "수집 및 이용 목적",
    "해당 기수 게임웍스 회비 납부자 확인, 단체 카카오톡방 초대 및 회원 대상 개별 연락",
  ],
  ["개인정보 보유 및 이용기간", "수집·이용 동의일로부터 개인정보의 수집·이용목적을 달성할 때까지"],
  ["동의 거부 권리 및 불이익", "동의를 거부할 권리가 있으며, 거부 시 회원 가입 신청이 제한됩니다"],
] as const;

// 게임웍스는 회원 정보 관리를 위해 Notion(운영사: Notion Labs, Inc., 미국)을 쓰고 있어,
// 가정이 아니라 실제로 지금 이 정보가 국외로 이전된다. 그래서 필수 동의 항목으로 분리해서 안내한다.
const OVERSEAS_TRANSFER_ITEMS = [
  ["이전되는 항목", "이름, 학번, 전화번호"],
  ["이전받는 자", "Notion Labs, Inc."],
  ["이전되는 국가", "미국"],
  ["이전 일시 및 방법", "가입 신청 시 네트워크를 통해 실시간 전송"],
  ["이용목적 및 보유기간", "회원 관리 목적으로, 위 개인정보 보유 및 이용기간과 동일하게 보유"],
  [
    "동의 거부 권리 및 불이익",
    "동의를 거부할 권리가 있으나, Notion을 통한 회원 정보 관리가 서비스 운영에 필수적이라 거부 시 가입 신청이 제한됩니다",
  ],
] as const;

export function ConsentStep({ form }: { form: RegisterFormApi }) {
  return (
    <div className="flex flex-col gap-6">
      <p className="typo-heading3 typo-bold text-primary-950">
        개인정보 수집 및 이용에 동의해주세요
      </p>

      <form.Field name="privacyConsent">
        {(field) => (
          <PrivacyConsentField
            policyItems={POLICY_ITEMS}
            checked={field.state.value}
            onCheckedChange={field.handleChange}
          />
        )}
      </form.Field>

      <form.Field name="overseasTransferConsent">
        {(field) => (
          <PrivacyConsentField
            title="개인정보 국외 이전 동의"
            checkboxLabel="개인정보 국외 이전에 동의합니다"
            name="overseasTransferConsent"
            policyItems={OVERSEAS_TRANSFER_ITEMS}
            checked={field.state.value}
            onCheckedChange={field.handleChange}
          />
        )}
      </form.Field>
    </div>
  );
}

export function canProceedConsent(form: RegisterForm) {
  return form.privacyConsent === true && form.overseasTransferConsent === true;
}
