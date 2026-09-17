import { ChevronDown } from "lucide-react";
import introduceHeroBackground from "@/shared/assets/backgrounds/introduce-hero.png";
import { smoothScrollTo } from "@/shared/lib";

/**
 * Figma spec (web/introduce · 웹1, 1440×1093)
 * - 배경: 풀블리드 이미지 + 하단 black 그라디언트 오버레이
 * - 타이틀: hero2 700(60, mobile 36) tracking -3%, color/logo(#ececec), 중앙 정렬
 */
export function HeroSection() {
  return (
    <section
      className="relative isolate flex h-[calc(100svh-45px)] min-h-125 items-center justify-center overflow-hidden bg-[#01040f] text-center md:h-[calc(100svh-84px)] md:min-h-150"
      aria-label="게임웍스 소개"
    >
      <img
        src={introduceHeroBackground}
        alt=""
        aria-hidden="true"
        className="-z-20 absolute inset-0 size-full max-w-none animate-hero-drift object-cover will-change-transform motion-reduce:animate-none"
      />
      <div
        aria-hidden="true"
        className="-z-10 absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80"
      />

      <div className="flex flex-col items-center gap-8 px-6">
        <h1 className="whitespace-pre-line font-bold text-3xl text-logo leading-tight tracking-dense md:text-5xl lg:text-[60px]">
          {"소모임, 그 이상의\n역사를 만들고 있습니다"}
        </h1>

        <button
          type="button"
          onClick={() => smoothScrollTo(window.innerHeight)}
          aria-label="아래로 스크롤"
          className="flex cursor-pointer items-center justify-center border-0 bg-transparent p-2"
        >
          <ChevronDown
            aria-hidden
            className="block size-9 animate-bounce text-gray-200 motion-reduce:animate-none"
          />
        </button>
      </div>
    </section>
  );
}
