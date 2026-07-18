import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import StatsSection from "@/components/StatsSection";
import CTASection from "@/components/CTASection";
import { LanguageProvider } from "@/lib/i18n/LanguageContext";
import { HomeLanguageWrapper } from "@/components/HomeLanguageWrapper";

export default function HomePage() {
  return (
    <LanguageProvider>
      <HomeLanguageWrapper>
        <main>
          <HeroSection />
          <StatsSection />
          <ServicesSection />
          <CTASection />
        </main>
      </HomeLanguageWrapper>
    </LanguageProvider>
  );
}
