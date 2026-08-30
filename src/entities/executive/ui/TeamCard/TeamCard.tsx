import { FlipCard } from "../FlipCard";
import type { TeamCardProps } from "./TeamCard.types";

export function TeamCard({ teamName, frontImageUrl, backImageUrl, className }: TeamCardProps) {
  return (
    <FlipCard
      label={`${teamName} 카드, 탭하면 팀원 정보가 표시됩니다`}
      className={className}
      front={
        // Front: 명함 전체를 Figma에서 내보낸 이미지 한 장으로 렌더링하고,
        // TAP 배지만 실제 인터랙션 힌트를 위해 HTML로 위에 얹는다
        <div className="relative size-full">
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
      }
      back={
        // Back: 명함 전체를 Figma에서 내보낸 이미지 한 장으로 렌더링한다
        <div className="relative size-full bg-[#031838]">
          {backImageUrl && (
            <img
              src={backImageUrl}
              alt={`${teamName} 명함 뒷면`}
              className="pointer-events-none absolute inset-0 size-full object-cover"
            />
          )}
        </div>
      }
    />
  );
}
