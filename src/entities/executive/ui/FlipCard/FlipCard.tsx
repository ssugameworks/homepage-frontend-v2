import { useId, useState } from "react";
import { tv } from "tailwind-variants";
import type { FlipCardProps } from "./FlipCard.types";

const card = tv({
  slots: {
    base: "group relative aspect-[420/234] shrink-0 rounded-sm text-left drop-shadow-[0px_3px_2.5px_rgba(0,0,0,0.25)] [container-type:inline-size] [perspective:1000px]",
    inner:
      "relative size-full rounded-sm transition-transform duration-500 motion-reduce:transition-none [transform-style:preserve-3d]",
    face: "absolute inset-0 overflow-hidden rounded-sm [backface-visibility:hidden]",
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

/** 명함형 3D 플립카드 — ExecutiveCard/TeamCard가 공유하는 뼈대. */
export function FlipCard({ label, front, back, className }: FlipCardProps) {
  const [flipped, setFlipped] = useState(false);
  const [hovered, setHovered] = useState(false);
  // hover도 뒷면을 보여주지만, 화면에 보이는 면과 접근성 트리는 이 하나의 상태로 함께 계산한다.
  const showBack = flipped || hovered;
  const labelId = useId();
  const { base, inner, face } = card({ flipped: showBack });

  return (
    <button
      type="button"
      className={base({ className })}
      aria-pressed={flipped}
      aria-describedby={labelId}
      onClick={() => setFlipped((prev) => !prev)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <span id={labelId} className="sr-only">
        {label}
      </span>

      <div className={inner()}>
        <div className={face()} aria-hidden={showBack}>
          {front}
        </div>
        <div className={`${face()} [transform:rotateY(180deg)]`} aria-hidden={!showBack}>
          {back}
        </div>
      </div>
    </button>
  );
}
