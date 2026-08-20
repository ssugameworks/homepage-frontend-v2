import { Link } from "react-router-dom";
import ctaPattern from "@/shared/assets/backgrounds/cta-pattern.svg";
import { IconArrowRight } from "@/shared/assets/icons";
import { ROUTES } from "@/shared/config/routes";
import { glassButtonClass, glassButtonLabelClass } from "./glassButton";

/** 가입 유도 CTA 섹션. 모바일은 Button/filled, 데스크톱은 밑줄 Button/text로 시안이 다르다. */
export function CtaSection() {
  return (
    <section
      className="relative isolate overflow-hidden bg-gradient-to-r from-primary-800 to-primary-700"
      aria-label="가입 안내"
    >
      <img
        src={ctaPattern}
        alt=""
        aria-hidden="true"
        className="-translate-x-1/2 -translate-y-1/2 -z-10 absolute top-1/2 left-1/2 h-45.75 w-366 max-w-none"
      />

      <div className="mx-auto flex min-h-44 max-w-360 items-center justify-center px-6 py-7.5 lg:min-h-42.5 lg:px-27.5 lg:py-5">
        <div className="flex flex-col items-center gap-5 lg:items-start lg:gap-2">
          <h2 className="text-center font-bold text-2xl text-white leading-normal lg:typo-heading1">
            <span className="lg:hidden">
              함께 몰입하고 성장할
              <br />
              여러분을 기다려요
            </span>
            <span className="hidden lg:inline">함께 몰입하고 성장할 여러분을 기다려요</span>
          </h2>

          <Link
            to={ROUTES.REGISTER}
            className={`${glassButtonClass({ variant: "primary", onDark: true })} gap-4 px-4 py-2 lg:hidden`}
          >
            <span
              className={`${glassButtonLabelClass} font-bold text-lg text-white leading-normal`}
            >
              가입하기
            </span>
          </Link>
          <span className="hidden px-3.75 py-2.5 lg:block">
            <Link
              to={ROUTES.REGISTER}
              className="flex flex-col items-start justify-center gap-1 text-gray-100"
            >
              <span className="flex items-center gap-2 font-medium text-base leading-normal">
                가입하기
                <IconArrowRight className="-rotate-90" />
              </span>
              <span aria-hidden="true" className="block h-px w-full bg-current" />
            </Link>
          </span>
        </div>
      </div>
    </section>
  );
}
