/**
 * Menu content, transcribed from the client-approved PDF `Alley-Pally-Menu-A5.pdf`
 * (A5 booklet, 24 pages, pages 12–23 carry the menu itself).
 *
 * Nothing here is inferred. Every name, price and description is the PDF's own wording.
 *
 * Markers: the PDF's legend (page 11) defines six marks — Veg, Egg, Spicy, ◆ Favourite,
 * ★ Recommended and NEW. The last three are printed as text and their counts here reconcile
 * exactly with the PDF (29 ◆, 8 ★, 20 NEW). The dietary marks are printed as small coloured
 * dots — vector art, invisible to text extraction — so they were read out of the PDF's
 * content streams by colour and position and matched to the item on the same baseline:
 * green rgb(62,125,46) = veg, amber rgb(217,142,4) = egg, red rgb(192,57,43) = spicy.
 * 119 dots were found and all 119 matched: every one of the 108 items carries exactly one
 * base dot (95 veg, 13 egg) and 11 items additionally carry the spicy dot. Nothing is
 * inferred from ingredients.
 */

/**
 * Dietary marks.
 *
 * `veg`, `egg` and `spicy` are Nallagandla's legend (page 11). `nonveg` belongs to Mini,
 * which is not a vegetarian kitchen — its booklet's legend is Veg, Egg and Non-veg. The
 * union is shared so one component can render both; each menu shows only the marks its own
 * booklet prints.
 */
export type DietaryMarker = "veg" | "egg" | "spicy" | "nonveg";

/** Recommendation marks from the PDF legend, page 11. */
export type HighlightMarker = "favourite" | "recommended" | "new";

export interface MenuItem {
  name: string;
  /** Rupees, exclusive of taxes, exactly as printed. */
  price: number;
  desc?: string;
  /** Only what the PDF itself states for this item. */
  dietary?: DietaryMarker[];
  highlights?: HighlightMarker[];
  /**
   * A featured-product mark, not a dietary or recommendation one. Mini's booklet puts a
   * Milo badge on Cold Milo; nothing on the Nallagandla menu carries a badge.
   */
  badge?: "milo";
}

export interface MenuSubCategory {
  name: string;
  /** The PDF's line under the group heading. */
  tagline?: string;
  /** Longer explanatory copy printed with the group (e.g. how the pizza is baked). */
  note?: string;
  items: MenuItem[];
}

export interface MenuCategory {
  id: string;
  name: string;
  icon: string;
  /** The PDF's section epigraph. */
  blurb?: string;
  subcategories: MenuSubCategory[];
}

/** A pairing is an offer, not a dish: it discounts two items you choose yourself. */
export interface Pairing {
  name: string;
  /** Rupees taken off when the two are ordered together. */
  savings: number;
  detail: string;
}

export interface AddOn {
  name: string;
  price: number;
}

/* ------------------------------------------------------------ page 11 ------ */

export const dietaryLegend: { marker: DietaryMarker; label: string; meaning: string }[] = [
  { marker: "veg", label: "Veg", meaning: "Pure vegetarian." },
  { marker: "egg", label: "Egg", meaning: "Contains egg." },
  { marker: "spicy", label: "Spicy", meaning: "A little heat." },
];

export const highlightLegend: { marker: HighlightMarker; symbol: string; label: string; meaning: string }[] = [
  { marker: "favourite", symbol: "◆", label: "Favourite", meaning: "The ones our guests keep coming back for." },
  { marker: "recommended", symbol: "★", label: "Recommended", meaning: "What we would order, sitting where you are." },
  { marker: "new", symbol: "NEW", label: "New", meaning: "Fresh on the menu. Tell us what you think." },
];

export const kitchenStatement =
  "We are a vegetarian kitchen, with eggs — and we chose it on purpose. It is lighter on the body, far gentler on the planet (a plant-and-egg plate uses a fraction of the water and land of a meat one), and, done well, it wants for nothing. Everything here is vegetarian unless it says it contains egg. Tell us about allergies before you order — the kitchen is a shared space.";

