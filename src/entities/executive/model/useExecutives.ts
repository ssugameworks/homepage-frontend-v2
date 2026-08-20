import { useEffect, useState } from "react";
import { fetchExecutives } from "../api/executiveApi";
import type { Executive } from "./types";

type UseExecutivesResult = {
  executives: Executive[];
  isLoading: boolean;
};

/**
 * 임원진 데이터를 불러온다. 데이터 출처(현재: 더미, 추후: Notion API)는
 * fetchExecutives 내부에 캡슐화되어 있어 이 훅과 사용처는 변경할 필요가 없다.
 */
export function useExecutives(): UseExecutivesResult {
  const [executives, setExecutives] = useState<Executive[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    setIsLoading(true);
    fetchExecutives().then((data) => {
      if (cancelled) return;
      setExecutives(data);
      setIsLoading(false);
    });

    return () => {
      cancelled = true;
    };
  }, []);

  return { executives, isLoading };
}
