import { useSearchParams } from "react-router-dom";
import { ACTIVITY_OVERLAYS } from "./activityOverlays.data";
import type { ActivityId } from "./types";

const PARAM = "activity";

/**
 * 팝오버 열림 상태를 `?activity=<id>` 쿼리 파라미터에 동기화해서, 브라우저 뒤로가기로
 * 팝오버가 닫히게 한다 (라우트는 그대로 유지되고 팝오버만 사라짐).
 *
 * - open: 새 히스토리 엔트리를 push한다 — 이게 뒤로가기로 되돌릴 대상이다.
 * - close: 현재 엔트리를 replace해서 파라미터만 지운다 — 닫기 버튼/배경 클릭/Escape로 닫을 때
 *   불필요한 forward 히스토리 엔트리가 남지 않게 한다.
 */
export function useActivityOverlayParam() {
  const [searchParams, setSearchParams] = useSearchParams();
  const raw = searchParams.get(PARAM);
  const openId: ActivityId | null = raw && raw in ACTIVITY_OVERLAYS ? (raw as ActivityId) : null;

  const open = (id: ActivityId) => {
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        next.set(PARAM, id);
        return next;
      },
      { replace: false }
    );
  };

  const close = () => {
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        next.delete(PARAM);
        return next;
      },
      { replace: true }
    );
  };

  return { openId, open, close };
}
