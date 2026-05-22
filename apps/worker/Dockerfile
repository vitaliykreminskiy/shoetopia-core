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
