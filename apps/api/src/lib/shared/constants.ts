export const KIDS_KEYWORDS = [
  // Kids general
  "kids",
  "kids'",
  "kid's",
  "kid ",
  // Children
  "children",
  "children's",
  "child ",
  "child's",
  // Boys
  "boys",
  "boys'",
  "boy's",
  "boy ",
  // Girls
  "girls",
  "girls'",
  "girl's",
  "girl ",
  // Infants
  "infant",
  "infants",
  "infant's",
  "infants'",
  // Baby
  "baby",
  "baby's",
  "babies",
  "babies'",
  // Toddler
  "toddler",
  "toddler's",
  "toddlers",
  "toddlers'",
  // Youth/Junior
  "youth",
  "youth's",
  "junior",
  "juniors",
  "junior's",
  // Age-based
  "little kid",
  "big kid",
  "preschool",
  "pre-school",
  "grade school",
  "gradeschool",
  // Size indicators for kids
  "ps ",
  "gs ",
  "td ",
  "(ps)",
  "(gs)",
  "(td)", // Preschool, Grade School, Toddler
];

export const MENS_KEYWORDS = [
  "men's",
  "mens",
  "mens'",
  "male",
  "male's",
  "gentleman",
  "gentleman's",
  "gentlemen",
  "gentlemen's",
  " man ",
  " man's",
];

export const WOMENS_KEYWORDS = [
  "women's",
  "womens",
  "womens'",
  "woman's",
  "woman ",
  "female",
  "female's",
  "ladies",
  "ladies'",
  "lady",
  "lady's",
];

export const UNISEX_KEYWORDS = ["unisex", "gender neutral", "gender-neutral"];

// ============================================================
// PRODUCT TYPE DETECTION - What category does this belong to?
// ============================================================
export const SHOE_KEYWORDS = [
  "shoe",
  "shoes",
  "sneaker",
  "sneakers",
  "boot",
  "boots",
  "sandal",
  "sandals",
  "loafer",
  "loafers",
  "oxford",
  "oxfords",
  "heel",
  "heels",
  "pump",
  "pumps",
  "flat",
  "flats",
  "mule",
  "mules",
  "clog",
  "clogs",
  "slipper",
  "slippers",
  "espadrille",
  "espadrilles",
  "wedge",
  "wedges",
  "stiletto",
  "stilettos",
  "trainer",
  "trainers",
  "runner",
  "runners",
  "athletic",
  "running",
  "basketball",
  "tennis",
  "walking",
  "hiking",
  "footwear",
];

export const APPAREL_KEYWORDS = [
  // Tops
  "t-shirt",
  "tshirt",
  "shirt",
  "blouse",
  "top",
  "tank",
  "crop",
  "sweater",
  "cardigan",
  "hoodie",
  "sweatshirt",
  "pullover",
  "jacket",
  "coat",
  "blazer",
  "vest",
  "parka",
  "windbreaker",
  "polo",
  "jersey",
  "tunic",
  // Bottoms
  "pants",
  "pant",
  "jeans",
  "jean",
  "shorts",
  "short",
  "leggings",
  "legging",
  "joggers",
  "jogger",
  "trousers",
  "trouser",
  "chinos",
  "chino",
  "skirt",
  "culottes",
  // Full body
  "dress",
  "romper",
  "jumpsuit",
  "overalls",
  "bodysuit",
  "onesie",
  // Underwear/Swimwear
  "underwear",
  "boxer",
  "briefs",
  "bra",
  "panties",
  "lingerie",
  "bikini",
  "swimsuit",
  "swimwear",
  "swim trunk",
  "bathing suit",
];

export const ACCESSORIES_KEYWORDS = [
  // Bags
  "backpack",
  "tote bag",
  "handbag",
  "purse",
  "crossbody",
  "clutch",
  "duffle",
  "duffel",
  "gym bag",
  "messenger bag",
  "briefcase",
  "satchel",
  "wallet",
  "wristlet",
  "fanny pack",
  "belt bag",
  // Head
  "hat",
  "cap",
  "beanie",
  "headband",
  "visor",
  // Other
  "scarf",
  "gloves",
  "mittens",
  "earmuffs",
  "sunglasses",
  "glasses",
  "watch",
  "jewelry",
  "bracelet",
  "necklace",
  "earring",
  "belt",
  "tie",
  "bow tie",
  // Socks (keep but categorize as accessories)
  "socks",
  "sock",
];

export const WOMEN_CATEGORIES = [
  "sandals",
  "heels",
  "boots",
  "sneakers",
  "flats",
  "loafers",
  "wedges",
  "mules",
  "athletic",
];
export const MEN_CATEGORIES = [
  "sneakers",
  "boots",
  "loafers",
  "oxfords",
  "sandals",
  "athletic",
  "dress-shoes",
  "slip-ons",
];

export const KIDS_CATEGORIES = ["sneakers", "boots", "sandals"];

// Only footwear categories filter
export const FOOTWEAR_FILTER = `
  AND (
    g.category ILIKE '%footwear%'
    OR g.category ILIKE '%shoes%'
    OR g.category IN ('boots', 'sandals', 'flats', 'heels', 'sneakers', 'wedges', 'loafers')
  )
  AND g.category NOT IN ('Accessories', 'accessories', 'Clothing', 'clothing', 'apparel', 'Apparel', 'Socks', 'socks')
`;

// Image CDN whitelist for hotlink-friendly sources
export const IMAGE_CDN_FILTER = `
  AND (
    g.image_url LIKE '%cdn.shopify.com%'
    OR g.image_url LIKE '%famousfootwear.com%'
    OR g.image_url LIKE '%zappos.com%'
    OR g.image_url LIKE '%amazon.com%'
    OR g.image_url LIKE '%cloudinary.com%'
    OR g.image_url LIKE '%imgix.net%'
    OR g.image_url LIKE '%akamaized.net%'
    OR g.image_url LIKE '%fastly.net%'
  )
`;
