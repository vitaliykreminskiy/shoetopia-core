
import { prisma, rawQuery } from "@shoetopia/db";
import type {
  BrandsDAL,
  BrandFeaturedProduct,
  BrandTopProduct,
} from "../../brand.js";

function toSlug(name: string) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export const prismaBrandsDal: BrandsDAL = {
  async listTop(limit = 24) {
    try {
      const rows = await prisma.product.groupBy({
        by: ["brand"],
        where: { brand: { not: null }, inStock: true, visibility: "live" },
        _count: { id: true },
        orderBy: { _count: { id: "desc" } },
        take: limit,
      });
      return rows
        .filter((r) => r.brand && r.brand !== "")
        .map((r) => ({
          name: r.brand!,
          slug: toSlug(r.brand!),
          count: r._count.id,
        }));
    } catch {
      return [];
    }
  },

  async getFeaturedProducts({ brand, gender, country, limit = 6 }) {
    try {
      return rawQuery<BrandFeaturedProduct>(
        `SELECT
           g.id,
           COALESCE(NULLIF(g.normalized_name, ''), g.name) AS name,
           g.brand,
           g.best_price                                        AS final_price,
           CASE WHEN v.price > 0 AND v.price > g.best_price
                THEN v.price ELSE NULL END                     AS original_price,
           (v.price > 0 AND v.price > g.best_price)           AS is_on_sale,
           CASE WHEN v.price > 0 AND v.price > g.best_price
                THEN ROUND(((v.price - g.best_price) / v.price) * 100)::int
                ELSE 0 END                                     AS discount_pct,
           g.image_url,
           v.parent_slug,
           g.sub_category,
           $2                                                  AS gender
         FROM products g
         LEFT JOIN variants v ON v.id = g.best_variant_id
         WHERE g.brand ILIKE $1
           AND (g.gender = $2 OR g.gender = 'unisex')
           AND g.country = $3
           AND g.visibility = 'live'
           AND g.image_url IS NOT NULL
           AND g.image_url LIKE 'http%'
           AND g.best_price > 0
         ORDER BY
           (v.price > 0 AND v.price > g.best_price) DESC,
           COALESCE(g.discount_pct, 0) DESC,
           g.updated_at DESC
         LIMIT $4`,
        [brand, gender, country, limit],
      );
    } catch {
      return [];
    }
  },

  async getTopForSitemap(minCount = 10) {
    try {
      const rows = await rawQuery<{ brand: string; updated_at: Date | null }>(
        `SELECT brand, MAX(updated_at) AS updated_at
         FROM products
         WHERE visibility = 'live' AND in_stock = true AND country = 'US'
         GROUP BY brand
         HAVING COUNT(*) >= $1
         ORDER BY COUNT(*) DESC
         LIMIT 200`,
        [minCount],
      );
      return rows.map((r) => ({
        name: r.brand,
        slug: toSlug(r.brand),
        updatedAt: r.updated_at,
      }));
    } catch {
      return [];
    }
  },

  async getTopProduct({ brandName }) {
    try {
      const rows = await rawQuery<BrandTopProduct>(
        `SELECT
           COALESCE(NULLIF(g.normalized_name, ''), g.name) AS name,
           g.brand,
           g.best_price AS final_price,
           g.best_price AS price,
           g.image_url,
           g.slug       AS parent_slug,
           g.discount_pct
         FROM products g
         WHERE g.brand ILIKE $1
           AND g.in_stock = true
           AND g.visibility = 'live'
           AND g.image_url IS NOT NULL
           AND g.image_url LIKE 'http%'
         ORDER BY
           CASE WHEN g.is_on_sale THEN 0 ELSE 1 END,
           g.discount_pct DESC NULLS LAST
         LIMIT 1`,
        [`%${brandName}%`],
      );
      return rows[0] ?? null;
    } catch {
      return null;
    }
  },
};
