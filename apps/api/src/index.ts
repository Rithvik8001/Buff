import { Hono } from "hono";
import { CLIENT_URL, NODE_ENV, PORT } from "./utils/env";
import { requestId } from "hono/request-id";
import { logger } from "hono/logger";
import dbConnection from "./database/config/connection";
import { cors } from "hono/cors";
import { secureHeaders } from "hono/secure-headers";
import { prettyJSON } from "hono/pretty-json";
import { ApiResponse } from "./utils/api-response";
import { ApiError } from "./utils/api-error";
import { HTTPException } from "hono/http-exception";

const app = new Hono();

app.use(requestId());
app.use(logger());
app.use(secureHeaders());
app.use(
  `/api/*`,
  cors({
    origin: CLIENT_URL,
    allowMethods: ["GET,POST,PUT,PATCH,DELETE,OPTIONS"],
    allowHeaders: ["Content-Type", "Authorization"],
    credentials: true,
    maxAge: 600,
  }),
);

if (NODE_ENV === "development") {
  app.use(prettyJSON());
}

await dbConnection();

app.notFound((c) =>
  c.json(new ApiResponse(404, false, "Route not found"), 404),
);

app.onError((err, c) => {
  if (err instanceof ApiError) {
    return c.json(
      new ApiResponse(err.statusCode, false, err.message, {
        errors: err.errors,
      }),
      err.statusCode,
    );
  }
  if (err instanceof HTTPException) {
    return c.json(
      new ApiResponse(err.status, false, err.message || "Request rejected"),
      err.status,
    );
  }
  console.error(err);
  return c.json(new ApiResponse(500, false, "Internal server error"), 500);
});

Bun.serve({
  port: PORT,
  fetch: app.fetch,
});

console.log(`server listening on port ${PORT}`);
