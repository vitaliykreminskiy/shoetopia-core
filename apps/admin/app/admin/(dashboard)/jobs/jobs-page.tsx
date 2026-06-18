"use client"

import { useState, useEffect, useCallback } from "react"
import { toast } from "sonner"
import type { JobsData, JobsStats } from "./types"
import { JobsStatsBar } from "./jobs-stats-bar"
import { RunningJobsList } from "./running-jobs-list"
import { WaitingJobsList } from "./waiting-jobs-list"
import { FailedJobsList } from "./failed-jobs-list"
import { CompletedJobsList } from "./completed-jobs-list"

const callAction = async (endpoint: string, body: Record<string, string>) => {
  const res = await fetch(`/api/admin/jobs/${endpoint}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  })
  if (!res.ok) throw new Error(`${endpoint} failed: ${res.status}`)
}

const computeStats = (data: JobsData): JobsStats => {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const todayTs = today.getTime()

  return data.queues.reduce<JobsStats>(
    (acc, q) => ({
      active: acc.active + q.active.length,
      waiting: acc.waiting + q.waitingCount,
      failed: acc.failed + q.failed.length,
      completedToday: acc.completedToday + q.completed.filter(
        j => j.finishedOn !== null && j.finishedOn >= todayTs
      ).length,
    }),
    { active: 0, waiting: 0, failed: 0, completedToday: 0 }
  )
}

export const JobsPage = () => {
  const [data, setData] = useState<JobsData | null>(null)
  const [loading, setLoading] = useState(false)

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch("/api/admin/jobs")
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      setData(await res.json())
    } catch (e) {
      toast.error(e instanceof Error ? e.message : String(e))
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    load()
  }, [load])

  // Auto-refresh every 5s while there are active jobs
  useEffect(() => {
    if (!data) return
    const hasActive = data.queues.some(q => q.active.length > 0)
    if (!hasActive) return
    const id = setInterval(load, 5000)
    return () => clearInterval(id)
  }, [data, load])

  const handlePause = async (queue: string) => {
    await callAction("pause", { queue })
    await load()
  }

  const removeJob = async (jobId: string, queue: string) => {
    await callAction("remove", { jobId, queue })
    await load()
  }

  const handleCancel = removeJob
  const handleRemove = removeJob
  const handleDelete = removeJob

  const handleRetry = async (jobId: string, queue: string) => {
    await callAction("retry", { jobId, queue })
    await load()
  }

  if (!data && loading) {
    return (
      <div className="text-neutral-500 text-sm py-12 text-center">Loading jobs…</div>
    )
  }

  if (!data) return null

  const stats = computeStats(data)
  const allCompleted = data.queues.flatMap(q => q.completed)
    .sort((a, b) => (b.finishedOn ?? 0) - (a.finishedOn ?? 0))
    .slice(0, 20)

  return (
    <div className="space-y-6">
      <JobsStatsBar stats={stats} onRefresh={load} refreshing={loading} />

      {data.queues.filter(q => q.active.length > 0).map(q => (
        <RunningJobsList
          key={`running-${q.name}`}
          jobs={q.active}
          queueName={q.name}
          onPause={handlePause}
          onCancel={handleCancel}
        />
      ))}

      {data.queues.filter(q => q.waitingCount > 0).map(q => (
        <WaitingJobsList
          key={`waiting-${q.name}`}
          jobs={q.waiting}
          totalCount={q.waitingCount}
          queueName={q.name}
          onRemove={handleRemove}
        />
      ))}

      {data.queues.filter(q => q.failed.length > 0).map(q => (
        <FailedJobsList
          key={`failed-${q.name}`}
          jobs={q.failed}
          queueName={q.name}
          onRetry={handleRetry}
          onDelete={handleDelete}
        />
      ))}

      <CompletedJobsList jobs={allCompleted} />
    </div>
  )
}
