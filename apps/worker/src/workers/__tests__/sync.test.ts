import { describe, it, expect, vi, beforeEach } from 'vitest'

vi.mock('@shoetopia/db', () => ({
  prisma: {
    feed: {
      findMany: vi.fn().mockResolvedValue([
        { programId: 1, programName: 'Nike' },
      ]),
    },
  },
}))

vi.mock('@shoetopia/jobs', () => ({
  connection: {},
  feedImportQueue: {
    add: vi.fn().mockResolvedValue({
      id: 'job-1',
      waitUntilFinished: vi.fn().mockResolvedValue({ feedId: 1, feedName: 'Nike', imported: 10, errors: [] }),
    }),
  },
  hideStaleProducts: vi.fn().mockResolvedValue(0),
  upsertGroups: vi.fn().mockResolvedValue(0),
  wireGroupIds: vi.fn().mockResolvedValue(0),
  regroupStep: vi.fn().mockResolvedValue(0),
  hideProducts: vi.fn().mockResolvedValue(0),
  writeSyncLog: vi.fn().mockResolvedValue(undefined),
}))

vi.mock('bullmq', async (importOriginal) => {
  const actual = await importOriginal<typeof import('bullmq')>()
  return {
    ...actual,
    QueueEvents: vi.fn().mockImplementation(() => ({
      close: vi.fn().mockResolvedValue(undefined),
    })),
  }
})

import { runDailySync } from '../sync.worker.js'
import type { Job } from 'bullmq'
import type { SyncJobData } from '../sync.worker.js'

const makeJob = (data: SyncJobData) =>
  ({ data, log: vi.fn().mockResolvedValue(undefined) }) as unknown as Job<SyncJobData>

describe('runDailySync', () => {
  beforeEach(() => { vi.clearAllMocks() })

  it('enqueues import jobs for all feeds', async () => {
    const { feedImportQueue } = await import('@shoetopia/jobs')
    const job = makeJob({ runId: 'test-run', runStartedAt: new Date().toISOString() })
    await runDailySync(job)
    expect(feedImportQueue.add).toHaveBeenCalledWith(
      'import-feed',
      expect.objectContaining({ feedId: 1, feedName: 'Nike' }),
      expect.any(Object),
    )
    expect(job.log).toHaveBeenCalled()
  })
})
