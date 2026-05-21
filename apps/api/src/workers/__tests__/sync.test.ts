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

vi.mock('../../queues/index.js', () => ({
  feedImportQueue: {
    add: vi.fn().mockResolvedValue({
      id: 'job-1',
      waitUntilFinished: vi.fn().mockResolvedValue({ feedId: 1, feedName: 'Nike', imported: 10, errors: [] }),
    }),
  },
  housekeepingQueue: {
    add: vi.fn().mockResolvedValue({ waitUntilFinished: vi.fn().mockResolvedValue(null) }),
  },
  syncQueue: {},
}))

vi.mock('../../lib/shared-steps.js', () => ({
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

describe('runDailySync', () => {
  beforeEach(() => { vi.clearAllMocks() })

  it('enqueues import jobs for all feeds', async () => {
    const { feedImportQueue } = await import('../../queues/index.js')
    await runDailySync({ runId: 'test-run', runStartedAt: new Date().toISOString() })
    expect(feedImportQueue.add).toHaveBeenCalledWith(
      'import-feed',
      expect.objectContaining({ feedId: 1, feedName: 'Nike' }),
      expect.any(Object),
    )
  })
})
