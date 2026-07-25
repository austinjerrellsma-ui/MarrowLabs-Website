import type { Metadata } from "next";
import { ABOUT } from "@/lib/constants";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { GradientText } from "@/components/ui/GradientText";

export const metadata: Metadata = {
  title: "About",
  description: ABOUT.mission,
};

export default function AboutPage() {
  return (
    <section className="relative mx-auto max-w-3xl px-6 pt-32 pb-24">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background: `radial-gradient(ellipse 70% 40% at 50% 0%, rgb(var(--ml-glow) / 0.10), transparent)`,
        }}
      />
      <SectionLabel variant="ml" className="mb-6">
        About
      </SectionLabel>
      <h1 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">
        <GradientText variant="ml">{ABOUT.name}</GradientText>
      </h1>
      <p className="mt-6 text-xl text-foreground font-medium leading-relaxed">
        {ABOUT.mission}
      </p>
      <p className="mt-4 text-base text-muted-foreground leading-relaxed">
        {ABOUT.description}
      </p>
      <p className="mt-10 text-sm text-muted font-mono">
        Not affiliated with Stress Level Zero. BONELAB is a trademark of Stress
        Level Zero.
      </p>
    </section>
  );
}
