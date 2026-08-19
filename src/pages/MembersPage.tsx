import dayjs from "dayjs";
import { type RefObject, useRef, useState } from "react";
import playArrowIcon from "@/assets/icons/play-arrow.svg";
import productTeamBack from "@/assets/images/executives/product-team-back.png";
import productTeamFront from "@/assets/images/executives/product-team-front.png";
import { ExecutiveCard, ExecutiveRosterCard, TeamCard } from "@/components/executives";
import { useExecutives } from "@/hooks/useExecutives";
import type { Executive } from "@/types/executive";

const PRODUCT_TEAM = {
  teamName: "Product team",
  frontImageUrl: productTeamFront,
  backImageUrl: productTeamBack,
};

function buildPastRosters(executives: Executive[], currentYear: number) {
  return [currentYear, currentYear - 1, currentYear - 2, currentYear - 3].map((year) => ({
    year,
    executives,
  }));
}

type ScrollArrowsProps = {
  onPrev: () => void;
  onNext: () => void;
  prevLabel: string;
  nextLabel: string;
  className?: string;
};

// Figma "Component 25" (material-symbols-light:play-arrow-rounded) 재현
function ScrollArrows({ onPrev, onNext, prevLabel, nextLabel, className }: ScrollArrowsProps) {
  return (
    <div className={["flex shrink-0 items-center", className].filter(Boolean).join(" ")}>
      <button
        type="button"
        aria-label={prevLabel}
        onClick={onPrev}
        className="flex size-[27px] items-center justify-center"
      >
        <img src={playArrowIcon} alt="" className="h-[15px] w-[12.5px] -scale-x-100" />
      </button>
      <button
        type="button"
        aria-label={nextLabel}
        onClick={onNext}
        className="flex size-[27px] items-center justify-center"
      >
        <img src={playArrowIcon} alt="" className="h-[15px] w-[12.5px]" />
      </button>
    </div>
  );
}

export default function MembersPage() {
  const { executives, isLoading } = useExecutives();
  const rosterScrollRef = useRef<HTMLDivElement>(null);
  const currentYear = dayjs().year();
  const pastRosters = buildPastRosters(executives, currentYear);

  // 모바일 임원진 카드: 스와이프 제스처 대신 화살표 클릭으로만 전환하되, 스와이프 느낌의 슬라이드 연출을 준다
  const totalCards = executives.length + 1;
  const [cardIndex, setCardIndex] = useState(0);
  const [cardDirection, setCardDirection] = useState<"prev" | "next">("next");
  const goToCard = (direction: "prev" | "next") => {
    setCardDirection(direction);
    setCardIndex((prev) =>
      direction === "next" ? (prev + 1) % totalCards : (prev - 1 + totalCards) % totalCards
    );
  };

  const slide = (ref: RefObject<HTMLDivElement | null>, direction: "prev" | "next") => {
    const container = ref.current;
    const firstItem = container?.firstElementChild as HTMLElement | null;
    if (!container || !firstItem) return;

    const gap = Number.parseFloat(getComputedStyle(container).columnGap || "0");
    const step = firstItem.getBoundingClientRect().width + gap;
    container.scrollBy({ left: direction === "next" ? step : -step, behavior: "smooth" });
  };

  return (
    <div className="bg-surface-white pb-24">
      <div className="mx-auto w-full max-w-[390px] px-5 pt-24 pb-16 lg:max-w-[1322px] lg:px-0">
        <div className="flex items-end justify-between lg:flex-col lg:items-center lg:gap-2 lg:text-center">
          <div>
            <p className="font-medium text-[16px] text-gray-400 leading-[1.5] lg:text-[22px]">
              Team GameWorks {currentYear}
            </p>
            <h1 className="font-bold text-[24px] text-gray-950 leading-[1.3] tracking-[-1.8px] lg:text-[60px]">
              게임웍스 임원진
            </h1>
          </div>

          <ScrollArrows
            className="lg:hidden"
            prevLabel="이전 카드"
            nextLabel="다음 카드"
            onPrev={() => goToCard("prev")}
            onNext={() => goToCard("next")}
          />
        </div>
      </div>

      {isLoading ? (
        <p className="text-center text-[16px] text-gray-600">불러오는 중...</p>
      ) : (
        <>
          {/* 모바일: 스와이프가 아닌 화살표로만 전환되는 단일 카드 뷰 — 양옆에 다른 카드가 보이지 않는다 */}
          <div className="mx-auto w-full max-w-[390px] overflow-hidden px-5 lg:hidden">
            {(() => {
              const currentExecutive = executives[cardIndex];
              const slideClassName =
                cardDirection === "next" ? "animate-card-slide-next" : "animate-card-slide-prev";
              return currentExecutive ? (
                <ExecutiveCard
                  key={currentExecutive.id}
                  executive={currentExecutive}
                  className={`w-full ${slideClassName}`}
                />
              ) : (
                <TeamCard
                  key="product-team"
                  {...PRODUCT_TEAM}
                  className={`w-full ${slideClassName}`}
                />
              );
            })()}
          </div>

          {/* 데스크탑: 정적 그리드 (Figma web/executives, card-big 420px 기준) */}
          <div className="mx-auto hidden w-full max-w-[1322px] grid-cols-3 gap-8 lg:grid">
            {executives.map((executive) => (
              <ExecutiveCard key={executive.id} executive={executive} className="w-full" />
            ))}
            <TeamCard {...PRODUCT_TEAM} className="w-full" />
          </div>

          <div className="mx-auto mt-24 w-full max-w-[390px] px-5 lg:max-w-[1322px] lg:px-0">
            <div className="mb-8 flex items-end justify-between">
              <div>
                <p className="font-medium text-[14px] text-gray-400 leading-[1.5]">
                  Past GameWorks Executives
                </p>
                <h2 className="font-bold text-[24px] text-gray-950 leading-[1.3] lg:text-[28px]">
                  역대 게임웍스 임원진
                </h2>
              </div>

              <ScrollArrows
                prevLabel="이전 연도"
                nextLabel="다음 연도"
                onPrev={() => slide(rosterScrollRef, "prev")}
                onNext={() => slide(rosterScrollRef, "next")}
              />
            </div>

            <div
              ref={rosterScrollRef}
              className="mx-auto flex w-full max-w-[390px] snap-x snap-mandatory items-stretch gap-2 overflow-x-auto scroll-smooth pb-2 lg:max-w-none lg:gap-6"
            >
              {pastRosters.map((roster) => (
                <ExecutiveRosterCard
                  key={roster.year}
                  year={roster.year}
                  executives={roster.executives}
                  className="w-[326px] shrink-0 snap-start lg:w-[354px]"
                />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
