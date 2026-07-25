"use client";

import { usePathname } from "next/navigation";
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
      <rect x="2" y="6" width="38" height="26" rx="1" fill="#3a3228" stroke="currentColor" strokeWidth="1.2" />
      <rect x="2" y="6" width="38" height="6" fill="#4a4034" />
      <path d="M2 18h38M14 6v26M28 6v26" stroke="currentColor" strokeWidth="1" opacity="0.75" />
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
        stroke="currentColor"
        strokeWidth="1.1"
      />
      <ellipse cx="14" cy="10" rx="10" ry="4" fill="#7a5228" stroke="currentColor" strokeWidth="0.9" />
      <path d="M4 16h20M4 22h20" stroke="#cfc5b0" strokeWidth="1" opacity="0.45" />
      <path d="M4 19h20" stroke="currentColor" strokeWidth="1.4" opacity="0.85" />
    </svg>
  );
}

/** Humanoid android on its side, front-facing toward the viewer */
function Robot() {
  return (
    <svg width="96" height="38" viewBox="0 0 96 38" aria-hidden>
      <ellipse cx="48" cy="35.5" rx="40" ry="2.4" fill="#1a1208" opacity="0.32" />

      {/* —— FAR LEG (bottom) —— */}
      <path
        d="M1.5 26h8.5l1.8 3.4H2z"
        fill="#3a4048"
        stroke="currentColor"
        strokeWidth="0.85"
      />
      <rect x="9" y="24.8" width="12" height="4.8" rx="1.5" fill="#2a2e34" stroke="currentColor" strokeWidth="0.9" />
      <circle cx="22.5" cy="27.2" r="2.25" fill="#3a4048" stroke="currentColor" strokeWidth="0.85" />
      <rect x="23.5" y="24.6" width="14" height="5.2" rx="1.7" fill="#323840" stroke="currentColor" strokeWidth="0.95" />

      {/* —— NEAR LEG (top) —— */}
      <path
        d="M1.5 9h8.5l1.8 3.4H2z"
        fill="#3a4048"
        stroke="currentColor"
        strokeWidth="0.85"
      />
      <rect x="9" y="8" width="12" height="5" rx="1.5" fill="#2a2e34" stroke="currentColor" strokeWidth="0.9" />
      <circle cx="22.5" cy="10.5" r="2.3" fill="#3a4048" stroke="currentColor" strokeWidth="0.85" />
      <rect x="23.5" y="7.8" width="14" height="5.4" rx="1.7" fill="#323840" stroke="currentColor" strokeWidth="0.95" />

      {/* —— HIPS —— */}
      <rect x="36" y="7.2" width="9" height="20.6" rx="2.2" fill="#3a4048" stroke="currentColor" strokeWidth="1.05" />
      <path d="M40.5 10.5v14" stroke="#cfc5b0" strokeWidth="0.7" opacity="0.35" />
      <circle cx="40.5" cy="17.5" r="1.6" fill="#1a1e24" stroke="currentColor" strokeWidth="0.55" />

      {/* —— TORSO —— */}
      <rect x="44" y="5.5" width="22" height="24" rx="3" fill="#2a2e34" stroke="currentColor" strokeWidth="1.15" />
      <rect x="47.5" y="8" width="15" height="11" rx="2" fill="#3a444c" stroke="#cfc5b0" strokeWidth="0.75" opacity="0.92" />
      <path d="M50 11h10M50 14.2h10M50 17.4h7" stroke="currentColor" strokeWidth="0.75" opacity="0.5" />
      <rect x="49" y="20.5" width="12" height="6" rx="1.3" fill="#252930" stroke="currentColor" strokeWidth="0.7" />
      <circle cx="55" cy="23.5" r="1.35" fill="currentColor" opacity="0.8" />

      {/* shoulders */}
      <circle cx="64.5" cy="7" r="2.5" fill="#3a4048" stroke="currentColor" strokeWidth="0.95" />
      <circle cx="64.5" cy="28" r="2.3" fill="#323840" stroke="currentColor" strokeWidth="0.9" />

      {/* —— NEAR ARM (top): shoulder → elbow → forearm → hand toward hips —— */}
      <rect x="52" y="1.8" width="11" height="4.4" rx="1.6" fill="#323840" stroke="currentColor" strokeWidth="0.9" />
      <circle cx="51" cy="4" r="2" fill="#3a4048" stroke="currentColor" strokeWidth="0.8" />
      <rect x="40" y="2" width="10.5" height="4" rx="1.4" fill="#2a2e34" stroke="currentColor" strokeWidth="0.85" />
      <rect x="35" y="1.6" width="5.2" height="4.8" rx="1.2" fill="#3a4048" stroke="currentColor" strokeWidth="0.8" />
      <path d="M36.5 2.4v3.2M38.2 2.4v3.2" stroke="#cfc5b0" strokeWidth="0.55" opacity="0.45" />

      {/* —— FAR ARM (bottom): same layout —— */}
      <rect x="52" y="29" width="11" height="4" rx="1.5" fill="#252930" stroke="currentColor" strokeWidth="0.8" />
      <circle cx="51" cy="31" r="1.85" fill="#323840" stroke="currentColor" strokeWidth="0.75" />
      <rect x="40.5" y="29.2" width="10" height="3.6" rx="1.3" fill="#2a2e34" stroke="currentColor" strokeWidth="0.75" />
      <rect x="35.5" y="28.8" width="5" height="4.4" rx="1.1" fill="#3a4048" stroke="currentColor" strokeWidth="0.7" />

      {/* —— NECK —— */}
      <rect x="65.5" y="13" width="5" height="9" rx="1.4" fill="#3a4048" stroke="currentColor" strokeWidth="0.85" />

      {/* —— HEAD (facing viewer) —— */}
      <rect x="70" y="8.5" width="17" height="18" rx="4.5" fill="#3a4048" stroke="currentColor" strokeWidth="1.15" />
      <path
        d="M73 23h11.5c0.7 0 1.3 0.9 1.3 1.8H71.7c0-0.9 0.6-1.8 1.3-1.8z"
        fill="#2a2e34"
        stroke="currentColor"
        strokeWidth="0.7"
      />
      <rect x="73.2" y="12.2" width="11" height="5.6" rx="1.6" fill="#1a1208" stroke="currentColor" strokeWidth="0.75" />
      <circle cx="76.4" cy="15" r="1.65" fill="currentColor" />
      <circle cx="81.2" cy="15" r="1.65" fill="currentColor" />
      <path d="M75.5 21h8" stroke="#cfc5b0" strokeWidth="1" opacity="0.5" />
      <path d="M78.5 8.5V3.8" stroke="currentColor" strokeWidth="1.15" fill="none" />
      <circle cx="78.5" cy="2.8" r="1.55" fill="currentColor" />

      <circle cx="37.5" cy="10.2" r="1.2" fill="#1a1e24" stroke="currentColor" strokeWidth="0.5" />
      <circle cx="37.5" cy="24.8" r="1.2" fill="#1a1e24" stroke="currentColor" strokeWidth="0.5" />
    </svg>
  );
}

