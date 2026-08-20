"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { TEAM } from "@/lib/team";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import { useReducedMotion } from "@/hooks/useReducedMotion";

// Small per-index vertical offsets break the row off a single aligned baseline.
const BASELINE_OFFSETS = ["md:translate-y-0", "md:translate-y-6", "md:-translate-y-4"];

export default function Team() {
  const reduced = useReducedMotion();

  return (
    <section className="mx-auto max-w-4xl px-4 py-24 text-center">
      <h2 className="font-display text-4xl text-terracotta">Meet the Team</h2>
      <div className="mt-12 grid gap-8 md:grid-cols-3">
        {TEAM.map((member, i) => (
          <RevealOnScroll
            key={member.id}
            delay={i * 0.15}
            className={BASELINE_OFFSETS[i % BASELINE_OFFSETS.length]}
          >
            <motion.div
              initial={reduced ? false : { clipPath: "circle(0% at 50% 50%)" }}
              whileInView={{ clipPath: "circle(75% at 50% 50%)" }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.9, delay: reduced ? 0 : i * 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="group mx-auto h-32 w-32 overflow-hidden rounded-full border-2 border-gold"
            >
              <Image
                src={member.photo}
                alt={`${member.name}, ${member.role} at Kriel Colon & Beauty Spa`}
                width={128}
                height={128}
                className="h-full w-full object-cover transition-transform duration-300 motion-safe:group-hover:scale-105"
              />
            </motion.div>
            <h3 className="mt-4 font-display text-2xl">{member.name}</h3>
            <p className="text-text/70">{member.role}</p>
            <p className="mt-1 text-goldDark">{member.rating} / 5</p>
          </RevealOnScroll>
        ))}
      </div>
    </section>
  );
}
