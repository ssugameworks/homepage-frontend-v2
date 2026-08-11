import { Link, Outlet } from "react-router-dom";
import { IconLogoMarkDark } from "@/assets/icons";
import { Header } from "@/components/layout";
import { ROUTES } from "@/router/routes";

export default function RegisterLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-surface-white">
      {/* Mobile: shared dark header */}
      <div className="md:hidden">
        <Header />
      </div>

      {/* Desktop: logo-only light header */}
      <header className="hidden w-full bg-surface-white md:block">
        <div className="mx-auto flex w-full max-w-360 items-center px-6 py-3.75 md:px-20">
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
              className="flex flex-col justify-center text-center text-[2rem] font-bold leading-[1.3] text-black whitespace-nowrap"
            >
              AMEWORKS
            </span>
          </Link>
        </div>
      </header>

      <main
        className={[
          "relative flex flex-1 flex-col",
          "bg-gradient-to-b from-surface-white from-50% via-[#d6e7fd] via-66% to-primary-200",
          "md:bg-none",
        ].join(" ")}
      >
        <div
          className="pointer-events-none absolute inset-0 hidden md:block"
          style={{
            backgroundImage:
              "radial-gradient(ellipse 45rem 35rem at 50% 50%, var(--color-primary-200) 0%, var(--color-surface-white) 70%)",
          }}
          aria-hidden
        />
        <div className="relative z-1 flex flex-1 flex-col">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
