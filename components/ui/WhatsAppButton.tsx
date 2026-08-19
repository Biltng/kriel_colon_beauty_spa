import { SITE } from "@/lib/site";

export default function WhatsAppButton({ className }: { className?: string }) {
  const href = `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(SITE.whatsappMessage)}`;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={
        className ??
        "inline-block rounded-full border border-green px-6 py-3 font-display text-green transition hover:bg-green hover:text-bg"
      }
    >
      Chat on WhatsApp
    </a>
  );
}
