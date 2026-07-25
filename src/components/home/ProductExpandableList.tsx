"use client";

import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useOutsideClick } from "@/hooks/use-outside-click";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { GradientText } from "@/components/ui/GradientText";
import { PRODUCTS } from "@/lib/constants";

type ProductCard = {
  id: string;
  title: string;
  description: string;
  accent: "ml" | "hub" | "studio";
  accentRgb: string;
  logoSrc: string;
  ctaText: string;
  ctaLink: string;
  content: () => React.ReactNode;
};

const cards: ProductCard[] = [
  {
    id: PRODUCTS.marrowlink.id,
    title: PRODUCTS.marrowlink.name,
    description: PRODUCTS.marrowlink.tagline,
    accent: "ml",
    accentRgb: "139, 92, 246",
    logoSrc: "/logo-marrowlink.svg",
    ctaText: "Learn more",
    ctaLink: PRODUCTS.marrowlink.href,
    content: () => (
      <div className="space-y-4">
        <p>{PRODUCTS.marrowlink.description}</p>
        <ul className="space-y-3">
          {PRODUCTS.marrowlink.features.map((feature) => (
            <li key={feature.title}>
              <p className="font-semibold text-foreground">{feature.title}</p>
              <p className="mt-1 text-muted-foreground">{feature.body}</p>
            </li>
          ))}
        </ul>
      </div>
    ),
  },
  {
    id: PRODUCTS.hub.id,
    title: PRODUCTS.hub.name,
    description: PRODUCTS.hub.tagline,
    accent: "hub",
    accentRgb: "34, 211, 238",
    logoSrc: "/logo-hub.svg",
    ctaText: "Learn more",
    ctaLink: PRODUCTS.hub.href,
    content: () => (
      <div className="space-y-4">
        <p>{PRODUCTS.hub.description}</p>
        <ul className="space-y-3">
          {PRODUCTS.hub.features.map((feature) => (
            <li key={feature.title}>
              <p className="font-semibold text-foreground">{feature.title}</p>
              <p className="mt-1 text-muted-foreground">{feature.body}</p>
            </li>
          ))}
        </ul>
      </div>
    ),
  },
  {
    id: PRODUCTS.studio.id,
    title: PRODUCTS.studio.name,
    description: PRODUCTS.studio.tagline,
    accent: "studio",
    accentRgb: "251, 191, 36",
    logoSrc: "/logo-studio.svg",
    ctaText: "Learn more",
    ctaLink: PRODUCTS.studio.href,
    content: () => (
      <div className="space-y-4">
        <p>{PRODUCTS.studio.description}</p>
        <ul className="space-y-3">
          {PRODUCTS.studio.features.map((feature) => (
            <li key={feature.title}>
              <p className="font-semibold text-foreground">{feature.title}</p>
              <p className="mt-1 text-muted-foreground">{feature.body}</p>
            </li>
          ))}
        </ul>
      </div>
    ),
  },
];

