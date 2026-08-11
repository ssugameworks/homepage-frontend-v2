import type { AnyFormApi } from "@tanstack/react-form";
import type { ReactNode } from "react";

export type StepDefinition<TFormApi extends AnyFormApi> = {
  id: string;
  render: (form: TFormApi) => ReactNode;
  canProceed: (values: TFormApi["state"]["values"]) => boolean;
};

/** A single Notion-sourced field's spec — one field maps to exactly one step. */
export type FieldSpec = {
  id: string;
  label: string;
  hint?: string;
  required: boolean;
  /** single_choice / multi_choice 전용 */
  options?: string[];
};
