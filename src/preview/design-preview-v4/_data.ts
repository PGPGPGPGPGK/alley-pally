/**
 * V4 data.
 *
 * Nothing is re-typed. The story, the four journeys, the four rooms and the location
 * records come from V2/V3 by import; this file only adds what the refinement needs and
 * removes what the brief asked to drop.
 *
 * Three rules drive the removals:
 *   - no seating-arrangement information anywhere (seat counts, table breakdowns, layouts)
 *   - no printer, printing, notepad or stationery claims — not approved for promotion
 *   - no invented facts; anything unverified stays labelled unverified
 */
import {
  EXPERIENCES as V3_EXPERIENCES,
  LOCATIONS as V3_LOCATIONS,
  MINI_CONCEPT,
  MINI_PHOTO,
  SPACES as V3_SPACES,
  STORY,
  type Experience,
  type V3Location,
} from "../design-preview-v3/_data";
import { ACTIVE_JOURNEYS, ROUTES } from "./_routes";

export { MINI_CONCEPT, MINI_PHOTO, STORY };
export type { Experience, V3Location as V4Location };

/* ------------------------------------------------------------ content filters --- */

/** Seat counts and table breakdowns, removed from visitor-facing copy. */
const SEATING =
  /\b(four-seaters?|two-seaters?|seaters?|high chairs|tables of four|seat counts?|seats?)\b/i;

/**
 * Facilities that exist but are not approved for promotion. The printer and the stationery
 * are real — they are in the menu PDF — but Arun has not cleared them as things to
 * advertise, so they are stripped here rather than being left to a reviewer to catch.
 */
const UNAPPROVED = /\b(printers?|printing|notepads?|stationery)\b/i;

/**
 * Whole sentences carrying a banned term are dropped — a sentence is the smallest unit
 * that stays readable when removed.
 *
 * The guard matters: if a body is nothing but banned content, filtering would empty it, so
 * the original is kept and the page still says something. `scripts/check-v4.mjs` asserts
 * that no banned term survives on any rendered V4 page, which is the real check.
 */
function filterSentences(text: string, banned: RegExp): string {
  const kept = text
    .split(/(?<=\.)\s+/)
    .filter((sentence) => !banned.test(sentence))
    .join(" ")
    .trim();
  return kept || text;
}

export const withoutSeating = (t: string) => filterSentences(t, SEATING);
export const clean = (t: string) => filterSentences(filterSentences(t, SEATING), UNAPPROVED);

/* ----------------------------------------------------------------- locations --- */

/** One line each. No long introductions. */
const BLURB: Record<V3Location["slug"], string> = {
  nallagandla: "The main café · Read, play and stay.",
  mini: "The café kiosk at Pickleball Central.",
};

export const LOCATIONS: Record<V3Location["slug"], V3Location & { blurb: string }> = {
  nallagandla: { ...V3_LOCATIONS.nallagandla, blurb: BLURB.nallagandla },
  mini: { ...V3_LOCATIONS.mini, blurb: BLURB.mini },
};

export const LOCATION_LIST = [LOCATIONS.nallagandla, LOCATIONS.mini];

/* ------------------------------------------------------------- the four rooms --- */

/** The rooms, without seat counts, layouts or unapproved facilities. */
export const SPACES = V3_SPACES.map(({ name, purpose, journey }) => ({
  name,
  journey,
  purpose: clean(purpose),
}));

/* ---------------------------------------------------------------- experiences --- */

/**
 * The journeys, with banned content stripped from every body.
 *
 * `manners` is dropped. On Read it was the "kindness" block the brief named; on Play it
 * repeated the body copy. Only Eat + Drink keeps a short practical list, because allergies
 * and tax-exclusive pricing are stated nowhere else.
 */
export type V4Experience = Omit<Experience, "manners"> & { notes?: string[] };

const KEEP_NOTES: Partial<Record<Experience["slug"], string[]>> = {
  "eat-drink": [
    "Tell us about allergies before you order — the kitchen is a shared space",
    "Don't love a dish? We'll replace it, free, on us",
    "All prices are exclusive of taxes",
  ],
};

// Built field by field rather than by spreading: `manners` is dropped by simply never
// being copied, which is easier to verify than a rest-destructure.
export const EXPERIENCES: V4Experience[] = V3_EXPERIENCES.map((e) => ({
  slug: e.slug,
  name: e.name,
  kicker: e.kicker,
  blurb: clean(e.blurb),
  hero: e.hero,
  corners: e.corners.map((c) => ({ ...c, body: clean(c.body) })),
  gallery: e.gallery,
  cta: e.cta,
  notes: KEEP_NOTES[e.slug],
}));

export const experienceBySlug = (slug: string) => EXPERIENCES.find((e) => e.slug === slug);

const ICON_FOR = { read: "book", play: "dice", stay: "chair", "eat-drink": "cup" } as const;

/**
 * The homepage strip: icon and title only, and only the active journeys. Stay is not here
 * — it is no longer a journey of its own.
 */
export const TILES = ACTIVE_JOURNEYS.map((slug) => {
  const e = EXPERIENCES.find((x) => x.slug === slug)!;
  return { slug: e.slug, name: e.name, icon: ICON_FOR[e.slug] };
});

/**
 * The homepage strip: four equal destinations, icon and label only.
 *
 * Events joins the three journeys here. It is not an "experience page" in the data sense —
 * it is the live events listing — but from a visitor's point of view it is a fourth answer
 * to "what would I come here for", and four balances the row.
 */
export const DESTINATIONS = [
  { label: "Read", href: ROUTES.experience("read"), icon: "book" as const },
  { label: "Play", href: ROUTES.experience("play"), icon: "dice" as const },
  { label: "Eat + Drink", href: ROUTES.experience("eat-drink"), icon: "cup" as const },
  { label: "Events", href: ROUTES.events, icon: "calendar" as const },
];

