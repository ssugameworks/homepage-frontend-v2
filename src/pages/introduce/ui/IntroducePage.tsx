import { FounderQuoteSection } from "./FounderQuoteSection";
import { HeroSection } from "./HeroSection";
import { HistorySection } from "./HistorySection";

/** Figma "intorduce" 섹션 흐름: web/introduce(웹1) → 웹3(창립자 인터뷰) → web/introduce 3(연혁·CTA) */
export default function IntroducePage() {
  return (
    <div className="bg-surface-white">
      <HeroSection />
      <FounderQuoteSection />
      <HistorySection />
    </div>
  );
}
