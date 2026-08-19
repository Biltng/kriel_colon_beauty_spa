import { SERVICES, SERVICE_CATEGORIES } from "@/lib/services";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import BookNowButton from "@/components/ui/BookNowButton";

export default function Services() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-24">
      <h2 className="text-center font-display text-4xl text-terracotta">Services & Pricing</h2>
      {SERVICE_CATEGORIES.map((category) => {
        const items = SERVICES.filter((s) => s.category === category);
        if (items.length === 0) return null;
        return (
          <div key={category} className="mt-16">
            <h3 className="font-display text-2xl">{category}</h3>
            <div className="mt-6 grid gap-6 md:grid-cols-2">
              {items.map((service) => (
                <RevealOnScroll key={service.id} className="rounded-xl border border-terracotta/20 p-6">
                  <div className="flex items-center justify-between">
                    <span className="font-body text-lg">{service.name}</span>
                    <span className="font-display text-terracotta">ZAR {service.priceZAR}</span>
                  </div>
                  <p className="mt-1 text-sm text-text/60">{service.durationMinutes} min</p>
                  <div className="mt-4">
                    <BookNowButton href={service.freshaUrl} />
                  </div>
                </RevealOnScroll>
              ))}
            </div>
          </div>
        );
      })}
    </section>
  );
}
