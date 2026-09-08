import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { signupSchema } from "../../validations/auth/signup";
import { db } from "../../database/config/connection";
import { usersTable } from "../../database/models/user";
import bcrypt from "bcrypt";
import { SALT_ROUNDS } from "../../utils/env";
import { ApiError } from "../../utils/api-error";
import { ApiResponse } from "../../utils/api-response";

const authRouter = new Hono();

authRouter.post(`/signup`, zValidator(`json`, signupSchema), async (c) => {
  const { userName, email, password } = c.req.valid(`json`);

  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

  let user;
  try {
    [user] = await db
      .insert(usersTable)
      .values({ userName, email, password: hashedPassword })
      .returning({
        userId: usersTable.userId,
        userName: usersTable.userName,
        email: usersTable.email,
        createdAt: usersTable.createdAt,
      });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    if (message.includes(`UNIQUE constraint failed`)) {
      if (message.includes(`users.email`)) {
        throw ApiError.conflict(`Email is already in use`);
      }
      if (message.includes(`users.user_name`)) {
        throw ApiError.conflict(`Username is already taken`);
      }
      throw ApiError.conflict();
    }
    throw err;
  }

  if (!user) {
    throw ApiError.internalServerError();
  }

  return c.json(
    new ApiResponse(201, true, `User registered successfully`, user),
    201,
  );
});

export default authRouter;
