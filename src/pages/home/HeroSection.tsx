import { Link } from "react-router-dom";
import heroBackground from "@/assets/backgrounds/hero.png";
import { ROUTES } from "@/router/routes";
import { ArrowRightIcon } from "./icons";

/**
 * 모집 중인 활동 개수
 * Figma 노트: 있을 경우 개수 문구 + 버튼, 없을 경우 문구 숨김(버튼만 노출)
 * TODO: 추후 API/데이터 연동으로 교체
 */
const RECRUITING_COUNT = 3;

/**
 * Figma spec (web 1440×1024 · mobile 390×844)
 * - 배경: image 44 — cover 배치, "계속 움직이는 배경" 노트에 맞춰 아주 느리게 드리프트
 * - content: padding 100(web) / 37(mobile), 세로 중앙, gap 32 / 40
 * - 헤드라인 main: hero1 700 (80/130 · mobile 36), tracking -3%, static/white, 줄 간격 8
 * - sub: gap 32 / 24
 *   - 문구: heading2 700 (28 · mobile 20), gray-50, "N개"는 primary/500 #4D97FF
 *   - btn: gap 16 — Button/filled primary(가입하기, heading3-700 white)
 *     · secondary(모집 중인 활동 보기, heading3-500 primary-950), 아이콘 18
 *   - mobile 버튼은 화살표 제거(스와이프 오인 방지 노트) + 가로 100%, padding 32/16
 * - hover sweep은 '모집 중인 활동 보기'에만
 */
export function HeroSection() {
  return (
    <section
      className="home-hero flex h-[calc(100svh-45px)] min-h-[560px] items-center lg:h-[calc(100svh-84px)] lg:min-h-[640px]"
      aria-label="게임웍스 소개"
    >
      <img
        src={heroBackground}
        alt=""
        aria-hidden="true"
        className="home-hero-image -z-10 absolute inset-0 size-full max-w-none object-cover object-[72%_center] lg:object-center"
      />

      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-10 px-[37px] lg:gap-8 lg:px-[100px]">
        <h1 className="flex flex-col gap-2 whitespace-pre-line font-bold text-[36px] text-white leading-[1.3] tracking-[-0.03em] lg:text-[80px]">
          <span>배우고 도전하며,</span>
          <span>가치를 만드는 사람으로</span>
        </h1>

        <div className="flex flex-col gap-6 lg:gap-8">
          {RECRUITING_COUNT > 0 ? (
            <p className="font-bold text-[20px] text-[color:var(--gw-gray-50)] leading-[1.5] lg:text-[28px]">
              지금 참여할 수 있는 활동이{" "}
              <span className="text-[color:var(--gw-primary-500)]">{RECRUITING_COUNT}개</span>{" "}
              있어요
            </p>
          ) : null}

          <div className="flex flex-col items-stretch gap-4 lg:items-start">
            <Link
              to={ROUTES.JOIN}
              className="home-btn home-btn-primary home-btn-on-dark w-full gap-4 px-8 py-4 lg:w-auto lg:px-4 lg:py-2"
            >
              <span className="home-btn-label font-bold text-[18px] text-white leading-[1.5] lg:text-[22px]">
                가입하기
                <ArrowRightIcon className="hidden lg:block" />
              </span>
            </Link>
            <Link
              to={ROUTES.ACTIVITIES}
              className="home-btn home-btn-secondary home-btn-on-dark home-sweep w-full gap-4 px-8 py-4 lg:w-auto lg:px-4 lg:py-2"
            >
              <span className="home-btn-label font-medium text-[18px] text-[color:var(--gw-primary-950)] leading-[1.5] lg:text-[22px]">
                모집 중인 활동 보기
                <ArrowRightIcon className="hidden lg:block" />
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
