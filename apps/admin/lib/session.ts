// Session token wire format: `base64url(JSON payload).base64url(HMAC-SHA256 of the payload segment)`
// where the payload is `{ exp: <ms epoch> }`.

export const COOKIE_NAME = 'admin_session'
export const SESSION_TTL_MS = 8 * 60 * 60 * 1000 // 8 hours

const DEV_FALLBACK_KEY = 'dev-insecure-secret'
const encoder = new TextEncoder()

export const getSigningKey = (): string | null => {
  // Ordering is security-load-bearing: in production a missing ADMIN_SECRET MUST
  // return null (fail closed) — never fall back to the dev key.
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
