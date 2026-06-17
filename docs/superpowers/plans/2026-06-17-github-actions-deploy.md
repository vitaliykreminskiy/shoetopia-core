# GitHub Actions Deployment Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Set up CI/CD that builds Docker images and deploys to a VPS on `v*` git tag push.

**Architecture:** One GitHub Actions workflow with two jobs — `build` (pushes all three images to ghcr.io) and `deploy` (SSHes into the VPS, checks out the tag, pulls new images, restarts services). The VPS runs `docker compose -f docker-compose.prod.yml` using a local `.env` file for secrets. Prisma migrations run automatically inside the `api` container on startup.

**Tech Stack:** GitHub Actions, Docker, ghcr.io, docker compose v2, Prisma 7, pnpm, appleboy/ssh-action, appleboy/scp-action

## Global Constraints

- Node 22.14-alpine for api/worker, Node 22-alpine for admin (match existing Dockerfiles)
- pnpm 10
- Use `${{ github.repository_owner }}` (lowercase) for ghcr.io image prefix — never hardcode username
- Secrets named exactly: `SHOETOPIA_SSH_HOST`, `SHOETOPIA_SSH_USER`, `SHOETOPIA_SSH_PRIVATE_KEY`
- Server working directory: `/opt/shoetopia`
- `docker compose` (v2, no hyphen) — not `docker-compose`

---

## File Map

| File | Action | Purpose |
|------|--------|---------|
| `.github/workflows/deploy.yml` | Create | Build images + deploy on `v*` tag |
| `docker-compose.prod.yml` | Create | Production compose file using `image:` instead of `build:` |
| `apps/api/Dockerfile` | Modify | Add `prisma migrate deploy` to CMD |

---

### Task 1: Update `apps/api/Dockerfile` to run migrations on startup

**Files:**
- Modify: `apps/api/Dockerfile` (line 41 — CMD)

**Why:** `prisma` CLI is in `devDependencies` of `@shoetopia/db` and is available at `/app/node_modules/.bin/prisma` in the runner stage (full `node_modules` is copied from builder). `prisma.config.ts` expects to run from `/app/packages/db/` to resolve `schema: "./prisma/schema.prisma"` correctly.

- [ ] **Step 1: Update CMD in `apps/api/Dockerfile`**

Replace the last line of `apps/api/Dockerfile`:

```dockerfile
CMD ["sh", "-c", "(cd packages/db && /app/node_modules/.bin/prisma migrate deploy) && node dist/server.js"]
```

The full final `FROM runner` block becomes:

```dockerfile
FROM node:22.14-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/apps/api/dist ./dist
COPY --from=builder /app/packages/db/dist ./packages/db/dist
COPY --from=builder /app/packages/db/package.json ./packages/db/package.json
COPY --from=builder /app/packages/db/prisma ./packages/db/prisma
COPY --from=builder /app/packages/db/prisma.config.ts ./packages/db/prisma.config.ts
COPY --from=builder /app/packages/db/dist ./node_modules/@shoetopia/db/dist
COPY --from=builder /app/packages/shared/dist ./packages/shared/dist
COPY --from=builder /app/packages/shared/package.json ./packages/shared/package.json
COPY --from=builder /app/packages/shared/dist ./node_modules/@shoetopia/shared/dist
COPY --from=builder /app/packages/jobs/dist ./packages/jobs/dist
COPY --from=builder /app/packages/jobs/package.json ./packages/jobs/package.json
COPY --from=builder /app/packages/jobs/dist ./node_modules/@shoetopia/jobs/dist
EXPOSE 3001
HEALTHCHECK --interval=10s --timeout=5s --retries=5 --start-period=30s \
    CMD wget -qO- http://0.0.0.0:3001/health || exit 1
CMD ["sh", "-c", "(cd packages/db && /app/node_modules/.bin/prisma migrate deploy) && node dist/server.js"]
```

- [ ] **Step 2: Verify the build compiles locally**

```bash
docker build -f apps/api/Dockerfile -t shoetopia-api-test .
```

Expected: build completes without error. The migration step will fail at runtime without a real DB — that is expected at build time.

- [ ] **Step 3: Commit**

```bash
git add apps/api/Dockerfile
git commit -m "feat(api): run prisma migrate deploy on container startup"
```

---

### Task 2: Create `docker-compose.prod.yml`

**Files:**
- Create: `docker-compose.prod.yml`

**Note:** This file is committed to the repo. The server checks it out via `git checkout $TAG`. Secrets come from `/opt/shoetopia/.env` on the server (never committed). The `cron` and `nginx` services mount `./scripts` and `./nginx` — these paths resolve correctly because the server checks out the full repo.

- [ ] **Step 1: Create `docker-compose.prod.yml`**

