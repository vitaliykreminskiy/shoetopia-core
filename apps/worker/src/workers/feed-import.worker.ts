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
