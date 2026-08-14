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

function isActivityFieldKind(value: string): value is ActivityFieldKind {
  return ACTIVITY_FIELD_KINDS.some((kind) => kind === value);
}

export function toActivityFieldSpec(row: NotionPage): ActivityFieldSpec {
  const rawKind = select("타입", row) ?? "short_text";
  const options = richText("옵션", row);
  const minLength = numberProp("최소글자수", row);
  const maxLength = numberProp("최대글자수", row);

  return {
    id: row.id,
    label: title("라벨", row),
    hint: richText("힌트", row) || undefined,
    required: checkbox("필수여부", row),
    kind: isActivityFieldKind(rawKind) ? rawKind : "short_text",
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
  return value == null || value === "" || (Array.isArray(value) && value.length === 0);
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
  if (field.kind === "url") return isHttpUrl(value);
  if (field.kind === "phone") return /^010\d{8}$/.test(value.replace(/\D/g, ""));
  if (field.kind === "email") return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  if (field.minLength != null && value.length < field.minLength) return false;
  if (field.maxLength != null && value.length > field.maxLength) return false;

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
