# Job Logging Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add per-step BullMQ job logging to all workers and expose an expandable log viewer on the Admin Jobs tab with real-time polling for active jobs.

**Architecture:** Workers call `job.log(message)` at each processing phase — BullMQ stores these strings in Redis per-job. A new API endpoint `GET /api/admin/jobs/:queue/:jobId/logs` reads them. The UI adds an expand toggle to each job row that renders a `JobLogs` component; active jobs poll every 2 seconds.

**Tech Stack:** BullMQ `job.log()` / `job.logs()`, Fastify, React, Tailwind CSS, Vitest

---

## File Map

**Modified:**
- `apps/worker/src/workers/feed-import.worker.ts` — accept `job` object, call `job.log()` per step
- `apps/worker/src/workers/sync.worker.ts` — accept `job` object, call `job.log()` per step
- `apps/worker/src/workers/housekeeping.worker.ts` — accept `job` object, call `job.log()` per step
- `apps/worker/src/workers/__tests__/feed-import.test.ts` — pass mock job with `log` fn
- `apps/worker/src/workers/__tests__/sync.test.ts` — pass mock job with `log` fn
- `apps/api/src/routes/admin/jobs.ts` — add `queue` field to job responses + new logs endpoint
- `apps/admin/app/admin/jobs/types.ts` — add `queue: string` to `ActiveJob`, `CompletedJob`, `FailedJob`
- `apps/admin/app/admin/jobs/running-jobs-list.tsx` — add expand toggle + `JobLogs`
- `apps/admin/app/admin/jobs/completed-jobs-list.tsx` — add expand toggle + `JobLogs`
- `apps/admin/app/admin/jobs/failed-jobs-list.tsx` — add expand toggle + `JobLogs`

**Created:**
- `apps/admin/app/admin/jobs/job-logs.tsx` — log display component with optional polling

---

### Task 1: Add `queue` field to types and API response

**Files:**
- Modify: `apps/admin/app/admin/jobs/types.ts`
- Modify: `apps/api/src/routes/admin/jobs.ts`

- [ ] **Step 1: Update types**

In `apps/admin/app/admin/jobs/types.ts`, add `queue: string` to `ActiveJob`, `CompletedJob`, and `FailedJob`:

```ts
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
```

- [ ] **Step 2: Add `queue` field to API job responses**

In `apps/api/src/routes/admin/jobs.ts`, add `queue: name` to each mapped job inside the `queues.map` callback. Replace the three existing map calls:

```ts
active: active.map(j => ({
  id: String(j.id),
  name: j.name,
  queue: name,
  data: j.data,
  progress: typeof j.progress === 'number' ? j.progress : 0,
  processedOn: j.processedOn ?? null,
})),
// waiting stays the same (no queue field needed)
completed: completed.map(j => ({
  id: String(j.id),
  name: j.name,
  queue: name,
  data: j.data,
  finishedOn: j.finishedOn ?? null,
  returnvalue: j.returnvalue,
})),
failed: failed.map(j => ({
  id: String(j.id),
  name: j.name,
  queue: name,
  data: j.data,
  failedReason: j.failedReason,
  attemptsMade: j.attemptsMade,
})),
```

- [ ] **Step 3: Commit**

```bash
git add apps/admin/app/admin/jobs/types.ts apps/api/src/routes/admin/jobs.ts
git commit -m "feat(jobs): add queue field to job API responses and types"
```

---

### Task 2: Add logs API endpoint

**Files:**
- Modify: `apps/api/src/routes/admin/jobs.ts`

- [ ] **Step 1: Add the logs endpoint**

Append this route inside `jobsRoute` in `apps/api/src/routes/admin/jobs.ts`, after the existing GET route:

```ts
fastify.get<{ Params: { queue: string; jobId: string } }>(
  '/api/admin/jobs/:queue/:jobId/logs',
  { preHandler: requireApiSecret },
  async (request, reply) => {
    const { queue, jobId } = request.params
    if (!['feed-import', 'housekeeping', 'sync'].includes(queue)) {
      return reply.code(400).send({ error: `Unknown queue: ${queue}` })
    }
    const q = queue === 'feed-import' ? feedImportQueue
             : queue === 'housekeeping' ? housekeepingQueue
             : syncQueue
    const job = await q.getJob(jobId)
    if (!job) return reply.code(404).send({ error: 'Job not found' })
    const { logs } = await job.logs(0, 200)
    return reply.send({ logs })
  }
)
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
cd apps/api && pnpm build 2>&1 | tail -5
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add apps/api/src/routes/admin/jobs.ts
git commit -m "feat(jobs): add GET /api/admin/jobs/:queue/:jobId/logs endpoint"
```

