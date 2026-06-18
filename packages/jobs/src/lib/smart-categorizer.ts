/*
 * Deterministic keyword categorizer for imported products.
 * Order is load-bearing:
 *   - detectGender: kids → women → men ("men" is a substring of "women", so women wins first)
 *   - categorizeProduct: Accessories → Clothing → Footwear (accessories pulled out before footwear)
 *   - within Footwear: most-specific sub-category first (e.g. wedge before sandal)
 */
export interface CategorizedProduct {
  gender: string | null
  category: string
  sub_category: string
}

// Gender Detection Keywords
// IMPORTANT: Kids is checked FIRST because 'boys' and 'girls' should go to kids, not men/women
// IMPORTANT: Women checked BEFORE men because 'men' is a substring of 'women'
const GENDER_KEYWORDS = {
  kids: [
    'kids', "kid's", "kids'", 'child', 'children', 'toddler', 'infant', 'baby', 'youth',
    'boys', "boys'", "boy's", 'girls', "girls'", "girl's",
    'junior', 'juniors', 'little kid', 'big kid', 'preschool', 'grade school',
  ],
  // IMPORTANT: women checked before men — "women's" contains "men's" as a substring
  women: [
    "women's", 'womens', "womens'", 'woman', 'ladies', "ladies'", 'female',
  ],
  men: [
    "men's", 'mens', "mens'", 'male', 'gentleman',
  ],
}

// Accessory Keywords (detect FIRST — highest priority, separates from footwear)
const ACCESSORIES = {
  bags: [
    'bag', 'backpack', 'purse', 'tote', 'satchel', 'crossbody', 'clutch', 'briefcase', 'handbag',
  ],
  belts: [
    'belt', 'cinch',
  ],
  hats: [
    'hat', 'cap', 'beanie', 'visor', 'fedora',
  ],
  socks: [
    'sock', 'hosiery', 'stocking', 'tights',
  ],
  scarves: [
    'scarf', 'wrap', 'shawl',
  ],
  gloves: [
    'glove', 'mitten',
  ],
}

// Clothing Keywords
const CLOTHING = {
  tops: [
    'shirt', 'top', 'blouse', 'sweater', 'hoodie', 'jacket', 'coat', 'vest', 'cardigan', 'polo', 't-shirt',
  ],
  bottoms: [
    'pants', 'jeans', 'shorts', 'leggings', 'skirt', 'dress', 'trouser',
  ],
  active: [
    'activewear', 'sportswear',
  ],
}

// Footwear Keywords — ordered most specific → most generic within categorizeProduct
// Women's sub-categories: Flats, Heels, Loafers, Mules & Slides, Platforms, Pumps, Sandals, Wedges, Sneakers
// Shared sub-categories: Boots, Sneakers, Sandals, Loafers
const FOOTWEAR = {
  boots: ['boot', 'bootie'],
  wedges: ['wedge'],
  pumps: ['pump'],
  heels: ['heel', 'stiletto', 'kitten heel', 'block heel'],
  platforms: ['platform'],
  flats: ['flat', 'ballet'],
  mules_slides: ['mule', 'slide', 'clog'],
  loafers: ['loafer', 'moccasin', 'boat shoe'],
  sandals: ['sandal', 'flip flop', 'gladiator', 'espadrille'],
  sneakers: ['sneaker', 'trainer', 'running shoe', 'tennis shoe', 'athletic'],
}

function normalizeText(text: string): string {
  return text.toLowerCase().trim()
}

function matches(text: string, keywords: string[]): boolean {
  const normalized = normalizeText(text)
  return keywords.some(keyword => normalized.includes(keyword.toLowerCase()))
}

export function detectGender(productName: string, productDescription?: string): string | null {
  const fullText = [productName, productDescription].filter(Boolean).join(' ')
  // Kids first, then women before men — "men's" is a substring of "women's"
  if (matches(fullText, GENDER_KEYWORDS.kids)) return 'kids'
  if (matches(fullText, GENDER_KEYWORDS.women)) return 'womens'
  if (matches(fullText, GENDER_KEYWORDS.men)) return 'mens'
  return null
}

