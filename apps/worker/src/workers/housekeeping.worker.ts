import { Worker, type Job } from 'bullmq'
import { connection, normalizeProductIds, upsertGroups, wireGroupIds, regroupStep, hideProducts } from '@shoetopia/jobs'

type HousekeepingJob =
  | { type: 'normalize'; programId?: number }
  | { type: 'regroup'; runStartedAt: string }
  | { type: 'hide-products' }

export const housekeepingWorker = new Worker<HousekeepingJob>(
  'housekeeping',
  async (job: Job<HousekeepingJob>) => {
    const { type } = job.data
    console.log(`[housekeeping] processing: ${type}`)

    switch (type) {
      case 'normalize':
        return normalizeProductIds((job.data as { type: string; programId?: number }).programId)
      case 'regroup': {
        const { runStartedAt } = job.data as { type: string; runStartedAt: string }
        await upsertGroups(runStartedAt)
        await wireGroupIds(runStartedAt)
        await regroupStep(runStartedAt)
        return
      }
      case 'hide-products':
        return hideProducts()
      default:
        throw new Error(`Unknown housekeeping job type: ${(job.data as any).type}`)
    }
  },
  { connection, concurrency: 1 },
)

housekeepingWorker.on('error', (err) => console.error('[housekeeping worker] error:', err))
