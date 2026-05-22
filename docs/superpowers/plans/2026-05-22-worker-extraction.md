# Worker Extraction Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Extract shared job infrastructure into `packages/jobs`, move BullMQ worker files into `apps/worker`, and wire `apps/worker` as a running docker-compose service.

**Architecture:** A new `@shoetopia/jobs` package holds queue definitions, connection, and all business logic shared between the HTTP API and workers. Worker files live in `apps/worker/src/workers/` and consume `@shoetopia/jobs`. `apps/api` depends on `@shoetopia/jobs` for queue instances and shared steps.

**Tech Stack:** BullMQ 5, ioredis 5, TypeScript/NodeNext modules, pnpm workspaces, Docker multi-stage builds.

**Spec:** `docs/superpowers/specs/2026-05-22-worker-extraction-design.md`

---

## File Map

### New files
- `packages/jobs/package.json`
- `packages/jobs/tsconfig.json`
- `packages/jobs/src/index.ts` — barrel export
- `packages/jobs/src/queues/connection.ts` — moved from `apps/api/src/queues/connection.ts`
- `packages/jobs/src/queues/index.ts` — moved from `apps/api/src/queues/index.ts`
- `packages/jobs/src/lib/shared-steps.ts` — moved from `apps/api/src/lib/shared-steps.ts`
- `packages/jobs/src/lib/import-feed.ts` — moved from `apps/api/src/lib/import-feed.ts`
- `packages/jobs/src/lib/normalize.ts` — moved from `apps/api/src/lib/normalize.ts`
- `packages/jobs/src/lib/feeds.ts` — moved from `apps/api/src/lib/feeds.ts`
- `packages/jobs/src/lib/smart-categorizer.ts` — moved from `apps/api/src/lib/smart-categorizer.ts`
- `packages/jobs/src/lib/flexoffers-categories.ts` — moved from `apps/api/src/lib/flexoffers-categories.ts`
- `packages/jobs/src/lib/shared/` — moved from `apps/api/src/lib/shared/`
- `apps/worker/src/workers/feed-import.worker.ts` — moved from `apps/api/src/workers/feed-import.worker.ts`
- `apps/worker/src/workers/housekeeping.worker.ts` — moved from `apps/api/src/workers/housekeeping.worker.ts`
- `apps/worker/src/workers/sync.worker.ts` — moved from `apps/api/src/workers/sync.worker.ts`
- `apps/worker/src/workers/__tests__/feed-import.test.ts` — moved from `apps/api/src/workers/__tests__/feed-import.test.ts`
- `apps/worker/src/workers/__tests__/sync.test.ts` — moved from `apps/api/src/workers/__tests__/sync.test.ts`
- `apps/worker/Dockerfile`

### Modified files
- `apps/worker/src/index.ts` — import local workers instead of `@shoetopia/api`
- `apps/worker/package.json` — swap `@shoetopia/api` → `@shoetopia/jobs`, add vitest
- `apps/api/package.json` — remove worker exports, add `@shoetopia/jobs` dep
- `apps/api/src/plugins/bull-board.ts` — update queue imports
- `apps/api/src/routes/cron/daily-sync.ts` — update queue import
- `apps/api/src/routes/admin/import.ts` — update queue + lib imports
- `apps/api/src/routes/admin/housekeeping.ts` — update lib imports
- `apps/api/src/routes/admin/renormalize.ts` — update lib imports
- `docker-compose.yml` — add worker service
- Root `package.json` — add `dev:worker` script

### Deleted files
- `apps/api/src/queues/connection.ts`
- `apps/api/src/queues/index.ts`
- `apps/api/src/workers/` (entire directory)
- `apps/api/src/lib/shared-steps.ts`
- `apps/api/src/lib/import-feed.ts`
- `apps/api/src/lib/normalize.ts`
- `apps/api/src/lib/feeds.ts`
- `apps/api/src/lib/smart-categorizer.ts`
- `apps/api/src/lib/flexoffers-categories.ts`
- `apps/api/src/lib/shared/` (entire directory)

---

## Task 1: Scaffold `packages/jobs`

**Files:**
- Create: `packages/jobs/package.json`
- Create: `packages/jobs/tsconfig.json`

- [ ] **Step 1: Create `packages/jobs/package.json`**

