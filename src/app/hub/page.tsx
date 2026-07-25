import type { Metadata } from "next";
import { PRODUCTS } from "@/lib/constants";
import { HubHeroSection } from "@/components/hub/HubHeroSection";
import { HubFeatureList } from "@/components/hub/HubFeatureList";
import { DownloadBlock } from "@/components/hub/DownloadBlock";

const p = PRODUCTS.hub;

export const metadata: Metadata = {
  title: "MarrowLink Hub",
  description: p.description,
};

export default function HubPage() {
  return (
    <>
      <HubHeroSection />
      <HubFeatureList />
      <DownloadBlock />
    </>
  );
}
