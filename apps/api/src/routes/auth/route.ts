import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { signupSchema } from "../../validations/auth/signup";
import { loginSchema } from "../../validations/auth/login";
import { signupHandler } from "../../handlers/auth/signup";

const authRouter = new Hono();

authRouter.post(`/signup`, zValidator(`json`, signupSchema), signupHandler);

authRouter.post(`/login`, zValidator(`json`, loginSchema), async (c) => {});

export default authRouter;
