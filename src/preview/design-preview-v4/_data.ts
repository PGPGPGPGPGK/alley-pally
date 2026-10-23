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
  /** Who the room is for, in a visitor's words. Helps someone pick before arriving. */
  suitedFor?: string;
  body: string[];
  image: { src: string; alt: string };
  link?: { label: string; href: string };
};

export const NALLAGANDLA_TILES: NallagandlaTile[] = [
  {
    id: "readers-room",
    title: "The Reader's Room",
    teaser: "Low seating, a wall of books, and quiet kept on purpose.",
    suitedFor: "Reading alone · finishing the book you keep meaning to finish",
    body: [
      "A shelf you can actually borrow from, and a room built to stay quiet for the people using it. Pick something off the wall, take it to a chair, and read one page or a hundred.",
      "Books stay in the café — borrow freely inside, and put them back as you found them.",
    ],
    image: {
      src: "/images/gallery/1.jpg",
      alt: "The book wall and the window counter at Alley Pally, warm lamps lit at dusk",
    },
    link: { label: "More about reading here", href: ROUTES.experience("read") },
  },
  {
    id: "game-room",
    title: "The Game Room",
    teaser: "Board games with all their pieces, in a room where noise is the point.",
    suitedFor: "Friends and family · long games · talking loudly",
    body: [
      "Games with every piece still in the box, and someone who will teach you the rules if you ask. Spread out, argue about them, take as long as you like.",
      "Pack them back complete and tidy so the next table gets the same.",
    ],
    image: {
      src: "/images/gallery/7.jpg",
      alt: "Guests around the long table at Alley Pally, talking in the daylight by the window",
    },
    link: { label: "More about playing here", href: ROUTES.experience("play") },
  },
  {
    id: "quiet-studio",
    title: "The Quiet Studio",
    teaser: "The room that keeps its voice down.",
    suitedFor: "Concentrating · quiet time · a long session with a laptop",
    body: [
      "The window side catches a long, slow sunset, and the room stays quiet on purpose. It is where people go to think something through, or to sit with family without a soundtrack.",
      "There is a power socket at every table and free Wi-Fi throughout, if you are here to work.",
    ],
    image: {
      src: "/images/about-cafe.jpg",
      alt: "Tables beside the book wall at Alley Pally, with window-side seating along the glass",
    },
  },
  {
    id: "backyard",
    title: "The Backyard",
    teaser: "The garden out the back, full of plants.",
    suitedFor: "Evenings · pets · Sunday music · doing nothing",
    body: [
      "The heart of Alley Pally. We filled it with plants on purpose, to bring a pocket of the wild into the city, and it is where most people end up once the evening cools.",
      "Pets are welcome out here. Every Sunday evening it turns to music — no ticket, no cover.",
    ],
    image: {
      src: "/images/gallery/2.jpg",
      alt: "The planted courtyard at Alley Pally, with garden tables and chairs below the mezzanine",
    },
  },
];

/**
 * Where each room physically sits is NOT documented anywhere authoritative.
 *
 * Two customer reviews on the live site mention private cabins on the first floor
 * ("2 cabins on the first floor", "upper-floor private cabins"), and the menu PDF names
 * the four rooms without saying which floor any of them is on. Rather than guess, the page
 * says what is known and this note goes to Arun for confirmation.
 */
