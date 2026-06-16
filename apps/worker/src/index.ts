import path from "node:path";
import { fileURLToPath } from "node:url";
import { config } from "dotenv";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
config({ path: path.resolve(__dirname, "../../../../.env"), override: false });

await import("./workers/feed-import.worker.js");
await import("./workers/housekeeping.worker.js");
await import("./workers/sync.worker.js");

import { syncQueue } from "@shoetopia/jobs";
import { randomUUID } from "node:crypto";

// Daily sync at 06:30 UTC (10:30 PM PST)
await syncQueue.add(
  "daily-sync",
  { runId: randomUUID(), runStartedAt: new Date().toISOString() },
  { repeat: { pattern: "30 6 * * *" } },
);

console.log("[workers] feed-import, housekeeping, sync workers started");
