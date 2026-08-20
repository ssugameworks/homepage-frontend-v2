export type NavItemId = "introduce" | "activities" | "members" | "join" | "contact";

export type HeaderProps = {
  className?: string;
  /** 강제로 활성화할 메뉴. 미지정 시 현재 경로로 판별 */
  activeItem?: NavItemId | null;
};
