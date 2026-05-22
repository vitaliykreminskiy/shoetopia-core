import path from "node:path";
import { config } from "dotenv";
import { defineConfig, env } from "prisma/config";

config({
  path: path.resolve(__dirname, "../../.env"),
  override: false,
});

export default defineConfig({
  schema: "./prisma/schema.prisma",
  migrations: {
    seed: "pnpm tsx ./prisma/seed.ts",
  },
  datasource: {
    url: env("DATABASE_URL"),
  },
});
