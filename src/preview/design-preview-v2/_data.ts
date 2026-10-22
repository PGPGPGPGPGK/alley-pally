/**
 * V2 preview data.
 *
 * Built on V1 rather than beside it: the location records are V1's, with only what the
 * client has since confirmed overridden. V1 stays untouched and recoverable at
 * /design-preview.
 *
 * Copy is quoted from the client-approved menu PDF (Alley-Pally-Menu-A5.pdf), pages i–x.
 * Nothing here is invented: where the PDF does not say it, the field is left empty and
 * flagged in the report instead.
 */
import { LOCATIONS as V1_LOCATIONS, type PreviewLocation } from "../design-preview/_data";

export type V2Location = PreviewLocation & {
  /** Where this cafe's menu lives. Null while a cafe has no menu of its own. */
  menuHref: string | null;
  /** False keeps the hours on screen but visibly unconfirmed. */
  hoursVerified: boolean;
  /** Short note shown under unverified facts. */
  hoursNote?: string;
};

export const LOCATIONS: Record<PreviewLocation["slug"], V2Location> = {
  nallagandla: {
    ...V1_LOCATIONS.nallagandla,
    // Confirmed by the client and already live in production.
    hours: "Daily · 8:00 AM – 11:00 PM",
    hoursVerified: true,
    menuHref: "/menu",
    heroImage: "/images/exterior.jpg",
  },
  mini: {
    ...V1_LOCATIONS.mini,
    // The host venue's own site contradicts itself (6–10 AM + 4–10 PM in the header,
    // 7 AM–9 PM in its FAQ) and booking platforms give a third set. Unconfirmed.
    hours: "Hours not yet confirmed",
    hoursVerified: false,
    hoursNote: "The venue's own listings disagree. Awaiting confirmation from the cafe.",
    // Mini has no menu page of its own, and its offering is not Nallagandla's.
    menuHref: null,
    heroImage: null,
  },
};

/* ------------------------------------------------- brand story, PDF pages i–iii --- */

export const STORY = {
  /** Page i. */
  promise: "Eat · Drink · Read · Play · Stay",
  /** Page iii heading. */
  philosophy: "Not a cafe. A place to be.",
  /** Page ii, the letter. */
  welcome:
    "You have already done the hardest thing. You sat down. The chair is yours for as long as you like — there is no hurry here, and nobody is counting the minutes.",
  /** Page iii, why it exists. */
  why: "We opened because somewhere along the way we stopped reading, stopped sitting still with the people we love, stopped looking up at trees. So we made a place where you can pick up a book and read one page, pull out a board game, or step into the backyard and just be.",
  /** Page iii, the name. */
  name: {
    alley: "a leafy walkway, lined on both sides with trees and hedges",
    pally: "friendly, chummy, on easy and familiar terms",
    together:
      "Put them together and that is us: a green, unhurried path where everyone is a little pally — the kind of place you quietly fall into the habit of.",
  },
  /** Page iii, said plainly. */
  modesty:
    "Alley Pally was never meant to be a great place for food — we will say that ourselves, gently. Come for the time you will spend here. The food is only here to keep you company.",
};

/** Page vi. What a visitor should expect, in the PDF's own numbers. */
export const EXPECTATIONS = [
  { value: "76", label: "seats across four corners" },
  { value: "Every table", label: "has a powered socket" },
  { value: "Sundays", label: "live music in the backyard, no cover" },
  { value: "450°C", label: "wood-fired oven, after 5 PM" },
];

/* --------------------------------------------- four experiences, PDF pages iv–x --- */

export type Experience = {
  slug: "read" | "play" | "stay" | "eat-drink";
  name: string;
  kicker: string;
  /** The PDF's own framing for this journey. */
  blurb: string;
  hero: { src: string; alt: string };
  /** Drawn from the walking tour (page vi) and the pages that follow. */
  corners: { title: string; body: string }[];
  gallery: { src: string; alt: string }[];
  /** House rules the PDF states for this journey (page ix). */
  manners: string[];
  cta?: { label: string; href: string };
};

