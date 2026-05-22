import { prisma, rawQuery, Prisma } from "@shoetopia/db";

import { HIDDEN_BRANDS } from "@shoetopia/jobs";
import type {
  ProductsDAL,
  ProductListItem,
  ProductDetail,
  ProductListParams,
  ProductListResult,
  ColorVariant,
  PriceRange,
  SitemapProduct,
  BrandInfo,
  AutocompleteParams,
  AutocompleteResults,
  FullSearchParams,
  SearchResultsPage,
  FeaturedDealsParams,
  BrandProductsParams,
  EditorialProductsParams,
  MasonryProductsParams,
  MasonryProductsResult,
  RelatedProductsParams,
  SaleProduct,
  FavoriteProduct,
  OccasionProduct,
  ProductStats,
} from "../../product.js";
import { FOOTWEAR_FILTER, IMAGE_CDN_FILTER } from "@shoetopia/jobs";

const PRODUCTS_PER_SITEMAP = 45000;

// --- Shared SQL helpers ---

function deduplicateByImage(products: any[]): any[] {
  const seen = new Set<string>();
  return products.filter((p) => {
    if (!p.image_url) return false;
    if (seen.has(p.image_url)) return false;
    seen.add(p.image_url);
    return true;
  });
}

function buildGenderCondition(gender: string, alias = "g"): string {
  const g = gender.toLowerCase();
  if (g === "kids" || g === "infant")
    return `(${alias}.gender = 'kids' OR ${alias}.gender = 'infant')`;
  if (g === "womens" || g === "women")
    return `(${alias}.gender = 'womens' OR ${alias}.gender = 'unisex')`;
  if (g === "mens" || g === "men")
    return `(${alias}.gender = 'mens' OR ${alias}.gender = 'unisex')`;
  return `${alias}.gender = '${g}'`;
}

function buildSortClause(sort: string): string {
  switch (sort) {
    case "price_asc":
      return "g.best_price ASC NULLS LAST";
    case "price_desc":
      return "g.best_price DESC NULLS LAST";
    case "discount":
      return "g.discount_pct DESC NULLS LAST, g.id DESC";
    case "newest":
      return "g.id DESC";
    default:
      return "MOD(HASHTEXT(g.slug), 9999) ASC, g.id DESC";
  }
}

function extractPriceFromQuery(q: string): {
  strippedQ: string;
  minPrice?: number;
  maxPrice?: number;
} {
  let minPrice: number | undefined;
  let maxPrice: number | undefined;
  const strippedQ = q
    .replace(/under\s+\$?(\d+(?:\.\d+)?)/gi, (_, n) => {
      maxPrice = parseFloat(n);
      return "";
    })
    .replace(/below\s+\$?(\d+(?:\.\d+)?)/gi, (_, n) => {
      maxPrice = parseFloat(n);
      return "";
    })
    .replace(/less\s+than\s+\$?(\d+(?:\.\d+)?)/gi, (_, n) => {
      maxPrice = parseFloat(n);
      return "";
    })
    .replace(/over\s+\$?(\d+(?:\.\d+)?)/gi, (_, n) => {
      minPrice = parseFloat(n);
      return "";
    })
    .replace(/above\s+\$?(\d+(?:\.\d+)?)/gi, (_, n) => {
      minPrice = parseFloat(n);
      return "";
    })
    .replace(/more\s+than\s+\$?(\d+(?:\.\d+)?)/gi, (_, n) => {
      minPrice = parseFloat(n);
      return "";
    })
    .replace(/\$?(\d+(?:\.\d+)?)\s*-\s*\$?(\d+(?:\.\d+)?)/gi, (_, a, b) => {
      minPrice = parseFloat(a);
      maxPrice = parseFloat(b);
      return "";
    })
    .replace(/\$\d+(?:\.\d+)?/g, "")
    .trim();
  return { strippedQ, minPrice, maxPrice };
}

function buildWordFilter(words: string[]): Prisma.Sql {
  if (words.length === 0) return Prisma.empty;
  const conditions = words.map((word) => {
    const wp = `%${word}%`;
    return Prisma.sql`(
      LOWER(g.brand) ILIKE ${wp}
      OR LOWER(COALESCE(g.normalized_name, g.name)) ILIKE ${wp}
      OR LOWER(g.category) ILIKE ${wp}
      OR LOWER(g.sub_category) ILIKE ${wp}
      OR LOWER(g.gender) ILIKE ${wp}
    )`;
  });
  return conditions.reduce((acc, cond) => Prisma.sql`${acc} AND ${cond}`);
}

function hiddenBrandsFilter(): Prisma.Sql {
  if (HIDDEN_BRANDS.length === 0) return Prisma.sql``;
  return Prisma.sql`AND g.brand NOT IN (${Prisma.join(HIDDEN_BRANDS.map((b) => Prisma.sql`${b}`))})`;
}

// --- Implementation ---