```json
{
  "name": "@shoetopia/jobs",
  "version": "0.0.1",
  "private": true,
  "type": "module",
  "main": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "scripts": {
    "build": "tsc"
  },
  "dependencies": {
    "@shoetopia/db": "workspace:*",
    "@shoetopia/shared": "workspace:*",
    "bullmq": "^5.0.0",
    "csv-parse": "^5.5.6",
    "ioredis": "^5.3.2"
  },
  "devDependencies": {
    "@types/node": "^22.0.0",
    "typescript": "^5.4.5"
  }
}
```

- [ ] **Step 2: Create `packages/jobs/tsconfig.json`**

```json
{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": {
    "rootDir": "src",
    "outDir": "dist"
  },
  "include": ["src"]
}
```

- [ ] **Step 3: Install workspace deps**

Run from repo root:
```bash
pnpm install
```

Expected: no errors, `packages/jobs` appears in workspace.

- [ ] **Step 4: Commit**

```bash
git add packages/jobs/package.json packages/jobs/tsconfig.json pnpm-lock.yaml
git commit -m "chore(jobs): scaffold packages/jobs"
```

---

## Task 2: Move queue files into `packages/jobs`

**Files:**
- Create: `packages/jobs/src/queues/connection.ts`
- Create: `packages/jobs/src/queues/index.ts`
- Delete (later): `apps/api/src/queues/connection.ts`, `apps/api/src/queues/index.ts`

- [ ] **Step 1: Create `packages/jobs/src/queues/connection.ts`**

Copy verbatim from `apps/api/src/queues/connection.ts` — no import changes needed:

```ts
import { Redis } from 'ioredis'

export const connection = new Redis(process.env.REDIS_URL ?? 'redis://localhost:6379', {
  maxRetriesPerRequest: null,
})

connection.on('error', (err) => console.error('[bullmq] Redis connection error:', err))
```

- [ ] **Step 2: Create `packages/jobs/src/queues/index.ts`**

Copy verbatim from `apps/api/src/queues/index.ts` — only import path changes:

```ts
import { Queue, QueueEvents } from 'bullmq'
import { connection } from './connection.js'

export const feedImportQueue = new Queue('feed-import', { connection })
export const feedImportQueueEvents = new QueueEvents('feed-import', { connection })
export const housekeepingQueue = new Queue('housekeeping', { connection })
export const syncQueue = new Queue('sync', { connection })
```

- [ ] **Step 3: Commit**

```bash
git add packages/jobs/src/queues/
git commit -m "feat(jobs): add queue connection and definitions"
```

---

## Task 3: Move utility lib files into `packages/jobs`

**Files:**
- Create: `packages/jobs/src/lib/feeds.ts`
- Create: `packages/jobs/src/lib/smart-categorizer.ts`
- Create: `packages/jobs/src/lib/flexoffers-categories.ts`
- Create: `packages/jobs/src/lib/normalize.ts`
- Create: `packages/jobs/src/lib/shared/` (all 5 files)

These files have no imports from other lib files being moved — copy them verbatim.

- [ ] **Step 1: Copy `feeds.ts`**

```bash
cp apps/api/src/lib/feeds.ts packages/jobs/src/lib/feeds.ts
```

- [ ] **Step 2: Copy `smart-categorizer.ts`**

```bash
cp apps/api/src/lib/smart-categorizer.ts packages/jobs/src/lib/smart-categorizer.ts
```

- [ ] **Step 3: Copy `flexoffers-categories.ts`**

```bash
cp apps/api/src/lib/flexoffers-categories.ts packages/jobs/src/lib/flexoffers-categories.ts
```

- [ ] **Step 4: Copy `normalize.ts`**

```bash
cp apps/api/src/lib/normalize.ts packages/jobs/src/lib/normalize.ts
```

- [ ] **Step 5: Copy `lib/shared/` directory**

```bash
cp -r apps/api/src/lib/shared packages/jobs/src/lib/shared
```

- [ ] **Step 6: Commit**

```bash
git add packages/jobs/src/lib/
git commit -m "feat(jobs): add utility lib files"
```

---

## Task 4: Move `shared-steps.ts` and `import-feed.ts` into `packages/jobs`

**Files:**
- Create: `packages/jobs/src/lib/shared-steps.ts`
- Create: `packages/jobs/src/lib/import-feed.ts`

