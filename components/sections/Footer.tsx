import { SITE } from "@/lib/site";
import BookNowButton from "@/components/ui/BookNowButton";

export default function Footer() {
  return (
    <footer className="bg-bgDeep px-4 py-16 text-center text-bg">
      <p className="font-display text-2xl">{SITE.name}</p>
      <p className="mt-2 font-body">{SITE.address}</p>
      <a
        href={`https://instagram.com/${SITE.igHandle}`}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-2 inline-block font-body text-gold"
      >
        @{SITE.igHandle}
      </a>
      <div className="mt-6">
        <BookNowButton href={SITE.freshaBaseUrl} />
      </div>
    </footer>
  );
}
