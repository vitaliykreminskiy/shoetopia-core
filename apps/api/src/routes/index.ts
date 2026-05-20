import type { FastifyInstance } from 'fastify'
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

export async function registerRoutes(fastify: FastifyInstance): Promise<void> {
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
}
