import { rawQuery, prisma } from "@shoetopia/db";
import { Readable } from "node:stream";
import { createGunzip } from "node:zlib";
import { parse } from "csv-parse";
import { CURRENCY } from "./feeds.js";
import { categorizeProduct, detectGender } from "./smart-categorizer.js";
import { mapFlexOffersCategory } from "./flexoffers-categories.js";
import {
  normalizeProductName,
  generateParentSlug,
  generateVariantSlug,
} from "./normalize.js";
import {
  createGuesser,
  detectProductType,
  detectGenderFromName,
  normalizeCsvGender,
} from "./shared/index.js";

export interface ImportStats {
  total: number;
  shoes: number;
  apparel: number;
  accessories: number;
  kids: number;
  mens: number;
  womens: number;
  unisex: number;
  skipped_no_name: number;
  skipped_no_stock: number;
  skipped_no_price: number;
  skipped_no_url: number;
  skipped_no_image: number;
  insert_error: number;
}

export interface ImportFeedResult {
  feed: string;
  feedId: number;
  imported: number;
  programId: number;
  stats: ImportStats;
  errors: string[];
}

const MAX_ERRORS = 10;

export async function importFeedById(
  feedId: number,
): Promise<ImportFeedResult> {
  const feed = await prisma.feed.findUnique({ where: { programId: feedId } });
  if (!feed) throw new Error(`Feed not found: ${feedId}`);

  console.log(`[import] Starting feed: ${feed.programName} (${feed.programId})`);
  console.log(feed.httpsLink);

  // Fetch feed CSV directly from FlexOffers URL
  const response = await fetch(feed.httpsLink!, {
    headers: { "Accept-Encoding": "gzip" },
  });

  if (!response.ok) {
    throw new Error(
      `Failed to fetch CSV: ${response.status} ${response.statusText}`,
    );
  }

  // Process ALL products - categorize properly, don't skip
  let imported = 0;
  const errors: string[] = [];
  const stats: ImportStats = {
    total: 0,
    shoes: 0,
    apparel: 0,
    accessories: 0,
    kids: 0,
    mens: 0,
    womens: 0,
    unisex: 0,
    skipped_no_name: 0,
    skipped_no_stock: 0,
    skipped_no_price: 0,
    skipped_no_url: 0,
    skipped_no_image: 0,
    insert_error: 0,
  };

  const BATCH_SIZE = 100;
  const batch: {
    program_id: number; product_id: string; country: string; region: string;
    currency: string; name: string; normalized_name: string; parent_slug: string;
    variant_slug: string; brand: string; advertiser_name: string; description: string;
    price: number | null; final_price: number | null; discount_pct: number;
    is_on_sale: boolean; gender: string | null; category: string; sub_category: string;
    color: string | null; size: string | null; sku: string | null;
    url: string; image_url: string; in_stock: boolean; visibility: string;
  }[] = [];

  const insertChunk = async (chunk: typeof batch) => {
    const params = chunk.flatMap((p) => [
      p.program_id, p.product_id, p.country, p.region, p.currency,
      p.name, p.normalized_name, p.parent_slug, p.variant_slug,
      p.brand, p.advertiser_name, p.description,
      p.price, p.final_price, p.discount_pct, p.is_on_sale,
      p.gender, p.category, p.sub_category,
      p.color, p.size, p.sku,
      p.url, p.image_url, p.in_stock, p.visibility,
    ]);
    const cols = params.length / chunk.length;
    const values = chunk
      .map((_, idx) => {
        const base = idx * cols;
        return `(${Array.from({ length: cols }, (__, c) => `$${base + c + 1}`).join(", ")})`;
      })
      .join(",");
    const query = `
      INSERT INTO variants (
        program_id, product_id, country, region, currency,
        name, normalized_name, parent_slug, variant_slug,
        brand, advertiser_name, description,
        price, final_price, discount_pct, is_on_sale,
        gender, category, sub_category,
        color, size, sku,
        url, image_url, in_stock, visibility
      ) VALUES ${values}
      ON CONFLICT (program_id, product_id) DO UPDATE SET
        name = EXCLUDED.name,
        price = EXCLUDED.price,
        final_price = EXCLUDED.final_price,
        image_url = EXCLUDED.image_url,
        in_stock = EXCLUDED.in_stock,
        advertiser_name = EXCLUDED.advertiser_name,
        region = EXCLUDED.region,
        gender = EXCLUDED.gender,
        category = EXCLUDED.category,
        sub_category = EXCLUDED.sub_category,
        visibility = CASE
          WHEN variants.visibility = 'live' THEN 'live'
          ELSE EXCLUDED.visibility
        END,
        updated_at = NOW()
    `;
    await rawQuery(query, params);
    return chunk.length;
  };

  const flushBatch = async () => {
    if (batch.length === 0) return;
    const toInsert = batch.splice(0, batch.length);
    try {
      const count = await insertChunk(toInsert);
      imported += count;
    } catch (err: any) {
      const msg = err?.message ?? "Unknown insert error";
      console.error(`[import] Batch insert failed:`, msg);
      if (errors.length < MAX_ERRORS) errors.push(msg);
      stats.insert_error += toInsert.length;
    }
  };

  const parser = Readable.fromWeb(response.body as Parameters<typeof Readable.fromWeb>[0])
    .pipe(createGunzip())
    .pipe(
      parse({
        columns: true,
        skip_empty_lines: true,
        relax_column_count: true,
        relax_quotes: true,
        quote: '"',
        escape: '"',
      }),
    );

  for await (const row of parser as AsyncIterable<Record<string, string>>) {
    stats.total++;
    const guess = createGuesser(row);

    try {
      const name = guess.name;
      const description = guess.description;

      if (!name) { stats.skipped_no_name++; continue; }

      const url = guess.url;
      const price = guess.originalPrice;
      const finalPrice = guess.finalPrice;
      const inStock = guess.isInStock;
      const imageUrl = row.ImageURL || row["Image URL"] || row.image_url || "";
      const brand = row.Brand || row.Manufacturer || feed.programName || "";
      const rawCategory = row.Category || row.CategoryId || "";
      const sku = row.SKU || row.Pid || row.ProductId || "";
      const color = row.Color || "";
      const size = row.Size || "";
      const currency =
        row.PriceCurrency ||
        CURRENCY[feed.country as keyof typeof CURRENCY] ||
        "USD";

      if (!inStock) { stats.skipped_no_stock++; continue; }
      if (!finalPrice && !price) { stats.skipped_no_price++; continue; }
      if (!url) { stats.skipped_no_url++; continue; }
      if (!imageUrl) { stats.skipped_no_image++; continue; }

      const productType = detectProductType(name, description);
      stats[productType]++;

      const genderOverride = detectGenderFromName(name);
      const csvGenderNormalized = normalizeCsvGender(row.Gender || row.gender || "");
      const keywordGender = detectGender(name, description + " " + rawCategory);
      const resolvedGender = genderOverride || csvGenderNormalized || keywordGender || "unisex";

      if (resolvedGender === "kids") stats.kids++;
      else if (resolvedGender === "mens") stats.mens++;
      else if (resolvedGender === "womens") stats.womens++;
      else stats.unisex++;

      let categorized: { gender: string | null; category: string; sub_category: string } =
        { gender: resolvedGender, category: "other", sub_category: "Other" };

      if (productType === "shoes") {
        categorized = categorizeProduct(name, description, rawCategory, resolvedGender);
        categorized.gender = resolvedGender;
        if (categorized.category === "other" || categorized.sub_category === "Other") {
          const categoryId = row.CategoryId || row.CategoryID || "";
          const foCategory = mapFlexOffersCategory(categoryId);
          if (foCategory.category !== "other") {
            categorized = { ...foCategory, gender: resolvedGender };
          }
        }
      } else if (productType === "apparel") {
        categorized = { gender: resolvedGender, category: "apparel", sub_category: "Clothing" };
      } else if (productType === "accessories") {
        categorized = { gender: resolvedGender, category: "accessories", sub_category: "Accessories" };
      }

      const productId = sku || `${feed.programId}-${name.slice(0, 50)}`;
      const effectivePrice = finalPrice > 0 ? finalPrice : price;
      const isOnSale = price > 0 && effectivePrice > 0 && effectivePrice < price;
      const discountPct = isOnSale ? Math.round(((price - effectivePrice) / price) * 100) : 0;

      const normalizedName = normalizeProductName(name);
      const parentSlug = generateParentSlug(name);
      const variantSlug = generateVariantSlug(name, color, size);

      batch.push({
        program_id: feed.programId,
        product_id: productId,
        country: feed.country,
        region: feed.region,
        currency,
        name,
        normalized_name: normalizedName,
        parent_slug: parentSlug,
        variant_slug: variantSlug,
        brand,
        advertiser_name: feed.programName,
        description: description.slice(0, 1000),
        price: price || null,
        final_price: effectivePrice || null,
        discount_pct: discountPct,
        is_on_sale: isOnSale,
        gender: categorized.gender,
        category: categorized.category,
        sub_category: categorized.sub_category,
        color: color || null,
        size: size || null,
        sku: sku || null,
        url,
        image_url: imageUrl,
        in_stock: inStock,
        visibility: "pending",
      });

      if (batch.length >= BATCH_SIZE) {
        await flushBatch();
      }
    } catch (e: any) {
      const msg = e.message || "Unknown error";
      if (errors.length < MAX_ERRORS) errors.push(msg);
      stats.insert_error++;
    }
  }

  await flushBatch();

  console.log(`[import] Complete: ${imported} products imported from ${feed.programName}`);

  return {
    feed: feed.programName,
    feedId: feed.programId,
    imported,
    programId: feed.programId,
    stats,
    errors,
  };
}
