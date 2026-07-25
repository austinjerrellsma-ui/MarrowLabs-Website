"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FacilityNavButton } from "@/components/ui/FacilityNavButton";
import "@/components/ui/facility-topbar.css";

const SECTIONS = [
  { href: "/marrowlink", label: "MarrowLink", accent: "ml" as const },
  { href: "/hub", label: "Hub", accent: "hub" as const },
  { href: "/studio", label: "Studio", accent: "studio" as const },
] as const;

function accentFromPath(pathname: string) {
  if (pathname.startsWith("/marrowlink")) return "ml";
  if (pathname.startsWith("/hub")) return "hub";
  if (pathname.startsWith("/studio")) return "studio";
  return "hazard";
}

export function Nav() {
  const pathname = usePathname();
  const accent = accentFromPath(pathname);

  return (
    <header className="facility-topbar fixed inset-x-0 top-0 z-50" data-accent={accent}>
      <div className="facility-topbar-shell relative">
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
          <Link
            href="/"
            className="facility-topbar-brand group flex shrink-0 items-center gap-2.5"
            aria-label="MarrowLabs home"
          >
            <div className="facility-topbar-brand-mark flex h-8 w-8 items-center justify-center rounded-sm border">
              <div className="facility-topbar-brand-core h-3 w-3 animate-glow-pulse rounded-[1px]" />
            </div>
            <div className="hidden leading-none sm:block">
              <span className="facility-topbar-brand-name block font-display text-[15px] font-semibold tracking-[0.04em] text-bone transition-colors">
                MarrowLabs
              </span>
              <span className="mt-0.5 block font-mono text-[9px] tracking-[0.18em] text-muted uppercase">
                Void Facility
              </span>
            </div>
          </Link>

          <div
            className="facility-topbar-divider hidden h-8 w-px sm:block"
            aria-hidden
          />

          <div className="min-w-0 flex-1">
            <div className="facility-topbar-bay facility-panel relative mx-auto grid max-w-xl grid-cols-3 gap-1.5 border bg-background/55 p-1.5 sm:gap-2 sm:p-2">
              <span className="facility-corner facility-corner-tl" aria-hidden />
              <span className="facility-corner facility-corner-tr" aria-hidden />
              <span className="facility-corner facility-corner-bl" aria-hidden />
              <span className="facility-corner facility-corner-br" aria-hidden />
              <span className="facility-topbar-rail absolute left-0 top-0 h-full w-[2px]" aria-hidden />

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

          <div className="facility-topbar-status hidden shrink-0 items-center gap-2 border px-2.5 py-1.5 md:flex">
            <span className="facility-topbar-status-dot h-1.5 w-1.5 animate-glow-pulse rounded-full" />
            <span className="font-mono text-[10px] tracking-[0.16em] uppercase">
              Online
            </span>
          </div>
        </nav>
      </div>
    </header>
  );
}
