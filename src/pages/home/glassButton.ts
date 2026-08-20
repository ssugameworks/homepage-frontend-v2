import { cx } from "@/utils";

type GlassButtonOptions = {
  variant: "primary" | "secondary";
  /** 히어로/모바일 CTA처럼 어두운 배경 위에 올라갈 때 — 밝은 배경용 gradient는 번져 보여서 단일 색으로 바꾼다. */
  onDark?: boolean;
  /** '모집 중인 활동 보기'에만 쓰는 좌→우 hover sweep. */
  sweep?: boolean;
};

const BASE = cx(
  "relative isolate inline-flex cursor-pointer items-center justify-center rounded-full border-0",
  "shadow-[0_0_2px_rgba(0,0,0,0.2)] backdrop-blur-xl",
  "after:pointer-events-none after:absolute after:inset-0 after:rounded-[inherit] after:border after:border-white/10 after:mix-blend-plus-lighter after:content-['']"
);

const BACKGROUND = {
  primary: {
    light: "[background-image:var(--color-button-primary)]",
    dark: "bg-[rgba(0,84,255,0.68)]",
  },
  secondary: {
    light:
      "bg-[image:linear-gradient(90deg,rgba(178,211,255,0.4)_0%,rgba(178,211,255,0.4)_100%),linear-gradient(90deg,rgba(255,255,255,0.6)_0%,rgba(255,255,255,0.6)_100%)]",
    dark: "bg-[rgba(179,203,247,0.68)]",
  },
} as const satisfies Record<GlassButtonOptions["variant"], { light: string; dark: string }>;

const SWEEP = cx(
  "overflow-hidden before:absolute before:inset-0 before:-z-10 before:origin-left before:scale-x-0",
  "before:bg-[rgba(179,203,247,0.95)] before:transition-transform before:duration-300 before:ease-out",
  "hover:before:scale-x-100 focus-visible:before:scale-x-100 motion-reduce:before:transition-none"
);

/** Figma `Button/filled` — glass 배경(backdrop blur + 가장자리 하이라이트) 버튼. HomePage 전용. */
export function glassButtonClass({ variant, onDark = false, sweep = false }: GlassButtonOptions) {
  return cx(BASE, BACKGROUND[variant][onDark ? "dark" : "light"], sweep && SWEEP);
}

/** Figma: 라벨 그룹에 걸린 hard-light 블렌드. */
export const glassButtonLabelClass =
  "inline-flex items-center gap-2 whitespace-nowrap mix-blend-hard-light";
