import { useEffect, useRef, useState } from "react";
import { ScrollChevronIcon } from "./icons";

type Mode = "down" | "up";

/**
 * Figma 노트:
 * - [⬇ down-filled] 히어로에서 상하 바운스 반복
 * - [⬆ top-filled] position: fixed, down-filled와 동일한 위치
 *   - 기본: 화면에 고정되어 나타남
 *   - 천천히/조금 스크롤 업 → 그대로 유지
 *   - 빠르게/크게 스크롤 업 → 숨김 (Fade-out)
 *   - 다시 아래로 스크롤 다운 → 다시 나타남 (Fade-in)
 */
export function ScrollIndicator() {
  const [mode, setMode] = useState<Mode>("down");
  const [visible, setVisible] = useState(true);
  const lastY = useRef(0);

  useEffect(() => {
    lastY.current = window.scrollY;

    const onScroll = () => {
      const y = window.scrollY;
      const delta = y - lastY.current;
      lastY.current = y;

      if (y < window.innerHeight * 0.5) {
        setMode("down");
        setVisible(true);
        return;
      }

      setMode("up");
      if (delta < -60) {
        // 빠르게/크게 스크롤 업 → 숨김
        setVisible(false);
      } else if (delta > 0) {
        // 다시 아래로 스크롤 다운 → 다시 나타남
        setVisible(true);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
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
      type="button"
      onClick={handleClick}
      aria-label={mode === "down" ? "아래로 스크롤" : "맨 위로 이동"}
      className={[
        // mobile: 하단 중앙(아이콘만) / desktop: 하단 우측 원형 버튼 (Figma web·mobile 시안 차이)
        "-translate-x-1/2 fixed bottom-10 left-1/2 z-40 flex cursor-pointer items-center justify-center border-0 bg-transparent p-2 transition-opacity duration-300 lg:right-[40px] lg:bottom-[53px] lg:left-auto lg:size-[60px] lg:translate-x-0 lg:rounded-full lg:bg-white/5 lg:p-0",
        visible ? "opacity-100" : "pointer-events-none opacity-0",
      ].join(" ")}
    >
      <span className={mode === "down" ? "home-bounce block" : "block"}>
        <ScrollChevronIcon
          className={[
            "block text-[color:var(--gw-gray-200)] transition-transform duration-300 lg:h-[27px] lg:w-[47px]",
            mode === "up" ? "rotate-180" : "",
          ].join(" ")}
        />
      </span>
    </button>
  );
}
