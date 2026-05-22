import type { FailedJob } from "./types"

interface Props {
  jobs: FailedJob[]
  queueName: string
  onRetry: (jobId: string, queue: string) => Promise<void>
  onDelete: (jobId: string, queue: string) => Promise<void>
}

const jobLabel = (job: FailedJob): string =>
  job.data?.feedName ?? job.data?.programName ?? job.name

export const FailedJobsList = ({ jobs, queueName, onRetry, onDelete }: Props) => {
  if (jobs.length === 0) return null

  return (
    <div>
      <div className="text-neutral-400 text-xs uppercase tracking-widest mb-2">
        Failed · {jobs.length}
      </div>
      <div className="bg-neutral-900 border border-red-900/40 rounded-lg overflow-hidden">
        {jobs.map((job, i) => (
          <div
            key={job.id}
            className={`px-4 py-3 flex items-center gap-3 ${i > 0 ? "border-t border-neutral-800" : ""}`}
          >
            <div className="flex-1 min-w-0">
              <div className="text-red-400 font-medium">{jobLabel(job)}</div>
              <div className="text-neutral-500 text-xs truncate mt-0.5">{job.failedReason}</div>
            </div>
            <span className="text-neutral-600 text-xs shrink-0">{job.attemptsMade} attempt{job.attemptsMade !== 1 ? "s" : ""}</span>
            <button
              onClick={() => onRetry(job.id, queueName)}
              className="bg-neutral-800 border border-neutral-700 hover:border-emerald-700 text-emerald-400 hover:text-emerald-300 px-3 py-1 rounded text-xs transition-colors shrink-0"
            >
              ↻ Retry
            </button>
            <button
              onClick={() => onDelete(job.id, queueName)}
              className="bg-neutral-800 border border-neutral-700 hover:border-red-800 text-red-400 hover:text-red-300 px-3 py-1 rounded text-xs transition-colors shrink-0"
            >
              ✕ Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
