import { TEAM } from "@/lib/team";
import RevealOnScroll from "@/components/ui/RevealOnScroll";

export default function Team() {
  return (
    <section className="mx-auto max-w-4xl px-4 py-24 text-center">
      <h2 className="font-display text-4xl text-terracotta">Meet the Team</h2>
      <div className="mt-12 grid gap-8 md:grid-cols-3">
        {TEAM.map((member) => (
          <RevealOnScroll key={member.id}>
            <h3 className="font-display text-2xl">{member.name}</h3>
            <p className="text-text/70">{member.role}</p>
            <p className="mt-1 text-gold">{member.rating} / 5</p>
          </RevealOnScroll>
        ))}
      </div>
    </section>
  );
}
