import { useId, useState } from "react";
import { tv } from "tailwind-variants";
import type { TeamCardProps } from "./TeamCard.types";

const card = tv({
  slots: {
    base: "group relative aspect-[420/234] shrink-0 rounded-sm text-left drop-shadow-[0px_3px_2.5px_rgba(0,0,0,0.25)] [container-type:inline-size] [perspective:1000px]",
    inner:
      "relative size-full rounded-sm transition-transform duration-500 [transform-style:preserve-3d]",
  },
  variants: {
    flipped: {
      true: { inner: "[transform:rotateY(180deg)]" },
      false: {},
    },
  },
  defaultVariants: {
    flipped: false,
  },
});

export function TeamCard({ teamName, frontImageUrl, backImageUrl, className }: TeamCardProps) {
  const [flipped, setFlipped] = useState(false);
  const labelId = useId();
  const { base, inner } = card({ flipped });

  return (
    <button
      type="button"
      className={base({ className })}
      aria-pressed={flipped}
      aria-describedby={labelId}
      onClick={() => setFlipped((prev) => !prev)}
    >
      <span id={labelId} className="sr-only">
        {teamName} 카드, 탭하면 팀원 정보가 표시됩니다
      </span>

      <div className={inner()}>
        {/* Front: 명함 전체를 Figma에서 내보낸 이미지 한 장으로 렌더링하고,
            TAP 배지만 실제 인터랙션 힌트를 위해 HTML로 위에 얹는다 */}
        <div className="absolute inset-0 overflow-hidden rounded-sm [backface-visibility:hidden]">
          {frontImageUrl && (
            <img
              src={frontImageUrl}
              alt={`${teamName} 명함 앞면`}
              className="pointer-events-none absolute inset-0 size-full object-cover"
            />
          )}

          <span className="absolute top-[68.9%] left-[81.6%] flex aspect-square w-[11.8%] items-center justify-center rounded-full bg-white/15 font-medium text-[3.46cqw] text-surface-white leading-none lg:top-[67.9%] lg:left-[81.4%] lg:w-[11%] lg:text-[2.86cqw]">
            TAP
          </span>
        </div>

        {/* Back: 명함 전체를 Figma에서 내보낸 이미지 한 장으로 렌더링한다 */}
        <div className="absolute inset-0 overflow-hidden rounded-sm bg-[#031838] [backface-visibility:hidden] [transform:rotateY(180deg)]">
          {backImageUrl && (
            <img
              src={backImageUrl}
              alt={`${teamName} 명함 뒷면`}
              className="pointer-events-none absolute inset-0 size-full object-cover"
            />
          )}
        </div>
      </div>
    </button>
  );
}
