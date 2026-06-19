## Context

The public API ([apps/api/src/server.ts](../../../apps/api/src/server.ts)) registers a single inline health route:

```ts
server.get("/health", async () => ({ ok: true }));
```

It always returns `{ ok: true }` and never touches Postgres or Redis, so external monitors and deploy gates report healthy even when the storefront API is failing. Runtime dependencies available to probe:

- **Postgres** via the shared Prisma client (`@shoetopia/db`), reachable with `prisma.$queryRaw\`SELECT 1\``. The DB connectivity check already exists at startup in `server.ts`.
- **Redis** via the redis plugin, decorated as `fastify.redis: Redis | null`. It is **optional** — when `REDIS_URL` is unset the decorator is `null` and caching is disabled by design, not an error.

The endpoint is part of the public (non-admin) surface and must stay unauthenticated; admin/cron routes keep their existing `requireApiSecret` gate and are out of scope.

## Goals / Non-Goals

**Goals:**
- Real readiness check at `GET /health` that probes DB and Redis and returns `200`/`503` accordingly.
- Fast liveness check at `GET /health/live` with no dependency probes.
- Structured, non-sensitive JSON payload with per-dependency status.
- Bounded probe time so the endpoint never hangs.

**Non-Goals:**
- Authentication on health endpoints (must remain public).
- Health of admin/cron internals, queues (bull-board), or external affiliate feeds.
- Metrics/observability dashboards or historical health tracking.

## Decisions

**1. Two endpoints: `/health/live` (liveness) + `/health` (readiness).**
Liveness answers "is the process up" for orchestrator restarts; readiness answers "can it serve traffic" for load-balancer routing. Splitting them prevents a transient DB blip from triggering pod restarts. Alternative — single endpoint — rejected: conflates restart and routing signals.

**2. Move health into a dedicated route module** `apps/api/src/routes/health.ts`, registered first in `routes/index.ts`; remove the inline handler from `server.ts`. Keeps `server.ts` to bootstrap concerns and matches the existing per-feature route convention (kebab-case file).

**3. Redis `null` is reported as `"disabled"`, not `"down"`, and does NOT fail readiness.** Redis is optional by design; a missing cache should not mark the API unready. Only an active Redis client that fails to `PING` is `"down"`. Alternative — treat null as down — rejected: would make every cache-less deploy report `503`.

**4. Bound each probe with a short timeout (~1s) via `Promise.race`.** A hung DB/Redis socket must not hang the health endpoint. On timeout the dependency is `"down"` and overall status is `error`.

**5. Probes run in parallel** (`Promise.all`) so total latency ≈ slowest single probe, not the sum.

**6. Payload shape** — minimal and non-sensitive:
```json
{ "status": "ok", "checks": { "database": "up", "redis": "up" } }
```
`status` is `"ok"` only when no required dependency is `"down"`. HTTP `200` when `ok`, `503` otherwise. No error messages, connection strings, or stack traces leak to the client; failures are logged server-side via `fastify.log`.

## Risks / Trade-offs

- **Unauthenticated readiness reveals dependency up/down state** → Mitigation: expose only coarse `up`/`down`/`disabled` strings, no internals; acceptable for a public liveness signal.
- **Health probes add DB/Redis load if monitors poll aggressively** → Mitigation: probes are trivial (`SELECT 1` / `PING`); `/health/live` carries the high-frequency polling with zero dependency cost.
- **Timeout too tight could flap under load** → Mitigation: ~1s is generous for `SELECT 1`/`PING`; tune via constant if flapping observed.
- **Existing monitors point at `/health` expecting `{ ok: true }`** → Mitigation: `/health` still returns `200` when healthy; payload superset stays backward-compatible. Document switching aggressive pollers to `/health/live`.
