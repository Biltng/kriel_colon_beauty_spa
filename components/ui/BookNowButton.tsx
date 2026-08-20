"use client";
import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type Props = {
  href: string;
  label?: string;
  ariaLabel?: string;
  className?: string;
  /** Cursor-pull effect for the site's primary CTA only. */
  magnetic?: boolean;
};

const MAGNET_RADIUS = 80;
const MAGNET_STRENGTH = 0.25;

export default function BookNowButton({ href, label = "Book Now", ariaLabel, className, magnetic }: Props) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLAnchorElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const springX = useSpring(mx, { stiffness: 150, damping: 15 });
  const springY = useSpring(my, { stiffness: 150, damping: 15 });

  const handlePointerMove = (e: React.PointerEvent<HTMLAnchorElement>) => {
    if (reduced || !magnetic || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const dist = Math.hypot(dx, dy);
    if (dist < MAGNET_RADIUS) {
      mx.set(dx * MAGNET_STRENGTH);
      my.set(dy * MAGNET_STRENGTH);
    } else {
      mx.set(0);
      my.set(0);
    }
  };

  const handlePointerLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={magnetic && !reduced ? { x: springX, y: springY } : undefined}
      whileHover={reduced ? undefined : { scale: 1.03, y: -2, boxShadow: "0 12px 32px -4px rgba(193,101,59,0.45)" }}
      whileTap={reduced ? undefined : { scale: 0.96, y: 0 }}
      transition={{ type: "spring", stiffness: 260, damping: 18, mass: 0.6 }}
      className={
        className ??
        "group relative inline-block overflow-hidden rounded-full bg-terracotta px-6 py-3 font-display text-bg shadow-lg shadow-terracotta/20 transition-colors hover:bg-gold"
      }
    >
      <span className="relative z-10">{label}</span>
      {!reduced && (
        <span
          aria-hidden
          className="absolute inset-0 -z-0 hidden bg-gradient-to-r from-transparent via-bg/40 to-transparent motion-safe:group-hover:block motion-safe:group-hover:animate-[sheen_0.9s_ease-out]"
        />
      )}
    </motion.a>
  );
}
