import { useId, useState } from "react";
import { tv } from "tailwind-variants";
import type { FlipCardProps } from "./FlipCard.types";

const card = tv({
  slots: {
    base: "group relative aspect-[420/234] shrink-0 rounded-sm text-left drop-shadow-[0px_3px_2.5px_rgba(0,0,0,0.25)] [container-type:inline-size] [perspective:1000px]",
    inner:
      "relative size-full rounded-sm transition-transform duration-500 motion-reduce:transition-none group-hover:[transform:rotateY(180deg)] [transform-style:preserve-3d]",
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
  const labelId = useId();
  const { base, inner, face } = card({ flipped });

  return (
    <button
      type="button"
      className={base({ className })}
      aria-pressed={flipped}
      aria-describedby={labelId}
      onClick={() => setFlipped((prev) => !prev)}
    >
      <span id={labelId} className="sr-only">
        {label}
      </span>

      <div className={inner()}>
        <div className={face()}>{front}</div>
        <div className={`${face()} [transform:rotateY(180deg)]`}>{back}</div>
      </div>
    </button>
  );
}
