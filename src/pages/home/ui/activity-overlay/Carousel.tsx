import { type ReactNode, useCallback, useEffect, useRef, useState } from "react";

/**
 * mobile 전용 가로 스와이프 캐러셀 + pagination bar
 *
 * Figma 개발 노트(overlay/pagination)
 * - Track 100×5px 고정, Fill은 (현재 / 전체) 비율로 계산
 * - Counter는 `{현재} / {전체}`, 스와이프가 끝나면 현재 페이지 갱신
 * - 전체가 1개면 숨김
 */
export function Carousel({ count, children }: { count: number; children: ReactNode }) {
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const [page, setPage] = useState(1);
  const [scrollable, setScrollable] = useState(false);

  const sync = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;

    const max = el.scrollWidth - el.clientWidth;
    setScrollable(max > 1);

    const track = el.firstElementChild;
    if (max <= 1 || count <= 1 || !track) {
      setPage(1);
      return;
    }

    // 좌우 패딩 때문에 scrollLeft가 0에서 시작하지 않으므로, 스크롤 시작점에 가장 가까운 카드를 현재 카드로 본다
    const start =
      el.getBoundingClientRect().left + (Number.parseFloat(getComputedStyle(el).paddingLeft) || 0);
    let nearest = 0;
    let shortest = Number.POSITIVE_INFINITY;

    Array.from(track.children).forEach((item, index) => {
      const distance = Math.abs(item.getBoundingClientRect().left - start);
      if (distance < shortest) {
        shortest = distance;
        nearest = index;
      }
    });

    setPage(Math.min(nearest + 1, count));
  }, [count]);

  useEffect(() => {
    sync();
    window.addEventListener("resize", sync);
    return () => window.removeEventListener("resize", sync);
  }, [sync]);

  const showPagination = scrollable && count > 1;

  return (
    <div className="flex flex-col gap-8">
      {showPagination ? (
        <div className="flex items-center justify-center gap-2">
          <span className="block h-1.25 w-25 overflow-hidden rounded-full bg-gray-200">
            <span
              className="block h-full rounded-full bg-primary-400 transition-[width] duration-200"
              style={{ width: `${(page / count) * 100}%` }}
            />
          </span>
          <span aria-live="polite" className="font-medium text-xs text-gray-700 leading-normal">
            {page}/{count}
          </span>
        </div>
      ) : null}

      <div
        ref={scrollerRef}
        onScroll={sync}
        className="home-carousel -mx-6 flex snap-x snap-mandatory overflow-x-auto px-6 scroll-pl-6 scroll-pr-6"
      >
        {children}
      </div>
    </div>
  );
}
