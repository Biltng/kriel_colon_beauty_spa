import { SERVICES, SERVICE_CATEGORIES } from "@/lib/services";
import RevealOnScroll, { StaggerReveal, StaggerItem } from "@/components/ui/RevealOnScroll";
import BookNowButton from "@/components/ui/BookNowButton";

export default function Services() {
  return (
    <section className="relative">
      <div className="mx-auto max-w-5xl px-4 pt-24">
        <RevealOnScroll role="headline">
          <h2 className="text-center font-display text-4xl text-terracotta">Services & Pricing</h2>
        </RevealOnScroll>
      </div>

      {SERVICE_CATEGORIES.map((category, ci) => {
        const items = SERVICES.filter((s) => s.category === category);
        if (items.length === 0) return null;
        const dark = ci % 2 === 1;
        return (
          <div
            key={category}
            className={dark ? "bg-bgDeep py-16 text-bg" : "bg-bg py-16"}
          >
            <div className="mx-auto max-w-5xl px-4">
              <RevealOnScroll role="headline">
                <h3 className={dark ? "font-display text-2xl text-gold" : "font-display text-2xl text-terracotta"}>
                  {category}
                </h3>
              </RevealOnScroll>
              <StaggerReveal className="mt-6 grid gap-6 md:grid-cols-2">
                {items.map((service) => (
                  <StaggerItem
                    key={service.id}
                    className={
                      dark
                        ? "group relative overflow-hidden rounded-xl bg-bg/5 p-6 shadow-lg transition-transform duration-300 motion-safe:hover:-translate-y-1.5 hover:shadow-gold/20 hover:shadow-2xl"
                        : "group relative overflow-hidden rounded-xl bg-bg p-6 shadow-lg shadow-bgDeep/5 transition-transform duration-300 motion-safe:hover:-translate-y-1.5 hover:shadow-gold/30 hover:shadow-2xl"
                    }
                  >
                    <span
                      aria-hidden
                      className={
                        dark
                          ? "absolute right-4 top-4 rounded-full bg-gold px-3 py-1 font-display text-sm text-bgDeep"
                          : "absolute right-4 top-4 rounded-full bg-terracotta px-3 py-1 font-display text-sm text-bg"
                      }
                    >
                      ZAR {service.priceZAR}
                    </span>
                    <span className="block max-w-[calc(100%-6.5rem)] font-body text-lg">{service.name}</span>
                    <p className={dark ? "mt-1 text-sm text-bg/60" : "mt-1 text-sm text-text/70"}>
                      {service.durationMinutes} min
                    </p>
                    <div className="mt-4">
                      <BookNowButton href={service.freshaUrl} ariaLabel={`Book Now – ${service.name}`} />
                    </div>
                  </StaggerItem>
                ))}
              </StaggerReveal>
            </div>
          </div>
        );
      })}
    </section>
  );
}
