import { SITE } from "@/lib/site";
import RevealOnScroll from "@/components/ui/RevealOnScroll";

export default function LocationHours() {
  return (
    <section className="mx-auto max-w-4xl px-4 py-24">
      <RevealOnScroll>
        <h2 className="font-display text-4xl text-terracotta">Visit Us</h2>
        <p className="mt-4 font-body text-lg">{SITE.address}</p>
        <table className="mt-8 w-full max-w-sm text-left font-body">
          <tbody>
            {SITE.hours.map((h) => (
              <tr key={h.day} className="border-b border-terracotta/10">
                <td className="py-2">{h.day}</td>
                <td className="py-2 text-text/70">
                  {h.open && h.close ? `${h.open} - ${h.close}` : "Closed"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </RevealOnScroll>
    </section>
  );
}
