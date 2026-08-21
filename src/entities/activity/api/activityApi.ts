import { apiGet } from "@/shared/api";
import type { ActivityListItem } from "../model/types";

export async function fetchActivities(): Promise<ActivityListItem[]> {
  const { activities } = await apiGet<{ activities: ActivityListItem[] }>(
    "/activities",
    "활동 목록을 불러오지 못했어요"
  );
  return activities;
}
