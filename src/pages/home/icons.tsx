/**
 * HomePage 전용 아이콘 — Figma 벡터를 그대로 옮긴 것이라 색상만 currentColor로 바꿔 사용
 */

/** Figma: Button/filled·Button/text 내부 아이콘 — 아래 화살표(Union)를 -90° 돌려 오른쪽 화살표로 사용 */
export function ArrowRightIcon({ className }: { className?: string }) {
  return (
    <svg
      className={["-rotate-90", className].filter(Boolean).join(" ")}
      width="18"
      height="18"
      viewBox="0 0 17.6709 17.4678"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M9.88672 13.6943L15.8213 8.19629L16.1611 7.88184L16.5 8.19629L17.2754 8.91406L17.6709 9.28125L17.2754 9.64746L9.1748 17.1523L8.83496 17.4678L8.49512 17.1523L0.395508 9.64746L0 9.28125L0.395508 8.91406L1.16992 8.19629L1.50977 7.88184L1.84961 8.19629L7.78418 13.6943V0H9.88672V13.6943Z"
        fill="currentColor"
      />
    </svg>
  );
}

/** Figma: icon/plus — gray-50 원형 배경에 primary-400(#4D97FF) 십자 */
export function PlusCircleIcon() {
  return (
    <span className="flex size-4 shrink-0 items-center justify-center rounded-full bg-[color:var(--gw-gray-50)]">
      <svg
        width="10.667"
        height="10.667"
        viewBox="0 0 10.6667 10.6667"
        fill="none"
        aria-hidden="true"
      >
        <path d="M5.33333 10.6667V0M0 5.33333L10.6667 5.33333" stroke="#4D97FF" strokeWidth="2" />
      </svg>
    </span>
  );
}

/** Figma: Icon/Qna — 20×20 박스 안 15×12 셰브론 */
export function QnaChevronIcon({ className }: { className?: string }) {
  return (
    <span className={["flex size-5 items-center justify-center", className].join(" ")}>
      <svg width="15" height="12" viewBox="0 0 15 12" fill="none" aria-hidden="true">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M7.5 12L15 1.86275L13.6242 0L7.5 8.27976L1.37779 0L0 1.86275L7.5 12Z"
          fill="currentColor"
        />
      </svg>
    </span>
  );
}

/** Figma: Button/text 아이콘 — 아래 화살표를 -135° 돌려 오른쪽 위(외부 링크) 방향으로 사용 */
export function ExternalArrowIcon({ className }: { className?: string }) {
  return (
    <svg
      className={["rotate-[-135deg]", className].filter(Boolean).join(" ")}
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M18 9.70519L9 18L0 9.70519L0.860786 8.91185L8.38789 15.8492V0H9.61211V15.8492L17.1392 8.91185L18 9.70519Z"
        fill="currentColor"
      />
    </svg>
  );
}

/** Figma: icon/color/scroll — 셰브론 46.83×26.83, gray-200 */
export function ScrollChevronIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="37"
      height="21"
      viewBox="0 0 46.8346 26.8278"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M3.87725 1.06511L23.2767 20.6852C26.8391 17.1378 31.6576 12.3353 35.6351 8.36882C37.6906 6.31893 39.5219 4.49233 40.8392 3.17839C41.4978 2.52141 42.0284 1.99222 42.3938 1.62761C42.5764 1.44547 42.7179 1.30431 42.8138 1.20867L42.9593 1.06316H42.9603L43.3128 0.710621L43.6663 1.06218L45.7698 3.15789L46.1263 3.5114L45.7698 3.86589L23.7698 25.7712L23.4173 26.1227L23.0647 25.7712L1.06475 3.86589L0.708301 3.5114L1.06475 3.15789L3.16826 1.06218L3.52373 0.708668L3.87725 1.06511Z"
        fill="currentColor"
        stroke="currentColor"
      />
    </svg>
  );
}