These import from sibling files moved in Task 3 — update relative paths to stay relative within `packages/jobs/src/lib/`.

- [ ] **Step 1: Copy `shared-steps.ts`** (no path changes needed — only imports `@shoetopia/db`)

```bash
cp apps/api/src/lib/shared-steps.ts packages/jobs/src/lib/shared-steps.ts
```

- [ ] **Step 2: Copy `import-feed.ts` with updated imports**

Copy the file then update the `./feeds.js`, `./smart-categorizer.js`, `./flexoffers-categories.js`, `./normalize.js`, and `./shared/index.js` imports — they stay as-is (same relative structure). The only package imports (`@shoetopia/db`, `csv-parse`) stay unchanged.

```bash
cp apps/api/src/lib/import-feed.ts packages/jobs/src/lib/import-feed.ts
```

Open `packages/jobs/src/lib/import-feed.ts` and verify the imports at the top — all relative imports (`./feeds.js`, `./smart-categorizer.js`, etc.) are valid since the files are in the same directory. No edits required.

- [ ] **Step 3: Commit**

```bash
git add packages/jobs/src/lib/shared-steps.ts packages/jobs/src/lib/import-feed.ts
git commit -m "feat(jobs): add shared-steps and import-feed"
```

---

## Task 5: Create barrel export and build `packages/jobs`

**Files:**
- Create: `packages/jobs/src/index.ts`

- [ ] **Step 1: Create `packages/jobs/src/index.ts`**

```ts
export * from './queues/connection.js'
export * from './queues/index.js'
export * from './lib/feeds.js'
export * from './lib/smart-categorizer.js'
export * from './lib/flexoffers-categories.js'
export * from './lib/normalize.js'
export * from './lib/shared-steps.js'
export * from './lib/import-feed.js'
```

- [ ] **Step 2: Build `packages/jobs`**

```bash
pnpm --filter @shoetopia/jobs build
```

Expected: `packages/jobs/dist/` generated with no TypeScript errors.

- [ ] **Step 3: Commit**

```bash
git add packages/jobs/src/index.ts packages/jobs/dist/
git commit -m "feat(jobs): add barrel export, build passes"
```

---

## Task 6: Update `apps/api` to use `@shoetopia/jobs`

**Files:**
- Modify: `apps/api/package.json`
- Modify: `apps/api/src/plugins/bull-board.ts`
- Modify: `apps/api/src/routes/cron/daily-sync.ts`
- Modify: `apps/api/src/routes/admin/import.ts`
- Modify: `apps/api/src/routes/admin/housekeeping.ts`
- Modify: `apps/api/src/routes/admin/renormalize.ts`

- [ ] **Step 1: Update `apps/api/package.json`**

Add `@shoetopia/jobs` dependency and remove the `exports` field:

```json
{
  "name": "@shoetopia/api",
  "version": "0.0.1",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "tsx watch src/main.ts",
    "build": "tsc",
    "start": "node dist/main.js",
    "test": "vitest run"
  },
  "dependencies": {
    "@bull-board/api": "^6.0.0",
    "@bull-board/fastify": "^6.0.0",
    "@fastify/cors": "^10.0.0",
    "@fastify/multipart": "^9.0.0",
    "@shoetopia/db": "workspace:*",
    "@shoetopia/jobs": "workspace:*",
    "@shoetopia/shared": "workspace:*",
    "basic-ftp": "^5.0.5",
    "bullmq": "^5.0.0",
    "csv-parse": "^5.5.6",
    "dotenv": "^17.4.2",
    "fastify": "^5.0.0",
    "fastify-plugin": "^5.0.0",
    "ioredis": "^5.3.2",
    "pino-pretty": "^13.1.3"
  },
  "devDependencies": {
    "@types/node": "^22.0.0",
    "@types/supertest": "^6.0.0",
    "supertest": "^7.0.0",
    "tsx": "^4.0.0",
    "typescript": "^5.4.5",
    "vitest": "^2.0.0"
  }
}
```

- [ ] **Step 2: Update `apps/api/src/plugins/bull-board.ts`**

Change the queue import line from:
```ts
import {
  feedImportQueue,
  housekeepingQueue,
  syncQueue,
} from "../queues/index.js";
```
To:
```ts
import {
  feedImportQueue,
  housekeepingQueue,
  syncQueue,
} from "@shoetopia/jobs";
```

