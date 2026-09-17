import { Link } from "react-router-dom";
import { ROUTES } from "@/shared/config";

type Milestone = {
  year: string;
  title: string;
  description: string;
};

/** Figma web/introduce 3 · introduce 3 (history) 원문 그대로 반영 */
const MILESTONES: Milestone[] = [
  {
    year: "2000",
    title: "시작은 2000년이였어요",
    description:
      "글로벌미디어학부가 신설되면서\n게임을 사랑하는 학생들이 모여\n게임웍스가 탄생했어요",
  },
  {
    year: "2017",
    title: "혼자보다 함께를 택했어요",
    description: "언타이틀과 손잡고 게임절 해커톤을 열었어요",
  },
  {
    year: "2020",
    title: "직접 만들고, 직접 겨뤘어요",
    description: "제1회 천하제일 창작대회가 열렸어요.\n각자 지식을 바탕으로 가치를 창출했어요",
  },
  {
    year: "2024",
    title: "경계를 넘어 더 크게 만들었어요",
    description: "디자인솔솔, 언타이틀과 함께\n연합 해커톤 WISH를 열었어요.",
  },
  {
    year: "2025",
    title: "아이디어가 창업까지 이어졌어요",
    description:
      "Flow: Startup Bridge를 시작했어요.\n아이디어가 투자 피칭까지 가는\n경험을 처음 만들었어요",
  },
];

function MilestoneCard({ milestone, align }: { milestone: Milestone; align: "left" | "right" }) {
  return (
    <div
      className={`flex flex-col gap-2 ${align === "right" ? "items-end text-right" : "items-start text-left"}`}
    >
      <p className="font-bold text-heading2 text-primary-700 leading-tight">{milestone.year}</p>
      <p className="font-bold text-xl text-gray-950 leading-tight tracking-dense lg:text-heading1">
        {milestone.title}
      </p>
      <p className="whitespace-pre-line font-medium text-body1 text-gray-800 leading-relaxed lg:text-heading2">
        {milestone.description}
      </p>
    </div>
  );
}

const dotClass =
  "relative z-10 size-3.5 shrink-0 rounded-full bg-primary-700 ring-4 ring-surface-white";

/**
 * Figma spec (web/introduce 3 · introduce 3, 1440×3746)
 * - 상단: heading1-700(38) 중앙 정렬 타이틀
 * - 타임라인: 중앙(desktop)/좌측(mobile) 세로선 + 항목별 dot, 연도 좌우 교차 배치
 * - 하단: primary/950 배경 CTA 밴드(문구 + GAMEWORKS와 함께 하러가기 버튼)
 */
export function HistorySection() {
  return (
    <>
      <section className="bg-surface-white pt-20 lg:pt-32" aria-label="게임웍스가 걸어온 역사">
        <div className="mx-auto flex w-full max-w-360 flex-col items-center gap-16 px-6 pb-20 lg:gap-24 lg:px-20 lg:pb-28">
          <h2 className="whitespace-pre-line text-center font-bold text-3xl text-gray-950 leading-tight tracking-dense lg:text-hero">
            {"멈춤 없이 나아간\n게임웍스의 시간들"}
          </h2>

          {/* Mobile: 좌측 정렬 단일 컬럼 타임라인 */}
          <ol className="relative flex w-full flex-col gap-12 pl-8 lg:hidden">
            <div
              aria-hidden
              className="absolute top-2 bottom-2 left-[7px] w-px bg-gradient-to-b from-gray-300 via-gray-300 to-transparent"
            />
            {MILESTONES.map((milestone) => (
              <li key={milestone.year} className="relative">
                <span aria-hidden className={`${dotClass} absolute top-1.5 -left-8`} />
                <MilestoneCard milestone={milestone} align="left" />
              </li>
            ))}
          </ol>

          {/* Desktop: 중앙 세로선 기준 좌우 교차 타임라인 */}
          <ol className="relative hidden w-full flex-col gap-20 lg:flex">
            <div
              aria-hidden
              className="absolute top-2 bottom-2 left-1/2 w-px -translate-x-1/2 bg-gradient-to-b from-gray-300 via-gray-300 to-transparent"
            />
            {MILESTONES.map((milestone, index) => {
              const isLeft = index % 2 === 0;
              return (
                <li
                  key={milestone.year}
                  className="grid grid-cols-[1fr_auto_1fr] items-center gap-x-10"
                >
                  <div>{isLeft ? <MilestoneCard milestone={milestone} align="right" /> : null}</div>
                  <span aria-hidden className={dotClass} />
                  <div>{isLeft ? null : <MilestoneCard milestone={milestone} align="left" />}</div>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      <section className="bg-primary-950 px-6 py-16 lg:py-20" aria-label="가입 안내">
        <div className="mx-auto flex w-full max-w-360 flex-col items-center gap-8 text-center lg:gap-10">
          <p className="whitespace-pre-line font-bold text-2xl text-logo leading-normal tracking-dense lg:text-hero">
            {"우리의 이야기는\n내일도 변함없이 계속됩니다"}
          </p>
          <Link
            to={ROUTES.REGISTER}
            className="inline-flex items-center justify-center rounded-full border border-white/50 bg-white/10 px-6 py-3.5 font-medium text-subheading text-white tracking-dense"
          >
            GAMEWORKS와 함께 하러가기
          </Link>
        </div>
      </section>
    </>
  );
}
