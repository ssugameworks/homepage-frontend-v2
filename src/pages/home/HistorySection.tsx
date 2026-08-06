import { useCountUp, useInView } from "@/hooks";

const STATS = [
  { value: 25, suffix: "년", label: "역사" },
  { value: 160, suffix: "명+", label: "누적 부원 수" },
  { value: 30, suffix: "개+", label: "프로그램" },
] as const;

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
      className="flex min-h-[200px] items-center bg-[color:var(--gw-bg-white)] py-10 lg:min-h-[500px] lg:py-0"
      aria-label="게임웍스가 걸어온 시간"
    >
      <div className="mx-auto flex w-full max-w-[1440px] flex-col items-center gap-6 px-6 text-center lg:gap-8">
        <div className="flex flex-col items-center gap-2">
          <p className="font-medium text-[16px] text-[color:var(--gw-gray-400)] leading-[1.5]">
            History
          </p>
          <h2 className="font-bold text-[24px] text-black leading-[1.5] lg:text-[38px]">
            함께 걸어온 시간
          </h2>
        </div>

        <div ref={ref} className="flex justify-center gap-[30px] rounded-[15px] p-4 lg:gap-[100px]">
          {STATS.map((stat) => (
            <StatItem key={stat.label} {...stat} start={inView} />
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
}: {
  value: number;
  suffix: string;
  label: string;
  start: boolean;
}) {
  const current = useCountUp(value, start);

  return (
    <div className="flex flex-col items-center">
      {/* Figma: 숫자·접미사 모두 hero1의 letter-spacing(-3% of 80 = -2.4px · mobile -1.08px) 상속 */}
      <p className="font-bold text-[color:var(--gw-primary-900)] tracking-[-1.08px] lg:tracking-[-2.4px]">
        <span className="text-[36px] leading-[1.3] lg:text-[80px]">{current}</span>
        <span className="text-[28px] leading-[1.5] lg:text-[38px]">{suffix}</span>
      </p>
      <p className="font-light text-[16px] text-[color:var(--gw-gray-600)] leading-[1.5] tracking-[-0.48px]">
        {label}
      </p>
    </div>
  );
}
