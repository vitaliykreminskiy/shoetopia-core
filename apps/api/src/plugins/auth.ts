import type { FastifyRequest, FastifyReply } from "fastify";

export async function requireApiSecret(
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<void> {
  const apiSecret = process.env.API_SECRET;

  if (!apiSecret) return; // no secret configured — skip auth

  const auth = request.headers.authorization;

  if (!auth || auth !== `Bearer ${apiSecret}`) {
    reply.code(401).send({ error: "Unauthorized" });
  }
}
