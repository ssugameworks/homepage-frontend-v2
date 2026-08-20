import type { ActivityListItem } from "../model/types";

// 날짜 포맷 헬퍼 ("2026-08-01" -> "2026.08.01")
export const formatDate = (dateStr: string) => dateStr.replace(/-/g, ".");
export const formatPeriod = (start: string, end: string) =>
  `${formatDate(start)} ~ ${formatDate(end)}`;

export type ActivitySummary = {
  applyPeriod: string;
  activityPeriod: string;
  location: string;
  description: string;
};

/** ActivityCard 목록 데이터를 ApplyPage의 활동 정보 카드가 쓰는 형태로 변환한다. */
export function toActivitySummary(activity: ActivityListItem): ActivitySummary {
  return {
    applyPeriod: formatPeriod(activity.applyStartDate, activity.applyEndDate),
    activityPeriod: formatPeriod(activity.activityStartDate, activity.activityEndDate),
    location: activity.location,
    description: activity.description,
  };
}
