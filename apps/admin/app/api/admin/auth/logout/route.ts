import { NextResponse } from 'next/server'
import { COOKIE_NAME } from '@/lib/session'

export async function POST() {
  const res = NextResponse.json({ ok: true })
  res.cookies.set(COOKIE_NAME, '', {
    httpOnly: true,
    // Must mirror the login cookie's Secure flag so the browser clears it.
    secure: process.env.COOKIE_SECURE === 'true',
    sameSite: 'lax',
    maxAge: 0,
    path: '/',
  })
  return res
}
