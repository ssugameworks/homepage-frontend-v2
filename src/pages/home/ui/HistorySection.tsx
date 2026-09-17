import NumberFlow from "@number-flow/react";
import { useEffect, useState } from "react";
import { useInView } from "@/shared/lib";
import { SectionHeading } from "@/shared/ui";

const STATS = [
  { value: 25, suffix: "년", label: "역사" },
  { value: 160, suffix: "명+", label: "누적 부원 수" },
  { value: 30, suffix: "개+", label: "프로그램" },
] as const;

/** 항목 간 카운트업 시작 시점 간격 — 왼쪽부터 차례로 시작하게 만든다. */
const STAGGER_MS = 200;

/**
 * Figma spec (web 1440×500 · mobile 390×200)
 * - 섹션: bg #FAFAFA, content 세로 중앙 / content gap/xlarge (32 · mobile 24), items-center
 * - main_content/title: gap 8 — "History" body1-500(16) gray-400,
 *   "함께 걸어온 시간" heading1-700(38 · mobile 24) static/black
 * - history: padding 16, radius 15, gap 100(web) / 30(mobile)
 * - 숫자: hero1-700 (80/130 · mobile 36), tracking -3%, primary/900 #003580
 * - 접미사: heading1-700 (38 · mobile 28), 같은 색
 * - 라벨: body1-300 (16, Light), tracking -3%, gray-600
 * - 인터랙션: 기존 홈페이지와 동일한 숫자 카운팅
 */
export function HistorySection() {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <section
      className="flex min-h-50 items-center bg-surface-white py-10 lg:min-h-125 lg:py-0"
      aria-label="게임웍스가 걸어온 시간"
    >
      <div className="mx-auto flex w-full max-w-360 flex-col items-center gap-6 px-6 text-center lg:gap-8">
        <SectionHeading eyebrow="History" title="함께 걸어온 시간" align="center" />

        <div ref={ref} className="flex justify-center gap-7.5 rounded-2xl p-4 lg:gap-25">
          {STATS.map((stat, index) => (
            <StatItem key={stat.label} {...stat} start={inView} delayMs={index * STAGGER_MS} />
          ))}
        </div>
      </div>
    </section>
  );
}

function StatItem({
  value,
  suffix,
  label,
  start,
  delayMs,
}: {
  value: number;
  suffix: string;
  label: string;
  start: boolean;
  delayMs: number;
}) {
  // start가 true여도 delayMs만큼 기다렸다가 카운트업을 시작해, 항목이 순서대로 돈다.
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (!start) return;
    const timer = setTimeout(() => setActive(true), delayMs);
    return () => clearTimeout(timer);
  }, [start, delayMs]);

  return (
    <div className="flex flex-col items-center">
      {/* Figma: 숫자·접미사 모두 hero1의 letter-spacing(-3% of 80 = -2.4px · mobile -1.08px) 상속 */}
      <p className="font-bold text-primary-800 tracking-dense">
        <NumberFlow
          value={active ? value : 0}
          transformTiming={{ duration: 1200, easing: "cubic-bezier(0.33, 1, 0.68, 1)" }}
          className="text-4xl leading-tight md:text-6xl lg:text-[80px]"
        />
        {/* 상위 p의 tracking(-3%, 숫자 크기 기준)을 그대로 물려받아야 해서 typo-* 토큰(자체 tracking 포함) 대신 크기만 지정한다 */}
        <span className="text-heading2 leading-normal md:text-3xl lg:text-heading1">{suffix}</span>
      </p>
      <p className="font-light text-base text-gray-600 leading-normal tracking-dense">{label}</p>
    </div>
  );
}
