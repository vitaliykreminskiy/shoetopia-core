import { describe, it, expect, vi, beforeEach } from 'vitest'

vi.mock('@shoetopia/jobs', () => ({
  importFeedById: vi.fn(),
  normalizeProductIds: vi.fn().mockResolvedValue(0),
  fixGenderNewProducts: vi.fn().mockResolvedValue(0),
  promoteProducts: vi.fn().mockResolvedValue(0),
  connection: {},
}))

import { importFeedById } from '@shoetopia/jobs'
import { processFeedImportJob } from '../feed-import.worker.js'
import type { Job } from 'bullmq'
import type { FeedImportJobData } from '../feed-import.worker.js'

const makeJob = (data: FeedImportJobData) =>
  ({ data, log: vi.fn().mockResolvedValue(undefined) }) as unknown as Job<FeedImportJobData>

describe('processFeedImportJob', () => {
  beforeEach(() => { vi.clearAllMocks() })

  it('calls importFeedById and post-processing steps', async () => {
    vi.mocked(importFeedById).mockResolvedValue({
      feed: 'Nike', feedId: 1, imported: 50, programId: 1, errors: [],
    } as any)

    const job = makeJob({ feedId: 1, feedName: 'Nike', runStartedAt: '2026-05-20T06:45:00Z' })
    const result = await processFeedImportJob(job)

    expect(importFeedById).toHaveBeenCalledWith(1)
    expect(result.imported).toBe(50)
    expect(job.log).toHaveBeenCalled()
  })

  it('throws on importFeedById failure so BullMQ retries', async () => {
    vi.mocked(importFeedById).mockRejectedValue(new Error('Network timeout'))

    const job = makeJob({ feedId: 1, feedName: 'Nike', runStartedAt: '2026-05-20T06:45:00Z' })
    await expect(processFeedImportJob(job)).rejects.toThrow('Network timeout')
  })

  it('marks job as fatal for 404 errors', async () => {
    vi.mocked(importFeedById).mockRejectedValue(new Error('Failed to fetch CSV: 404 Not Found'))

    const job = makeJob({ feedId: 1, feedName: 'Nike', runStartedAt: '2026-05-20T06:45:00Z' })
    await expect(processFeedImportJob(job)).rejects.toThrow(/FATAL:/)
  })
})
