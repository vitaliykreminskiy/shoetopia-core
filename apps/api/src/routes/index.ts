import type { FastifyInstance } from 'fastify'
import healthRoute from './health.js'
import productsRoute from './products.js'
import searchRoute from './search.js'
import brandsRoute from './brands.js'
import categoriesRoute from './categories.js'
import dealsRoute from './deals.js'
import couponsRoute from './coupons.js'
import heroRoute from './hero.js'
import promotionsRoute from './promotions.js'
import statsRoute from './stats.js'
import advertisersRoute from './advertisers.js'
import editorialRoute from './editorial.js'
import shoeFinderRoute from './shoe-finder.js'
import brandProductsRoute from './brand-products.js'
import favoritesRoute from './favorites.js'
import productSlugRoute from './product-slug.js'

// Admin routes
import statusRoute from './admin/status.js'
import feedsAdminRoute from './admin/feeds.js'
import importRoute from './admin/import.js'
import archiveRoute from './admin/archive.js'
import housekeepingRoute from './admin/housekeeping.js'
import jobsRoute from './admin/jobs.js'
import syncLogRoute from './admin/sync-log.js'
import clearCacheRoute from './admin/clear-cache.js'
import performanceStatsRoute from './admin/performance-stats.js'
import renormalizeRoute from './admin/renormalize.js'
import reprocessRoute from './admin/reprocess.js'
import fixCategoriesRoute from './admin/fix-categories.js'
import priceDiagRoute from './admin/price-diag.js'

// Cron routes
import dailySyncRoute from './cron/daily-sync.js'

export async function registerRoutes(fastify: FastifyInstance): Promise<void> {
  await fastify.register(healthRoute)
  await fastify.register(productsRoute)
  await fastify.register(searchRoute)
  await fastify.register(brandsRoute)
  await fastify.register(categoriesRoute)
  await fastify.register(dealsRoute)
  await fastify.register(couponsRoute)
  await fastify.register(heroRoute)
  await fastify.register(promotionsRoute)
  await fastify.register(statsRoute)
  await fastify.register(advertisersRoute)
  await fastify.register(editorialRoute)
  await fastify.register(shoeFinderRoute)
  await fastify.register(brandProductsRoute)
  await fastify.register(favoritesRoute)
  await fastify.register(productSlugRoute)

  // Admin routes
  await fastify.register(statusRoute)
  await fastify.register(feedsAdminRoute)
  await fastify.register(importRoute)
  await fastify.register(archiveRoute)
  await fastify.register(housekeepingRoute)
  await fastify.register(jobsRoute)
  await fastify.register(syncLogRoute)
  await fastify.register(clearCacheRoute)
  await fastify.register(performanceStatsRoute)
  await fastify.register(renormalizeRoute)
  await fastify.register(reprocessRoute)
  await fastify.register(fixCategoriesRoute)
  await fastify.register(priceDiagRoute)

  // Cron routes
  await fastify.register(dailySyncRoute)
}
