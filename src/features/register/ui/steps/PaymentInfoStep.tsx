import { useId } from "react";
import { Radio } from "@/shared/ui";
import { MILITARY_LEAVE, PAYMENT_COMPLETED } from "../../model/constants";
import type { RegisterForm } from "../../model/types";
import type { RegisterFormApi } from "../../model/useRegisterForm";

export function PaymentInfoStep({ form }: { form: RegisterFormApi }) {
  const labelId = useId();

  return (
    <div className="flex flex-col gap-4 md:gap-6">
      <div className="flex flex-col gap-2">
        <p id={labelId} className="typo-subheading typo-medium text-primary-950">
          군휴학생이신가요?
        </p>
        <p className="typo-body2 typo-light text-gray-500">군휴학생은 회비가 면제돼요 (0원)</p>
      </div>

      <form.Field name="paymentStatus">
        {(field) => (
          <div
            role="radiogroup"
            aria-labelledby={labelId}
            className="flex flex-col gap-4 md:gap-6.75"
          >
            <Radio
              name="paymentStatus"
              value={PAYMENT_COMPLETED}
              label="아니요, 회비를 납부할게요"
              checked={field.state.value === PAYMENT_COMPLETED}
              onChange={() => field.handleChange(PAYMENT_COMPLETED)}
            />
            <Radio
              name="paymentStatus"
              value={MILITARY_LEAVE}
              label="네, 군휴학생이에요"
              checked={field.state.value === MILITARY_LEAVE}
              onChange={() => field.handleChange(MILITARY_LEAVE)}
            />
          </div>
        )}
      </form.Field>
    </div>
  );
}

export function canProceedPaymentInfo(form: RegisterForm) {
  return form.paymentStatus != null;
}
