type Props = { href: string; label?: string; className?: string };

export default function BookNowButton({ href, label = "Book Now", className }: Props) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={
        className ??
        "inline-block rounded-full bg-terracotta px-6 py-3 font-display text-bg transition hover:bg-gold"
      }
    >
      {label}
    </a>
  );
}
