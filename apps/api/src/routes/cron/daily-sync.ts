import type { FastifyPluginAsync } from "fastify";
import { requireApiSecret } from "../../plugins/auth.js";
import { syncQueue } from "@shoetopia/jobs";
import { randomUUID } from "crypto";

const dailySyncRoute: FastifyPluginAsync = async (fastify) => {
  fastify.post(
    "/api/cron/daily-sync",
    { preHandler: requireApiSecret },
    async (_request, reply) => {
      const runId = randomUUID();
      const runStartedAt = new Date().toISOString();

      await syncQueue.add("daily-sync", { runId, runStartedAt });
      fastify.log.info(`[cron] Enqueued daily-sync run ${runId}`);

      return reply.send({ ok: true, runId, runStartedAt });
    },
  );
};

export default dailySyncRoute;
