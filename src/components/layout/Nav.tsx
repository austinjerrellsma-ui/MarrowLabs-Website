"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FacilityNavButton } from "@/components/ui/FacilityNavButton";

const SECTIONS = [
  { href: "/marrowlink", label: "MarrowLink", accent: "ml" as const },
  { href: "/hub", label: "Hub", accent: "hub" as const },
  { href: "/studio", label: "Studio", accent: "studio" as const },
] as const;

export function Nav() {
  const pathname = usePathname();

  return (
    <header className="pointer-events-none fixed top-0 inset-x-0 z-50">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-hazard to-transparent opacity-80"
        aria-hidden
      />
      <nav className="pointer-events-auto mx-auto flex min-h-16 max-w-7xl items-center gap-3 px-4 py-3 sm:px-6">
        <Link href="/" className="group flex shrink-0 items-center gap-2.5">
          <div className="flex h-7 w-7 items-center justify-center rounded-sm border border-hazard/60 bg-hazard/20 shadow-[0_0_16px_rgb(var(--hazard)/0.35)]">
            <div className="h-3 w-3 animate-glow-pulse rounded-[1px] bg-hazard shadow-[0_0_8px_rgb(var(--hazard-glow)/0.8)]" />
          </div>
          <span className="hidden font-display text-base font-semibold tracking-tight text-bone transition-colors group-hover:text-hazard sm:inline">
            MarrowLabs
          </span>
        </Link>

        <div className="flex flex-1 items-center justify-end gap-2 overflow-x-auto sm:justify-center sm:gap-3 md:pr-0">
          {SECTIONS.map((section) => (
            <FacilityNavButton
              key={section.href}
              href={section.href}
              accent={section.accent}
              active={pathname === section.href}
            >
              {section.label}
            </FacilityNavButton>
          ))}
        </div>

        {/* Balance brand width so section buttons stay visually centered on desktop */}
        <div className="hidden w-[132px] shrink-0 md:block" aria-hidden />
      </nav>
    </header>
  );
}
