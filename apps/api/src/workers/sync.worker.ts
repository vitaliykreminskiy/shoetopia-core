import { Worker, QueueEvents, type Job } from 'bullmq'
import { connection } from '../queues/connection.js'
import { feedImportQueue } from '../queues/index.js'
import { prisma } from '@shoetopia/db'
import {
  hideStaleProducts,
  upsertGroups,
  wireGroupIds,
  regroupStep,
  hideProducts,
  writeSyncLog,
} from '../lib/shared-steps.js'
import type { FeedImportJobResult } from './feed-import.worker.js'

export interface SyncJobData {
  runId: string
  runStartedAt: string
}

export async function runDailySync(data: SyncJobData): Promise<void> {
  const { runId, runStartedAt } = data
  const feeds = await prisma.feed.findMany({
    where: { isActive: true },
    select: { programId: true, programName: true },
  })

  console.log(`[sync] Run ${runId}: launching ${feeds.length} feed imports`)

  const jobs = await Promise.all(
    feeds.map(feed =>
      feedImportQueue.add(
        'import-feed',
        { feedId: feed.programId, feedName: feed.programName, runStartedAt },
        { attempts: 3, backoff: { type: 'exponential', delay: 10_000 } },
      )
    )
  )

  const queueEvents = new QueueEvents('feed-import', { connection })
  const results: FeedImportJobResult[] = []

  for (const job of jobs) {
    try {
      const result = await job.waitUntilFinished(queueEvents, 30 * 60 * 1000)
      results.push(result)
    } catch (err: any) {
      console.error(`[sync] Job ${job.id} failed: ${err.message}`)
      results.push({ feedId: 0, feedName: 'unknown', imported: 0, errors: [err.message] })
    }
  }

  await queueEvents.close()

  const syncedProgramIds = results.map(r => r.feedId).filter(Boolean)
  const importedCount    = results.reduce((sum, r) => sum + r.imported, 0)
  const errors           = results.flatMap(r => r.errors)

  console.log(`[sync] All feeds done: ${importedCount} imported, ${errors.length} errors`)

  const staleHidden = await hideStaleProducts(syncedProgramIds)
  await upsertGroups(runStartedAt)
  await wireGroupIds(runStartedAt)
  await regroupStep(runStartedAt)
  await hideProducts()

  await writeSyncLog({ runId, runStartedAt, syncedCount: syncedProgramIds.length, importedCount, staleHidden, errors })
  console.log(`[sync] Run ${runId} complete`)
}

export const syncWorker = new Worker<SyncJobData>(
  'sync',
  async (job: Job<SyncJobData>) => runDailySync(job.data),
  { connection, concurrency: 1 },
)

syncWorker.on('error', (err) => console.error('[sync worker] error:', err))
