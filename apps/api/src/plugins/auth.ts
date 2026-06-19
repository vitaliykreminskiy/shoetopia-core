import type { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { timingSafeEqual } from "node:crypto";

// Routes reachable without a Bearer token. Probes only — nothing else belongs here.
const PUBLIC_PATHS = new Set<string>(["/api/health", "/api/health/live"]);

// Constant-time compare so response timing never reveals how many leading
// characters of a guessed token are correct. Length mismatch short-circuits
// (the length itself is not secret) before timingSafeEqual, which throws on
// unequal-length buffers.
const tokenMatches = (provided: string, expected: string): boolean => {
  const a = Buffer.from(provided);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
};

/**
 * Enforces `Authorization: Bearer <API_SECRET>`. Rejects with 401 on a missing,
 * malformed, or non-matching token. When API_SECRET is unset it fails closed in
 * production and stays open in non-production for local development.
 */
export const requireApiSecret = async (
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<void> => {
  const apiSecret = process.env.API_SECRET;

  if (!apiSecret) {
    if (process.env.NODE_ENV === "production") {
      request.log.error(
        "[auth] API_SECRET is not configured — rejecting request (fail closed)",
      );
      reply.code(401).send({ error: "Unauthorized" });
    }
    return; // non-production: allow, to keep local dev frictionless
  }

  const auth = request.headers.authorization;
  const prefix = "Bearer ";
  if (
    !auth ||
    !auth.startsWith(prefix) ||
    !tokenMatches(auth.slice(prefix.length), apiSecret)
  ) {
    reply.code(401).send({ error: "Unauthorized" });
    return;
  }
};

/**
 * Registers a global onRequest hook that authenticates every request except
 * those on the public allowlist. Default-on coverage: a newly added route is
 * protected automatically.
 */
export const registerAuth = (fastify: FastifyInstance): void => {
  fastify.addHook("onRequest", async (request, reply) => {
    const path = request.url.split("?", 1)[0];
    if (PUBLIC_PATHS.has(path)) return;
    await requireApiSecret(request, reply);
  });
};