- [ ] **Step 3: Update `apps/api/src/routes/cron/daily-sync.ts`**

Change:
```ts
import { syncQueue } from "../../queues/index.js";
```
To:
```ts
import { syncQueue } from "@shoetopia/jobs";
```

- [ ] **Step 4: Update `apps/api/src/routes/admin/import.ts`**

Change:
```ts
import { importFeedById } from '../../lib/import-feed.js'
import { feedImportQueue, feedImportQueueEvents } from '../../queues/index.js'
```
To:
```ts
import { importFeedById, feedImportQueue, feedImportQueueEvents } from '@shoetopia/jobs'
```

- [ ] **Step 5: Update `apps/api/src/routes/admin/housekeeping.ts`**

Change:
```ts
import { upsertGroups, regroupStep } from '../../lib/shared-steps.js'
```
To:
```ts
import { upsertGroups, regroupStep } from '@shoetopia/jobs'
```

- [ ] **Step 6: Update `apps/api/src/routes/admin/renormalize.ts`**

Change:
```ts
import { normalizeProductName, generateParentSlug } from '../../lib/normalize.js'
import { upsertGroups, wireGroupIds, regroupStep, hideProducts } from '../../lib/shared-steps.js'
```
To:
```ts
import { normalizeProductName, generateParentSlug, upsertGroups, wireGroupIds, regroupStep, hideProducts } from '@shoetopia/jobs'
```

- [ ] **Step 7: Install updated deps**

```bash
pnpm install
```

- [ ] **Step 8: Build `apps/api` to verify no broken imports**

```bash
pnpm --filter @shoetopia/api build
```

Expected: TypeScript compiles with no errors.

- [ ] **Step 9: Commit**

```bash
git add apps/api/package.json apps/api/src/plugins/bull-board.ts apps/api/src/routes/cron/daily-sync.ts apps/api/src/routes/admin/import.ts apps/api/src/routes/admin/housekeeping.ts apps/api/src/routes/admin/renormalize.ts pnpm-lock.yaml
git commit -m "feat(api): import queues and lib from @shoetopia/jobs"
```

---

## Task 7: Delete moved source files from `apps/api`

**Files:**
- Delete: `apps/api/src/queues/` (entire directory)
- Delete: `apps/api/src/workers/` (entire directory — workers move in Task 8)
- Delete: `apps/api/src/lib/shared-steps.ts`
- Delete: `apps/api/src/lib/import-feed.ts`
- Delete: `apps/api/src/lib/normalize.ts`
- Delete: `apps/api/src/lib/feeds.ts`
- Delete: `apps/api/src/lib/smart-categorizer.ts`
- Delete: `apps/api/src/lib/flexoffers-categories.ts`
- Delete: `apps/api/src/lib/shared/` (entire directory)

- [ ] **Step 1: Delete moved files**

```bash
rm -rf apps/api/src/queues
rm -rf apps/api/src/workers
rm apps/api/src/lib/shared-steps.ts
rm apps/api/src/lib/import-feed.ts
rm apps/api/src/lib/normalize.ts
rm apps/api/src/lib/feeds.ts
rm apps/api/src/lib/smart-categorizer.ts
rm apps/api/src/lib/flexoffers-categories.ts
rm -rf apps/api/src/lib/shared
```

- [ ] **Step 2: Rebuild `apps/api` to confirm nothing was missed**

```bash
pnpm --filter @shoetopia/api build
```

Expected: compiles cleanly. If there are missing-import errors, a file still references one of the deleted paths — fix the import to point to `@shoetopia/jobs`.

- [ ] **Step 3: Commit**

```bash
git add -A apps/api/src/
git commit -m "chore(api): remove files moved to @shoetopia/jobs"
```

---

## Task 8: Move workers into `apps/worker`

**Files:**
- Create: `apps/worker/src/workers/feed-import.worker.ts`
- Create: `apps/worker/src/workers/housekeeping.worker.ts`
- Create: `apps/worker/src/workers/sync.worker.ts`
- Create: `apps/worker/src/workers/__tests__/feed-import.test.ts`
- Create: `apps/worker/src/workers/__tests__/sync.test.ts`
- Modify: `apps/worker/src/index.ts`
- Modify: `apps/worker/package.json`

