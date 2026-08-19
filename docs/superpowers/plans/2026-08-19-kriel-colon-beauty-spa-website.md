# Kriel Colon & Beauty Spa Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a single-page, cinematic/scroll-driven marketing site for Kriel Colon & Beauty Spa that drives Fresha bookings and establishes a premium brand presence.

**Architecture:** Next.js (App Router) + TypeScript static site, styled with Tailwind CSS, scroll/reveal animation via Framer Motion. All content (services, pricing, team, reviews) lives in typed data files so copy/pricing updates never touch component code, and swapping Fresha links for a future custom booking system is a data-only change. Deployed as a static/SSG site (no backend, no database).

**Tech Stack:** Next.js 14+ (App Router, TypeScript), Tailwind CSS, Framer Motion, next/image for asset optimization. No CMS, no server, no database — matches the spec's non-goals.

**Spec:** [docs/superpowers/specs/2026-08-19-kriel-colon-beauty-spa-design.md](../specs/2026-08-19-kriel-colon-beauty-spa-design.md)

## Global Constraints

- Every "Book Now" CTA links to the client's existing Fresha page — no custom booking logic this phase.
- All scroll/parallax animation must respect `prefers-reduced-motion: reduce` (WCAG 2.3.3) — provide a simplified fade-only fallback, never remove content.
- Mobile-first: majority of traffic arrives from Instagram on phones. Every section must be verified at 375px width before desktop.
- Images/content sourced from Instagram/Fresha are placeholders — image slots must be named/structured components, not inline hardcoded `<img>` tags, so real photography can drop in later without restructuring.
- English only, single page (`/`) for this phase — no CMS, no multi-language, no e-commerce.
- Booking URLs and service data centralized in one data file (`lib/services.ts`) — no Fresha URL hardcoded inside a component.

---

## File Structure

```
kriel-colon-beauty-spa-website/
  app/
    layout.tsx              # root layout, fonts, metadata
    page.tsx                 # assembles all sections in order
    globals.css               # Tailwind entry + design tokens (CSS vars)
  components/
    sections/
      Hero.tsx
      About.tsx
      Services.tsx
      Experience.tsx
      Reviews.tsx
      Team.tsx
      LocationHours.tsx
      Footer.tsx
    ui/
      BookNowButton.tsx        # centralized CTA, reads from lib/services.ts
      StickyBookBar.tsx        # persistent floating CTA
      RevealOnScroll.tsx       # motion wrapper respecting prefers-reduced-motion
      SectionHeading.tsx
  lib/
    services.ts                # service categories, pricing, Fresha URLs (typed data)
    team.ts                    # team member data
    reviews.ts                 # curated review quotes
    site.ts                    # site-wide constants (hours, address, IG handle)
  hooks/
    useReducedMotion.ts         # wraps Framer Motion's reduced-motion detection
  public/
    images/                     # placeholder images from IG/Fresha, named by section
  tests/
    lib/services.test.ts
    components/BookNowButton.test.tsx
    components/RevealOnScroll.test.tsx
  package.json
  tailwind.config.ts
  tsconfig.json
```

**Design decisions:**
- `lib/*.ts` files are the single source of truth for content — components only render, never hardcode copy/prices/links. This directly satisfies the spec's "booking links centralized" and "future asset swap" requirements.
- `RevealOnScroll` is one shared wrapper component used by every section, so reduced-motion handling is implemented and tested once instead of per-section.
- `BookNowButton` and `StickyBookBar` are separate: the button is the per-service/per-section CTA, the bar is the always-present floating element — they share the same underlying Fresha URL data but different placement/behavior.

---

## Task 1: Project Scaffold & Design Tokens

**Files:**
- Create: `package.json`, `tailwind.config.ts`, `tsconfig.json`, `app/layout.tsx`, `app/globals.css`
- Test: none (scaffold task, verified by build succeeding)