---

### Task 3: Update feed-import worker to log steps

**Files:**
- Modify: `apps/worker/src/workers/feed-import.worker.ts`
- Modify: `apps/worker/src/workers/__tests__/feed-import.test.ts`

- [ ] **Step 1: Update the test to pass a mock job object**

Replace the contents of `apps/worker/src/workers/__tests__/feed-import.test.ts`:

```ts
import { describe, it, expect, vi, beforeEach } from 'vitest'

vi.mock('@shoetopia/jobs', () => ({
  importFeedById: vi.fn(),
  normalizeProductIds: vi.fn().mockResolvedValue(0),
  fixGenderNewProducts: vi.fn().mockResolvedValue(0),
  promoteProducts: vi.fn().mockResolvedValue(0),
  connection: {},
}))

import { importFeedById } from '@shoetopia/jobs'
import { processFeedImportJob } from '../feed-import.worker.js'
import type { Job } from 'bullmq'
import type { FeedImportJobData } from '../feed-import.worker.js'

const makeJob = (data: FeedImportJobData) =>
  ({ data, log: vi.fn().mockResolvedValue(undefined) }) as unknown as Job<FeedImportJobData>

describe('processFeedImportJob', () => {
  beforeEach(() => { vi.clearAllMocks() })

  it('calls importFeedById and post-processing steps', async () => {
    vi.mocked(importFeedById).mockResolvedValue({
      feed: 'Nike', feedId: 1, imported: 50, programId: 1, errors: [],
    } as any)

    const job = makeJob({ feedId: 1, feedName: 'Nike', runStartedAt: '2026-05-20T06:45:00Z' })
    const result = await processFeedImportJob(job)

    expect(importFeedById).toHaveBeenCalledWith(1)
    expect(result.imported).toBe(50)
    expect(job.log).toHaveBeenCalled()
  })

  it('throws on importFeedById failure so BullMQ retries', async () => {
    vi.mocked(importFeedById).mockRejectedValue(new Error('Network timeout'))

    const job = makeJob({ feedId: 1, feedName: 'Nike', runStartedAt: '2026-05-20T06:45:00Z' })
    await expect(processFeedImportJob(job)).rejects.toThrow('Network timeout')
  })

  it('marks job as fatal for 404 errors', async () => {
    vi.mocked(importFeedById).mockRejectedValue(new Error('Failed to fetch CSV: 404 Not Found'))

    const job = makeJob({ feedId: 1, feedName: 'Nike', runStartedAt: '2026-05-20T06:45:00Z' })
    await expect(processFeedImportJob(job)).rejects.toThrow(/FATAL:/)
  })
})
```

- [ ] **Step 2: Run tests to verify they fail**

```bash
cd apps/worker && pnpm test 2>&1 | grep -E "FAIL|PASS|Error" | head -20
```

Expected: FAIL — `processFeedImportJob` still expects `data`, not `job`.

- [ ] **Step 3: Update the worker**

Replace `apps/worker/src/workers/feed-import.worker.ts`:

