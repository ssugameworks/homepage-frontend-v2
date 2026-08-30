import { todayKstDateString } from "@/shared/lib";
import { Button, TextField } from "@/shared/ui";
import {
  PAYMENT_ACCOUNT_HOLDER_TEXT,
  PAYMENT_ACCOUNT_TEXT,
  PAYMENT_AMOUNT_TEXT,
} from "../../model/constants";
import type { RegisterForm } from "../../model/types";
import type { RegisterFormApi } from "../../model/useRegisterForm";
import { formatPaymentDate, isValidPaymentDate, paymentDateSchema } from "../../model/validation";

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
        <p className="typo-body2 text-gray-700">
          {PAYMENT_ACCOUNT_TEXT}
          <br />
          {PAYMENT_ACCOUNT_HOLDER_TEXT}
        </p>
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
