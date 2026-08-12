import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: HTMLElement,
        options: {
          sitekey: string;
          callback: (token: string) => void;
          "expired-callback"?: () => void;
          "error-callback"?: () => void;
        }
      ) => string;
      remove: (widgetId: string) => void;
    };
  }
}

const SCRIPT_SRC = "https://challenges.cloudflare.com/turnstile/v0/api.js";

function loadTurnstileScript(): Promise<void> {
  if (window.turnstile) return Promise.resolve();

  const existing = document.querySelector<HTMLScriptElement>(`script[src="${SCRIPT_SRC}"]`);
  if (existing) {
    return new Promise((resolve, reject) => {
      existing.addEventListener("load", () => resolve());
      existing.addEventListener("error", () => reject(new Error("Turnstile script load failed")));
    });
  }

  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = SCRIPT_SRC;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => {
      script.remove();
      reject(new Error("Turnstile script load failed"));
    };
    document.head.appendChild(script);
  });
}

type TurnstileProps = {
  siteKey: string;
  onVerify: (token: string) => void;
};

/** Cloudflare Turnstile captcha widget — bot 신청 방지용. */
export function Turnstile({ siteKey, onVerify }: TurnstileProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  // onVerify는 부모가 리렌더될 때마다 새로 만들어지는 인라인 함수라, effect 의존성에
  // 그대로 넣으면 토큰을 받자마자 리렌더 → 위젯 재생성 → 리셋되는 루프가 생긴다.
  // ref로 최신 콜백만 갱신하고, effect는 siteKey/reloadKey에만 반응하게 분리한다.
  const onVerifyRef = useRef(onVerify);
  onVerifyRef.current = onVerify;

  const [failed, setFailed] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);

  // biome-ignore lint/correctness/useExhaustiveDependencies: reloadKey는 값을 안 쓰고, 재시도 버튼 클릭 시 effect를 다시 돌리는 트리거로만 씀
  useEffect(() => {
    let widgetId: string | undefined;
    let cancelled = false;
    setFailed(false);

    loadTurnstileScript()
      .then(() => {
        if (cancelled || !containerRef.current || !window.turnstile) return;
        const clearToken = () => onVerifyRef.current("");
        widgetId = window.turnstile.render(containerRef.current, {
          sitekey: siteKey,
          callback: (token) => onVerifyRef.current(token),
          "expired-callback": clearToken,
          "error-callback": clearToken,
        });
      })
      .catch(() => {
        if (!cancelled) setFailed(true);
      });

    return () => {
      cancelled = true;
      if (widgetId) window.turnstile?.remove(widgetId);
    };
  }, [siteKey, reloadKey]);

  if (failed) {
    return (
      <button
        type="button"
        className="typo-body2 typo-medium text-(--color-button-outline) underline"
        onClick={() => setReloadKey((key) => key + 1)}
      >
        인증에 실패했어요. 다시 시도해 주세요
      </button>
    );
  }

  return <div ref={containerRef} />;
}
