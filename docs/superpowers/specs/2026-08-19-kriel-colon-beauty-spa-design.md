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

## Non-goals (Phase 1)

- No custom booking engine — Fresha stays the booking backend for now (see Booking Integration below). A WhatsApp CTA is added in Phase 1 (see Booking Integration) but is a link-out, not a booking flow.
- No CMS/admin panel in Phase 1 — content is hand-coded initially. Agency-side page management arrives in Phase 2 via Mosaic, not a client-facing CMS.
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
- A WhatsApp CTA is added alongside the Fresha "Book Now" buttons: `https://wa.me/<number>?text=<prefilled message>`, opening the visitor's WhatsApp with a pre-filled message to the spa's number. This is a link-out only, no bot/backend, in Phase 1. The number and message template live in `lib/site.ts` alongside the Fresha URL so both CTAs are centralized the same way. **Open question:** we need the spa's actual WhatsApp Business number from the client before this can ship — placeholder until then.

## Phase 2: Command Center / Mosaic Pipeline Integration

Once Phase 1 ships, Kriel Colon & Beauty Spa is onboarded into Mosaic as a client, following the same pattern as other agency clients already managed through the Mosaic client tools (`client_create_tool`, `client_link_account_tool`, etc.). This phase does **not** change the Phase 1 site's public-facing design — it adds agency-side management and deeper WhatsApp integration on top of it.

**Scope:**

1. **Mosaic client onboarding** — Kriel has no prior lead record and no existing website, so onboarding goes through Mosaic Studio's manual "Add Client" path (`POST /api/studio/clients`, `src/components/add-client-modal.tsx`) rather than lead-conversion — this is the entry point built for exactly this case (referral/phone/in-person clients). That call fires `provisionClientPipeline()` (`src/lib/client-provisioning.ts`) automatically, which creates a `projects` row (status `planned`) and the standard 5-step starter task checklist: brief → design sign-off → build → QA → launch. Nothing else needs to be built for pipeline entry — this already exists and should not be duplicated with a one-off path. Link relevant accounts (Instagram, WhatsApp) via `client_link_account_tool`/`client_auto_discover_accounts_tool` once available.
   - **Assets are not pre-seeded.** Per how `provisionClientPipeline()` already works, the Phase 1 site build (this plan) *is* the asset-generation work — screenshots, copy, data files, and design decisions attach to the Mosaic project naturally as work progresses, matching the existing pattern rather than requiring a fixed upfront asset list.
2. **Agency-side page management** — the site's content (services, pricing, team, reviews, hours) currently lives in typed `lib/*.ts` data files (Phase 1). Phase 2 replaces hand-editing those files with an agency-facing content-management surface inside Mosaic's client-content-manager, matching the pattern already built for other Mosaic clients (per prior Mosaic Studio work) — **not** a customer-facing CMS, and **not** a customer login. Same non-goal as Phase 1's "no CMS" for the spa's own customers, now explicitly scoped: management is agency-side, through Mosaic, only.
3. **WhatsApp beyond the link-out CTA** — once the client is live in Mosaic, WhatsApp messages from the site's CTA (and any inbound spa WhatsApp traffic) sync into the Mosaic inbox/pipeline like other client communications, following the same Meta webhook pattern used elsewhere in Mosaic. This phase does not build an automated WhatsApp booking bot — messages route to a human at the spa/agency, they still book through Fresha (or eventually a custom system, unchanged from Phase 1's stated future path).

**Explicit non-goals for Phase 2:**

- No customer-facing login/portal for the spa's own clients (confirmed out of scope — "client portal" in this spec always means agency/Mosaic-side management, not the spa's customers).
- No automated WhatsApp booking bot — WhatsApp remains a messaging channel that routes to a human, not a booking engine, in this phase.
- No change to the Phase 1 site's public structure, design, or booking flow — Phase 2 is purely how the agency manages/operates what Phase 1 built.

**Sequencing:** Phase 2 work starts only after Phase 1 ships and is stable, since it depends on Phase 1's `lib/*.ts` data shapes as the thing being migrated into Mosaic's management surface. A separate implementation plan will be written for Phase 2 once Phase 1 is complete — the data layer built in Phase 1 (Task 2 of the Phase 1 plan) is deliberately structured (typed, centralized, one file per content type) so that migration is straightforward.

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
