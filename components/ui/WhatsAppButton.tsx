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
      whileHover={reduced ? undefined : { scale: 1.05 }}
      whileTap={reduced ? undefined : { scale: 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      className={
        className ??
        "inline-block rounded-full border border-green px-6 py-3 font-display text-green transition-colors hover:bg-green hover:text-bg"
      }
    >
      Chat on WhatsApp
    </motion.a>
  );
}
