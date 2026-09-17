import { useState } from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "@/shared/config";
import { Checkbox } from "./Checkbox";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./primitives/dialog";

export type PrivacyPolicyItem = readonly [label: string, value: string];

type PrivacyConsentFieldProps = {
  /** 다이얼로그 제목. 기본값은 일반적인 "개인정보 수집 및 이용 동의". */
  title?: string;
  /** 체크박스 라벨. 국외이전 동의처럼 별도 섹션으로 쓸 때 문구를 다르게 줄 수 있다. */
  checkboxLabel?: string;
  /** 체크박스 name. 한 화면에 이 컴포넌트를 두 번 이상 쓸 때(예: 수집 동의 + 국외이전 동의) 겹치지 않게 지정한다. */
  name?: string;
  policyItems: readonly PrivacyPolicyItem[];
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
};

/**
 * "동의합니다" 체크박스만 눈에 띄게 두고, 실제 고지 항목(수집 목적/항목/보유기간/국외이전 등)은
 * "전체 내용 보기"를 눌렀을 때만 다이얼로그로 보여준다. 체크 전에 반드시 필요한 정보는
 * 다이얼로그를 통해 확인할 수 있어야 하므로, 체크박스 자체를 가리지는 않는다.
 */
export function PrivacyConsentField({
  title = "개인정보 수집 및 이용 동의",
  checkboxLabel = "개인정보 수집 및 이용에 동의합니다",
  name = "privacyConsent",
  policyItems,
  checked,
  onCheckedChange,
}: PrivacyConsentFieldProps) {
  const [detailOpen, setDetailOpen] = useState(false);

  return (
    <div className="flex items-center justify-between gap-3">
      <Checkbox
        name={name}
        checked={checked}
        onChange={(e) => onCheckedChange(e.target.checked)}
        label={checkboxLabel}
      />

      <button
        type="button"
        onClick={() => setDetailOpen(true)}
        className="shrink-0 whitespace-nowrap typo-body2 text-(--color-button-outline) underline"
      >
        전체 내용 보기
      </button>

      <Dialog open={detailOpen} onOpenChange={setDetailOpen}>
        <DialogContent className="max-w-105">
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
          </DialogHeader>

          <div className="flex max-h-96 flex-col gap-2 overflow-y-auto">
            {policyItems.map(([label, value]) => (
              <p key={label} className="typo-body2 text-gray-700">
                <span className="typo-medium text-primary-950">{label}: </span>
                {value}
              </p>
            ))}
          </div>

          <Link
            to={ROUTES.PRIVACY}
            onClick={() => setDetailOpen(false)}
            className="w-fit typo-body2 text-(--color-button-outline) underline"
          >
            개인정보처리방침 전체 문서 보기
          </Link>
        </DialogContent>
      </Dialog>
    </div>
  );
}
