import { Link } from "react-router-dom";
import {
  IconChatFill,
  IconDiscord,
  IconGithub,
  IconInstagram,
  IconMail,
  IconYoutube,
} from "@/shared/assets/icons";
import { ROUTES } from "@/shared/config/routes";
import type { SocialLink } from "./Footer.types";

const SOCIAL_LINKS: SocialLink[] = [
  { name: "GitHub", href: "#", icon: IconGithub },
  { name: "Mail", href: "#", icon: IconMail },
  { name: "YouTube", href: "#", icon: IconYoutube },
  { name: "Discord", href: "#", icon: IconDiscord },
  { name: "Instagram", href: "#", icon: IconInstagram },
];

export default function Footer() {
  return (
    <footer className="flex w-full flex-col items-center justify-center bg-primary-950 px-6 py-5 md:h-62.5 md:px-12.5 md:py-7.5">
      <div className="flex w-full flex-col items-start gap-4">
        <div className="flex w-full flex-col items-start gap-7.5 md:flex-row md:items-center md:justify-between">
          <div className="flex w-full flex-col items-start gap-2.5 text-white md:w-93.75">
            <p className="w-full text-body1 font-light leading-normal tracking-dense md:text-subheading md:tracking-dense">
              글로벌미디어학부 대표 학술 소모임
            </p>
            <p className="w-full text-2xl font-bold leading-normal md:text-heading1">GAMEWORKS</p>
          </div>

          <div className="flex w-full flex-col items-start gap-4 md:w-70.5 md:items-end">
            <Link
              to={ROUTES.CONTACT}
              className="order-2 inline-flex shrink-0 items-center justify-center gap-2.5 rounded-full border border-white/5 bg-white/5 px-5 py-2.5 text-body1 font-light tracking-dense text-white md:order-1 md:text-subheading md:tracking-dense"
            >
              <IconChatFill aria-hidden className="size-4" />
              문의하기
            </Link>

            <div className="order-1 flex w-46 items-center justify-between md:order-2 md:w-auto md:gap-4">
              {SOCIAL_LINKS.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    aria-label={link.name}
                    className="flex size-6 shrink-0 items-center justify-center md:size-8"
                  >
                    <Icon aria-hidden className="size-full text-gray-200" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        <div className="h-px w-full bg-gray-200" />

        <div className="w-full text-center text-body2 font-light leading-normal tracking-dense text-white">
          <p>© 2026 GAMEWORKS, All rights reserved.</p>
          <p>26년의 역사를 이어온 종합 학술 소모임, GAMEWORKS</p>
        </div>
      </div>
    </footer>
  );
}
