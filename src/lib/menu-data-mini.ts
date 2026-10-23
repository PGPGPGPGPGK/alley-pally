/**
 * Mini Alley Pally's menu, transcribed from `Mini_Alley_Pally_Booklet (Oct 2026).pdf`
 * (20 pages; the menu itself runs across pages 7–17).
 *
 * Nothing here is inferred. Every name, price and description is the booklet's own wording,
 * and the dietary dot on each item is the one printed beside it.
 *
 * Mini is NOT Nallagandla, and the differences are deliberate:
 *   - it is not a vegetarian kitchen. The booklet's legend has three dots — Veg, Egg and
 *     Non-veg (chicken) — where Nallagandla's has Veg, Egg and Spicy.
 *   - its prices INCLUDE GST. Nallagandla's are exclusive of taxes.
 *   - "Better Together" sells eleven fixed-price combos. Nallagandla's Simple Pairings
 *     discount two items you choose yourself, so the number means something different.
 *   - the booklet prints no ◆ Favourite or ★ Recommended marks, so neither appears here.
 *   - Cold Milo carries a Milo badge in the booklet. It is a featured-product mark, not a
 *     dietary one, and it is Mini's alone.
 *
 * 63 items across 9 subcategories, plus 11 combos and 4 extras.
 */
import type { AddOn, DietaryMarker, HighlightMarker, MenuCategory, Pairing } from "./menu-data";

/* ------------------------------------------------------------- page 5 ------ */

export const miniDietaryLegend: { marker: DietaryMarker; label: string; meaning: string }[] = [
  { marker: "veg", label: "Veg", meaning: "Pure vegetarian." },
  { marker: "egg", label: "Egg", meaning: "Contains egg." },
  { marker: "nonveg", label: "Non-veg", meaning: "Chicken." },
];

export const miniHighlightLegend: {
  marker: HighlightMarker;
  symbol: string;
  label: string;
  meaning: string;
}[] = [
  { marker: "new", symbol: "NEW", label: "New", meaning: "Fresh on the menu — tell us what you think." },
];

export const miniKitchenStatement =
  "We keep off white sugar wherever we can. We serve veg, egg and non-veg — the dot tells you which. Tell us about allergies before you order.";

/* ------------------------------------------------------------- page 9 ------ */

export const miniBaristaNote =
  "Real beans, no powder, less sugar. If the cup isn't right, hand it back — the next one is on us.";

/* ------------------------------------------------------------- page 3 ------ */

export const miniAddOns: AddOn[] = [
  { name: "Extra espresso shot", price: 49 },
  { name: "Oat milk", price: 69 },
  { name: "Scoop of ice cream", price: 59 },
  { name: "Extra cheese on pizza", price: 79 },
];

/** Mini's booklet is explicit: "every price in this book is final. GST is included." */
export const miniTaxNote = "All prices include GST. Nothing extra at the counter.";

/* ------------------------------------------------------------- page 7 ------ */

/**
 * Fixed-price combos, not discounts. `savings` carries the combo's total price, and the
 * menu renders it as a price because `offersArePriced` is set for Mini.
 */
export const miniCombos: Pairing[] = [
  { name: "Omelette + Toast + Coffee", savings: 249, detail: "" },
  { name: "Maggi + Cold Coffee", savings: 229, detail: "" },
  { name: "Peri Peri Fries + 2 Lemonades", savings: 299, detail: "" },
  { name: "Nuggets + Fries + Cooler", savings: 349, detail: "" },
  { name: "Burger + Cooler", savings: 349, detail: "" },
  { name: "Chicken Rice Bowl + Lemonade", savings: 299, detail: "" },
  { name: "Sandwich + Cooler", savings: 329, detail: "" },
  { name: "Brownie + Coffee", savings: 269, detail: "" },
  { name: "Big Breakfast + Coffee", savings: 449, detail: "" },
  { name: "Veg Pizza + 2 Coolers", savings: 549, detail: "" },
  { name: "Chicken Pizza + Garlic Bread + 2 Coolers", savings: 699, detail: "" },
];

export const miniCombosTagline =
  "Every one of these is priced below the sum of its parts. Built for one hungry player, or two.";

/* ------------------------------------------------------- pages 10–17 ------ */

