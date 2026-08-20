"use client";
import { motion } from "framer-motion";
import { SITE } from "@/lib/site";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export default function WhatsAppButton({ className }: { className?: string }) {
  const reduced = useReducedMotion();
  const href = `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(SITE.whatsappMessage)}`;
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={reduced ? undefined : { scale: 1.03, y: -2, boxShadow: "0 12px 32px -4px rgba(74,93,69,0.45)" }}
      whileTap={reduced ? undefined : { scale: 0.96, y: 0 }}
      transition={{ type: "spring", stiffness: 260, damping: 18, mass: 0.6 }}
      className={
        className ??
        "group relative inline-block overflow-hidden rounded-full border border-green px-6 py-3 font-display text-green transition-colors hover:bg-green hover:text-bg"
      }
    >
      <span className="relative z-10">Chat on WhatsApp</span>
      {!reduced && (
        <span
          aria-hidden
          className="absolute inset-0 -z-0 hidden bg-gradient-to-r from-transparent via-green/20 to-transparent motion-safe:group-hover:block motion-safe:group-hover:animate-[sheen_0.9s_ease-out]"
        />
      )}
    </motion.a>
  );
}
