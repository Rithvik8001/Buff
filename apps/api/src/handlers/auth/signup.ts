import type { Context } from "hono";
import bcrypt from "bcrypt";
import { db } from "../../database/config/connection";
import { usersTable } from "../../database/models/user";
import { SALT_ROUNDS } from "../../utils/env";
import { ApiError } from "../../utils/api-error";
import { ApiResponse } from "../../utils/api-response";
import type { signupData } from "../../validations/auth/signup";

type SignupContext = Context<
  Record<string, never>,
  string,
  { out: { json: signupData } }
>;

export const signupHandler = async (c: SignupContext) => {
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
};
