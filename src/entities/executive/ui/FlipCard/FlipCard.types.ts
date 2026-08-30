import type { ReactNode } from "react";

export type FlipCardProps = {
  /** 스크린리더용 설명. 예: "박서영 회장 카드, 탭하면 상세 정보가 표시됩니다" */
  label: string;
  /** 앞면 전체 내용(이미지, TAP 배지 등) — size-full 컨테이너 안에 그대로 렌더링된다. */
  front: ReactNode;
  /** 뒷면 전체 내용. */
  back: ReactNode;
  className?: string;
};
