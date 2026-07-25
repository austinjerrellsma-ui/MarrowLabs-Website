"use client";

import { useId, useState } from "react";
import { cn } from "@/lib/utils";
import "./bone-terminal.css";

type Tab = "sys" | "mod" | "link";

type BoneTerminalProps = {
  title: string;
  meta?: string[];
  integrity?: number;
  platform?: string;
  interfaceLabel?: string;
  className?: string;
};

const TABS: { id: Tab; label: string }[] = [
  { id: "sys", label: "SYS" },
  { id: "mod", label: "MOD" },
  { id: "link", label: "LINK" },
];

export function BoneTerminal({
  title,
  meta = ["RUNTIME", "MELONLOADER", "BONELIB"],
  integrity = 78,
  platform = "BONELAB / Windows",
  interfaceLabel = "Desktop + VR",
  className,
}: BoneTerminalProps) {
  const uid = useId();
  const [tab, setTab] = useState<Tab>("sys");

  const inventory = [
    { name: title, meta: "PRIMARY" },
    ...meta.map((tag, i) => ({
      name: tag,
      meta: i === 0 ? "ACTIVE" : `TAG-${String(i).padStart(2, "0")}`,
    })),
    { name: "Hazard Seal", meta: "OK" },
  ];

  return (
    <div
      className={cn("bone-terminal", className)}
      data-active={tab}
      role="region"
      aria-label={`${title} facility terminal`}
    >
      <div className="bone-terminal-chassis">
        <div className="bone-terminal-screw tl" aria-hidden />
        <div className="bone-terminal-screw tr" aria-hidden />
        <div className="bone-terminal-screw bl" aria-hidden />
        <div className="bone-terminal-screw br" aria-hidden />

        <div className="bone-terminal-crt">
          <div className="bone-terminal-glass" aria-hidden />
          <div className="bone-terminal-scanlines" aria-hidden />

          <div className="bone-terminal-boot">
            <header className="bone-terminal-top">
              <div
                className="bone-terminal-title bone-terminal-flicker"
                aria-live="polite"
              />
              <div className="bone-terminal-line flexible" />
              <div className="bone-terminal-stats">
                <span>
                  INT <span className="bold">{integrity}%</span>
                </span>
                <span>
                  PWR <span className="bold">ON</span>
                </span>
                <span className="bone-terminal-pulse" aria-hidden>
                  ▲
                </span>
              </div>
            </header>

            <main className="bone-terminal-middle">
              <div className="bone-terminal-tab content-sys">
                <aside className="bone-terminal-side">
                  <div>CND</div>
                  <div>HAZ</div>
                  <div>EFF</div>
                  <div className="bone-terminal-active-box">DOS</div>
                </aside>

                <section className="bone-terminal-clock">
                  <div className="bone-terminal-block">
                    <div className="readout">
                      {integrity}
                      <span className="bone-terminal-blink">%</span>
                    </div>
                  </div>
                  <div className="bone-terminal-date">{title}</div>
                  <dl className="bone-terminal-dossier" style={{ marginTop: 10 }}>
                    <div className="bone-terminal-dossier-row">
                      <dt>DIV</dt>
                      <dd>MarrowLabs</dd>
                    </div>
                    <div className="bone-terminal-dossier-row">
                      <dt>PLT</dt>
                      <dd>{platform}</dd>
                    </div>
                    <div className="bone-terminal-dossier-row">
                      <dt>IFC</dt>
                      <dd>{interfaceLabel}</dd>
                    </div>
                  </dl>
                </section>

                <aside className="bone-terminal-right">
                  <div className="bone-terminal-hazard" aria-hidden>
                    <div className="bone-terminal-hazard-core" />
                  </div>
                  <div className="bone-terminal-rad">VOID</div>
                </aside>
              </div>

              <div className="bone-terminal-tab content-mod">
                <ul className="bone-terminal-list">
                  {inventory.map((item, i) => (
                    <li key={item.name} className={i === 0 ? "active" : undefined}>
                      <span>{item.name}</span>
                      <span className="item-meta">{item.meta}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bone-terminal-tab content-link">
                <div className="bone-terminal-radar" aria-hidden>
                  <span />
                  <div className="bone-terminal-blip" />
                </div>
                <div className="bone-terminal-radar-text bone-terminal-flicker-fast">
                  SEARCHING FACILITY LINK...
                </div>
              </div>
            </main>

            <footer className="bone-terminal-bottom">
              {TABS.map((t, i) => (
                <span key={t.id} className="contents">
                  {i > 0 ? (
                    <div className="bone-terminal-line flexible" aria-hidden />
                  ) : null}
                  <label
                    htmlFor={`${uid}-${t.id}`}
                    data-tab={t.id}
                    className="bone-terminal-nav"
                  >
                    <input
                      id={`${uid}-${t.id}`}
                      type="radio"
                      name={`${uid}-tabs`}
                      checked={tab === t.id}
                      onChange={() => setTab(t.id)}
                    />
                    {t.label}
                  </label>
                </span>
              ))}
              <div className="bone-terminal-line flexible" aria-hidden />
              <div className="bone-terminal-eq" aria-hidden>
                <div className="bar bar-1" />
                <div className="bar bar-2" />
                <div className="bar bar-3" />
                <div className="bar bar-4" />
              </div>
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
}
