FROM node:22-alpine AS deps
WORKDIR /app
RUN npm install -g pnpm@10
COPY package.json pnpm-workspace.yaml pnpm-lock.yaml* ./
COPY packages/shared/package.json ./packages/shared/
COPY apps/admin/package.json ./apps/admin/
RUN pnpm install --shamefully-hoist --config.minimumReleaseAge=0

FROM node:22-alpine AS builder
WORKDIR /app
RUN npm install -g pnpm@10
COPY --from=deps /app ./
COPY . .
RUN pnpm --filter @shoetopia/admin build

# Dev stage: runs `next dev` with hot-reload. Source is bind-mounted at runtime
# (see docker-compose.dev.yml), so only deps and the shared package are baked in.
FROM node:22-alpine AS dev
WORKDIR /app
ENV NODE_ENV=development
ENV PORT=3002
RUN npm install -g pnpm@10
COPY --from=deps /app ./
COPY . .
RUN pnpm --filter @shoetopia/shared build
EXPOSE 3002
CMD ["pnpm", "--filter", "@shoetopia/admin", "dev"]

FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3002
COPY --from=builder /app/apps/admin/.next/standalone ./
COPY --from=builder /app/apps/admin/.next/static ./apps/admin/.next/static
EXPOSE 3002
CMD ["node", "apps/admin/server.js"]
