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
      <ScrollIndicator />
    </div>
  );
}
