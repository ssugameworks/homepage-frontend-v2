import { apiGet } from "./client";

export type ActivityListItem = {
  id: string;
  slug: string;
  title: string;
  applyStartDate: string;
  applyEndDate: string;
  activityStartDate: string;
  activityEndDate: string;
  location: string;
  description: string;
  imageUrl: string;
};

export async function fetchActivities(): Promise<ActivityListItem[]> {
  const { activities } = await apiGet<{ activities: ActivityListItem[] }>(
    "/activities",
    "활동 목록을 불러오지 못했어요"
  );
  return activities;
}
