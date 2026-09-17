import { IconLogoMark } from "@/shared/assets";

/**
 * Figma spec (web/introduce · 웹3, 1440×1024)
 * - 배경: radial-gradient(#122138 → #09111c → #04080e → black), 로고 마크 워터마크 2개
 * - 타이틀: heading1-700(38) primary/400(#4d97ff)
 * - 인용구 카드: glass-float(soft border + drop-shadow), heading2-500(28) color/logo(#ececec)
 */
export function FounderQuoteSection() {
  return (
    <section
      className="relative isolate flex items-center justify-center overflow-hidden bg-[radial-gradient(ellipse_at_center,_#122138_0%,_#09111c_50%,_#04080e_75%,_#000000_100%)] px-6 py-20 lg:py-32"
      aria-label="창립자 인터뷰"
    >
      <IconLogoMark
        aria-hidden
        className="-top-10 -left-16 pointer-events-none absolute size-56 rotate-[-25deg] text-white/5 lg:size-80"
      />
      <IconLogoMark
        aria-hidden
        className="-bottom-16 -right-12 pointer-events-none absolute size-64 rotate-[18deg] text-white/5 lg:size-96"
      />

      <div className="relative flex w-full max-w-225 flex-col items-center gap-10 text-center lg:gap-16">
        <h2 className="whitespace-pre-line font-bold text-2xl text-primary-400 leading-normal tracking-dense lg:text-heading1">
          {"창립자 윤정하님께서\n게임웍스에게 해주고 싶은 말"}
        </h2>

        <div className="w-full rounded-2xl border border-border bg-overlay px-6 py-8 shadow-[0_8px_48px_rgba(0,0,0,0.25)] backdrop-blur-sm lg:px-12 lg:py-12">
          <p className="whitespace-pre-line font-medium text-body1 text-logo leading-relaxed lg:text-heading2">
            {
              "학부 선후배 그리고 동기들과 함께하는 이 시간을 즐기시길 바랍니다.\n순수한 목적으로 하루하루 진실되게 살아가신다면 보이지 않는\n불확실한 미래가 조금씩 보이기 시작할 것입니다"
            }
          </p>
        </div>
      </div>
    </section>
  );
}
