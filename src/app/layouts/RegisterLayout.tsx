import { Link, Outlet } from "react-router-dom";
import { IconLogoMarkDark } from "@/shared/assets";
import { ROUTES } from "@/shared/config";
import { ErrorBoundary } from "@/shared/ui";

export default function RegisterLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-surface-white">
      {/* 가입/신청 폼에서는 화면 크기와 무관하게 로고만 보이는 헤더를 쓴다 (전체 사이트 내비게이션은 노출하지 않음). */}
      <header className="w-full bg-surface-white">
        <div className="mx-auto flex w-full max-w-360 items-center px-6 py-3.75 short:py-2 lg:px-20">
          <Link
            to={ROUTES.HOME}
            aria-label="GAMEWORKS"
            className="flex shrink-0 items-center overflow-hidden px-1 py-1.5"
          >
            <span className="relative size-6.5 shrink-0 overflow-clip text-black">
              <IconLogoMarkDark
                aria-hidden
                className="absolute inset-0 block size-full max-w-none"
              />
            </span>
            <span
              aria-hidden
              className="flex flex-col justify-center text-center text-3xl font-bold leading-tight text-black whitespace-nowrap"
            >
              AMEWORKS
            </span>
          </Link>
        </div>
      </header>

      <main
        className={[
          "relative flex flex-1 flex-col",
          "bg-gradient-to-b from-surface-white from-50% to-primary-200",
          "lg:bg-none",
        ].join(" ")}
      >
        <div
          className="pointer-events-none absolute inset-0 hidden lg:block"
          style={{
            backgroundImage:
              "radial-gradient(ellipse 45rem 30rem at 50% 50%, var(--color-primary-200) 0%, var(--color-surface-white) 70%)",
          }}
          aria-hidden
        />
        <div className="relative z-1 flex flex-1 flex-col">
          <ErrorBoundary>
            <Outlet />
          </ErrorBoundary>
        </div>
      </main>
    </div>
  );
}
