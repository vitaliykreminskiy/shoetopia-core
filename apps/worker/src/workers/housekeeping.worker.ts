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
      case 'normalize': {
        const { programId } = job.data as { type: string; programId?: number }
        await job.log(`normalizing product IDs${programId ? ` (programId: ${programId})` : ''}`)
        await normalizeProductIds(programId)
        await job.log(`done`)
        return
      }
      case 'regroup': {
        const { runStartedAt } = job.data as { type: string; runStartedAt: string }
        await job.log(`upserting groups`)
        await upsertGroups(runStartedAt)
        await job.log(`wiring group IDs`)
        await wireGroupIds(runStartedAt)
        await job.log(`regroup step`)
        await regroupStep(runStartedAt)
        await job.log(`done`)
        return
      }
      case 'hide-products':
        await job.log(`hiding products`)
        await hideProducts()
        await job.log(`done`)
        return
      default:
        throw new Error(`Unknown housekeeping job type: ${(job.data as any).type}`)
    }
  },
  { connection, concurrency: 1 },
)

housekeepingWorker.on('error', (err) => console.error('[housekeeping worker] error:', err))
