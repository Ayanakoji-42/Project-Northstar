import LandingNav from "@/components/landing/LandingNav";
import HeroSection from "@/components/landing/HeroSection";
import MissionSection from "@/components/landing/MissionSection";
import FeaturesSection from "@/components/landing/FeaturesSection";
import HowItWorksSection from "@/components/landing/HowItWorksSection";

export default function HomePage() {
  return (
    <main style={{ background: "var(--bg)", minHeight: "100vh" }}>
      <LandingNav />
      <HeroSection />
      <MissionSection />
      <FeaturesSection />
      <HowItWorksSection />
    </main>
  );
}
