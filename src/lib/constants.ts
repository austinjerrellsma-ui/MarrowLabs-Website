export const NAV_LINKS = [
  { href: "/marrowlink", label: "MarrowLink" },
  { href: "/hub", label: "Hub" },
  { href: "/studio", label: "Marrow Studio" },
  { href: "/about", label: "About" },
] as const;

export const DOWNLOAD_URL =
  "https://github.com/MarrowLabs/MarrowLink-Hub/releases/latest";

export const ABOUT = {
  name: "MarrowLabs",
  mission:
    "MarrowLabs builds open, high-quality BONELAB modding tools.",
  description:
    "We build MarrowLink, the definitive BONELAB power mod, the Hub desktop manager, and Marrow Studio — a node-graph editor for creating your own powers. Our goal is a complete pipeline from authoring to in-headset play.",
} as const;

export const PRODUCTS = {
  marrowlink: {
    id: "marrowlink",
    accentVariant: "ml" as const,
    accentClass: "text-ml",
    accentBg: "bg-ml/10",
    accentBorder: "border-ml/30",
    glowColor: "var(--ml-glow)",
    name: "MarrowLink",
    tagline: "A new era of BONELAB powers.",
    description:
      "MarrowLink is a PCVR mod that loads compiled power packages at runtime. Telekinesis, physics fields, timed abilities — all driven by an open node-graph contract.",
    href: "/marrowlink",
    icon: "Zap",
    features: [
      {
        title: "Node-Graph Runtime",
        body: "Powers are authored as typed node graphs in Marrow Studio and compiled to a validated JSON contract. The mod discovers and executes them live.",
      },
      {
        title: "Release Channels",
        body: "Stable builds for everyone. Beta and Testing channels unlock with Discord roles or Patreon support.",
      },
      {
        title: "MelonLoader Native",
        body: "Runs as a standard MelonLoader mod — no custom injectors, no game file patches. Install BoneLib and you are ready.",
      },
      {
        title: "Per-Power Toggles",
        body: "Enable or disable individual powers from the in-game wrist UI without leaving your headset.",
      },
    ],
    channels: [
      { name: "Stable", access: "Public", color: "text-emerald-400" },
      { name: "Beta", access: "Discord Beta Role / Patreon", color: "text-hub" },
      { name: "Testing", access: "Tester Program", color: "text-ml" },
    ],
  },
  hub: {
    id: "hub",
    accentVariant: "hub" as const,
    accentClass: "text-hub",
    accentBg: "bg-hub/10",
    accentBorder: "border-hub/30",
    glowColor: "var(--hub-glow)",
    name: "MarrowLink Hub",
    tagline: "One app. Every version. Always verified.",
    description:
      "The Hub is the official desktop manager for MarrowLink. Detect your BONELAB install, browse release channels, install with backup protection, manage mods, and link your Discord account — all without touching a file browser.",
    href: "/hub",
    icon: "Monitor",
    features: [
      {
        title: "Auto-Detection",
        body: "The Hub finds your BONELAB installation automatically and validates MelonLoader and BoneLib before attempting any install.",
      },
      {
        title: "Gated Build Channels",
        body: "Browse Stable, Beta, and Testing builds with server-authoritative access — the Hub only shows what your account is allowed to install.",
      },
      {
        title: "Backup & Rollback",
        body: "Every install creates a versioned backup. Roll back to any previous release from the Build Channels page.",
      },
      {
        title: "Mod Manager",
        body: "Manage PCVR SDK pallets, code mods, and local content in one unified library view with PCVR/Quest platform switching.",
      },
      {
        title: "Discord Linking",
        body: "Link your Discord account to unlock access tiers. The Hub syncs your roles server-side — no self-reporting.",
      },
      {
        title: "Community Hub",
        body: "Read announcements, file bug reports, browse configs, and participate in tuning channels from inside the app.",
      },
    ],
    requirements: [
      "Windows 10 or later",
      "BONELAB (Steam / Meta App Lab)",
      "MelonLoader 0.6+",
      "BoneLib (any recent release)",
    ],
  },
  studio: {
    id: "studio",
    accentVariant: "studio" as const,
    accentClass: "text-studio",
    accentBg: "bg-studio/10",
    accentBorder: "border-studio/30",
    glowColor: "var(--studio-glow)",
    name: "Marrow Studio",
    tagline: "Design powers with a node graph. Ship them to BONELAB.",
    description:
      "Marrow Studio is a visual node-graph editor for creating MarrowLink power packages. Wire trigger nodes to compute chains to physics actions. Compile, validate, and ship — no C# required.",
    href: "/studio",
    icon: "Cpu",
    features: [
      {
        title: "7 Universal Port Types",
        body: "Impulse, Boolean, Number, String, Vector3, Object, and Any — a minimal, composable type system where connection rules follow the types, not the nodes.",
      },
      {
        title: "Live Validation",
        body: "The editor validates your graph in real time: type mismatches, disconnected required ports, unsupported node combinations — all caught before compile.",
      },
      {
        title: "Protected Compilation",
        body: "Final builds route through an authenticated server pipeline — signed, encrypted, and watermarked — so your packages cannot be spoofed.",
      },
      {
        title: "Primitive-First Design",
        body: "No mega-nodes. Every complex behavior is assembled from small, composable primitives. If you can describe it, you can build it.",
      },
      {
        title: "Draft Workflow",
        body: "Open drafts, save-as, package-target selection, and folder browsing let you iterate fast without losing work.",
      },
      {
        title: "Direct Runtime Parity",
        body: "What you see in Studio is exactly what runs in BONELAB. The compiled contract maps 1:1 to the PCVR mod's runtime evaluator.",
      },
    ],
  },
} as const;
