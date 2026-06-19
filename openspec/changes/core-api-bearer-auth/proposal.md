## Why

The core API's public data routes (`/products`, `/search`, `/brands`, `/categories`, `/deals`, `/coupons`, `/hero`, etc.) have no authentication — anyone who reaches the host can read the full catalog. The `shoetopia` frontend already sends `Authorization: Bearer <CORE_API_KEY>` on every DAL request, but the core ignores it on read routes. Only admin and cron routes are protected, and that guard fails **open** when no secret is configured. This closes the gap so the data API only answers authenticated callers.

## What Changes

- Require a Bearer token on all public data routes via a single global `onRequest` auth hook, instead of per-route opt-in.
- Keep an explicit **public allowlist** for unauthenticated endpoints: `/health`, `/health/live` (probes must stay open).
- Harden the token check: constant-time comparison, and **fail closed** (reject) when `API_SECRET` is unset in production instead of skipping auth. **BREAKING** for any deployment currently running without `API_SECRET`.
- Keep admin/cron routes protected by the same shared secret (they already use `requireApiSecret`); fold them into the global hook so coverage is default-on, not per-route.
- Document that the core's `API_SECRET` and the frontend's `CORE_API_KEY` are the same shared value and must match.

## Capabilities

### New Capabilities
- `api-authentication`: Bearer-token authentication enforced globally across the core API, with an explicit public allowlist for health probes, fail-closed behavior, and constant-time secret comparison.

### Modified Capabilities
<!-- None. health-check and product-categories specs are unchanged; auth is additive and health endpoints remain public. -->

## Impact

- **Code:** `apps/api/src/plugins/auth.ts` (harden + global hook), `apps/api/src/server.ts` (register hook), per-route `preHandler: requireApiSecret` removed in favor of the global hook.
- **Config:** `API_SECRET` becomes required in production; document the `API_SECRET` ⇆ `CORE_API_KEY` pairing.
- **Consumers:** the `shoetopia` DAL already sends the header — no client change needed once secrets match. Any other unauthenticated caller breaks (intended).
- **Risk:** misconfiguration locks out all traffic; mitigated by health probes staying public and a clear startup error when the secret is missing in production.
