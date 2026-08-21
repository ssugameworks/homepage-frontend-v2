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
      className="relative isolate flex h-[calc(100svh-45px)] min-h-140 items-center overflow-hidden bg-[#01040f] lg:h-[calc(100svh-84px)] lg:min-h-160"
      aria-label="게임웍스 소개"
    >
      <img
        src={heroBackground}
        alt=""
        aria-hidden="true"
        className="-z-10 absolute inset-0 size-full max-w-none animate-hero-drift object-cover object-[72%_center] will-change-transform motion-reduce:animate-none lg:object-center"
      />

      <div className="mx-auto flex w-full max-w-360 flex-col gap-10 px-9.25 lg:gap-8 lg:px-25">
        <h1 className="flex flex-col gap-2 whitespace-pre-line font-bold text-4xl text-white leading-tight tracking-dense lg:text-[80px]">
          <span>배우고 도전하며,</span>
          <span>가치를 만드는 사람으로</span>
        </h1>

        <div className="flex flex-col gap-6 lg:gap-8">
          {RECRUITING_COUNT > 0 ? (
            <p className="font-bold text-xl text-gray-100 leading-normal lg:typo-heading2">
              지금 참여할 수 있는 활동이{" "}
              <span className="text-primary-400">{RECRUITING_COUNT}개</span> 있어요
            </p>
          ) : null}

          <div className="flex flex-col items-stretch gap-4 lg:items-start">
            <Link
              to={ROUTES.REGISTER}
              className={`${glassButtonClass({ variant: "primary", onDark: true })} w-full gap-4 px-8 py-4 lg:w-auto lg:px-4 lg:py-2`}
            >
              <span
                className={`${glassButtonLabelClass} font-bold text-lg text-white leading-normal lg:typo-heading3`}
              >
                가입하기
                <IconArrowRight className="-rotate-90 hidden lg:block" />
              </span>
            </Link>
            <Link
              to={ROUTES.ACTIVITIES}
              className={`${glassButtonClass({ variant: "secondary", onDark: true, sweep: true })} w-full gap-4 px-8 py-4 lg:w-auto lg:px-4 lg:py-2`}
            >
              <span
                className={`${glassButtonLabelClass} font-medium text-lg text-primary-950 leading-normal lg:typo-heading3 lg:typo-medium`}
              >
                모집 중인 활동 보기
                <IconArrowRight className="-rotate-90 hidden lg:block" />
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
