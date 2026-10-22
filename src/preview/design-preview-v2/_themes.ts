/**
 * Three colour versions of the same V2 site.
 *
 * `globals.css` declares its Tailwind colours as `@theme inline` aliases of `--pally-*`
 * custom properties, so overriding those properties on a wrapper element re-themes every
 * component inside it. That is why there is no themed copy of any component: the pages,
 * cards, nav and footer are the same files in all three versions, and only the variables
 * underneath them change.
 *
 * All three keep the same anchor brown (#4A2218, sampled from the cafe's own woodwork) so
 * the brand stays recognisable. Supporting tokens are derived from it.
 *
 * Contrast: every token used for text is checked against all three of its surfaces — page,
 * alt section and card — at >= 4.5:1. The palette page computes and prints those ratios, so
 * the table there cannot drift from these values.
 *
 * Where the brief's colour could not carry small text (terracotta #C4724E at 3.2:1, amber
 * #DE732F at 2.9:1, leaf #5C7A52 at 4.3:1), the text token is a darkened version and the
 * brief's own colour is kept as `accent-light` for decorative use. Flagged in the report.
 */

export type ThemeId = "warm-clay" | "garden-shade" | "slow-morning";

export type ThemeDef = {
  id: ThemeId;
  name: string;
  idea: string;
  /** Shown on the switcher. */
  dot: string;
  /** The four colours the brief specified, for the palette page. */
  brief: { role: string; hex: string }[];
  /** `--pally-*` overrides. Keys without the prefix. */
  vars: Record<string, string>;
};

const ANCHOR = "#4A2218";

export const THEMES: ThemeDef[] = [
  {
    id: "warm-clay",
    name: "Warm Clay",
    idea: "Expressive and earthy. The reddish-brown surfaces of the actual cafe, turned down until they can hold text.",
    dot: "#8E2106",
    brief: [
      { role: "Signature brown", hex: ANCHOR },
      { role: "Reddish wall/clay", hex: "#8E2106" },
      { role: "Terracotta accent", hex: "#C4724E" },
      { role: "Warm cream", hex: "#F7F1EA" },
    ],
    vars: {
      cream: "#F7F1EA",
      warm: "#EDE1D5",
      white: "#FFFCF8",
      sand: "#E2D3C4",
      "brown-dark": ANCHOR,
      brown: "#6B3426",
      "brown-light": "#895949",
      charcoal: "#2F110D",
      // Primary action. The wall red, which carries white at 8.9:1.
      green: "#8E2106",
      "green-dark": "#6E1804",
      "green-light": "#D9A08C",
      // Kickers and labels: darkened terracotta, 4.9:1 on cream.
      accent: "#A14D2A",
      "accent-light": "#C4724E",
      "accent-bg": "#F3DED3",
      gold: "#B57A2A",
      "gold-light": "#EBD9B8",
      overlay: "rgba(47, 17, 13, 0.60)",
      "overlay-heavy": "rgba(47, 17, 13, 0.80)",
    },
  },
  {
    id: "garden-shade",
    name: "Garden Shade",
    idea: "Botanical and calm. The brown read against the backyard planting instead of against orange.",
    dot: "#5C7A52",
    brief: [
      { role: "Signature brown", hex: ANCHOR },
      { role: "Leaf green", hex: "#5C7A52" },
      { role: "Moss green", hex: "#3F5438" },
      { role: "Warm cream", hex: "#F7F1EA" },
    ],
    vars: {
      cream: "#F7F1EA",
      warm: "#E4E6DB",
      white: "#FDFCF7",
      sand: "#CFD3C2",
      "brown-dark": ANCHOR,
      brown: "#5E3326",
      "brown-light": "#74634F",
      charcoal: "#2A1A12",
      // Primary action. Moss, white at 8.3:1.
      green: "#3F5438",
      "green-dark": "#2E3F28",
      "green-light": "#5C7A52",
      // Leaf itself is 4.3:1, just short. Darkened one step for text.
      accent: "#4C6943",
      "accent-light": "#5C7A52",
      "accent-bg": "#DFE5D6",
      gold: "#9A7B3A",
      "gold-light": "#E0D5AE",
      overlay: "rgba(32, 40, 28, 0.60)",
      "overlay-heavy": "rgba(32, 40, 28, 0.80)",
    },
  },
  {
    id: "slow-morning",
    name: "Slow Morning",
    idea: "Lighter and morning-oriented. Warm lamp light at 8 AM, amber rather than red.",
    dot: "#DE732F",
    brief: [
      { role: "Signature brown", hex: ANCHOR },
      { role: "Amber", hex: "#DE732F" },
      { role: "Ochre", hex: "#B98B4E" },
      { role: "Warm ivory", hex: "#FAF6EF" },
    ],
    vars: {
      cream: "#FAF6EF",
      warm: "#F2E8D8",
      white: "#FFFDFA",
      sand: "#E6D8C0",
      "brown-dark": ANCHOR,
      brown: "#6A4030",
      "brown-light": "#806348",
      charcoal: "#331A12",
      // Amber cannot carry white text (2.9:1), so the primary action stays the
      // anchor brown and amber does the accenting.
      green: ANCHOR,
      "green-dark": "#35170F",
      "green-light": "#E8B98A",
      // Darkened amber, 5.0:1 on ivory.
      accent: "#A84E13",
      "accent-light": "#DE732F",
      "accent-bg": "#F7E3CF",
      gold: "#B98B4E",
      "gold-light": "#EEDDBC",
      overlay: "rgba(51, 26, 18, 0.60)",
      "overlay-heavy": "rgba(51, 26, 18, 0.80)",
    },
  },
];

export const themeById = (id: string) => THEMES.find((t) => t.id === id);

/** The inline style that re-themes everything beneath it. */
export const themeStyle = (t: ThemeDef) =>
  Object.fromEntries(
    Object.entries(t.vars).map(([k, v]) => [`--pally-${k}`, v]),
  ) as React.CSSProperties;
