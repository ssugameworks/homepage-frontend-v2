import { ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { IconArrowRight } from "@/shared/assets";
import heroBackground from "@/shared/assets/backgrounds/hero.png";
import { ROUTES } from "@/shared/config";
import { glassButtonClass, glassButtonLabelClass } from "./glassButton";

/** TODO: 추후 API/데이터 연동으로 교체. 0이면 문구를 숨기고 버튼만 노출한다. */
const RECRUITING_COUNT = 3;

/** 게임웍스 소개 히어로 섹션. */
export function HeroSection() {
  return (
    <section
      className="relative isolate flex h-[calc(100svh-45px)] min-h-140 items-center overflow-hidden bg-[#01040f] md:h-[calc(100svh-84px)] md:min-h-160"
      aria-label="게임웍스 소개"
    >
      <img
        src={heroBackground}
        alt=""
        aria-hidden="true"
        className="-z-10 absolute inset-0 size-full max-w-none animate-hero-drift object-cover object-[72%_center] will-change-transform motion-reduce:animate-none md:object-center"
      />

      <div className="mx-auto flex w-full max-w-360 flex-col gap-10 px-9.25 md:gap-8 md:px-25">
        <h1 className="flex flex-col gap-2 whitespace-pre-line font-bold text-4xl text-white leading-tight tracking-dense md:text-6xl lg:text-[80px]">
          <span>배우고 도전하며,</span>
          <span>가치를 만드는 사람으로</span>
        </h1>

        <div className="flex flex-col gap-6 md:gap-8">
          {RECRUITING_COUNT > 0 ? (
            <p className="font-bold text-xl text-gray-100 leading-normal md:typo-heading2">
              지금 참여할 수 있는 활동이{" "}
              <span className="text-primary-400">{RECRUITING_COUNT}개</span> 있어요
            </p>
          ) : null}

          <div className="flex flex-col items-stretch gap-4 md:items-start">
            <Link
              to={ROUTES.REGISTER}
              className={`${glassButtonClass({ variant: "primary", onDark: true })} w-full gap-4 px-8 py-4 md:w-auto md:px-4 md:py-2`}
            >
              <span
                className={`${glassButtonLabelClass} font-bold text-lg text-white leading-normal md:typo-heading3`}
              >
                가입하기
                <IconArrowRight className="-rotate-90 hidden md:block" />
              </span>
            </Link>
            <Link
              to={ROUTES.ACTIVITIES}
              className={`${glassButtonClass({ variant: "secondary", onDark: true, sweep: true })} w-full gap-4 px-8 py-4 md:w-auto md:px-4 md:py-2`}
            >
              <span
                className={`${glassButtonLabelClass} font-medium text-lg text-primary-950 leading-normal md:typo-heading3 md:typo-medium`}
              >
                모집 중인 활동 보기
                <IconArrowRight className="-rotate-90 hidden md:block" />
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* 모바일/태블릿 전용 — md 이상은 ScrollIndicator(fixed, 위/아래 토글)가 대신한다.
          fixed로 고정하지 않고 히어로 안에 두어, 첫 화면을 벗어나면 스크롤과 함께 자연스럽게 사라진다. */}
      <button
        type="button"
        onClick={() => window.scrollTo({ top: window.innerHeight, behavior: "smooth" })}
        aria-label="아래로 스크롤"
        className="-translate-x-1/2 absolute bottom-10 left-1/2 flex cursor-pointer items-center justify-center border-0 bg-transparent p-2 md:hidden"
      >
        <ChevronDown className="block size-9 animate-bounce text-gray-200 motion-reduce:animate-none" />
      </button>
    </section>
  );
}