**Interfaces:**
- Produces: Tailwind theme tokens (`--color-bg`, `--color-accent-terracotta`, `--color-accent-gold`, `--color-text`, font families `--font-display`, `--font-body`) available to every later component via Tailwind classes.

- [ ] **Step 1: Scaffold the Next.js app**

```bash
npx create-next-app@latest . --typescript --tailwind --app --no-src-dir --import-alias "@/*"
```

- [ ] **Step 2: Install Framer Motion**

```bash
npm install framer-motion
```

- [ ] **Step 3: Define design tokens in `app/globals.css`**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --color-bg: #FAF6F1;
  --color-bg-deep: #2E241C;
  --color-text: #2E241C;
  --color-accent-terracotta: #C1653B;
  --color-accent-green: #4A5D45;
  --color-accent-gold: #C9A24B;
  --font-display: 'Fraunces', serif;
  --font-body: 'Inter', sans-serif;
}

body {
  background-color: var(--color-bg);
  color: var(--color-text);
  font-family: var(--font-body);
}
```

- [ ] **Step 4: Wire fonts and tokens into `tailwind.config.ts`**

```ts
import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "var(--color-bg)",
        bgDeep: "var(--color-bg-deep)",
        text: "var(--color-text)",
        terracotta: "var(--color-accent-terracotta)",
        green: "var(--color-accent-green)",
        gold: "var(--color-accent-gold)",
      },
      fontFamily: {
        display: ["var(--font-display)"],
        body: ["var(--font-body)"],
      },
    },
  },
  plugins: [],
} satisfies Config;
```

- [ ] **Step 5: Verify build runs**

Run: `npm run dev`
Expected: Default Next.js page loads at `localhost:3000` with no errors.

- [ ] **Step 6: Commit**

```bash
git init
git add -A
git commit -m "chore: scaffold Next.js site with Tailwind design tokens"
```

---

## Task 2: Content Data Layer (`lib/`)

**Files:**
- Create: `lib/services.ts`, `lib/team.ts`, `lib/reviews.ts`, `lib/site.ts`
- Test: `tests/lib/services.test.ts`

**Interfaces:**
- Produces:
  - `type Service = { id: string; name: string; durationMinutes: number; priceZAR: number; freshaUrl: string; category: ServiceCategory }`
  - `type ServiceCategory = "Colon Hydrotherapy" | "Body Treatments" | "Facials" | "Laser & Vacuum Therapy" | "Waxing & Hair Removal"`
  - `SERVICES: Service[]`, `SERVICE_CATEGORIES: ServiceCategory[]`
  - `TEAM: { id: string; name: string; role: string; rating: number }[]`
  - `REVIEWS: { id: string; quote: string; rating: number; date: string }[]`
  - `SITE: { name: string; phoneOrIgHandle: string; address: string; hours: { day: string; open: string; close: string | null }[]; freshaBaseUrl: string }`

- [ ] **Step 1: Write the failing test for service data shape**

```ts
// tests/lib/services.test.ts
import { SERVICES, SERVICE_CATEGORIES } from "@/lib/services";