```ts
import { Worker, UnrecoverableError, type Job } from "bullmq";
import { connection, importFeedById, normalizeProductIds, fixGenderNewProducts, promoteProducts } from "@shoetopia/jobs";

export interface FeedImportJobData {
  feedId: number;
  feedName: string;
  runStartedAt: string;
}

export interface FeedImportJobResult {
  feedId: number;
  feedName: string;
  imported: number;
  errors: string[];
}

const FATAL_PATTERNS: Array<string | RegExp> = [
  "Feed not found",
  "Failed to parse CSV",
  /Failed to fetch CSV: 4\d\d/,
];

const isFatal = (message: string): boolean =>
  FATAL_PATTERNS.some((p) =>
    typeof p === "string" ? message.includes(p) : p.test(message),
  );

export const processFeedImportJob = async (
  job: Job<FeedImportJobData>,
): Promise<FeedImportJobResult> => {
  const { feedId, feedName, runStartedAt } = job.data;

  await job.log(`fetching CSV from FlexOffers`);
  console.log(`[feed-import] ${feedName} (${feedId}): starting`);

  try {
    const result = await importFeedById(feedId);
    await job.log(`CSV fetched — parsed ${result.imported + result.errors.length} rows`);

    await job.log(`upserting ${result.imported} products`);
    await normalizeProductIds(feedId);
    await job.log(`normalizing product IDs`);

    await fixGenderNewProducts(runStartedAt, feedId);
    await job.log(`fixing gender for new products`);

    await promoteProducts(feedId);
    await job.log(`promoting products`);

    await job.log(`done — ${result.imported} imported, ${result.errors.length} errors`);
    console.log(`[feed-import] ${feedName}: ${result.imported} imported`);

    return { feedId, feedName, imported: result.imported, errors: result.errors };
  } catch (err: any) {
    const msg: string = err?.message ?? "Unknown error";
    await job.log(`FAILED: ${msg}`);
    console.error(`[feed-import] ${feedName} FAILED: ${msg}`);

    if (isFatal(msg)) {
      throw new UnrecoverableError(`FATAL: [${feedName}] ${msg}`);
    }

    throw err;
  }
};

export const feedImportWorker = new Worker<FeedImportJobData, FeedImportJobResult>(
  "feed-import",
  async (job: Job<FeedImportJobData>) => processFeedImportJob(job),
  { connection, concurrency: 5 },
);

feedImportWorker.on("error", (err) => {
  console.error("[feed-import worker] error:", err);
});
```

- [ ] **Step 4: Run tests to verify they pass**

```bash
cd apps/worker && pnpm test 2>&1 | grep -E "FAIL|PASS|✓|×" | head -20
```

Expected: all tests PASS.

- [ ] **Step 5: Commit**

```bash
git add apps/worker/src/workers/feed-import.worker.ts apps/worker/src/workers/__tests__/feed-import.test.ts
git commit -m "feat(worker): add step logging to feed-import worker"
```

---

### Task 4: Update sync worker to log steps

**Files:**
- Modify: `apps/worker/src/workers/sync.worker.ts`
- Modify: `apps/worker/src/workers/__tests__/sync.test.ts`

- [ ] **Step 1: Update the sync test to pass a mock job**

Replace `apps/worker/src/workers/__tests__/sync.test.ts`:

```ts
import { describe, it, expect, vi, beforeEach } from 'vitest'

vi.mock('@shoetopia/db', () => ({
  prisma: {
    feed: {
      findMany: vi.fn().mockResolvedValue([
        { programId: 1, programName: 'Nike' },
      ]),
    },
  },
}))

vi.mock('@shoetopia/jobs', () => ({
  connection: {},
  feedImportQueue: {
    add: vi.fn().mockResolvedValue({
      id: 'job-1',
      waitUntilFinished: vi.fn().mockResolvedValue({ feedId: 1, feedName: 'Nike', imported: 10, errors: [] }),
    }),
  },
  hideStaleProducts: vi.fn().mockResolvedValue(0),
  upsertGroups: vi.fn().mockResolvedValue(0),
  wireGroupIds: vi.fn().mockResolvedValue(0),
  regroupStep: vi.fn().mockResolvedValue(0),
  hideProducts: vi.fn().mockResolvedValue(0),
  writeSyncLog: vi.fn().mockResolvedValue(undefined),
}))

vi.mock('bullmq', async (importOriginal) => {
  const actual = await importOriginal<typeof import('bullmq')>()
  return {
    ...actual,
    QueueEvents: vi.fn().mockImplementation(() => ({
      close: vi.fn().mockResolvedValue(undefined),
    })),
  }
})

import { runDailySync } from '../sync.worker.js'
import type { Job } from 'bullmq'
import type { SyncJobData } from '../sync.worker.js'

const makeJob = (data: SyncJobData) =>
  ({ data, log: vi.fn().mockResolvedValue(undefined) }) as unknown as Job<SyncJobData>

describe('runDailySync', () => {
  beforeEach(() => { vi.clearAllMocks() })

  it('enqueues import jobs for all feeds', async () => {
    const { feedImportQueue } = await import('@shoetopia/jobs')
    const job = makeJob({ runId: 'test-run', runStartedAt: new Date().toISOString() })
    await runDailySync(job)
    expect(feedImportQueue.add).toHaveBeenCalledWith(
      'import-feed',
      expect.objectContaining({ feedId: 1, feedName: 'Nike' }),
      expect.any(Object),
    )
    expect(job.log).toHaveBeenCalled()
  })
})
```

