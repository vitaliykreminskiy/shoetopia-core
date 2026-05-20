/**
 * FlexOffers CategoryId → Shoetopia Category Mapping
 * Maps affiliate feed category IDs to our site structure
 */

export interface CategoryMapping {
  category: string
  sub_category: string
  gender?: string
}

// Map FlexOffers CategoryIds to our site structure
// Key: FlexOffers CategoryId, Value: Our site category/subcategory
export const FLEXOFFERS_CATEGORY_MAP: Record<string, CategoryMapping> = {
  // Footwear - Women
  '2': { category: 'footwear', sub_category: 'sandals', gender: 'women' },           // Sandals
  '3': { category: 'footwear', sub_category: 'boots', gender: 'women' },             // Boots & Booties
  '5': { category: 'footwear', sub_category: 'heels', gender: 'women' },             // High Heels
  '6': { category: 'footwear', sub_category: 'flats', gender: 'women' },             // Flats
  '7': { category: 'footwear', sub_category: 'sneakers', gender: 'women' },          // Athletic Shoes
  '8': { category: 'footwear', sub_category: 'slippers', gender: 'women' },          // Slippers
  '111': { category: 'footwear', sub_category: 'sandals', gender: 'women' },         // Wedge Sandals
  '112': { category: 'footwear', sub_category: 'heels', gender: 'women' },           // Pumps & Heels
  
  // Footwear - Men
  '9': { category: 'footwear', sub_category: 'boots', gender: 'men' },               // Boots
  '10': { category: 'footwear', sub_category: 'sandals', gender: 'men' },            // Sandals
  '11': { category: 'footwear', sub_category: 'sneakers', gender: 'men' },           // Athletic Shoes
  '12': { category: 'footwear', sub_category: 'flats', gender: 'men' },              // Dress Shoes
  '13': { category: 'footwear', sub_category: 'slippers', gender: 'men' },           // Slippers
  '14': { category: 'footwear', sub_category: 'loafers', gender: 'men' },            // Loafers
  
  // Footwear - Kids
  '15': { category: 'footwear', sub_category: 'sneakers', gender: 'kids' },          // Kids Shoes
  '16': { category: 'footwear', sub_category: 'boots', gender: 'kids' },             // Kids Boots
  '17': { category: 'footwear', sub_category: 'sandals', gender: 'kids' },           // Kids Sandals
  
  // Accessories
  '1': { category: 'accessories', sub_category: 'bags' },                            // Bags & Handbags
  '18': { category: 'accessories', sub_category: 'belts' },                          // Belts
  '19': { category: 'accessories', sub_category: 'hats' },                           // Hats & Caps
  '20': { category: 'accessories', sub_category: 'scarves' },                        // Scarves
  '21': { category: 'accessories', sub_category: 'gloves' },                         // Gloves
  '22': { category: 'accessories', sub_category: 'socks' },                          // Socks
  '50': { category: 'accessories', sub_category: 'bags' },                           // Backpacks
  '51': { category: 'accessories', sub_category: 'bags' },                           // Travel Bags
  
  // Clothing
  '23': { category: 'clothing', sub_category: 'tops' },                              // Shirts & Tops
  '24': { category: 'clothing', sub_category: 'bottoms' },                           // Pants & Jeans
  '25': { category: 'clothing', sub_category: 'dresses' },                           // Dresses
  '26': { category: 'clothing', sub_category: 'outerwear' },                         // Jackets & Coats
  '27': { category: 'clothing', sub_category: 'tops' },                              // Sweaters
  '28': { category: 'clothing', sub_category: 'active' },                            // Activewear
  '166': { category: 'accessories', sub_category: 'bags' },                          // Apparel & Accessories
  
  // Default fallback for unmapped categories
  'default': { category: 'other', sub_category: 'miscellaneous' },
}

/**
 * Map a FlexOffers CategoryId to our site structure
 */
export function mapFlexOffersCategory(categoryId: string | number): CategoryMapping {
  const idStr = String(categoryId)
  return FLEXOFFERS_CATEGORY_MAP[idStr] || FLEXOFFERS_CATEGORY_MAP['default']
}
