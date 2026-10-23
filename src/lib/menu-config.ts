/**
 * What the menu component needs in order to render a menu.
 *
 * `Menu.tsx` used to read the Nallagandla data straight out of `menu-data.ts` at module
 * level, which made it a Nallagandla-only component. Mini has its own booklet — different
 * categories, different prices, a non-vegetarian kitchen and its own tax rule — so the
 * component now takes one of these objects instead. The rendering, the navigation and the
 * interaction are shared; only the content differs.
 *
 * Nallagandla's config is the default, so `/menu` behaves exactly as it did.
 */
import {
  addOns,
  baristaNote,
  dietaryLegend,
  highlightLegend,
  kitchenStatement,
  menuCategories,
  pairingsTagline,
  simplePairings,
  taxNote,
  type AddOn,
  type DietaryMarker,
  type HighlightMarker,
  type MenuCategory,
  type Pairing,
} from "./menu-data";
import { BASE_PATH } from "@/preview/design-preview-v4/_routes";
import {
  miniAddOns,
  miniBaristaNote,
  miniCategories,
  miniCombos,
  miniCombosTagline,
  miniDietaryLegend,
  miniHighlightLegend,
  miniKitchenStatement,
  miniTaxNote,
} from "./menu-data-mini";

export interface MenuContent {
  /** Which café this menu belongs to. Used for ids, labels and analytics-safe keys. */
  id: "nallagandla" | "mini";
  /** The café's name, as it should read in headings and download labels. */
  place: string;
  categories: MenuCategory[];
  /** Level-1 mobile tabs, in order. Ids are category ids or filter/offer view names. */
  mobileTabs: { id: string; label: string }[];
  /** Tabs that open a level-2 subcategory row rather than going straight to dishes. */
  departments: string[];
  /** Tabs that filter every item by a highlight marker instead of showing a category. */
  filterViews: Record<string, HighlightMarker>;
  /** Where the booklet's own section heading differs from the data file's key. */
  sectionHeading: Record<string, string>;
  dietaryLegend: { marker: DietaryMarker; label: string; meaning: string }[];
  highlightLegend: { marker: HighlightMarker; symbol: string; label: string; meaning: string }[];
  kitchenStatement: string;
  baristaNote: string;
  addOns: AddOn[];
  /** The heading for the add-ons block, which each booklet words its own way. */
  addOnsLabel: string;
  /**
   * The one-line strapline under "Our Menu". It states what the kitchen is, so it must not
   * be shared: Nallagandla is vegetarian with eggs, Mini serves chicken too.
   */
  strapline: string;
  taxNote: string;
  /** Offers: Nallagandla discounts two items you pick; Mini sells fixed combos. */
  offers: Pairing[];
  offersLabel: string;
  offersTagline: string;
  /** True when an offer's number is a total price rather than an amount saved. */
  offersArePriced: boolean;
  pdf: {
    /** Served from the site's own static assets; see public/menus/. */
    url: string;
    /** The booklet-specific wording on the download button. */
    label: string;
    /** Spelt out for screen readers, because "download" alone says nothing useful. */
    aria: string;
  };
}

export const nallagandlaMenu: MenuContent = {
  id: "nallagandla",
  place: "Nallagandla",
  categories: menuCategories,
  mobileTabs: [
    { id: "new", label: "NEW" },
    { id: "recommended", label: "Recommended" },
    { id: "favourite", label: "Favourite" },
    { id: "pairings", label: "Simple Pairings" },
    { id: "barista", label: "Barista" },
    { id: "kitchen", label: "Kitchen" },
    { id: "desserts", label: "Desserts" },
  ],
  departments: ["barista", "kitchen", "desserts"],
  filterViews: { new: "new", recommended: "recommended", favourite: "favourite" },
  sectionHeading: {
    "Hot Coffee": "Coffee · Hot",
    "Cold Coffee": "Coffee · Cold",
    "Tea, Matcha & Cold-Press": "Tea · Matcha · Cold-Press",
    "From the Fire — Pizza": "From the Fire · Pizza",
    "Mornings — All Day": "Mornings · All Day",
  },
  dietaryLegend,
  highlightLegend,
  kitchenStatement,
  baristaNote,
  addOns,
  addOnsLabel: "Make it yours",
  strapline: "A vegetarian kitchen, with eggs.",
  taxNote,
  offers: simplePairings,
  offersLabel: "Simple Pairings",
  offersTagline: pairingsTagline,
  offersArePriced: false,
  pdf: {
    /**
     * The legacy `/menu.pdf` is byte-identical to this file, and is left in place so any
     * link already printed or shared keeps working. This is the canonical path.
     */
    url: `${BASE_PATH}/menus/alley-pally-nallagandla.pdf`,
    label: "Take the Little Book Home",
    aria: "Download the full Alley Pally Nallagandla menu booklet as a PDF",
  },
};

export const miniMenu: MenuContent = {
  id: "mini",
  place: "Mini Alley Pally",
  categories: miniCategories,
  mobileTabs: [
    { id: "new", label: "NEW" },
    { id: "pairings", label: "Better Together" },
    { id: "barista", label: "Barista" },
    { id: "kitchen", label: "Kitchen" },
    { id: "desserts", label: "Desserts" },
  ],
  departments: ["barista", "kitchen", "desserts"],
  // Mini's booklet marks NEW items but prints no ◆ Favourite or ★ Recommended, so those
  // filter tabs are deliberately absent rather than shown empty.
  filterViews: { new: "new" },
  sectionHeading: {},
  dietaryLegend: miniDietaryLegend,
  highlightLegend: miniHighlightLegend,
  kitchenStatement: miniKitchenStatement,
  baristaNote: miniBaristaNote,
  addOns: miniAddOns,
  addOnsLabel: "Make it yours",
  strapline: "An express café at Pickleball Central. Veg, egg and chicken.",
  taxNote: miniTaxNote,
  offers: miniCombos,
  offersLabel: "Better Together",
  offersTagline: miniCombosTagline,
  offersArePriced: true,
  pdf: {
    url: `${BASE_PATH}/menus/mini-alley-pally.pdf`,
    label: "Your Next Pit Stop Starts Here",
    aria: "Download the full Mini Alley Pally menu booklet as a PDF",
  },
};
