# shoetopia-core

Backend monorepo for the Shoetopia platform. Contains the API server, admin UI, and shared packages.

## Structure

```
apps/
  api/      — Fastify API + BullMQ workers (port 3001)
  admin/    — Next.js admin UI (port 3002)
packages/
  db/       — Prisma client + migrations
  shared/   — shared types and utilities
nginx/      — reverse proxy config
scripts/    — cron shell scripts
```

## Prerequisites

- Node.js ≥ 22
- pnpm ≥ 9
- Docker + Docker Compose

## Local development

### 1. Install dependencies

```bash
pnpm install
```

### 2. Start infrastructure (Postgres + Redis)

```bash
docker compose up postgres redis -d
```

### 3. Configure environment

Create a `.env` file in the repo root (used by Docker Compose and locally):

```env
POSTGRES_PASSWORD=secret
DATABASE_URL=postgresql://shoetopia:secret@localhost:5432/shoetopia
REDIS_URL=redis://localhost:6379
API_SECRET=your-api-secret
ADMIN_SECRET=your-admin-secret
FLEXOFFERS_API_KEY=your-key
```

### 4. Run migrations

```bash
pnpm --filter @shoetopia/db migrate:dev
```

### 5. Start the apps

```bash
# API (http://localhost:3001)
pnpm dev:api

# Admin UI (http://localhost:3002)
pnpm dev:admin
```

Bull Board (queue monitor) is available at `http://localhost:3001/bull` during local development.

## Production (Docker Compose)

```bash
# Build and start all services
docker compose up --build -d
```

Services exposed through Nginx on port 80:

| Path     | Target    | Access        |
|----------|-----------|---------------|
| `/api/`  | API       | Public        |
| `/bull`  | Bull Board| Internal only |
| `/admin` | Admin UI  | Internal only |

`/bull` and `/admin` are restricted to localhost and `172.16.0.0/12` (Docker network).

## Database

Migrations live in `packages/db/prisma/`. Use Prisma CLI via the `@shoetopia/db` package:

```bash
# Create a new migration (dev only)
pnpm --filter @shoetopia/db migrate:dev

# Apply pending migrations (production)
pnpm --filter @shoetopia/db migrate

# Regenerate Prisma client after schema changes
pnpm --filter @shoetopia/db generate
```

## Background jobs

Workers run inside the API process and connect to Redis via BullMQ:

| Worker             | Queue          | Purpose                              |
|--------------------|----------------|--------------------------------------|
| `feed-import`      | `feed-import`  | Imports a single feed by ID          |
| `sync`             | `sync`         | Orchestrates full daily sync         |
| `housekeeping`     | `housekeeping` | Post-sync cleanup tasks              |

The daily sync is triggered by the `cron` container every day at 06:45 UTC via `POST /api/cron/daily-sync` (requires `Authorization: Bearer $API_SECRET`).

To trigger it manually:

```bash
curl -X POST http://localhost:3001/api/cron/daily-sync \
  -H "Authorization: Bearer $API_SECRET" \
  -H "Content-Type: application/json"
```

## Scripts

| Command          | Description                        |
|------------------|------------------------------------|
| `pnpm dev:api`   | Start API in watch mode            |
| `pnpm dev:admin` | Start admin UI in watch mode       |
| `pnpm build`     | Build all packages and apps        |
| `pnpm lint`      | Lint all packages and apps         |

To run tests in the API:

```bash
pnpm --filter @shoetopia/api test
```
