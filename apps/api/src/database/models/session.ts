import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { usersTable } from "./user";
import { InferSelectModel } from "drizzle-orm";

export const sessionsTable = sqliteTable(`sessions`, {
  sessionId: text(`session_id`)
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  userId: text(`user_id`)
    .notNull()
    .references(() => usersTable.userId, { onDelete: `cascade` }),
  tokenHash: text(`token_hash`).notNull(),
  createdAt: integer(`created_at`, { mode: `timestamp` })
    .notNull()
    .$defaultFn(() => new Date()),
  updatedAt: integer(`updated_at`, { mode: `timestamp` })
    .notNull()
    .$defaultFn(() => new Date()),
});

export type Session = InferSelectModel<typeof sessionsTable>;
