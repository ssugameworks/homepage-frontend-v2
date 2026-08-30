import { useCallback, useEffect, useRef, useState } from "react";

/**
 * 캐러셀의 실제 아이템들을 찾는다. 스크롤 컨테이너의 직계 자식이 카드 리스트를 감싸는
 * 래퍼(`<ul>` 하나) 하나뿐이면 그 자식들을, 아니면 컨테이너의 직계 자식들을 아이템으로 본다.
 */
function getItems(container: HTMLElement): HTMLElement[] {
  const children = Array.from(container.children) as HTMLElement[];
  if (children.length === 1 && children[0]!.children.length > 0) {
    return Array.from(children[0]!.children) as HTMLElement[];
  }
  return children;
}

/**
 * 가로 스크롤 캐러셀의 공통 로직.
 * - 현재 스크롤 위치에서 가장 가까운 아이템을 "현재 페이지"로 추적한다 (pagination UI용)
 * - 화살표 등으로 한 칸씩 이동하는 goPrev/goNext를 제공한다
 */
export function useCarousel(count: number) {
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const [page, setPage] = useState(1);
  const [scrollable, setScrollable] = useState(false);

  const sync = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;

    const max = el.scrollWidth - el.clientWidth;
    setScrollable(max > 1);

    const items = getItems(el);
    if (max <= 1 || count <= 1 || items.length === 0) {
      setPage(1);
      return;
    }

    // 좌우 패딩 때문에 scrollLeft가 0에서 시작하지 않으므로, 스크롤 시작점에 가장 가까운 카드를 현재 카드로 본다
    const start =
      el.getBoundingClientRect().left + (Number.parseFloat(getComputedStyle(el).paddingLeft) || 0);
    let nearest = 0;
    let shortest = Number.POSITIVE_INFINITY;

    items.forEach((item, index) => {
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

  const step = useCallback((direction: "prev" | "next") => {
    const el = scrollerRef.current;
    if (!el) return;
    const [first] = getItems(el);
    if (!first) return;

    const gap = Number.parseFloat(getComputedStyle(el).columnGap || "0");
    const stepSize = first.getBoundingClientRect().width + gap;
    el.scrollBy({ left: direction === "next" ? stepSize : -stepSize, behavior: "smooth" });
  }, []);

  return {
    scrollerRef,
    page,
    scrollable,
    onScroll: sync,
    goPrev: () => step("prev"),
    goNext: () => step("next"),
  };
}
