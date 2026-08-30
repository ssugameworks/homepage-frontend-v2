import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { todayKstDateString } from "@/shared/lib";
import { Button, TextField } from "@/shared/ui";
import {
  PAYMENT_ACCOUNT_COPY_TEXT,
  PAYMENT_ACCOUNT_HOLDER_TEXT,
  PAYMENT_ACCOUNT_TEXT,
  PAYMENT_AMOUNT_TEXT,
} from "../../model/constants";
import type { RegisterForm } from "../../model/types";
import type { RegisterFormApi } from "../../model/useRegisterForm";
import { formatPaymentDate, isValidPaymentDate, paymentDateSchema } from "../../model/validation";

function CopyAccountButton() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(PAYMENT_ACCOUNT_COPY_TEXT);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // 클립보드 접근이 막힌 환경(권한 거부 등) — 조용히 무시, 사용자가 직접 선택해 복사할 수 있다.
    }
  };

  return (
    <Button
      type="button"
      variant="outline"
      size="xs"
      aria-label={copied ? "계좌 복사됨" : "계좌 복사"}
      className="h-auto w-auto min-w-0 shrink-0 self-center rounded-lg border-gray-300 bg-transparent p-2 text-gray-500 hover:enabled:border-transparent hover:enabled:bg-gray-600 hover:enabled:text-white hover:enabled:after:opacity-0"
      onClick={handleCopy}
    >
      {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
    </Button>
  );
}

export function PaymentDateStep({ form }: { form: RegisterFormApi }) {
  return (
    <div className="flex flex-col gap-4 md:gap-6">
      <div className="flex flex-col gap-2">
        <p className="typo-subheading typo-medium text-primary-950">회비를 납부해주세요</p>
        <p className="typo-body2 typo-light text-gray-500">
          아래 계좌로 입금 후, 납부한 날짜를 입력해주세요
        </p>
      </div>

      <div className="flex flex-col gap-1.5 rounded-2xl border-2 border-solid border-gray-200 p-4.25">
        <p className="typo-body1 typo-bold text-primary-950">{PAYMENT_AMOUNT_TEXT}</p>
        <div className="flex items-center justify-between gap-2">
          <p className="typo-body2 text-gray-700">
            {PAYMENT_ACCOUNT_TEXT}
            <br />
            {PAYMENT_ACCOUNT_HOLDER_TEXT}
          </p>
          <CopyAccountButton />
        </div>
      </div>

      <form.Field name="paymentDate" validators={{ onChange: paymentDateSchema }}>
        {(field) => {
          const message = field.state.meta.errors[0]?.message;
          const hasError = field.state.value !== "" && Boolean(message);
          return (
            <TextField
              label="납부 날짜"
              name="paymentDate"
              inputMode="numeric"
              maxLength={10}
              placeholder="YYYY/MM/DD"
              value={field.state.value}
              onChange={(e) => field.handleChange(formatPaymentDate(e.target.value))}
              hint={hasError ? message : undefined}
              state={hasError ? "error" : "default"}
              addon={
                <Button
                  type="button"
                  variant="outline"
                  size="md"
                  className="h-12.75 w-auto min-w-0 shrink-0 rounded-2xl px-4"
                  onClick={() =>
                    field.handleChange(todayKstDateString().replaceAll("-", "/"))
                  }
                >
                  오늘
                </Button>
              }
            />
          );
        }}
      </form.Field>
    </div>
  );
}

export function canProceedPaymentDate(form: RegisterForm) {
  return isValidPaymentDate(form.paymentDate);
}