export const prismaProductsDal: ProductsDAL = {
  async findMany(params: ProductListParams): Promise<ProductListResult> {
    const {
      country = "US",
      gender,
      genderFilter,
      category,
      subCategory,
      brand,
      advertiser,
      size,
      color,
      minPrice,
      maxPrice,
      onSale,
      sort = "relevance",
      page = 1,
      limit: rawLimit = 48,
      cursor,
      q,
    } = params;

    const limit = Math.min(rawLimit, 96);
    const offset = cursor ? 0 : (page - 1) * limit;

    const conditions: string[] = [
      `g.visibility = 'live'`,
      `g.in_stock = true`,
      `g.image_url IS NOT NULL`,
      `g.image_url != ''`,
      `g.best_price > 0`,
      `(g.url IS NOT NULL AND g.url != '')`,
      ...(HIDDEN_BRANDS.length > 0
        ? [
            `g.brand NOT IN (${HIDDEN_BRANDS.map((b) => `'${b.replace(/'/g, "''")}'`).join(",")})`,
          ]
        : []),
    ];
    const sqlParams: unknown[] = [];

    sqlParams.push(country);
    conditions.push(`g.country = $${sqlParams.length}`);

    if (gender) conditions.push(buildGenderCondition(gender));

    if (genderFilter) {
      const gf = genderFilter.toLowerCase();
      if (["kids", "boys", "girls", "infant"].includes(gf)) {
        conditions.push(`(g.gender = 'kids' OR g.gender = 'infant')`);
      } else if (gf === "womens" || gf === "women") {
        conditions.push(`(g.gender = 'womens' OR g.gender = 'unisex')`);
      } else if (gf === "mens" || gf === "men") {
        conditions.push(`(g.gender = 'mens' OR g.gender = 'unisex')`);
      }
    }

    if (category) {
      const c = category.toLowerCase();
      if (c.includes("/")) {
        const [parentCat, subCat] = c.split("/");
        sqlParams.push(parentCat);
        conditions.push(`LOWER(g.category) = $${sqlParams.length}`);
        sqlParams.push(subCat);
        conditions.push(`LOWER(g.sub_category) = $${sqlParams.length}`);
      } else if (["accessories", "apparel", "bags"].includes(c)) {
        sqlParams.push(c);
        conditions.push(`LOWER(g.category) = $${sqlParams.length}`);
        if (subCategory) {
          const sc = subCategory.toLowerCase();
          sqlParams.push(sc);
          const p$ = `$${sqlParams.length}`;
          conditions.push(
            `(LOWER(g.sub_category) = ${p$} OR LOWER(g.sub_category) LIKE ${p$} || ',%' OR LOWER(g.sub_category) LIKE '%,' || ${p$} || ',%' OR LOWER(g.sub_category) LIKE '%,' || ${p$})`,
          );
        }
      } else {
        sqlParams.push(c);
        const p$ = `$${sqlParams.length}`;
        conditions.push(
          `(LOWER(g.category) = ${p$} OR LOWER(g.sub_category) = ${p$} OR LOWER(g.sub_category) LIKE ${p$} || ',%' OR LOWER(g.sub_category) LIKE '%,' || ${p$} || ',%' OR LOWER(g.sub_category) LIKE '%,' || ${p$})`,
        );
      }
    } else if (gender) {
      conditions.push(
        `g.category NOT ILIKE '%apparel%' AND g.category NOT ILIKE '%accessory%' AND g.category NOT ILIKE '%accessories%' AND g.category NOT ILIKE '%clothing%' AND g.category NOT ILIKE '%socks%' AND g.category NOT ILIKE '%bags%'`,
      );
    }

    if (brand) {
      sqlParams.push(`%${brand}%`);
      conditions.push(`g.brand ILIKE $${sqlParams.length}`);
    }

    if (advertiser) {
      sqlParams.push(`%${advertiser}%`);
      conditions.push(
        `g.best_variant_id IN (SELECT v2.id FROM variants v2 JOIN advertisers a ON a.program_id = v2.program_id WHERE a.name ILIKE $${sqlParams.length})`,
      );
    }

    if (size) {
      const escapedSize = size.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      sqlParams.push(`^${escapedSize}([^0-9.]|$)`);
      conditions.push(
        `EXISTS (SELECT 1 FROM variants v2 WHERE v2.group_id = g.id AND v2.in_stock = true AND v2.size ~* $${sqlParams.length})`,
      );
    }

    if (color) {
      sqlParams.push(`%${color}%`);
      conditions.push(
        `EXISTS (SELECT 1 FROM variants v2 WHERE v2.id = g.best_variant_id AND v2.color ILIKE $${sqlParams.length})`,
      );
    }

    if (minPrice) {
      sqlParams.push(minPrice);
      conditions.push(`g.best_price >= $${sqlParams.length}`);
    }
    if (maxPrice) {
      sqlParams.push(maxPrice);
      conditions.push(`g.best_price <= $${sqlParams.length}`);
    }

    if (onSale || sort === "discount") {
      conditions.push(
        `(v.price IS NOT NULL AND v.price > 0 AND g.best_price > 0 AND g.best_price < v.price)`,
      );
    }

    if (q) {
      const cleanQ = q.replace(/['‘’`ʼ＇]/g, "").toLowerCase();
      const {
        strippedQ,
        minPrice: extractedMin,
        maxPrice: extractedMax,
      } = extractPriceFromQuery(cleanQ);

      if (extractedMin !== undefined && !minPrice) {
        sqlParams.push(extractedMin);
        conditions.push(`g.best_price >= $${sqlParams.length}`);
      }
      if (extractedMax !== undefined && !maxPrice) {
        sqlParams.push(extractedMax);
        conditions.push(`g.best_price <= $${sqlParams.length}`);
      }

      const isMensQuery =
        /\bmens?\b/i.test(strippedQ) && !/\bwomens?\b/i.test(strippedQ);
      const normalizedQ = strippedQ
        .replace(/\bwomens\b/gi, "women's")
        .replace(/\bmens\b/gi, "men's");

      normalizedQ
        .split(/\s+/)
        .filter(Boolean)
        .forEach((word) => {
          sqlParams.push(`%${word}%`);
          const idx = sqlParams.length;
          conditions.push(
            `(g.name ILIKE $${idx} OR g.normalized_name ILIKE $${idx} OR g.brand ILIKE $${idx} OR g.category ILIKE $${idx} OR g.sub_category ILIKE $${idx} OR g.gender ILIKE $${idx})`,
          );
        });

      if (isMensQuery) {
        sqlParams.push("%women%");
        conditions.push(`LOWER(g.name) NOT ILIKE $${sqlParams.length}`);
      }
    }

    if (cursor) {
      conditions.push(`g.id < ${parseInt(String(cursor))}`);
    }

    const where = conditions.join(" AND ");
    const orderBy = buildSortClause(sort);

    const productSql = `
      SELECT
        g.id, g.slug, g.slug AS parent_slug,
        g.country, 'USD' AS currency,
        COALESCE(NULLIF(g.normalized_name, ''), g.name) AS name,
        g.brand, g.category, g.gender, g.sub_category,
        v.price AS price, g.best_price AS final_price,
        g.is_on_sale, g.discount_pct,
        g.url AS deep_link_url, g.image_url,
        v.product_id AS pid, v.advertiser_name, v.color, v.size, v.currency,
        g.in_stock
      FROM products g
      LEFT JOIN variants v ON v.id = g.best_variant_id
      WHERE ${where}
      ORDER BY ${orderBy}
      LIMIT ${limit} OFFSET ${offset}
    `;

    const [rows, countRows] = await Promise.all([
      prisma.$queryRawUnsafe<ProductListItem[]>(productSql, ...sqlParams),
      prisma.$queryRawUnsafe<{ count: number }[]>(
        `SELECT COUNT(*)::int AS count FROM products g LEFT JOIN variants v ON v.id = g.best_variant_id WHERE ${where}`,
        ...sqlParams,
      ),
    ]);

    const total = countRows[0]?.count ?? 0;
    const lastRow = rows.at(-1) as any;
    const nextCursor = rows.length === limit && lastRow?.id ? lastRow.id : null;

    return { products: rows, total, nextCursor };
  },

  async findBySlug(slug) {
    const rows = await prisma.$queryRaw<ProductDetail[]>(Prisma.sql`
      SELECT g.*, v.product_id AS pid, v.color, v.size, v.advertiser_name, v.currency,
             v.price AS variant_price, v.final_price, v.description, v.sku
      FROM products g
      LEFT JOIN variants v ON v.id = g.best_variant_id
      WHERE g.slug = ${slug}
      LIMIT 1
    `);
    return rows[0] ?? null;
  },

  async findByPid(pid) {
    const rows = await prisma.$queryRaw<ProductDetail[]>(Prisma.sql`
      SELECT g.*, v.product_id AS pid, v.color, v.size, v.advertiser_name, v.currency,
             v.price AS variant_price, v.final_price, v.description, v.sku
      FROM variants v
      JOIN products g ON g.id = v.group_id
      WHERE v.product_id = ${pid}
      LIMIT 1
    `);
    return rows[0] ?? null;
  },

  async getByBrand(brand: string, gender: "womens" | "mens", limit = 12) {
    const isSpecialBrand = brand === "Sam Edelman";

    const rows = await rawQuery(
      `SELECT
          g.id,
          COALESCE(NULLIF(g.normalized_name, ''), g.name) AS name,
          g.brand,
          g.best_price AS final_price,
          CASE WHEN g.is_on_sale = true AND v.price IS NOT NULL AND v.price > g.best_price THEN v.price ELSE NULL END AS original_price,
          g.is_on_sale,
          g.discount_pct,
          g.image_url,
          v.parent_slug,
          g.sub_category,
          g.category
        FROM products g
        LEFT JOIN variants v ON v.id = g.best_variant_id
        WHERE g.brand ILIKE $1
          AND (g.gender = $2 OR g.gender = 'unisex')
          AND g.country = 'US'
          AND g.image_url IS NOT NULL
          AND g.image_url LIKE 'http%'
          AND g.best_price > 0
          ${FOOTWEAR_FILTER}
          ${!isSpecialBrand ? IMAGE_CDN_FILTER : ""}
        ORDER BY g.is_on_sale DESC, g.discount_pct DESC NULLS LAST, g.updated_at DESC
        LIMIT $3`,
      [brand, gender, limit * 3],
    );
    return deduplicateByImage(rows as any[]).slice(0, limit);
  },

  async count(filters = {}) {
    return prisma.product.count({
      where: {
        inStock: true,
        visibility: "live",
        ...(filters.country ? { country: filters.country } : {}),
        ...(filters.gender ? { gender: filters.gender } : {}),
        ...(filters.onSale ? { isOnSale: true } : {}),
      },
    });
  },

  async getDailyFinds(limit: number, offset: number) {
    const rows = await rawQuery(
      `SELECT
        g.id,
        COALESCE(NULLIF(g.normalized_name, ''), g.name) AS name,
        g.brand,
        g.best_price AS final_price,
        CASE WHEN g.is_on_sale = true AND v.price IS NOT NULL AND v.price > g.best_price THEN v.price ELSE NULL END AS original_price,
        g.is_on_sale,
        g.discount_pct,
        g.image_url,
        v.parent_slug,
        g.sub_category,
        g.category
      FROM products g
      LEFT JOIN variants v ON v.id = g.best_variant_id
      WHERE (g.gender = 'womens' OR g.gender = 'unisex')
        AND g.country = 'US'
        AND g.image_url IS NOT NULL
        AND g.image_url LIKE 'http%'
        AND g.best_price > 0
        AND g.is_on_sale = true
        AND g.discount_pct >= 25
        ${FOOTWEAR_FILTER}
        ${IMAGE_CDN_FILTER}
      ORDER BY g.discount_pct DESC, g.updated_at DESC
      OFFSET $1
      LIMIT $2`,
      [offset, limit * 3],
    );

    return deduplicateByImage(rows as any[]).slice(
      0,
      limit,
    ) as ProductListItem[];
  },

  async getColorVariants(productId) {
    return prisma.$queryRaw<ColorVariant[]>(Prisma.sql`
      SELECT DISTINCT ON (LOWER(color))
        product_id AS pid, color, image_url, url AS deep_link_url, size
      FROM variants
      WHERE group_id = ${productId}
        AND in_stock = true
        AND color IS NOT NULL
      ORDER BY LOWER(color), image_url DESC NULLS LAST
    `);
  },

  async getSizes(productId) {
    const rows = await prisma.$queryRaw<{ size: string }[]>(Prisma.sql`
      SELECT DISTINCT size
      FROM variants
      WHERE group_id = ${productId}
        AND in_stock = true
        AND size IS NOT NULL
      ORDER BY size
    `);
    return rows.map((r) => r.size);
  },

  async getPriceRange(productId): Promise<PriceRange> {
    const rows = await prisma.$queryRaw<
      {
        min_price: number;
        max_price: number;
        offer_count: number;
      }[]
    >(Prisma.sql`
      SELECT
        MIN(final_price)::float AS min_price,
        MAX(final_price)::float AS max_price,
        COUNT(*)::int           AS offer_count
      FROM variants
      WHERE group_id = ${productId}
        AND in_stock = true
        AND final_price > 0
    `);
    const r = rows[0];
    return {
      minPrice: r?.min_price ?? 0,
      maxPrice: r?.max_price ?? 0,
      offerCount: r?.offer_count ?? 0,
    };
  },

  async getRelated({
    category,
    gender,
    country,
    excludeId,
    limit = 8,
  }: RelatedProductsParams) {
    return prisma.$queryRaw<ProductListItem[]>(Prisma.sql`
      SELECT g.id, g.slug, g.name, g.brand,
             g.best_price AS final_price, g.best_price AS price,
             g.image_url, g.slug AS parent_slug,
             g.category, g.gender, g.discount_pct, g.is_on_sale,
             g.url AS deep_link_url, v.product_id AS pid
      FROM products g
      LEFT JOIN variants v ON v.id = g.best_variant_id
      WHERE (g.category = ${category} OR g.gender = ${gender})
        AND g.country = ${country}
        AND g.visibility = 'live'
        AND g.in_stock = true
        AND g.id != ${excludeId}
        AND g.image_url IS NOT NULL
        AND g.url IS NOT NULL AND g.url != ''
      LIMIT ${limit}
    `);
  },

  async autocomplete({
    q,
    country = "US",
  }: AutocompleteParams): Promise<AutocompleteResults> {
    const cleanQ = q.replace(/['‘’`ʼ＇]/g, "");
    const { strippedQ, minPrice, maxPrice } = extractPriceFromQuery(cleanQ);

    const isMensQuery =
      /\bmens?\b/i.test(strippedQ) && !/\bwomens?\b/i.test(strippedQ);
    const normalizedQ = strippedQ
      .replace(/\bwomens\b/gi, "women's")
      .replace(/\bmens\b/gi, "men's");

    const searchPattern = `%${normalizedQ}%`;
    const startPattern = `${normalizedQ}%`;
    const exactPhrasePattern = `%${normalizedQ.replace(/\s+/g, " ")}%`;

    const words = normalizedQ.split(/\s+/).filter(Boolean);
    const wordFilter =
      words.length > 0
        ? buildWordFilter(words)
        : Prisma.sql`(LOWER(g.brand) ILIKE ${searchPattern} OR LOWER(COALESCE(g.normalized_name, g.name)) ILIKE ${searchPattern})`;

    const titleGenderFilter = isMensQuery
      ? Prisma.sql`AND LOWER(g.name) NOT ILIKE ${"%women%"}`
      : Prisma.empty;

    const priceMin =
      minPrice !== undefined
        ? Prisma.sql`AND g.best_price >= ${minPrice}`
        : Prisma.empty;
    const priceMax =
      maxPrice !== undefined
        ? Prisma.sql`AND g.best_price <= ${maxPrice}`
        : Prisma.empty;

    const [productRows, brandRows, categoryRows] = await Promise.all([
      prisma.$queryRaw<any[]>(Prisma.sql`
        SELECT
          v.product_id AS pid, g.slug,
          COALESCE(NULLIF(g.normalized_name, ''), g.name) AS name,
          g.brand, g.image_url, v.price AS price, g.best_price AS final_price,
          g.is_on_sale, g.discount_pct, g.gender, g.category,
          (
            CASE WHEN LOWER(g.brand) = ${normalizedQ}                                         THEN 1000
                 WHEN LOWER(g.brand) ILIKE ${startPattern}                                    THEN 800
                 WHEN LOWER(g.brand) ILIKE ${searchPattern}                                   THEN 500
                 WHEN LOWER(COALESCE(g.normalized_name, g.name)) = ${normalizedQ}             THEN 2000
                 WHEN LOWER(COALESCE(g.normalized_name, g.name)) ILIKE ${exactPhrasePattern}  THEN 1500
                 WHEN LOWER(COALESCE(g.normalized_name, g.name)) ILIKE ${startPattern}        THEN 300
                 WHEN LOWER(COALESCE(g.normalized_name, g.name)) ILIKE ${searchPattern}       THEN 200
                 ELSE 0
            END
            + CASE WHEN g.country = 'US' THEN 100 ELSE 0 END
          ) AS relevance
        FROM products g LEFT JOIN variants v ON v.id = g.best_variant_id
        WHERE g.in_stock = true
          AND g.visibility = 'live'
          AND g.image_url IS NOT NULL
          AND g.country = ${country}
          ${hiddenBrandsFilter()}
          AND ${wordFilter}
          ${titleGenderFilter}
          ${priceMin}
          ${priceMax}
        ORDER BY relevance DESC, g.brand, g.name
        LIMIT 12
      `),

      prisma.$queryRaw<{ brand: string }[]>(Prisma.sql`
        SELECT brand,
          MIN(CASE WHEN LOWER(brand) = ${normalizedQ}          THEN 0
                   WHEN LOWER(brand) ILIKE ${startPattern}     THEN 1
                   ELSE 2 END) AS rank
        FROM products
        WHERE LOWER(brand) ILIKE ${searchPattern}
          AND brand IS NOT NULL
          AND in_stock = true
          AND country = ${country}
        GROUP BY brand
        ORDER BY rank, brand
        LIMIT 5
      `),

      prisma.$queryRaw<{ category: string }[]>(Prisma.sql`
        SELECT category
        FROM products
        WHERE LOWER(category) ILIKE ${searchPattern}
          AND category IS NOT NULL
          AND country = ${country}
        GROUP BY category
        LIMIT 4
      `),
    ]);

    return {
      products: productRows.slice(0, 8),
      brands: brandRows.map((b) => ({ brand: b.brand, count: 0 })),
      categories: categoryRows.map((c) => ({ category: c.category })),
    };
  },

  async searchFull({
    q,
    country,
    gender,
    minPrice,
    maxPrice,
    onSale,
    sort = "relevance",
    page = 1,
    limit = 48,
  }: FullSearchParams): Promise<SearchResultsPage> {
    const normalizedQ = q
      .replace(/\bwomens\b/g, "women's")
      .replace(/\bmens\b/g, "men's");

    const offset = (page - 1) * limit;
    const searchPattern = `%${normalizedQ}%`;
    const startPattern = `${normalizedQ}%`;
    const exactPhrasePattern = `%${normalizedQ.replace(/\s+/g, " ")}%`;

    const words = normalizedQ.split(/\s+/).filter(Boolean);
    const wordFilter =
      words.length > 0
        ? buildWordFilter(words)
        : Prisma.sql`(LOWER(g.brand) ILIKE ${searchPattern} OR LOWER(COALESCE(g.normalized_name, g.name)) ILIKE ${searchPattern})`;

    const rows = await prisma.$queryRaw<any[]>(Prisma.sql`
      SELECT
        v.product_id AS pid, g.slug AS parent_slug,
        COALESCE(NULLIF(g.normalized_name, ''), g.name) AS name,
        g.brand, g.image_url,
        g.best_price AS final_price,
        CASE WHEN g.is_on_sale = true AND v.price IS NOT NULL AND v.price > g.best_price
             THEN v.price ELSE NULL END AS price,
        g.discount_pct, g.gender, g.category, g.sub_category,
        v.color, v.size, g.is_on_sale,
        (
          CASE
            WHEN LOWER(COALESCE(g.normalized_name, g.name)) = ${normalizedQ}               THEN 0
            WHEN LOWER(COALESCE(g.normalized_name, g.name)) ILIKE ${exactPhrasePattern}    THEN 1
            WHEN LOWER(COALESCE(g.normalized_name, g.name)) ILIKE ${startPattern}          THEN 2
            WHEN LOWER(g.brand) = ${normalizedQ}                                           THEN 3
            WHEN LOWER(g.brand) ILIKE ${startPattern}                                      THEN 4
            WHEN LOWER(g.brand) ILIKE ${searchPattern}                                     THEN 5
            WHEN LOWER(COALESCE(g.normalized_name, g.name)) ILIKE ${searchPattern}         THEN 6
            ELSE 7
          END
        ) AS relevance
      FROM products g LEFT JOIN variants v ON v.id = g.best_variant_id
      WHERE g.in_stock = true
        AND g.visibility = 'live'
        AND g.image_url IS NOT NULL
        AND ${wordFilter}
        AND (${gender ?? ""} = '' OR g.gender = ${gender ?? ""})
        AND (${country ?? ""} = '' OR g.country = ${country ?? ""})
        AND (${minPrice ?? 0} = 0 OR g.best_price >= ${minPrice ?? 0})
        AND (${maxPrice ?? 0} = 0 OR g.best_price <= ${maxPrice ?? 0})
        AND (${onSale ?? false} = false OR g.is_on_sale = true)
        ${sort === "discount" ? Prisma.sql`AND g.discount_pct IS NOT NULL AND g.discount_pct > 0` : Prisma.empty}
      ORDER BY
        CASE WHEN ${sort} = 'price_asc'  THEN g.best_price END ASC  NULLS LAST,
        CASE WHEN ${sort} = 'price_desc' THEN g.best_price END DESC NULLS LAST,
        CASE WHEN ${sort} = 'discount'   THEN g.discount_pct END DESC NULLS LAST,
        CASE WHEN ${sort} = 'newest'     THEN g.created_at END DESC NULLS LAST,
        relevance ASC,
        g.best_price ASC NULLS LAST
      LIMIT ${limit + 1}
      OFFSET ${offset}
    `);

    const hasMore = rows.length > limit;
    const products: ProductListItem[] = rows.slice(0, limit);

    let facets: SearchResultsPage["facets"];

    if (page === 1) {
      const facetRows = await prisma.$queryRaw<any[]>(Prisma.sql`
        SELECT g.brand, g.category, g.gender, COUNT(*) AS cnt
        FROM products g
        WHERE g.in_stock = true AND g.visibility = 'live' AND ${wordFilter}
        GROUP BY g.brand, g.category, g.gender
        LIMIT 100
      `);

      const brandCounts: Record<string, number> = {};
      const categoryCounts: Record<string, number> = {};
      const genderCounts: Record<string, number> = {};

      for (const row of facetRows) {
        if (row.brand)
          brandCounts[row.brand] =
            (brandCounts[row.brand] ?? 0) + Number(row.cnt);
        if (row.category)
          categoryCounts[row.category] =
            (categoryCounts[row.category] ?? 0) + Number(row.cnt);
        if (row.gender)
          genderCounts[row.gender] =
            (genderCounts[row.gender] ?? 0) + Number(row.cnt);
      }

      facets = {
        brands: Object.entries(brandCounts)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 15)
          .map(([brand, count]) => ({ brand, count })),
        categories: Object.entries(categoryCounts)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 10)
          .map(([category, count]) => ({ category, count })),
        genders: Object.entries(genderCounts)
          .sort((a, b) => b[1] - a[1])
          .map(([gender, count]) => ({ gender, count })),
      };
    }

    return { products, hasMore, facets };
  },

  async getHeroProducts(country) {
    return prisma.$queryRaw<ProductListItem[]>(Prisma.sql`
      SELECT DISTINCT ON (g.brand)
        g.id, g.name, g.brand, g.slug, g.image_url, g.best_price AS final_price
      FROM products g
      WHERE g.country = ${country}
        AND g.in_stock = true
        AND g.image_url IS NOT NULL
        AND g.image_url NOT LIKE '%placeholder%'
        AND g.best_price > 50
        AND g.visibility = 'live'
      ORDER BY g.brand, MOD(HASHTEXT(g.brand || TO_CHAR(CURRENT_DATE, 'DDD')), 1000)
      LIMIT 24
    `);
  },

  async getFeaturedDeals({
    gender = "womens",
    country = "US",
    mode = "best-discount",
    limit = 12,
  }: FeaturedDealsParams): Promise<ProductListItem[]> {
    const baseWhere = Prisma.sql`
      g.gender = ${gender}
      AND g.country = ${country}
      AND g.in_stock = true
      AND g.image_url IS NOT NULL
      AND g.image_url LIKE 'http%'
      AND g.visibility = 'live'
      AND g.category NOT IN ('accessories', 'apparel', 'bags')
      AND g.name NOT ILIKE '%tote bag%'   AND g.name NOT ILIKE '%backpack%'
      AND g.name NOT ILIKE '%t-shirt%'    AND g.name NOT ILIKE '%shorts%'
      AND g.name NOT ILIKE '%pants%'      AND g.name NOT ILIKE '%jacket%'
      AND g.name NOT ILIKE '%hoodie%'     AND g.name NOT ILIKE '%sweater%'
      AND g.name NOT ILIKE '%coat%'
      ${hiddenBrandsFilter()}
    `;

    const priceSelect = Prisma.sql`
      g.id,
      COALESCE(NULLIF(g.normalized_name, ''), g.name) AS name,
      g.brand,
      COALESCE(NULLIF(v.price, 0), g.best_price) AS price,
      g.best_price AS final_price,
      g.image_url,
      g.slug AS parent_slug,
      CASE WHEN v.price > 0 AND v.price > g.best_price
           THEN ROUND(((v.price - g.best_price) / v.price) * 100)::int
           ELSE 0 END AS discount_pct
    `;

    let rows: any[];

    if (mode === "new-arrivals") {
      rows = await prisma.$queryRaw<any[]>(Prisma.sql`
        SELECT ${priceSelect}, g.created_at
        FROM products g LEFT JOIN variants v ON v.id = g.best_variant_id
        WHERE ${baseWhere}
        ORDER BY g.created_at DESC NULLS LAST
        LIMIT 80
      `);
    } else if (mode === "under-50") {
      rows = await prisma.$queryRaw<any[]>(Prisma.sql`
        SELECT ${priceSelect}
        FROM products g LEFT JOIN variants v ON v.id = g.best_variant_id
        WHERE ${baseWhere} AND g.best_price <= 50
        ORDER BY
          CASE WHEN v.price > 0 AND v.price > g.best_price
               THEN ROUND(((v.price - g.best_price) / v.price) * 100)::int
               ELSE 0 END DESC,
          g.best_price ASC
        LIMIT 80
      `);
    } else {
      rows = await prisma.$queryRaw<any[]>(Prisma.sql`
        SELECT ${priceSelect}
        FROM products g LEFT JOIN variants v ON v.id = g.best_variant_id
        WHERE ${baseWhere}
          AND v.price > 0
          AND g.best_price > 0
          AND g.best_price < v.price
        ORDER BY ROUND(((v.price - g.best_price) / v.price) * 100)::int DESC, g.updated_at DESC
        LIMIT 80
      `);
    }

    const brandCount: Record<string, number> = {};
    const deduped = rows.filter((r) => {
      const b = (r.brand ?? "").toLowerCase();
      brandCount[b] = (brandCount[b] ?? 0) + 1;
      return brandCount[b] <= 2;
    });

    return deduped
      .sort(
        (a, b) => (Number(b.discount_pct) || 0) - (Number(a.discount_pct) || 0),
      )
      .slice(0, limit);
  },

  async getBrandInfo(brand, country = "US"): Promise<BrandInfo | null> {
    const rows = await prisma.$queryRaw<any[]>(Prisma.sql`
      SELECT
        g.brand,
        COUNT(DISTINCT g.id)::int AS product_count,
        MIN(g.best_price)::float  AS min_price,
        MAX(g.best_price)::float  AS max_price,
        STRING_AGG(DISTINCT g.sub_category, ', ' ORDER BY g.sub_category) AS categories
      FROM products g
      WHERE g.brand ILIKE ${`%${brand}%`}
        AND g.visibility = 'live'
        AND g.in_stock = true
        AND g.country = ${country}
      GROUP BY g.brand
      LIMIT 1
    `);
    if (!rows[0]) return null;
    return {
      brand: rows[0].brand,
      productCount: rows[0].product_count,
      minPrice: rows[0].min_price,
      maxPrice: rows[0].max_price,
      categories: rows[0].categories,
    };
  },

  async getBrandProducts({
    brand,
    gender = "womens",
    country = "US",
    limit = 6,
  }: BrandProductsParams): Promise<ProductListItem[]> {
    return prisma.$queryRaw<ProductListItem[]>(Prisma.sql`
      SELECT
        g.id,
        COALESCE(NULLIF(g.normalized_name, ''), g.name) AS name,
        g.brand,
        g.best_price AS final_price,
        CASE WHEN g.is_on_sale = true AND v.price IS NOT NULL AND v.price > g.best_price
             THEN v.price ELSE NULL END AS price,
        g.is_on_sale, g.discount_pct,
        g.image_url, v.parent_slug, g.sub_category
      FROM products g
      LEFT JOIN variants v ON v.id = g.best_variant_id
      WHERE g.brand ILIKE ${`%${brand}%`}
        AND (g.gender = ${gender} OR g.gender = 'unisex')
        AND g.country = ${country}
        AND g.image_url IS NOT NULL
        AND g.image_url LIKE 'http%'
        AND g.best_price > 0
      ORDER BY g.is_on_sale DESC, g.discount_pct DESC NULLS LAST, g.updated_at DESC
      LIMIT ${limit}
    `);
  },

  async getEditorialProducts({
    country = "US",
    gender,
    category,
    brand,
    q,
    onSale,
    sort = "relevance",
    limit: rawLimit = 8,
  }: EditorialProductsParams): Promise<ProductListItem[]> {
    const limit = Math.min(rawLimit, 24);
    const conditions: string[] = [
      `g.in_stock = true`,
      `g.image_url IS NOT NULL`,
      `g.image_url != ''`,
      `g.best_price > 0`,
      `g.visibility = 'live'`,
    ];
    const sqlParams: unknown[] = [];

    sqlParams.push(country);
    conditions.push(`g.country = $${sqlParams.length}`);

    if (gender) {
      sqlParams.push(gender.toLowerCase());
      conditions.push(`g.gender = $${sqlParams.length}`);
    }
    if (brand) {
      sqlParams.push(`%${brand}%`);
      conditions.push(`g.brand ILIKE $${sqlParams.length}`);
    }
    if (category) {
      sqlParams.push(`%${category}%`);
      conditions.push(`g.category ILIKE $${sqlParams.length}`);
    }
    if (onSale) {
      conditions.push(`g.is_on_sale = true`);
    }
    if (q) {
      const terms = q
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);
      const clauses = terms.map((t) => {
        sqlParams.push(`%${t}%`);
        const p = `$${sqlParams.length}`;
        return `(g.name ILIKE ${p} OR g.brand ILIKE ${p} OR g.category ILIKE ${p})`;
      });
      conditions.push(`(${clauses.join(" OR ")})`);
    }

    const where = conditions.join(" AND ");
    const orderBy = (() => {
      switch (sort) {
        case "newest":
          return "g.id DESC";
        case "discount":
          return "g.discount_pct DESC NULLS LAST";
        case "price_asc":
          return "g.best_price ASC";
        case "price_desc":
          return "g.best_price DESC";
        default:
          return "(CASE WHEN g.is_on_sale THEN 8 ELSE 0 END) DESC, g.id DESC";
      }
    })();

    sqlParams.push(limit);

    return prisma.$queryRawUnsafe<ProductListItem[]>(
      `SELECT DISTINCT ON (LOWER(COALESCE(g.brand,'')), LOWER(g.name))
         g.id, g.slug, g.name, g.brand,
         g.best_price AS price, g.best_price AS final_price,
         g.image_url, g.gender, g.category, g.sub_category, g.url, g.country,
         g.discount_pct
       FROM products g
       WHERE ${where}
       ORDER BY LOWER(COALESCE(g.brand,'')), LOWER(g.name), ${orderBy}
       LIMIT $${sqlParams.length}`,
      ...sqlParams,
    );
  },

  async getMasonryProducts({
    country = "US",
    gender,
    filter,
    cursor = 0,
    pageSize = 80,
  }: MasonryProductsParams): Promise<MasonryProductsResult> {
    const genderClause =
      gender === "womens"
        ? `AND (g.gender = 'womens' OR g.gender = 'unisex')`
        : gender === "mens"
          ? `AND (g.gender = 'mens'   OR g.gender = 'unisex')`
          : "";

    const filterClause =
      filter === "sale"
        ? `AND v.price > 0 AND g.best_price > 0 AND g.best_price < v.price`
        : filter === "under50"
          ? `AND g.best_price <= 50`
          : filter === "new"
            ? `AND g.created_at >= NOW() - INTERVAL '14 days'`
            : "";

    const rows = await prisma.$queryRawUnsafe<any[]>(
      `SELECT
         g.id,
         COALESCE(NULLIF(g.normalized_name,''), g.name) AS name,
         g.brand,
         COALESCE(NULLIF(v.price::numeric, 0), g.best_price) AS original_price,
         g.best_price AS final_price,
         CASE WHEN v.price > 0 AND v.price > g.best_price
              THEN ROUND(((v.price - g.best_price) / v.price) * 100)::int
              ELSE 0 END AS discount_pct,
         g.image_url, g.slug AS parent_slug, g.sub_category, g.gender,
         v.advertiser_name AS store,
         MOD(HASHTEXT(g.slug), 99999) AS sort_key
       FROM products g
       LEFT JOIN variants v ON v.id = g.best_variant_id
       WHERE g.visibility = 'live'
         AND g.in_stock = true
         AND g.country = $1
         AND g.image_url IS NOT NULL AND g.image_url LIKE 'http%'
         AND g.best_price > 0
         AND g.category NOT IN ('accessories', 'apparel', 'bags')
         ${genderClause}
         ${filterClause}
         AND MOD(HASHTEXT(g.slug), 99999) > $2
       ORDER BY MOD(HASHTEXT(g.slug), 99999) ASC
       LIMIT $3`,
      country,
      cursor,
      pageSize,
    );

    const nextCursor =
      rows.length === pageSize ? (rows.at(-1) as any).sort_key : null;

    return { products: rows, nextCursor };
  },

  async getSaleProducts({ gender, limit = 60 }): Promise<SaleProduct[]> {
    const rows = await prisma.$queryRaw<any[]>(Prisma.sql`
      SELECT
        g.id, g.name, g.normalized_name, g.brand,
        g.best_price AS price, g.best_price AS final_price,
        g.image_url, g.gender, g.category,
        g.slug AS parent_slug, g.discount_pct
      FROM products g
      WHERE g.gender = ${gender}
        AND g.in_stock = true
        AND g.visibility = 'live'
        AND g.image_url IS NOT NULL
        AND g.image_url LIKE 'http%'
        AND LENGTH(g.image_url) > 30
        AND g.url IS NOT NULL AND g.url != ''
        AND g.best_price > 0
        AND g.is_on_sale = true
        AND g.discount_pct >= 15
      ORDER BY g.discount_pct DESC NULLS LAST
      LIMIT ${limit}
    `);
    return rows;
  },

  async findByPids(pids): Promise<FavoriteProduct[]> {
    if (pids.length === 0) return [];
    const rows = await prisma.$queryRaw<any[]>(Prisma.sql`
      SELECT DISTINCT ON (g.id)
        v.product_id AS pid,
        g.slug, g.name, g.normalized_name, g.brand,
        v.advertiser_name,
        g.best_price AS final_price,
        g.best_price AS price,
        g.discount_pct, g.is_on_sale,
        g.url AS deep_link_url,
        g.image_url, v.color, g.gender, g.in_stock AS is_in_stock, g.country
      FROM variants v
      JOIN products g ON g.id = v.group_id
      WHERE v.product_id = ANY(${pids}::text[])
      ORDER BY g.id, v.created_at DESC
    `);
    return rows.map((r) => ({
      pid: r.pid,
      slug: r.slug ?? null,
      name: r.name,
      normalized_name: r.normalized_name ?? null,
      brand: r.brand ?? null,
      advertiser_name: r.advertiser_name ?? null,
      price: r.price ? Number(r.price) : null,
      final_price: r.final_price ? Number(r.final_price) : null,
      discount_pct: r.discount_pct ? Number(r.discount_pct) : null,
      is_on_sale: r.is_on_sale,
      deep_link_url: r.deep_link_url ?? null,
      image_url: r.image_url ?? null,
      color: r.color ?? null,
      gender: r.gender ?? null,
      is_in_stock: r.is_in_stock,
      country: r.country ?? null,
    }));
  },

  async findByOccasion({
    gender,
    occasion,
    minPrice,
    maxPrice,
  }): Promise<OccasionProduct[]> {
    const baseConditions = Prisma.sql`
      g.in_stock = true AND g.visibility = 'live'
      AND g.image_url IS NOT NULL AND g.image_url LIKE 'http%'
      AND g.gender = ${gender} AND g.best_price >= ${minPrice} AND g.best_price <= ${maxPrice}
    `;
    const select = Prisma.sql`
      SELECT g.slug AS parent_slug, COALESCE(NULLIF(g.normalized_name, ''), g.name) AS name,
        g.brand, g.image_url, g.best_price AS final_price, g.best_price AS price, g.discount_pct, g.category
      FROM products g
    `;

    let rows: any[];
    if (occasion === "work") {
      rows = await prisma.$queryRaw<
        any[]
      >(Prisma.sql`${select} WHERE ${baseConditions}
        AND (g.name ILIKE '%oxford%' OR g.name ILIKE '%loafer%' OR g.name ILIKE '%heel%' OR g.name ILIKE '%pump%' OR g.category ILIKE '%dress%')
        LIMIT 30`);
    } else if (occasion === "active") {
      rows = await prisma.$queryRaw<
        any[]
      >(Prisma.sql`${select} WHERE ${baseConditions}
        AND (g.name ILIKE '%sneaker%' OR g.name ILIKE '%running%' OR g.name ILIKE '%sport%' OR g.category ILIKE '%athletic%')
        LIMIT 30`);
    } else if (occasion === "going-out") {
      rows = await prisma.$queryRaw<
        any[]
      >(Prisma.sql`${select} WHERE ${baseConditions}
        AND (g.name ILIKE '%heel%' OR g.name ILIKE '%pump%' OR g.name ILIKE '%dress%')
        LIMIT 30`);
    } else if (occasion === "outdoor") {
      rows = await prisma.$queryRaw<
        any[]
      >(Prisma.sql`${select} WHERE ${baseConditions}
        AND (g.name ILIKE '%boot%' OR g.category ILIKE '%hiking%')
        LIMIT 30`);
    } else {
      rows = await prisma.$queryRaw<any[]>(
        Prisma.sql`${select} WHERE ${baseConditions} LIMIT 30`,
      );
    }
    return rows;
  },

  async getStats(): Promise<ProductStats> {
    const result = await prisma.$queryRaw<any[]>(Prisma.sql`
      SELECT
        COUNT(*)::int AS total_products,
        COUNT(DISTINCT brand)::int AS total_brands,
        ROUND(AVG(CASE WHEN discount_pct > 0 THEN discount_pct ELSE NULL END))::int AS avg_discount
      FROM products
      WHERE in_stock = true AND visibility = 'live' AND best_price > 0 AND is_on_sale = true
    `);
    return {
      totalProducts: result[0]?.total_products ?? 500000,
      totalBrands: result[0]?.total_brands ?? 1000,
      avgDiscount: result[0]?.avg_discount ?? 35,
    };
  },

  async getSitemapProducts(page): Promise<SitemapProduct[]> {
    const offset = (page - 1) * PRODUCTS_PER_SITEMAP;
    const rows = await prisma.$queryRaw<
      { parent_slug: string; updated_at: Date | null }[]
    >(Prisma.sql`
      SELECT parent_slug, updated_at
      FROM products
      WHERE show_in_listings = true
        AND in_stock = true
        AND parent_slug IS NOT NULL
        AND visibility = 'live'
      ORDER BY id
      LIMIT ${PRODUCTS_PER_SITEMAP}
      OFFSET ${offset}
    `);
    return rows.map((r) => ({
      parentSlug: r.parent_slug,
      updatedAt: r.updated_at ?? new Date(),
    }));
  },

  async getByCategoryAndBrand(
    brand: string,
    categoryName: string,
    gender: "womens" | "mens",
    limit = 8,
  ) {
    const isSpecialBrand = brand === "Sam Edelman";
    const rows = await rawQuery(
      `SELECT
          g.id,
          COALESCE(NULLIF(g.normalized_name, ''), g.name) AS name,
          g.brand,
          g.best_price AS final_price,
          CASE WHEN g.is_on_sale = true AND v.price IS NOT NULL AND v.price > g.best_price THEN v.price ELSE NULL END AS original_price,
          g.is_on_sale,
          g.discount_pct,
          g.image_url,
          v.parent_slug,
          g.sub_category,
          g.category
        FROM products g
        LEFT JOIN variants v ON v.id = g.best_variant_id
        WHERE g.brand ILIKE $1
          AND g.sub_category = $2
          AND g.category ILIKE 'Footwear%'
          AND (g.gender = $3 OR g.gender = 'unisex')
          AND g.country = 'US'
          AND g.image_url IS NOT NULL
          AND g.image_url LIKE 'http%'
          AND g.best_price > 0
          ${!isSpecialBrand ? IMAGE_CDN_FILTER : ""}
        ORDER BY g.is_on_sale DESC, g.discount_pct DESC NULLS LAST, g.updated_at DESC
        LIMIT $4`,
      [brand, categoryName, gender, limit * 3],
    );
    const deduped = deduplicateByImage(rows as any[]).slice(0, limit);

    return deduped;
  },

  async getTrending(limit = 30): Promise<ProductListItem[]> {
    const rows = await rawQuery(
      `SELECT
          g.id,
          COALESCE(NULLIF(g.normalized_name, ''), g.name) AS name,
          g.brand,
          g.best_price AS final_price,
          CASE WHEN g.is_on_sale = true AND v.price IS NOT NULL AND v.price > g.best_price THEN v.price ELSE NULL END AS original_price,
          g.is_on_sale,
          g.discount_pct,
          g.image_url,
          v.parent_slug,
          g.sub_category,
          g.category
        FROM products g
        LEFT JOIN variants v ON v.id = g.best_variant_id
        WHERE g.is_on_sale = true
          AND g.country = 'US'
          AND g.image_url IS NOT NULL
          AND g.image_url LIKE 'http%'
          AND g.best_price > 0
          AND g.discount_pct >= 25
          ${FOOTWEAR_FILTER}
          ${IMAGE_CDN_FILTER}
        ORDER BY g.discount_pct DESC, g.updated_at DESC
        LIMIT $1`,
      [limit * 3],
    );

    return deduplicateByImage(rows as ProductListItem[]).slice(0, limit);
  },

  async getByCategory(categoryName, gender: "womens" | "mens", limit = 12) {
    const rows = await rawQuery(
      `SELECT
        g.id,
        COALESCE(NULLIF(g.normalized_name, ''), g.name) AS name,
        g.brand,
        g.best_price AS final_price,
        CASE WHEN g.is_on_sale = true AND v.price IS NOT NULL AND v.price > g.best_price THEN v.price ELSE NULL END AS original_price,
        g.is_on_sale,
        g.discount_pct,
        g.image_url,
        v.parent_slug,
        g.sub_category,
        g.category
      FROM products g
      LEFT JOIN variants v ON v.id = g.best_variant_id
      WHERE g.sub_category ILIKE $1
        AND (g.gender = $2 OR g.gender = 'unisex')
        AND g.country = 'US'
        AND g.image_url IS NOT NULL
        AND g.image_url LIKE 'http%'
        AND g.best_price > 0
        AND g.category ILIKE 'Footwear%'
        ${IMAGE_CDN_FILTER}
      ORDER BY g.is_on_sale DESC, g.discount_pct DESC NULLS LAST, g.updated_at DESC
      LIMIT $3`,
      [categoryName, gender, limit * 3],
    );
    return deduplicateByImage(rows as any[]).slice(0, limit);
  },
};
