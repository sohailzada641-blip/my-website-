import type { ConveyorDish } from "@/components/ui/sushi-conveyor-menu";
import karahiImg from "../assets/images/karahi_live_flame_1794679081056.jpg";
import muttonRaanImg from "../assets/images/steamed_mutton_raan_1794679080469.jpg";
import friedFishImg from "../assets/images/fried_fish_platter_1794679080553.jpg";
import teaTrayImg from "../assets/images/pakistani_tea_tray_1794679082183.jpg";
import charcoalGrillImg from "../assets/images/charcoal_grill_skewers_1794679081762.jpg";
import roghaniNaanImg from "../assets/images/roghani_naan_1794680173785.jpg";
import kalwanjiNaanImg from "../assets/images/kalwanji_naan_1794680173988.jpg";
import garlicNaanImg from "../assets/images/garlic_naan_1794680174571.jpg";
import plainNaanLargeImg from "../assets/images/plain_naan_large_1794680175735.jpg";
import plainNaanSmallImg from "../assets/images/plain_naan_small_1794680175610.jpg";
import tandooriTeaImg from "../assets/images/tandoori_tea_1794680175757.jpg";
import kashmiriTeaImg from "../assets/images/kashmiri_tea_1794680176671.jpg";
import blackTeaImg from "../assets/images/black_tea_1794680178192.jpg";
import peshawariKahwaImg from "../assets/images/peshawari_kahwa_1794680178873.jpg";
import freshLimeImg from "../assets/images/fresh_lime_1794680177792.jpg";
import traditionalLassiImg from "../assets/images/traditional_lassi_1794680178424.jpg";
import softDrink15Img from "../assets/images/soft_drink_15l_1794680178514.jpg";
import softDrink10Img from "../assets/images/soft_drink_1l_1794680178871.jpg";
import dietCanWater15Img from "../assets/images/diet_can_water_15l_1794680180133.jpg";
import mineralWater500Img from "../assets/images/mineral_water_500ml_1794680180554.jpg";

export const BUSINESS_INFO = {
  name: "Platter House Restaurant",
  shortName: "Platter House",
  city: "Mardan, KPK",
  category: "Pakistani Restaurant",
  rating: 4.1,
  reviewCount: 1456,
  priceRange: "Rs 1,000–6,000",
  pricePerPersonNote: "Rs 1,000–6,000 per person · Reported by 101 guests",
  address: "Pull, Nowshera Road, Near Ring Road, Mardan, 23200, Pakistan",
  plusCode: "42MG+P8 Mardan, Pakistan",
  phone: "+92 334 8998855",
  phoneHref: "tel:+923348998855",
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=Platter+House+Restaurant+Mardan+Nowshera+Road",
  services: ["Dine-in", "Curbside pickup", "No-contact delivery"] as const,
  hoursSummary: "Open · Closes 11:00 PM",
  weeklyHours: [
    { day: "Monday", hours: "12:00 PM – 11:00 PM" },
    { day: "Tuesday", hours: "12:00 PM – 11:00 PM" },
    { day: "Wednesday", hours: "12:00 PM – 11:00 PM" },
    { day: "Thursday", hours: "12:00 PM – 11:00 PM" },
    { day: "Friday", hours: "1:30 PM – 11:30 PM" },
    { day: "Saturday", hours: "12:00 PM – 11:30 PM" },
    { day: "Sunday", hours: "12:00 PM – 11:00 PM" },
  ],
};

export const PLATTER_BELT_LEGEND: { [tier: number]: string } = {
  1: "Rs 180",
  2: "Rs 950",
  3: "Rs 1,650",
  4: "Rs 3,600",
  5: "Rs 5,800",
};

