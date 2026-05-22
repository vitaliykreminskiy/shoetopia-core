import type { JobsStats } from "./types"

interface Props {
  stats: JobsStats
  onRefresh: () => void
  refreshing: boolean
}

export const JobsStatsBar = ({ stats, onRefresh, refreshing }: Props) => (
  <div className="flex gap-3 items-center">
    <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-4 flex-1">
      <div className="text-neutral-400 text-xs uppercase tracking-widest mb-1">Active</div>
      <div className="flex items-center gap-2">
        <span className="text-white text-2xl font-bold">{stats.active}</span>
        {stats.active > 0 && (
          <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_6px_#34d399] animate-pulse" />
        )}
      </div>
    </div>
    <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-4 flex-1">
      <div className="text-neutral-400 text-xs uppercase tracking-widest mb-1">Waiting</div>
      <div className="text-white text-2xl font-bold">{stats.waiting}</div>
    </div>
    <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-4 flex-1">
      <div className="text-neutral-400 text-xs uppercase tracking-widest mb-1">Failed</div>
      <div className={`text-2xl font-bold ${stats.failed > 0 ? "text-red-400" : "text-white"}`}>
        {stats.failed}
      </div>
    </div>
    <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-4 flex-1">
      <div className="text-neutral-400 text-xs uppercase tracking-widest mb-1">Completed today</div>
      <div className="text-neutral-400 text-2xl font-bold">{stats.completedToday}</div>
    </div>
    <button
      onClick={onRefresh}
      disabled={refreshing}
      className="bg-neutral-800 hover:bg-neutral-700 disabled:opacity-50 text-neutral-300 px-4 py-2 rounded-lg text-sm font-medium transition-colors shrink-0"
    >
      {refreshing ? "..." : "↻ Refresh"}
    </button>
  </div>
)