/** "Make it yours", page 11. */
export const addOns: AddOn[] = [
  { name: "Oat / Almond milk", price: 85 },
  { name: "Add a fried egg to anything", price: 120 },
  { name: "Side bread, two warm slices", price: 80 },
  { name: "Garlic bread", price: 250 },
];

export const taxNote = "All prices are exclusive of taxes.";

export const baristaNote =
  "We keep off white sugar wherever we can — it is no friend of the body. And we pour A2 milk: only the easy-to-digest A2 protein, gentle on the stomach and rich in calcium and protein.";

/* ------------------------------------------------------------ page 12 ------ */

/** Ten offers. Each takes money off two items the guest picks — no fixed combo price. */
export const simplePairings: Pairing[] = [
  { name: "Pizza & Cold Coffee", savings: 100, detail: "Any pizza + our OG Cold Coffee" },
  { name: "Pizza & Dessert", savings: 100, detail: "Any pizza + any dessert" },
  { name: "Bites & Dessert", savings: 70, detail: "Any starter + any dessert" },
  { name: "Bites & Cold Coffee", savings: 70, detail: "Any starter + our OG Cold Coffee" },
  { name: "Fries & Shake", savings: 70, detail: "Peri Peri Fries + any milkshake" },
  { name: "Pasta & Garlic Bread", savings: 90, detail: "Any pasta + warm garlic bread" },
  { name: "Wrap & Cold-Press", savings: 60, detail: "Any wrap + any cold-press juice" },
  { name: "Eggs & Coffee", savings: 60, detail: "Any eggs or omelette + any hot coffee" },
  { name: "Waffle & Coffee", savings: 60, detail: "Any waffle + any coffee" },
  { name: "Cookie & Coffee", savings: 40, detail: "Any cookie + any coffee" },
];

export const pairingsTagline = "our favourites go well in twos";

/* ------------------------------------------------------- pages 13–23 ------ */

