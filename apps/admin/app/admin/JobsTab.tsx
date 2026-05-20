"use client"
import { useState, useEffect } from "react"

export function JobsTab() {
  const [jobs, setJobs] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const load = async () => {
    setLoading(true)
    try {
      const res = await fetch("/api/admin/jobs")
      setJobs(await res.json())
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [])

  if (loading) return <p>Loading...</p>
  if (!jobs) return null

  const { feedImport } = jobs
  return (
    <div>
      <button onClick={load}>Refresh</button>
      <h3>Active ({feedImport?.active?.length ?? 0})</h3>
      <ul>
        {feedImport?.active?.map((j: any) => (
          <li key={j.id}>{j.data?.feedName} — {j.progress}%</li>
        ))}
      </ul>
      <h3>Failed ({feedImport?.failed?.length ?? 0})</h3>
      <ul>
        {feedImport?.failed?.map((j: any) => (
          <li key={j.id}>
            {j.data?.feedName}: {j.failedReason}
            {" "}
            <button onClick={async () => {
              await fetch("/api/admin/jobs/retry", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ jobId: j.id, queue: "feed-import" }),
              })
              load()
            }}>Retry</button>
          </li>
        ))}
      </ul>
      <p>
        <a href="/bull" target="_blank" rel="noopener noreferrer">
          Open Bull Board →
        </a>
      </p>
    </div>
  )
}