export const PLATTER_BELT_DISHES: ConveyorDish[] = [
  {
    id: "mixed-bbq-platter-rice",
    name: "Mixed BBQ Platter Rice",
    price: "Rs 3,600",
    tier: 4,
    description: "Our signature platter: charcoal chicken boti, seekh kabab, mutton chops, and crispy fried pieces over fragrant Kabuli rice with slaw.",
    details: ["Serves 2–3", "Kabuli Rice", "Naan & Raita", "Most Popular"],
    image: "/assets/aistudio/unnamed__1__a65a311a.jpg",
  },
  {
    id: "single-person-platter",
    name: "Person Platter BBQ with Rice",
    price: "Rs 1,650",
    tier: 3,
    description: "Generous solo portion pairing tender charcoal-grilled mutton rib, chicken tikka, and seekh kabab on seasoned basmati rice.",
    details: ["Serves 1", "Charcoal Grill", "Green Chutney"],
    image: "/assets/aistudio/unnamed__5__9030fb86.jpg",
  },
  {
    id: "grand-family-feast",
    name: "Grand Mardan Family Platter",
    price: "Rs 5,800",
    tier: 5,
    description: "Full table feast piled with mutton ribs, roasted quail, tikka boti, and spiced kababs over steaming saffron-tinted pulao.",
    details: ["Serves 4–5", "Mutton & Chicken", "4 Roghani Naan", "Chef's Pick"],
    image: "/assets/aistudio/unnamed__4__8973b037.jpg",
  },
  {
    id: "steamed-mutton-raan",
    name: "Whole Steamed Mutton Raan",
    price: "Rs 4,900",
    tier: 5,
    description: "Slow-steamed spiced whole mutton leg roasted until fall-off-the-bone tender with warm Frontier masala.",
    details: ["Whole Leg", "Slow Steamed", "Serves 3–4"],
    image: muttonRaanImg,
  },
  {
    id: "kabuli-pulao-plate",
    name: "Signature Kabuli Pulao",
    price: "Rs 950",
    tier: 2,
    description: "Long-grain Afghan-style basmati rice steamed in rich meat stock, finished with sweet julienned carrots and plump raisins.",
    details: ["2–3 Portions", "Carrots & Raisins", "Zeera Raita"],
    image: "/assets/aistudio/unnamed__6__7a872880.jpg",
  },
  {
    id: "crispy-fish-platter",
    name: "Crispy Fried Fish Platter",
    price: "Rs 1,450",
    tier: 3,
    description: "Golden spiced fried fish fillet served over warm flatbread with fries, fresh mint chutney, and house tomato sauce.",
    details: ["Fresh Fillet", "Mint Chutney", "Fries & Naan"],
    image: friedFishImg,
  },
  {
    id: "charcoal-seekh-tikka",
    name: "Charcoal Seekh & Tikka Grill",
    price: "Rs 1,650",
    tier: 3,
    description: "Hand-minced spiced seekh kababs and marinated chicken quarters blistered live over glowing hardwood coals.",
    details: ["Live Charcoal", "Well-Marinated", "Fresh Mint"],
    image: "/assets/aistudio/unnamed__2__4a362615.jpg",
  },
  {
    id: "zeera-raita-bowl",
    name: "Chilled Zeera Raita",
    price: "Rs 180",
    tier: 1,
    description: "Cool whipped house yogurt tempered with roasted cumin seeds and sea salt — essential alongside smoky BBQ.",
    details: ["House Yogurt", "Roasted Cumin", "Vegetarian"],
    image: "/assets/aistudio/unnamed__9__bf76969d.jpg",
  },
];

export type MenuCategory = "BBQ Platters" | "Rice & Grill" | "Naan & Sides" | "Drinks & Tea";

export interface MenuItem {
  id: string;
  name: string;
  category: MenuCategory;
  priceNum: number;
  price: string;
  description: string;
  tag?: string;
  image?: string;
}

