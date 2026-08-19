"use client";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type Props = { href: string; label?: string; ariaLabel?: string; className?: string };

export default function BookNowButton({ href, label = "Book Now", ariaLabel, className }: Props) {
  const reduced = useReducedMotion();

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel}
      whileHover={reduced ? undefined : { scale: 1.05 }}
      whileTap={reduced ? undefined : { scale: 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      className={
        className ??
        "inline-block rounded-full bg-terracotta px-6 py-3 font-display text-bg shadow-lg shadow-terracotta/20 transition-colors hover:bg-gold"
      }
    >
      {label}
    </motion.a>
  );
}
