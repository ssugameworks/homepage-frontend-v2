import modalClose from "@/shared/assets/icons/modal-close.svg";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/shared/ui";
import type { ActivityOverlay as ActivityOverlayData } from "./types";
import { OVERLAY_VARIANT_RENDERERS } from "./variantRenderers";

type Props = {
  overlay: ActivityOverlayData;
  onClose: () => void;
};

/**
 * 활동 카드의 버튼을 누르면 열리는 상세 모달 (Figma: overlay/main)
 *
 * - web: 880px 폭, 소제목 아래로 카드 grid가 세로로 쌓임
 * - mobile: 340px 폭, 소제목 아래 pagination bar + 카드 가로 스와이프
 *
 * focus trap · Escape 닫기 · 배경 스크롤 락 · body로의 portal은 모두
 * shared/ui의 Dialog(Radix)가 처리하므로, 여기서는 시각적 레이아웃만 담당한다.
 */
export function ActivityOverlay({ overlay, onClose }: Props) {
  return (
    <Dialog open onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        showCloseButton={false}
        className="home-overlay-scroll flex max-h-full w-full max-w-85 flex-col gap-6 overflow-y-auto rounded-4xl bg-surface-white p-0 px-6 py-7.5 lg:max-w-220 lg:gap-8 lg:px-17.5 lg:py-10"
      >
        <div className="flex flex-col gap-8 lg:gap-12">
          {/* overlay/title */}
          <div className="flex flex-col gap-2.5">
            <div className="flex flex-col gap-2.5">
              <div className="flex items-center justify-between">
                <DialogTitle className="font-bold text-xl text-primary-950 leading-normal lg:typo-heading2">
                  {overlay.title}
                </DialogTitle>
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="닫기"
                  className="size-6 shrink-0 cursor-pointer border-0 bg-transparent p-0 text-primary-950"
                >
                  <img src={modalClose} alt="" className="block size-full max-w-none" />
                </button>
              </div>
              <span aria-hidden="true" className="block h-px w-full bg-primary-950" />
            </div>
            <DialogDescription className="font-medium text-sm text-primary-950 leading-normal">
              {overlay.description}
            </DialogDescription>
          </div>

          {OVERLAY_VARIANT_RENDERERS[overlay.variant](overlay)}
        </div>
      </DialogContent>
    </Dialog>
  );
}
