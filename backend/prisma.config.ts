import "dotenv/config";
import { defineConfig } from "prisma/config";

// Prisma v7 config — connection URL for CLI operations (migrate, db push, studio)
// The PrismaClient at runtime uses @prisma/adapter-pg with the same URL.
export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: process.env.DATABASE_URL!,
  },
});