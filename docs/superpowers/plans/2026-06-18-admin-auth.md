# Admin Auth Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make `apps/admin` actually enforce login — protect every `/admin/*` page and `/api/*` proxied call behind a signed, expiring session, with a dev backdoor that accepts any password.

**Architecture:** A small Edge+Node session module (`lib/session.ts`) signs an HMAC token carried in the `admin_session` cookie. The Next 16 middleware (`proxy.ts`) verifies it on every `/admin/*` and `/api/*` request — redirecting unauthenticated page requests to `/admin/login`, returning `401` for unauthenticated API requests, and injecting `Authorization: Bearer ${API_SECRET}` only for authenticated API requests. Login issues the token; logout clears it.

**Tech Stack:** Next.js 16 (App Router, `proxy.ts` middleware), TypeScript, Web Crypto (HMAC-SHA256), vitest, lucide-react, sonner.

## Global Constraints

- Code style: arrow functions preferred over `function` declarations; kebab-case file names (per `CLAUDE.md`).
- Session module must run on **both** the Edge runtime (middleware) and Node (route handlers) — use `globalThis` Web Crypto (`crypto.subtle`, `btoa`, `atob`, `TextEncoder`). No new runtime dependencies beyond the test runner.
- Import the session module via the `@/lib/session` alias (`@/*` → `./*` is configured in `apps/admin/tsconfig.json`).
- Cookie name is exactly `admin_session`. Session TTL is 8 hours.
- `getSigningKey()` returns `ADMIN_SECRET`; in dev it falls back to `'dev-insecure-secret'`; in prod with no `ADMIN_SECRET` it returns `null` and all requests are treated as unauthenticated.
- Dev backdoor applies only when `process.env.NODE_ENV === 'development'`: login accepts any non-empty password.
- Match the existing `apps/api` test runner: vitest `^2.0.0`.

---

## File Structure

- Create: `apps/admin/lib/session.ts` — token sign/verify, cookie + TTL constants, signing-key resolution.
- Create: `apps/admin/lib/session.test.ts` — vitest unit tests for the session module.
- Modify: `apps/admin/package.json` — add `test` script + vitest devDependency.
- Modify: `apps/admin/app/api/admin/auth/login/route.ts` — issue signed token; dev backdoor.
- Create: `apps/admin/app/api/admin/auth/logout/route.ts` — clear the session cookie.
- Modify: `apps/admin/proxy.ts` — enforce the session on `/admin/*` and `/api/*`.
- Create: `apps/admin/app/admin/sign-out-button.tsx` — client logout button.
- Modify: `apps/admin/app/admin/layout.tsx` — render the sign-out button in the header.

---

## Task 1: Session module + unit tests

**Files:**
- Create: `apps/admin/lib/session.ts`
- Test: `apps/admin/lib/session.test.ts`
- Modify: `apps/admin/package.json`

**Interfaces:**
- Consumes: nothing.
- Produces:
  - `COOKIE_NAME: string` (= `'admin_session'`)
  - `SESSION_TTL_MS: number` (= `8 * 60 * 60 * 1000`)
  - `getSigningKey(): string | null`
  - `createSessionToken(ttlMs?: number): Promise<string>`
  - `verifySessionToken(token: string | undefined): Promise<boolean>`

- [ ] **Step 1: Add vitest to the admin package**

In `apps/admin/package.json`, add a `test` script and the vitest devDependency, then install.

Add to `"scripts"`:
```json
"test": "vitest run"
```
Add to `"devDependencies"`:
```json
"vitest": "^2.0.0"
```
Run:
```bash
cd apps/admin && pnpm install
```
Expected: vitest installed, lockfile updated.

- [ ] **Step 2: Write the failing test**

Create `apps/admin/lib/session.test.ts`:
```ts
import { describe, it, expect } from 'vitest'
import { createSessionToken, verifySessionToken } from './session'

describe('session token', () => {
  it('verifies a freshly created token', async () => {
    const token = await createSessionToken()
    expect(await verifySessionToken(token)).toBe(true)
  })

  it('rejects a tampered signature', async () => {
    const token = await createSessionToken()
    const [payload, sig] = token.split('.')
    const flipped = (sig[0] === 'A' ? 'B' : 'A') + sig.slice(1)
    expect(await verifySessionToken(`${payload}.${flipped}`)).toBe(false)
  })

  it('rejects a forged payload with a stale signature', async () => {
    const token = await createSessionToken()
    const [, sig] = token.split('.')
    const forged = Buffer.from(
      JSON.stringify({ exp: Date.now() + 10_000_000 }),
    ).toString('base64url')
    expect(await verifySessionToken(`${forged}.${sig}`)).toBe(false)
  })

  it('rejects an expired token', async () => {
    const token = await createSessionToken(-1000)
    expect(await verifySessionToken(token)).toBe(false)
  })

  it('rejects a missing or malformed token', async () => {
    expect(await verifySessionToken(undefined)).toBe(false)
    expect(await verifySessionToken('')).toBe(false)
    expect(await verifySessionToken('not-a-token')).toBe(false)
  })
})
```