export function categorizeProduct(
  productName: string,
  productDescription?: string,
  rawCategory?: string,
  detectedGender?: string | null
): CategorizedProduct {
  const fullText = [productName, productDescription, rawCategory]
    .filter(Boolean)
    .join(' ')
    .toLowerCase()

  // 1. Check for ACCESSORIES first (highest priority - separates from footwear)
  for (const [accessoryType, keywords] of Object.entries(ACCESSORIES)) {
    if (matches(fullText, keywords)) {
      return {
        gender: null, // Accessories not gender-specific
        category: 'Accessories',
        sub_category: accessoryType.charAt(0).toUpperCase() + accessoryType.slice(1),
      }
    }
  }

  // 2. Check for CLOTHING
  for (const [clothingType, keywords] of Object.entries(CLOTHING)) {
    if (matches(fullText, keywords)) {
      return {
        gender: detectedGender || 'Unisex',
        category: 'Clothing',
        sub_category: clothingType.charAt(0).toUpperCase() + clothingType.slice(1),
      }
    }
  }

  // 3. Check for FOOTWEAR (default if we get here)
  // Determine gender for footwear if not already detected
  let gender = detectedGender

  // Gender-specific defaults if not set from CSV or keywords
  if (!gender) {
    if (matches(fullText, [...FOOTWEAR.heels, ...FOOTWEAR.pumps, ...FOOTWEAR.flats, ...FOOTWEAR.wedges])) {
      gender = 'womens'
    }
  }

  // Determine footwear sub-category — most specific first
  if (matches(fullText, FOOTWEAR.boots)) {
    return { gender: gender || 'unisex', category: 'Footwear', sub_category: 'Boots' }
  }
  if (matches(fullText, FOOTWEAR.wedges)) {
    return { gender: gender || 'womens', category: 'Footwear', sub_category: 'Wedges' }
  }
  if (matches(fullText, FOOTWEAR.pumps)) {
    return { gender: gender || 'womens', category: 'Footwear', sub_category: 'Pumps' }
  }
  if (matches(fullText, FOOTWEAR.heels)) {
    return { gender: gender || 'womens', category: 'Footwear', sub_category: 'Heels' }
  }
  if (matches(fullText, FOOTWEAR.platforms)) {
    return { gender: gender || 'unisex', category: 'Footwear', sub_category: 'Platforms' }
  }
  if (matches(fullText, FOOTWEAR.flats)) {
    return { gender: gender || 'womens', category: 'Footwear', sub_category: 'Flats' }
  }
  if (matches(fullText, FOOTWEAR.mules_slides)) {
    return { gender: gender || 'unisex', category: 'Footwear', sub_category: 'Mules & Slides' }
  }
  if (matches(fullText, FOOTWEAR.loafers)) {
    return { gender: gender || 'unisex', category: 'Footwear', sub_category: 'Loafers' }
  }
  if (matches(fullText, FOOTWEAR.sandals)) {
    return { gender: gender || 'unisex', category: 'Footwear', sub_category: 'Sandals' }
  }
  if (matches(fullText, FOOTWEAR.sneakers)) {
    return { gender: gender || 'unisex', category: 'Footwear', sub_category: 'Sneakers' }
  }

  // Default: assume footwear if nothing else matches
  return {
    gender: gender || 'unisex',
    category: 'Footwear',
    sub_category: 'Other',
  }
}

export function shouldImportProduct(product: {
  name?: string
  url?: string
  price?: string | number
  in_stock?: boolean | string
  image_url?: string
}): boolean {
  // Skip if no name
  if (!product.name || product.name.trim() === '') return false

  // Skip if no URL
  if (!product.url || product.url.trim() === '') return false

  // Skip if no price or price is 0
  const price = parseFloat(String(product.price || 0))
  if (!price || price === 0) return false

  // Skip if no image
  if (!product.image_url || product.image_url.trim() === '') return false

  // Skip if out of stock (check various formats)
  if (product.in_stock !== undefined && product.in_stock !== null) {
    const inStockStr = String(product.in_stock).toLowerCase()
    if (inStockStr === 'false' || inStockStr === '0' || inStockStr === 'no') {
      return false
    }
  }

  return true
}