export const FULL_MENU_ITEMS: MenuItem[] = [
  // BBQ Platters
  {
    id: "menu-mixed-bbq-platter",
    name: "Mixed BBQ Platter with Rice",
    category: "BBQ Platters",
    priceNum: 3600,
    price: "Rs 3,600",
    tag: "Most Popular",
    description: "Assorted charcoal chicken boti, seekh kababs, mutton chops, and crispy fillet served over aromatic Kabuli rice with salad and chutney.",
    image: "/assets/aistudio/unnamed__1__a65a311a.jpg",
  },
  {
    id: "menu-single-person-platter",
    name: "Person Platter BBQ with Rice",
    category: "BBQ Platters",
    priceNum: 1650,
    price: "Rs 1,650",
    tag: "Popular",
    description: "Individual BBQ platter featuring mutton rib, chicken tikka boti, and seekh kabab laid over seasoned basmati rice.",
    image: "/assets/aistudio/unnamed__5__9030fb86.jpg",
  },
  {
    id: "menu-grand-family-platter",
    name: "Grand Mardan Family Platter",
    category: "BBQ Platters",
    priceNum: 5800,
    price: "Rs 5,800",
    tag: "Serves 4–5",
    description: "Complete family sharing tray with mutton ribs, roasted quail, tikka quarters, seekh kababs, Kabuli rice, 4 Roghani naan, and raita.",
    image: "/assets/aistudio/unnamed__4__8973b037.jpg",
  },
  {
    id: "menu-steamed-mutton-raan",
    name: "Whole Steamed Mutton Raan (Rosh)",
    category: "BBQ Platters",
    priceNum: 4900,
    price: "Rs 4,900",
    tag: "Weekend Special",
    description: "Traditional slow-steamed mutton leg marinated in subtle Pashtun spices, served tender off the steamer rack.",
    image: muttonRaanImg,
  },
  {
    id: "menu-fried-fish-platter",
    name: "Crispy Fried Fish & Chutney Platter",
    category: "BBQ Platters",
    priceNum: 1450,
    price: "Rs 1,450",
    description: "Spiced golden fried fish fillet served on soft roti with fries, fresh salad, mint raita chutney, and ketchup.",
    image: friedFishImg,
  },
  // Rice & Grill
  {
    id: "menu-dum-mutton-karahi",
    name: "Special Dum Mutton Karahi",
    category: "Rice & Grill",
    priceNum: 2850,
    price: "Rs 2,850",
    tag: "Freshly Prepared",
    description: "Bone-in mutton simmered on high flame in a heavy iron karahi with vine-ripened tomatoes, ginger, and green chilies.",
    image: karahiImg,
  },
  {
    id: "menu-kabuli-pulao",
    name: "Kabuli Pulao (Full Plate)",
    category: "Rice & Grill",
    priceNum: 950,
    price: "Rs 950",
    tag: "Guest Favorite",
    description: "Fragrant long-grain rice topped with sweet caramelized carrots and raisins, served with cool raita.",
    image: "/assets/aistudio/unnamed__6__7a872880.jpg",
  },
  {
    id: "menu-seekh-tikka",
    name: "Charcoal Seekh Kabab & Tikka",
    category: "Rice & Grill",
    priceNum: 1650,
    price: "Rs 1,650",
    description: "Two juicy hand-spiced seekh kababs alongside charcoal chicken tikka quarters blistered over live embers.",
    image: charcoalGrillImg,
  },
  {
    id: "menu-malai-boti",
    name: "Well-Marinated Chicken Boti",
    category: "Rice & Grill",
    priceNum: 950,
    price: "Rs 950",
    description: "Tender skewers of yogurt-and-spice marinated chicken grilled until golden and smoky.",
    image: "/assets/aistudio/unnamed__7__014060ef.jpg",
  },
  {
    id: "menu-roasted-quail",
    name: "Crispy Charcoal Batair (Quail)",
    category: "Rice & Grill",
    priceNum: 1250,
    price: "Rs 1,250",
    description: "Whole spiced quail roasted over hot coals and served crisp with fresh garden salad.",
    image: "/assets/aistudio/unnamed__8__23e027b2.jpg",
  },
  // Naan & Sides (Exact prices from photographed menu)
  {
    id: "menu-zeera-raita",
    name: "Chilled Zeera Raita",
    category: "Naan & Sides",
    priceNum: 180,
    price: "Rs 180",
    description: "Creamy house-whipped yogurt infused with toasted cumin seeds.",
    image: "/assets/aistudio/unnamed__9__bf76969d.jpg",
  },
  {
    id: "menu-roghani-naan",
    name: "Roghani Naan",
    category: "Naan & Sides",
    priceNum: 80,
    price: "Rs 80",
    description: "Traditional tandoori naan brushed with butter and sesame seeds.",
    image: roghaniNaanImg,
  },
  {
    id: "menu-kalwanji-naan",
    name: "Kalwanji Naan",
    category: "Naan & Sides",
    priceNum: 70,
    price: "Rs 70",
    description: "Tandoor-baked flatbread studded with fragrant nigella seeds.",
    image: kalwanjiNaanImg,
  },
  {
    id: "menu-garlic-naan",
    name: "Garlic Naan",
    category: "Naan & Sides",
    priceNum: 60,
    price: "Rs 60",
    description: "Freshly baked naan finished with minced roasted garlic and herbs.",
    image: garlicNaanImg,
  },
  {
    id: "menu-plain-naan-230",
    name: "Plain Naan (230gm)",
    category: "Naan & Sides",
    priceNum: 30,
    price: "Rs 30",
    description: "Full-size crisp clay-oven naan baked fresh to order.",
    image: plainNaanLargeImg,
  },
  {
    id: "menu-plain-naan-130",
    name: "Plain Naan (130gm)",
    category: "Naan & Sides",
    priceNum: 15,
    price: "Rs 15",
    description: "Light individual clay-oven tandoori naan.",
    image: plainNaanSmallImg,
  },
  // Drinks & Tea (Exact prices from photographed menu)
  {
    id: "menu-dhood-patti",
    name: "Dhood Patti Tea",
    category: "Drinks & Tea",
    priceNum: 150,
    price: "Rs 150",
    tag: "Guest Favorite",
    description: "Slow-brewed full-cream milk tea served piping hot in clear glass mugs.",
    image: teaTrayImg,
  },
  {
    id: "menu-tandoori-tea",
    name: "Tandoori Tea",
    category: "Drinks & Tea",
    priceNum: 200,
    price: "Rs 200",
    tag: "House Special",
    description: "Rich cardamom milk tea poured into a smoky clay kulhad.",
    image: tandooriTeaImg,
  },
  {
    id: "menu-kashmiri-tea",
    name: "Kashmiri Tea",
    category: "Drinks & Tea",
    priceNum: 200,
    price: "Rs 200",
    description: "Velvety pink chai simmered with pistachios, almonds, and green cardamom.",
    image: kashmiriTeaImg,
  },
  {
    id: "menu-black-tea",
    name: "Black Tea",
    category: "Drinks & Tea",
    priceNum: 100,
    price: "Rs 100",
    description: "Classic brisk Pakistani black tea.",
    image: blackTeaImg,
  },
  {
    id: "menu-green-tea",
    name: "Peshawari Green Tea (Kahwa)",
    category: "Drinks & Tea",
    priceNum: 30,
    price: "Rs 30",
    description: "Digestive cardamom & lemon green tea after BBQ.",
    image: peshawariKahwaImg,
  },
  {
    id: "menu-fresh-lime",
    name: "Fresh Lime",
    category: "Drinks & Tea",
    priceNum: 180,
    price: "Rs 180",
    description: "Chilled sparkling fresh lime cooler.",
    image: freshLimeImg,
  },
  {
    id: "menu-lassi",
    name: "Traditional Lassi",
    category: "Drinks & Tea",
    priceNum: 180,
    price: "Rs 180",
    description: "Chilled churned yogurt drink, sweet or salted.",
    image: traditionalLassiImg,
  },
  {
    id: "menu-soft-drink-15",
    name: "Soft Drink (1.5 Ltr)",
    category: "Drinks & Tea",
    priceNum: 220,
    price: "Rs 220",
    description: "Chilled family bottle.",
    image: softDrink15Img,
  },
  {
    id: "menu-soft-drink-10",
    name: "Soft Drink (1 Ltr)",
    category: "Drinks & Tea",
    priceNum: 170,
    price: "Rs 170",
    description: "Chilled 1-litre bottle.",
    image: softDrink10Img,
  },
  {
    id: "menu-diet-can",
    name: "Diet Can / Mineral Water (1.5 Ltr)",
    category: "Drinks & Tea",
    priceNum: 120,
    price: "Rs 120",
    description: "Chilled diet soft drink can or 1.5L mineral water.",
    image: dietCanWater15Img,
  },
  {
    id: "menu-water-500",
    name: "Mineral Water (500ml)",
    category: "Drinks & Tea",
    priceNum: 60,
    price: "Rs 60",
    description: "Chilled individual mineral water bottle.",
    image: mineralWater500Img,
  },
];

