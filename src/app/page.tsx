import { HeroSection } from "@/components/home/HeroSection";
import { ProductTriptych } from "@/components/home/ProductTriptych";
import { HowItWorksSection } from "@/components/home/HowItWorksSection";
import { CtaStrip } from "@/components/home/CtaStrip";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ProductTriptych />
      <HowItWorksSection />
      <CtaStrip />
    </>
  );
}