/* ------------------------------------------- Nallagandla's four expandable tiles --- */

/**
 * Four ways to spend the day at Nallagandla, as expandable cards above the footer.
 *
 * This replaces three separate repetitions on that page — the rooms grid, the "what you
 * can do here" strip and the standalone work-friendly band — with one section. Every
 * photograph is a real one already in the repository.
 *
 * Sourcing: the Quiet Studio and Backyard copy is the menu PDF's own framing with the
 * seating lines and the printer removed; "A real break" is adapted from the PDF's page on
 * taking a break, with its claim about focus dropped so nothing reads as a health claim;
 * "Work from here" carries only the two amenities that are actually verified.
 */
export type NallagandlaTile = {
  id: string;
  title: string;
  teaser: string;
  body: string[];
  image: { src: string; alt: string };
  link?: { label: string; href: string };
};

export const NALLAGANDLA_TILES: NallagandlaTile[] = [
  {
    id: "quiet-studio",
    title: "The Quiet Studio",
    teaser: "A room that stays quiet, for reading and concentrating.",
    body: [
      "The window side catches a long, slow sunset, and the room keeps its voice down on purpose. It is the corner people choose when they want to read properly, think something through, or sit with family without a soundtrack.",
      "Nobody is counting the minutes. The chair is yours for as long as you want it.",
    ],
    image: {
      src: "/images/about-cafe.jpg",
      alt: "The studio room at Alley Pally: tables beside the book wall, with window-side seating along the glass",
    },
    link: { label: "More about reading here", href: ROUTES.experience("read") },
  },
  {
    id: "backyard",
    title: "The Backyard",
    teaser: "The garden out the back, full of plants.",
    body: [
      "This is the heart of Alley Pally. We filled it with plants on purpose, to bring a pocket of the wild into the city, and it is where most people end up sitting when the evening cools down.",
      "Pets are welcome out here. Every Sunday evening the backyard turns to music — no ticket, no cover.",
    ],
    image: {
      src: "/images/gallery/9.jpg",
      alt: "The garden backyard at Alley Pally, planted and full of guests",
    },
  },
  {
    id: "a-real-break",
    title: "A Real Break",
    teaser: "Slow lunches, long conversations, nowhere to be.",
    body: [
      "Step out of the rush for an hour. A slow lunch, a page of a book, a board game with whoever is nearby, a conversation that is allowed to wander.",
      "We opened because somewhere along the way we stopped reading, stopped sitting still with the people we love, stopped looking up at trees. This is the part of the café that exists for that.",
    ],
    image: {
      src: "/images/gallery/3.jpg",
      alt: "A latte and a croissant on a tray, on one of the wooden tables at Alley Pally",
    },
  },
  {
    id: "work-from-here",
    title: "Work From Here",
    teaser: "Laptop-friendly, with a socket at every table and free Wi-Fi.",
    body: [
      "A laptop-friendly café in Nallagandla, Hyderabad: there is a power socket at every table, so you can charge freely, and Wi-Fi is free throughout.",
      "We are open from 8 in the morning until 11 at night, every day, so a long working session fits without anyone hovering over your table.",
    ],
    image: {
      src: "/images/workspace.jpg",
      alt: "A laptop and lunch on a wooden table at Alley Pally",
    },
  },
];

/**
 * The work-friendly line, kept in one place so the page and the metadata cannot drift.
 *
 * Sourcing — every claim, because the brief forbids inventing facilities:
 *   socket  — Arun's menu PDF, page vi ("every table has a powered socket")
 *   wifi    — alleypallycafe.com's own meta description and its LocalBusiness structured
 *             data (`LocationFeatureSpecification "Free WiFi": true`)
 *   hours   — confirmed by the client and live in production
 *
 * Deliberately absent: any speed claim. Production markets "Fast WiFi" but no measured
 * speed exists anywhere in the project, so "high-speed" is not claimed. Also absent: the
 * printer and the stationery, which are real but not approved for promotion.
 */
export const WORK_FRIENDLY = {
  line: "A laptop-friendly café in Nallagandla, Hyderabad, with power sockets at every table and free Wi-Fi.",
};

/* --------------------------------------------------------------- drone footage --- */

/**
 * The existing production drone shot, reused rather than replaced.
 *
 * Production's Hero.tsx interpolates `process.env.NEXT_PUBLIC_R2_PUBLIC_URL` directly, so
 * with the variable unset the request becomes `/undefined/videos/hero-bg.webm`. V4 goes
 * through `MEDIA_BASE`, which falls back to the real media host, so the preview plays the
 * genuine footage with no infrastructure change.
 */
export const DRONE = {
  webm: "/videos/hero-bg.webm",
  mp4: "/videos/hero-bg.mp4",
  poster: "/images/nallagandla-drone-poster.jpg",
  alt: "Aerial view of Alley Pally in Nallagandla, looking down over the garden and the roof",
};

/* ------------------------------------------------------------ Mini's artwork --- */

/**
 * The golden-hour concept image supplied by PG on 21 Oct 2026.
 *
 * AI-generated, not a photograph, and more built-out and lusher than the real kiosk. It is
 * used as an atmospheric supporting image only, always with a visible label, and it never
 * replaces `MINI_PHOTO.sign` as the recognisable picture of the place. Provenance and the
 * full accuracy caveats are in public/preview-concepts/mini/manifest.json.
 */
export const MINI_ARTWORK = {
  src: "/preview-concepts/mini/mini-kiosk-golden-hour.jpg",
  alt: "Concept illustration: a small wooden café kiosk wrapped in greenery at golden hour, with outdoor tables and a pickleball court behind it",
  label: "Illustration · not a photograph",
};
