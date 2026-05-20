import type { DataAccessLayer } from "../../types.js";
import { prisma } from "@shoetopia/db";
import { prismaProductsDal } from "./products.js";
import { prismaCategoriesDal } from "./categories.js";
import { prismaBrandsDal } from "./brands.js";
import { prismaCouponsDal } from "./coupons.js";
import { prismaAdvertisersDal } from "./advertisers.js";
import { prismaDealsDal } from "./deals.js";

export const prismaDataProvider: DataAccessLayer = {
  products: prismaProductsDal,
  categories: prismaCategoriesDal,
  brands: prismaBrandsDal,
  coupons: prismaCouponsDal,
  advertisers: prismaAdvertisersDal,
  deals: prismaDealsDal,

  async getHealth() {
    try {
      await prisma.$queryRaw`SELECT 1`;
      return true;
    } catch {
      return false;
    }
  },
};
