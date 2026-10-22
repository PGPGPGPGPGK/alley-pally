/**
 * V3 data.
 *
 * Nothing is re-typed: the story, the four journeys, the four rooms and the location
 * records all come from V2 by import, so V2 stays the single source for them and V1/V2
 * keep working untouched. V3 adds only what is new — the real Mini photography, the
 * homepage teasers, and the footer's legal block.
 */
import {
  EXPECTATIONS,
  EXPERIENCES,
  LOCATIONS as V2_LOCATIONS,
  MINI_CONCEPT,
  SPACES,
  STORY,
  experienceBySlug,
  type Experience,
  type V2Location,
} from "../design-preview-v2/[theme]/_data";

export { EXPECTATIONS, EXPERIENCES, MINI_CONCEPT, SPACES, STORY, experienceBySlug };
export type { Experience };

/**
 * Real, locally saved photographs of the kiosk and its host venue. Provenance and the
 * resolution caveat are recorded in public/images/mini/SOURCES.md.
 */
export const MINI_PHOTO = {
  sign: {
    src: "/images/mini/mini-kiosk-sign.jpg",
    alt: "The Mini Alley Pally kiosk frontage: a green hedge wall with the Alley Pally logo sign",
  },
  courts: {
    src: "/images/mini/pickleball-courts.jpg",
    alt: "Players mid-game on the courts at Pickleball Central",
  },
};

export type V3Location = V2Location;

export const LOCATIONS: Record<V2Location["slug"], V3Location> = {
  nallagandla: V2_LOCATIONS.nallagandla,
  mini: {
    ...V2_LOCATIONS.mini,
    // V2 had no photograph of Mini and fell back to concept art. V3 has the real frontage,
    // so that becomes the identifying image and the illustration moves to a support role.
    heroImage: MINI_PHOTO.sign.src,
  },
};

/* --------------------------------------------------------- homepage teasers --- */

/**
 * The homepage teaser for each journey: an icon, one line, and the cafe it happens at.
 * All four are Nallagandla — Mini is a kiosk and has none of these rooms — and the card
 * says so rather than leaving it to be assumed.
 */
export type Teaser = {
  slug: Experience["slug"];
  name: string;
  line: string;
  where: string;
  /** Key for the inline icon drawn in _ui.tsx. No icon font, no dependency. */
  icon: "book" | "dice" | "chair" | "cup";
};

export const TEASERS: Teaser[] = [
  {
    slug: "read",
    name: "Read",
    line: "Borrow from the shelf and stay with it a while.",
    where: "Nallagandla",
    icon: "book",
  },
  {
    slug: "play",
    name: "Play",
    line: "Board games with all their pieces, in a room built for noise.",
    where: "Nallagandla",
    icon: "dice",
  },
  {
    slug: "stay",
    name: "Stay",
    line: "A socket at every table, and a garden to do nothing in.",
    where: "Nallagandla",
    icon: "chair",
  },
  {
    slug: "eat-drink",
    name: "Eat + Drink",
    line: "Wood-fired pizza after five, A2-milk coffee all day.",
    where: "Nallagandla",
    icon: "cup",
  },
];

/* ------------------------------------------------------------------- footer --- */

/** Operator details already recorded in the V1 location data, surfaced in the footer. */
export const LEGAL = [LOCATIONS.nallagandla, LOCATIONS.mini].map((l) => ({
  area: l.area,
  legalName: l.operator.legalName,
  gstin: l.operator.gstin,
}));
