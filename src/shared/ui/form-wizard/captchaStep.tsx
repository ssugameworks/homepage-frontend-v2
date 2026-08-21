import type { AnyFormApi } from "@tanstack/react-form";
import { Turnstile } from "./Turnstile";
import type { StepDefinition } from "./types";

/** 폼 값 타입에 turnstileToken: string 필드가 있어야 한다. */
export function createCaptchaStep<TFormApi extends AnyFormApi>(
  siteKey: string
): StepDefinition<TFormApi> {
  return {
    id: "captcha",
    includeInProgress: false,
    render: (f, ctx) => (
      <div className="flex flex-col gap-4 md:gap-6">
        <p className="typo-subheading typo-medium text-primary-950">사람인지 확인해 주세요</p>
        <div className="flex flex-col items-center gap-4 py-4">
          <Turnstile
            siteKey={siteKey}
            resetKey={ctx.retryCount}
            onVerify={(token) => f.setFieldValue("turnstileToken" as never, token as never)}
          />
        </div>
      </div>
    ),
    canProceed: (values) => Boolean((values as { turnstileToken?: string }).turnstileToken),
  };
}
