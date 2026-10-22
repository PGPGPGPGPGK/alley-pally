/**
 * Routes for the static preview.
 *
 * In the working app these pages live under /design-preview-v4/*. Published for review
 * they sit at the root of their own site, so the homepage opens at the Pages URL itself
 * rather than at a nested preview path. Next prepends the `basePath` from next.config.ts
 * to every one of these, so they are written here without it.
 *
 * The three links that point at the real website are absolute on purpose: the menu is
 * pinned by printed QR codes and must keep resolving to the live page, and the legal and
 * library pages already exist there. Nothing in this preview duplicates them.
 */
/**
 * Must match `basePath` in next.config.ts. Needed for raw asset attributes that Next does
 * not rewrite — the <video poster> on the Nallagandla page is the only one.
 */
export const BASE_PATH = "/alley-pally";

export const V4 = "";

/** The homepage. The logo and every "home" action land here. */
export const HOME = "/";

export const LIVE_SITE = "https://alleypallycafe.com";

export const ROUTES = {
  home: HOME,
  nallagandla: "/nallagandla",
  mini: "/mini",
  events: "/events",
  experience: (slug: string) => `/experience/${slug}`,
  /** The live menu, deliberately: printed QR codes depend on it. */
  menu: `${LIVE_SITE}/menu`,
  library: `${LIVE_SITE}/library`,
  about: `${LIVE_SITE}/about`,
  privacy: `${LIVE_SITE}/privacy`,
  terms: `${LIVE_SITE}/terms`,
  instagram: "https://www.instagram.com/alleypally/",
};

/**
 * The active experience journeys. Stay was retired: its quiet-reading half is on Read and
 * its work-friendly half is the "Work From Here" tile on the Nallagandla page.
 */
export const ACTIVE_JOURNEYS = ["read", "play", "eat-drink"] as const;
export type ActiveJourney = (typeof ACTIVE_JOURNEYS)[number];

/**
 * The public navigation. No Home item — the logo is the way back — and no top-level Menu
 * item, because menu discovery lives inside Eat + Drink.
 */
export type NavGroup = {
  label: string;
  href?: string;
  items?: { label: string; href: string; note?: string }[];
};

export const NAV: NavGroup[] = [
  {
    label: "Locations",
    items: [
      { label: "Nallagandla", href: ROUTES.nallagandla, note: "The main café" },
      { label: "Mini Alley Pally", href: ROUTES.mini, note: "The kiosk at Pickleball Central" },
    ],
  },
  {
    label: "Explore",
    items: [
      { label: "Read", href: ROUTES.experience("read") },
      { label: "Play", href: ROUTES.experience("play") },
      { label: "Eat + Drink", href: ROUTES.experience("eat-drink") },
    ],
  },
  { label: "Events", href: ROUTES.events },
];
