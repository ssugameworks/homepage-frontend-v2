import { TextField } from "@/shared/ui";
import type { RegisterForm } from "../../model/types";
import type { RegisterFormApi } from "../../model/useRegisterForm";
import { formatPaymentDate, isValidPaymentDate, paymentDateSchema } from "../../model/validation";

export function PaymentDateStep({ form }: { form: RegisterFormApi }) {
  return (
    <div className="flex flex-col gap-4 md:gap-6">
      <p className="typo-subheading typo-medium text-primary-950">회비 납부 날짜를 입력해주세요</p>

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
