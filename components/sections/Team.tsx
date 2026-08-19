import Image from "next/image";
import { TEAM } from "@/lib/team";
import RevealOnScroll from "@/components/ui/RevealOnScroll";

export default function Team() {
  return (
    <section className="mx-auto max-w-4xl px-4 py-24 text-center">
      <h2 className="font-display text-4xl text-terracotta">Meet the Team</h2>
      <div className="mt-12 grid gap-8 md:grid-cols-3">
        {TEAM.map((member) => (
          <RevealOnScroll key={member.id}>
            <div className="mx-auto h-32 w-32 overflow-hidden rounded-full border-2 border-gold">
              <Image
                src={member.photo}
                alt={`${member.name}, ${member.role} at Kriel Colon & Beauty Spa`}
                width={128}
                height={128}
                className="h-full w-full object-cover"
              />
            </div>
            <h3 className="mt-4 font-display text-2xl">{member.name}</h3>
            <p className="text-text/70">{member.role}</p>
            <p className="mt-1 text-gold">{member.rating} / 5</p>
          </RevealOnScroll>
        ))}
      </div>
    </section>
  );
}
