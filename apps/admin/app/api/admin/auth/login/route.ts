import { NextRequest, NextResponse } from 'next/server'
import { COOKIE_NAME, SESSION_TTL_MS, createSessionToken } from '@/lib/session'

const timingSafeEqual = (a: string, b: string): boolean => {
  if (a.length !== b.length) return false
  let result = 0
  for (let i = 0; i < a.length; i++) result |= a.charCodeAt(i) ^ b.charCodeAt(i)
  return result === 0
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null)
  const password = body?.password
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