- [ ] **Step 2: Run tests to verify they fail**

```bash
cd apps/worker && pnpm test 2>&1 | grep -E "FAIL|PASS|Error" | head -20
```

Expected: FAIL — `runDailySync` still expects `data`, not `job`.

- [ ] **Step 3: Update the sync worker**

Replace `apps/worker/src/workers/sync.worker.ts`:

```ts
import { Worker, QueueEvents, type Job } from "bullmq";
import { randomUUID } from "node:crypto";
import {
  connection,
  feedImportQueue,
  hideStaleProducts,
  upsertGroups,
  wireGroupIds,
  regroupStep,
  hideProducts,
  writeSyncLog,
} from "@shoetopia/jobs";
import { prisma } from "@shoetopia/db";
import type { FeedImportJobResult } from "./feed-import.worker.js";

export interface SyncJobData {
  runId?: string;
  runStartedAt?: string;
}

export const runDailySync = async (job: Job<SyncJobData>): Promise<void> => {
  const runId = job.data.runId ?? randomUUID();
  const runStartedAt = job.data.runStartedAt ?? new Date().toISOString();

  const allFeeds = await prisma.feed.findMany({
    where: { isActive: true },
    select: { programId: true, programName: true },
  });

  const isDev = process.env.NODE_ENV === "development";
  const feeds = isDev ? allFeeds.slice(0, 1) : allFeeds;

  await job.log(`launching ${feeds.length} feed imports${isDev ? " (dev: limited to 1)" : ""}`);
  console.log(`[sync] Run ${runId}: launching ${feeds.length} feed imports`);

  const jobs = await Promise.all(
    feeds.map((feed) =>
      feedImportQueue.add(
        "import-feed",
        { feedId: feed.programId, feedName: feed.programName, runStartedAt },
        { attempts: 3, backoff: { type: "exponential", delay: 10_000 } },
      ),
    ),
  );

  const queueEvents = new QueueEvents("feed-import", { connection });
  const results: FeedImportJobResult[] = [];

  for (const j of jobs) {
    try {
      const result = await j.waitUntilFinished(queueEvents, 30 * 60 * 1000);
      results.push(result);
    } catch (err: any) {
      console.error(`[sync] Job ${j.id} failed: ${err.message}`);
      results.push({ feedId: 0, feedName: "unknown", imported: 0, errors: [err.message] });
    }
  }

  await queueEvents.close();

  const syncedProgramIds = results.map((r) => r.feedId).filter(Boolean);
  const importedCount = results.reduce((sum, r) => sum + r.imported, 0);
  const errors = results.flatMap((r) => r.errors);

  await job.log(`all feeds done — ${importedCount} imported, ${errors.length} errors`);
  console.log(`[sync] All feeds done: ${importedCount} imported, ${errors.length} errors`);

  await job.log(`hiding stale products`);
  const staleHidden = await hideStaleProducts(syncedProgramIds);

  await job.log(`upserting groups`);
  await upsertGroups(runStartedAt);

  await job.log(`wiring group IDs`);
  await wireGroupIds(runStartedAt);

  await job.log(`regroup step`);
  await regroupStep(runStartedAt);

  await job.log(`hiding products`);
  await hideProducts();

  await job.log(`writing sync log`);
  await writeSyncLog({
    runId,
    runStartedAt,
    syncedCount: syncedProgramIds.length,
    importedCount,
    staleHidden,
    errors,
  });

  await job.log(`run complete`);
  console.log(`[sync] Run ${runId} complete`);
};

export const syncWorker = new Worker<SyncJobData>(
  "sync",
  async (job: Job<SyncJobData>) => runDailySync(job),
  { connection, concurrency: 1 },
);

syncWorker.on("error", (err) => console.error("[sync worker] error:", err));
```

