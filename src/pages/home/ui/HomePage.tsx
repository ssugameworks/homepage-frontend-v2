import { ActivitiesSection } from "./ActivitiesSection";
import { CtaSection } from "./CtaSection";
import { FaqSection } from "./FaqSection";
import { HeroSection } from "./HeroSection";
import { HistorySection } from "./HistorySection";
import { IntroSection } from "./IntroSection";
import { PartnersSection } from "./PartnersSection";
import { ScrollIndicator } from "./ScrollIndicator";
import "./home.css";

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