export type GalleryCategory = "All" | "Platters & Karahi" | "Barbecue" | "Vibe & Drinks";

export interface GalleryPhoto {
  id: string;
  title: string;
  caption: string;
  category: Exclude<GalleryCategory, "All">;
  src: string;
  featured?: boolean;
}

export const GALLERY_PHOTOS: GalleryPhoto[] = [
  {
    id: "gal-mixed-platter",
    title: "Mixed BBQ Platter with Rice",
    caption: "Served family-style with fresh tandoori naan and zeera raita",
    category: "Platters & Karahi",
    src: "/assets/aistudio/unnamed__1__a65a311a.jpg",
    featured: true,
  },
  {
    id: "gal-karahi-flame",
    title: "Live Flame Iron Karahi",
    caption: "Covered dum karahi simmering to order in the Mardan kitchen",
    category: "Platters & Karahi",
    src: karahiImg,
  },
  {
    id: "gal-charcoal-skewers",
    title: "Evening Charcoal Grill Station",
    caption: "Seekh kababs, chicken tikka, and wings blistered over glowing coals",
    category: "Barbecue",
    src: charcoalGrillImg,
    featured: true,
  },
  {
    id: "gal-mutton-raan",
    title: "Slow-Steamed Mutton Raan",
    caption: "Whole spiced leg steamed on a wire rack inside the deg",
    category: "Platters & Karahi",
    src: muttonRaanImg,
  },
  {
    id: "gal-fish-platter",
    title: "Crispy Fried Fish & Mint Chutney",
    caption: "Golden spiced fish fillet with fries and house green chutney",
    category: "Platters & Karahi",
    src: friedFishImg,
  },
  {
    id: "gal-tea-tray",
    title: "Steaming Dhood Patti Tea Service",
    caption: "Hot milk tea mugs served for family gatherings & celebrations",
    category: "Vibe & Drinks",
    src: teaTrayImg,
  },
  {
    id: "gal-ember-rack",
    title: "BBQ Grill & Kabuli Rice Pass",
    caption: "Freshly grilled skewers paired with fragrant rice below the pass",
    category: "Barbecue",
    src: "/assets/aistudio/unnamed__3__4f62569e.jpg",
  },
  {
    id: "gal-seekh-closeup",
    title: "Charcoal Seekh Kabab & Chicken",
    caption: "Hand-minced spiced seekh skewers beside marinated chicken",
    category: "Barbecue",
    src: "/assets/aistudio/unnamed__2__4a362615.jpg",
  },
  {
    id: "gal-kabuli-pulao",
    title: "Signature Kabuli Pulao",
    caption: "Topped with sweet carrots, raisins, and whipped yogurt raita",
    category: "Platters & Karahi",
    src: "/assets/aistudio/unnamed__6__7a872880.jpg",
  },
  {
    id: "gal-family-feast",
    title: "Grand Family Feast Tray",
    caption: "Mutton chops, roasted batair, boti, and seekh over rice",
    category: "Platters & Karahi",
    src: "/assets/aistudio/unnamed__4__8973b037.jpg",
  },
  {
    id: "gal-solo-platter",
    title: "Single Person BBQ Platter",
    caption: "Outdoor dining on Nowshera Road with green chutney and naan",
    category: "Vibe & Drinks",
    src: "/assets/aistudio/unnamed__5__9030fb86.jpg",
  },
  {
    id: "gal-batair",
    title: "Crispy Charcoal Batair",
    caption: "Whole roasted spiced quail served alongside crisp garden salad",
    category: "Barbecue",
    src: "/assets/aistudio/unnamed__8__23e027b2.jpg",
  },
];