- [ ] **Step 4: Run tests to verify they pass**

```bash
cd apps/worker && pnpm test 2>&1 | grep -E "FAIL|PASS|✓|×" | head -20
```

Expected: all tests PASS.

- [ ] **Step 5: Commit**

```bash
git add apps/worker/src/workers/sync.worker.ts apps/worker/src/workers/__tests__/sync.test.ts
git commit -m "feat(worker): add step logging to sync worker"
```

---

### Task 5: Update housekeeping worker to log steps

**Files:**
- Modify: `apps/worker/src/workers/housekeeping.worker.ts`

(No existing tests for housekeeping worker.)

- [ ] **Step 1: Update the worker**

Replace `apps/worker/src/workers/housekeeping.worker.ts`:

```ts
import { Worker, type Job } from 'bullmq'
import { connection, normalizeProductIds, upsertGroups, wireGroupIds, regroupStep, hideProducts } from '@shoetopia/jobs'

type HousekeepingJob =
  | { type: 'normalize'; programId?: number }
  | { type: 'regroup'; runStartedAt: string }
  | { type: 'hide-products' }

export const housekeepingWorker = new Worker<HousekeepingJob>(
  'housekeeping',
  async (job: Job<HousekeepingJob>) => {
    const { type } = job.data
    console.log(`[housekeeping] processing: ${type}`)

    switch (type) {
      case 'normalize': {
        const { programId } = job.data as { type: string; programId?: number }
        await job.log(`normalizing product IDs${programId ? ` (programId: ${programId})` : ''}`)
        await normalizeProductIds(programId)
        await job.log(`done`)
        return
      }
      case 'regroup': {
        const { runStartedAt } = job.data as { type: string; runStartedAt: string }
        await job.log(`upserting groups`)
        await upsertGroups(runStartedAt)
        await job.log(`wiring group IDs`)
        await wireGroupIds(runStartedAt)
        await job.log(`regroup step`)
        await regroupStep(runStartedAt)
        await job.log(`done`)
        return
      }
      case 'hide-products':
        await job.log(`hiding products`)
        await hideProducts()
        await job.log(`done`)
        return
      default:
        throw new Error(`Unknown housekeeping job type: ${(job.data as any).type}`)
    }
  },
  { connection, concurrency: 1 },
)

housekeepingWorker.on('error', (err) => console.error('[housekeeping worker] error:', err))
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
cd apps/worker && pnpm build 2>&1 | tail -5
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add apps/worker/src/workers/housekeeping.worker.ts
git commit -m "feat(worker): add step logging to housekeeping worker"
```

---

### Task 6: Create JobLogs component

**Files:**
- Create: `apps/admin/app/admin/jobs/job-logs.tsx`

- [ ] **Step 1: Create the component**

```tsx
"use client";

import { useEffect, useState, useRef } from "react";

interface JobLogsProps {
  jobId: string;
  queue: string;
  active: boolean;
}

export const JobLogs = ({ jobId, queue, active }: JobLogsProps) => {
  const [logs, setLogs] = useState<string[]>([]);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const fetchLogs = async () => {
    try {
      const res = await fetch(`/api/admin/jobs/${queue}/${jobId}/logs`);
      if (!res.ok) return;
      const data = await res.json();
      setLogs(data.logs ?? []);
    } catch {
      // silently ignore fetch errors for log polling
    }
  };

  useEffect(() => {
    fetchLogs();
    if (active) {
      intervalRef.current = setInterval(fetchLogs, 2000);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [jobId, queue, active]);

  if (logs.length === 0) {
    return (
      <div className="px-4 py-2 text-neutral-600 text-xs font-mono">
        {active ? (
          <span className="animate-pulse">waiting for logs...</span>
        ) : (
          "no logs"
        )}
      </div>
    );
  }

  return (
    <div className="px-4 py-2 bg-neutral-950 border-t border-neutral-800 font-mono text-xs text-neutral-400 space-y-0.5">
      {active && (
        <div className="flex items-center gap-1.5 mb-1 text-emerald-500 text-[10px]">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse inline-block" />
          live
        </div>
      )}
      {logs.map((line, i) => (
        <div key={i} className="flex gap-3">
          <span className="text-neutral-700 shrink-0 select-none w-4 text-right">{i + 1}</span>
          <span>{line}</span>
        </div>
      ))}
    </div>
  );
};
```

