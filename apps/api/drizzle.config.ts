import "dotenv/config";
import { defineConfig } from "drizzle-kit";
import { DATABASE_FILE_NAME } from "./src/utils/env";

export default defineConfig({
  out: "./drizzle",
  schema: "./src/database/models/schema.ts",
  dialect: "sqlite",
  dbCredentials: {
    url: DATABASE_FILE_NAME,
  },
});
