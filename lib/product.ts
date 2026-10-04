export function formatPrice(value: number) {
  return `GHC ${value.toLocaleString()}`
}

export const product = {
  brand: "Deos",
  tagline: "Natural body freshness",
  name: "Deos",
  category: "Deodorant stick",
  size: "30 capsules",
  badge: "Best Seller",
  price: 450,
  rating: "4.8",
  paymentNote: "Free delivery in Ghana",
  popularity: "Daily freshness support for perimenopause and menopause",
  scent: "Chlorophyllin & Mint",
  description:
    "Deos is a gentle plant-based body deodorizer made with chlorophyllin and mint, created for women navigating perimenopause, menopause and everyday hormonal changes. It supports fresher underarms, breath, intimate areas and daily confidence from within.",
  images: [
    "/deos-body-deodorizer-477480.webp",
    "/deos-body-deodorizer-987562.webp",
    "/deos-body-deodorizer-899244.webp",
    "/deos-body-deodorizer-500758.webp",
    "/IngredientsBreakdown.webp"
  ],
  options: [
    { id: "1-bottle-450", label: "1 Bottle + Free Delivery", detail: "1 Bottle + Free Delivery", price: 450 },
    { id: "2-bottles-800", label: "2 Bottles + Free Delivery", detail: "2 Bottles + Free Delivery. Save GHC 100", price: 800 },
    { id: "3-bottles-1100", label: "3 Bottles + Free Delivery", detail: "3 Bottles + Free Delivery. Save GHC 250", price: 1100 }
  ],
  tabs: [
    ["How to use", "Take one capsule daily with water. If you do not like swallowing capsules, open it, mix the powder into water and drink immediately."],
    ["Benefit", "Works internally to support freshness when hormonal changes, heat and daily stress make body odor feel harder to manage."],
    ["Ingredients", "Chlorophyllin supports internal deodorizing, while mint helps with freshness and digestive comfort."],
    ["Return policy", "Orders are confirmed before delivery. Contact support if there is an issue with your package."]
  ]
}

export const benefits = [
  ["Hormonal freshness support", "Made for women who notice stronger body odor, sweat changes or intimate freshness concerns during perimenopause and menopause."],
  ["Freshness from within", "Supports internal odor control instead of only covering changes with perfume or external deodorant."],
  ["Gentle daily routine", "Chlorophyllin and mint create a simple once-daily habit that fits easily into your menopause wellness routine."]
]

export const steps = [
  ["Take", "Take one Deos capsule daily with water, preferably with a meal."],
  ["Mix", "If swallowing tablets is difficult, open the capsule and mix the powder into water."],
  ["Stay fresh", "Use consistently every day to support internal freshness through hormonal changes, warm days and busy routines."]
]

export const ingredientDetails = [
  ["Chlorophyllin", "A water-soluble green plant compound used as an internal deodorizer. It helps bind odor compounds in the digestive tract before they affect sweat and breath."],
  ["Mint", "A refreshing herb that supports digestive comfort and gives the formula a cleaner freshening profile."],
  ["Plant-based capsule support", "Designed for daily use and easy mixing with water when swallowing capsules is not preferred."]
]

export const reviews = [
  ["Since perimenopause started, I became more conscious of sweat and body odor. Deos helped me feel fresher through the day.", "Ama, Accra", "5/5"],
  ["Hot flashes made me worry about odor at work. This became a simple part of my morning routine.", "Esi, Kumasi", "5/5"],
  ["During menopause my body changed, and I wanted something gentle that worked from within. I like how easy Deos is to take.", "Akua, Tema", "4.5/5"]
]

export const relatedProducts = [
  ["Single Bottle", 450, null, "bottle"],
  ["Double Pack", 800, 900, "bottle"],
  ["Three Bottle Plan", 1100, 1350, "bottle"],
  ["Family Freshness Pack", 1500, null, "bottle"]
] as const

export type OrderPackageId = (typeof product.options)[number]["id"]



