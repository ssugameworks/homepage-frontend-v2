import { Link } from "react-router-dom";
import ctaPattern from "@/assets/backgrounds/cta-pattern.svg";
import { ROUTES } from "@/router/routes";
import { ArrowRightIcon } from "./icons";

/**
 * Figma spec (web 1440×170 · mobile 390×176)
 * - 섹션: padding 110/20(web) · 24/30(mobile)
 *   bg linear/CTA — linear-gradient(90deg, primary/900 #003580 → primary/800 #004BB2)
 *   + Union 로고 패턴(1464×183) 중앙 배치
 * - web: content gap 8, items-start — 타이틀 heading1-700(38) white
 *   + Button/text(가입하기 body1-500 gray-50 + 18 아이콘 + 밑줄), padding 15/10
 * - mobile: content gap 20, items-center — 타이틀 24 두 줄
 *   + Button/filled(가입하기 heading3-700 18, 화살표 없음)
 */
export function CtaSection() {
  return (
    <section className="home-cta relative isolate overflow-hidden" aria-label="가입 안내">
      <img
        src={ctaPattern}
        alt=""
        aria-hidden="true"
        className="-translate-x-1/2 -translate-y-1/2 -z-10 absolute top-1/2 left-1/2 h-[183px] w-[1464px] max-w-none"
      />

      <div className="mx-auto flex min-h-[176px] max-w-[1440px] items-center justify-center px-6 py-[30px] lg:min-h-[170px] lg:px-[110px] lg:py-5">
        <div className="flex flex-col items-center gap-5 lg:items-start lg:gap-2">
          <h2 className="text-center font-bold text-[24px] text-white leading-[1.5] lg:text-[38px]">
            <span className="lg:hidden">
              함께 몰입하고 성장할
              <br />
              여러분을 기다려요
            </span>
            <span className="hidden lg:inline">함께 몰입하고 성장할 여러분을 기다려요</span>
          </h2>

          {/* mobile: Button/filled / desktop: Button/text (Figma web·mobile 시안 차이) */}
          <Link
            to={ROUTES.JOIN}
            className="home-btn home-btn-primary home-btn-on-dark gap-4 px-4 py-2 lg:hidden"
          >
            <span className="home-btn-label font-bold text-[18px] text-white leading-[1.5]">
              가입하기
            </span>
          </Link>
          <span className="hidden px-[15px] py-2.5 lg:block">
            <Link
              to={ROUTES.JOIN}
              className="flex flex-col items-start justify-center gap-1 text-[color:var(--gw-gray-50)]"
            >
              <span className="flex items-center gap-2 font-medium text-[16px] leading-[1.5]">
                가입하기
                <ArrowRightIcon />
              </span>
              <span aria-hidden="true" className="block h-px w-full bg-current" />
            </Link>
          </span>
        </div>
      </div>
    </section>
  );
}
