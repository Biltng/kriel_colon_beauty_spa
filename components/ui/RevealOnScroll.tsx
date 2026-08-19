"use client";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type Props = { children: React.ReactNode; className?: string };

export default function RevealOnScroll({ children, className }: Props) {
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
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
