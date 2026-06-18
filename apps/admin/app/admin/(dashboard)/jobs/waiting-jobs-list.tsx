import type { WaitingJob } from "./types"

interface Props {
  jobs: WaitingJob[]
  totalCount: number
  queueName: string
  onRemove: (jobId: string, queue: string) => Promise<void>
}

const jobLabel = (job: WaitingJob): string =>
  job.data?.feedName ?? job.data?.programName ?? job.name

export const WaitingJobsList = ({ jobs, totalCount, queueName, onRemove }: Props) => {
  if (totalCount === 0) return null

  return (
    <div>
      <div className="text-neutral-400 text-xs uppercase tracking-widest mb-2">
        Waiting · {totalCount}
      </div>
      <div className="bg-neutral-900 border border-neutral-800 rounded-lg overflow-hidden">
        {jobs.map((job, i) => (
          <div
            key={job.id}
            className={`px-4 py-3 flex items-center gap-3 ${i > 0 ? "border-t border-neutral-800" : ""}`}
          >
            <span className="text-neutral-300">{jobLabel(job)}</span>
            <span className="text-neutral-600 text-xs">{queueName}</span>
            <button
              onClick={() => onRemove(job.id, queueName)}
              className="ml-auto bg-neutral-800 border border-neutral-700 hover:border-red-800 text-red-400 hover:text-red-300 px-3 py-1 rounded text-xs transition-colors"
            >
              ✕ Remove
            </button>
          </div>
        ))}
        {totalCount > jobs.length && (
          <div className="px-4 py-2 text-neutral-600 text-xs border-t border-neutral-800">
            +{totalCount - jobs.length} more in queue
          </div>
        )}
      </div>
    </div>
  )
}
