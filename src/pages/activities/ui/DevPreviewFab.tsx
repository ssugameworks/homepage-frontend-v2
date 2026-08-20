export type DevPreviewMode = "skeleton" | "data";

type DevPreviewFabProps = {
  /** null이면 실제 API 응답을 그대로 보여주는 기본 상태다. */
  mode: DevPreviewMode | null;
  onToggle: () => void;
};

type DevPreviewKey = DevPreviewMode | "auto";

const LABEL: Record<DevPreviewKey, string> = {
  skeleton: "스켈레톤 보는 중",
  data: "더미 데이터 보는 중",
  auto: "실제 API 보는 중",
};

const DOT_CLASS: Record<DevPreviewKey, string> = {
  skeleton: "bg-amber-400",
  data: "bg-emerald-400",
  auto: "bg-primary-400",
};

/**
 * 개발 전용 플로팅 버튼 — 더미 활동 데이터로 스켈레톤/실제 데이터 UI를 즉시 토글해서 비교한다.
 * 프로덕션 빌드에는 렌더링되지 않는다.
 */
export function DevPreviewFab({ mode, onToggle }: DevPreviewFabProps) {
  if (!import.meta.env.DEV) return null;

  const key = mode ?? "auto";

  return (
    <button
      type="button"
      onClick={onToggle}
      className="fixed bottom-6 left-6 z-50 flex items-center gap-2 rounded-full bg-gray-950 px-4 py-3 text-white shadow-[0_4px_16px_rgba(0,0,0,0.3)] transition-colors hover:bg-gray-800"
    >
      <span aria-hidden className={`size-2 shrink-0 rounded-full ${DOT_CLASS[key]}`} />
      <span className="typo-body2 typo-bold whitespace-nowrap">DEV: {LABEL[key]}</span>
    </button>
  );
}