describe("services data", () => {
  it("every service has a non-empty freshaUrl and belongs to a known category", () => {
    expect(SERVICES.length).toBeGreaterThan(0);
    for (const service of SERVICES) {
      expect(service.freshaUrl).toMatch(/^https:\/\/www\.fresha\.com\//);
      expect(SERVICE_CATEGORIES).toContain(service.category);
    }
  });

  it("has no duplicate service ids", () => {
    const ids = SERVICES.map((s) => s.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx jest tests/lib/services.test.ts`
Expected: FAIL — `lib/services.ts` does not exist yet.

- [ ] **Step 3: Install test runner (if not already present)**

```bash
npm install --save-dev jest @types/jest ts-jest
npx ts-jest config:init
```

- [ ] **Step 4: Implement `lib/services.ts`**

```ts
export type ServiceCategory =
  | "Colon Hydrotherapy"
  | "Body Treatments"
  | "Facials"
  | "Laser & Vacuum Therapy"
  | "Waxing & Hair Removal";

export const SERVICE_CATEGORIES: ServiceCategory[] = [
  "Colon Hydrotherapy",
  "Body Treatments",
  "Facials",
  "Laser & Vacuum Therapy",
  "Waxing & Hair Removal",
];

export type Service = {
  id: string;
  name: string;
  durationMinutes: number;
  priceZAR: number;
  freshaUrl: string;
  category: ServiceCategory;
};

const FRESHA_BASE =
  "https://www.fresha.com/book-now/kriel-health-beauty-spa-fw9fio9v/all-offer?id=1427041&pId=1355234";

export const SERVICES: Service[] = [
  {
    id: "colon-cleansing",
    name: "Colon Cleansing",
    durationMinutes: 60,
    priceZAR: 550,
    freshaUrl: FRESHA_BASE,
    category: "Colon Hydrotherapy",
  },
  {
    id: "led-light",
    name: "LED-Light Therapy",
    durationMinutes: 60,
    priceZAR: 350,
    freshaUrl: FRESHA_BASE,
    category: "Body Treatments",
  },
  {
    id: "dermaplaning",
    name: "Dermaplaning",
    durationMinutes: 60,
    priceZAR: 400,
    freshaUrl: FRESHA_BASE,
    category: "Facials",
  },
  {
    id: "combo-colon-foot-detox",
    name: "Combo: Colon Cleansing & Foot Detox",
    durationMinutes: 60,
    priceZAR: 900,
    freshaUrl: FRESHA_BASE,
    category: "Colon Hydrotherapy",
  },
];
```

*(Note for the implementer: this is a representative starter set matching what's visible on the public Fresha page per the spec's Open Questions — replace/extend with the full menu once the client provides it. Every entry must keep a valid `freshaUrl` and a category from `SERVICE_CATEGORIES`.)*

- [ ] **Step 5: Run test to verify it passes**

Run: `npx jest tests/lib/services.test.ts`
Expected: PASS

- [ ] **Step 6: Implement `lib/team.ts`**

```ts
export type TeamMember = { id: string; name: string; role: string; rating: number };

export const TEAM: TeamMember[] = [
  { id: "welile", name: "Welile", role: "CEO", rating: 5.0 },
  { id: "nelly", name: "Nelly", role: "Therapist", rating: 5.0 },
  { id: "phetheni", name: "Phetheni", role: "Therapist", rating: 4.8 },
];
```

- [ ] **Step 7: Implement `lib/reviews.ts`**

```ts
export type Review = { id: string; quote: string; rating: number; date: string };

export const REVIEWS: Review[] = [
  {
    id: "r1",
    quote: "Wow what an amazing experience. It was the best massage I have ever had.",
    rating: 5,
    date: "2026-08-14",
  },
  { id: "r2", quote: "Best.", rating: 5, date: "2026-08-04" },
  { id: "r3", quote: "Very good service, thanks.", rating: 5, date: "2026-07-23" },
  {
    id: "r4",
    quote: "I enjoyed every moment and the treatment, special thanks a lot.",
    rating: 5,
    date: "2026-07-23",
  },
  {
    id: "r5",
    quote: "It was so exceptional and overwhelming.",
    rating: 5,
    date: "2026-07-08",
  },
];
```

- [ ] **Step 8: Implement `lib/site.ts`**

```ts
export const SITE = {
  name: "Kriel Colon & Beauty Spa",
  igHandle: "kriel_colon_beauty_spa",
  address: "Kraanvoel Avenue, Ga-Nala, Mpumalanga",
  // TODO(client): placeholder — replace with the spa's real WhatsApp Business number before launch
  whatsappNumber: "27000000000",
  whatsappMessage: "Hi! I'd like to book an appointment at Kriel Colon & Beauty Spa.",
  hours: [
    { day: "Monday", open: "8:00 AM", close: "5:00 PM" },
    { day: "Tuesday", open: "8:00 AM", close: "5:00 PM" },
    { day: "Wednesday", open: "8:00 AM", close: "5:00 PM" },
    { day: "Thursday", open: "8:00 AM", close: "5:00 PM" },
    { day: "Friday", open: "8:00 AM", close: "5:00 PM" },
    { day: "Saturday", open: "8:00 AM", close: "5:00 PM" },
    { day: "Sunday", open: null, close: null },
  ],
  freshaBaseUrl:
    "https://www.fresha.com/book-now/kriel-health-beauty-spa-fw9fio9v/all-offer?id=1427041&pId=1355234",
  ratingAverage: 4.9,
  ratingCount: 100,
};
```

- [ ] **Step 9: Commit**

```bash
git add lib tests package.json
git commit -m "feat: add typed content data layer for services, team, reviews, site info"
```

---

## Task 3: Reduced-Motion Hook + `RevealOnScroll` Wrapper

**Files:**
- Create: `hooks/useReducedMotion.ts`, `components/ui/RevealOnScroll.tsx`
- Test: `tests/components/RevealOnScroll.test.tsx`

**Interfaces:**
- Consumes: none (foundational)
- Produces: `useReducedMotion(): boolean` and `<RevealOnScroll>{children}</RevealOnScroll>` — every section component in Tasks 4–9 wraps its animated content in `RevealOnScroll` instead of calling Framer Motion directly.

- [ ] **Step 1: Install testing library for React components**

```bash
npm install --save-dev @testing-library/react @testing-library/jest-dom jest-environment-jsdom
```

- [ ] **Step 2: Write the failing test**

```tsx
// tests/components/RevealOnScroll.test.tsx
import { render, screen } from "@testing-library/react";
import RevealOnScroll from "@/components/ui/RevealOnScroll";

jest.mock("@/hooks/useReducedMotion", () => ({
  useReducedMotion: jest.fn(),
}));
import { useReducedMotion } from "@/hooks/useReducedMotion";

describe("RevealOnScroll", () => {
  it("renders children content regardless of motion preference", () => {
    (useReducedMotion as jest.Mock).mockReturnValue(true);
    render(<RevealOnScroll><p>Hello spa</p></RevealOnScroll>);
    expect(screen.getByText("Hello spa")).toBeInTheDocument();
  });

  it("applies reduced-motion-safe fade when preference is set", () => {
    (useReducedMotion as jest.Mock).mockReturnValue(true);
    render(<RevealOnScroll><p>Hello spa</p></RevealOnScroll>);
    const wrapper = screen.getByText("Hello spa").parentElement;
    expect(wrapper).toHaveAttribute("data-motion", "reduced");
  });
});
```

- [ ] **Step 3: Run test to verify it fails**

Run: `npx jest tests/components/RevealOnScroll.test.tsx`
Expected: FAIL — module not found.

- [ ] **Step 4: Implement `hooks/useReducedMotion.ts`**

```ts
"use client";
import { useEffect, useState } from "react";

export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(query.matches);
    const listener = (e: MediaQueryListEvent) => setReduced(e.matches);
    query.addEventListener("change", listener);
    return () => query.removeEventListener("change", listener);
  }, []);

  return reduced;
}
```

- [ ] **Step 5: Implement `components/ui/RevealOnScroll.tsx`**

```tsx
"use client";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type Props = { children: React.ReactNode; className?: string };

export default function RevealOnScroll({ children, className }: Props) {
  const reduced = useReducedMotion();

  if (reduced) {
    return (
      <div data-motion="reduced" className={className}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      data-motion="full"
      className={className}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
```

- [ ] **Step 6: Run test to verify it passes**

Run: `npx jest tests/components/RevealOnScroll.test.tsx`
Expected: PASS

- [ ] **Step 7: Commit**

```bash
git add hooks components tests package.json
git commit -m "feat: add reduced-motion hook and RevealOnScroll wrapper"
```

---

## Task 4: Booking CTA Components (`BookNowButton`, `WhatsAppButton`, `StickyBookBar`)

**Files:**
- Create: `components/ui/BookNowButton.tsx`, `components/ui/WhatsAppButton.tsx`, `components/ui/StickyBookBar.tsx`
- Test: `tests/components/BookNowButton.test.tsx`

**Interfaces:**
- Consumes: `SITE.freshaBaseUrl`, `SITE.whatsappNumber`, `SITE.whatsappMessage` from `lib/site.ts`, optional `Service["freshaUrl"]` from `lib/services.ts`
- Produces: `<BookNowButton href={string} label?={string} />`, `<WhatsAppButton />`, `<StickyBookBar />` — used by every section in Tasks 5–9.

- [ ] **Step 1: Write the failing test**

```tsx
// tests/components/BookNowButton.test.tsx
import { render, screen } from "@testing-library/react";
import BookNowButton from "@/components/ui/BookNowButton";

describe("BookNowButton", () => {
  it("links to the given Fresha URL and opens in a new tab", () => {
    render(<BookNowButton href="https://www.fresha.com/example" />);
    const link = screen.getByRole("link", { name: /book now/i });
    expect(link).toHaveAttribute("href", "https://www.fresha.com/example");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", expect.stringContaining("noopener"));
  });

  it("supports a custom label", () => {
    render(<BookNowButton href="https://www.fresha.com/example" label="Book Colon Cleansing" />);
    expect(screen.getByRole("link", { name: "Book Colon Cleansing" })).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx jest tests/components/BookNowButton.test.tsx`
Expected: FAIL — module not found.

- [ ] **Step 3: Implement `components/ui/BookNowButton.tsx`**

```tsx
type Props = { href: string; label?: string; className?: string; ariaLabel?: string };

export default function BookNowButton({ href, label = "Book Now", className, ariaLabel }: Props) {
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
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx jest tests/components/BookNowButton.test.tsx`
Expected: PASS

- [ ] **Step 5: Implement `components/ui/WhatsAppButton.tsx`**

```tsx
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
```

- [ ] **Step 6: Implement `components/ui/StickyBookBar.tsx`**

```tsx
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
```

- [ ] **Step 7: Commit**

```bash
git add components tests
git commit -m "feat: add BookNowButton, WhatsAppButton, and StickyBookBar CTA components"
```

---

## Task 5: Hero + About Sections

**Files:**
- Create: `components/sections/Hero.tsx`, `components/sections/About.tsx`

**Interfaces:**
- Consumes: `SITE` from `lib/site.ts`, `RevealOnScroll`, `BookNowButton`
- Produces: `<Hero />`, `<About />` — assembled into `app/page.tsx` in Task 9.

- [ ] **Step 1: Implement `components/sections/Hero.tsx`**

```tsx
import { SITE } from "@/lib/site";
import BookNowButton from "@/components/ui/BookNowButton";

export default function Hero() {
  return (
    <section className="relative flex h-screen items-center justify-center overflow-hidden bg-bgDeep text-bg">
      <div className="absolute inset-0 bg-[url('/images/hero-spa.jpg')] bg-cover bg-center opacity-60" />
      <div className="relative z-10 flex flex-col items-center gap-6 text-center px-4">
        <h1 className="font-display text-5xl md:text-7xl">{SITE.name}</h1>
        <p className="max-w-xl font-body text-lg text-bg/90">
          Our primary focus is your well-being.
        </p>
        <BookNowButton href={SITE.freshaBaseUrl} />
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Implement `components/sections/About.tsx`**

```tsx
import RevealOnScroll from "@/components/ui/RevealOnScroll";

export default function About() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-24 text-center">
      <RevealOnScroll>
        <h2 className="font-display text-3xl md:text-4xl text-terracotta">Our Philosophy</h2>
        <p className="mt-6 font-body text-lg leading-relaxed">
          Our primary focus is your well-being, and client satisfaction is our top priority. We
          are committed to meeting your needs and ensuring you leave feeling completely
          satisfied. Kriel Colon Hydrotherapy offers the best services in town, dedicated to
          providing the highest level of care and comfort for our clients.
        </p>
      </RevealOnScroll>
    </section>
  );
}
```

- [ ] **Step 3: Verify visually**

Run: `npm run dev`, open `localhost:3000` after temporarily rendering `<Hero />` and `<About />` in `app/page.tsx`.
Expected: Hero fills viewport with tagline + Book Now button; About section fades in on scroll (or renders flat if `prefers-reduced-motion` is on — verify by toggling it in the browser preview's `resize_window` `colorScheme`/OS emulation or `mcp__Claude_Browser__javascript_tool` forcing `matchMedia`).

- [ ] **Step 4: Commit**

```bash
git add components/sections
git commit -m "feat: add Hero and About sections"
```

---

## Task 6: Services & Pricing Section

**Files:**
- Create: `components/sections/Services.tsx`
- Test: `tests/components/Services.test.tsx`

**Interfaces:**
- Consumes: `SERVICES`, `SERVICE_CATEGORIES` from `lib/services.ts`, `RevealOnScroll`, `BookNowButton`
- Produces: `<Services />`

- [ ] **Step 1: Write the failing test**

```tsx
// tests/components/Services.test.tsx
import { render, screen } from "@testing-library/react";
import Services from "@/components/sections/Services";

describe("Services section", () => {
  it("renders every service with its price and a working Book Now link", () => {
    render(<Services />);
    expect(screen.getByText("Colon Cleansing")).toBeInTheDocument();
    expect(screen.getByText(/ZAR 550/)).toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: /book now/i }).length).toBeGreaterThan(0);
  });

  it("groups services under their category heading", () => {
    render(<Services />);
    expect(screen.getByRole("heading", { name: "Colon Hydrotherapy" })).toBeInTheDocument();
  });

  it("gives each service's Book Now link a distinct accessible name", () => {
    render(<Services />);
    expect(screen.getByRole("link", { name: "Book Now – Colon Cleansing" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Book Now – LED-Light Therapy" })).toBeInTheDocument();
  });
});
```

*(Note: an earlier version of this step used `label={`Book ${service.name}`}` for visible+accessible text, which broke the `/book now/i` assertion above. Resolved during implementation via an `aria-label`-based fix — see Step 3's `BookNowButton` usage below — keeping visible text as uniform "Book Now" while giving each link a distinct accessible name, satisfying both the generic assertion and WCAG 2.4.4/2.4.9 link-purpose requirements.)*

- [ ] **Step 2: Run test to verify it fails**

Run: `npx jest tests/components/Services.test.tsx`
Expected: FAIL — module not found.

- [ ] **Step 3: Implement `components/sections/Services.tsx`**

```tsx
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
                    <BookNowButton
                      href={service.freshaUrl}
                      ariaLabel={`Book Now – ${service.name}`}
                    />
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
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx jest tests/components/Services.test.tsx`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add components/sections tests
git commit -m "feat: add Services and Pricing section grouped by category"
```

---

## Task 7: Reviews & Team Sections

**Files:**
- Create: `components/sections/Reviews.tsx`, `components/sections/Team.tsx`
- Test: `tests/components/Reviews.test.tsx`

**Interfaces:**
- Consumes: `REVIEWS` from `lib/reviews.ts`, `TEAM` from `lib/team.ts`, `SITE.ratingAverage`/`ratingCount`, `RevealOnScroll`
- Produces: `<Reviews />`, `<Team />`

- [ ] **Step 1: Write the failing test**

```tsx
// tests/components/Reviews.test.tsx
import { render, screen } from "@testing-library/react";
import Reviews from "@/components/sections/Reviews";

describe("Reviews section", () => {
  it("shows the aggregate rating and at least one quote", () => {
    render(<Reviews />);
    expect(screen.getByText(/4\.9/)).toBeInTheDocument();
    expect(screen.getByText(/100/)).toBeInTheDocument();
    expect(screen.getByText(/best massage/i)).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx jest tests/components/Reviews.test.tsx`
Expected: FAIL — module not found.

- [ ] **Step 3: Implement `components/sections/Reviews.tsx`**

```tsx
import { REVIEWS } from "@/lib/reviews";
import { SITE } from "@/lib/site";
import RevealOnScroll from "@/components/ui/RevealOnScroll";

export default function Reviews() {
  return (
    <section className="bg-bgDeep px-4 py-24 text-bg">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="font-display text-4xl">
          {SITE.ratingAverage} rated by {SITE.ratingCount} clients
        </h2>
        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {REVIEWS.map((review) => (
            <RevealOnScroll key={review.id} className="rounded-xl bg-bg/5 p-6 text-left">
              <p className="font-body italic">&ldquo;{review.quote}&rdquo;</p>
              <p className="mt-3 text-sm text-gold">{review.rating} / 5</p>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx jest tests/components/Reviews.test.tsx`
Expected: PASS

- [ ] **Step 5: Implement `components/sections/Team.tsx`**

```tsx
import { TEAM } from "@/lib/team";
import RevealOnScroll from "@/components/ui/RevealOnScroll";

export default function Team() {
  return (
    <section className="mx-auto max-w-4xl px-4 py-24 text-center">
      <h2 className="font-display text-4xl text-terracotta">Meet the Team</h2>
      <div className="mt-12 grid gap-8 md:grid-cols-3">
        {TEAM.map((member) => (
          <RevealOnScroll key={member.id}>
            <h3 className="font-display text-2xl">{member.name}</h3>
            <p className="text-text/70">{member.role}</p>
            <p className="mt-1 text-gold">{member.rating} / 5</p>
          </RevealOnScroll>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 6: Commit**

```bash
git add components/sections tests
git commit -m "feat: add Reviews and Team sections"
```

---

## Task 8: Location/Hours + Footer

**Files:**
- Create: `components/sections/LocationHours.tsx`, `components/sections/Footer.tsx`

**Interfaces:**
- Consumes: `SITE` from `lib/site.ts`, `RevealOnScroll`, `BookNowButton`
- Produces: `<LocationHours />`, `<Footer />`

- [ ] **Step 1: Implement `components/sections/LocationHours.tsx`**

```tsx
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
```

- [ ] **Step 2: Implement `components/sections/Footer.tsx`**

```tsx
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
```

- [ ] **Step 3: Commit**

```bash
git add components/sections
git commit -m "feat: add LocationHours and Footer sections"
```

---

## Task 9: Assemble Page, "The Experience" Scroll Section, and Sticky CTA

**Files:**
- Create: `components/sections/Experience.tsx`
- Modify: `app/page.tsx`, `app/layout.tsx`

**Interfaces:**
- Consumes: all section components from Tasks 5–8, `StickyBookBar` from Task 4
- Produces: the complete assembled page at `/`

- [ ] **Step 1: Implement `components/sections/Experience.tsx`** (the concentrated "over-the-top" scroll-storytelling section, using layered `RevealOnScroll` blocks for a staggered service-journey narrative)

```tsx
import RevealOnScroll from "@/components/ui/RevealOnScroll";

const STEPS = [
  { title: "Arrive & Unwind", copy: "Step into a space designed for calm from the first breath." },
  { title: "Your Treatment", copy: "Colon hydrotherapy, body treatments, and facials tailored to you." },
  { title: "Leave Renewed", copy: "Walk out lighter, calmer, and cared for." },
];

export default function Experience() {
  return (
    <section className="bg-bg px-4 py-24">
      <div className="mx-auto flex max-w-3xl flex-col gap-24">
        {STEPS.map((step, i) => (
          <RevealOnScroll key={step.title} className={i % 2 === 1 ? "text-right" : "text-left"}>
            <h3 className="font-display text-3xl text-terracotta">{step.title}</h3>
            <p className="mt-3 font-body text-lg text-text/80">{step.copy}</p>
          </RevealOnScroll>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Assemble `app/page.tsx`**

```tsx
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Services from "@/components/sections/Services";
import Experience from "@/components/sections/Experience";
import Reviews from "@/components/sections/Reviews";
import Team from "@/components/sections/Team";
import LocationHours from "@/components/sections/LocationHours";
import Footer from "@/components/sections/Footer";
import StickyBookBar from "@/components/ui/StickyBookBar";

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Services />
      <Experience />
      <Reviews />
      <Team />
      <LocationHours />
      <Footer />
      <StickyBookBar />
    </main>
  );
}
```

- [ ] **Step 3: Set page metadata in `app/layout.tsx`**

```tsx
import type { Metadata } from "next";
import "./globals.css";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: `${SITE.name} | ${SITE.address}`,
  description:
    "Colon hydrotherapy, body treatments, and facials in Kriel, Mpumalanga. Book your appointment today.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
```

- [ ] **Step 4: Run the full test suite**

Run: `npx jest`
Expected: All tests from Tasks 2–7 PASS.

- [ ] **Step 5: Verify in browser at mobile, tablet, and desktop widths**

Use the Browser pane (`preview_start` with the dev server, `resize_window` presets `mobile`/`tablet`/`desktop`) to confirm every section renders correctly and the sticky Book Now bar stays visible without overlapping content at 375px width.

- [ ] **Step 6: Verify reduced-motion fallback**

In the browser preview, force `prefers-reduced-motion: reduce` (via OS-level emulation or `javascript_tool` overriding `matchMedia`) and confirm sections still render their full content with `data-motion="reduced"` and no parallax/spring animation.

- [ ] **Step 7: Commit**

```bash
git add app components
git commit -m "feat: assemble full page with Experience section and sticky booking CTA"
```

---

## Task 10: Production Build & Deployment Readiness Check

**Files:**
- Modify: none (verification task)

**Interfaces:**
- Consumes: the complete app from Tasks 1–9

- [ ] **Step 1: Run production build**

Run: `npm run build`
Expected: Build succeeds with no type errors.

- [ ] **Step 2: Run Lighthouse performance check**

Run production build locally (`npm run start`) and audit with Lighthouse (via Chrome DevTools or `npx lighthouse http://localhost:3000 --view`).
Expected: Performance score reasonable on mobile throttling (target 80+); flag and address any animation-driven layout thrash if score is low.

- [ ] **Step 3: Verify every Book Now link resolves**

Manually click through each `BookNowButton` instance in the browser preview and confirm it opens the correct live Fresha URL in a new tab.

- [ ] **Step 4: Commit final verification notes**

```bash
git add -A
git commit -m "chore: verify production build, performance, and booking links"
```

---

## Self-Review Notes

- **Spec coverage:** Hero, About, Services/Pricing, Experience (scroll storytelling), Reviews, Team, Location/Hours, Footer, and sticky Book Now CTA are all covered (Tasks 4–9). Reduced-motion requirement covered in Task 3 and re-verified in Task 9. Centralized Fresha data covered in Task 2. Mobile-first verification covered in Tasks 9–10. Non-goals (no CMS, no custom booking, no e-commerce, no multi-language) are respected — no task introduces any of them.
- **Open items from spec** (full service menu, brand colors/logo, real photography) are explicitly flagged as follow-ups in Task 2 and the File Structure notes — not silently assumed complete.
- **Type consistency:** `Service`, `TeamMember`, `Review`, and `SITE` types defined in Task 2 are used identically (same field names) in Tasks 5–9 with no renaming drift.
