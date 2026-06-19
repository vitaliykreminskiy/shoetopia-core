import Fastify from "fastify";
import cors from "@fastify/cors";
import redisPlugin from "./plugins/redis.js";
import bullBoardPlugin from "./plugins/bull-board.js";
import { registerAuth } from "./plugins/auth.js";
import { registerRoutes } from "./routes/index.js";
import { prisma } from "@shoetopia/db";

const server = Fastify({
  logger: {
    level: process.env.LOG_LEVEL ?? "info",
    transport:
      process.env.NODE_ENV === "development"
        ? { target: "pino-pretty" }
        : undefined,
  },
});

await server.register(cors, { origin: true });
await server.register(redisPlugin);

// Global Bearer auth — registered before any route-bearing plugin so the
// onRequest hook covers every route (a Fastify hook only applies to routes
// registered after it). This includes the bull-board UI at /bull.
registerAuth(server);

if (!process.env.API_SECRET) {
  if (process.env.NODE_ENV === "production") {
    server.log.error(
      "[auth] API_SECRET is not set in production — all non-public routes will return 401 (fail closed)",
    );
  } else {
    server.log.warn(
      "[auth] API_SECRET is not set — authentication is disabled (non-production only)",
    );
  }
}

await server.register(bullBoardPlugin);
await registerRoutes(server);

const port = Number(process.env.PORT ?? 3001);
await server.listen({ port, host: "0.0.0.0" });
server.log.info(`API listening on port ${port}`);

try {
  await prisma.$queryRaw`SELECT 1`;
  server.log.info("[db] connected");
} catch (err: any) {
  server.log.error(`[db] connection failed: ${err.message}`);
}
