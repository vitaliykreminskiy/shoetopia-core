# Admin Auth — Design Spec

Date: 2026-06-18
App: `apps/admin` (Next.js 16)

## Problem

The admin frontend has a login page that sets an `admin_session` cookie, but
**nothing ever verifies it**. The middleware (`proxy.ts`) only injects
`Authorization: Bearer ${API_SECRET}` on `/api/*` and does not check the session.
All `/admin/*` pages and `/api/*` proxied calls are therefore reachable without
logging in. Additionally, the cookie value is the raw `ADMIN_SECRET` in plaintext,
and session expiry is enforced only by the cookie `maxAge`.

## Goal

Make the middleware actually enforce the session:

- Protect every `/admin/*` page — redirect unauthenticated users to `/admin/login`.
- Protect every `/api/*` proxied call — return `401` when there is no valid session.
- Replace the plaintext-secret cookie with a signed HMAC token that carries a real
  expiry.
- Keep a dev backdoor: in `NODE_ENV=development` the login accepts any non-empty
  password.
- Add logout (endpoint + button).

## Constraints / Context

- All admin pages fetch `/api/admin/*` (and `/api/cron/daily-sync`) **client-side**
  with relative URLs, so the browser sends the `admin_session` cookie automatically.
  There are no server-side RSC fetches to `/api`. Gating `/api/*` on the session
  cookie is therefore safe.
- `/api/:path*` is rewritten to the backend Fastify API via `next.config.mjs`. The
  local login route `/api/admin/auth/login` exists as a file and is matched before
  the rewrite (`afterFiles` semantics). The backend continues to require
  `Bearer ${API_SECRET}`, which the middleware injects.
- `proxy.ts` is the Next 16 middleware convention; keep the existing `export const
  proxy` + `export const config` shape.
- Middleware runs on the Edge runtime; the session module must use Web Crypto
  (`globalThis.crypto.subtle`) so it works in both Edge (middleware) and Node
  (route handlers). No new runtime dependencies.

## Components

### 1. `apps/admin/lib/session.ts` (new)

Edge + Node compatible. Web Crypto HMAC-SHA256. Exports:

- `COOKIE_NAME = 'admin_session'`
- `SESSION_TTL_MS = 8 * 60 * 60 * 1000` (8 hours)
- `getSigningKey(): string | null`
  - returns `process.env.ADMIN_SECRET` when set
  - in dev (`NODE_ENV !== 'production'`) falls back to `'dev-insecure-secret'`
  - in prod with no `ADMIN_SECRET` returns `null` → callers treat as unauthenticated
    (secure by default)
- `createSessionToken(): Promise<string>`
  - payload `{ exp: Date.now() + SESSION_TTL_MS }`
  - token = `base64url(JSON.stringify(payload)) + '.' + base64url(hmac)`
  - hmac = HMAC-SHA256 over the payload segment, keyed by `getSigningKey()`
- `verifySessionToken(token: string | undefined): Promise<boolean>`
  - returns `false` for missing/malformed token or `null` signing key
  - recomputes the HMAC and compares **constant-time**
  - parses payload and returns `false` if `exp <= Date.now()`

Helpers (`base64url` encode/decode, constant-time compare) are local to the module.

### 2. `apps/admin/proxy.ts` (rewrite)

- `config.matcher = ['/admin/:path*', '/api/:path*']`
- Public exceptions (no session required): pathname `'/admin/login'` and
  `'/api/admin/auth/login'` → pass straight through.
- Read the `admin_session` cookie and `await verifySessionToken(...)`.
- **Valid session:**
  - `/api/*` → inject `Authorization: Bearer ${API_SECRET}` (only when `API_SECRET`
    is set, as today) and continue.
  - `/admin/login` while already authenticated → redirect to `/admin`.
  - otherwise continue.
- **Invalid/absent session:**
  - `/admin/*` → `NextResponse.redirect` to `/admin/login`.
  - `/api/*` → `NextResponse.json({ error: 'Unauthorized' }, { status: 401 })`.
- The function becomes `async` (crypto is async).

### 3. `apps/admin/app/api/admin/auth/login/route.ts` (modify)

- Password validation:
  - prod: require `ADMIN_SECRET` to be set AND `timingSafeEqual(password, ADMIN_SECRET)`
  - dev (`NODE_ENV === 'development'`): accept any non-empty password (backdoor)
- On success: set the `admin_session` cookie to `await createSessionToken()` with
  `httpOnly: true`, `secure: NODE_ENV === 'production'`, `sameSite: 'lax'`,
  `maxAge: SESSION_TTL_MS / 1000`, `path: '/'`.
- Remove the old `sessionToken = adminSecret ?? 'dev'` plaintext approach.
- Reuse `COOKIE_NAME` and the TTL from `lib/session.ts`.

### 4. `apps/admin/app/api/admin/auth/logout/route.ts` (new)

- `POST` clears the `admin_session` cookie (`maxAge: 0`, same `path`) and returns
  `{ ok: true }`.

### 5. Logout button

- `app/admin/layout.tsx` is a server component, so add a small client component
  (e.g. `app/admin/sign-out-button.tsx`, kebab-case) rendered in the layout header.
- On click: `POST /api/admin/auth/logout`, then `router.push('/admin/login')`.

## Dev backdoor — summary

In `NODE_ENV=development`:

- The login route accepts any non-empty password.
- `getSigningKey()` falls back to `'dev-insecure-secret'`, so token sign/verify is
  consistent even when `ADMIN_SECRET` is unset.
- The middleware still enforces a valid signed cookie, so the dev flow is: log in
  once with any password → get a valid session → browse.

## Testing

The `apps/api` package already uses **vitest**. Add vitest to `apps/admin`
(`test: "vitest run"` script + devDependency) and a `lib/session.test.ts`:

- create → verify roundtrip returns `true`
- tampered token (mutated payload or signature) → `false`
- expired token (`exp` in the past) → `false`
- missing/malformed token → `false`

Manual verification: with `ADMIN_SECRET` set and `NODE_ENV=production`-like build,
hitting `/admin/status` while logged out redirects to `/admin/login`; `curl`-ing
`/api/admin/status` without the cookie returns `401`; logout clears the session.

## Out of scope

- Multi-user accounts / roles (single shared admin password stays).
- Rate limiting / lockout on the login endpoint.
- Changing the backend `API_SECRET` mechanism.
