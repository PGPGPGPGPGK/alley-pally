// Preview-only data. A prototype of the two-location model proposed in the
// takeover plan (BRAND + Location + embedded LegalEntity) — kept inside
// design-preview/ so nothing production imports it. When the model is approved
// this moves to src/lib/locations.ts and loses the "preview" framing.

export interface LegalEntity {
  legalName: string;
  gstin: string;
}

export interface PreviewLocation {
  slug: "nallagandla" | "mini";
  name: string;
  area: string;
  tagline: string;
  address: string;
  mapsUrl: string;
  phone: string;
  phoneDisplay: string;
  whatsapp: string;
  hours: string;
  operator: LegalEntity;
  /** null = no confirmed photo in the repo, render a pink placeholder. */
  heroImage: string | null;
}

export const BRAND = {
  name: "Alley Pally",
  email: "hi@alleypallycafe.com",
  instagram: "https://www.instagram.com/alleypally/",
  logo: "/images/logo-nav.png",
} as const;

export const LOCATIONS: Record<PreviewLocation["slug"], PreviewLocation> = {
  nallagandla: {
    slug: "nallagandla",
    name: "Alley Pally",
    area: "Nallagandla",
    tagline: "The original. Books, board games, and a wood-fired oven.",
    address: "F893+3J, HUDA Layout, Nallagandla, Hyderabad, Telangana 500019",
    mapsUrl: "https://maps.google.com/?q=Alley+Pally+Cafe+Nallagandla+Hyderabad",
    phone: "+919032694008",
    phoneDisplay: "+91 90326 94008",
    whatsapp: "https://wa.me/919032694008",
    hours: "Daily · 6:00 AM – 10:00 PM",
    operator: { legalName: "Snowflake Enterprises", gstin: "36AFNFS2231R1ZC" },
    heroImage: "/images/hero-poster.jpg",
  },
  mini: {
    slug: "mini",
    name: "Mini Alley Pally",
    area: "Parvathapur",
    tagline: "The second room. Same coffee, its own menu.",
    address: "9JR7+FG6, Parvathapur, Hyderabad, Telangana 500039",
    mapsUrl: "https://maps.google.com/?q=9JR7%2BFG6+Parvathapur+Hyderabad",
    phone: "+919032694008",
    phoneDisplay: "+91 90326 94008",
    whatsapp: "https://wa.me/919032694008",
    hours: "Daily · 7:00 AM – 11:00 PM",
    operator: { legalName: "Riverstone Enterprises", gstin: "36ABNFR5740C1Z4" },
    // No confirmed Mini photography exists in the repo.
    heroImage: null,
  },
};

/** Three only — the brand homepage caps reviews so the footer stays reachable. */
export const REVIEWS = [
  {
    quote:
      "It was wonderfully calm for a Saturday brunch. Loved the place, the food, and the relaxed atmosphere.",
    name: "Vandana Negi",
    meta: "Local Guide · 57 reviews",
    avatar: "VN",
  },
  {
    quote:
      "The Wood Fired Paneer Tikka Pizza is a must try. Great book collection and we even learned a new board game.",
    name: "Ravi Roshan Singh",
    meta: "Local Guide · 4 reviews",
    avatar: "RS",
  },
  {
    quote:
      "As a family of book & board game lovers, this place deserves a wow. Has become an absolute favourite hangout for us!",
    name: "neeha u",
    meta: "Google Review · 5 reviews",
    avatar: "NU",
  },
];

/** Confirmed Nallagandla photography already in the repo. */
export const NALLAGANDLA_GALLERY = [
  { src: "/images/gallery/2.jpg", ratio: "16/9" },
  { src: "/images/gallery/5.jpg", ratio: "4/3" },
  { src: "/images/gallery/3.jpg", ratio: "2/3" },
  { src: "/images/gallery/7.jpg", ratio: "4/3" },
  { src: "/images/gallery/9.jpg", ratio: "4/5" },
  { src: "/images/gallery/8.jpg", ratio: "2/3" },
];

export const REELS = [
  "/images/reels/DXg6WWtjaJa.jpg",
  "/images/reels/DY9qUjKvsNv.jpg",
  "/images/reels/DZPzPEsNFSM.jpg",
  "/images/reels/DYrg0ERzobJ.jpg",
  "/images/reels/DZSOUwVB0qt.jpg",
  "/images/reels/DZTA3ibzVwE.jpg",
];
