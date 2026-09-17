import { useQuery } from "@tanstack/react-query";
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
  const { data, isLoading } = useQuery({
    queryKey: ["executives"],
    queryFn: fetchExecutives,
  });

  return { executives: data ?? [], isLoading };
}
