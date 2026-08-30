import type { ActivityId } from "./types";

/**
 * 카드 티저의 chip과 팝오버의 title은 활동을 가리키는 동일한 라벨이라 여기서 한 곳으로 관리한다.
 * (카드 헤드라인과 팝오버 description은 서로 다른 문장이라 별도로 관리한다.)
 */
export const ACTIVITY_META: Record<ActivityId, { label: string }> = {
  coffeechat: { label: "커피챗" },
  buddy: { label: "짝선짝후" },
  mentoring: { label: "멘토링" },
  ideathon: { label: "아이디어톤" },
  flow: { label: "Flow" },
  mt: { label: "MT" },
};
