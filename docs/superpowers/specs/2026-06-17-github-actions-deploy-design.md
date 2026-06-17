# GitHub Actions Deployment Design

**Date:** 2026-06-17
**Status:** Approved

## Overview

Set up CI/CD via GitHub Actions to build Docker images and deploy to a single VPS server on git tag push.

## Goals

- Trigger deployment on `v*` git tags (e.g. `v1.2.3`)
- Build and push Docker images for `api`, `worker`, `admin` to ghcr.io
- Deploy to VPS via SSH using `docker compose pull && up`
- Run Prisma migrations automatically on `api` container startup

## Architecture

### Workflow: `.github/workflows/deploy.yml`

Triggered on: `push` to tags matching `v*`

Two jobs:

**job: build**
1. Checkout code
2. Login to `ghcr.io` using `GITHUB_TOKEN` (automatic, no secret needed)
3. Build all three images in sequence:
   - `ghcr.io/<owner>/shoetopia-api`
   - `ghcr.io/<owner>/shoetopia-worker`
   - `ghcr.io/<owner>/shoetopia-admin`
4. Tag each image with both `<tag>` (e.g. `v1.2.3`) and `latest`
5. Push all images to ghcr.io

**job: deploy** (needs: build)
1. SSH into VPS using `SSH_PRIVATE_KEY`, `SSH_HOST`, `SSH_USER`
2. Run `docker compose pull`
3. Run `docker compose up -d`
4. Run `docker image prune -f` to clean up old images

### Server: `docker-compose.yml`

The server's compose file uses `image:` instead of `build:` for the three app services:

```yaml
services:
  api:
    image: ghcr.io/<owner>/shoetopia-api:latest
  worker:
    image: ghcr.io/<owner>/shoetopia-worker:latest
  admin:
    image: ghcr.io/<owner>/shoetopia-admin:latest
```

`postgres`, `redis`, `nginx`, and `cron` services remain unchanged.

### Migrations

`apps/api/Dockerfile` CMD updated to run migrations before starting the server:

```sh
npx prisma migrate deploy && node dist/server.js
```

This ensures migrations run on every container start, including deployments.

## Secrets Required

| Secret | Description |
|--------|-------------|
| `SSH_HOST` | VPS IP address or domain |
| `SSH_USER` | SSH user on the VPS (e.g. `deploy`) |
| `SSH_PRIVATE_KEY` | Private SSH key for authentication |

`GITHUB_TOKEN` is provided automatically by GitHub Actions for ghcr.io auth.

## Server Setup (one-time)

1. Create a `deploy` user on the VPS with Docker access
2. Add the deploy user's public key to `~/.ssh/authorized_keys`
3. Authenticate Docker on the VPS to pull from ghcr.io using a GitHub PAT with `read:packages` scope (not `GITHUB_TOKEN` — that only works inside Actions):
   ```sh
   echo <PAT> | docker login ghcr.io -u <github-username> --password-stdin
   ```
4. Place the production `docker-compose.yml` (with `image:` references) on the server

## Rollback

Each release is tagged with a specific version. To roll back manually on the server:

```sh
# Edit docker-compose.yml image tags to previous version
docker compose up -d
```

Future improvement: add `workflow_dispatch` with a `version` input to trigger rollback via GitHub UI.

## Image Tagging Strategy

Each image receives two tags on every release:
- Specific version: `ghcr.io/<owner>/shoetopia-api:v1.2.3`
- Latest: `ghcr.io/<owner>/shoetopia-api:latest`

The server's `docker-compose.yml` uses `:latest`, so `docker compose pull` always fetches the newest release.
