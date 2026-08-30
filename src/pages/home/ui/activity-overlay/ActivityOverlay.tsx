import { useEffect, useId, useRef } from "react";
import { createPortal } from "react-dom";
import modalClose from "@/shared/assets/icons/modal-close.svg";
import { OVERLAY_VARIANT_RENDERERS } from "./variantRenderers";
import type { ActivityOverlay as ActivityOverlayData } from "./types";

type Props = {
  overlay: ActivityOverlayData;
  onClose: () => void;
};

/**
 * 활동 카드의 버튼을 누르면 열리는 상세 모달 (Figma: overlay/main)
 *
 * - web: 880px 폭, 소제목 아래로 카드 grid가 세로로 쌓임
 * - mobile: 340px 폭, 소제목 아래 pagination bar + 카드 가로 스와이프
 */
const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function ActivityOverlay({ overlay, onClose }: Props) {
  const titleId = useId();
  const dialogRef = useRef<HTMLDivElement>(null);

  // 열릴 때 다이얼로그로 포커스를 옮기고, 닫히면 이전에 포커스가 있던 요소(트리거 버튼)로 되돌린다.
  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    dialogRef.current?.focus();

    return () => {
      previouslyFocused?.focus();
    };
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }

      // 다이얼로그 밖으로 포커스가 빠져나가지 않도록 Tab 순환을 가둔다.
      if (event.key === "Tab") {
        const dialog = dialogRef.current;
        if (!dialog) return;
        const focusable = Array.from(dialog.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR));
        if (focusable.length === 0) return;

        const first = focusable[0]!;
        const last = focusable[focusable.length - 1]!;
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2.5">
      {/* 배경 클릭으로 닫기 (키보드는 Escape). 스크린리더/탭 순서에 노출되지 않는 순수 포인터 전용 오버레이라 button이 아닌 div를 쓴다. */}
      <div aria-hidden onClick={onClose} className="absolute inset-0 cursor-default bg-black/50" />

      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        className="home-overlay-scroll relative flex max-h-full w-full max-w-85 flex-col gap-6 overflow-y-auto rounded-4xl bg-surface-white px-6 py-7.5 lg:max-w-220 lg:gap-8 lg:px-17.5 lg:py-10"
      >
        <div className="flex flex-col gap-8 lg:gap-12">
          {/* overlay/title */}
          <div className="flex flex-col gap-2.5">
            <div className="flex flex-col gap-2.5">
              <div className="flex items-center justify-between">
                <h2
                  id={titleId}
                  className="font-bold text-xl text-primary-950 leading-normal lg:typo-heading2"
                >
                  {overlay.title}
                </h2>
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
            <p className="font-medium text-sm text-primary-950 leading-normal">
              {overlay.description}
            </p>
          </div>

          {OVERLAY_VARIANT_RENDERERS[overlay.variant](overlay)}
        </div>
      </div>
    </div>,
    document.body
  );
}
