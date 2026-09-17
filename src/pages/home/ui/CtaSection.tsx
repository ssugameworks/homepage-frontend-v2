import { Link } from "react-router-dom";
import { IconArrowRight, IconLogoMark } from "@/shared/assets";
import { ROUTES } from "@/shared/config";
import { glassButtonClass, glassButtonLabelClass } from "./glassButton";

/** 한 벌에 들어가는 로고 개수 — 가장 넓은 화면에서도 왼쪽으로 흐를 때 빈틈이 안 보일 만큼 넉넉하게 둔다. */
const LOGO_COUNT_PER_SET = 14;

/** 배경에 깔리는, 왼쪽으로 무한히 흐르는 로고 패턴. 콘텐츠를 통째로 2벌 이어붙여 -50%만큼 옮기는
 * 방식이라, 로고 사이 간격은 이 컴포넌트의 gap/크기 값만 바꾸면 되고 별도 이미지 에셋을 건드릴 필요가 없다. */
function CtaLogoMarquee() {
  const logos = Array.from({ length: LOGO_COUNT_PER_SET });

  return (
    <div aria-hidden="true" className="-z-10 absolute inset-0 overflow-hidden">
      <div className="flex h-full w-max animate-marquee-left items-center motion-reduce:animate-none">
        {[0, 1].map((setIndex) => (
          <div key={setIndex} className="flex shrink-0 items-center gap-x-14 px-7">
            {logos.map((_, i) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: 순서가 바뀌지 않는 순수 장식용 반복이라 인덱스로 충분하다.
              <IconLogoMark key={i} className="size-32 shrink-0 py-4 text-white/5" />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/** 가입 유도 CTA 섹션. 모바일은 Button/filled, 데스크톱은 밑줄 Button/text로 시안이 다르다. */
export function CtaSection() {
  return (
    <section
      className="relative isolate overflow-hidden bg-linear-to-r from-primary-800 to-primary-700"
      aria-label="가입 안내"
    >
      <CtaLogoMarquee />

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
