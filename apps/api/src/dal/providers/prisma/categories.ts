import { prisma, Prisma } from "@shoetopia/db";
import type {
  CategoriesDAL,
  Category,
  CategoryListParams,
  NavCategoryCount,
} from "../../category.js";

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
      return null;
    }
  },

  async list(params?: CategoryListParams) {
    const { parentSlug, includeEmpty = false } = params ?? {};
    try {
      let rows: any[];
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
      return includeEmpty
        ? mapped
        : mapped.filter(
            (c) => c.computed_product_count > 0 || c.product_count > 0,
          );
    } catch {
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
      return [];
    }
  },

  async getNavCounts(country) {
    try {
      const rows = await prisma.$queryRawUnsafe<
        Array<{ gender: string; category: string; cnt: bigint }>
      >(
        `SELECT gender, category, COUNT(*) AS cnt
         FROM products
         WHERE visibility = 'live'
           AND in_stock = true
           AND gender IS NOT NULL
           AND category IS NOT NULL
           AND country = $1
         GROUP BY gender, category
         ORDER BY gender, cnt DESC`,
        country,
      );
      return rows.map((r) => ({
        gender: r.gender,
        category: r.category,
        count: Number(r.cnt),
      }));
    } catch {
      return [];
    }
  },
};
