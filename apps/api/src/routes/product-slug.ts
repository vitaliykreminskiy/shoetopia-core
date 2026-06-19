import type { FastifyPluginAsync } from "fastify";
import { getDataProvider } from "../dal/index.js";
import { getProductById } from "../lib/flexoffers.js";

const productSlugRoute: FastifyPluginAsync = async (fastify) => {
  // GET /api/products/:slug — look up a product by slug or pid
  fastify.get<{
    Params: { slug: string };
  }>("/api/products/:slug", async (request, reply) => {
    const { slug } = request.params;
    if (!slug) return reply.code(400).send({ error: "slug is required" });

    try {
      const dal = getDataProvider();

      const bySlug = await dal.products.findBySlug(slug);
      if (bySlug) return reply.send({ product: bySlug, source: "database" });

      const byPid = await dal.products.findByPid(slug);
      if (byPid) return reply.send({ product: byPid, source: "database" });

      // Fallback to FlexOffers API
      const apiData: any = await getProductById(slug);
      if (!apiData || (Array.isArray(apiData) && apiData.length === 0)) {
        return reply.code(404).send({ error: "Product not found" });
      }
      const p = Array.isArray(apiData) ? apiData[0] : apiData;
      return reply.send({
        product: {
          pid: p.pid,
          slug: p.pid,
          name: p.name,
          brand: p.brand ?? p.manufacturer ?? null,
          advertiser_name: p.advertiserName ?? null,
          best_price: p.finalPrice ?? p.price,
          price: p.price,
          discount_pct: p.discount,
          is_on_sale: p.isOnSale ?? false,
          image_url: p.imageUrl,
          url: p.deepLinkURL ?? p.linkUrl,
          description: p.description ?? p.shortDescription,
          color: p.color,
          size: p.size,
          gender: p.gender,
          category: p.category,
        },
        source: "flexoffers",
      });
    } catch (error) {
      fastify.log.error({ error }, "[products/:slug] error" + "|||" + slug);
      return reply.code(500).send({ error: "Failed to fetch product" });
    }
  });
};

export default productSlugRoute;
