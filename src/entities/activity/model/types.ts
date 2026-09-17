import { z } from "zod";

/**
 * 활동 목록 API 응답의 런타임 검증 스키마. 백엔드 응답 형태가 이 스키마와 어긋나면
 * 화면 렌더링 중 알 수 없는 곳에서 죽는 대신 fetchActivities 호출 시점에 바로 드러난다.
 */
export const activityListItemSchema = z.object({
  id: z.string(),
  slug: z.string(),
  title: z.string(),
  applyStartDate: z.string(),
  applyEndDate: z.string(),
  activityStartDate: z.string(),
  activityEndDate: z.string(),
  location: z.string(),
  description: z.string(),
  imageUrl: z.string(),
});

export type ActivityListItem = z.infer<typeof activityListItemSchema>;