- [ ] **Step 1: Update `apps/worker/package.json`**

Swap `@shoetopia/api` → `@shoetopia/jobs` and add vitest:

```json
{
  "name": "@shoetopia-core/worker",
  "version": "0.0.1",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "tsx watch src/index.ts",
    "build": "tsc",
    "start": "node dist/index.js",
    "test": "vitest run"
  },
  "dependencies": {
    "@shoetopia/db": "workspace:*",
    "@shoetopia/jobs": "workspace:*",
    "bullmq": "^5.0.0",
    "dotenv": "^17.4.2"
  },
  "devDependencies": {
    "@types/node": "^22.0.0",
    "tsx": "^4.0.0",
    "typescript": "^5.4.5",
    "vitest": "^2.0.0"
  }
}
```

- [ ] **Step 2: Create `apps/worker/src/workers/feed-import.worker.ts`**

Copy from `apps/api` (now deleted from git, use the original) and update imports — replace `../queues/connection.js` with `@shoetopia/jobs` and `../lib/import-feed.js` / `../lib/shared-steps.js` with `@shoetopia/jobs`:

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
  data: FeedImportJobData,
): Promise<FeedImportJobResult> => {
  const { feedId, feedName, runStartedAt } = data;

  console.log(`[feed-import] ${feedName} (${feedId}): starting`);

  try {
    const result = await importFeedById(feedId);
    console.log(`[feed-import] ${feedName}: ${result.imported} imported`);

    await normalizeProductIds(feedId);
    await fixGenderNewProducts(runStartedAt, feedId);
    await promoteProducts(feedId);

    return {
      feedId,
      feedName,
      imported: result.imported,
      errors: result.errors,
    };
  } catch (err: any) {
    const msg: string = err?.message ?? "Unknown error";
    console.error(`[feed-import] ${feedName} FAILED: ${msg}`);

    if (isFatal(msg)) {
      throw new UnrecoverableError(`FATAL: [${feedName}] ${msg}`);
    }

    throw err;
  }
};

export const feedImportWorker = new Worker<
  FeedImportJobData,
  FeedImportJobResult
>(
  "feed-import",
  async (job: Job<FeedImportJobData>) => processFeedImportJob(job.data),
  {
    connection,
    concurrency: 5,
  },
);

feedImportWorker.on("error", (err) => {
  console.error("[feed-import worker] error:", err);
});
```

- [ ] **Step 3: Create `apps/worker/src/workers/housekeeping.worker.ts`**

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
      case 'normalize':
        return normalizeProductIds((job.data as { type: string; programId?: number }).programId)
      case 'regroup': {
        const { runStartedAt } = job.data as { type: string; runStartedAt: string }
        await upsertGroups(runStartedAt)
        await wireGroupIds(runStartedAt)
        await regroupStep(runStartedAt)
        return
      }
      case 'hide-products':
        return hideProducts()
      default:
        throw new Error(`Unknown housekeeping job type: ${(job.data as any).type}`)
    }
  },
  { connection, concurrency: 1 },
)

housekeepingWorker.on('error', (err) => console.error('[housekeeping worker] error:', err))
```

- [ ] **Step 4: Create `apps/worker/src/workers/sync.worker.ts`**