function ProductVisual({
  card,
  className,
}: {
  card: ProductCard;
  className?: string;
}) {
  return (
    <div
      className={className}
      style={{
        background: `radial-gradient(circle at 30% 20%, rgba(${card.accentRgb}, 0.35), transparent 55%), linear-gradient(145deg, rgb(18 18 24), rgb(9 9 11))`,
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={card.logoSrc}
        alt=""
        className="h-1/2 w-1/2 object-contain opacity-90"
      />
    </div>
  );
}

export function ProductExpandableList() {
  const [active, setActive] = useState<ProductCard | boolean | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const id = useId();

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActive(false);
      }
    }

    if (active && typeof active === "object") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  useOutsideClick(ref, () => setActive(null));

  return (
    <section className="mx-auto max-w-7xl px-6 py-32">
      <div className="mb-16 text-center">
        <SectionLabel className="mb-4">The Ecosystem</SectionLabel>
        <h2 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">
          Three tools.{" "}
          <GradientText variant="white">One pipeline.</GradientText>
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
          MarrowLabs products are designed to work together — Studio authors
          packages, Hub distributes them, and the mod runs them live. Expand a
          product to learn more.
        </p>
      </div>

      <AnimatePresence>
        {active && typeof active === "object" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 h-full w-full bg-black/70 backdrop-blur-sm"
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {active && typeof active === "object" ? (
          <div className="fixed inset-0 z-[100] grid place-items-center px-4">
            <motion.button
              key={`button-${active.title}-${id}`}
              type="button"
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{
                opacity: 0,
                transition: { duration: 0.05 },
              }}
              className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full bg-surface border border-border text-foreground lg:hidden"
              onClick={() => setActive(null)}
              aria-label="Close"
            >
              <CloseIcon />
            </motion.button>
            <motion.div
              layoutId={`card-${active.title}-${id}`}
              ref={ref}
              className="flex h-full w-full max-w-[520px] flex-col overflow-hidden border border-border bg-surface sm:rounded-3xl md:h-fit md:max-h-[90%]"
            >
              <motion.div layoutId={`image-${active.title}-${id}`}>
                <ProductVisual
                  card={active}
                  className="flex h-56 w-full items-center justify-center sm:rounded-t-3xl lg:h-72"
                />
              </motion.div>

              <div>
                <div className="flex items-start justify-between gap-4 p-4">
                  <div>
                    <motion.h3
                      layoutId={`title-${active.title}-${id}`}
                      className="font-display text-lg font-bold text-foreground"
                    >
                      {active.title}
                    </motion.h3>
                    <motion.p
                      layoutId={`description-${active.description}-${id}`}
                      className="mt-1 text-sm text-muted-foreground italic"
                    >
                      {active.description}
                    </motion.p>
                  </div>

                  <motion.a
                    layoutId={`button-${active.title}-${id}`}
                    href={active.ctaLink}
                    className="shrink-0 rounded-full px-4 py-2.5 text-sm font-bold text-primary-foreground"
                    style={{ backgroundColor: `rgb(${active.accentRgb})` }}
                  >
                    {active.ctaText}
                  </motion.a>
                </div>
                <div className="relative px-4 pt-2">
                  <motion.div
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex h-48 flex-col items-start gap-4 overflow-auto pb-10 text-sm text-muted-foreground md:h-fit [scrollbar-width:none] [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch] [mask:linear-gradient(to_bottom,white,white,transparent)]"
                  >
                    {active.content()}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>

      <ul className="mx-auto flex w-full max-w-2xl flex-col gap-3">
        {cards.map((card) => (
          <motion.li
            layoutId={`card-${card.title}-${id}`}
            key={`card-${card.title}-${id}`}
            onClick={() => setActive(card)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setActive(card);
              }
            }}
            role="button"
            tabIndex={0}
            className="flex cursor-pointer flex-col items-center justify-between rounded-xl border border-border bg-surface/60 p-4 transition-colors hover:border-border hover:bg-surface md:flex-row"
          >
            <div className="flex flex-col items-center gap-4 md:flex-row">
              <motion.div layoutId={`image-${card.title}-${id}`}>
                <ProductVisual
                  card={card}
                  className="flex h-40 w-40 items-center justify-center rounded-lg md:h-14 md:w-14"
                />
              </motion.div>
              <div>
                <motion.h3
                  layoutId={`title-${card.title}-${id}`}
                  className="text-center font-display text-base font-semibold text-foreground md:text-left"
                >
                  {card.title}
                </motion.h3>
                <motion.p
                  layoutId={`description-${card.description}-${id}`}
                  className="mt-1 text-center text-sm text-muted-foreground md:text-left"
                >
                  {card.description}
                </motion.p>
              </div>
            </div>
            <motion.button
              type="button"
              layoutId={`button-${card.title}-${id}`}
              className="mt-4 rounded-full border border-border bg-background px-4 py-2 text-sm font-bold text-foreground transition-colors hover:text-primary-foreground md:mt-0"
              style={
                {
                  ["--hover-accent" as string]: `rgb(${card.accentRgb})`,
                } as React.CSSProperties
              }
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = `rgb(${card.accentRgb})`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "";
              }}
            >
              {card.ctaText}
            </motion.button>
          </motion.li>
        ))}
      </ul>
    </section>
  );
}

function CloseIcon() {
  return (
    <motion.svg
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{
        opacity: 0,
        transition: { duration: 0.05 },
      }}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M18 6l-12 12" />
      <path d="M6 6l12 12" />
    </motion.svg>
  );
}
