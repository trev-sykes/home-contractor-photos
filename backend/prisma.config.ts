import * as envConfig from "./src/config/env";
import { defineConfig, env } from "prisma/config";


export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: envConfig.env.DATABASE_URL,
  },
});
