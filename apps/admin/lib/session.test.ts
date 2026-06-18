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
