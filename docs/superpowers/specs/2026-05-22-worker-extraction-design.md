# Worker Extraction Design

**Date:** 2026-05-22  
**Status:** Approved

## Problem

BullMQ workers are defined in `apps/api/src/workers/` but never imported into the server startup chain, so jobs pushed to queues sit in Redis and never execute. Additionally, workers don't belong in the API app — they share no HTTP concerns — and should run as an independent process.

## Approach

Extract shared business logic and queue infrastructure into a new `packages/jobs` package. Move worker files into the existing `apps/worker` app. Wire `apps/worker` into docker-compose as a long-running service.

## Package: `packages/jobs` (`@shoetopia/jobs`)

Contains everything shared between the API (pushing jobs, queue UI) and the worker (consuming jobs):

**Queues**
- `src/queues/connection.ts` — Redis `ioredis` connection (moved from `apps/api/src/queues/connection.ts`)
- `src/queues/index.ts` — queue instances: `feedImportQueue`, `feedImportQueueEvents`, `housekeepingQueue`, `syncQueue` (moved from `apps/api/src/queues/index.ts`)

**Business logic**
- `src/lib/shared-steps.ts` — shared pipeline steps (moved from `apps/api/src/lib/shared-steps.ts`)
- `src/lib/import-feed.ts` — CSV feed import logic (moved from `apps/api/src/lib/import-feed.ts`)
- `src/lib/normalize.ts` — product name/slug normalization (moved; used by both `import-feed` and the `admin/renormalize` route)
- `src/lib/feeds.ts` — feed constants (moved; transitive dep of `import-feed`)
- `src/lib/smart-categorizer.ts` — category/gender detection (moved; transitive dep of `import-feed`)
- `src/lib/flexoffers-categories.ts` — FlexOffers category mapping (moved; transitive dep of `import-feed`)
- `src/lib/shared/` — shared utility functions (moved; transitive dep of `import-feed`)

**`package.json`**
- Name: `@shoetopia/jobs`
- Dependencies: `bullmq`, `ioredis`, `@shoetopia/db`, `@shoetopia/shared`
- Exports: single barrel `index.ts` re-exporting everything — consumers use `import { feedImportQueue, importFeedById, ... } from '@shoetopia/jobs'`

## `apps/worker`

The scaffold already exists. Fill it in:

**Worker files** (moved from `apps/api/src/workers/`)
- `src/workers/feed-import.worker.ts`
- `src/workers/housekeeping.worker.ts`
- `src/workers/sync.worker.ts`

All relative imports (`../queues/connection`, `../lib/shared-steps`, etc.) updated to `@shoetopia/jobs`.

**`src/index.ts`** — updated to import local worker files instead of `@shoetopia/api/workers/*`:
```ts
import './workers/feed-import.worker.js'
import './workers/housekeeping.worker.js'
import './workers/sync.worker.js'
console.log('[workers] all workers started')
```

**`package.json`** — replace `@shoetopia/api` dependency with `@shoetopia/jobs`.

**`Dockerfile`** — multi-stage build mirroring `apps/api/Dockerfile`: deps → builder → runner. Builder step adds `packages/jobs` to the copy/build chain. Runner runs `node dist/index.js`. No exposed port.

## `apps/api` changes

- Delete `src/queues/` (moved to `packages/jobs`)
- Delete `src/workers/` (moved to `apps/worker`)
- Delete moved lib files: `shared-steps.ts`, `import-feed.ts`, `normalize.ts`, `feeds.ts`, `smart-categorizer.ts`, `flexoffers-categories.ts`, `shared/`
- Add `@shoetopia/jobs` as a dependency
- Remove `exports` field for workers from `package.json`
- Update three routes to import from `@shoetopia/jobs`:
  - `routes/admin/import.ts` — `importFeedById`
  - `routes/admin/renormalize.ts` — `normalizeProductName`, `generateParentSlug`, `upsertGroups`, `wireGroupIds`, `regroupStep`, `hideProducts`
  - `routes/admin/housekeeping.ts` — `upsertGroups`, `regroupStep`
- Update `plugins/bull-board.ts` — queue imports from `@shoetopia/jobs`
- Update `routes/cron/daily-sync.ts` — queue imports from `@shoetopia/jobs`

## `docker-compose.yml` changes

Add a `worker` service:
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

## Root `package.json` changes

Add dev script:
```json
"dev:worker": "pnpm --filter @shoetopia-core/worker dev"
```

## Data flow

```
apps/api  ──push job──►  Redis (BullMQ queues)  ◄──listen──  apps/worker
              │                                                     │
              └── imports ──► @shoetopia/jobs ◄── imports ─────────┘
```

## What does NOT change

- Queue names (`feed-import`, `housekeeping`, `sync`) — no Redis data migration needed
- Worker concurrency settings
- Job retry/backoff configuration
- Bull Board UI (still in `apps/api`, just updates queue imports)
- `apps/admin`
