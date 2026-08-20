import { useId, useState } from "react";
import type { TeamCardProps } from "./TeamCard.types";

export function TeamCard({ teamName, frontImageUrl, backImageUrl, className }: TeamCardProps) {
  const [flipped, setFlipped] = useState(false);
  const labelId = useId();

  return (
    <button
      type="button"
      className={[
        "group relative aspect-[420/234] shrink-0 rounded-[4px] text-left drop-shadow-[0px_3px_2.5px_rgba(0,0,0,0.25)] [container-type:inline-size] [perspective:1000px]",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      aria-pressed={flipped}
      aria-describedby={labelId}
      onClick={() => setFlipped((prev) => !prev)}
    >
      <span id={labelId} className="sr-only">
        {teamName} 카드, 탭하면 팀원 정보가 표시됩니다
      </span>

      <div
        className={[
          "relative size-full rounded-[4px] transition-transform duration-500 [transform-style:preserve-3d]",
          flipped ? "[transform:rotateY(180deg)]" : "",
        ].join(" ")}
      >
        {/* Front: 명함 전체를 Figma에서 내보낸 이미지 한 장으로 렌더링하고,
            TAP 배지만 실제 인터랙션 힌트를 위해 HTML로 위에 얹는다 */}
        <div className="absolute inset-0 overflow-hidden rounded-[4px] [backface-visibility:hidden]">
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
        <div className="absolute inset-0 overflow-hidden rounded-[4px] bg-[#031838] [backface-visibility:hidden] [transform:rotateY(180deg)]">
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
