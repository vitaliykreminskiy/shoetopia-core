import type { FastifyPluginAsync } from "fastify";
import { requireApiSecret } from "../../plugins/auth.js";

const reprocessRoute: FastifyPluginAsync = async (fastify) => {
  fastify.post(
    "/api/admin/reprocess-all",
    { preHandler: requireApiSecret },
    async (_request, reply) => {
      fastify.log.info(
        "[reprocess-all] Triggered (stub — will be wired to BullMQ queue in Task 9)",
      );
      return reply.send({
        started: true,
        runId: null,
        note: "Not yet wired to queue",
      });
    },
  );
};

export default reprocessRoute;
