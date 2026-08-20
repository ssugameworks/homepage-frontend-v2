import { Footer } from "@/components/layout";
import { ActivitiesSection } from "./home/ActivitiesSection";
import { CtaSection } from "./home/CtaSection";
import { FaqSection } from "./home/FaqSection";
import { HeroSection } from "./home/HeroSection";
import { HistorySection } from "./home/HistorySection";
import { IntroSection } from "./home/IntroSection";
import { PartnersSection } from "./home/PartnersSection";
import { ScrollIndicator } from "./home/ScrollIndicator";
import "./home/home.css";

export default function HomePage() {
  return (
    <div className="bg-white">
      <HeroSection />
      <IntroSection />
      <HistorySection />
      <ActivitiesSection />
      <FaqSection />
      <CtaSection />
      <PartnersSection />
      {/* NOTE: 다른 페이지에도 푸터가 확정되면 RootLayout으로 이동 */}
      <Footer />
      <ScrollIndicator />
    </div>
  );
}
