import { useId } from "react";
import { Radio } from "@/shared/ui";
import {
  PAYMENT_ACCOUNT_TEXT,
  PAYMENT_AMOUNT_TEXT,
  PAYMENT_STATUS_OPTIONS,
} from "../../model/constants";
import type { RegisterForm } from "../../model/types";
import type { RegisterFormApi } from "../../model/useRegisterForm";

export function PaymentInfoStep({ form }: { form: RegisterFormApi }) {
  const labelId = useId();

  return (
    <div className="flex flex-col gap-4 md:gap-6">
      <p id={labelId} className="typo-subheading typo-medium text-primary-950">
        회비를 납부해주세요
      </p>

      <div className="flex flex-col gap-1 rounded-2xl border-2 border-solid border-gray-200 p-4.25">
        <p className="typo-body1 typo-medium text-primary-950">{PAYMENT_AMOUNT_TEXT}</p>
        <p className="typo-body1 text-gray-700">{PAYMENT_ACCOUNT_TEXT}</p>
        <p className="typo-body2 text-gray-500">단, 군휴학생의 경우 회비 면제 (0원)</p>
      </div>

      <form.Field name="paymentStatus">
        {(field) => (
          <div
            role="radiogroup"
            aria-labelledby={labelId}
            className="flex flex-col gap-4 md:gap-6.75"
          >
            {PAYMENT_STATUS_OPTIONS.map((option) => (
              <Radio
                key={option}
                name="paymentStatus"
                value={option}
                label={option}
                checked={field.state.value === option}
                onChange={() => field.handleChange(option)}
              />
            ))}
          </div>
        )}
      </form.Field>
    </div>
  );
}

export function canProceedPaymentInfo(form: RegisterForm) {
  return form.paymentStatus != null;
}
