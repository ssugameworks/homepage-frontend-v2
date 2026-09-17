import {
  ErrorBoundary as SuspensiveErrorBoundary,
  useErrorBoundaryFallbackProps,
} from "@suspensive/react";
import { type ComponentPropsWithoutRef, useEffect } from "react";
import { toast } from "sonner";

function getErrorMessage(error: unknown): string {
  return error instanceof Error && error.message ? error.message : "문제가 발생했어요";
}

/** ErrorBoundary의 기본 fallback: 아무것도 렌더링하지 않고 토스트로만 에러를 알린다. */
function DefaultErrorFallback() {
  const { error, reset } = useErrorBoundaryFallbackProps();

  // biome-ignore lint/correctness/useExhaustiveDependencies: 에러가 바뀔 때만 새 토스트를 띄워야 하고, reset을 넣으면 매 렌더마다 다시 뜬다.
  useEffect(() => {
    toast.error(getErrorMessage(error), { action: { label: "다시 시도", onClick: reset } });
  }, [error]);

  return null;
}

/**
 * 하위 트리에서 렌더링 중 발생한(캐치되지 않은) 에러를 잡아 토스트로 보여준다.
 * 페이지 전체를 흰 화면으로 날리는 대신, 문제가 생긴 구획만 비워두고 나머지는 그대로 둔다.
 */
export function ErrorBoundary({
  fallback,
  ...props
}: Omit<ComponentPropsWithoutRef<typeof SuspensiveErrorBoundary>, "fallback"> & {
  fallback?: ComponentPropsWithoutRef<typeof SuspensiveErrorBoundary>["fallback"];
}) {
  return <SuspensiveErrorBoundary {...props} fallback={fallback ?? <DefaultErrorFallback />} />;
}
