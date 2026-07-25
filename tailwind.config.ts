import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "rgb(var(--background) / <alpha-value>)",
        foreground: "rgb(var(--foreground) / <alpha-value>)",
        surface: "rgb(var(--surface) / <alpha-value>)",
        "surface-raised": "rgb(var(--surface-raised) / <alpha-value>)",
        border: "rgb(var(--border) / <alpha-value>)",
        muted: "rgb(var(--muted) / <alpha-value>)",
        "muted-foreground": "rgb(var(--muted-foreground) / <alpha-value>)",
        ml: {
          DEFAULT: "rgb(var(--ml-primary) / <alpha-value>)",
          glow: "rgb(var(--ml-glow) / <alpha-value>)",
        },
        hub: {
          DEFAULT: "rgb(var(--hub-primary) / <alpha-value>)",
          glow: "rgb(var(--hub-glow) / <alpha-value>)",
        },
        studio: {
          DEFAULT: "rgb(var(--studio-primary) / <alpha-value>)",
          glow: "rgb(var(--studio-glow) / <alpha-value>)",
        },
        hazard: {
          DEFAULT: "rgb(var(--hazard) / <alpha-value>)",
          glow: "rgb(var(--hazard-glow) / <alpha-value>)",
        },
        bone: "rgb(var(--bone) / <alpha-value>)",
      },
      fontFamily: {
        sans: ["var(--font-geist)", "system-ui", "sans-serif"],
        display: ["var(--font-space-grotesk)", "system-ui", "sans-serif"],
      },
      keyframes: {
        "glow-pulse": {
          "0%, 100%": { opacity: "0.6" },
          "50%": { opacity: "1" },
        },
        "fade-up": {
          from: { opacity: "0", transform: "translateY(24px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "glow-pulse": "glow-pulse 3s ease-in-out infinite",
        "fade-up": "fade-up 0.6s ease-out forwards",
      },
    },
  },
  plugins: [],
};

export default config;