function Pallet() {
  return (
    <svg width="48" height="22" viewBox="0 0 48 22" aria-hidden>
      <rect x="1" y="12" width="46" height="8" rx="1" fill="#2e261c" stroke="currentColor" strokeWidth="1" />
      <rect x="4" y="4" width="12" height="10" fill="#4a4034" stroke="#cfc5b0" strokeWidth="0.7" opacity="0.85" />
      <rect x="18" y="2" width="12" height="12" fill="#3a3228" stroke="currentColor" strokeWidth="0.8" />
      <rect x="32" y="5" width="12" height="9" fill="#4a4034" stroke="#cfc5b0" strokeWidth="0.7" opacity="0.85" />
      <path d="M1 16h46M12 12v8M24 12v8M36 12v8" stroke="currentColor" strokeWidth="0.8" opacity="0.65" />
    </svg>
  );
}

function Canister() {
  return (
    <svg width="24" height="34" viewBox="0 0 24 34" aria-hidden>
      <rect x="5" y="6" width="14" height="24" rx="2" fill="#243038" stroke="currentColor" strokeWidth="1.1" />
      <rect x="7" y="2" width="10" height="5" rx="1" fill="#3a4850" stroke="currentColor" strokeWidth="0.9" />
      <rect x="8" y="12" width="8" height="10" rx="1" fill="none" stroke="#cfc5b0" strokeWidth="0.8" opacity="0.45" />
      <circle cx="12" cy="17" r="2" fill="currentColor" opacity="0.9" />
      <path d="M5 26h14" stroke="currentColor" strokeWidth="1" opacity="0.7" />
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
  const pathname = usePathname();
  const accent = pathname.startsWith("/marrowlink")
    ? "ml"
    : pathname.startsWith("/hub")
      ? "hub"
      : pathname.startsWith("/studio")
        ? "studio"
        : "hazard";

  return (
    <div
      className={cn("fcb-root", className)}
      data-accent={accent}
      aria-hidden
    >
      {BELTS.map((belt) => (
        <Belt key={belt.id} config={belt} />
      ))}
      <div className="fcb-veil" />
    </div>
  );
}
