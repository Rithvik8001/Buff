import { InferSelectModel, sql } from "drizzle-orm";
import {
  integer,
  sqliteTable,
  text,
  uniqueIndex,
} from "drizzle-orm/sqlite-core";

export const usersTable = sqliteTable(`users`, {
  userId: text(`user_id`)
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  userName: text(`user_name`).notNull().unique(),
  email: text(`email`).notNull().unique(),
  password: text(`password`).notNull(),
  createdAt: integer(`created_at`, { mode: `timestamp` })
    .notNull()
    .$defaultFn(() => new Date()),
  updatedAt: integer(`updated_at`, { mode: `timestamp` })
    .notNull()
    .$defaultFn(() => new Date())
    .$onUpdateFn(() => new Date()),
});

export type User = InferSelectModel<typeof usersTable>;
