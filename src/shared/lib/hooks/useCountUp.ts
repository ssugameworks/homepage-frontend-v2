import { useEffect, useState } from "react";

const easeOutCubic = (t: number) => 1 - (1 - t) ** 3;

/**
 * 숫자 카운팅 애니메이션 훅
 * - `start`가 true가 되면 0 → target으로 카운트업
 * - prefers-reduced-motion 환경에서는 즉시 target으로 고정
 */
export function useCountUp(target: number, start: boolean, durationMs = 1200) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!start) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setValue(target);
      return;
    }

    let raf = 0;
    const startedAt = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - startedAt) / durationMs, 1);
      setValue(Math.round(easeOutCubic(progress) * target));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [start, target, durationMs]);

  return value;
}
