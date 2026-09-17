import { isRouteErrorResponse, useRouteError } from "react-router-dom";
import { ROUTES } from "@/shared/config";
import { Button } from "@/shared/ui";

/**
 * 라우트 로더/렌더링 중 잡히지 않은 에러의 최종 안전망.
 * 컴포넌트 레벨 ErrorBoundary(`shared/ui/ErrorBoundary`)는 페이지 일부 구획만 비워두지만,
 * 여기까지 올라온 에러는 레이아웃 자체가 무너진 경우이므로 페이지 전체를 대체한다.
 */
export default function RouteErrorPage() {
  const error = useRouteError();
  const message = isRouteErrorResponse(error)
    ? `${error.status} ${error.statusText}`
    : error instanceof Error
      ? error.message
      : "알 수 없는 오류가 발생했어요";

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-surface-white px-6 text-center">
      <p className="typo-heading3 text-text-primary">페이지를 불러오지 못했어요</p>
      <p className="typo-body1 text-text-tertiary">{message}</p>
      <div className="flex items-center gap-3">
        <Button variant="outline" onClick={() => window.location.reload()}>
          새로고침
        </Button>
        <Button variant="primary" onClick={() => window.location.assign(ROUTES.HOME)}>
          홈으로
        </Button>
      </div>
    </div>
  );
}