- [ ] **Step 2: Commit**

```bash
git add apps/admin/app/admin/jobs/job-logs.tsx
git commit -m "feat(jobs): add JobLogs component with polling support"
```

---

### Task 7: Add expandable logs to RunningJobsList

**Files:**
- Modify: `apps/admin/app/admin/jobs/running-jobs-list.tsx`

- [ ] **Step 1: Update the component**

Replace `apps/admin/app/admin/jobs/running-jobs-list.tsx`:

```tsx
"use client";

import { useState } from "react";
import type { ActiveJob } from "./types";
import { JobLogs } from "./job-logs";

interface Props {
  jobs: ActiveJob[];
  queueName: string;
  onPause: (queue: string) => Promise<void>;
  onCancel: (jobId: string, queue: string) => Promise<void>;
}

const formatAge = (processedOn: number | null): string => {
  if (!processedOn) return "just now";
  const secs = Math.floor((Date.now() - processedOn) / 1000);
  if (secs < 60) return `${secs}s ago`;
  return `${Math.floor(secs / 60)}m ago`;
};

const jobLabel = (job: ActiveJob): string =>
  job.data?.feedName ?? job.data?.programName ?? job.name;

export const RunningJobsList = ({ jobs, queueName, onPause, onCancel }: Props) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  if (jobs.length === 0) return null;

  return (
    <div>
      <div className="text-neutral-400 text-xs uppercase tracking-widest mb-2">
        Running · {queueName}
      </div>
      <div className="bg-neutral-900 border border-neutral-800 rounded-lg overflow-hidden">
        {jobs.map((job, i) => (
          <div key={job.id} className={i > 0 ? "border-t border-neutral-800" : ""}>
            <div className="px-4 py-4">
              <div className="flex items-center gap-3 mb-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_5px_#34d399] animate-pulse shrink-0" />
                <span className="text-white font-medium">{jobLabel(job)}</span>
                <span className="text-emerald-400 text-sm ml-auto">{job.progress}%</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex-1 bg-neutral-700 rounded-full h-1">
                  <div
                    className="bg-emerald-400 h-1 rounded-full transition-all duration-500"
                    style={{ width: `${job.progress}%` }}
                  />
                </div>
                <button
                  onClick={() => onPause(queueName)}
                  className="bg-neutral-800 border border-neutral-700 hover:border-neutral-500 text-neutral-400 hover:text-white px-3 py-1 rounded text-xs transition-colors"
                >
                  ⏸ Pause queue
                </button>
                <button
                  onClick={() => onCancel(job.id, queueName)}
                  className="bg-neutral-800 border border-neutral-700 hover:border-red-800 text-red-400 hover:text-red-300 px-3 py-1 rounded text-xs transition-colors"
                >
                  ✕ Cancel
                </button>
              </div>
              <div className="flex items-center justify-between mt-2">
                <span className="text-neutral-500 text-xs">Started {formatAge(job.processedOn)}</span>
                <button
                  onClick={() => setExpandedId(expandedId === job.id ? null : job.id)}
                  className="text-neutral-600 hover:text-neutral-400 text-xs transition-colors"
                >
                  {expandedId === job.id ? "▲ hide logs" : "▼ logs"}
                </button>
              </div>
            </div>
            {expandedId === job.id && (
              <JobLogs jobId={job.id} queue={job.queue} active={true} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
```

- [ ] **Step 2: Commit**

```bash
git add apps/admin/app/admin/jobs/running-jobs-list.tsx
git commit -m "feat(jobs): add expandable log viewer to running jobs"
```

---

### Task 8: Add expandable logs to CompletedJobsList

**Files:**
- Modify: `apps/admin/app/admin/jobs/completed-jobs-list.tsx`

- [ ] **Step 1: Update the component**

Replace `apps/admin/app/admin/jobs/completed-jobs-list.tsx`:

