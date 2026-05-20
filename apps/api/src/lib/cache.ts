import { Redis } from 'ioredis'

let redis: Redis | null = null

if (process.env.REDIS_URL) {
  try {
    redis = new Redis(process.env.REDIS_URL)
    redis.on('error', (err) => console.error('[cache] Redis error:', err))
  } catch (e) {
    console.error('[cache] Redis initialization failed:', e)
  }
}

export const CACHE_TTL = {
  SHORT: 120,
  MEDIUM: 900,
  LONG: 1800,
  VERY_LONG: 7200,
}

const inFlightFetches = new Map<string, Promise<any>>()

export async function cached<T>(
  key: string,
  fetcher: () => Promise<T>,
  ttl: number = CACHE_TTL.MEDIUM
): Promise<T> {
  if (!redis) return fetcher()

  try {
    const raw = await redis.get(key)
    if (raw !== null) return JSON.parse(raw) as T
  } catch {
    // cache read failed — fall through to fetch
  }

  const existingFetch = inFlightFetches.get(key)
  if (existingFetch) return existingFetch

  const fetchPromise = (async () => {
    try {
      const freshData = await fetcher()
      redis!.setex(key, ttl, JSON.stringify(freshData)).catch(() => {})
      return freshData
    } catch (error) {
      console.error(`[cache] Fetch error for ${key}:`, error)
      return null as T
    } finally {
      inFlightFetches.delete(key)
    }
  })()

  inFlightFetches.set(key, fetchPromise)
  return fetchPromise
}

export async function invalidateCache(pattern: string): Promise<void> {
  if (!redis) return
  try {
    const keys = await redis.keys(pattern)
    if (keys.length > 0) await redis.del(...keys)
  } catch (e) {
    console.error('[cache] Cache invalidation error:', e)
  }
}

export async function getCachedMultiple<T>(keys: string[]): Promise<(T | null)[]> {
  if (!redis) return keys.map(() => null)
  try {
    const raws = await redis.mget(...keys)
    return raws.map(r => (r !== null ? JSON.parse(r) as T : null))
  } catch (e) {
    console.error('[cache] mget error:', e)
    return keys.map(() => null)
  }
}

export { redis }
