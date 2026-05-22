import type { CompletedJob } from "./types"

interface Props {
  jobs: CompletedJob[]
}

const jobLabel = (job: CompletedJob): string =>
  job.data?.feedName ?? job.data?.programName ?? job.name

const formatTime = (ts: number | null): string => {
  if (!ts) return "—"
  return new Date(ts).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
}

const importedCount = (job: CompletedJob): string => {
  const rv = job.returnvalue
  if (!rv) return ""
  if (typeof rv.imported === "number") return `${rv.imported} imported`
  return ""
}

export const CompletedJobsList = ({ jobs }: Props) => {
  if (jobs.length === 0) return null

  return (
    <div>
      <div className="text-neutral-400 text-xs uppercase tracking-widest mb-2">
        Completed (last {jobs.length})
      </div>
      <div className="bg-neutral-900 border border-neutral-800 rounded-lg overflow-hidden">
        {jobs.map((job, i) => (
          <div
            key={job.id}
            className={`px-4 py-3 flex items-center gap-3 text-sm ${i > 0 ? "border-t border-neutral-800" : ""}`}
          >
            <span className="text-neutral-500 text-xs">✓</span>
            <span className="text-neutral-400">{jobLabel(job)}</span>
            <span className="text-neutral-600 text-xs ml-auto">{importedCount(job)}</span>
            <span className="text-neutral-600 text-xs">{formatTime(job.finishedOn)}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
