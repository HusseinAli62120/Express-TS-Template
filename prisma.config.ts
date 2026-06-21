import { defineConfig, env } from "prisma/config";
import dotenv from "dotenv";
dotenv.config();

const databaseUrl: any = process.env.DATABASE_URL;

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: databaseUrl,
  },
});
