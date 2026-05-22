/**
 * normalizeProductName
 *
 * Strips size and other variant-specific suffixes from a product name so that
 * all size variants of the same product share one parent_slug.
 * Colors are intentionally KEPT so that colorways form their own groups.
 *
 * Examples:
 *   "Nike Air Max 90 - Black - Size 8"     → "Nike Air Max 90 - Black"
 *   "Nike Air Max 90 - Black 8.5"          → "Nike Air Max 90 - Black"
 *   "Nike Air Max 90 Black 8"              → "Nike Air Max 90 Black"
 *   "Nike Air Max 90 - Black - 10.5"       → "Nike Air Max 90 - Black"
 *   "Nike Air Max 90 (Black) Size 8"       → "Nike Air Max 90 (Black)"
 *   "UGG Classic Short Boot - Chestnut"    → "UGG Classic Short Boot - Chestnut"
 *   "Adidas Stan Smith White/Black - 9.5"  → "Adidas Stan Smith White/Black"
 *   "Converse Chuck Taylor - Black/9"      → "Converse Chuck Taylor - Black"
 *   "Nike Air Max 90 Black 10EE"           → "Nike Air Max 90 Black"
 *   "Levi's 501 Jean 32x30"                → "Levi's 501 Jean"
 *   "New Balance 990v5 M990GL5"            → "New Balance 990v5"
 */

// Shoe width codes (order matters — longest first)
const WIDTH_CODES = '(?:EEEE|EEE|EE|4E|2E|D\\s*\\(?M\\)?|W|N|B)'

// US shoe sizes with optional half and optional width code
const BARE_SIZE = new RegExp(`\\s+\\d{1,2}(\\.\\d)?\\s*${WIDTH_CODES}?\\s*$`, 'i')

// Dash or en-dash immediately followed by a bare size: "– 8", "- 10.5W"
const DASH_SIZE = new RegExp(`\\s*[-–]\\s*\\d{1,2}(\\.\\d)?\\s*${WIDTH_CODES}?\\s*$`, 'i')

// Explicit size labels with numeric value: "Size 10", "UK 9", "EU 43", "CM 26"
const SIZE_LABEL = /\b(Size|Sz|UK|US|EU|EUR|CM|Width|Wide)\s*[\d.]+\b/gi

// Word-form apparel sizes
const APPAREL_SIZE = /\b(XXS|XS|X-Small|Small|Medium|Large|XL|XXL|XXXL|2XL|3XL|4XL|One[\s-]Size|OS|S\/M|M\/L|L\/XL|XL\/XXL)\b/gi

// Dimension patterns: 32x30, 34W x 30L
const DIMENSION = /\b\d{2}[Ww]?\s*[xX×]\s*\d{2}[Ll]?\b/g

// Trailing parenthetical that contains a SIZE indicator (digit or apparel word).
// Color-only parens like "(Black)" are intentionally NOT matched so colors are preserved.
const TRAILING_SIZE_PARENS = /\s*\([^)]*(\d|XXS|XS|X-Small|Small|Medium|Large|XL|XXL|XXXL|2XL|3XL|4XL)[^)]*\)\s*$/i

// Trailing square bracket size: [10.5], [Size 9], [Large]
const TRAILING_BRACKETS = /\s*\[[^\]]*(\d|XXS|XS|Small|Medium|Large|XL|XXL)[^\]]*\]\s*$/i

// Trailing slash+size: "/10", "/White/9.5", "/9.5/M"
const SLASH_SIZE_SUFFIX = /\s*\/\s*[\d.]+\s*(\/\s*[A-Z]+)?\s*$/i

// Width descriptor words after a separator
const WIDTH_WORD = /\s*[,–-]\s*(Narrow|Wide|Extra\s*Wide|Slim|Regular)\s*$/i

// Trailing SKU codes: M990GL5, W990BK5 (1–3 letters + 3+ digits + optional alphanum)
const TRAILING_SKU = /\s+[A-Z]{1,3}\d{3,}[A-Z0-9]*\s*$/

// Trailing lone width letter left over after size stripping: " W", " M", " N"
const LONE_WIDTH = /\s+[WMND]\s*$/i

export function normalizeProductName(raw: string): string {
  let name = raw.trim()

  // 1. Remove trailing size-containing parens: "(Size 9M)", "(White/10.5)", "(10)"
  //    Color-only parens like "(Black)" are left intact.
  name = name.replace(TRAILING_SIZE_PARENS, '').trim()

  // 2. Remove trailing square bracket sizes: [10.5], [Size 9]
  name = name.replace(TRAILING_BRACKETS, '').trim()

  // 3. Remove trailing slash+size suffix: "/10", "/9.5/M"
  name = name.replace(SLASH_SIZE_SUFFIX, '').trim()

  // 4. Remove dimension strings: 32x30, 34W x 30L
  name = name.replace(DIMENSION, '').trim()

  // 5. Remove explicit size labels anywhere in the string: "Size 10", "UK 9", "EU 43"
  name = name.replace(SIZE_LABEL, '').trim()

  // 6. Strip apparel word-sizes: XS, Small, Medium, XL, etc.
  name = name.replace(APPAREL_SIZE, '').trim()

  // 7. Strip width descriptor words after a separator: "- Wide", "- Narrow"
  name = name.replace(WIDTH_WORD, '').trim()

  // 8. Strip dash+bare size suffix: "- 8", "– 10.5", "- 8W", "- 10EE"
  //    Must run BEFORE bare size so "- 8" is caught before " 8"
  name = name.replace(DASH_SIZE, '').trim()

  // 9. Strip bare trailing numeric size: " 10", " 8.5", " 10W", " 10EE"
  name = name.replace(BARE_SIZE, '').trim()

  // 10. Strip any lone width letter left over: " W", " N"
  name = name.replace(LONE_WIDTH, '').trim()

  // 11. Strip trailing SKU codes: "New Balance 990v5 M990GL5"
  name = name.replace(TRAILING_SKU, '').trim()

  // 12. Clean up trailing separators and punctuation left over
  name = name.replace(/\s*[-–|,/]+\s*$/, '').trim()

  return name
}

/**
 * Generate a URL-safe parent_slug from a raw product name.
 * This is the key used to group all size variants of the same colorway together.
 */
export function generateParentSlug(rawName: string): string {
  const normalized = normalizeProductName(rawName)
  const slug = normalized
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 100)

  if (!slug) {
    console.warn('[normalize] Empty slug generated for:', rawName)
  }

  return slug
}

/**
 * Generate a variant_slug that includes color and size for uniqueness within a group.
 */
export function generateVariantSlug(rawName: string, color?: string | null, size?: string | null): string {
  const parentSlug = generateParentSlug(rawName)
  return [parentSlug, color, size]
    .filter(Boolean)
    .join('-')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 150)
}