```tsx
"use client";

import { useState } from "react";
import type { CompletedJob } from "./types";
import { JobLogs } from "./job-logs";

interface Props {
  jobs: CompletedJob[];
}

const jobLabel = (job: CompletedJob): string =>
  job.data?.feedName ?? job.data?.programName ?? job.name;

const formatTime = (ts: number | null): string => {
  if (!ts) return "—";
  return new Date(ts).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};

const importedCount = (job: CompletedJob): string => {
  const rv = job.returnvalue;
  if (!rv) return "";
  if (typeof rv.imported === "number") return `${rv.imported} imported`;
  return "";
};

export const CompletedJobsList = ({ jobs }: Props) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  if (jobs.length === 0) return null;

  return (
    <div>
      <div className="text-neutral-400 text-xs uppercase tracking-widest mb-2">
        Completed (last {jobs.length})
      </div>
      <div className="bg-neutral-900 border border-neutral-800 rounded-lg overflow-hidden">
        {jobs.map((job, i) => (
          <div key={job.id} className={i > 0 ? "border-t border-neutral-800" : ""}>
            <div className="px-4 py-3 flex items-center gap-3 text-sm">
              <span className="text-neutral-500 text-xs">✓</span>
              <span className="text-neutral-400">{jobLabel(job)}</span>
              <span className="text-neutral-600 text-xs ml-auto">{importedCount(job)}</span>
              <span className="text-neutral-600 text-xs">{formatTime(job.finishedOn)}</span>
              <button
                onClick={() => setExpandedId(expandedId === job.id ? null : job.id)}
                className="text-neutral-700 hover:text-neutral-400 text-xs transition-colors"
              >
                {expandedId === job.id ? "▲" : "▼"}
              </button>
            </div>
            {expandedId === job.id && (
              <JobLogs jobId={job.id} queue={job.queue} active={false} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
```

- [ ] **Step 2: Commit**

```bash
git add apps/admin/app/admin/jobs/completed-jobs-list.tsx
git commit -m "feat(jobs): add expandable log viewer to completed jobs"
```

---

### Task 9: Add expandable logs to FailedJobsList

**Files:**
- Modify: `apps/admin/app/admin/jobs/failed-jobs-list.tsx`

- [ ] **Step 1: Update the component**

Replace `apps/admin/app/admin/jobs/failed-jobs-list.tsx`:

```tsx
"use client";

import { useState } from "react";
import type { FailedJob } from "./types";
import { JobLogs } from "./job-logs";

interface Props {
  jobs: FailedJob[];
  queueName: string;
  onRetry: (jobId: string, queue: string) => Promise<void>;
  onDelete: (jobId: string, queue: string) => Promise<void>;
}

const jobLabel = (job: FailedJob): string =>
  job.data?.feedName ?? job.data?.programName ?? job.name;

export const FailedJobsList = ({ jobs, queueName, onRetry, onDelete }: Props) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  if (jobs.length === 0) return null;

  return (
    <div>
      <div className="text-neutral-400 text-xs uppercase tracking-widest mb-2">
        Failed · {jobs.length}
      </div>
      <div className="bg-neutral-900 border border-red-900/40 rounded-lg overflow-hidden">
        {jobs.map((job, i) => (
          <div key={job.id} className={i > 0 ? "border-t border-neutral-800" : ""}>
            <div className="px-4 py-3 flex items-center gap-3">
              <div className="flex-1 min-w-0">
                <div className="text-red-400 font-medium">{jobLabel(job)}</div>
                <div className="text-neutral-500 text-xs truncate mt-0.5">{job.failedReason}</div>
              </div>
              <span className="text-neutral-600 text-xs shrink-0">
                {job.attemptsMade} attempt{job.attemptsMade !== 1 ? "s" : ""}
              </span>
              <button
                onClick={() => setExpandedId(expandedId === job.id ? null : job.id)}
                className="text-neutral-700 hover:text-neutral-400 text-xs transition-colors shrink-0"
              >
                {expandedId === job.id ? "▲" : "▼"}
              </button>
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
            {expandedId === job.id && (
              <JobLogs jobId={job.id} queue={job.queue} active={false} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
```

- [ ] **Step 2: Commit**

```bash
git add apps/admin/app/admin/jobs/failed-jobs-list.tsx
git commit -m "feat(jobs): add expandable log viewer to failed jobs"
```
