import z from "zod";

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/;

export const loginSchema = z
  .object({
    email: z.email().trim().toLowerCase(),
    password: z
      .string()
      .min(8, `Password must be at least 8 characters`)
      .max(72, `Password must be at most 72 characters`)
      .regex(
        passwordRegex,
        `Password must contain an uppercase letter, a lowercase letter, a number and a special character`,
      ),
  })
  .strict();

export type loginData = z.infer<typeof loginSchema>;
