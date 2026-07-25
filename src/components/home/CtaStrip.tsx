import { Button } from "@/components/ui/button";
import { DOWNLOAD_URL } from "@/lib/constants";
import { Download } from "lucide-react";
import {
  FacilityBackdrop,
  FacilityPanel,
} from "@/components/ui/FacilityChrome";
import { SectionLabel } from "@/components/ui/SectionLabel";

export function CtaStrip() {
  return (
    <section className="relative overflow-hidden border-t border-border py-14 sm:py-16">
      <FacilityBackdrop accent="hazard" />

      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6">
        <FacilityPanel className="p-6 sm:p-8 md:p-10" accentClassName="bg-hazard">
          <div className="grid items-center gap-8 md:grid-cols-[1.2fr_0.8fr]">
            <div>
              <SectionLabel variant="hazard" className="mb-4">
                Deployment Bay
              </SectionLabel>
              <h2 className="font-display text-3xl font-bold tracking-tight text-bone sm:text-4xl">
                Ready to drop into BONELAB?
              </h2>
              <p className="mt-3 max-w-lg text-sm leading-relaxed text-muted-foreground sm:text-base">
                The Hub handles installation, channel access, backups, and
                updates. Stable is free — no account required.
              </p>
              <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                Windows 10+ · MelonLoader · BoneLib
              </p>
            </div>

            <div className="flex flex-col items-stretch gap-3 md:items-end">
              <Button
                asChild
                size="lg"
                className="w-full gap-2 rounded-sm text-sm font-mono uppercase tracking-wider md:w-auto"
              >
                <a
                  href={DOWNLOAD_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Download size={16} />
                  Download Hub for Windows
                </a>
              </Button>
              <div className="grid w-full grid-cols-2 gap-2 md:w-auto md:min-w-[240px]">
                <div className="border border-border bg-background/50 px-3 py-2 text-center">
                  <p className="font-mono text-[9px] uppercase tracking-widest text-muted">
                    Access
                  </p>
                  <p className="mt-0.5 text-sm text-bone">Stable free</p>
                </div>
                <div className="border border-border bg-background/50 px-3 py-2 text-center">
                  <p className="font-mono text-[9px] uppercase tracking-widest text-muted">
                    Platform
                  </p>
                  <p className="mt-0.5 text-sm text-bone">PCVR</p>
                </div>
              </div>
            </div>
          </div>
        </FacilityPanel>
      </div>
    </section>
  );
}