export const miniCategories: MenuCategory[] = [
  {
    id: "barista",
    name: "Barista",
    icon: "☕",
    blurb: miniBaristaNote,
    subcategories: [
      {
        name: "Hot Coffee",
        tagline: "From 7 AM",
        items: [
          { name: "Espresso", price: 89, desc: "A single clean shot. Nothing to hide behind.", dietary: ["veg"] },
          { name: "Americano", price: 119, dietary: ["veg"] },
          { name: "Cappuccino", price: 149, desc: "Steamed milk and a full third of foam.", dietary: ["veg"] },
          { name: "Flat White", price: 159, dietary: ["veg"] },
          { name: "Cafe Latte", price: 149, dietary: ["veg"] },
          { name: "Cafe Mocha", price: 179, desc: "Espresso, real chocolate, steamed milk.", dietary: ["veg"] },
          { name: "Flavoured Latte", price: 189, desc: "Hazelnut, vanilla or caramel. Real syrup.", dietary: ["veg"] },
        ],
      },
      {
        name: "Cold Coffee",
        items: [
          { name: "Iced Americano", price: 129, dietary: ["veg"] },
          { name: "Classic Cold Coffee", price: 169, desc: "Our house pour.", dietary: ["veg"] },
          { name: "Cold Milo", price: 169, desc: "Cold, thick, and proper.", dietary: ["veg"], badge: "milo" },
          {
            name: "Cranberry Espresso",
            price: 169,
            desc: "Espresso, cranberry, soda. Our signature.",
            dietary: ["veg"],
            highlights: ["new"],
          },
          {
            name: "Orange Espresso",
            price: 169,
            desc: "Espresso over fresh orange and soda.",
            dietary: ["veg"],
            highlights: ["new"],
          },
          {
            name: "Iced Vietnamese",
            price: 169,
            desc: "Strong coffee over condensed milk.",
            dietary: ["veg"],
            highlights: ["new"],
          },
        ],
      },
      {
        name: "Shakes",
        items: [
          {
            name: "Strawberry Milkshake",
            price: 169,
            desc: "Real strawberry, blended thick.",
            dietary: ["veg"],
            highlights: ["new"],
          },
          { name: "Chocolate Milkshake", price: 189, dietary: ["veg"] },
          { name: "Oreo Milkshake", price: 209, dietary: ["veg"] },
          { name: "KitKat Milkshake", price: 229, dietary: ["veg"] },
          { name: "Brownie Shake", price: 219, desc: "A whole brownie blended in.", dietary: ["veg"] },
          {
            name: "Ferrero Rocher Milkshake",
            price: 269,
            desc: "The one that gets photographed.",
            dietary: ["veg"],
          },
        ],
      },
      {
        name: "Lemonade, Coolers & Tea",
        items: [
          { name: "Fresh Lime Soda", price: 89, dietary: ["veg"] },
          { name: "Electrolyte Lemonade", price: 109, desc: "Built for the court.", dietary: ["veg"] },
          { name: "Mint Lemonade", price: 119, dietary: ["veg"] },
          { name: "Strawberry Lemonade", price: 149, dietary: ["veg"] },
          { name: "Green Apple Lemonade", price: 149, dietary: ["veg"] },
          { name: "Watermelon Mint Lemonade", price: 149, dietary: ["veg"] },
          { name: "Virgin Mojito", price: 159, dietary: ["veg"] },
          { name: "Peach Iced Tea", price: 139, dietary: ["veg"] },
          { name: "Classic Hot Chocolate", price: 159, dietary: ["veg"] },
        ],
      },
    ],
  },
  {
    id: "kitchen",
    name: "Kitchen",
    icon: "🔥",
    blurb:
      "Loaded bites, wood-fired pizza and proper meals — fast enough to catch between games, good enough to sit for.",
    subcategories: [
      {
        name: "Maggi, Eggs & Bites",
        tagline: "All day",
        items: [
          { name: "Plain Maggi", price: 89, dietary: ["veg"] },
          { name: "Masala Maggi", price: 119, dietary: ["veg"] },
          { name: "Egg Maggi", price: 139, dietary: ["egg"] },
          { name: "Boiled Eggs · 4", price: 99, dietary: ["egg"] },
          { name: "Bread Omelette", price: 119, dietary: ["egg"] },
        ],
      },
      {
        name: "Fries & Starters",
        items: [
          { name: "French Fries", price: 99, dietary: ["veg"] },
          { name: "Peri Peri Fries", price: 139, dietary: ["veg"] },
          { name: "Cheesy Loaded Fries", price: 199, dietary: ["veg"] },
          { name: "Chicken Nuggets", price: 159, dietary: ["nonveg"] },
          { name: "Chicken Popcorn", price: 189, dietary: ["nonveg"] },
          { name: "Peri Peri Chicken Wings · 6", price: 269, dietary: ["nonveg"] },
        ],
      },
      {
        name: "Wood Fired Pizza",
        tagline: "Ten inch · from 5 PM",
        note: "Two flavours in one? Any pizza, half & half — pick two, we'll split it. The fire is lit at four; the first pizza leaves at five.",
        items: [
          { name: "Margherita", price: 249, desc: "San Marzano, fior di latte, basil.", dietary: ["veg"] },
          { name: "Farmhouse", price: 299, desc: "Onion, capsicum, mushroom, tomato.", dietary: ["veg"] },
          {
            name: "Honey Chilli",
            price: 279,
            desc: "Sweet heat — honey, chilli, peppers, mozzarella.",
            dietary: ["veg"],
            highlights: ["new"],
          },
          {
            name: "Mushroom",
            price: 329,
            desc: "Sautéed mushrooms, mozzarella, garlic & thyme.",
            dietary: ["veg"],
          },
          { name: "Paneer Tikka", price: 329, dietary: ["veg"] },
          { name: "Chicken Tikka", price: 329, dietary: ["nonveg"] },
          { name: "Peri Peri Chicken", price: 349, dietary: ["nonveg"] },
          { name: "Garlic Bread", price: 149, dietary: ["veg"] },
          { name: "Cheese Garlic Bread", price: 189, dietary: ["veg"] },
        ],
      },
      {
        name: "Rice Bowls",
        items: [
          {
            name: "Butter Chicken Rice Bowl",
            price: 249,
            desc: "Makhani chicken over steamed rice.",
            dietary: ["nonveg"],
          },
          { name: "Paneer Makhani Bowl", price: 219, desc: "Steamed rice or millet.", dietary: ["veg"] },
        ],
      },
      {
        name: "Burgers & Sandwiches",
        tagline: "With fries & slaw",
        items: [
          { name: "Classic Veg Burger", price: 149, dietary: ["veg"] },
          { name: "Grilled Veg & Cheese", price: 199, dietary: ["veg"] },
          { name: "Crispy Chicken Burger", price: 249, dietary: ["nonveg"] },
          { name: "Chicken Tikka Sandwich", price: 249, dietary: ["nonveg"] },
          { name: "Peri Peri Grilled Chicken Burger", price: 269, dietary: ["nonveg"] },
        ],
      },
      {
        name: "Breakfast",
        tagline: "7 – 11:30 AM",
        items: [
          {
            name: "The Big Breakfast",
            price: 379,
            desc: "Eggs, chicken sausage, mushrooms, beans, tomato, hash brown, toast.",
            dietary: ["nonveg"],
          },
          {
            name: "The Garden Breakfast",
            price: 299,
            desc: "Eggs, mushrooms, baked beans, grilled tomato, hash brown and toast. No meat.",
            dietary: ["egg"],
          },
          { name: "French Toast", price: 199, dietary: ["egg"] },
          { name: "Cheese Omelette & Toast", price: 179, dietary: ["egg"] },
          { name: "Masala Omelette & Toast", price: 149, dietary: ["egg"] },
          { name: "Chilli Cheese Toast", price: 149, dietary: ["veg"] },
        ],
      },
    ],
  },
  {
    id: "desserts",
    name: "Desserts",
    icon: "🍰",
    blurb: "Somebody has to sit while the others play. Something sweet makes it worth it.",
    subcategories: [
      {
        name: "Sweet",
        note: "Add a scoop of ice cream +59 to any dessert. Our brownies and bakes are made fresh for us by Harika & Crumb · artisanal desserts.",
        items: [
          { name: "Chocolate Brownie", price: 149, desc: "Dense and fudgy. Warm, if you ask.", dietary: ["veg"] },
          {
            name: "Brownie with Ice Cream",
            price: 199,
            desc: "Warm brownie, a cold scoop. Always works.",
            dietary: ["veg"],
          },
        ],
      },
    ],
  },
];
