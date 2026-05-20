import { describe, it, expect, vi, beforeEach } from 'vitest'

vi.mock('../../lib/import-feed.js', () => ({
  importFeedById: vi.fn(),
}))

vi.mock('../../lib/shared-steps.js', () => ({
  normalizeProductIds: vi.fn().mockResolvedValue(0),
  fixGenderNewProducts: vi.fn().mockResolvedValue(0),
  promoteProducts: vi.fn().mockResolvedValue(0),
}))

import { importFeedById } from '../../lib/import-feed.js'
import { processFeedImportJob } from '../feed-import.worker.js'

describe('processFeedImportJob', () => {
  beforeEach(() => { vi.clearAllMocks() })

  it('calls importFeedById and post-processing steps', async () => {
    vi.mocked(importFeedById).mockResolvedValue({
      feed: 'Nike', feedId: 1, imported: 50, programId: 1, errors: [],
    } as any)

    const result = await processFeedImportJob({ feedId: 1, feedName: 'Nike', runStartedAt: '2026-05-20T06:45:00Z' })

    expect(importFeedById).toHaveBeenCalledWith(1)
    expect(result.imported).toBe(50)
  })

  it('throws on importFeedById failure so BullMQ retries', async () => {
    vi.mocked(importFeedById).mockRejectedValue(new Error('Network timeout'))

    await expect(
      processFeedImportJob({ feedId: 1, feedName: 'Nike', runStartedAt: '2026-05-20T06:45:00Z' })
    ).rejects.toThrow('Network timeout')
  })

  it('marks job as fatal for 404 errors', async () => {
    vi.mocked(importFeedById).mockRejectedValue(new Error('Failed to fetch CSV: 404 Not Found'))

    await expect(
      processFeedImportJob({ feedId: 1, feedName: 'Nike', runStartedAt: '2026-05-20T06:45:00Z' })
    ).rejects.toThrow(/FATAL:/)
  })
})
