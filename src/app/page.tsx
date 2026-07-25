import { HeroSection } from "@/components/home/HeroSection";
import { ProductExpandableList } from "@/components/home/ProductExpandableList";
import { HowItWorksSection } from "@/components/home/HowItWorksSection";
import { CtaStrip } from "@/components/home/CtaStrip";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ProductExpandableList />
      <HowItWorksSection />
      <CtaStrip />
    </>
  );
}