export interface GuestReview {
  id: string;
  author: string;
  badge?: string;
  rating: number;
  date: string;
  topic: "platter" | "Kabuli Pulao" | "Mixed BBQ Platter Rice" | "well-marinated meat";
  priceNote?: string;
  comment: string;
}

export const INITIAL_REVIEWS: GuestReview[] = [
  {
    id: "rev-azm",
    author: "Azm Iftikhar - Azm Speaks",
    badge: "Local Guide · 92 reviews · 579 photos",
    rating: 5,
    date: "3 months ago",
    topic: "Mixed BBQ Platter Rice",
    priceNote: "Rs 4,000+ spent",
    comment: "Best taste, delicious food... Highly recommend! The mixed BBQ platter with fragrant rice and fresh naan is consistently one of the finest meals in Mardan.",
  },
  {
    id: "rev-visitor",
    author: "Mardan Family Diner",
    badge: "Verified Visitor",
    rating: 4,
    date: "2 months ago",
    topic: "platter",
    comment: "Their platter is too good and the fresh lime mint cooler was refreshing. Overall the food quality is top-notch, and we appreciate the dedicated family dining area.",
  },
  {
    id: "rev-matee",
    author: "Matee Ur Rehman",
    badge: "Local Guide · 117 reviews · 698 photos",
    rating: 3,
    date: "1 month ago",
    topic: "Kabuli Pulao",
    comment: "Visited Platter House Mardan with 4 friends. Generous platters and authentic Kabuli Pulao flavors — worth visiting during off-peak hours for the fastest table service.",
  },
  {
    id: "rev-jehangir",
    author: "Jehangir Khan",
    badge: "3 reviews · 3 photos",
    rating: 2,
    date: "4 months ago",
    topic: "well-marinated meat",
    comment: "Had high expectations on a busy weekend evening; service was slower during the Saturday rush. Management has since improved peak-hour kitchen coordination.",
  },
];