- [ ] **Step 3: Run the test to verify it fails**

Run:
```bash
cd apps/admin && pnpm test session
```
Expected: FAIL — cannot resolve `./session` (module does not exist yet).

- [ ] **Step 4: Write the minimal implementation**

Create `apps/admin/lib/session.ts`:
```ts
export const COOKIE_NAME = 'admin_session'
export const SESSION_TTL_MS = 8 * 60 * 60 * 1000 // 8 hours

const DEV_FALLBACK_KEY = 'dev-insecure-secret'
const encoder = new TextEncoder()

export const getSigningKey = (): string | null => {
  const secret = process.env.ADMIN_SECRET
  if (secret) return secret
  if (process.env.NODE_ENV !== 'production') return DEV_FALLBACK_KEY
  return null
}

const base64urlEncode = (bytes: Uint8Array): string => {
  let binary = ''
  for (const byte of bytes) binary += String.fromCharCode(byte)
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

const base64urlDecodeToString = (input: string): string =>
  atob(input.replace(/-/g, '+').replace(/_/g, '/'))

const hmac = async (key: string, data: string): Promise<Uint8Array> => {
  const cryptoKey = await crypto.subtle.importKey(
    'raw',
    encoder.encode(key),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  )
  const signature = await crypto.subtle.sign('HMAC', cryptoKey, encoder.encode(data))
  return new Uint8Array(signature)
}

const constantTimeEqual = (a: string, b: string): boolean => {
  if (a.length !== b.length) return false
  let result = 0
  for (let i = 0; i < a.length; i++) result |= a.charCodeAt(i) ^ b.charCodeAt(i)
  return result === 0
}

export const createSessionToken = async (
  ttlMs: number = SESSION_TTL_MS,
): Promise<string> => {
  const key = getSigningKey()
  if (!key) throw new Error('ADMIN_SECRET is not configured')
  const payload = JSON.stringify({ exp: Date.now() + ttlMs })
  const payloadSegment = base64urlEncode(encoder.encode(payload))
  const signature = base64urlEncode(await hmac(key, payloadSegment))
  return `${payloadSegment}.${signature}`
}

export const verifySessionToken = async (
  token: string | undefined,
): Promise<boolean> => {
  if (!token) return false
  const key = getSigningKey()
  if (!key) return false
  const parts = token.split('.')
  if (parts.length !== 2) return false
  const [payloadSegment, signature] = parts
  const expected = base64urlEncode(await hmac(key, payloadSegment))
  if (!constantTimeEqual(signature, expected)) return false
  try {
    const payload = JSON.parse(base64urlDecodeToString(payloadSegment)) as {
      exp?: unknown
    }
    return typeof payload.exp === 'number' && payload.exp > Date.now()
  } catch {
    return false
  }
}
```

- [ ] **Step 5: Run the test to verify it passes**

Run:
```bash
cd apps/admin && pnpm test session
```
Expected: PASS — all 5 tests green.

- [ ] **Step 6: Commit**

```bash
git add apps/admin/lib/session.ts apps/admin/lib/session.test.ts apps/admin/package.json pnpm-lock.yaml
git commit -m "feat(admin): add signed session token module"
```

---

## Task 2: Login route issues a signed token (+ dev backdoor)

**Files:**
- Modify: `apps/admin/app/api/admin/auth/login/route.ts`

**Interfaces:**
- Consumes: `COOKIE_NAME`, `SESSION_TTL_MS`, `createSessionToken` from `@/lib/session`.
- Produces: `POST` sets the `admin_session` cookie to a signed token on success; `401 { error: 'Invalid password' }` otherwise.

- [ ] **Step 1: Replace the route implementation**