```ts
import { Worker, QueueEvents, type Job } from 'bullmq'
import { connection, feedImportQueue, hideStaleProducts, upsertGroups, wireGroupIds, regroupStep, hideProducts, writeSyncLog } from '@shoetopia/jobs'
import { prisma } from '@shoetopia/db'
import type { FeedImportJobResult } from './feed-import.worker.js'

export interface SyncJobData {
  runId: string
  runStartedAt: string
}

export const runDailySync = async (data: SyncJobData): Promise<void> => {
  const { runId, runStartedAt } = data
  const feeds = await prisma.feed.findMany({
    where: { isActive: true },
    select: { programId: true, programName: true },
  })

  console.log(`[sync] Run ${runId}: launching ${feeds.length} feed imports`)

  const jobs = await Promise.all(
    feeds.map(feed =>
      feedImportQueue.add(
        'import-feed',
        { feedId: feed.programId, feedName: feed.programName, runStartedAt },
        { attempts: 3, backoff: { type: 'exponential', delay: 10_000 } },
      )
    )
  )

  const queueEvents = new QueueEvents('feed-import', { connection })
  const results: FeedImportJobResult[] = []

  for (const job of jobs) {
    try {
      const result = await job.waitUntilFinished(queueEvents, 30 * 60 * 1000)
      results.push(result)
    } catch (err: any) {
      console.error(`[sync] Job ${job.id} failed: ${err.message}`)
      results.push({ feedId: 0, feedName: 'unknown', imported: 0, errors: [err.message] })
    }
  }

  await queueEvents.close()

  const syncedProgramIds = results.map(r => r.feedId).filter(Boolean)
  const importedCount    = results.reduce((sum, r) => sum + r.imported, 0)
  const errors           = results.flatMap(r => r.errors)

  console.log(`[sync] All feeds done: ${importedCount} imported, ${errors.length} errors`)

  const staleHidden = await hideStaleProducts(syncedProgramIds)
  await upsertGroups(runStartedAt)
  await wireGroupIds(runStartedAt)
  await regroupStep(runStartedAt)
  await hideProducts()

  await writeSyncLog({ runId, runStartedAt, syncedCount: syncedProgramIds.length, importedCount, staleHidden, errors })
  console.log(`[sync] Run ${runId} complete`)
}

export const syncWorker = new Worker<SyncJobData>(
  'sync',
  async (job: Job<SyncJobData>) => runDailySync(job.data),
  { connection, concurrency: 1 },
)

syncWorker.on('error', (err) => console.error('[sync worker] error:', err))
```

- [ ] **Step 5: Update `apps/worker/src/index.ts`**

```ts
import path from "node:path";
import { fileURLToPath } from "node:url";
import { config } from "dotenv";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
config({ path: path.resolve(__dirname, "../../../../.env"), override: false });

await import("./workers/feed-import.worker.js");
await import("./workers/housekeeping.worker.js");
await import("./workers/sync.worker.js");

console.log("[workers] feed-import, housekeeping, sync workers started");
```

- [ ] **Step 6: Create `apps/worker/src/workers/__tests__/feed-import.test.ts`**

Update mock paths from `../../lib/import-feed.js` to `@shoetopia/jobs`:

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

describe('processFeedImportJob', () => {
  beforeEach(() => { vi.clearAllMocks() })

  it('calls importFeedById and post-processing steps', async () => {
    vi.mocked(importFeedById).mockResolvedValue({
      feed: 'Nike', feedId: 1, imported: 50, programId: 1, errors: [],
    } as any)

    const result = await processFeedImportJob({ feedId: 1, feedName: 'Nike', runStartedAt: '2026-05-20T06:45:00Z' })

    expect(importFeedById).toHaveBeenCalledWith(1)
    expect(result.imported).toBe(50)
  })

  it('throws on importFeedById failure so BullMQ retries', async () => {
    vi.mocked(importFeedById).mockRejectedValue(new Error('Network timeout'))

    await expect(
      processFeedImportJob({ feedId: 1, feedName: 'Nike', runStartedAt: '2026-05-20T06:45:00Z' })
    ).rejects.toThrow('Network timeout')
  })

  it('marks job as fatal for 404 errors', async () => {
    vi.mocked(importFeedById).mockRejectedValue(new Error('Failed to fetch CSV: 404 Not Found'))

    await expect(
      processFeedImportJob({ feedId: 1, feedName: 'Nike', runStartedAt: '2026-05-20T06:45:00Z' })
    ).rejects.toThrow(/FATAL:/)
  })
})
```

- [ ] **Step 7: Create `apps/worker/src/workers/__tests__/sync.test.ts`**

Update mock paths to use `@shoetopia/jobs`:

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

describe('runDailySync', () => {
  beforeEach(() => { vi.clearAllMocks() })

  it('enqueues import jobs for all feeds', async () => {
    const { feedImportQueue } = await import('@shoetopia/jobs')
    await runDailySync({ runId: 'test-run', runStartedAt: new Date().toISOString() })
    expect(feedImportQueue.add).toHaveBeenCalledWith(
      'import-feed',
      expect.objectContaining({ feedId: 1, feedName: 'Nike' }),
      expect.any(Object),
    )
  })
})
```

- [ ] **Step 8: Install deps and run tests**