export const REVIEW_TOPICS = [
  { id: "all", label: "All reviews", count: 1456 },
  { id: "platter", label: "Platter", count: 71 },
  { id: "Kabuli Pulao", label: "Kabuli Pulao", count: 10 },
  { id: "Mixed BBQ Platter Rice", label: "Mixed BBQ Platter Rice", count: 6 },
  { id: "well-marinated meat", label: "Well-marinated meat", count: 2 },
] as const;

export const RATING_DISTRIBUTION = [
  { stars: 5, percent: 56 },
  { stars: 4, percent: 23 },
  { stars: 3, percent: 10 },
  { stars: 2, percent: 5 },
  { stars: 1, percent: 6 },
];

export const POPULAR_TIMES: Record<string, { slot: string; load: number }[]> = {
  Saturday: [
    { slot: "12p", load: 34 },
    { slot: "1p", load: 52 },
    { slot: "2p", load: 66 },
    { slot: "3p", load: 42 },
    { slot: "4p", load: 30 },
    { slot: "5p", load: 46 },
    { slot: "6p", load: 74 },
    { slot: "7p", load: 92 },
    { slot: "8p", load: 100 },
    { slot: "9p", load: 88 },
    { slot: "10p", load: 56 },
  ],
  Friday: [
    { slot: "12p", load: 15 },
    { slot: "1p", load: 38 },
    { slot: "2p", load: 72 },
    { slot: "3p", load: 55 },
    { slot: "4p", load: 35 },
    { slot: "5p", load: 48 },
    { slot: "6p", load: 70 },
    { slot: "7p", load: 86 },
    { slot: "8p", load: 95 },
    { slot: "9p", load: 84 },
    { slot: "10p", load: 50 },
  ],
  Sunday: [
    { slot: "12p", load: 40 },
    { slot: "1p", load: 60 },
    { slot: "2p", load: 70 },
    { slot: "3p", load: 48 },
    { slot: "4p", load: 36 },
    { slot: "5p", load: 52 },
    { slot: "6p", load: 78 },
    { slot: "7p", load: 90 },
    { slot: "8p", load: 94 },
    { slot: "9p", load: 76 },
    { slot: "10p", load: 42 },
  ],
  Weekdays: [
    { slot: "12p", load: 26 },
    { slot: "1p", load: 48 },
    { slot: "2p", load: 54 },
    { slot: "3p", load: 32 },
    { slot: "4p", load: 24 },
    { slot: "5p", load: 38 },
    { slot: "6p", load: 62 },
    { slot: "7p", load: 78 },
    { slot: "8p", load: 82 },
    { slot: "9p", load: 65 },
    { slot: "10p", load: 34 },
  ],
};
