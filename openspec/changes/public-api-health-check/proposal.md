## Why

The public API exposes a single `/health` endpoint that returns a static `{ ok: true }` regardless of whether the dependencies the public storefront actually relies on (Postgres, Redis) are reachable. Load balancers, uptime monitors, and deploy gates therefore report "healthy" while the public API is serving errors. We need a health check that reflects the real state of the public (non-admin) API path.

## What Changes

- Replace the static `/health` handler with a real readiness check that probes the public API's runtime dependencies (database, Redis cache).
- Return a structured payload listing each dependency's status and overall health.
- Return HTTP `200` when all checks pass, `503` when any dependency is down, so monitors and orchestrators react correctly.
- Keep the endpoint **public and unauthenticated** — it checks the external storefront API only, not admin/cron internals, and exposes no sensitive data.
- Add a lightweight `/health/live` liveness probe (process up, no dependency checks) alongside the dependency-aware readiness check.

## Capabilities

### New Capabilities
- `health-check`: Public, unauthenticated liveness and readiness endpoints that report the health of the external API and its runtime dependencies.

### Modified Capabilities
<!-- None: no existing spec defines health behavior. -->

## Impact

- `apps/api/src/server.ts` — current inline `/health` handler replaced/moved.
- New route module under `apps/api/src/routes/` for health endpoints, registered in `routes/index.ts`.
- Reads existing Redis plugin (`plugins/redis.ts`) and Prisma client (`@shoetopia/db`); no new dependencies.
- Consumers: load balancer / uptime monitor / deploy health gate configuration may switch from `/health` to `/health/live` vs `/health` (readiness).
