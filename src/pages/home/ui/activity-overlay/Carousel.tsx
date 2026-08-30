import type { ReactNode } from "react";
import { useCarousel } from "@/shared/lib";

/**
 * mobile 전용 가로 스와이프 캐러셀 + pagination bar
 *
 * Figma 개발 노트(overlay/pagination)
 * - Track 100×5px 고정, Fill은 (현재 / 전체) 비율로 계산
 * - Counter는 `{현재} / {전체}`, 스와이프가 끝나면 현재 페이지 갱신
 * - 전체가 1개면 숨김
 */
export function Carousel({ count, children }: { count: number; children: ReactNode }) {
  const { scrollerRef, page, scrollable, onScroll } = useCarousel(count);
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
        onScroll={onScroll}
        className="home-carousel -mx-6 flex snap-x snap-mandatory overflow-x-auto px-6 scroll-pl-6 scroll-pr-6"
      >
        {children}
      </div>
    </div>
  );
}
