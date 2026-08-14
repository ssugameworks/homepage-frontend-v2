import { useId, useState } from "react";
import cardEmblem from "@/assets/images/executive-card-emblem.png";
import type { ExecutiveCardProps } from "./ExecutiveCard.types";

const BIO_LINES = [
  "2022~ 2024 인공지능 프로젝트 기획, 개발",
  "숭실대 sw전형 입학",
  "2025 아이디어톤(WAVE) 최우수상",
  "FLOW::Startup Bridge 우수상",
  "플렉스 메스 창업 아카데미 최우수상",
  "UMC 10기 플랜 챌린저",
];

export function ExecutiveCard({ executive, className }: ExecutiveCardProps) {
  const { name, initial, role } = executive;
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
        {name} {role} 카드, 탭하면 상세 정보가 표시됩니다
      </span>

      <div
        className={[
          "relative size-full rounded-[4px] transition-transform duration-500 [transform-style:preserve-3d]",
          flipped ? "[transform:rotateY(180deg)]" : "",
        ].join(" ")}
      >
        {/* Front: 모바일은 Figma node 634:11699(card13, 347 기준), 데스크탑(lg:)은 941:6552(card-big, 420 기준)를
            각각 cqw로 환산해 반영 — 카드 렌더링 폭이 달라져도 해당 브레이크포인트의 Figma 비율을 유지한다 */}
        <div className="absolute inset-0 overflow-hidden rounded-[4px] bg-[#080d15] [backface-visibility:hidden]">
          <div
            aria-hidden
            className="pointer-events-none absolute top-full left-[21.9%] size-[90%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(83,135,222,0.22)_0%,rgba(83,135,222,0)_65%)]"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute top-0 left-[73.7%] size-[110%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(83,135,222,0.22)_0%,rgba(83,135,222,0)_65%)]"
          />

          <img
            src={cardEmblem}
            alt=""
            className="pointer-events-none absolute top-[6.5%] left-[45.5%] h-[104.3%] w-[62.4%] object-cover opacity-35"
          />

          <p className="absolute top-[17.2%] left-[7.4%] whitespace-nowrap font-bold text-[6.34cqw] text-white leading-[1.5] lg:text-[6.67cqw]">
            GAMEWORKS
          </p>
          <p className="absolute top-[35.2%] left-[7.4%] whitespace-nowrap font-light text-[3.46cqw] text-primary-300 leading-[1.5] lg:text-[3.33cqw]">
            숭실대학교 글로벌미디어학부 학술 소모임
          </p>
          <p className="absolute top-[66.1%] left-[7.4%] whitespace-nowrap font-bold text-[4.61cqw] text-white leading-[1.5] lg:text-[3.81cqw]">
            {name}
          </p>
          <p className="absolute top-[76.4%] left-[7.4%] whitespace-nowrap font-light text-[4.61cqw] text-primary-300 leading-[1.5] tracking-[-0.14cqw] lg:text-[3.81cqw] lg:tracking-[-0.11cqw]">
            {role}
          </p>

          <span className="absolute top-[68.2%] left-[81.4%] flex aspect-square w-[11%] items-center justify-center rounded-full bg-white/15 font-medium text-[3.46cqw] text-surface-white leading-none lg:text-[2.86cqw]">
            TAP
          </span>
        </div>

        {/* Back: 모바일은 634:11699 back면(347 기준), 데스크탑(lg:)은 941:6552 back면(420 기준).
            주의: Figma 상에서 scaleX(-1)로 미러링된 컨테이너 안에 있어서 원본 left/right 좌표를
            좌우로 뒤바꿔 변환했다 — 미러 보정된 값도 브레이크포인트마다 다르다(같은 절대 px가
            서로 다른 폭의 부모에 배치돼 있기 때문). */}
        <div className="absolute inset-0 overflow-hidden rounded-[4px] bg-[#031838] [backface-visibility:hidden] [transform:rotateY(180deg)]">
          <div
            aria-hidden
            className="pointer-events-none absolute top-[12.6%] left-[27.1%] flex h-[75.9%] w-[54%] items-end justify-end lg:top-[10.4%] lg:left-[39.8%] lg:h-[62.6%] lg:w-[44.6%]"
          >
            <p
              className="bg-gradient-to-r from-[rgba(80,95,132,0.55)] to-[rgba(228,242,248,0.55)] bg-clip-text text-[57.64cqw] text-transparent leading-[0.9] lg:text-[59.52cqw]"
              style={{ fontFamily: "'Tangerine', cursive", fontWeight: 700 }}
            >
              {initial}
            </p>
          </div>

          <div className="absolute top-[16.1%] left-[9.2%] flex items-baseline gap-2 whitespace-nowrap lg:top-[16.4%] lg:left-[9.5%]">
            <p className="font-bold text-[4.32cqw] text-white leading-[1.5] lg:text-[4.29cqw]">
              {name}
            </p>
            <p className="font-light text-[3.46cqw] text-white leading-[1.5] tracking-[-0.07cqw] lg:text-[3.81cqw] lg:tracking-[-0.11cqw]">
              | {role}
            </p>
          </div>

          <div className="absolute top-[32.1%] left-[9.2%] w-[59.9%] font-medium text-[3.46cqw] text-white leading-[1.5] lg:top-[34.3%] lg:w-[72.1%] lg:font-light lg:text-[3.33cqw] lg:tracking-[-0.1cqw]">
            {BIO_LINES.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
        </div>
      </div>
    </button>
  );
}
