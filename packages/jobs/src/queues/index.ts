import { Queue, QueueEvents } from 'bullmq'
import { connection } from './connection.js'

export const feedImportQueue = new Queue('feed-import', { connection })
export const feedImportQueueEvents = new QueueEvents('feed-import', { connection })
export const housekeepingQueue = new Queue('housekeeping', { connection })
export const syncQueue = new Queue('sync', { connection })
