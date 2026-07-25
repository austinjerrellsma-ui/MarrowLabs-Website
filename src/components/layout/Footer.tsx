"use client";

import Link from "next/link";
import { useState } from "react";
import { NAV_LINKS, CREDITS } from "@/lib/constants";
import { AnimatePresence, motion } from "framer-motion";

export function Footer() {
  const [creditsOpen, setCreditsOpen] = useState(false);

  return (
    <footer className="relative z-10 border-t border-border bg-background/80 backdrop-blur-sm">
      <div className="h-1.5 w-full hazard-stripe opacity-80" aria-hidden />

      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="font-display font-semibold tracking-wide text-bone uppercase text-sm">
              MarrowLabs
            </p>
            <p className="mt-2 text-xs text-muted-foreground max-w-xs font-mono leading-relaxed">
              VOID FACILITY TOOLING — MarrowLink · Hub · Marrow Studio for
              BONELAB.
            </p>
          </div>
          <nav className="flex flex-wrap gap-x-8 gap-y-3">
            {NAV_LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="text-sm font-mono uppercase tracking-wider text-muted-foreground hover:text-hazard transition-colors"
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="mt-10 border-t border-border pt-6 flex flex-col items-center gap-5">
          <div className="flex flex-col items-center gap-3">
            <button
              type="button"
              onClick={() => setCreditsOpen((o) => !o)}
              aria-expanded={creditsOpen}
              className="bone-panel group relative px-6 py-2.5 font-mono text-xs font-bold uppercase tracking-[0.2em] text-bone transition-colors hover:text-hazard hover:border-hazard/50"
            >
              <span className="absolute left-0 top-0 h-full w-1 bg-hazard opacity-80" aria-hidden />
              {CREDITS.buttonLabel}
            </button>

            <AnimatePresence>
              {creditsOpen && (
                <motion.p
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  className="bone-panel px-5 py-3 font-mono text-sm tracking-wide text-hazard"
                >
                  {CREDITS.ownerLine}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 w-full text-[11px] text-muted font-mono uppercase tracking-wider">
            <p>
              © {new Date().getFullYear()} MarrowLabs. Not affiliated with
              Stress Level Zero.
            </p>
            <p>BONELAB is a trademark of Stress Level Zero.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
