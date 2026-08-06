import crycheeseburgerLogo from "@/assets/partners/crycheeseburger.png";
import flowLogo from "@/assets/partners/flow.png";

/**
 * Figma spec (web 1440×500 · mobile 390×292)
 * - 섹션: padding 110/20, bg #FAFAFA, content 세로 중앙, gap 32(web) / 24(mobile)
 * - main_content/title: gap 8 — "Partners" body1-500(16) gray-400,
 *   "게임웍스와 함께하는 분들" heading1-700 (38 · mobile 24) gray-950
 * - main_content/sponsors: 로고 박스 120×60 + gap 16 + 이름 subheading-500(18 · mobile 16) gray-950
 * - 로고 사이 간격 100(web) / 50(mobile)
 */
const PARTNERS = [
  { name: "FLOW", logo: flowLogo, logoWidth: 80 },
  { name: "크라이치즈버거", logo: crycheeseburgerLogo, logoWidth: 100 },
];

export function PartnersSection() {
  return (
    <section
      className="flex min-h-[292px] items-center bg-[color:var(--gw-bg-white)] py-12 lg:min-h-[500px] lg:py-0"
      aria-label="파트너"
    >
      <div className="mx-auto flex w-full max-w-[1440px] flex-col items-center gap-6 px-6 text-center lg:gap-8 lg:px-[110px]">
        <div className="flex flex-col items-center gap-2">
          <p className="font-medium text-[16px] text-[color:var(--gw-gray-400)] leading-[1.5]">
            Partners
          </p>
          <h2 className="font-bold text-[24px] text-[color:var(--gw-gray-950)] leading-[1.5] lg:text-[38px]">
            게임웍스와 함께하는 분들
          </h2>
        </div>

        <ul className="flex flex-wrap items-start justify-center gap-x-[50px] gap-y-8 lg:gap-x-[100px]">
          {PARTNERS.map((partner) => (
            <li key={partner.name} className="flex w-[120px] flex-col items-center gap-4">
              <span className="flex h-[60px] w-[120px] items-center justify-center">
                <img
                  src={partner.logo}
                  alt={partner.name}
                  style={{ width: partner.logoWidth }}
                  className="h-auto max-w-full"
                />
              </span>
              <span className="font-medium text-[16px] text-[color:var(--gw-gray-950)] leading-[1.5] lg:text-[18px]">
                {partner.name}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
