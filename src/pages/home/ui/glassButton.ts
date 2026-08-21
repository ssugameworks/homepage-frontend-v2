import { tv } from "tailwind-variants";

const glassButton = tv({
  base: [
    "relative isolate inline-flex cursor-pointer items-center justify-center rounded-full border-0",
    "shadow-[0_0_2px_rgba(0,0,0,0.2)] backdrop-blur-xl",
    "after:pointer-events-none after:absolute after:inset-0 after:rounded-[inherit] after:border after:border-white/10 after:mix-blend-plus-lighter after:content-['']",
  ],
  variants: {
    variant: {
      primary: "",
      secondary: "",
    },
    onDark: {
      true: "",
      false: "",
    },
    /**
     * '모집 중인 활동 보기'에만 쓰는 좌→우 hover sweep.
     * transform: scaleX()로 채우면 radius(둥근 모서리)까지 가로로 같이 눌려 찌그러지고,
     * Safari에서는 overflow-hidden 클리핑까지 깨진다. 대신 clip-path로 드러나는 폭만
     * 바꾼다 — 도형 자체는 늘어나지 않으니 버튼의 고정된 radius가 그대로 유지된다.
     */
    sweep: {
      true: [
        "overflow-hidden before:absolute before:inset-0 before:bg-[rgba(179,203,247,0.95)]",
        "before:[clip-path:inset(0_100%_0_0)] before:transition-[clip-path] before:duration-300 before:ease-out",
        "hover:before:[clip-path:inset(0_0%_0_0)] focus-visible:before:[clip-path:inset(0_0%_0_0)] motion-reduce:before:transition-none",
      ],
      false: "",
    },
  },
  compoundVariants: [
    // Figma button/filled — 밝은 배경용 gradient
    { variant: "primary", onDark: false, class: "[background-image:var(--color-button-primary)]" },
    {
      variant: "secondary",
      onDark: false,
      class:
        "bg-[image:linear-gradient(90deg,rgba(178,211,255,0.4)_0%,rgba(178,211,255,0.4)_100%),linear-gradient(90deg,rgba(255,255,255,0.6)_0%,rgba(255,255,255,0.6)_100%)]",
    },
    // 히어로/모바일 CTA처럼 어두운 배경 위에 올라갈 때 — gradient는 번져 보여서 단일 색으로 바꾼다.
    { variant: "primary", onDark: true, class: "bg-[rgba(0,84,255,0.68)]" },
    { variant: "secondary", onDark: true, class: "bg-[rgba(179,203,247,0.68)]" },
  ],
  defaultVariants: {
    variant: "primary",
    onDark: false,
    sweep: false,
  },
});

/** Figma `Button/filled` — glass 배경(backdrop blur + 가장자리 하이라이트) 버튼. HomePage 전용. */
export const glassButtonClass = glassButton;

/** Figma: 라벨 그룹에 걸린 hard-light 블렌드. */
export const glassButtonLabelClass =
  "inline-flex items-center gap-2 whitespace-nowrap mix-blend-hard-light";
