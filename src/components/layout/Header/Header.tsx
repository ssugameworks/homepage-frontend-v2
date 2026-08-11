import { useEffect, useId, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  IconChevronRight,
  IconLogoMark,
  IconLogoMarkMenu,
  IconMenuBar,
  IconMenuClose,
} from "@/assets/icons";
import type { HeaderProps, NavItemId } from "@/components";
import { ROUTES } from "@/router/routes";

const NAV_ITEMS: { id: NavItemId; label: string; to: string }[] = [
  { id: "introduce", label: "소개", to: ROUTES.INTRODUCE },
  { id: "activities", label: "활동", to: ROUTES.ACTIVITIES },
  { id: "members", label: "임원진", to: ROUTES.MEMBERS },
  { id: "join", label: "가입", to: ROUTES.REGISTER },
  { id: "contact", label: "문의", to: ROUTES.CONTACT },
];

function resolveActiveItem(pathname: string): NavItemId | null {
  const match = NAV_ITEMS.find(
    (item) => pathname === item.to || pathname.startsWith(`${item.to}/`)
  );
  return match?.id ?? null;
}

export function Header({ className, activeItem }: HeaderProps) {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuId = useId();
  const currentActive = activeItem ?? resolveActiveItem(location.pathname);

  useEffect(() => {
    if (!menuOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header className={["relative w-full bg-primary-950", className].filter(Boolean).join(" ")}>
      {/* Desktop */}
      <div className="mx-auto hidden w-full max-w-360 items-center justify-between px-20 py-3.75 lg:flex">
        <Link to={ROUTES.HOME} className="flex shrink-0 items-center overflow-hidden px-1 py-1.5">
          <span className="relative size-6.5 shrink-0 overflow-clip text-logo">
            <IconLogoMark aria-hidden className="absolute inset-0 block size-full max-w-none" />
          </span>
          <span className="flex flex-col justify-center text-center font-bold text-[32px] leading-[1.3] text-logo whitespace-nowrap">
            AMEWORKS
          </span>
        </Link>

        <nav
          aria-label="주요 메뉴"
          className="flex shrink-0 items-start rounded-full border border-solid border-border bg-overlay p-2.5"
        >
          {NAV_ITEMS.map((item) => {
            const isActive = currentActive === item.id;
            return (
              <Link
                key={item.id}
                to={item.to}
                className={[
                  "flex items-center justify-center rounded-full px-6 font-medium text-subheading leading-[1.3] tracking-dense whitespace-nowrap transition-colors",
                  isActive ? "text-primary-200" : "text-white hover:text-primary-200",
                ].join(" ")}
                aria-current={isActive ? "page" : undefined}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Mobile bar */}
      <div className="flex h-11.25 w-full items-center justify-between px-5 py-3.75 lg:hidden">
        <Link to={ROUTES.HOME} className="flex items-center overflow-hidden px-1 py-1.5">
          <span className="relative size-3.5 shrink-0 overflow-clip text-logo">
            <IconLogoMark aria-hidden className="absolute inset-0 block size-full max-w-none" />
          </span>
          <span className="flex flex-col justify-center text-center font-bold text-body2 tracking-dense text-logo whitespace-nowrap">
            AMEWORKS
          </span>
        </Link>

        <button
          type="button"
          className="relative size-6.25 shrink-0 cursor-pointer border-0 bg-transparent p-0"
          aria-label="메뉴 열기"
          aria-expanded={menuOpen}
          aria-controls={menuId}
          onClick={() => setMenuOpen(true)}
        >
          <IconMenuBar aria-hidden className="absolute inset-0 block size-full max-w-none" />
        </button>
      </div>

      {/* Mobile menu overlay */}
      {menuOpen ? (
        <div
          id={menuId}
          className="fixed inset-0 z-50 flex flex-col bg-primary-950 px-6.25 py-3.5 lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="모바일 메뉴"
        >
          <div className="flex h-6.5 w-full items-center justify-between">
            <Link
              to={ROUTES.HOME}
              aria-label="GAMEWORKS"
              className="relative block h-6.5 w-5.5 shrink-0 text-logo"
              onClick={() => setMenuOpen(false)}
            >
              <IconLogoMarkMenu
                aria-hidden
                className="absolute inset-0 block size-full max-w-none"
              />
            </Link>
            <button
              type="button"
              className="relative size-3 shrink-0 cursor-pointer border-0 bg-transparent p-0"
              aria-label="메뉴 닫기"
              onClick={() => setMenuOpen(false)}
            >
              <IconMenuClose aria-hidden className="absolute inset-0 block size-full max-w-none" />
            </button>
          </div>

          <nav aria-label="모바일 주요 메뉴" className="mt-6.25 flex w-full flex-col gap-3">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.id}
                to={item.to}
                className="relative flex h-5 w-full items-center justify-end px-2.25 py-1.25"
                onClick={() => setMenuOpen(false)}
              >
                <span className="absolute top-0 right-0 left-0 font-bold text-body2 leading-normal text-surface-white">
                  {item.label}
                </span>
                <span className="relative flex h-2.25 w-1.25 shrink-0 items-center justify-center text-gray-700">
                  <IconChevronRight aria-hidden className="block size-full max-w-none" />
                </span>
              </Link>
            ))}
          </nav>
        </div>
      ) : null}
    </header>
  );
}