```yaml
services:
  postgres:
    image: postgres:16-alpine
    environment:
      POSTGRES_DB: shoetopia
      POSTGRES_USER: shoetopia
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}
    volumes:
      - postgres_data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U shoetopia"]
      interval: 10s
      timeout: 5s
      retries: 5

  redis:
    image: redis:7-alpine
    volumes:
      - redis_data:/data
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 10s
      timeout: 5s
      retries: 5

  api:
    image: ghcr.io/${GHCR_OWNER}/shoetopia-api:latest
    restart: unless-stopped
    ports:
      - "3001:3001"
    environment:
      NODE_ENV: production
      DATABASE_URL: postgresql://shoetopia:${POSTGRES_PASSWORD}@postgres:5432/shoetopia
      REDIS_URL: redis://redis:6379
      API_SECRET: ${API_SECRET}
      ADMIN_SECRET: ${ADMIN_SECRET}
      FLEXOFFERS_API_KEY: ${FLEXOFFERS_API_KEY}
    depends_on:
      postgres:
        condition: service_healthy
      redis:
        condition: service_healthy
    healthcheck:
      test: ["CMD-SHELL", "wget -qO- http://0.0.0.0:3001/health || exit 1"]
      interval: 10s
      timeout: 5s
      retries: 5
      start_period: 30s

  worker:
    image: ghcr.io/${GHCR_OWNER}/shoetopia-worker:latest
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

  admin:
    image: ghcr.io/${GHCR_OWNER}/shoetopia-admin:latest
    restart: unless-stopped
    ports:
      - "3002:3002"
    environment:
      NODE_ENV: production
      API_URL: http://api:3001
      ADMIN_SECRET: ${ADMIN_SECRET}
      API_SECRET: ${API_SECRET}
    depends_on:
      api:
        condition: service_healthy

  cron:
    image: alpine:3.20
    restart: unless-stopped
    volumes:
      - ./scripts:/scripts:ro
    environment:
      API_SECRET: ${API_SECRET}
    command: >
      sh -c "echo '45 6 * * * /scripts/daily-sync-cron.sh >> /proc/1/fd/1 2>&1' | crontab -
             crond -f -l 2"
    depends_on:
      api:
        condition: service_healthy

  nginx:
    image: nginx:alpine
    restart: unless-stopped
    ports:
      - "80:80"
    volumes:
      - ./nginx/nginx.conf:/etc/nginx/nginx.conf:ro
    depends_on:
      api:
        condition: service_healthy
      admin:
        condition: service_started

volumes:
  postgres_data:
  redis_data:
```

- [ ] **Step 2: Validate compose file syntax**

```bash
docker compose -f docker-compose.prod.yml config --quiet
```

