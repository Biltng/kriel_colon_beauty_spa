"use client";
import { motion, type TargetAndTransition, type Variants } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type Variant = "fade" | "clip" | "slide-left" | "slide-right" | "scale";
type Role = "default" | "headline" | "media";

type Props = {
  children: React.ReactNode;
  className?: string;
  variant?: Variant;
  delay?: number;
  role?: Role;
};

const VARIANTS: Record<Variant, { initial: TargetAndTransition; animate: TargetAndTransition }> = {
  fade: {
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0 },
  },
  clip: {
    initial: { clipPath: "inset(0 0 100% 0)", opacity: 0.4 },
    animate: { clipPath: "inset(0 0 0% 0)", opacity: 1 },
  },
  "slide-left": {
    initial: { opacity: 0, x: -60 },
    animate: { opacity: 1, x: 0 },
  },
  "slide-right": {
    initial: { opacity: 0, x: 60 },
    animate: { opacity: 1, x: 0 },
  },
  scale: {
    initial: { opacity: 0, scale: 0.85 },
    animate: { opacity: 1, scale: 1 },
  },
};

const ROLE_DURATION: Record<Role, number> = {
  default: 0.8,
  headline: 0.6,
  media: 1.1,
};

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function RevealOnScroll({
  children,
  className,
  variant = "fade",
  delay = 0,
  role = "default",
}: Props) {
  const reduced = useReducedMotion();
  const { initial, animate } = VARIANTS[variant];

  if (reduced) {
    return (
      <div data-motion="reduced" className={className}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      data-motion="full"
      className={className}
      initial={initial}
      whileInView={animate}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: ROLE_DURATION[role], ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

const STAGGER_CONTAINER: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

const STAGGER_ITEM: Variants = {
  hidden: { opacity: 0, y: 32, scale: 0.94, rotate: -1.5 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    rotate: 0,
    transition: { duration: 0.7, ease: EASE },
  },
};

/** Wraps a grid of `StaggerItem`s and staggers their entrance as a group scrolls into view. */
export function StaggerReveal({ children, className }: { children: React.ReactNode; className?: string }) {
  const reduced = useReducedMotion();

  if (reduced) {
    return (
      <div data-motion="reduced" className={className}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      data-motion="full"
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      variants={STAGGER_CONTAINER}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className }: { children: React.ReactNode; className?: string }) {
  const reduced = useReducedMotion();

  if (reduced) {
    return (
      <div data-motion="reduced" className={className}>
        {children}
      </div>
    );
  }

  return (
    <motion.div data-motion="full" className={className} variants={STAGGER_ITEM}>
      {children}
    </motion.div>
  );
}
