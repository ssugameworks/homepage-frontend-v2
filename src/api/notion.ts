import type { FieldKind, FieldSpec } from "@/components/forms";

export type NotionFieldSpec = FieldSpec & { kind: FieldKind };

export type NotionFormSchema = {
  slug: string;
  title: string;
  fields: NotionFieldSpec[];
};

// TODO: 임시 mock
// 백엔드/프록시 엔드포인트가 정해지면 이 상수는 지우고 아래 fetchFormSchema
// 내부를 실제 호출로 교체한다.
const MOCK_FORM_SCHEMAS: Record<string, NotionFormSchema> = {
  "activity-survey": {
    slug: "activity-survey",
    title: "활동 설문",
    fields: [
      { id: "nickname", label: "닉네임", required: true, kind: "short_text" },
      {
        id: "feedback",
        label: "이번 활동 소감을 들려주세요",
        hint: "50자 이상 적어주세요",
        required: true,
        kind: "long_text",
      },
      {
        id: "favoritePart",
        label: "가장 좋았던 파트를 선택해주세요",
        required: true,
        kind: "single_choice",
        options: ["기획", "디자인", "프론트엔드", "백엔드"],
      },
      {
        id: "interests",
        label: "관심 있는 활동을 모두 선택해주세요",
        required: false,
        kind: "multi_choice",
        options: ["세미나", "해커톤", "스터디", "네트워킹"],
      },
      { id: "portfolioUrl", label: "포트폴리오 링크", required: false, kind: "url" },
    ],
  },
};

export async function fetchFormSchema(slug: string): Promise<NotionFormSchema> {
  const schema = MOCK_FORM_SCHEMAS[slug];
  if (!schema) {
    throw new Error(`폼을 찾을 수 없어요: ${slug}`);
  }
  return schema;
}
