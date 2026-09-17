import { z } from "zod";
import { apiGetValidated } from "@/shared/api";
import { type ActivityListItem, activityListItemSchema } from "../model/types";

const activitiesResponseSchema = z.object({ activities: z.array(activityListItemSchema) });

export async function fetchActivities(): Promise<ActivityListItem[]> {
  const { activities } = await apiGetValidated(
    "/activities",
    activitiesResponseSchema,
    "활동 목록을 불러오지 못했어요"
  );
  return activities;
}
