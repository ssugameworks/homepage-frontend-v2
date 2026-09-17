import { z } from "zod";

/** 활동 신청 폼이 지원하는 질문 종류. fieldKinds.tsx의 FIELD_KINDS가 이 값들을 전부(그리고 이것만) 구현해야 한다. */
export const FIELD_KIND_VALUES = [
  "short_text",
  "long_text",
  "single_choice",
  "multi_choice",
  "url",
  "phone",
  "email",
] as const;

export type FieldKind = (typeof FIELD_KIND_VALUES)[number];

/** 한 질문(=한 스텝)의 스펙. */
const fieldSpecSchema = z.object({
  id: z.string(),
  label: z.string(),
  hint: z.string().optional(),
  required: z.boolean(),
  /** single_choice / multi_choice 전용 */
  options: z.array(z.string()).optional(),
  /** long_text 전용 */
  minLength: z.number().optional(),
  maxLength: z.number().optional(),
});

export type FieldSpec = z.infer<typeof fieldSpecSchema>;

const notionFieldSpecSchema = fieldSpecSchema.extend({
  kind: z.enum(FIELD_KIND_VALUES),
});

export type NotionFieldSpec = z.infer<typeof notionFieldSpecSchema>;

const notionActivityInfoSchema = z.object({
  applyPeriod: z.string(),
  activityPeriod: z.string(),
  location: z.string(),
  description: z.string(),
});

export type NotionActivityInfo = z.infer<typeof notionActivityInfoSchema>;

/**
 * 활동 신청 폼 API 응답의 런타임 검증 스키마. 백엔드(Notion 연동)의 응답 형태가
 * 이 스키마와 어긋나면, 화면 렌더링 중 알 수 없는 곳에서 죽는 대신 fetchFormSchema
 * 호출 시점에 바로 명확한 에러로 드러난다.
 */
export const notionFormSchemaSchema = z.object({
  slug: z.string(),
  title: z.string(),
  activity: notionActivityInfoSchema,
  fields: z.array(notionFieldSpecSchema),
});

export type NotionFormSchema = z.infer<typeof notionFormSchemaSchema>;
