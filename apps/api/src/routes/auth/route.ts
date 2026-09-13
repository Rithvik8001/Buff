import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { signupSchema } from "../../validations/auth/signup";
import { loginSchema } from "../../validations/auth/login";
import { signupHandler } from "../../handlers/auth/signup";
import { loginHandler } from "../../handlers/auth/login";
import { validationHook } from "../../validations/validate";

const authRouter = new Hono();

authRouter.post(
  `/signup`,
  zValidator(`json`, signupSchema, validationHook),
  signupHandler,
);

authRouter.post(
  `/login`,
  zValidator(`json`, loginSchema, validationHook),
  loginHandler,
);

export default authRouter;
