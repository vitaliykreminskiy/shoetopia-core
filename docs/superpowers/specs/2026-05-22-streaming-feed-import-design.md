# Streaming Feed Import Design

## Problem

`importFeedById` loads the entire feed into memory:
1. `response.arrayBuffer()` — full compressed file (~400MB)
2. `gunzipSync()` — full decompressed string (~1-2GB)
3. `parseCSV()` sync — full parsed rows array
4. `productsToInsert` — full array of mapped objects

For a 400MB `.gz` feed this causes OOM.

## Solution

Replace the sync block with a Node.js stream pipeline:

```
response.body (Web ReadableStream)
  → Readable.fromWeb()
  → createGunzip()       (transform: decompress)
  → parse({ columns })   (transform: csv-parse streaming)
  → row handler          (map + validate + push to batch)
  → insertChunk()        (INSERT when batch hits 500)
```

At any point only ~500 rows are in memory.

## Architecture

### Stream pipeline

- `Readable.fromWeb(response.body)` — converts fetch Web Stream to Node.js Readable
- `createGunzip()` from `node:zlib` — replaces `gunzipSync`
- `parse({ columns: true, skip_empty_lines: true, ... })` from `csv-parse` in streaming mode — replaces `parseCSV` sync
- `pipeline()` from `node:stream/promises` — wraps the chain, rejects on error

### Row processing

Use `for await (const row of parser)` — async iterator provides natural backpressure:
the stream pauses while `await insertChunk()` runs, so no rows accumulate in memory.

Same logic as current: validate fields, detect gender, categorize, build product object.
Instead of pushing to `productsToInsert`, push to a local `batch` array.
When `batch.length === BATCH_SIZE` (100): `await insertChunk(batch)`, clear batch.
After stream ends: flush remaining items in batch.

### Removed

- `gunzipSync`, `parseCSV` (sync imports)
- `buffer`, `csvData`, `rows` variables
- `productsToInsert` array
- `CONCURRENCY` parallel insert logic (simplified to sequential for now)

### Kept unchanged

- `insertChunk()` function — identical SQL
- All row mapping logic (categorize, gender, slugs, validation)
- `ImportFeedResult` return shape
- `stats` and `errors` tracking

## Files Changed

- `apps/api/src/lib/import-feed.ts` — only file touched