Expected: exits 0 (may warn about unset env vars — that's fine, they come from server `.env`).

- [ ] **Step 3: Commit**

```bash
git add docker-compose.prod.yml
git commit -m "feat(deploy): add production docker-compose with image references"
```

---

### Task 3: Create GitHub Actions workflow

**Files:**
- Create: `.github/workflows/deploy.yml`

**Note:** `${{ github.repository_owner }}` is automatically lowercased by GitHub — required by ghcr.io. The deploy job SSHes in, runs `git fetch --tags && git checkout $TAG` to update the repo on the server (gets latest compose file, scripts, nginx config), then pulls and restarts containers.

- [ ] **Step 1: Create `.github/workflows/` directory and `deploy.yml`**

```bash
mkdir -p .github/workflows
```

```yaml
name: Deploy

on:
  push:
    tags:
      - 'v*'

jobs:
  build:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      packages: write

    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Login to GitHub Container Registry
        uses: docker/login-action@v3
        with:
          registry: ghcr.io
          username: ${{ github.actor }}
          password: ${{ secrets.GITHUB_TOKEN }}

      - name: Extract tag name
        id: tag
        run: echo "version=${GITHUB_REF#refs/tags/}" >> $GITHUB_OUTPUT

      - name: Build and push api
        uses: docker/build-push-action@v6
        with:
          context: .
          file: apps/api/Dockerfile
          push: true
          tags: |
            ghcr.io/${{ github.repository_owner }}/shoetopia-api:${{ steps.tag.outputs.version }}
            ghcr.io/${{ github.repository_owner }}/shoetopia-api:latest

      - name: Build and push worker
        uses: docker/build-push-action@v6
        with:
          context: .
          file: apps/worker/Dockerfile
          push: true
          tags: |
            ghcr.io/${{ github.repository_owner }}/shoetopia-worker:${{ steps.tag.outputs.version }}
            ghcr.io/${{ github.repository_owner }}/shoetopia-worker:latest

      - name: Build and push admin
        uses: docker/build-push-action@v6
        with:
          context: .
          file: apps/admin/Dockerfile
          push: true
          tags: |
            ghcr.io/${{ github.repository_owner }}/shoetopia-admin:${{ steps.tag.outputs.version }}
            ghcr.io/${{ github.repository_owner }}/shoetopia-admin:latest

  deploy:
    needs: build
    runs-on: ubuntu-latest

    steps:
      - name: Deploy via SSH
        uses: appleboy/ssh-action@v1.2.0
        with:
          host: ${{ secrets.SHOETOPIA_SSH_HOST }}
          username: ${{ secrets.SHOETOPIA_SSH_USER }}
          key: ${{ secrets.SHOETOPIA_SSH_PRIVATE_KEY }}
          envs: GITHUB_REF_NAME
          script: |
            cd /opt/shoetopia
            git fetch --tags
            git checkout $GITHUB_REF_NAME
            docker compose -f docker-compose.prod.yml pull
            docker compose -f docker-compose.prod.yml up -d
            docker image prune -f
```

- [ ] **Step 2: Validate YAML syntax**

```bash
python3 -c "import yaml; yaml.safe_load(open('.github/workflows/deploy.yml'))" && echo "OK"
```

Expected: prints `OK`.

- [ ] **Step 3: Commit**

```bash
git add .github/workflows/deploy.yml
git commit -m "feat(ci): add GitHub Actions deploy workflow on v* tags"
```

---

### Task 4: One-time server setup (manual steps, not automated)

These steps are performed once on the VPS before the first deployment. Document and verify each step is complete.

- [ ] **Step 1: Create `deploy` user with Docker access**

On the VPS as root:

```bash
useradd -m -s /bin/bash deploy
usermod -aG docker deploy
```

- [ ] **Step 2: Set up SSH key**

On your local machine, generate a deploy key pair:

```bash
ssh-keygen -t ed25519 -C "shoetopia-deploy" -f ~/.ssh/shoetopia_deploy -N ""
```

On the VPS as root:

```bash
mkdir -p /home/deploy/.ssh
echo "<contents of ~/.ssh/shoetopia_deploy.pub>" >> /home/deploy/.ssh/authorized_keys
chmod 700 /home/deploy/.ssh
chmod 600 /home/deploy/.ssh/authorized_keys
chown -R deploy:deploy /home/deploy/.ssh
```

Test SSH access:

```bash
ssh -i ~/.ssh/shoetopia_deploy deploy@<VPS_IP> echo "OK"
```

Expected: prints `OK`.

- [ ] **Step 3: Clone the repo on the server**

On the VPS as the `deploy` user:

```bash
mkdir -p /opt/shoetopia
cd /opt/shoetopia
git clone https://github.com/<owner>/shoetopia-core.git .
```

- [ ] **Step 4: Create `.env` on the server**

At `/opt/shoetopia/.env` (never commit this file):

```env
POSTGRES_PASSWORD=<strong-random-password>
API_SECRET=<strong-random-secret>
ADMIN_SECRET=<strong-random-secret>
FLEXOFFERS_API_KEY=<your-api-key>
GHCR_OWNER=<your-github-username-lowercase>
```

- [ ] **Step 5: Authenticate Docker to ghcr.io**

Create a GitHub PAT at https://github.com/settings/tokens with `read:packages` scope. Then on the VPS as `deploy`:

```bash
echo "<PAT>" | docker login ghcr.io -u <github-username> --password-stdin
```

Expected: `Login Succeeded`.

- [ ] **Step 6: Add GitHub Secrets to the repository**

In GitHub repo → Settings → Secrets and variables → Actions, add:

| Name | Value |
|------|-------|
| `SHOETOPIA_SSH_HOST` | VPS IP address or domain |
| `SHOETOPIA_SSH_USER` | `deploy` |
| `SHOETOPIA_SSH_PRIVATE_KEY` | Contents of `~/.ssh/shoetopia_deploy` (private key) |

- [ ] **Step 7: Make ghcr.io packages public (optional, simplifies server auth)**

In GitHub → Packages → each `shoetopia-*` package → Package settings → Change visibility → Public.
If public, the server does not need `docker login` for pulls.

---

### Task 5: First deployment smoke test

- [ ] **Step 1: Push a version tag**

```bash
git tag v0.1.0
git push origin v0.1.0
```

- [ ] **Step 2: Watch the workflow run**

Go to GitHub → Actions → `Deploy` workflow. Verify:
- `build` job completes — all three images appear under GitHub Packages
- `deploy` job completes — no SSH errors

- [ ] **Step 3: Verify services are running on the VPS**

SSH into the server:

```bash
ssh deploy@<VPS_IP>
cd /opt/shoetopia
docker compose -f docker-compose.prod.yml ps
```

Expected: all services show `running` or `healthy`. `api` may take up to 30s to become healthy (migrations + startup).

- [ ] **Step 4: Verify API health endpoint**

```bash
curl http://localhost:3001/health
```

Expected: HTTP 200 response.

- [ ] **Step 5: Verify migrations ran**

```bash
docker compose -f docker-compose.prod.yml logs api | grep -i "prisma\|migrat"
```

Expected: lines like `All migrations have been successfully applied` or `No pending migrations`.
