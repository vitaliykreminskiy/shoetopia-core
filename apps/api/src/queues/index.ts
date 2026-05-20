import { Queue } from 'bullmq'
import { connection } from './connection.js'

export const feedImportQueue = new Queue('feed-import', { connection })
export const housekeepingQueue = new Queue('housekeeping', { connection })
export const syncQueue = new Queue('sync', { connection })
