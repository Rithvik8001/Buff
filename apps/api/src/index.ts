import { Hono } from "hono";
import { PORT } from "./utils/env";
import { requestId } from "hono/request-id";
import { logger } from "hono/logger";
import dbConnection from "./database/config/connection";

const app = new Hono();

app.use(requestId());
app.use(logger());

await dbConnection();

Bun.serve({
  port: PORT,
  fetch: app.fetch,
});

console.log(`server listening on port ${PORT}`);
