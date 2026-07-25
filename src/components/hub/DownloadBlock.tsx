import { Button } from "@/components/ui/button";
import { DOWNLOAD_URL, PRODUCTS } from "@/lib/constants";
import { Download } from "lucide-react";
import {
  FacilityBackdrop,
  FacilityPanel,
} from "@/components/ui/FacilityChrome";
import { SectionLabel } from "@/components/ui/SectionLabel";

const p = PRODUCTS.hub;

export function DownloadBlock() {
  return (
    <section className="relative overflow-hidden border-t border-border py-14 sm:py-16">
      <FacilityBackdrop accent="hub" />

      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6">
        <FacilityPanel className="p-6 sm:p-8 md:p-10" accentClassName="bg-hub">
          <div className="grid items-center gap-8 md:grid-cols-[1.2fr_0.8fr]">
            <div>
              <SectionLabel variant="hub" className="mb-4">
                Deployment Bay
              </SectionLabel>
              <h2 className="font-display text-3xl font-bold tracking-tight text-bone sm:text-4xl">
                Get the Hub
              </h2>
              <p className="mt-3 max-w-lg text-sm leading-relaxed text-muted-foreground sm:text-base">
                {p.tagline} Download the Windows installer and let the Hub
                handle detection, channels, and backups.
              </p>
              <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                Free · Windows 10+ · No account for Stable
              </p>
            </div>

            <div className="flex flex-col items-stretch gap-3 md:items-end">
              <Button
                asChild
                size="lg"
                className="w-full gap-2 rounded-sm bg-hub text-sm font-mono uppercase tracking-wider text-primary-foreground hover:bg-hub/90 md:w-auto"
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