export const EXPERIENCES: Experience[] = [
  {
    slug: "read",
    name: "Read",
    kicker: "The Reader's Room",
    blurb:
      "A shelf you can actually borrow from, and a low room built to keep it quiet for the people using it.",
    hero: { src: "/images/reels/DYrg0ERzobJ.jpg", alt: "A guest reading in front of the shelves at Alley Pally" },
    corners: [
      {
        title: "The Reader's Room",
        body: "Three four-seaters and two two-seaters, low seating. For settling in with a book, comfortably, for a while. The low seats are on purpose — they slow you down and keep the room quiet for readers.",
      },
      {
        title: "Slow mornings",
        body: "A warm cup in your hands quietly tells your body it is safe to relax, and reading real paper lets your mind move slowly. Fifteen slow minutes here, and the rest of the day usually follows.",
      },
      {
        title: "The books stay",
        body: "No book ever leaves its cabin: they are our golden treasures. Borrow freely inside, then return them exactly as you found them.",
      },
    ],
    gallery: [
      { src: "/images/interior-wide.jpg", alt: "The library shelf and banquette seating" },
      { src: "/images/about-cafe.jpg", alt: "Tables beside the bookshelves" },
      { src: "/images/gallery/1.jpg", alt: "The counter and book wall" },
    ],
    manners: ["Borrow freely, return exactly as found", "No book leaves its cabin"],
  },
  {
    slug: "play",
    name: "Play",
    kicker: "The Game Room",
    blurb: "Board games with all their pieces, and a room where being loud is the point.",
    hero: { src: "/images/reels/DZPzPEsNFSM.jpg", alt: "Guests playing a board game at Alley Pally" },
    corners: [
      {
        title: "The Game Room",
        body: "Four four-seaters. For spreading out a board game with friends or family. Be as loud as you like — this is where the stress burns off.",
      },
      {
        title: "Complete sets",
        body: "Games with all their pieces, and someone who will teach you the rules. Just pack them back, complete and tidy, so the next table can play too.",
      },
      {
        title: "A real break",
        body: "Step out of the rush — a slow lunch, a page of a book, a board game with whoever is nearby. Taking a real break, not a phone break, recharges your focus.",
      },
    ],
    gallery: [
      { src: "/images/gallery/7.jpg", alt: "A long table of guests mid-game" },
      { src: "/images/gallery/5.jpg", alt: "The orange room during a gathering" },
      { src: "/images/reels/DZTA3ibzVwE.jpg", alt: "A full table of friends at the cafe" },
    ],
    manners: ["Be as loud as you like in the Game Room", "Pack games back complete and tidy"],
  },
  {
    slug: "stay",
    name: "Stay",
    kicker: "The Quiet Studio & the Backyard",
    blurb:
      "A chair that is yours for as long as you like — to work, to sit with family, or to do nothing in the garden.",
    hero: { src: "/images/workspace.jpg", alt: "A laptop and lunch on a table at Alley Pally" },
    corners: [
      {
        title: "The Quiet Studio",
        body: "Four tables of four and eight window-side high chairs — come in the evening and they catch a beautiful sunset. For working, reading, or quiet time with family. There is a printer, a notepad and stationery, free to use.",
      },
      {
        title: "The Backyard",
        body: "Four four-seaters and two two-seaters by the garden. Pets welcome; games stay indoors. This is the heart of Alley Pally — we filled it with plants on purpose, to bring a pocket of the wild into the city.",
      },
      {
        title: "Sunday nights",
        body: "Every Sunday evening the backyard turns to music, and you are invited. No ticket, no cover. On us.",
      },
    ],
    gallery: [
      { src: "/images/gallery/9.jpg", alt: "The garden backyard with guests" },
      { src: "/images/gallery/10.jpg", alt: "Live music in the backyard" },
      { src: "/images/live-events.jpg", alt: "An evening performance in the garden" },
    ],
    manners: [
      "Every table has a powered socket — charge freely",
      "Pets are welcome in the backyard; indoors stays people-only",
      "No smoking anywhere, not even the backyard",
    ],
  },
  {
    slug: "eat-drink",
    name: "Eat + Drink",
    kicker: "From the fire, and the press",
    blurb:
      "A vegetarian kitchen, with eggs. A wood-fired oven we built ourselves, and coffee poured on A2 milk.",
    hero: { src: "/images/gallery/3.jpg", alt: "A latte and croissant at Alley Pally" },
    corners: [
      {
        title: "Why wood-fired",
        body: "We built the oven ourselves, brick by brick, and we cook with real wood. The fire gets to around 450°C and bakes a pizza in about ninety seconds — a thin, crisp crust that stays light instead of soaking up oil. After 5 PM the fire takes over; before then, the same pizzas come from the regular oven.",
      },
      {
        title: "A vegetarian kitchen, with eggs",
        body: "We chose it on purpose. It is lighter on the body, far gentler on the planet, and, done well, it wants for nothing. Everything is vegetarian unless it says it contains egg.",
      },
      {
        title: "What we pour",
        body: "We keep off white sugar wherever we can, and we pour A2 milk — gentle on the stomach, rich in calcium and protein.",
      },
    ],
    gallery: [
      { src: "/images/food/latte.jpg", alt: "Spanish latte" },
      { src: "/images/food/bagel.jpg", alt: "Fresh bagel" },
      { src: "/images/food/pesto-sub.jpg", alt: "Pesto sub" },
      { src: "/images/food/salad.jpg", alt: "Caesar salad" },
    ],
    manners: [
      "Tell us about allergies before you order — the kitchen is a shared space",
      "Don't love a dish? We'll replace it, free, on us",
      "All prices are exclusive of taxes",
    ],
    cta: { label: "See the full menu", href: "/menu" },
  },
];