```bash
pnpm install
pnpm --filter @shoetopia-core/worker test
```

Expected: 4 tests pass (3 feed-import + 1 sync).

- [ ] **Step 9: Build `apps/worker`**

```bash
pnpm --filter @shoetopia-core/worker build
```

Expected: compiles cleanly to `apps/worker/dist/`.

- [ ] **Step 10: Commit**

```bash
git add apps/worker/
git commit -m "feat(worker): move workers into apps/worker, tests pass"
```

---

## Task 9: Add Dockerfile for `apps/worker`

**Files:**
- Create: `apps/worker/Dockerfile`

- [ ] **Step 1: Create `apps/worker/Dockerfile`**

Mirrors `apps/api/Dockerfile` but builds the worker package instead:

```dockerfile
FROM node:22-alpine AS deps
WORKDIR /app
RUN npm install -g pnpm@10
COPY package.json pnpm-workspace.yaml pnpm-lock.yaml* ./
COPY packages/db/package.json ./packages/db/
COPY packages/shared/package.json ./packages/shared/
COPY packages/jobs/package.json ./packages/jobs/
COPY apps/worker/package.json ./apps/worker/
RUN pnpm install --config.minimumReleaseAge=0

FROM node:22-alpine AS builder
WORKDIR /app
RUN npm install -g pnpm@10
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN pnpm --filter @shoetopia/db generate
RUN pnpm --filter @shoetopia/db build
RUN pnpm --filter @shoetopia/shared build
RUN pnpm --filter @shoetopia/jobs build
RUN pnpm --filter @shoetopia-core/worker build

FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/apps/worker/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
CMD ["node", "dist/index.js"]
```

- [ ] **Step 2: Commit**

```bash
git add apps/worker/Dockerfile
git commit -m "feat(worker): add Dockerfile"
```

---

## Task 10: Wire `apps/worker` into docker-compose and monorepo scripts

**Files:**
- Modify: `docker-compose.yml`
- Modify: root `package.json`

- [ ] **Step 1: Add worker service to `docker-compose.yml`**

Add after the `api` service:

```yaml
  worker:
    build:
      context: .
      dockerfile: apps/worker/Dockerfile
    restart: unless-stopped
    environment:
      NODE_ENV: production
      DATABASE_URL: postgresql://shoetopia:${POSTGRES_PASSWORD}@postgres:5432/shoetopia
      REDIS_URL: redis://redis:6379
      FLEXOFFERS_API_KEY: ${FLEXOFFERS_API_KEY}
    depends_on:
      postgres:
        condition: service_healthy
      redis:
        condition: service_healthy
```

- [ ] **Step 2: Add `dev:worker` to root `package.json`**

```json
{
  "scripts": {
    "dev:api": "pnpm --filter @shoetopia/api dev",
    "dev:admin": "pnpm --filter @shoetopia/admin dev",
    "dev:worker": "pnpm --filter @shoetopia-core/worker dev",
    "build": "pnpm -r build",
    "lint": "pnpm -r lint"
  }
}
```

- [ ] **Step 3: Commit**

```bash
git add docker-compose.yml package.json
git commit -m "feat(worker): add docker-compose service and dev:worker script"
```

---

## Task 11: Final verification

- [ ] **Step 1: Build all packages from root**

```bash
pnpm build
```

Expected: all packages build cleanly — `@shoetopia/db`, `@shoetopia/shared`, `@shoetopia/jobs`, `@shoetopia/api`, `@shoetopia-core/worker`, `@shoetopia/admin`.

- [ ] **Step 2: Run all tests**

```bash
pnpm --filter @shoetopia/api test
pnpm --filter @shoetopia-core/worker test
```

Expected: all tests pass.

- [ ] **Step 3: Confirm `apps/api` no longer has queue or worker dirs**

```bash
ls apps/api/src/queues 2>&1 || echo "queues/ removed ✓"
ls apps/api/src/workers 2>&1 || echo "workers/ removed ✓"
```

Expected: both print "removed ✓".

- [ ] **Step 4: Confirm worker boots locally**

Start Redis (or ensure it's running), then:

```bash
pnpm dev:worker
```

Expected output:
```
[workers] feed-import, housekeeping, sync workers started
```
No connection errors. Ctrl-C to stop.
