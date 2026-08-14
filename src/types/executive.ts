/**
 * 임원진 데이터 타입.
 * Notion API 연동 시에도 이 형태를 응답 스키마로 맞춘다 (src/api/executives.ts 참고).
 */
export type Executive = {
  id: string;
  name: string;
  /** 카드 뒷면 워터마크용 로마자 이니셜 1글자 (예: 김도윤 -> "K") */
  initial: string;
  /** 예: "회장", "부회장", "총무", "운영진" */
  role: string;
  department: string;
  /** 예: "24학번" */
  studentId: string;
  photoUrl: string | null;
  contact: string | null;
  /** false면 contact 값이 있어도 화면에 노출하지 않음 */
  isContactPublic: boolean;
};
