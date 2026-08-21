import type { FieldKind } from "./fieldKinds";

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

export type NotionFieldSpec = FieldSpec & { kind: FieldKind };

export type NotionActivityInfo = {
  applyPeriod: string;
  activityPeriod: string;
  location: string;
  description: string;
};

export type NotionFormSchema = {
  slug: string;
  title: string;
  activity: NotionActivityInfo;
  fields: NotionFieldSpec[];
};
