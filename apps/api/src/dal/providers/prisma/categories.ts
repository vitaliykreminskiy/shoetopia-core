import { prisma, Prisma } from "@shoetopia/db";
import type {
  CategoriesDAL,
  Category,
  CategoryListParams,
} from "../../category.js";

/*
 * Shared join: attaches a live product count (computed_count) per category by aggregating
 * the products table on category_slug. Used by findBySlug/list so callers get a fresh count
 * rather than relying on the denormalized categories.product_count column.
 */
const WITH_COUNT = Prisma.sql`
  LEFT JOIN (
    SELECT category_slug, COUNT(*)::int as computed_count
    FROM products
    WHERE category_slug IS NOT NULL
    GROUP BY category_slug
  ) p ON c.slug = p.category_slug
`;

function mapRow(row: any): Category {
  return {
    slug: row.slug,
    name: row.name,
    parent_slug: row.parent_slug ?? null,
    display_order: row.display_order ?? null,
    product_count: row.product_count ?? 0,
    computed_product_count:
      row.computed_count ?? row.computed_product_count ?? 0,
  };
}

export const prismaCategoriesDal: CategoriesDAL = {
  async findBySlug(slug) {
    try {
      const rows = await prisma.$queryRaw<any[]>(Prisma.sql`
        SELECT c.*, COALESCE(p.computed_count, 0)::int as computed_product_count
        FROM categories c
        ${WITH_COUNT}
        WHERE c.slug = ${slug}
        LIMIT 1
      `);
      return rows[0] ? mapRow(rows[0]) : null;
    } catch {
      /* Swallow DB errors — callers treat a missing/failed lookup the same (null). */
      return null;
    }
  },

  async list(params?: CategoryListParams) {
    const { parentSlug, includeEmpty = false } = params ?? {};
    try {
      let rows: any[];
      /*
       * parentSlug "root" → top-level only (parent_slug IS NULL);
       * a non-empty slug → that parent's children; omitted → all categories.
       */
      if (parentSlug === "root") {
        rows = await prisma.$queryRaw<any[]>(Prisma.sql`
          SELECT c.*, COALESCE(p.computed_count, 0)::int as computed_product_count
          FROM categories c
          ${WITH_COUNT}
          WHERE c.parent_slug IS NULL
          ORDER BY c.display_order, c.name
        `);
      } else if (parentSlug) {
        rows = await prisma.$queryRaw<any[]>(Prisma.sql`
          SELECT c.*, COALESCE(p.computed_count, 0)::int as computed_product_count
          FROM categories c
          ${WITH_COUNT}
          WHERE c.parent_slug = ${parentSlug}
          ORDER BY c.display_order, c.name
        `);
      } else {
        rows = await prisma.$queryRaw<any[]>(Prisma.sql`
          SELECT c.*, COALESCE(p.computed_count, 0)::int as computed_product_count
          FROM categories c
          ${WITH_COUNT}
          ORDER BY c.parent_slug NULLS FIRST, c.display_order, c.name
        `);
      }
      const mapped = rows.map(mapRow);
      /* Default hides empty categories — keep only those with a stored or live product count. */
      return includeEmpty
        ? mapped
        : mapped.filter(
            (c) => c.computed_product_count > 0 || c.product_count > 0,
          );
    } catch {
      /* Swallow DB errors — return an empty list so routes can degrade gracefully. */
      return [];
    }
  },

  async listChildren(parentSlug, minProductCount = 1) {
    try {
      const rows = await prisma.$queryRaw<any[]>(Prisma.sql`
        SELECT * FROM categories
        WHERE parent_slug = ${parentSlug}
          AND product_count >= ${minProductCount}
        ORDER BY product_count DESC, name ASC
      `);
      return rows.map((r) => ({
        ...mapRow(r),
        computed_product_count: r.product_count ?? 0,
      }));
    } catch {
      /* Swallow DB errors — empty list on failure. */
      return [];
    }
  },

  async getNavCounts(country) {
    try {
      const rows = await prisma.$queryRaw<
        Array<{ gender: string; category: string; cnt: bigint }>
      >(
        Prisma.sql`SELECT gender, category, COUNT(*) AS cnt
         FROM products
         WHERE visibility = 'live'
           AND in_stock = true
           AND gender IS NOT NULL
           AND category IS NOT NULL
           AND country = ${country}
         GROUP BY gender, category
         ORDER BY gender, cnt DESC`,
      );
      return rows.map((r) => ({
        gender: r.gender,
        category: r.category,
        count: Number(r.cnt),
      }));
    } catch {
      /* Swallow DB errors — empty list on failure. */
      return [];
    }
  },
};
