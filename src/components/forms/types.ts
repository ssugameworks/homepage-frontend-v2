import type { AnyFormApi } from "@tanstack/react-form";
import type { ReactNode } from "react";

export type StepDefinition<TFormApi extends AnyFormApi> = {
  id: string;
  render: (form: TFormApi) => ReactNode;
  canProceed: (values: TFormApi["state"]["values"]) => boolean;
  /** Captcha처럼 사용자 질문이 아닌 단계는 진행률 계산에서 제외한다. */
  includeInProgress?: boolean;
};

/** A single Notion-sourced field's spec — one field maps to exactly one step. */
export type FieldSpec = {
  id: string;
  label: string;
  hint?: string;
  required: boolean;
  /** single_choice / multi_choice 전용 */
  options?: string[];
  /** long_text 전용 */
  minLength?: number;
  maxLength?: number;
};
