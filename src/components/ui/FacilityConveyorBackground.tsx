"use client";

import { cn } from "@/lib/utils";
import "./facility-conveyor.css";

type CargoKind = "crate" | "barrel" | "robot" | "pallet" | "canister";

type BeltConfig = {
  id: string;
  top: string;
  depth: "far" | "mid" | "near";
  direction: "left" | "right";
  /** Shared duration for cargo + belt treads so they stay locked */
  moveDuration: string;
  items: CargoKind[];
};

const BELTS: BeltConfig[] = [
  {
    id: "belt-a",
    top: "18%",
    depth: "far",
    direction: "right",
    moveDuration: "58s",
    items: ["crate", "barrel", "robot", "pallet", "canister", "crate", "barrel"],
  },
  {
    id: "belt-b",
    top: "46%",
    depth: "mid",
    direction: "left",
    moveDuration: "44s",
    items: ["robot", "crate", "canister", "barrel", "pallet", "robot", "crate"],
  },
  {
    id: "belt-c",
    top: "74%",
    depth: "near",
    direction: "right",
    moveDuration: "36s",
    items: ["barrel", "pallet", "crate", "robot", "canister", "barrel", "crate"],
  },
];

/** Shared loop distance so belt treads + cargo travel at the same speed */
const SCROLL_PX = 1600;
const TREAD_PLATE_W = 20;
const TREAD_PLATES = Math.round(SCROLL_PX / TREAD_PLATE_W);

function Crate() {
  return (
    <svg width="42" height="34" viewBox="0 0 42 34" aria-hidden>
      <rect x="2" y="6" width="38" height="26" rx="1" fill="#3a3228" stroke="#ff7a00" strokeWidth="1.2" />
      <rect x="2" y="6" width="38" height="6" fill="#4a4034" />
      <path d="M2 18h38M14 6v26M28 6v26" stroke="#ff9a45" strokeWidth="1" opacity="0.7" />
      <rect x="16" y="12" width="10" height="8" fill="none" stroke="#cfc5b0" strokeWidth="0.8" opacity="0.5" />
    </svg>
  );
}

function Barrel() {
  return (
    <svg width="28" height="36" viewBox="0 0 28 36" aria-hidden>
      <ellipse cx="14" cy="32" rx="11" ry="3" fill="#1a1208" opacity="0.45" />
      <path
        d="M4 10c0-3 4.5-5 10-5s10 2 10 5v18c0 3-4.5 5-10 5s-10-2-10-5V10z"
        fill="#5a3a18"
        stroke="#ff7a00"
        strokeWidth="1.1"
      />
      <ellipse cx="14" cy="10" rx="10" ry="4" fill="#7a5228" stroke="#ff9a45" strokeWidth="0.9" />
      <path d="M4 16h20M4 22h20" stroke="#cfc5b0" strokeWidth="1" opacity="0.45" />
      <path d="M4 19h20" stroke="#ff7a00" strokeWidth="1.4" opacity="0.75" />
    </svg>
  );
}

function Robot() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" aria-hidden>
      <rect x="11" y="14" width="18" height="16" rx="2" fill="#2a2e34" stroke="#ff7a00" strokeWidth="1.2" />
      <rect x="13" y="8" width="14" height="8" rx="1.5" fill="#3a4048" stroke="#ff9a45" strokeWidth="1" />
      <circle cx="17" cy="12" r="1.6" fill="#ff7a00" />
      <circle cx="23" cy="12" r="1.6" fill="#ff7a00" />
      <rect x="15" y="18" width="10" height="3" rx="0.5" fill="#cfc5b0" opacity="0.35" />
      <rect x="7" y="16" width="4" height="10" rx="1" fill="#2a2e34" stroke="#ff7a00" strokeWidth="0.8" />
      <rect x="29" y="16" width="4" height="10" rx="1" fill="#2a2e34" stroke="#ff7a00" strokeWidth="0.8" />
      <rect x="14" y="30" width="4" height="6" fill="#3a4048" stroke="#ff7a00" strokeWidth="0.8" />
      <rect x="22" y="30" width="4" height="6" fill="#3a4048" stroke="#ff7a00" strokeWidth="0.8" />
      <path d="M18 8V4h4" stroke="#ff9a45" strokeWidth="1.2" fill="none" />
      <circle cx="22" cy="3.5" r="1.4" fill="#ff7a00" />
    </svg>
  );
}

