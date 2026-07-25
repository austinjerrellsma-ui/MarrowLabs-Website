import type { Metadata } from "next";
import { ABOUT } from "@/lib/constants";
import { AboutContent } from "@/components/about/AboutContent";

export const metadata: Metadata = {
  title: "About",
  description: ABOUT.mission,
};

export default function AboutPage() {
  return <AboutContent />;
}
