"use client";
/**
 * Aceternity Floating Dock — top-bar adapted.
 * Uses scale transforms (not width/height) for smooth, non-pixelated hover.
 **/

import { cn } from "@/lib/utils";
import { IconLayoutNavbarCollapse } from "@tabler/icons-react";
import {
  AnimatePresence,
  MotionValue,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";
import { useRef, useState } from "react";

const SPRING = {
  mass: 0.35,
  stiffness: 260,
  damping: 28,
  restDelta: 0.001,
} as const;

export const FloatingDock = ({
  items,
  desktopClassName,
  mobileClassName,
}: {
  items: { title: string; icon: React.ReactNode; href: string }[];
  desktopClassName?: string;
  mobileClassName?: string;
}) => {
  return (
    <>
      <FloatingDockDesktop items={items} className={desktopClassName} />
      <FloatingDockMobile items={items} className={mobileClassName} />
    </>
  );
};

const FloatingDockMobile = ({
  items,
  className,
}: {
  items: { title: string; icon: React.ReactNode; href: string }[];
  className?: string;
}) => {
  const [open, setOpen] = useState(false);
  return (
    <div className={cn("relative block md:hidden", className)}>
      <AnimatePresence>
        {open && (
          <motion.div
            layoutId="nav"
            className="absolute inset-x-0 top-full mt-2 flex flex-col gap-2"
          >
            {items.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{
                  opacity: 0,
                  y: -8,
                  transition: { delay: idx * 0.04 },
                }}
                transition={{
                  delay: (items.length - 1 - idx) * 0.04,
                  duration: 0.22,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <a
                  href={item.href}
                  aria-label={item.title}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-900 border border-border"
                >
                  <div className="h-4 w-4">{item.icon}</div>
                </a>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-label="Open product menu"
        aria-expanded={open}
        className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-900 border border-border"
      >
        <IconLayoutNavbarCollapse className="h-5 w-5 text-muted-foreground" />
      </button>
    </div>
  );
};

const FloatingDockDesktop = ({
  items,
  className,
}: {
  items: { title: string; icon: React.ReactNode; href: string }[];
  className?: string;
}) => {
  const mouseX = useMotionValue(Infinity);

  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.clientX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className={cn(
        "mx-auto hidden h-12 items-center gap-2 overflow-visible rounded-full border border-border bg-neutral-900/95 px-2.5 backdrop-blur-md md:flex",
        className,
      )}
    >
      {items.map((item) => (
        <IconContainer mouseX={mouseX} key={item.title} {...item} />
      ))}
    </motion.div>
  );
};

function IconContainer({
  mouseX,
  title,
  icon,
  href,
}: {
  mouseX: MotionValue<number>;
  title: string;
  icon: React.ReactNode;
  href: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect();
    if (!bounds) return 0;
    return val - bounds.left - bounds.width / 2;
  });

  // Soft scale bump — GPU transform, no layout thrash / pixel stepping
  const scaleTarget = useTransform(distance, [-100, 0, 100], [1, 1.18, 1]);
  const iconScaleTarget = useTransform(distance, [-100, 0, 100], [1, 1.08, 1]);
  const scale = useSpring(scaleTarget, SPRING);
  const iconScale = useSpring(iconScaleTarget, SPRING);

  return (
    <a href={href} aria-label={title} className="relative block">
      <motion.div
        ref={ref}
        style={{ scale, willChange: "transform" }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="relative flex h-9 w-9 origin-center items-center justify-center rounded-full bg-neutral-800"
      >
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, y: -4, x: "-50%" }}
              animate={{ opacity: 1, y: 0, x: "-50%" }}
              exit={{ opacity: 0, y: -2, x: "-50%" }}
              transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
              className="pointer-events-none absolute -bottom-7 left-1/2 z-20 w-fit rounded-md border border-border bg-surface px-2 py-0.5 text-[10px] whitespace-pre text-bone"
            >
              {title}
            </motion.div>
          )}
        </AnimatePresence>
        <motion.div
          style={{ scale: iconScale, willChange: "transform" }}
          className="flex h-[18px] w-[18px] items-center justify-center"
        >
          {icon}
        </motion.div>
      </motion.div>
    </a>
  );
}
