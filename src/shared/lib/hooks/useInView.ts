import { useMemo, useRef, useState } from "react";
import { useIntersectionObserver } from "react-simplikit";

/**
 * 요소가 뷰포트에 처음 들어오는 시점을 감지하는 훅 (1회성).
 * IntersectionObserver를 지원하지 않는 환경에서는 즉시 true를 반환한다.
 */
export function useInView<T extends HTMLElement>(threshold = 0.3) {
  const [inView, setInView] = useState(() => typeof IntersectionObserver === "undefined");
  const triggeredRef = useRef(inView);
  const options = useMemo(() => ({ threshold }), [threshold]);

  const ref = useIntersectionObserver<T>((entry) => {
    if (entry.isIntersecting && !triggeredRef.current) {
      triggeredRef.current = true;
      setInView(true);
    }
  }, options);

  return { ref, inView };
}
