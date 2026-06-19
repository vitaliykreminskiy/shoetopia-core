## 1. Harden the auth check

- [x] 1.1 Rewrite `requireApiSecret` in `apps/api/src/plugins/auth.ts` to parse the `Bearer <token>` header strictly and compare against `API_SECRET` with `crypto.timingSafeEqual` (length-check first to avoid throwing on mismatched lengths)
- [x] 1.2 Implement fail-closed-in-production: when `API_SECRET` is unset, reject if `NODE_ENV==='production'`, allow otherwise; add a `return` after every `reply.code(401).send(...)`
- [x] 1.3 Log once at startup when `API_SECRET` is unset in production (clear, no secret value in logs)

## 2. Global auth hook

- [x] 2.1 Add a `PUBLIC_PATHS` set (`/health`, `/health/live`) and an `onRequest` hook in `auth.ts` that calls the hardened check for any request whose path is not in the allowlist
- [x] 2.2 Register the `onRequest` hook in `apps/api/src/server.ts` before `registerRoutes` so it covers every route

## 3. Remove per-route opt-in

- [x] 3.1 Remove `preHandler: requireApiSecret` from all admin routes (`apps/api/src/routes/admin/*.ts`) now covered by the global hook
- [x] 3.2 Remove `preHandler: requireApiSecret` from `apps/api/src/routes/cron/daily-sync.ts`
- [x] 3.3 Decide and apply bull-board coverage (`plugins/bull-board.ts`) — through the global hook or an explicit gate; leave a comment recording the decision

## 4. Config & docs

- [x] 4.1 Mark `API_SECRET` as required in production in the core env schema/docs and note it must equal the frontend's `CORE_API_KEY`
- [x] 4.2 Ensure local dev (`docker-compose.dev.yml` / `.env` examples) documents an `API_SECRET` value for end-to-end testing against the frontend

## 5. Verification

- [x] 5.1 Type-check / build: `pnpm --filter @shoetopia/api build` passes
- [x] 5.2 Add/extend vitest: valid token → handler runs; missing/wrong/malformed token → 401; `/health` + `/health/live` reachable without a token
- [x] 5.3 Test fail-closed: `NODE_ENV=production` + unset `API_SECRET` → protected route 401; non-production + unset → reachable
- [ ] 5.4 Manual smoke: start the API with `API_SECRET` set, confirm a data route 401s without the header and 200s with `Authorization: Bearer <secret>`; confirm the frontend DAL succeeds when `CORE_API_KEY` matches _(blocked: requires running core + frontend stack)_
