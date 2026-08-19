type Props = { href: string; label?: string; ariaLabel?: string; className?: string };

export default function BookNowButton({ href, label = "Book Now", ariaLabel, className }: Props) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel}
      className={
        className ??
        "inline-block rounded-full bg-terracotta px-6 py-3 font-display text-bg transition hover:bg-gold"
      }
    >
      {label}
    </a>
  );
}
