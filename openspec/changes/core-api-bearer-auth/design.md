## Context

The core API is a Fastify 5 app (`apps/api`). Auth today is a per-route opt-in: `requireApiSecret` (in `plugins/auth.ts`) is attached as a `preHandler` on admin and cron routes only. Public data routes register without it, so they are fully open. The guard also returns early (skips auth) whenever `API_SECRET` is unset, and it lacks a `return` after `reply.send`, relying on Fastify's send-halts-lifecycle behavior. The `shoetopia` frontend DAL already sends `Authorization: Bearer <CORE_API_KEY>` on every call; `CORE_API_KEY` and the core's `API_SECRET` are meant to be the same shared secret.

## Goals / Non-Goals

**Goals:**
- Authentication on by default for every route, opt-out only via an explicit allowlist.
- Health probes remain reachable without a token.
- Fail closed in production when the secret is missing; stay convenient in local dev.
- Constant-time comparison; no per-route boilerplate.

**Non-Goals:**
- Per-user identity, JWTs, scopes, or rotation tooling — single shared secret only.
- Changing the frontend DAL (it already sends the header).
- Rate limiting, IP allowlisting, or mTLS (separate concerns).
- Multi-tenant or per-route differentiated secrets.

## Decisions

### Global `onRequest` hook with an allowlist, not per-route preHandlers

Register one `onRequest` hook on the Fastify instance that enforces the Bearer check, and skip it only for paths in a small `PUBLIC_PATHS` set (`/health`, `/health/live`). Rationale: default-on coverage means a newly added route is protected automatically — the current per-route model failed exactly because public routes simply never opted in. Alternative considered: keep per-route `preHandler` and add it to every public route — rejected; it is the status-quo footgun (easy to forget, already forgotten).

`onRequest` (earliest lifecycle hook) is chosen over `preHandler` so unauthenticated requests are rejected before body parsing and route-level work.

### Keep `requireApiSecret` as the shared check, fold admin/cron into the global hook

The same `API_SECRET` already guards admin/cron. Move enforcement into the global hook so those routes no longer need their own `preHandler`, and remove the now-redundant per-route attachments. Rationale: one code path, one place to reason about. Admin/cron and data routes all require the same secret, so no differentiation is needed today.

### Fail closed in production, open in development

If `API_SECRET` is unset: reject protected routes when `NODE_ENV==='production'`; allow them otherwise. Rationale: a missing secret in prod is a misconfiguration that must not silently disable auth (today's behavior); locally, requiring a secret would add friction with no security benefit. Surface the missing-secret condition with a startup log so it is visible in prod.

### Constant-time comparison via `crypto.timingSafeEqual`

Compare the presented token to `API_SECRET` with `timingSafeEqual` over equal-length buffers (length-pad/short-circuit on length mismatch without leaking via early byte comparison). Rationale: cheap, standard-library, removes a timing side channel. Alternative: plain `===` — rejected; leaks match progress through timing.

## Risks / Trade-offs

- **Misconfiguration locks out all traffic** → health probes stay public so orchestrators still see the service; a clear startup error names `API_SECRET`; secrets documented as a matched pair (`API_SECRET` ⇆ `CORE_API_KEY`).
- **BREAKING for deployments running without `API_SECRET`** → call out in release notes; set the secret before deploy. Dev stays open so local workflows are unaffected.
- **Single shared secret is coarse** → accepted; per-client identity is a future change. Leak means rotate one value on both sides.
- **Bull-board / non-route assets** → ensure any mounted dashboards/static paths are deliberately placed inside or outside the allowlist; verify bull-board access during implementation.

## Migration Plan

1. Set `API_SECRET` in every core deployment, equal to the frontend's `CORE_API_KEY`.
2. Ship the global hook + hardened check; remove per-route `preHandler: requireApiSecret`.
3. Verify: probes public, data/admin/cron routes require the token, wrong/missing token → 401.
4. Watch 401 rates post-deploy for unexpected unauthenticated callers.

**Rollback:** revert the server hook registration; routes return to open (or re-add per-route guards) — no data migration involved.

## Open Questions

- Should bull-board (admin dashboard) require the same `API_SECRET` via the hook, or its own gate? (Default: same secret through the hook.)
- Any internal caller besides the frontend DAL that currently hits the core unauthenticated and must be updated first?
