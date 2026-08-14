import {
  checkbox,
  type Env,
  findChildDataSourceId,
  type NotionPage,
  numberProp,
  queryDataSource,
  richText,
  select,
  title,
} from "./notion";

export const ACTIVITY_FIELD_KINDS = [
  "short_text",
  "long_text",
  "single_choice",
  "multi_choice",
  "url",
  "phone",
  "email",
] as const;

export type ActivityFieldKind = (typeof ACTIVITY_FIELD_KINDS)[number];

export type ActivityFieldSpec = {
  id: string;
  label: string;
  hint?: string;
  required: boolean;
  kind: ActivityFieldKind;
  options?: string[];
  minLength?: number;
  maxLength?: number;
};

export class ActivityFormConfigError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ActivityFormConfigError";
  }
}

function isActivityFieldKind(value: string): value is ActivityFieldKind {
  return ACTIVITY_FIELD_KINDS.some((kind) => kind === value);
}

export function toActivityFieldSpec(row: NotionPage): ActivityFieldSpec {
  const rawKind = select("타입", row);
  if (!rawKind || !isActivityFieldKind(rawKind)) {
    throw new ActivityFormConfigError(`지원하지 않는 질문 타입입니다: ${rawKind ?? "미설정"}`);
  }
  const options = richText("옵션", row);
  const minLength = numberProp("최소글자수", row);
  const maxLength = numberProp("최대글자수", row);

  return {
    id: row.id,
    label: title("라벨", row),
    hint: richText("힌트", row) || undefined,
    required: checkbox("필수여부", row),
    kind: rawKind,
    options: options
      ? options
          .split(",")
          .map((option) => option.trim())
          .filter(Boolean)
      : undefined,
    minLength: minLength > 0 ? minLength : undefined,
    maxLength: maxLength > 0 ? maxLength : undefined,
  };
}

export async function getActivityFieldSpecs(
  env: Env,
  activityPageId: string
): Promise<ActivityFieldSpec[]> {
  const dataSourceId = await findChildDataSourceId(env, activityPageId);
  if (!dataSourceId) return [];

  const { results } = await queryDataSource(env, dataSourceId, {
    sorts: [{ property: "순서", direction: "ascending" }],
  });
  return results.map(toActivityFieldSpec);
}

function isBlank(value: unknown) {
  return (
    value == null ||
    (typeof value === "string" && value.trim() === "") ||
    (Array.isArray(value) && value.length === 0)
  );
}

function isHttpUrl(value: string) {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

function isValidFieldValue(field: ActivityFieldSpec, value: unknown) {
  if (!field.required && isBlank(value)) return true;
  if (field.required && isBlank(value)) return false;

  if (field.kind === "multi_choice") {
    if (!Array.isArray(value) || !value.every((item) => typeof item === "string")) return false;
    const options = field.options ?? [];
    return value.every((item) => options.includes(item));
  }

  if (typeof value !== "string") return false;

  if (field.kind === "single_choice") return (field.options ?? []).includes(value);
  const normalizedValue = value.trim();
  if (field.kind === "url") return isHttpUrl(normalizedValue);
  if (field.kind === "phone") return /^010\d{8}$/.test(normalizedValue.replace(/\D/g, ""));
  if (field.kind === "email") return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedValue);
  if (field.minLength != null && normalizedValue.length < field.minLength) return false;
  if (field.maxLength != null && normalizedValue.length > field.maxLength) return false;

  return true;
}

export function validateActivityAnswers(
  fields: ActivityFieldSpec[],
  answers: Record<string, unknown>
): string | null {
  const fieldIds = new Set(fields.map((field) => field.id));
  if (Object.keys(answers).some((id) => !fieldIds.has(id))) {
    return "유효하지 않은 질문이 포함되어 있어요";
  }

  for (const field of fields) {
    if (!isValidFieldValue(field, answers[field.id])) {
      return `${field.label || "질문"}의 답변을 확인해 주세요`;
    }
  }

  return null;
}