function Pallet() {
  return (
    <svg width="48" height="22" viewBox="0 0 48 22" aria-hidden>
      <rect x="1" y="12" width="46" height="8" rx="1" fill="#2e261c" stroke="#ff7a00" strokeWidth="1" />
      <rect x="4" y="4" width="12" height="10" fill="#4a4034" stroke="#cfc5b0" strokeWidth="0.7" opacity="0.85" />
      <rect x="18" y="2" width="12" height="12" fill="#3a3228" stroke="#ff9a45" strokeWidth="0.8" />
      <rect x="32" y="5" width="12" height="9" fill="#4a4034" stroke="#cfc5b0" strokeWidth="0.7" opacity="0.85" />
      <path d="M1 16h46M12 12v8M24 12v8M36 12v8" stroke="#ff7a00" strokeWidth="0.8" opacity="0.55" />
    </svg>
  );
}

function Canister() {
  return (
    <svg width="24" height="34" viewBox="0 0 24 34" aria-hidden>
      <rect x="5" y="6" width="14" height="24" rx="2" fill="#243038" stroke="#ff7a00" strokeWidth="1.1" />
      <rect x="7" y="2" width="10" height="5" rx="1" fill="#3a4850" stroke="#ff9a45" strokeWidth="0.9" />
      <rect x="8" y="12" width="8" height="10" rx="1" fill="none" stroke="#cfc5b0" strokeWidth="0.8" opacity="0.45" />
      <circle cx="12" cy="17" r="2" fill="#ff7a00" opacity="0.8" />
      <path d="M5 26h14" stroke="#ff9a45" strokeWidth="1" opacity="0.6" />
    </svg>
  );
}

function CargoItem({ kind }: { kind: CargoKind }) {
  switch (kind) {
    case "crate":
      return <Crate />;
    case "barrel":
      return <Barrel />;
    case "robot":
      return <Robot />;
    case "pallet":
      return <Pallet />;
    case "canister":
      return <Canister />;
  }
}

function BeltTread({ id }: { id: string }) {
  // Two identical plate runs → seamless when translating by exactly one run
  const plates = Array.from({ length: TREAD_PLATES * 2 }, (_, i) => i);

  return (
    <div className="fcb-tread-row">
      {plates.map((i) => (
        <span key={`${id}-${i}`} className="fcb-tread-plate" />
      ))}
    </div>
  );
}

function Belt({ config }: { config: BeltConfig }) {
  const dir = config.direction === "left" ? "reverse" : "normal";
  // Bottom return path runs opposite the top belt / cargo
  const returnDir = dir === "normal" ? "reverse" : "normal";
  // Two identical cargo sets → seamless when translating by SCROLL_PX
  const sets = [0, 1];

  return (
    <div
      className="fcb-belt-lane"
      data-depth={config.depth}
      style={{
        top: config.top,
        ["--move-duration" as string]: config.moveDuration,
        ["--scroll-px" as string]: `${SCROLL_PX}px`,
        ["--belt-dir" as string]: dir,
        ["--belt-dir-return" as string]: returnDir,
      }}
    >
      <div className="fcb-rail" aria-hidden />
      <div className="fcb-cargo-track">
        <div className="fcb-cargo-row">
          {sets.map((set) => (
            <div
              key={`${config.id}-set-${set}`}
              className="fcb-cargo-set"
              style={{ width: SCROLL_PX }}
            >
              {config.items.map((kind, i) => (
                <div key={`${config.id}-${set}-${i}`} className="fcb-item">
                  <CargoItem kind={kind} />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="fcb-belt" aria-hidden>
        <div className="fcb-tread-track top">
          <BeltTread id={`${config.id}-top`} />
        </div>
        <div className="fcb-belt-deck" />
        <div className="fcb-tread-track bottom">
          <BeltTread id={`${config.id}-bottom`} />
        </div>
      </div>
    </div>
  );
}

/** Animated BONELAB facility conveyor backdrop */
export function FacilityConveyorBackground({
  className,
}: {
  className?: string;
}) {
  return (
    <div className={cn("fcb-root", className)} aria-hidden>
      {BELTS.map((belt) => (
        <Belt key={belt.id} config={belt} />
      ))}
      <div className="fcb-veil" />
    </div>
  );
}
