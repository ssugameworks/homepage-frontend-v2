import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { IconChevronRight, IconLogoMark, IconMenuBar, IconMenuClose } from "@/assets/icons";
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

  const barRef = useRef<HTMLElement>(null);
  const [barHeight, setBarHeight] = useState(0);

  useLayoutEffect(() => {
    const el = barRef.current;
    if (!el) return;

    const updateHeight = () => setBarHeight(el.offsetHeight);
    updateHeight();

    const observer = new ResizeObserver(updateHeight);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!menuOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    const scrollY = window.scrollY;
    document.addEventListener("keydown", onKeyDown);
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = "100%";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      window.scrollTo(0, scrollY);
    };
  }, [menuOpen]);

  return (
    <>
      <div aria-hidden style={{ height: barHeight }} />
      <header
        ref={barRef}
        className={["fixed inset-x-0 top-0 z-40 w-full bg-primary-950", className]
          .filter(Boolean)
          .join(" ")}
      >
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
        <div className="flex h-16 w-full items-center justify-between px-6 lg:hidden">
          <Link to={ROUTES.HOME} className="flex items-center overflow-hidden px-1 py-1.5">
            <span className="relative size-5 shrink-0 overflow-clip text-logo">
              <IconLogoMark aria-hidden className="absolute inset-0 block size-full max-w-none" />
            </span>
            <span className="flex flex-col justify-center text-center font-bold text-heading3 tracking-dense text-logo whitespace-nowrap">
              AMEWORKS
            </span>
          </Link>

          <button
            type="button"
            className="relative -m-1.5 flex size-11 shrink-0 cursor-pointer items-center justify-center border-0 bg-transparent p-0"
            aria-label="메뉴 열기"
            aria-expanded={menuOpen}
            aria-controls={menuId}
            onClick={() => setMenuOpen(true)}
          >
            <IconMenuBar aria-hidden className="block size-8 max-w-none" />
          </button>
        </div>

        {/* Mobile menu overlay */}
        <AnimatePresence>
          {menuOpen ? (
            <motion.div
              key="mobile-menu"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              id={menuId}
              className="fixed inset-0 z-50 flex flex-col bg-primary-950 lg:hidden"
              role="dialog"
              aria-modal="true"
              aria-label="모바일 메뉴"
            >
              <div className="flex h-16 w-full items-center justify-between px-6">
                <Link
                  to={ROUTES.HOME}
                  aria-label="GAMEWORKS"
                  className="flex items-center overflow-hidden px-1 py-1.5"
                  onClick={() => setMenuOpen(false)}
                >
                  <span className="relative size-5 shrink-0 overflow-clip text-logo">
                    <IconLogoMark
                      aria-hidden
                      className="absolute inset-0 block size-full max-w-none"
                    />
                  </span>
                </Link>
                <button
                  type="button"
                  className="relative -m-1.5 flex size-11 shrink-0 cursor-pointer items-center justify-center border-0 bg-transparent p-0"
                  aria-label="메뉴 닫기"
                  onClick={() => setMenuOpen(false)}
                >
                  <IconMenuClose aria-hidden className="block size-4 max-w-none" />
                </button>
              </div>

              <nav
                aria-label="모바일 주요 메뉴"
                className="mt-6.25 flex w-full flex-col gap-4 px-6 pb-6"
              >
                {NAV_ITEMS.map((item) => (
                  <Link
                    key={item.id}
                    to={item.to}
                    className="relative flex h-7 w-full items-center justify-end px-2.5 py-1.5"
                    onClick={() => setMenuOpen(false)}
                  >
                    <span className="absolute top-0 right-0 left-0 font-bold text-body1 leading-normal text-surface-white">
                      {item.label}
                    </span>
                    <span className="relative flex h-3 w-1.75 shrink-0 items-center justify-center text-gray-700">
                      <IconChevronRight aria-hidden className="block size-full max-w-none" />
                    </span>
                  </Link>
                ))}
              </nav>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </header>
    </>
  );
}
