import { describe, it, expect, vi, beforeEach } from 'vitest'
import { gzipSync } from 'node:zlib'
import { Readable } from 'node:stream'

vi.mock('@shoetopia/db', () => ({
  prisma: {
    feed: {
      findUnique: vi.fn(),
    },
  },
  rawQuery: vi.fn(),
}))

import { prisma, rawQuery } from '@shoetopia/db'
import { importFeedById } from '../import-feed.js'

const makeFeed = () => ({
  programId: 1,
  programName: 'TestBrand',
  httpsLink: 'https://example.com/feed.csv.gz',
  country: 'US',
  region: 'na',
})

const makeCsvGz = (rows: Record<string, string>[]) => {
  const header = Object.keys(rows[0]).join(',')
  const lines = rows.map(r => Object.values(r).map(v => `"${v}"`).join(','))
  const csv = [header, ...lines].join('\n')
  return gzipSync(Buffer.from(csv, 'utf-8'))
}

const makeResponse = (gzBuffer: Buffer) => ({
  ok: true,
  status: 200,
  body: Readable.toWeb(Readable.from([gzBuffer])),
})

const makeRow = (overrides: Partial<Record<string, string>> = {}) => ({
  ProductName: 'Air Max 90',
  Description: 'Running shoe',
  BuyURL: 'https://example.com/p/1',
  ImageURL: 'https://example.com/img/1.jpg',
  RetailPrice: '120',
  SalePrice: '100',
  Availability: 'In Stock',
  Brand: 'Nike',
  Category: 'Shoes',
  SKU: 'SKU-001',
  Color: 'Black',
  Size: '10',
  Gender: 'Mens',
  PriceCurrency: 'USD',
  ...overrides,
})

describe('importFeedById', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.mocked(prisma.feed.findUnique).mockResolvedValue(makeFeed() as any)
    vi.mocked(rawQuery).mockResolvedValue(undefined as any)
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(makeResponse(makeCsvGz([makeRow()]))))
  })

  it('returns imported count equal to valid rows', async () => {
    const rows = Array.from({ length: 3 }, (_, i) => makeRow({ SKU: `SKU-${i}` }))
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(makeResponse(makeCsvGz(rows))))

    const result = await importFeedById(1)

    expect(result.imported).toBe(3)
    expect(result.errors).toHaveLength(0)
  })

  it('throws when feed not found', async () => {
    vi.mocked(prisma.feed.findUnique).mockResolvedValue(null)

    await expect(importFeedById(1)).rejects.toThrow('Feed not found')
  })

  it('throws when fetch fails', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false, status: 404, statusText: 'Not Found' }))

    await expect(importFeedById(1)).rejects.toThrow('Failed to fetch CSV: 404')
  })

  it('captures batch insert errors without aborting', async () => {
    const rows = Array.from({ length: 3 }, (_, i) => makeRow({ SKU: `SKU-${i}` }))
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(makeResponse(makeCsvGz(rows))))
    vi.mocked(rawQuery).mockRejectedValue(new Error('DB timeout'))

    const result = await importFeedById(1)

    expect(result.imported).toBe(0)
    expect(result.errors.length).toBeGreaterThan(0)
  })
})
