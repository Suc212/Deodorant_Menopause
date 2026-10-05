export function formatPrice(value: number) {
  return `GHC ${value.toLocaleString()}`
}

export const product = {
  id: "deos",
  slug: "deos",
  orderPrefix: "DEOS",
  brand: "Deos",
  tagline: "Natural body freshness",
  name: "Deos",
  category: "Internal deodorant",
  size: "30 capsules",
  badge: "Best Seller",
  price: 450,
  rating: "4.8",
  paymentNote: "Free delivery in Ghana",
  popularity: "Daily freshness support for perimenopause and menopause",
  scent: "Chlorophyllin & Mint",
  description:
    "Deos is a gentle plant-based body deodorizer made with chlorophyllin and mint, created for women navigating perimenopause, menopause and everyday hormonal changes. It supports fresher underarms, breath, intimate areas and daily confidence from within.",
  listingDescription:
    "Daily internal freshness support for women navigating perimenopause, menopause and hormonal body changes.",
  images: [
    "/Deos with model.png",
    "/Floating Deos bottle in sage light.png",
    "/Twin Deos Bottles on Wet Tropical Leaf.png",
    "/Deos bottles with fresh mint and herbs.png",
    "/Falling Green Capsules and Fresh Herbs.png"
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


export const rehabHelperGloveProduct = {
  id: "rehab-helper-glove",
  slug: "rehab-helper-glove",
  orderPrefix: "RHG",
  brand: "Rehab Helper Glove",
  tagline: "Guided hand mobility support",
  name: "Rehab Helper Glove",
  category: "Hand rehabilitation aid",
  size: "One adjustable glove",
  badge: "New Arrival",
  price: 2000,
  rating: "4.7",
  paymentNote: "Free delivery in Ghana",
  popularity: "Support for daily hand exercise and assisted grip practice",
  scent: "Adjustable assisted-motion design",
  description:
    "Rehab Helper Glove is a supportive hand exercise aid made for people rebuilding daily hand movement, grip confidence and finger flexibility after weakness, stiffness or reduced mobility. It is designed to support guided practice at home alongside professional advice.",
  listingDescription:
    "A supportive hand exercise aid for guided finger movement, grip practice and daily mobility routines.",
  images: [
    "/rehab-helper-glove.svg",
    "/rehab-helper-glove.svg",
    "/rehab-helper-glove.svg",
    "/rehab-helper-glove.svg",
    "/rehab-helper-glove.svg"
  ],
  options: [
    { id: "1-glove-2000", label: "1 Rehab Helper Glove + Free Delivery", detail: "1 Rehab Helper Glove + Free Delivery", price: 2000 },
    { id: "2-gloves-3900", label: "2 Rehab Helper Gloves + Free Delivery", detail: "2 Rehab Helper Gloves + Free Delivery. Save GHC 100", price: 3900 },
    { id: "family-support-5700", label: "Family Support Pack + Free Delivery", detail: "3 Rehab Helper Gloves + Free Delivery. Save GHC 300", price: 5700 }
  ],
  tabs: [
    ["How to use", "Wear the glove on the affected or weaker hand, adjust the straps gently and use it for short guided movement practice as tolerated."],
    ["Benefit", "Supports finger opening, assisted grip practice and daily hand mobility routines without complicated equipment."],
    ["Who it helps", "Useful for people working on stiffness, weak grip, reduced finger control or general hand mobility with guidance from a clinician or caregiver."],
    ["Care note", "This is a support aid, not a medical cure. Stop if there is pain and follow advice from your physiotherapist or healthcare provider."]
  ]
}

export const allProducts = [product, rehabHelperGloveProduct] as const

export type ProductOption = {
  id: string
  label: string
  detail: string
  price: number
}

export type ProductData = {
  id: string
  slug: string
  orderPrefix: string
  brand: string
  tagline: string
  name: string
  category: string
  size: string
  badge: string
  price: number
  rating: string
  paymentNote: string
  popularity: string
  scent: string
  description: string
  listingDescription: string
  images: string[]
  options: ProductOption[]
  tabs: string[][]
}
export const benefits = [
  ["Hormonal freshness support", "Made for women who notice stronger body odor, sweat changes or intimate freshness concerns during perimenopause and menopause."],
  ["Freshness from within", "Because the odor can be linked to hormonal changes, covering it only on the outside with perfume or deodorant may not be enough. Deos supports freshness from within."],
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
  ["My body odor changed so much around 43, and nothing felt reliable. Deos is the first thing that helped me feel more in control again.", "Ama, Accra", "5/5"],
  ["I remembered my mum going through a similar odor phase and only later understood it was menopause. Deos has made this stage feel less embarrassing for me.", "Esi, Kumasi", "5/5"],
  ["I honestly feared it was kidney failure or something serious before learning that hormonal changes can affect body odor in this phase. Deos gave me a simple daily routine that supports freshness from within.", "Akua, Tema", "4.5/5"]
]


export const bodyChangePoints = [
  ["Your body chemistry can shift", "Perimenopause and menopause can change sweat patterns, skin bacteria, digestion and intimate freshness. That is why a woman can suddenly notice odor even when her hygiene routine has not changed."],
  ["Different women experience it differently", "For some women it is stronger underarm odor. For others it shows up as breath changes, intimate odor, smelly feet, a stale scent on clothes, or the old people smell they never expected to notice in themselves."],
  ["Outside coverage may not be enough", "Perfume, roll-ons and scented washes can help on the surface, but they may not fully address odor that feels connected to internal changes. Deos is made for women who want daily freshness support from within."]
]

export const odorConcerns = [
  "Underarm odor that returns quickly",
  "Sweat smell during hot flashes",
  "Intimate freshness worries",
  "Breath or digestive-related odor",
  "Smelly feet or shoes",
  "A stale or old people smell on the body or clothes"
]

export const resultStories = [
  ["I stopped feeling anxious about raising my arms at work. After using Deos consistently, I felt fresher and more confident through the day.", "Mabel, 46", "Perimenopause"],
  ["My biggest issue was a stale smell on my clothes even after bathing. Deos made my routine feel complete because it supported freshness from within.", "Nana, 52", "Menopause"],
  ["Hot flashes made me sweat more, and I worried people could smell me. Deos helped me feel comfortable leaving the house again.", "Abena, 49", "Hormonal changes"]
]

export const offerReasons = [
  ["Start with one bottle", "A simple first step if you want to test how internal freshness support fits your daily routine."],
  ["Choose two bottles for consistency", "Odor changes connected to this phase often need a steady habit, not a one-day fix. The two bottle offer gives you more time to stay consistent and save GHC 100."],
  ["Choose three bottles for best value", "The three bottle offer gives the strongest savings, free delivery and enough supply to make Deos part of your ongoing menopause wellness routine."]
]
export const relatedProducts = [
  ["Single Bottle", 450, null, "bottle"],
  ["Double Pack", 800, 900, "bottle"],
  ["Three Bottle Plan", 1100, 1350, "bottle"],
  ["Family Freshness Pack", 1500, null, "bottle"]
] as const

export type OrderPackageId = (typeof product.options)[number]["id"]



