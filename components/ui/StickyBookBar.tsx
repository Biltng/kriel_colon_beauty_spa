"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { SITE } from "@/lib/site";
import BookNowButton from "./BookNowButton";
import WhatsAppButton from "./WhatsAppButton";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export default function StickyBookBar() {
  const reduced = useReducedMotion();
  const [hidden, setHidden] = useState(false);

  // Hide the floating bar once the footer (which has its own Book Now CTA)
  // is on screen, so it doesn't permanently sit on top of the footer.
  useEffect(() => {
    const footer = document.getElementById("site-footer");
    if (!footer) return;

    const checkFooterVisible = () => {
      const rect = footer.getBoundingClientRect();
      setHidden(rect.top < window.innerHeight);
    };

    checkFooterVisible();
    window.addEventListener("scroll", checkFooterVisible, { passive: true });
    window.addEventListener("resize", checkFooterVisible);
    return () => {
      window.removeEventListener("scroll", checkFooterVisible);
      window.removeEventListener("resize", checkFooterVisible);
    };
  }, []);

  return (
    <div
      className={`fixed bottom-4 left-1/2 z-50 flex -translate-x-1/2 gap-3 transition-opacity duration-300 ${
        hidden ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
    >
      <motion.div
        initial={reduced ? false : { y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 24 }}
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
