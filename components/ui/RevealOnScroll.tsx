"use client";
import { motion, type TargetAndTransition } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type Variant = "fade" | "clip" | "slide-left" | "slide-right" | "scale";

type Props = {
  children: React.ReactNode;
  className?: string;
  variant?: Variant;
  delay?: number;
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

export default function RevealOnScroll({ children, className, variant = "fade", delay = 0 }: Props) {
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
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay }}
    >
      {children}
    </motion.div>
  );
}
