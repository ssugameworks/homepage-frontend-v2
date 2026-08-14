/**
 * 임원진 데이터 타입.
 * Notion API 연동 시에도 이 형태를 응답 스키마로 맞춘다 (src/api/executives.ts 참고).
 */
export type Executive = {
  id: string;
  name: string;
  /** 예: "회장", "부회장", "총무", "운영진" */
  role: string;
  department: string;
  /** 예: "24학번" */
  studentId: string;
  photoUrl: string | null;
  /** 명함 앞면 전체를 담은 이미지(Figma에서 내보낸 PNG). 없으면 카드가 비어 보인다 */
  frontImageUrl: string | null;
  /** 명함 뒷면 전체를 담은 이미지(Figma에서 내보낸 PNG). 없으면 카드가 비어 보인다 */
  backImageUrl: string | null;
  contact: string | null;
  /** false면 contact 값이 있어도 화면에 노출하지 않음 */
  isContactPublic: boolean;
};
