import type { Context } from "hono";

export type AuthContext = {
  userId: string;
  sessionId: string;
};

export type AppEnv = {
  Variables: {
    auth: AuthContext;
  };
};

export type ValidatedContext<T> = Context<AppEnv, string, { out: { json: T } }>;