Replace the entire contents of `apps/admin/app/api/admin/auth/login/route.ts`:
```ts
import { NextRequest, NextResponse } from 'next/server'
import { COOKIE_NAME, SESSION_TTL_MS, createSessionToken } from '@/lib/session'

const timingSafeEqual = (a: string, b: string): boolean => {
  if (a.length !== b.length) return false
  let result = 0
  for (let i = 0; i < a.length; i++) result |= a.charCodeAt(i) ^ b.charCodeAt(i)
  return result === 0
}

export async function POST(req: NextRequest) {
  const { password } = await req.json()
  const adminSecret = process.env.ADMIN_SECRET
  const isDev = process.env.NODE_ENV === 'development'

  const passwordOk = isDev
    ? typeof password === 'string' && password.length > 0
    : Boolean(
        adminSecret &&
          typeof password === 'string' &&
          timingSafeEqual(password, adminSecret),
      )

  if (!passwordOk) {
    return NextResponse.json({ error: 'Invalid password' }, { status: 401 })
  }

  const res = NextResponse.json({ ok: true })
  res.cookies.set(COOKIE_NAME, await createSessionToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: SESSION_TTL_MS / 1000,
    path: '/',
  })
  return res
}
```

- [ ] **Step 2: Type-check the change**

Run:
```bash
cd apps/admin && pnpm exec tsc --noEmit
```
Expected: no type errors.

- [ ] **Step 3: Commit**

```bash
git add apps/admin/app/api/admin/auth/login/route.ts
git commit -m "feat(admin): issue signed session token on login"
```

---

## Task 3: Logout route clears the session

**Files:**
- Create: `apps/admin/app/api/admin/auth/logout/route.ts`

**Interfaces:**
- Consumes: `COOKIE_NAME` from `@/lib/session`.
- Produces: `POST` clears the `admin_session` cookie and returns `{ ok: true }`.

- [ ] **Step 1: Create the logout route**

Create `apps/admin/app/api/admin/auth/logout/route.ts`:
```ts
import { NextResponse } from 'next/server'
import { COOKIE_NAME } from '@/lib/session'

export async function POST() {
  const res = NextResponse.json({ ok: true })
  res.cookies.set(COOKIE_NAME, '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 0,
    path: '/',
  })
  return res
}
```

- [ ] **Step 2: Type-check the change**

Run:
```bash
cd apps/admin && pnpm exec tsc --noEmit
```
Expected: no type errors.

- [ ] **Step 3: Commit**

```bash
git add apps/admin/app/api/admin/auth/logout/route.ts
git commit -m "feat(admin): add logout route"
```

---

## Task 4: Middleware enforces the session

**Files:**
- Modify: `apps/admin/proxy.ts`

**Interfaces:**
- Consumes: `COOKIE_NAME`, `verifySessionToken` from `@/lib/session`.
- Produces: middleware that gates `/admin/:path*` and `/api/:path*`.

Behavior:
- `/api/admin/auth/login` → always allowed (no session needed to log in).
- `/admin/login` → redirect to `/admin` if already authenticated, otherwise show it.
- Unauthenticated `/api/*` → `401`; unauthenticated `/admin/*` → redirect to `/admin/login`.
- Authenticated `/api/*` → inject `Authorization: Bearer ${API_SECRET}` (only when `API_SECRET` is set), as before.

- [ ] **Step 1: Replace the middleware implementation**

Replace the entire contents of `apps/admin/proxy.ts`:
```ts
import { NextRequest, NextResponse } from 'next/server'
import { COOKIE_NAME, verifySessionToken } from '@/lib/session'

export const proxy = async (request: NextRequest) => {
  const { pathname } = request.nextUrl
  const isApi = pathname.startsWith('/api/')

  // The login API route must stay public — it's how a session is obtained.
  if (pathname === '/api/admin/auth/login') return NextResponse.next()

  const token = request.cookies.get(COOKIE_NAME)?.value
  const isAuthed = await verifySessionToken(token)

  // Login page: bounce already-authenticated users to the dashboard.
  if (pathname === '/admin/login') {
    return isAuthed
      ? NextResponse.redirect(new URL('/admin', request.url))
      : NextResponse.next()
  }

  if (!isAuthed) {
    return isApi
      ? NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
      : NextResponse.redirect(new URL('/admin/login', request.url))
  }

  // Authenticated API call: forward to the backend with the shared secret.
  if (isApi) {
    const apiSecret = process.env.API_SECRET
    if (!apiSecret) return NextResponse.next()
    const headers = new Headers(request.headers)
    headers.set('Authorization', `Bearer ${apiSecret}`)
    return NextResponse.next({ request: { headers } })
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*', '/api/:path*'],
}
```

- [ ] **Step 2: Type-check the change**

Run:
```bash
cd apps/admin && pnpm exec tsc --noEmit
```
Expected: no type errors.

