import { SITE } from "@/lib/site";
import BookNowButton from "./BookNowButton";
import WhatsAppButton from "./WhatsAppButton";

export default function StickyBookBar() {
  return (
    <div className="fixed bottom-4 left-1/2 z-50 flex -translate-x-1/2 gap-3">
      <BookNowButton href={SITE.freshaBaseUrl} />
      <WhatsAppButton />
    </div>
  );
}
