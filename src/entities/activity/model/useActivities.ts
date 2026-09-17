import { useQuery } from "@tanstack/react-query";
import { fetchActivities } from "../api/activityApi";

export const activitiesQueryKey = ["activities"] as const;

/**
 * 활동 목록을 불러온다. 홈 히어로/활동 목록 페이지가 같은 쿼리 키를 써서
 * 캐시를 공유하므로, 한쪽에서 이미 불러온 데이터가 있으면 재요청하지 않는다.
 */
export function useActivities() {
  return useQuery({
    queryKey: activitiesQueryKey,
    queryFn: fetchActivities,
  });
}
