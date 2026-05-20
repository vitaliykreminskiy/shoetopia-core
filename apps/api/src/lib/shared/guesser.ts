import {
  SHOE_KEYWORDS,
  APPAREL_KEYWORDS,
  ACCESSORIES_KEYWORDS,
  KIDS_KEYWORDS,
  UNISEX_KEYWORDS,
  WOMENS_KEYWORDS,
  MENS_KEYWORDS,
} from "./constants.js";
import type { ProductType } from "./types.js";

export function detectProductType(name: string, description: string): ProductType {
  const text = `${name} ${description}`.toLowerCase();

  if (SHOE_KEYWORDS.some((kw) => text.includes(kw))) return "shoes";
  if (APPAREL_KEYWORDS.some((kw) => text.includes(kw))) return "apparel";
  if (ACCESSORIES_KEYWORDS.some((kw) => text.includes(kw))) return "accessories";

  return "shoes";
}

// IMPORTANT: check womens BEFORE mens — "women's" contains "men's" as a substring,
// so checking mens first causes "Women's Sandal" → hasMens=true → wrongly 'unisex'.
export function detectGenderFromName(name: string): string | null {
  const nameLower = ` ${name.toLowerCase()} `;

  if (KIDS_KEYWORDS.some((kw) => nameLower.includes(kw.toLowerCase()))) return "kids";
  if (UNISEX_KEYWORDS.some((kw) => nameLower.includes(kw.toLowerCase()))) return "unisex";
  if (WOMENS_KEYWORDS.some((kw) => nameLower.includes(kw.toLowerCase()))) return "womens";
  if (MENS_KEYWORDS.some((kw) => nameLower.includes(kw.toLowerCase()))) return "mens";

  return null;
}

// IMPORTANT: check 'female'/'women' BEFORE 'male'/'men' to avoid substring false-positives.
export function normalizeCsvGender(csvGender: string): string | null {
  const g = csvGender.toLowerCase().trim();

  if (
    g.includes("kid") ||
    g.includes("child") ||
    g.includes("youth") ||
    g.includes("infant") ||
    g.includes("toddler") ||
    g.includes("boy") ||
    g.includes("girl")
  ) return "kids";

  if (g.includes("unisex")) return "unisex";

  if (g.includes("female") || g.includes("women") || g.includes("woman")) return "womens";

  if (g.includes("male") || g === "men" || g === "mens" || g.startsWith("men ")) return "mens";

  return null;
}

export const createGuesser = (row: Record<string, string>) => {
  const description = row.Description || row.ShortDescription || "";
  const name =
    row.Name || row.name || row.ProductName || row["Product Name"] || "";
  const url =
    row.DeepLinkURL ||
    row.LinkUrl ||
    row["Deep Link URL"] ||
    row.ProductURL ||
    "";
  const isInStockRaw = (
    row.IsInStock ||
    row["IsInStock"] ||
    row.in_stock ||
    "true"
  )
    .toLowerCase()
    .trim();
  /**  FlexOffers price fields:
   *   RetailPrice = MSRP / original price (present when item is on sale)
   *   Price       = current selling price
   *   SalePrice   = explicit sale price (some feeds, usually == Price when on sale)
   **/
  const currentPrice = parseFloat(row.Price || row.price || "0") || 0;
  const salePrice = parseFloat(row.SalePrice || row["Sale Price"] || "0") || 0;
  const retailPrice =
    parseFloat(
      row.RetailPrice ||
        row["Retail Price"] ||
        row["Regular Price"] ||
        row["List Price"] ||
        "0",
    ) || 0;

  const getOriginalPrice = () => {
    if (retailPrice > 0) return retailPrice;

    return salePrice > 0 && salePrice > currentPrice ? salePrice : currentPrice;
  };

  const getFinalPrice = () => {
    if (currentPrice > 0) return currentPrice;

    return salePrice > 0 ? salePrice : getOriginalPrice();
  };

  const isInStock =
    isInStockRaw === "true" ||
    isInStockRaw === "yes" ||
    isInStockRaw === "in stock";

  return {
    url,
    name,
    isInStock,
    salePrice,
    retailPrice,
    description,
    currentPrice,
    finalPrice: getFinalPrice(),
    originalPrice: getOriginalPrice(),
  };
};
