import { useCallback, useEffect, useRef, useState } from "react";

const WORDS = ["기획", "디자인", "개발"] as const;

/** 단어 유지 0.9초 + 전환 0.35초 (Figma 노트: 유지 0.8~1.0s / 전환 0.3~0.4s) */
const HOLD_MS = 900;
const TRANSITION_MS = 350;

/**
 * Figma spec (web 1440×700 · mobile 390×500)
 * - 섹션: bg semantic/background/white(#FAFAFA), content 세로 중앙 정렬
 * - content: flex-col gap/large (24 · mobile 16), items-center
 * - main(title): hero2 700 (60/130 · mobile 28), tracking -3%, gray-950
 *   - Component 9: 기획 · 디자인 · 개발, gap 8, overflow-clip
 *   - 하이라이트는 linear/intro (primary/900 80% → primary/800 80% → primary/900 80%)
 *     — 그라디언트는 단어 하나 폭을 기준으로 걸리므로 단어마다 개별 적용
 * - sub: subheading-500 (18 · mobile 16), gray-500, center
 */
export function IntroSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const wordsRef = useRef<HTMLSpanElement | null>(null);
  const [highlight, setHighlight] = useState({ x: 0, w: 0 });

  /** 활성 단어의 위치·너비를 재서 하이라이트 클립 범위로 넘김 */
  const measure = useCallback(() => {
    const container = wordsRef.current;
    const word = container?.children[activeIndex] as HTMLElement | undefined;
    if (!container || !word) return;

    setHighlight({ x: word.offsetLeft, w: word.offsetWidth });
  }, [activeIndex]);

  useEffect(() => {
    measure();
    window.addEventListener("resize", measure);
    document.fonts?.ready.then(measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const interval = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % WORDS.length);
    }, HOLD_MS + TRANSITION_MS);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <section
      id="intro"
      className="flex min-h-125 items-center bg-surface-white lg:min-h-175"
      aria-label="게임웍스 활동 소개"
    >
      <div className="mx-auto flex w-full max-w-360 flex-col items-center gap-4 px-6 text-center lg:gap-6">
        <h2 className="flex flex-col items-center typo-heading2 text-gray-950 lg:text-6xl">
          {/* Component 9 — 하이라이트가 한 흐름처럼 단어 사이를 미끄러져 이동 */}
          <span className="home-intro-words gap-2 overflow-clip">
            <span ref={wordsRef} className="inline-flex gap-2">
              {WORDS.map((word) => (
                <span key={word}>{word}</span>
              ))}
            </span>
            <span
              aria-hidden="true"
              className="home-intro-highlight"
              style={
                {
                  "--hx": `${highlight.x}px`,
                  "--hw": `${highlight.w}px`,
                } as React.CSSProperties
              }
            >
              <span className="inline-flex gap-2">
                {WORDS.map((word) => (
                  <span key={word} className="home-intro-word">
                    {word}
                  </span>
                ))}
              </span>
            </span>
          </span>
          <span>함께 배우고 직접 만들어봐요</span>
        </h2>

        <p className="font-medium text-base text-gray-500 leading-normal lg:text-lg">
          <span className="lg:hidden">
            스터디와 멘토링으로 배우고,
            <br />
            아이디어톤과 해커톤으로 실전 경험을 쌓아요
          </span>
          <span className="hidden lg:inline">
            스터디와 멘토링으로 배우고, 아이디어톤과 해커톤으로 실전 경험을 쌓아요
          </span>
        </p>
      </div>
    </section>
  );
}
