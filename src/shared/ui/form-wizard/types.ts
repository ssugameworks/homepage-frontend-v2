import type { AnyFormApi } from "@tanstack/react-form";
import type { ReactNode } from "react";

export type StepRenderContext = {
  /** 마지막 스텝에서 제출이 실패할 때마다 1씩 증가한다 (예: 캡차 위젯 리셋 트리거용). */
  retryCount: number;
};

export type StepDefinition<TFormApi extends AnyFormApi> = {
  id: string;
  render: (form: TFormApi, ctx: StepRenderContext) => ReactNode;
  canProceed: (values: TFormApi["state"]["values"]) => boolean;
  /** Captcha처럼 사용자 질문이 아닌 단계는 진행률 계산에서 제외한다. */
  includeInProgress?: boolean;
};
