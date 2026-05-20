import { rawQuery } from "@shoetopia/db";
import { gunzipSync } from "zlib";
import { parse as parseCSV } from "csv-parse/sync";
import { FEEDS, CURRENCY } from "./feeds.js";
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
  const feed = FEEDS.find((f) => f.id === feedId);
  if (!feed) throw new Error(`Feed not found: ${feedId}`);

  console.log(`[import] Starting feed: ${feed.name} (${feed.id})`);
  console.log(feed.url);

  // Fetch feed CSV directly from FlexOffers URL
  const response = await fetch(feed.url, {
    headers: { "Accept-Encoding": "gzip" },
  });

  if (!response.ok) {
    throw new Error(
      `Failed to fetch CSV: ${response.status} ${response.statusText}`,
    );
  }

  // Decompress if gzipped
  const buffer = Buffer.from(await response.arrayBuffer());
  let csvData: string;

  try {
    csvData = gunzipSync(buffer).toString("utf-8");
  } catch {
    csvData = buffer.toString("utf-8");
  }

  // Parse CSV
  let rows: Record<string, string>[] = [];
  try {
    rows = parseCSV(csvData, {
      columns: true,
      skip_empty_lines: true,
      relax_column_count: true,
      relax_quotes: true,
      quote: '"',
      escape: '"',
    });
    console.log(`[import] Parsed ${rows.length} rows from ${feed.name}`);
  } catch (e: any) {
    throw new Error(`Failed to parse CSV: ${e.message}`);
  }

  // Process ALL products - categorize properly, don't skip
  const productsToInsert: any[] = [];
  let imported = 0;
  const errors: string[] = [];
  const stats: ImportStats = {
    total: rows.length,
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

  for (const row of rows) {
    const guess = createGuesser(row);

    try {
      const name = guess.name;
      const description = guess.description;

      if (!name) {
        stats.skipped_no_name++;
        continue;
      }

      const url = guess.url;
      // originalPrice: prefer RetailPrice (MSRP), fall back to SalePrice > currentPrice heuristic
      const price = guess.originalPrice;
      // effectivePrice: what the shopper actually pays
      const finalPrice = guess.finalPrice;

      const inStock = guess.isInStock;

      const imageUrl = row.ImageURL || row["Image URL"] || row.image_url || "";
      const brand = row.Brand || row.Manufacturer || feed.name || "";
      const rawCategory = row.Category || row.CategoryId || "";
      const sku = row.SKU || row.Pid || row.ProductId || "";
      const color = row.Color || "";
      const size = row.Size || "";
      const currency =
        row.PriceCurrency ||
        CURRENCY[feed.country as keyof typeof CURRENCY] ||
        "USD";

      // Basic validation - still skip truly invalid products
      // Note: shouldImportProduct from @/lib/smart-categorizer is intentionally NOT used here.
      // These inline checks replace it with more granular per-field tracking via stats.
      if (!inStock) {
        stats.skipped_no_stock++;
        continue;
      }
      if (!finalPrice && !price) {
        stats.skipped_no_price++;
        continue;
      }
      if (!url) {
        stats.skipped_no_url++;
        continue;
      }
      if (!imageUrl) {
        stats.skipped_no_image++;
        continue;
      }

      // ============================================================
      // STEP 1: Detect product type (shoes, apparel, accessories)
      // ============================================================
      const productType = detectProductType(name, description);
      stats[productType]++;

      // ============================================================
      // STEP 2: Detect gender with strict priority
      // Kids/Boys/Girls/Infant ALWAYS goes to kids, ONLY kids
      // Products can only be in ONE gender category
      // ============================================================
      const genderOverride = detectGenderFromName(name);

      const csvGenderNormalized = normalizeCsvGender(
        row.Gender || row.gender || "",
      );

      // Keyword detection as final fallback
      const keywordGender = detectGender(name, description + " " + rawCategory);

      // Priority: Name override > CSV gender > Keyword detection > Default to unisex
      const resolvedGender =
        genderOverride || csvGenderNormalized || keywordGender || "unisex";

      // Track gender stats
      if (resolvedGender === "kids") stats.kids++;
      else if (resolvedGender === "mens") stats.mens++;
      else if (resolvedGender === "womens") stats.womens++;
      else stats.unisex++;

      // ============================================================
      // STEP 3: Categorize based on product type
      // ============================================================
      let categorized: {
        gender: string | null;
        category: string;
        sub_category: string;
      } = { gender: resolvedGender, category: "other", sub_category: "Other" };

      if (productType === "shoes") {
        // Use smart categorization for shoes
        categorized = categorizeProduct(
          name,
          description,
          rawCategory,
          resolvedGender,
        );
        categorized.gender = resolvedGender; // Enforce our gender detection

        // Try FlexOffers category mapping if we got 'other'
        if (
          categorized.category === "other" ||
          categorized.sub_category === "Other"
        ) {
          const categoryId = row.CategoryId || row.CategoryID || "";
          const foCategory = mapFlexOffersCategory(categoryId);
          if (foCategory.category !== "other") {
            categorized = { ...foCategory, gender: resolvedGender };
          }
        }
      } else if (productType === "apparel") {
        categorized = {
          gender: resolvedGender,
          category: "apparel",
          sub_category: "Clothing",
        };
      } else if (productType === "accessories") {
        categorized = {
          gender: resolvedGender,
          category: "accessories",
          sub_category: "Accessories",
        };
      }

      // Build product record
      const productId = sku || `${feed.id}-${name.slice(0, 50)}`;
      const effectivePrice = finalPrice > 0 ? finalPrice : price;
      const isOnSale =
        price > 0 && effectivePrice > 0 && effectivePrice < price;
      const discountPct = isOnSale
        ? Math.round(((price - effectivePrice) / price) * 100)
        : 0;

      const normalizedName = normalizeProductName(name);
      const parentSlug = generateParentSlug(name);
      const variantSlug = generateVariantSlug(name, color, size);

      productsToInsert.push({
        program_id: feed.id,
        product_id: productId,
        country: feed.country,
        region: feed.region, // Region for subdomain routing (na, eu, me, apac)
        currency: currency,
        name: name,
        normalized_name: normalizedName,
        parent_slug: parentSlug,
        variant_slug: variantSlug,
        brand: brand,
        advertiser_name: feed.name, // ALWAYS set from feed name (retailer like "DSW", "Zappos")
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
        url: url,
        image_url: imageUrl,
        in_stock: inStock,
        visibility: "pending", // Start as pending, nightly job promotes to live
      });
    } catch (e: any) {
      const msg = e.message || "Unknown error";
      if (errors.length < MAX_ERRORS) errors.push(msg);
      stats.insert_error++;
    }
  }

  // Batch insert products in chunks of 500, up to 10 chunks concurrently.
  // Previously sequential (100/chunk) → 500 chunks × ~500ms = ~250s for large feeds.
  // Now parallel (500/chunk, 10 concurrent) → 10 rounds × ~500ms = ~5s.
  const BATCH_SIZE = 500;
  const CONCURRENCY = 10;

  if (productsToInsert.length > 0) {
    console.log(
      `[import] Inserting ${productsToInsert.length} products (${BATCH_SIZE}/chunk, ${CONCURRENCY} concurrent)`,
    );
    console.log(
      `[import] Types: ${stats.shoes} shoes, ${stats.apparel} apparel, ${stats.accessories} accessories`,
    );
    console.log(
      `[import] Genders: ${stats.kids} kids, ${stats.mens} mens, ${stats.womens} womens, ${stats.unisex} unisex`,
    );

    const insertChunk = async (chunk: typeof productsToInsert) => {
      const params = chunk.flatMap((p) => [
        p.program_id,
        p.product_id,
        p.country,
        p.region,
        p.currency,
        p.name,
        p.normalized_name,
        p.parent_slug,
        p.variant_slug,
        p.brand,
        p.advertiser_name,
        p.description,
        p.price,
        p.final_price,
        p.discount_pct,
        p.is_on_sale,
        p.gender,
        p.category,
        p.sub_category,
        p.color,
        p.size,
        p.sku,
        p.url,
        p.image_url,
        p.in_stock,
        p.visibility,
      ]);

      const cols = params.length / chunk.length;
      const values = chunk
        .map((_, idx) => {
          const base = idx * cols;
          return `(${Array.from({ length: cols }, (__, c) => `$${base + c + 1}`).join(", ")})`;
        })
        .join(",");

      // Raw SQL: batch INSERT ... ON CONFLICT (program_id, product_id) DO UPDATE —
      // Prisma has no native bulk upsert; createMany() can't express conflict-resolution
      // strategy or return per-row insert-vs-update tracking needed for import stats.
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

    const chunks: (typeof productsToInsert)[] = [];
    for (let i = 0; i < productsToInsert.length; i += BATCH_SIZE) {
      chunks.push(productsToInsert.slice(i, i + BATCH_SIZE));
    }

    for (let i = 0; i < chunks.length; i += CONCURRENCY) {
      const round = chunks.slice(i, i + CONCURRENCY);
      const results = await Promise.allSettled(round.map(insertChunk));
      for (const result of results) {
        if (result.status === "fulfilled") {
          imported += result.value;
        } else {
          console.error(
            `[import] Batch insert failed:`,
            result.reason?.message,
          );
          if (errors.length < MAX_ERRORS) errors.push(result.reason?.message);
          stats.insert_error += BATCH_SIZE;
        }
      }
    }
  }

  console.log(
    `[import] Complete: ${imported} products imported from ${feed.name}`,
  );

  return {
    feed: feed.name,
    feedId: feed.id,
    imported,
    programId: feed.id,
    stats,
    errors,
  };
}
