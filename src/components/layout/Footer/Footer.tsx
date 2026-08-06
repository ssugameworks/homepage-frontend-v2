import { Link } from "react-router-dom";
import { ROUTES } from "@/router/routes";

// TODO: 실제 채널 URL 확정 시 교체
const SOCIAL_LINKS = [
  { label: "GitHub", href: "https://github.com", icon: <GithubIcon /> },
  { label: "메일", href: "mailto:contact@gameworks.kr", icon: <MailIcon /> },
  { label: "YouTube", href: "https://youtube.com", icon: <YoutubeIcon /> },
  { label: "Discord", href: "https://discord.com", icon: <DiscordIcon /> },
  { label: "Instagram", href: "https://instagram.com", icon: <InstagramIcon /> },
];

/**
 * Figma spec (web 1440×250)
 * - 섹션: bg primary/950 #000B1A, padding 50/30
 * - 상단: 좌 gap 10 — 소개 subheading-300(18, Light) tracking -3% white,
 *   "GAMEWORKS" heading1-700(38) white
 * - 우 gap 16, items-end — 문의하기 칩(bg/border white 5%, padding 20/10, radius 50,
 *   gap 10, 아이콘 16, 라벨 subheading-300(18) tracking -3% white) + 소셜 아이콘 32, gap 16
 * - 하단: gap 24 — 1px gray-200 구분선 + 카피라이트 body2-300(14) tracking -3% white, 가운데
 */
export function Footer({ className }: { className?: string }) {
  return (
    <footer className={["w-full bg-primary-950", className].filter(Boolean).join(" ")}>
      <div className="mx-auto flex max-w-[1440px] flex-col gap-4 px-6 py-[30px] lg:px-[50px]">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-start">
          <div className="flex flex-col gap-2.5 text-white">
            <p className="font-light text-[16px] leading-[1.5] tracking-[-0.03em] lg:text-[18px]">
              글로벌미디어학부 대표 학술 소모임
            </p>
            <p className="font-bold text-[24px] leading-[1.5] lg:text-[38px]">GAMEWORKS</p>
          </div>

          {/* mobile: 아이콘 → 문의하기 순서 / desktop: 문의하기 → 아이콘 */}
          <div className="flex flex-col-reverse items-start gap-4 sm:flex-col sm:items-end">
            <Link
              to={ROUTES.CONTACT}
              className="flex items-center gap-2.5 rounded-[50px] border border-white/5 border-solid bg-white/5 px-5 py-2.5 font-light text-[16px] text-white leading-[1.5] tracking-[-0.03em] transition-colors hover:bg-white/10 lg:text-[18px]"
            >
              <ChatBubbleIcon />
              문의하기
            </Link>
            <ul className="flex items-center gap-4">
              {SOCIAL_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={link.label}
                    className="block text-white transition-colors hover:text-gray-300"
                  >
                    {link.icon}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-4 lg:gap-6">
          <hr className="m-0 border-0 border-gray-200 border-t" />
          <p className="text-center font-light text-[14px] text-white leading-[1.5] tracking-[-0.03em]">
            © 2026 GAMEWORKS, All rights reserved.
            <br />
            26년의 역사를 이어온 종합 학술 소모임, GAMEWORKS
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ---------- icons ---------- */

const iconProps = {
  width: 32,
  height: 32,
  viewBox: "0 0 24 24",
  fill: "currentColor",
  "aria-hidden": true,
} as const;

function GithubIcon() {
  return (
    <svg {...iconProps} aria-hidden="true">
      <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.56-1.11-4.56-4.94 0-1.1.39-1.99 1.03-2.69-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02a9.56 9.56 0 0 1 5 0c1.91-1.3 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.6 1.03 2.69 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85V21c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg {...iconProps} fill="none" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.8" />
      <path d="m4 7 8 6 8-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function YoutubeIcon() {
  return (
    <svg {...iconProps} aria-hidden="true">
      <path d="M21.6 7.2a2.51 2.51 0 0 0-1.77-1.77C18.25 5 12 5 12 5s-6.25 0-7.83.43A2.51 2.51 0 0 0 2.4 7.2 26.3 26.3 0 0 0 2 12a26.3 26.3 0 0 0 .4 4.8 2.51 2.51 0 0 0 1.77 1.77C5.75 19 12 19 12 19s6.25 0 7.83-.43a2.51 2.51 0 0 0 1.77-1.77A26.3 26.3 0 0 0 22 12a26.3 26.3 0 0 0-.4-4.8ZM10 15V9l5.2 3L10 15Z" />
    </svg>
  );
}

function DiscordIcon() {
  return (
    <svg {...iconProps} aria-hidden="true">
      <path d="M19.27 5.33A16.94 16.94 0 0 0 15.06 4l-.2.4a13.6 13.6 0 0 1 3.6 1.73 14.06 14.06 0 0 0-11.9 0A13.6 13.6 0 0 1 10.2 4.4l-.2-.4a16.94 16.94 0 0 0-4.2 1.33C3.1 9.24 2.4 13.06 2.75 16.83a17.1 17.1 0 0 0 5.14 2.57l.44-.6a11.1 11.1 0 0 1-1.75-.84l.42-.32a12.13 12.13 0 0 0 10 0l.42.32c-.55.33-1.14.61-1.75.84l.44.6a17.1 17.1 0 0 0 5.14-2.57c.42-4.36-.7-8.14-2.98-11.5ZM9.34 14.5c-.98 0-1.79-.9-1.79-2s.79-2 1.79-2 1.8.9 1.79 2c0 1.1-.79 2-1.79 2Zm5.32 0c-.98 0-1.79-.9-1.79-2s.79-2 1.79-2 1.8.9 1.79 2c0 1.1-.79 2-1.79 2Z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg {...iconProps} fill="none" aria-hidden="true">
      <rect
        x="3.5"
        y="3.5"
        width="17"
        height="17"
        rx="4.5"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="17.2" cy="6.8" r="1.2" fill="currentColor" />
    </svg>
  );
}

function ChatBubbleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
      <path d="M8 2C4.5 2 1.75 4.36 1.75 7.27c0 1.66.9 3.14 2.3 4.1-.1.86-.44 1.62-.98 2.23a.3.3 0 0 0 .26.5 5.94 5.94 0 0 0 3.14-1.35c.49.1 1 .16 1.53.16 3.5 0 6.25-2.36 6.25-5.27S11.5 2 8 2Z" />
    </svg>
  );
}
