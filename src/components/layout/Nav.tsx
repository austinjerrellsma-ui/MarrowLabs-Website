"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FacilityNavButton } from "@/components/ui/FacilityNavButton";

const SECTIONS = [
  { href: "/marrowlink", label: "MarrowLink" },
  { href: "/hub", label: "Hub" },
  { href: "/studio", label: "Studio" },
] as const;

export function Nav() {
  const pathname = usePathname();

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="relative border-b border-hazard/30 bg-[rgb(10_10_12/0.92)] shadow-[0_12px_40px_rgb(0_0_0/0.55)] backdrop-blur-md">
        {/* subtle facility grid inside the bar */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(rgb(237 230 217) 1px, transparent 1px), linear-gradient(90deg, rgb(237 230 217) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />

        <nav className="relative mx-auto flex h-[3.75rem] max-w-7xl items-center gap-3 px-3 sm:h-16 sm:gap-5 sm:px-6">
          {/* Brand */}
          <Link
            href="/"
            className="group flex shrink-0 items-center gap-2.5"
            aria-label="MarrowLabs home"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-sm border border-hazard/70 bg-hazard/15 shadow-[0_0_14px_rgb(var(--hazard)/0.3)]">
              <div className="h-3 w-3 animate-glow-pulse rounded-[1px] bg-hazard shadow-[0_0_8px_rgb(var(--hazard-glow)/0.85)]" />
            </div>
            <div className="hidden leading-none sm:block">
              <span className="block font-display text-[15px] font-semibold tracking-[0.04em] text-bone transition-colors group-hover:text-hazard">
                MarrowLabs
              </span>
              <span className="mt-0.5 block font-mono text-[9px] tracking-[0.18em] text-muted uppercase">
                Void Facility
              </span>
            </div>
          </Link>

          {/* Vertical hazard divider */}
          <div
            className="hidden h-8 w-px bg-gradient-to-b from-transparent via-hazard/60 to-transparent sm:block"
            aria-hidden
          />

          {/* Section bay — equal-width buttons in a framed rail */}
          <div className="min-w-0 flex-1">
            <div className="facility-panel relative mx-auto grid max-w-xl grid-cols-3 gap-1.5 border border-hazard/25 bg-background/55 p-1.5 sm:gap-2 sm:p-2">
              <span className="facility-corner facility-corner-tl" aria-hidden />
              <span className="facility-corner facility-corner-tr" aria-hidden />
              <span className="facility-corner facility-corner-bl" aria-hidden />
              <span className="facility-corner facility-corner-br" aria-hidden />
              <span
                className="absolute left-0 top-0 h-full w-[2px] bg-hazard shadow-[0_0_10px_rgb(var(--hazard)/0.45)]"
                aria-hidden
              />

              {SECTIONS.map((section) => (
                <FacilityNavButton
                  key={section.href}
                  href={section.href}
                  active={pathname === section.href}
                >
                  {section.label}
                </FacilityNavButton>
              ))}
            </div>
          </div>

          {/* Status chip */}
          <div className="hidden shrink-0 items-center gap-2 border border-hazard/30 bg-hazard/10 px-2.5 py-1.5 md:flex">
            <span className="h-1.5 w-1.5 animate-glow-pulse rounded-full bg-hazard shadow-[0_0_8px_rgb(var(--hazard)/0.9)]" />
            <span className="font-mono text-[10px] tracking-[0.16em] text-hazard uppercase">
              Online
            </span>
          </div>
        </nav>
      </div>
    </header>
  );
}
