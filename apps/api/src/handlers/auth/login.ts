import { eq } from "drizzle-orm";
import { db } from "../../database/config/connection";
import { usersTable } from "../../database/models/user";
import { ValidatedContext } from "../../types/app-env";
import { loginData } from "../../validations/auth/login";
import { ApiError } from "../../utils/api-error";

export const loginHandler = async (c: ValidatedContext<loginData>) => {
  const { email, password } = c.req.valid(`json`);

  const [user] = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.email, email));
  if (!user) {
    throw ApiError.badRequest(`Email is not found. please signup`);
  }
};
