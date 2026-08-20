"use client";
import { motion } from "framer-motion";
import { SITE } from "@/lib/site";
import BookNowButton from "./BookNowButton";
import WhatsAppButton from "./WhatsAppButton";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export default function StickyBookBar() {
  const reduced = useReducedMotion();

  return (
    <div className="fixed bottom-4 left-1/2 z-50 flex -translate-x-1/2 gap-3">
      <motion.div
        initial={reduced ? false : { y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 24, delay: reduced ? 0 : 0 }}
      >
        <BookNowButton href={SITE.freshaBaseUrl} />
      </motion.div>
      <motion.div
        initial={reduced ? false : { y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 24, delay: reduced ? 0 : 0.06 }}
      >
        <WhatsAppButton />
      </motion.div>
    </div>
  );
}
