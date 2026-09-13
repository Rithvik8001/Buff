import { Context } from "hono";
import { loginData } from "../../validations/auth/login";

type LoginContext = Context<
  Record<string, never>,
  string,
  { out: { json: loginData } }
>;
export const loginHandler = async (c: LoginContext) => {};
