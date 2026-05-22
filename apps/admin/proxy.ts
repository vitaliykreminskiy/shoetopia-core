import { NextRequest, NextResponse } from 'next/server'

export const proxy = (request: NextRequest) => {
  const apiSecret = process.env.API_SECRET
  if (!apiSecret) return NextResponse.next()

  const headers = new Headers(request.headers)
  headers.set('Authorization', `Bearer ${apiSecret}`)

  return NextResponse.next({ request: { headers } })
}

export const config = {
  matcher: '/api/:path*',
}
