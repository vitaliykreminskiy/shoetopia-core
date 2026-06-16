import * as runtime from "@prisma/client/runtime/client";
import * as $Class from "./internal/class.js";
import * as Prisma from "./internal/prismaNamespace.js";
export * as $Enums from './enums.js';
export * from "./enums.js";
/**
 * ## Prisma Client
 *
 * Type-safe database client for TypeScript
 * @example
 * ```
 * const prisma = new PrismaClient({
 *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
 * })
 * // Fetch zero or more AdvertiserVotes
 * const advertiserVotes = await prisma.advertiserVote.findMany()
 * ```
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export declare const PrismaClient: $Class.PrismaClientConstructor;
export type PrismaClient<LogOpts extends Prisma.LogLevel = never, OmitOpts extends Prisma.PrismaClientOptions["omit"] = Prisma.PrismaClientOptions["omit"], ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = $Class.PrismaClient<LogOpts, OmitOpts, ExtArgs>;
export { Prisma };
/**
 * Model AdvertiserVote
 *
 */
export type AdvertiserVote = Prisma.AdvertiserVoteModel;
/**
 * Model Advertiser
 *
 */
export type Advertiser = Prisma.AdvertiserModel;
/**
 * Model DealHealthVote
 *
 */
export type DealHealthVote = Prisma.DealHealthVoteModel;
/**
 * Model Feed
 *
 */
export type Feed = Prisma.FeedModel;
/**
 * Model Variant
 *
 */
export type Variant = Prisma.VariantModel;
/**
 * Model Product
 *
 */
export type Product = Prisma.ProductModel;
/**
 * Model Promotion
 *
 */
export type Promotion = Prisma.PromotionModel;
/**
 * Model SyncLog
 *
 */
export type SyncLog = Prisma.SyncLogModel;
//# sourceMappingURL=client.d.ts.map