import { useEffect, useRef, useState } from "react";
import { IconScrollChevron } from "@/shared/assets/icons";

type Mode = "down" | "up";

const DOCK_MARGIN = 40;

/**
 * Figma 노트:
 * - [⬇ down-filled] 히어로에서 상하 바운스 반복
 * - [⬆ top-filled] position: fixed, down-filled와 동일한 위치
 *   - 기본: 화면에 고정되어 나타남
 *   - 천천히/조금 스크롤 업 → 그대로 유지
 *   - 빠르게/크게 스크롤 업 → 숨김 (Fade-out)
 *   - 다시 아래로 스크롤 다운 → 다시 나타남 (Fade-in)
 *
 * 문서 하단(푸터) 근처에서는 fixed 위치를 유지하면 푸터 위에 겹쳐 보이므로,
 * 그 구간에서는 absolute로 전환해 푸터 바로 위에 도킹시킨다(사라지지 않음).
 */
export function ScrollIndicator() {
  const [mode, setMode] = useState<Mode>("down");
  const [visible, setVisible] = useState(true);
  const [dockTop, setDockTop] = useState<number | null>(null);
  const lastY = useRef(0);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    lastY.current = window.scrollY;

    const onScroll = () => {
      const y = window.scrollY;
      const delta = y - lastY.current;
      lastY.current = y;

      if (y < window.innerHeight * 0.5) {
        setMode("down");
        setVisible(true);
      } else {
        setMode("up");
        if (delta < -60) {
          // 빠르게/크게 스크롤 업 → 숨김
          setVisible(false);
        } else if (delta > 0) {
          // 다시 아래로 스크롤 다운 → 다시 나타남
          setVisible(true);
        }
      }

      const footer = document.querySelector("footer");
      const button = buttonRef.current;
      if (footer && button) {
        const footerTop = footer.getBoundingClientRect().top + y;
        const wouldOverlapFooter = y + window.innerHeight >= footerTop + button.offsetHeight;
        setDockTop(wouldOverlapFooter ? footerTop - button.offsetHeight - DOCK_MARGIN : null);
      }
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const handleClick = () => {
    if (mode === "down") {
      window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <button
      ref={buttonRef}
      type="button"
      onClick={handleClick}
      aria-label={mode === "down" ? "아래로 스크롤" : "맨 위로 이동"}
      style={dockTop !== null ? { position: "absolute", top: dockTop, bottom: "auto" } : undefined}
      className={[
        // mobile: 하단 중앙(아이콘만) / desktop: 하단 우측 원형 버튼 (Figma web·mobile 시안 차이)
        "-translate-x-1/2 fixed bottom-10 left-1/2 z-40 flex cursor-pointer items-center justify-center border-0 bg-transparent p-2 transition-opacity duration-300 lg:right-10 lg:bottom-13.25 lg:left-auto lg:size-15 lg:translate-x-0 lg:rounded-full lg:bg-white/5 lg:p-0",
        visible ? "opacity-100" : "pointer-events-none opacity-0",
      ].join(" ")}
    >
      <span className={mode === "down" ? "home-bounce block" : "block"}>
        <IconScrollChevron
          className={[
            "block text-gray-200 transition-transform duration-300 lg:h-6.75 lg:w-11.75",
            mode === "up" ? "rotate-180" : "",
          ].join(" ")}
        />
      </span>
    </button>
  );
}
