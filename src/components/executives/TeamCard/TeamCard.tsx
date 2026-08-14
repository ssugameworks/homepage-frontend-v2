import { useId, useState } from "react";
import type { TeamCardProps } from "./TeamCard.types";

const BRAND_GRADIENT =
  "linear-gradient(64.6deg, #111937 26.196%, #344464 52.36%, #7a97b7 77.867%, #7f96ad 99.366%)";
const TEXT_GRADIENT = "linear-gradient(to right, #505f84, #e4f2f8)";

export function TeamCard({ teamName, description, memberGroups, className }: TeamCardProps) {
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
        {/* Front: 모바일은 634:11731(card14, 347 기준), 데스크탑(lg:)은 941:6589(card-big2, 420 기준) */}
        <div
          className="absolute inset-0 overflow-hidden rounded-[4px] [backface-visibility:hidden]"
          style={{ backgroundImage: BRAND_GRADIENT }}
        >
          <p
            className="absolute top-[19.7%] left-[4%] whitespace-nowrap text-[34.58cqw] leading-[0.9] tracking-[-2.42cqw] lg:top-[26.6%] lg:left-[3.8%] lg:text-[34.29cqw] lg:tracking-[-2.4cqw]"
            style={{
              fontFamily: "'Tangerine', cursive",
              fontWeight: 700,
              backgroundImage: TEXT_GRADIENT,
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            Game works
          </p>
          <p
            className="absolute top-[63.2%] left-[16.7%] w-[103%] whitespace-nowrap text-[12.39cqw] leading-[0.9] tracking-[-0.87cqw] lg:top-[69.8%] lg:left-[13.8%] lg:w-[85.2%] lg:text-[13.1cqw] lg:tracking-[-0.92cqw]"
            style={{
              fontFamily: "'Tiny5', sans-serif",
              backgroundImage: TEXT_GRADIENT,
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            PRODUCT TEAM
          </p>

          <span className="absolute top-[68.9%] left-[81.6%] flex aspect-square w-[11.8%] items-center justify-center rounded-full bg-white/15 font-medium text-[3.46cqw] text-surface-white leading-none lg:top-[67.9%] lg:left-[81.4%] lg:w-[11%] lg:text-[2.86cqw]">
            TAP
          </span>
        </div>

        {/* Back: 모바일은 634:11731 back면(347 기준), 데스크탑(lg:)은 941:6589 back면(420 기준)
            주의: scaleX(-1) 미러링 컨테이너 안 좌표라 좌우를 뒤바꿔 변환했다 */}
        <div className="absolute inset-0 overflow-hidden rounded-[4px] bg-[#031838] [backface-visibility:hidden] [transform:rotateY(180deg)]">
          <p className="absolute top-[9.3%] left-[6.9%] whitespace-nowrap font-bold text-[4.61cqw] text-white leading-[1.5] lg:top-[12.5%] lg:left-[6%] lg:text-[4.29cqw]">
            {teamName}
          </p>
          <div className="absolute top-[24.4%] left-[6.9%] w-[79%] font-light text-[#9db0da] text-[3.46cqw] leading-[1.5] lg:top-[26.6%] lg:left-[6%] lg:w-[82.6%] lg:text-[2.86cqw]">
            {description.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
          <div className="absolute top-[57%] right-[6.6%] w-[51%] font-light text-[3.46cqw] text-white leading-[1.5] lg:top-[62.5%] lg:right-[6%] lg:w-[64%] lg:text-[3.33cqw] lg:tracking-[-0.1cqw]">
            {memberGroups.map((group) => (
              <p key={group.label} className="text-right">
                {group.label} | {group.members.join(", ")}
              </p>
            ))}
          </div>
        </div>
      </div>
    </button>
  );
}
