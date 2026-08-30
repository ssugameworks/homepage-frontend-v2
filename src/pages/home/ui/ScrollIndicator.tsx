import { ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { tv } from "tailwind-variants";

type Mode = "down" | "up";

const DOCK_MARGIN = 40;

const indicator = tv({
  slots: {
    button: [
      // mobile은 히어로 안에 별도로 고정 없이 보여주므로(HeroSection 참고) 여기선 태블릿(md) 이상만 담당한다.
      "fixed right-10 bottom-13.25 z-40 hidden size-15 cursor-pointer items-center justify-center rounded-full border-0 p-0 shadow-[0_4px_16px_rgba(0,0,0,0.18)] transition-colors duration-300 md:flex",
    ],
    icon: "block transition-transform duration-300 motion-reduce:animate-none md:size-6.75",
  },
  variants: {
    mode: {
      // 최상단(down 모드) — 어두운 히어로 위라 반투명 배경 + 흰 아이콘, 애니메이션으로 스크롤을 유도한다.
      down: { button: "bg-white/15 backdrop-blur-sm", icon: "text-white animate-bounce" },
      // 스크롤한 뒤(up 모드) — 밝은 배경 위를 지나가므로 채워진 흰 배경 + 진한 아이콘으로 대비를 확보한다.
      up: { button: "bg-white", icon: "text-primary-950 rotate-180" },
    },
  },
  defaultVariants: {
    mode: "down",
  },
});

/**
 * Figma 노트:
 * - [⬇ down-filled] 히어로에서 노출
 * - [⬆ top-filled] position: fixed, down-filled와 동일한 위치, 항상 노출
 *
 * 문서 하단(푸터) 근처에서는 fixed 위치를 유지하면 푸터 위에 겹쳐 보이므로,
 * 그 구간에서는 absolute로 전환해 푸터 바로 위에 도킹시킨다.
 */
export function ScrollIndicator() {
  const [mode, setMode] = useState<Mode>("down");
  const [dockTop, setDockTop] = useState<number | null>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const button = buttonRef.current;
      const hero = document.querySelector<HTMLElement>('[aria-label="게임웍스 소개"]');
      // 버튼이 실제로 화면에 그려지는 위치(rect)를 기준으로, 그 지점이 아직 히어로
      // (어두운 배경) 안인지 이미 벗어났는지를 직접 비교한다 — 스크롤 위치와 뷰포트
      // 높이로 근사하면 버튼의 실제 화면상 위치(bottom-13.25 오프셋)와 어긋난다.
      if (hero && button) {
        const heroBottom = hero.getBoundingClientRect().bottom;
        const buttonTop = button.getBoundingClientRect().top;
        setMode(heroBottom > buttonTop ? "down" : "up");
      }

      const footer = document.querySelector("footer");
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

  const { button, icon } = indicator({ mode });

  return (
    <button
      ref={buttonRef}
      type="button"
      onClick={handleClick}
      aria-label={mode === "down" ? "아래로 스크롤" : "맨 위로 이동"}
      style={dockTop !== null ? { position: "absolute", top: dockTop, bottom: "auto" } : undefined}
      className={button()}
    >
      <ChevronDown className={icon()} />
    </button>
  );
}
