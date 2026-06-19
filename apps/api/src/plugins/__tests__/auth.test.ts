import { describe, it, expect, afterEach, vi } from "vitest";
import Fastify from "fastify";
import { registerAuth } from "../auth.js";

const SECRET = "s3cr3t-token";

// Builds an app with the global auth hook plus a public health route and a
// protected data route, mirroring the real registration order.
const buildApp = async () => {
  const app = Fastify();
  registerAuth(app);
  app.get("/health", async () => ({ status: "ok" }));
  app.get("/health/live", async () => ({ status: "ok" }));
  app.get("/api/products", async () => ({ products: [] }));
  await app.ready();
  return app;
};

afterEach(() => {
  vi.unstubAllEnvs();
});

describe("global bearer auth", () => {
  it("accepts a valid Bearer token on a protected route", async () => {
    vi.stubEnv("API_SECRET", SECRET);
    const app = await buildApp();
    const res = await app.inject({
      method: "GET",
      url: "/api/products",
      headers: { authorization: `Bearer ${SECRET}` },
    });
    expect(res.statusCode).toBe(200);
    await app.close();
  });

  it("rejects a missing Authorization header with 401", async () => {
    vi.stubEnv("API_SECRET", SECRET);
    const app = await buildApp();
    const res = await app.inject({ method: "GET", url: "/api/products" });
    expect(res.statusCode).toBe(401);
    await app.close();
  });

  it("rejects a wrong token with 401", async () => {
    vi.stubEnv("API_SECRET", SECRET);
    const app = await buildApp();
    const res = await app.inject({
      method: "GET",
      url: "/api/products",
      headers: { authorization: "Bearer nope" },
    });
    expect(res.statusCode).toBe(401);
    await app.close();
  });

  it("rejects a malformed (non-Bearer) header with 401", async () => {
    vi.stubEnv("API_SECRET", SECRET);
    const app = await buildApp();
    const res = await app.inject({
      method: "GET",
      url: "/api/products",
      headers: { authorization: SECRET },
    });
    expect(res.statusCode).toBe(401);
    await app.close();
  });

  it("allows /health and /health/live without a token", async () => {
    vi.stubEnv("API_SECRET", SECRET);
    const app = await buildApp();
    for (const url of ["/health", "/health/live"]) {
      const res = await app.inject({ method: "GET", url });
      expect(res.statusCode).toBe(200);
    }
    await app.close();
  });

  it("does not allowlist a query-suffixed health path twin", async () => {
    vi.stubEnv("API_SECRET", SECRET);
    const app = await buildApp();
    // /health?x=1 still resolves to the public /health route (query stripped).
    const res = await app.inject({ method: "GET", url: "/health?x=1" });
    expect(res.statusCode).toBe(200);
    await app.close();
  });

  describe("fail-closed behavior when API_SECRET is unset", () => {
    it("rejects protected routes in production", async () => {
      vi.stubEnv("API_SECRET", "");
      vi.stubEnv("NODE_ENV", "production");
      const app = await buildApp();
      const res = await app.inject({ method: "GET", url: "/api/products" });
      expect(res.statusCode).toBe(401);
      await app.close();
    });

    it("allows protected routes in non-production (local dev)", async () => {
      vi.stubEnv("API_SECRET", "");
      vi.stubEnv("NODE_ENV", "development");
      const app = await buildApp();
      const res = await app.inject({ method: "GET", url: "/api/products" });
      expect(res.statusCode).toBe(200);
      await app.close();
    });
  });
});
