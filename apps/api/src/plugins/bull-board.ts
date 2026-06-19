import fp from "fastify-plugin";
import type { FastifyInstance } from "fastify";
import { createBullBoard } from "@bull-board/api";
import { BullMQAdapter } from "@bull-board/api/dist/queueAdapters/bullMQ.js";
import { FastifyAdapter } from "@bull-board/fastify";
import {
  feedImportQueue,
  housekeepingQueue,
  syncQueue,
} from "@shoetopia/jobs";

export default fp(async (fastify: FastifyInstance) => {
  const serverAdapter = new FastifyAdapter();

  createBullBoard({
    queues: [
      new BullMQAdapter(feedImportQueue),
      new BullMQAdapter(housekeepingQueue),
      new BullMQAdapter(syncQueue),
    ],
    serverAdapter,
  });

  serverAdapter.setBasePath("/bull");

  // Auth decision: /bull is NOT on the public allowlist, so the global Bearer
  // hook (registered before this plugin in server.ts) protects it with the same
  // API_SECRET. Browser access therefore requires sending the Bearer token
  // (e.g. via a reverse proxy that injects it), which is the intended posture.
  await fastify.register(serverAdapter.registerPlugin(), { prefix: "/bull" });
  fastify.log.info("[bull-board] UI available at /bull");
});
