FROM node:22.14-alpine AS deps
WORKDIR /app
RUN npm install -g pnpm@10
COPY package.json pnpm-workspace.yaml pnpm-lock.yaml* ./
COPY packages/db/package.json ./packages/db/
COPY packages/shared/package.json ./packages/shared/
COPY packages/jobs/package.json ./packages/jobs/
COPY apps/api/package.json ./apps/api/
RUN pnpm install --shamefully-hoist --config.minimumReleaseAge=0

FROM node:22.14-alpine AS builder
WORKDIR /app
RUN npm install -g pnpm@10
COPY --from=deps /app ./
COPY . .
RUN DATABASE_URL=postgresql://x:x@x/x pnpm --filter @shoetopia/db generate
RUN pnpm --filter @shoetopia/db build
RUN pnpm --filter @shoetopia/shared build
RUN pnpm --filter @shoetopia/jobs build
RUN pnpm --filter @shoetopia/api build

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
