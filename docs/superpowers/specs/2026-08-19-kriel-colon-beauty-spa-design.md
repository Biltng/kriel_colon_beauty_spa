# Kriel Colon & Beauty Spa — Website Design Spec

**Date:** 2026-08-19
**Client:** Kriel Colon & Beauty Spa (Instagram: `kriel_colon_beauty_spa`)
**Status:** Approved for implementation planning

## Background

Kriel Colon & Beauty Spa is a wellness/beauty spa in Ga-Nala, Kriel, Mpumalanga (South Africa). They currently have **no website** — their only online presence is Instagram (181 followers) and a Fresha booking page. This is a from-scratch build, not a redesign.

Source data pulled from their public Instagram and Fresha listing (2026-08-19):

- **Tagline (IG bio):** "Our primary focus is your well-being."
- **About copy (Fresha):** "Our primary focus is your well-being, and client satisfaction is our top priority. We are committed to meeting your needs and ensuring you leave feeling completely satisfied. Kriel Colon Hydrotherapy offers the best services in town, dedicated to providing the highest level of care and comfort for our clients."
- **Rating:** 4.9 / 5 from 100 reviews on Fresha
- **Location:** Kraanvoel Avenue, Ga-Nala, Mpumalanga
- **Hours:** Mon–Sat 8:00 AM–5:00 PM, closed Sunday
- **Team:** Nelly (Therapist, 5.0), Welile (CEO, 5.0), Phetheni (Therapist, 4.8)
- **Service categories (Fresha featured menu):** Body Massages, Pool Menu, Co2 Laser Vaginal Rejuvenation, Vacuum Therapy, Stretch Mark Removal, Permanent Hair Removal, Scars Removal, Tattoo Removal, Complimentary Snack, Laser Hair Removal, Body Waxing, Bio-med Facial, Facial Services, Body Treatments
- **Sample pricing:** LED-Light 1hr ZAR 350 · Colon Cleansing 1hr ZAR 550 · Dermaplaning 1hr ZAR 400 · Combo (Colon Cleansing + Foot Detox) ZAR 900 (10% off)
- Full price list is longer than what's visible without logging into Fresha — final copy pass should pull the complete menu via the client or a Fresha export before launch.

## Goals

1. **Bookings** — every screen should make it effortless to get to "Book Now."
2. **Credibility/brand** — the site itself has to look like a premium destination spa, not a template, to justify positioning against local competitors (most of whom have Instagram-only presence too).
3. **Differentiation** — the client explicitly wants the UI/UX to be **creative and over-the-top**, not a standard business template. This is a chance to visually stand out in a market where competitors have minimal or no web presence.

## Non-goals (this phase)

- No custom booking engine — Fresha stays the booking backend for now (see Booking Integration below).
- No CMS/admin panel — content is hand-coded initially; a CMS can be a future phase if the client wants to self-edit content.
- No e-commerce (product sales, gift cards) — out of scope unless raised later.
- No multi-language support — English only for now.

## Design Direction: "Over-the-Top" Creative UI/UX

Interpreting "over-the-top" as **cinematic, scroll-driven, immersive** rather than gimmicky — the spa's actual selling point is a calming, premium experience, so the drama should come from motion, depth, and pacing, not clutter or noise. Concretely:

- Full-bleed cinematic hero with layered parallax (treatment imagery, soft particle/steam motion, bold serif/display typography that reveals on load).
- Scroll-driven storytelling: sections reveal with staggered text animation, image reveals via clip-path, and depth-of-field parallax as the user scrolls through the service journey (colon hydrotherapy → body treatments → facials → results).
- Sticky/floating "Book Now" element that stays present without breaking immersion (e.g., a minimal pill button, not a static header).
- Section transitions treated as scene changes — curtain reveals, color-field transitions between service categories — rather than flat stacked cards.
- Micro-interactions on service cards, pricing, and team bios (hover depth, magnetic buttons, subtle spring physics) to keep the "premium" feeling consistent at small scale, not just in the hero.
- Palette: warm, earthy, spa-appropriate (not clinical white) — think warm neutrals, deep greens/terracotta accents, soft gold — reserving bold contrast for the cinematic hero moments.
- This directly matches the `epic-design` skill's cinematic 2.5D scroll-storytelling approach and `taste`/`impeccable` anti-slop craft bar — both should be invoked during implementation, not just referenced here.

Accessibility note: motion-heavy design must respect `prefers-reduced-motion` and keep text legible/contrast-compliant even during animated states — this is a requirement, not a nice-to-have, given the older/general-audience clientele a spa attracts.

## Site Structure

Single scrolling page (primary), built so sections could later be split into routes if the site grows (e.g., a dedicated `/services` page):

1. **Hero** — full-bleed cinematic intro, tagline, primary "Book Now" CTA
2. **About** — refined version of their existing "well-being" copy, spa story/philosophy
3. **Services & Pricing** — grouped by category (Colon Hydrotherapy, Body Treatments, Facials, Laser & Vacuum Therapy, Waxing/Hair Removal), each with a "Book Now" link to the matching Fresha service
4. **The Experience** — visual/scroll-driven section walking through what a visit feels like (this is where the "over-the-top" motion work concentrates)
5. **Reviews** — pull several real 5-star quotes from Fresha (100 reviews, 4.9 avg) as social proof
6. **Team** — Nelly, Welile, Phetheni with roles and ratings
7. **Location & Hours** — address, map embed, hours table
8. **Footer** — contact info, Instagram link, hours, final CTA

A floating/sticky "Book Now" affordance persists across all sections.

## Booking Integration

- Every "Book Now" CTA links out to the client's existing Fresha booking page (`fresha.com/book-now/kriel-health-beauty-spa-fw9fio9v/...`), opened in a new tab, ideally deep-linked to the specific service where Fresha's URL structure supports it.
- Architecture should keep booking links centralized (e.g., a single config/data file mapping service → Fresha URL) so swapping to a custom booking system later is a data change, not a structural rewrite.

## Content & Photo Assets

- Initial build uses photos/content pulled from Instagram and Fresha (already public). No client photo shoot is available yet.
- Image components should be built to make future asset swaps trivial (named, structured image slots per section) rather than hardcoded inline.
- Full service list and pricing should be verified/completed with the client before launch — what's captured here is a representative sample, not the full menu.

## Testing / Verification

- Visual verification in-browser at mobile, tablet, and desktop widths (most traffic will come from Instagram → mobile).
- `prefers-reduced-motion` verified to disable/simplify scroll animations.
- Lighthouse/performance check — heavy scroll-motion sites are easy to make janky; animations must stay performant on mid-range mobile devices given the local audience.
- All "Book Now" links verified to resolve to the correct live Fresha page.

## Open Questions for Client (before/at launch)

- Complete service list + pricing (Fresha menu appears to have more services than what's visible without login).
- Any brand colors/logo already in use, or is the visual identity fully open?
- Real photography timeline — when can the client supply their own photos to replace IG/Fresha sourced ones?
