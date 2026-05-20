import { NextRequest, NextResponse } from 'next/server'

const COOKIE_NAME = 'admin_session'
const COOKIE_MAX_AGE = 60 * 60 * 8 // 8 hours

function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false
  let result = 0
  for (let i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i)
  }
  return result === 0
}

export async function POST(req: NextRequest) {
  const { password } = await req.json()
  const adminSecret = process.env.ADMIN_SECRET

  const isDev = process.env.NODE_ENV === 'development'
  if (!isDev && (!adminSecret || !password || !timingSafeEqual(password, adminSecret))) {
    return NextResponse.json({ error: 'Invalid password' }, { status: 401 })
  }

  const sessionToken = adminSecret ?? 'dev'
  const res = NextResponse.json({ ok: true })
  res.cookies.set(COOKIE_NAME, sessionToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: COOKIE_MAX_AGE,
    path: '/',
  })
  return res
}