export const menuCategories: MenuCategory[] = [
  {
    id: "barista",
    name: "Barista",
    icon: "☕",
    blurb: "To sip, slowly.",
    subcategories: [
      {
        name: "Hot Coffee",
        items: [
          { name: "Espresso", price: 150, dietary: ["veg"] },
          { name: "Americano", price: 190, dietary: ["veg"] },
          { name: "Long Black", price: 190, dietary: ["veg"] },
          { name: "Flat White", price: 220, dietary: ["veg"] },
          {
            name: "Cappuccino",
            price: 220,
            dietary: ["veg"],
            highlights: ["favourite", "recommended"],
          },
          { name: "Latte", price: 240, dietary: ["veg"] },
          {
            name: "Spanish Latte",
            price: 260,
            desc: "Coffee, condensed milk, vanilla.",
            dietary: ["veg"],
            highlights: ["favourite"],
          },
          {
            name: "Vietnamese Latte",
            price: 200,
            desc: "Coffee and condensed milk, a quiet classic.",
            dietary: ["veg"],
          },
          { name: "Mocha", price: 270, dietary: ["veg"] },
          { name: "Nutella Mocha", price: 290, dietary: ["veg"], highlights: ["favourite"] },
          { name: "Hazelnut Latte", price: 300, dietary: ["veg"] },
          { name: "Vanilla Latte", price: 300, dietary: ["veg"] },
          { name: "Pistachio Latte", price: 300, dietary: ["veg"] },
        ],
      },
      {
        name: "Cold Coffee",
        items: [
          {
            name: "Alley Pally OG Cold Coffee",
            price: 340,
            desc: "Our house recipe. The one we are proud of.",
            dietary: ["veg"],
            highlights: ["favourite", "recommended"],
          },
          {
            name: "Vietnamese Iced Coffee",
            price: 220,
            desc: "Smooth, naturally sweet.",
            dietary: ["veg"],
            highlights: ["favourite", "recommended"],
          },
          { name: "Iced Americano", price: 200, dietary: ["veg"] },
          { name: "Iced Latte", price: 260, dietary: ["veg"] },
          { name: "Hazelnut Iced Latte", price: 290, dietary: ["veg"], highlights: ["favourite"] },
          { name: "Vanilla Iced Latte", price: 290, dietary: ["veg"] },
          {
            name: "Classic Cold Brew",
            price: 230,
            desc: "Slow-steeped, bold, balanced.",
            dietary: ["veg"],
          },
          { name: "Orange Cold Brew", price: 300, dietary: ["veg"] },
          { name: "Cranberry Cold Brew", price: 300, dietary: ["veg"] },
          { name: "Hazelnut Cream Cold Brew", price: 330, dietary: ["veg"] },
        ],
      },
      {
        name: "Tea, Matcha & Cold-Press",
        items: [
          {
            name: "Hot Chocolate",
            price: 260,
            desc: "Real chocolate, hot milk, a little patience.",
            dietary: ["veg"],
            highlights: ["favourite"],
          },
          {
            name: "Strawberry Matcha",
            price: 350,
            desc: "Soft, sweet, very green. Cold.",
            dietary: ["veg"],
            highlights: ["favourite"],
          },
          {
            name: "Orange Matcha",
            price: 330,
            desc: "Matcha, lifted with bright orange. Cold.",
            dietary: ["veg"],
            highlights: ["new"],
          },
          {
            name: "Iced Matcha Latte",
            price: 320,
            desc: "Matcha and cold milk over ice.",
            dietary: ["veg"],
            highlights: ["new"],
          },
          {
            name: "Kashmiri Kahwa",
            price: 150,
            desc: "Saffron, spice, Himalayan warmth.",
            dietary: ["veg"],
          },
          { name: "Mint Chamomile", price: 150, dietary: ["veg"] },
          {
            name: "Orange Cold-Press",
            price: 250,
            desc: "Pressed fresh, nothing added.",
            dietary: ["veg"],
            highlights: ["favourite"],
          },
          {
            name: "Pineapple Cold-Press",
            price: 250,
            desc: "Sweet, bright, pressed fresh.",
            dietary: ["veg"],
            highlights: ["new"],
          },
          {
            name: "ABC Cold-Press",
            price: 250,
            desc: "Apple, beetroot, carrot. Earthy and clean.",
            dietary: ["veg"],
            highlights: ["new"],
          },
          {
            name: "Watermelon Cold-Press",
            price: 220,
            desc: "Sweet, light, very cold.",
            dietary: ["veg"],
          },
          { name: "Kids Hot Chocolate", price: 190, dietary: ["veg"] },
          { name: "Packaged Water", price: 100, dietary: ["veg"] },
        ],
      },
      {
        name: "Shakes",
        items: [
          {
            name: "Brownie Milkshake",
            price: 340,
            desc: "A whole brownie, blended in.",
            dietary: ["veg"],
            highlights: ["favourite"],
          },
          { name: "Chocolate Milkshake", price: 320, dietary: ["veg"], highlights: ["favourite"] },
          { name: "Strawberry Milkshake", price: 340, dietary: ["veg"] },
          {
            name: "Ferrero Rocher Shake",
            price: 380,
            desc: "Hazelnut, chocolate, a golden crunch on top.",
            dietary: ["veg"],
          },
          {
            name: "Cold Milo",
            price: 230,
            desc: "The childhood drink, cold and thick.",
            dietary: ["veg"],
            highlights: ["new"],
          },
        ],
      },
      {
        name: "Iced Teas",
        items: [
          {
            name: "Lemon Iced Tea",
            price: 280,
            desc: "The reset button after a long day.",
            dietary: ["veg"],
            highlights: ["favourite"],
          },
          { name: "Peach Iced Tea", price: 280, dietary: ["veg"] },
          { name: "Watermelon Iced Tea", price: 280, dietary: ["veg"] },
        ],
      },
    ],
  },
  {
    id: "kitchen",
    name: "Kitchen",
    icon: "🔥",
    blurb: "From the fire, and the press.",
    subcategories: [
      {
        name: "Continental Starters",
        tagline: "To share while you settle in.",
        items: [
          {
            name: "Bruschetta",
            price: 260,
            desc: "Garlic bread, fresh tomato, basil, olive oil.",
            dietary: ["veg"],
          },
          {
            name: "Cheesy Mushroom Bruschetta",
            price: 320,
            desc: "Four pieces · grilled bread, garlic mushrooms, melted cheese.",
            dietary: ["veg"],
            highlights: ["new"],
          },
          {
            name: "Peri Peri Potato Wedges",
            price: 240,
            desc: "Chunky wedges, peri seasoning, a cool dip.",
            dietary: ["veg", "spicy"],
            highlights: ["new"],
          },
          {
            name: "Falafel with Hummus",
            price: 340,
            desc: "Crisp falafel, warm hummus dip.",
            dietary: ["veg"],
            highlights: ["new"],
          },
          {
            name: "Peri Peri Mozzarella Cheese Sticks",
            price: 290,
            desc: "Crumb-fried mozzarella, a peri peri dust.",
            dietary: ["veg", "spicy"],
            highlights: ["new"],
          },
          {
            name: "Mixed Veg Lollipop",
            price: 290,
            desc: "Crisp veg lollipops, sweet-chilli dip.",
            dietary: ["veg"],
            highlights: ["new"],
          },
        ],
      },
      {
        name: "From the Fire — Pizza",
        tagline: "Ten inch · 00 flour",
        note:
          "Wood-fired from 5 PM for a lighter, crisper crust that sits easy; the regular oven before 5, same flavours.",
        items: [
          {
            name: "Margherita Pizza",
            price: 480,
            desc: "Tomato, mozzarella, basil.",
            dietary: ["veg"],
          },
          {
            name: "Mexican Pizza",
            price: 550,
            desc: "Capsicum, broccoli, sweet corn, jalapeno, olives.",
            dietary: ["veg"],
            highlights: ["favourite"],
          },
          {
            name: "Farmhouse Pizza",
            price: 550,
            desc: "Capsicum, sweet corn, olives, onions.",
            dietary: ["veg"],
            highlights: ["favourite", "recommended"],
          },
          {
            name: "Mushroom Pizza",
            price: 550,
            desc: "Sautéed mushrooms, garlic.",
            dietary: ["veg"],
          },
          {
            name: "Paneer Tikka Pizza",
            price: 550,
            desc: "Marinated paneer, capsicum.",
            dietary: ["veg"],
            highlights: ["favourite"],
          },
          {
            name: "Pesto Cream Cheese Pizza",
            price: 580,
            desc: "Pesto, mozzarella, cream cheese.",
            dietary: ["veg"],
            highlights: ["new"],
          },
          {
            name: "Peri Peri Paneer Kheema Pizza",
            price: 580,
            desc: "Grated paneer, onions, a spicy kick.",
            dietary: ["veg", "spicy"],
            highlights: ["new"],
          },
          {
            name: "Pesto Peri Peri Paneer Pizza",
            price: 650,
            desc: "Pesto, spiced paneer kheema.",
            dietary: ["veg", "spicy"],
            highlights: ["new"],
          },
        ],
      },
      {
        name: "Bowls, Steaks & Salad",
        items: [
          {
            name: "Burrito Bowl",
            price: 620,
            desc: "Rice, beans, salsa, cheese, lime.",
            dietary: ["veg"],
            highlights: ["favourite"],
          },
          {
            name: "Cauliflower Steak",
            price: 490,
            desc: "A thick-cut cauliflower slab, roasted till charred, herb butter and greens.",
            dietary: ["veg"],
            highlights: ["favourite"],
          },
          {
            name: "Red Beans Steak",
            price: 580,
            desc: "A house-pressed red-bean patty, smoky and hearty, with a warm pepper sauce.",
            dietary: ["veg"],
            highlights: ["favourite"],
          },
          {
            name: "Caesar Salad",
            price: 280,
            desc: "Crisp lettuce, creamy dressing, parmesan.",
            dietary: ["veg"],
            highlights: ["recommended"],
          },
        ],
      },
      {
        name: "Pasta",
        tagline: "Comes on its own. Add side bread 80.",
        items: [
          {
            name: "Alfredo Penne",
            price: 490,
            desc: "Penne in cream, butter, parmesan.",
            dietary: ["veg"],
            highlights: ["favourite", "recommended"],
          },
          {
            name: "Creamy Tomato Garlic Penne",
            price: 430,
            desc: "Bright, garlicky, a little creamy.",
            dietary: ["veg"],
          },
          {
            name: "Aglio Olio Spaghetti",
            price: 450,
            desc: "Garlic, olive oil, a slow chilli warmth.",
            dietary: ["veg", "spicy"],
          },
          {
            name: "Pesto Penne",
            price: 520,
            desc: "Basil pesto, parmesan cheese.",
            dietary: ["veg"],
          },
          {
            name: "Carbonara Spaghetti",
            price: 580,
            desc: "Egg, cheese, pepper. Italian comfort.",
            dietary: ["egg"],
          },
        ],
      },
      {
        name: "Sandwiches, Wraps & Bagels",
        items: [
          {
            name: "Grilled Veggies & Cheese Sandwich",
            price: 280,
            desc: "Hot off the press.",
            dietary: ["veg"],
            highlights: ["favourite"],
          },
          {
            name: "Smoked Bell Pepper & Cheese Sandwich",
            price: 280,
            desc: "Smoky, sweet, melted.",
            dietary: ["veg"],
          },
          {
            name: "Avocado Egg Sandwich",
            price: 430,
            desc: "Mashed avocado, soft egg.",
            dietary: ["egg"],
            highlights: ["favourite"],
          },
          {
            name: "Falafel Wrap",
            price: 380,
            desc: "Crispy falafel, tahini, onion, green chilli.",
            dietary: ["veg", "spicy"],
            highlights: ["favourite"],
          },
          { name: "Veggies Paneer Wrap", price: 400, dietary: ["veg", "spicy"] },
          { name: "Cream Cheese Bagel", price: 210, dietary: ["veg"] },
          { name: "Jalapenos Bagel", price: 220, dietary: ["veg", "spicy"] },
        ],
      },
      {
        name: "Small Things & Warm Bread",
        items: [
          {
            name: "Peri Peri Fries",
            price: 230,
            desc: "The fries, with a little kick.",
            dietary: ["veg", "spicy"],
            highlights: ["favourite", "recommended"],
          },
          { name: "Salted Fries", price: 210, dietary: ["veg"] },
          {
            name: "Jalapenos Cheese Fries",
            price: 280,
            dietary: ["veg", "spicy"],
            highlights: ["favourite"],
          },
          { name: "Cheese Fries", price: 250, dietary: ["veg"] },
          {
            name: "Cheese Hash Brown Bits",
            price: 240,
            desc: "Crisp outside, soft cheesy crumb.",
            dietary: ["veg"],
          },
          {
            name: "Trio of Hummus",
            price: 390,
            desc: "Three hummus, warm bread.",
            dietary: ["veg"],
          },
          { name: "Cheese Garlic Bread", price: 290, dietary: ["veg"] },
          { name: "Garlic Bread", price: 250, dietary: ["veg"], highlights: ["recommended"] },
          { name: "Chilli Garlic Toast", price: 260, dietary: ["veg", "spicy"] },
        ],
      },
      {
        name: "Mornings — All Day",
        items: [
          {
            name: "Alley Pally Breakfast Platter",
            price: 480,
            desc: "A slow, full breakfast for two.",
            dietary: ["egg"],
            highlights: ["favourite"],
          },
          {
            name: "English Breakfast",
            price: 350,
            desc: "Eggs, two hashbrowns, grilled tomato and potato wedges.",
            dietary: ["egg"],
          },
          { name: "Fried Eggs with Toast", price: 230, dietary: ["egg"] },
          {
            name: "Cheese Omelette with Toast",
            price: 260,
            desc: "Soft omelette, cheese, buttered toast.",
            dietary: ["egg"],
          },
          {
            name: "Mushroom Omelette with Toast",
            price: 270,
            desc: "Sautéed mushrooms, buttered toast.",
            dietary: ["egg"],
          },
          {
            name: "Spinach Omelette with Toast",
            price: 270,
            desc: "Wilted spinach, soft egg, buttered toast.",
            dietary: ["egg"],
          },
          {
            name: "Avocado Toast",
            price: 430,
            desc: "Smashed avocado, onion, tomato, lemon.",
            dietary: ["veg"],
            highlights: ["favourite"],
          },
          { name: "Hummus Toast", price: 280, dietary: ["veg"] },
          { name: "Classic Pancakes", price: 300, dietary: ["egg"] },
          { name: "Chocolate Pancakes", price: 320, dietary: ["egg"] },
          { name: "Classic Waffle", price: 290, dietary: ["veg"], highlights: ["favourite"] },
          { name: "Chocolate Waffle", price: 370, dietary: ["veg"] },
          {
            name: "Nutella Waffle",
            price: 350,
            desc: "Warm waffle under a Nutella pour.",
            dietary: ["veg"],
            highlights: ["new"],
          },
          {
            name: "Strawberry & Cream Waffle",
            price: 350,
            desc: "Fresh strawberry, soft cream.",
            dietary: ["veg"],
            highlights: ["new"],
          },
        ],
      },
      {
        name: "For Little Ones",
        items: [
          { name: "Kids Fries", price: 160, dietary: ["veg"], highlights: ["favourite"] },
          { name: "Mini Pancakes", price: 220, dietary: ["egg"] },
        ],
      },
    ],
  },
  {
    id: "desserts",
    name: "Desserts",
    icon: "🍰",
    blurb: "A small spoon, a long pause.",
    subcategories: [
      {
        name: "Sweet",
        tagline: "Subject to availability. Lovingly baked by Harika & Crumb · Artisanal Desserts.",
        items: [
          {
            name: "Brownie with Ice Cream",
            price: 290,
            desc: "Warm brownie, a cold scoop. Always works.",
            dietary: ["veg"],
            highlights: ["favourite"],
          },
          {
            name: "Brownie",
            price: 240,
            desc: "Dense and fudgy. Warm, if you ask.",
            dietary: ["veg"],
          },
          {
            name: "New York Cheesecake",
            price: 250,
            desc: "Dense, creamy, the classic baked one.",
            dietary: ["veg"],
            highlights: ["new"],
          },
          {
            name: "Basque Burnt Cheesecake",
            price: 280,
            desc: "Dark, cracked top, molten middle.",
            dietary: ["egg"],
          },
          {
            name: "Belgian Chocolate Cake",
            price: 260,
            desc: "Deep cocoa, soft sponge.",
            dietary: ["veg"],
          },
          {
            name: "London Chocolate Cake",
            price: 250,
            desc: "Rich chocolate sponge, a bakery classic.",
            dietary: ["veg"],
            highlights: ["new"],
          },
          {
            name: "Lemon Raspberry Slice",
            price: 250,
            desc: "Zesty lemon, raspberry ripple, a buttery base.",
            dietary: ["veg"],
            highlights: ["new"],
          },
          {
            name: "Chocolate Chunk Cookies",
            price: 150,
            desc: "Three small ones, warm and soft in the centre.",
            dietary: ["veg"],
            highlights: ["new"],
          },
          {
            name: "Butter Cookies",
            price: 120,
            desc: "Three small ones. Made for a book and a coffee.",
            dietary: ["veg"],
            highlights: ["new"],
          },
          {
            name: "Whole Basque Cheesecake",
            price: 1300,
            desc: "Pre-order 24 hours ahead.",
            dietary: ["egg"],
          },
        ],
      },
    ],
  },
];
