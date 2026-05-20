import { Worker, type Job } from 'bullmq'
import { connection } from '../queues/connection.js'
import { importFeedById } from '../lib/import-feed.js'
import {
  normalizeProductIds,
  fixGenderNewProducts,
  promoteProducts,
} from '../lib/shared-steps.js'

export interface FeedImportJobData {
  feedId: number
  feedName: string
  runStartedAt: string
}

export interface FeedImportJobResult {
  feedId: number
  feedName: string
  imported: number
  errors: string[]
}

const FATAL_PATTERNS: Array<string | RegExp> = [
  'Feed not found',
  'Failed to parse CSV',
  /Failed to fetch CSV: 4\d\d/,
]

function isFatal(message: string): boolean {
  return FATAL_PATTERNS.some(p =>
    typeof p === 'string' ? message.includes(p) : p.test(message)
  )
}

export async function processFeedImportJob(
  data: FeedImportJobData,
): Promise<FeedImportJobResult> {
  const { feedId, feedName, runStartedAt } = data

  console.log(`[feed-import] ${feedName} (${feedId}): starting`)

  try {
    const result = await importFeedById(feedId)
    console.log(`[feed-import] ${feedName}: ${result.imported} imported`)

    await normalizeProductIds(feedId)
    await fixGenderNewProducts(runStartedAt, feedId)
    await promoteProducts(feedId)

    return { feedId, feedName, imported: result.imported, errors: result.errors }
  } catch (err: any) {
    const msg: string = err?.message ?? 'Unknown error'
    console.error(`[feed-import] ${feedName} FAILED: ${msg}`)

    if (isFatal(msg)) {
      throw new Error(`FATAL: [${feedName}] ${msg}`)
    }

    throw err
  }
}

export const feedImportWorker = new Worker<FeedImportJobData, FeedImportJobResult>(
  'feed-import',
  async (job: Job<FeedImportJobData>) => processFeedImportJob(job.data),
  {
    connection,
    concurrency: 5,
  },
)

feedImportWorker.on('failed', (job, err) => {
  if (err.message.startsWith('FATAL:') && job) {
    try { job.discard() } catch { /* ignore */ }
  }
})

feedImportWorker.on('error', (err) => {
  console.error('[feed-import worker] error:', err)
})
