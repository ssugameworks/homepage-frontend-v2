import { useEffect, useState } from "react";
import { fetchPastRosters } from "../api/executiveApi";
import type { Executive } from "./types";

export type PastRoster = { year: number; executives: Executive[] };

type UsePastRostersResult = {
  pastRosters: PastRoster[];
  isLoading: boolean;
};

/**
 * 과거 연도 임원진 로스터를 불러온다. 데이터 출처(현재: 더미, 추후: Notion API)는
 * fetchPastRosters 내부에 캡슐화되어 있어 이 훅과 사용처는 변경할 필요가 없다.
 */
export function usePastRosters(): UsePastRostersResult {
  const [pastRosters, setPastRosters] = useState<PastRoster[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    setIsLoading(true);
    fetchPastRosters().then((data) => {
      if (cancelled) return;
      setPastRosters(data);
      setIsLoading(false);
    });

    return () => {
      cancelled = true;
    };
  }, []);

  return { pastRosters, isLoading };
}
