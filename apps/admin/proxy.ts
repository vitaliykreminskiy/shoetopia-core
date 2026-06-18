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