export const FLOORS_UNCONFIRMED =
  "Ground floor, first floor and backyard layout is not documented — the four rooms are named in the menu PDF without floors, and the only mentions of upstairs cabins come from customer reviews. Awaiting confirmation.";

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
export const FILM = {
  webm: "/videos/hero-bg.webm",
  mp4: "/videos/hero-bg.mp4",
  poster: "/images/nallagandla-drone-poster.jpg",
  /**
   * Corrected. This was captioned "The café from above" with alt text describing an
   * aerial "looking down over the garden and the roof" — Arun spotted that it sat over
   * interior footage. Checked frame by frame: the 44 seconds open on the slatted wood
   * frontage from a low drone height, move inside past the book wall and the window
   * counter, and close on the illuminated sign at dusk. It is a walkthrough, not an
   * aerial, and the words now say so.
   */
  alt: "A walk through Alley Pally in Nallagandla: the wooden frontage, the book wall and window counter inside, and the lit sign at dusk",
  caption: "A walk through the café, from the street to the book wall to closing light.",
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


/* ------------------------------------------------------------------- homepage hero --- */

/**
 * The hero photograph.
 *
 * Arun's note was that the layout is clean but the old site feels warmer. The fix is not
 * more words, it is a real photograph of the place at its best: the backyard on an evening,
 * with people in it, under the hanging plants and the festoon lights. It is first on the
 * brief's own priority list and it is the single most inviting frame in the library.
 *
 * It sits under a brown scrim rather than beside the type, so the Hearth identity survives
 * and the headline keeps its contrast without hunting for a dark patch in the photo.
 */
export const HERO = {
  src: "/images/gallery/9.jpg",
  alt: "Guests sitting together in the planted backyard at Alley Pally on an evening, under hanging plants and festoon lights",
};

/** The habit-café idea, said once, in the owners' own framing from the menu PDF. */
export const HABIT = {
  headline: STORY.philosophy,
  support:
    "A book you have been meaning to finish. A game with friends. A conversation that runs longer than planned. Or a little time to yourself.",
  invitation: "Come for any reason. Make a habit of it.",
};

/* ------------------------------------------------------------------ quick actions --- */

/**
 * For someone who has already decided to come. Verified destinations only: the menu is the
 * live route the printed QR codes use, the map link is the one already in the location
 * data, and the WhatsApp number is the business number used on the production site.
 */
export const QUICK_ACTIONS = [
  { label: "Menu", href: ROUTES.menu, kind: "menu" as const, external: true },
  {
    label: "Directions",
    href: LOCATIONS.nallagandla.mapsUrl,
    kind: "map" as const,
    external: true,
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/919032694008?text=Hi%2C%20I%E2%80%99d%20like%20to%20ask%20about%20Alley%20Pally",
    kind: "chat" as const,
    external: true,
  },
];

/* ----------------------------------------------------------------- food and coffee --- */

/**
 * Modest words, good pictures — Arun's positioning, kept.
 *
 * Every dish shown was checked against src/lib/menu-data.ts first. `food/hotdog.jpg` is
 * deliberately NOT here: there is no hot dog on the approved menu, so it would have been an
 * outdated offering. There is also no photograph of the wood-fired pizza anywhere in the
 * repository, which is flagged for Arun rather than filled with a stand-in.
 *
 * The lead photograph is the one with warmth in it rather than a white studio background.
 * Its pastry is not named, because no croissant appears on the current menu either.
 */
export const FOOD = {
  headline: "Come for the company. Stay for another slice.",
  body:
    "We did not build Alley Pally to serve food. But while you are here, we would love to make you something good — a vegetarian kitchen with eggs, coffee on A2 milk, and a wood-fired oven we built ourselves.",
  lead: {
    src: "/images/gallery/3.jpg",
    alt: "A latte and a pastry on a dark tray, on one of the wooden tables at Alley Pally",
  },
  /** Verified against the current menu: bagels, subs, pesto, salads and coffee all appear. */
  dishes: [
    { src: "/images/food/pesto-sub.jpg", alt: "An open pesto sub on a dark plate" },
    { src: "/images/food/sub.jpg", alt: "A toasted sub with fries and dips" },
    { src: "/images/food/bagel.jpg", alt: "A filled bagel" },
    { src: "/images/food/salad.jpg", alt: "A bowl of salad" },
  ],
};

/* ------------------------------------------------------------------------ reviews --- */

/**
 * Four genuine Google reviews, copied verbatim from the production site's own
 * Testimonials component — the same words and attribution Alley Pally already publishes.
 * Nothing was written, merged, trimmed or re-attributed here.
 *
 * Verification limit, stated plainly: these were taken from the business's own published
 * site, not re-fetched from Google. See the confirmation checklist.
 *
 * Chosen to cover different things: games and books, the garden and neighbours, a first
 * visit, and the food.
 */
export const REVIEWS = [
  {
    quote:
      "Alley Pally has been a surprise find for me & my gang. As a family of book & board game lovers, this place deserves a wow. The food is just yummy, perfectly balanced in taste & the service deserves a call out. Has become an absolute favourite hangout for us!",
    name: "neeha u",
    source: "Google Review · 5 reviews",
    about: "Books and board games",
  },
  {
    quote:
      "A true neighborhood gem! A green oasis drenched in calm vibes. Met my neighbors and had a fun boardgame night with kids. The food is fun, clean, slow and mindful. Looking forward to more evenings of music, books, and friends!",
    name: "Maitreyi Nachuri",
    source: "Local Guide · 196 reviews",
    about: "The garden and the neighbourhood",
  },
  {
    quote:
      "Loved my visit! The Wood Fired Paneer Tikka Pizza & Cauliflower Steak is a must try. The Vietnamese Latte was delicious too. Great book collection and we even learned a new board game. Calm vibe, easy to spend time here. Highly recommended!",
    name: "Ravi Roshan Singh",
    source: "Local Guide · 4 reviews",
    about: "A first visit",
  },
  {
    quote:
      "It was wonderfully calm for a Saturday brunch. We tried the avocado toast, farmhouse pizza, grilled red bean steak, mango shake, and the Alley Pally OG cold coffee — and every dish was delicious. Loved the place, the food, and the relaxed atmosphere.",
    name: "Vandana Negi",
    source: "Local Guide · 57 reviews",
    about: "Food and coffee",
  },
];
