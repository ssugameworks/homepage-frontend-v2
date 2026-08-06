import chatFillIcon from "@/assets/icons/chat-fill.svg";
import discordIcon from "@/assets/icons/discord.svg";
import githubIcon from "@/assets/icons/github.svg";
import instagramIcon from "@/assets/icons/instagram.svg";
import mailIcon from "@/assets/icons/mail.svg";
import youtubeIcon from "@/assets/icons/youtube.svg";
import type { SocialLink } from "./Footer.types";

const SOCIAL_LINKS: SocialLink[] = [
  { name: "GitHub", href: "#", icon: githubIcon },
  { name: "Mail", href: "#", icon: mailIcon },
  { name: "YouTube", href: "#", icon: youtubeIcon },
  { name: "Discord", href: "#", icon: discordIcon },
  { name: "Instagram", href: "#", icon: instagramIcon },
];

export default function Footer() {
  return (
    <footer className="flex w-full flex-col items-center justify-center bg-[#000b1a] px-6 py-5 md:h-[250px] md:px-[50px] md:py-[30px]">
      <div className="flex w-full flex-col items-start gap-4">
        <div className="flex w-full flex-col items-start gap-[30px] md:flex-row md:items-center md:justify-between">
          <div className="flex w-full flex-col items-start gap-2.5 text-white md:w-[375px]">
            <p className="w-full text-[16px] font-light leading-[1.5] tracking-[-0.48px] md:text-[18px] md:tracking-[-0.54px]">
              글로벌미디어학부 대표 학술 소모임
            </p>
            <p className="w-full text-[24px] font-bold leading-[1.5] md:text-[38px]">GAMEWORKS</p>
          </div>

          <div className="flex w-full flex-col items-start gap-4 md:w-[282px] md:items-end">
            <button
              type="button"
              className="order-2 inline-flex shrink-0 items-center justify-center gap-2.5 rounded-full border border-white/5 bg-white/5 px-5 py-2.5 text-[16px] font-light tracking-[-0.48px] text-white md:order-1 md:text-[18px] md:tracking-[-0.54px]"
            >
              <img src={chatFillIcon} alt="" className="size-4" />
              문의하기
            </button>

            <div className="order-1 flex w-[184px] items-center justify-between md:order-2 md:w-auto md:gap-4">
              {SOCIAL_LINKS.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  aria-label={link.name}
                  className="flex size-6 shrink-0 items-center justify-center md:size-8"
                >
                  <img src={link.icon} alt="" className="size-full" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="h-px w-full bg-[#d7d8da]" />

        <div className="w-full text-center text-[14px] font-light leading-[1.5] tracking-[-0.42px] text-white">
          <p>© 2026 GAMEWORKS, All rights reserved.</p>
          <p>26년의 역사를 이어온 종합 학술 소모임, GAMEWORKS</p>
        </div>
      </div>
    </footer>
  );
}
