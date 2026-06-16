export interface ActiveJob {
  id: string
  name: string
  queue: string
  data: Record<string, any>
  progress: number
  processedOn: number | null
}

export interface WaitingJob {
  id: string
  name: string
  data: Record<string, any>
}

export interface CompletedJob {
  id: string
  name: string
  queue: string
  data: Record<string, any>
  finishedOn: number | null
  returnvalue: any
}

export interface FailedJob {
  id: string
  name: string
  queue: string
  data: Record<string, any>
  failedReason: string
  attemptsMade: number
}

export interface QueueData {
  name: string
  active: ActiveJob[]
  waitingCount: number
  waiting: WaitingJob[]
  completed: CompletedJob[]
  failed: FailedJob[]
}

export interface JobsData {
  queues: QueueData[]
}

export interface JobsStats {
  active: number
  waiting: number
  failed: number
  completedToday: number
}