export const experienceBySlug = (slug: string) =>
  EXPERIENCES.find((e) => e.slug === slug);

/* ----------------------------------------------------------- palette proposals --- */

export type Palette = {
  id: string;
  name: string;
  idea: string;
  /** Where the anchor brown was sampled from. */
  sampledFrom: string;
  swatches: { token: string; hex: string; note: string }[];
};

/**
 * Three directions, all anchored on the same brown sampled from the cafe's own woodwork
 * (#3F1111 / #400E03 in `about-cafe.jpg` and `gallery/1.jpg`, reconciled to #4A2218).
 * Provisional — nothing here replaces the official logo or the production tokens.
 */
export const ANCHOR_BROWN = "#4A2218";

export const PALETTES: Palette[] = [
  {
    id: "warm-clay",
    name: "Warm Clay",
    idea: "The brick wall of the main room, turned down until it can hold text.",
    sampledFrom: "interior-wide.jpg · about-cafe.jpg",
    swatches: [
      { token: "Anchor", hex: ANCHOR_BROWN, note: "Woodwork brown, sampled" },
      { token: "Wall", hex: "#8E2106", note: "The painted wall, sampled" },
      { token: "Clay", hex: "#C4724E", note: "Existing accent, already in use" },
      { token: "Surface", hex: "#F7F1EA", note: "Paper, slightly warmer than today" },
      { token: "Line", hex: "#E2D3C4", note: "Hairlines and card borders" },
      { token: "Ink", hex: "#2F110D", note: "Deepest sampled brown, for text" },
    ],
  },
  {
    id: "garden-shade",
    name: "Garden Shade",
    idea: "The backyard reading: brown held against the planting, not against orange.",
    sampledFrom: "gallery/9.jpg · gallery/10.jpg · exterior.jpg",
    swatches: [
      { token: "Anchor", hex: ANCHOR_BROWN, note: "Woodwork brown, sampled" },
      { token: "Leaf", hex: "#5C7A52", note: "Backyard planting" },
      { token: "Moss", hex: "#3F5438", note: "Shade under the pergola" },
      { token: "Surface", hex: "#F4F1E9", note: "Cooler paper" },
      { token: "Stone", hex: "#706050", note: "Exterior taupe, sampled" },
      { token: "Ink", hex: "#2A1A12", note: "Text" },
    ],
  },
  {
    id: "slow-morning",
    name: "Slow Morning",
    idea: "Lamp light at 8 AM: the quietest of the three, amber instead of red.",
    sampledFrom: "hero-poster.jpg · gallery/1.jpg",
    swatches: [
      { token: "Anchor", hex: ANCHOR_BROWN, note: "Woodwork brown, sampled" },
      { token: "Lamp", hex: "#DE732F", note: "Pendant light, sampled" },
      { token: "Ochre", hex: "#B98B4E", note: "Softened lamp tone" },
      { token: "Surface", hex: "#FBF7F2", note: "Near-white paper" },
      { token: "Shadow", hex: "#70453B", note: "Mid brown, sampled" },
      { token: "Ink", hex: "#331A12", note: "Text" },
    ],
  },
];
