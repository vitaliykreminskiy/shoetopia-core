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
