import { createClient } from "@libsql/client";
import { DATABASE_FILE_NAME } from "../../utils/env";
import { drizzle } from "drizzle-orm/libsql";

const client = createClient({ url: DATABASE_FILE_NAME });
export const db = drizzle({ client });

export default async function dbConnection() {
  try {
    await db.run(`PRAGMA foreign_keys = ON`);
    await db.run(`SELECT 1`);
    console.log(`db connection is successful.`);
  } catch (err) {
    console.error(`db connection failed: ${err}`);
    process.exit(1);
  }
}
