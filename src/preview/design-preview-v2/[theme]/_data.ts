/**
 * Data for the three colour versions.
 *
 * Extends the V2 baseline by import, the same way the baseline extends V1, so the baseline
 * stays exactly as it was at /design-preview-v2/*. Only what this round changed is
 * overridden here; the story, the expectations and the photo assignments are the
 * baseline's own objects.
 *
 * Copy comes from the approved menu PDF, pages i–x. Nothing is invented: Mini's hours and
 * menu stay unconfirmed, and its images are labelled concept illustrations.
 */
import {
  ANCHOR_BROWN,
  EXPECTATIONS,
  EXPERIENCES as BASE_EXPERIENCES,
  LOCATIONS as BASE_LOCATIONS,
  STORY,
  type Experience,
  type V2Location as BaseLocation,
} from "../_data";

export { ANCHOR_BROWN, EXPECTATIONS, STORY };
export type { Experience };

export type V2Location = BaseLocation & {
  /**
   * Preview-only concept artwork, used only where no photograph exists. Always rendered
   * with a visible "concept illustration" label. See public/preview-concepts/mini/.
   */
  conceptImage?: string;
};

export const LOCATIONS: Record<BaseLocation["slug"], V2Location> = {
  nallagandla: BASE_LOCATIONS.nallagandla,
  mini: {
    ...BASE_LOCATIONS.mini,
    // The baseline called it "the second room, same coffee, its own menu", which reads as
    // a second cafe and promises a menu. It is a kiosk, and no menu is confirmed.
    tagline: "A small kiosk inside Pickleball Central. A drink and a seat between games.",
    conceptImage: "/preview-concepts/mini/mini-kiosk-hero.svg",
  },
};

/** The two concept illustrations. Provenance: public/preview-concepts/mini/manifest.json. */
export const MINI_CONCEPT = {
  hero: {
    src: "/preview-concepts/mini/mini-kiosk-hero.svg",
    alt: "Concept illustration: a small serving shed with an awning and two outdoor tables, at the edge of a pickleball court",
  },
  counter: {
    src: "/preview-concepts/mini/mini-counter-seating.svg",
    alt: "Concept illustration: the serving counter, a blank board, and one table with two chairs",
  },
};

/* ------------------------------------------------------------ four journeys --- */

const base = Object.fromEntries(BASE_EXPERIENCES.map((e) => [e.slug, e])) as Record<
  Experience["slug"],
  Experience
>;
// Baseline order is frozen, so positional picks are stable.
const [gameRoom, completeSets, realBreak] = base.play.corners;
const [quietStudio, backyard, sundayNights] = base.stay.corners;

/**
 * Re-sorted to this brief: Sunday music and events belong to Play, and "a real break" is a
 * reason to Stay. Two existing repo photos that were unused anywhere are proposed:
 * experience-event.jpg (a group session in the orange room) for Play, and
 * experience-evening.jpg (the window-side counter at dusk) for Stay.
 */
export const EXPERIENCES: Experience[] = [
  base.read,
  {
    ...base.play,
    corners: [gameRoom, completeSets, sundayNights],
    gallery: [
      ...base.play.gallery,
      { src: "/images/experience-event.jpg", alt: "A group session in the orange room" },
      { src: "/images/live-events.jpg", alt: "A Sunday evening performance in the garden" },
    ],
    cta: { label: "See upcoming events", href: "/events" },
  },
  {
    ...base.stay,
    corners: [quietStudio, backyard, realBreak],
    gallery: [
      { src: "/images/gallery/9.jpg", alt: "The garden backyard with guests" },
      { src: "/images/experience-evening.jpg", alt: "The window-side counter at dusk, above the backyard" },
      { src: "/images/gallery/10.jpg", alt: "Live music in the backyard" },
    ],
  },
  base["eat-drink"],
];

export const experienceBySlug = (slug: string) => EXPERIENCES.find((e) => e.slug === slug);

/* ------------------------------------------------- the four rooms, PDF page vi --- */

/**
 * The walking tour's four rooms, for the Nallagandla page. Seat counts are the PDF's own
 * table counts added up, and they come to its stated 76.
 */
export const SPACES: {
  name: string;
  seats: number;
  layout: string;
  purpose: string;
  journey: Experience["slug"];
}[] = [
  {
    name: "The Reader's Room",
    seats: 16,
    layout: "Three four-seaters, two two-seaters, low seating",
    purpose: "For settling in with a book. The low seats are on purpose — they keep it quiet.",
    journey: "read",
  },
  {
    name: "The Game Room",
    seats: 16,
    layout: "Four four-seaters",
    purpose: "For board games with friends or family. Be as loud as you like.",
    journey: "play",
  },
  {
    name: "The Quiet Studio",
    seats: 24,
    layout: "Four tables of four, eight window-side high chairs",
    purpose: "For working, reading or quiet time. Printer, notepad and stationery, free to use.",
    journey: "stay",
  },
  {
    name: "The Backyard",
    seats: 20,
    layout: "Four four-seaters, two two-seaters by the garden",
    purpose: "The heart of the place, full of plants. Pets welcome; music on Sunday evenings.",
    journey: "stay",
  },
];
