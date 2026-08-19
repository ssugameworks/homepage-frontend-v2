import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: HTMLElement,
        options: { sitekey: string; callback: (token: string) => void }
      ) => string;
      remove: (widgetId: string) => void;
      reset: (widgetId: string) => void;
    };
  }
}

const SCRIPT_SRC = "https://challenges.cloudflare.com/turnstile/v0/api.js";

function loadTurnstileScript(): Promise<void> {
  if (window.turnstile) return Promise.resolve();
  const existing = document.querySelector(`script[src="${SCRIPT_SRC}"]`);
  if (existing) {
    return new Promise((resolve, reject) => {
      existing.addEventListener("load", () => resolve());
      existing.addEventListener("error", () => reject(new Error("Turnstile 스크립트 로드 실패")));
    });
  }
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = SCRIPT_SRC;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Turnstile 스크립트 로드 실패"));
    document.head.appendChild(script);
  });
}

type TurnstileProps = {
  siteKey: string;
  onVerify: (token: string) => void;
  /** 값이 바뀔 때마다(예: 제출 실패 카운트 증가) 위젯을 리셋하고 새 토큰을 발급받는다. */
  resetKey?: number;
};

/** Cloudflare Turnstile captcha widget — bot 신청 방지용. */
export function Turnstile({ siteKey, onVerify, resetKey }: TurnstileProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  // onVerify는 부모가 리렌더될 때마다 새로 만들어지는 인라인 함수라, effect 의존성에
  // 그대로 넣으면 토큰을 받자마자 리렌더 → 위젯 재생성 → 리셋되는 루프가 생긴다.
  // ref로 최신 콜백만 갱신하고, effect는 siteKey에만 반응하게 분리한다.
  const onVerifyRef = useRef(onVerify);
  onVerifyRef.current = onVerify;
  const widgetIdRef = useRef<string | undefined>(undefined);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setLoadError(false);

    loadTurnstileScript()
      .then(() => {
        if (cancelled || !containerRef.current || !window.turnstile) return;
        widgetIdRef.current = window.turnstile.render(containerRef.current, {
          sitekey: siteKey,
          callback: (token) => onVerifyRef.current(token),
        });
      })
      .catch(() => {
        if (!cancelled) setLoadError(true);
      });

    return () => {
      cancelled = true;
      if (widgetIdRef.current) window.turnstile?.remove(widgetIdRef.current);
    };
  }, [siteKey]);

  // 제출 실패로 토큰이 이미 소모됐을 때 위젯을 리셋해 새 토큰을 받는다.
  // 마운트 시 최초 렌더에서는 건너뛴다.
  const isFirstResetRef = useRef(true);
  // biome-ignore lint/correctness/useExhaustiveDependencies: resetKey는 값 자체가 아니라 변경 트리거로만 쓰인다
  useEffect(() => {
    if (isFirstResetRef.current) {
      isFirstResetRef.current = false;
      return;
    }
    if (!widgetIdRef.current) return;
    window.turnstile?.reset(widgetIdRef.current);
    onVerifyRef.current("");
  }, [resetKey]);

  return (
    <div className="flex flex-col items-center gap-2">
      <div ref={containerRef} />
      {loadError ? (
        <p className="typo-body2 text-accent-red" role="alert">
          사람 확인 위젯을 불러오지 못했어요. 네트워크 상태를 확인하고 새로고침해 주세요.
        </p>
      ) : null}
    </div>
  );
}