- [ ] **Step 3: Manual verification (prod-like, auth enforced)**

Run a production build and start with a configured secret:
```bash
cd apps/admin && ADMIN_SECRET=test-secret API_SECRET=test-secret pnpm build && \
  ADMIN_SECRET=test-secret API_SECRET=test-secret pnpm start &
```
Then, in another shell:
```bash
# Unauthenticated page → 307 redirect to /admin/login
curl -s -o /dev/null -w '%{http_code} %{redirect_url}\n' http://localhost:3002/admin/status
# Expected: 307 http://localhost:3002/admin/login

# Unauthenticated API → 401
curl -s -o /dev/null -w '%{http_code}\n' http://localhost:3002/api/admin/status
# Expected: 401

# Log in, capture cookie, then reach a protected page
curl -s -c /tmp/admin-cookies.txt -X POST http://localhost:3002/api/admin/auth/login \
  -H 'Content-Type: application/json' -d '{"password":"test-secret"}' -o /dev/null
curl -s -b /tmp/admin-cookies.txt -o /dev/null -w '%{http_code}\n' http://localhost:3002/admin/status
# Expected: 200
```
Stop the server when done (`kill %1`).

- [ ] **Step 4: Commit**

```bash
git add apps/admin/proxy.ts
git commit -m "feat(admin): enforce session in middleware"
```

---

## Task 5: Sign-out button in the admin header

**Files:**
- Create: `apps/admin/app/admin/sign-out-button.tsx`
- Modify: `apps/admin/app/admin/layout.tsx`

**Interfaces:**
- Consumes: the logout route `/api/admin/auth/logout` (Task 3).
- Produces: `SignOutButton` React component.

- [ ] **Step 1: Create the sign-out button**

Create `apps/admin/app/admin/sign-out-button.tsx`:
```tsx
'use client'

import { useRouter } from 'next/navigation'
import { LogOut } from 'lucide-react'

export const SignOutButton = () => {
  const router = useRouter()

  const handleSignOut = async () => {
    await fetch('/api/admin/auth/logout', { method: 'POST' })
    router.push('/admin/login')
  }

  return (
    <button
      onClick={handleSignOut}
      className="flex items-center gap-1 text-xs text-neutral-400 hover:text-white transition-colors"
    >
      <LogOut size={12} /> Sign out
    </button>
  )
}
```

- [ ] **Step 2: Render it in the layout header**

In `apps/admin/app/admin/layout.tsx`, add the import after the existing `Link` import:
```tsx
import { SignOutButton } from "./sign-out-button";
```
Then replace the existing "Back to site" `Link` block:
```tsx
          <Link
            href="/"
            className="flex items-center gap-1 text-xs text-neutral-400 hover:text-white transition-colors"
          >
            <ArrowLeft size={12} /> Back to site
          </Link>
```
with a wrapper that holds both the link and the sign-out button:
```tsx
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="flex items-center gap-1 text-xs text-neutral-400 hover:text-white transition-colors"
            >
              <ArrowLeft size={12} /> Back to site
            </Link>
            <SignOutButton />
          </div>
```

- [ ] **Step 3: Type-check the change**

Run:
```bash
cd apps/admin && pnpm exec tsc --noEmit
```
Expected: no type errors.

- [ ] **Step 4: Manual verification**

With the dev server running (`cd apps/admin && pnpm dev`), log in with any password, confirm the "Sign out" button appears in the header, click it, and confirm you are redirected to `/admin/login` and that revisiting `/admin/status` redirects back to login.

- [ ] **Step 5: Commit**

```bash
git add apps/admin/app/admin/sign-out-button.tsx apps/admin/app/admin/layout.tsx
git commit -m "feat(admin): add sign-out button to admin header"
```

---

## Self-Review Notes

- **Spec coverage:** session module (Task 1) ✓; middleware enforcement of `/admin/*` redirect + `/api/*` 401 + API_SECRET injection (Task 4) ✓; signed token + dev backdoor in login (Task 2) ✓; logout endpoint (Task 3) ✓; logout button (Task 5) ✓; vitest tests for roundtrip/tampered/expired/missing (Task 1) ✓.
- **Dev backdoor:** verified by design — dev login accepts any non-empty password (Task 2), `getSigningKey` dev fallback keeps sign/verify consistent (Task 1), middleware still enforces a valid cookie (Task 4).
- **Type consistency:** `COOKIE_NAME`, `SESSION_TTL_MS`, `createSessionToken`, `verifySessionToken`, `getSigningKey` names are identical across the module definition (Task 1) and every consumer (Tasks 2–4).
