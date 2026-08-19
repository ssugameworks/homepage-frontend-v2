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
  const res = await fetch("/api/activities");
  if (!res.ok) {
    const body = await res.json().catch(() => null);
    throw new Error(body?.error ?? "활동 목록을 불러오지 못했어요");
  }
  const { activities } = (await res.json()) as { activities: ActivityListItem[] };
  return activities;
}
