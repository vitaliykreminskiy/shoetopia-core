# Job Logging Design

**Date:** 2026-06-16  
**Scope:** Add per-step logging to BullMQ workers and expose logs on the Admin Jobs tab with real-time view for active jobs.

---

## Goal

Every job in the `feed-import`, `sync`, and `housekeeping` queues should emit structured step logs. Admins can expand any job row in the Jobs tab to see those logs. Active jobs update in real time (polling).

---

## Storage

Use BullMQ's built-in `job.log(message)` / `job.logs()` API. Logs are stored in Redis per-job, alongside the job record itself. No separate DB table needed.

**Retention:** Logs live as long as the job record stays in Redis (completed jobs are kept by BullMQ's default `removeOnComplete` / `removeOnFail` settings). This is acceptable for "basic logging" — no historical persistence required.

---

## Worker Changes

Each worker processor receives the `job` object and calls `job.log(message)` at each phase. Messages are plain strings, prefixed with the phase name.

### feed-import worker

Current: `processFeedImportJob(data)` — no access to `job`.  
Change: signature becomes `processFeedImportJob(job: Job<FeedImportJobData>)`, data read from `job.data`.

Steps logged:
1. `fetching CSV from FlexOffers`
2. `CSV fetched — parsing rows`
3. `upserting N products`
4. `normalizing product IDs`
5. `fixing gender for new products`
6. `promoting products`
7. `done — N imported, N errors` (or `FAILED: <reason>` on error)

### sync worker

Steps logged:
1. `launching N feed imports`
2. `all feeds done — N imported, N errors`
3. `hiding stale products`
4. `upserting groups`
5. `wiring group IDs`
6. `regroup step`
7. `hiding products`
8. `writing sync log`
9. `run complete`

### housekeeping worker

Steps logged per type:
- `normalize`: `normalizing product IDs (programId: N)` → `done`
- `regroup`: `upserting groups` → `wiring group IDs` → `regroup step` → `done`
- `hide-products`: `hiding products` → `done`

---

## API

New endpoint added to the existing `jobs.ts` route:

```
GET /api/admin/jobs/:queue/:jobId/logs
```

- Auth: `requireApiSecret`
- Fetches the job from the specified queue, calls `job.logs(0, 200)`
- Returns `{ logs: string[] }`
- Returns 404 if job not found

---

## UI

### New component: `job-logs.tsx`

Props:
```ts
interface JobLogsProps {
  jobId: string
  queue: string
  active: boolean  // true = poll every 2s, false = one-shot fetch on mount
}
```

Behaviour:
- Fetches `GET /api/admin/jobs/:queue/:jobId/logs` on mount
- If `active === true`: polls every 2s via `setInterval`, clears interval on unmount
- Renders each log line as a monospace row with a dim index number
- Shows a subtle pulse indicator while polling

### Changes to existing components

**`completed-jobs-list.tsx`**  
- Add expand toggle (▶ / ▼) button per row  
- When expanded, render `<JobLogs jobId={job.id} queue={queueName} active={false} />`  
- `queueName` needs to be passed down — add to `CompletedJob` type and API response

**`running-jobs-list.tsx`**  
- Same expand toggle  
- Render `<JobLogs jobId={job.id} queue={queueName} active={true} />`

**`failed-jobs-list.tsx`**  
- Same expand toggle  
- Render `<JobLogs jobId={job.id} queue={queueName} active={false} />`

### Type changes (`types.ts`)

Add `queue: string` to `ActiveJob`, `CompletedJob`, and `FailedJob` so each component knows which queue a job belongs to when fetching logs.

---

## Data Flow

```
Worker executes job
  └─ job.log("step message")  →  Redis (per-job log list)

Admin opens Jobs tab
  └─ GET /api/admin/jobs  →  queue state (no logs)

Admin clicks ▶ on a job row
  └─ GET /api/admin/jobs/:queue/:jobId/logs  →  { logs: string[] }
       └─ JobLogs renders lines
            └─ if active: polls every 2s until component unmounts
```

---

## Out of Scope

- Persistent log storage in Postgres
- Log search or filtering
- Log levels (info / warn / error distinction in UI)
- Streaming via WebSocket or SSE
