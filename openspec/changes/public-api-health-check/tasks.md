## 1. Health route module

- [x] 1.1 Create `apps/api/src/routes/health.ts` as a `FastifyPluginAsync` (arrow function, kebab-case file).
- [x] 1.2 Add a `~1s` timeout constant and a `withTimeout` helper that races a probe promise against a timeout, resolving to `"down"` on timeout.
- [x] 1.3 Implement a database probe: `prisma.$queryRaw\`SELECT 1\`` → `"up"`, throw/timeout → `"down"`.
- [x] 1.4 Implement a Redis probe: `fastify.redis === null` → `"disabled"`; otherwise `redis.ping()` → `"up"`, error/timeout → `"down"`.

## 2. Endpoints

- [x] 2.1 Add `GET /health/live` returning `200` `{ status: "ok" }` with no dependency probes.
- [x] 2.2 Add `GET /health` that runs the DB and Redis probes in parallel (`Promise.all`).
- [x] 2.3 Compute overall status: `"error"` if any required check is `"down"` (Redis `"disabled"` does not fail), else `"ok"`.
- [x] 2.4 Set HTTP status `200` when `ok`, `503` when `error`; body `{ status, checks: { database, redis } }`.
- [x] 2.5 Log probe failures via `fastify.log.error`; ensure no credentials/stack traces in the response body.

## 3. Wiring

- [x] 3.1 Remove the inline `server.get("/health", ...)` handler from `apps/api/src/server.ts`.
- [x] 3.2 Import and register `healthRoute` first in `apps/api/src/routes/index.ts`.
- [x] 3.3 Confirm the route is registered before admin/cron routes and stays unauthenticated (no `requireApiSecret`).

## 4. Tests & verification

- [x] 4.1 Add tests in `apps/api/src/routes/__tests__/` covering: live `200`; healthy `200` with all checks up; DB down → `503`; Redis null → `200` with `redis: "disabled"`.
- [x] 4.2 Assert no `Authorization` header is required (no `401`) and response body contains no sensitive fields.
- [x] 4.3 Run the API test suite and a manual `curl /health` and `/health/live` against a local instance; confirm status codes and payload shapes.
