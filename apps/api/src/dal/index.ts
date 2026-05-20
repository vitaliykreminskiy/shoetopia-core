import type { DataAccessLayer } from "./types.js";
import { prismaDataProvider } from "./providers/prisma/index.js";

// In future there may be other data providers and more complex logic which to choose
export const getDataProvider = (): DataAccessLayer => prismaDataProvider;

export * from "./types.js";
export * from "./product.js";
export * from "./category.js";
export * from "./brand.js";
export * from "./coupon.js";
export * from "./advertiser.js";
export * from "./deal.js";
