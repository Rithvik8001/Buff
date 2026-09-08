import z from "zod";

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/;

export const signupSchema = z
  .object({
    userName: z
      .string()
      .trim()
      .min(3, `Username must be at least 3 characters`)
      .max(30, `Username must be at most 30 characters`)
      .regex(
        /^[a-zA-Z0-9_.]+$/,
        `Username can only contain letters, numbers, underscores and dots`,
      ),
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

export type signupData = z.infer<typeof signupSchema>;

export function signupValidation(payload: unknown) {
  return signupSchema.safeParse(payload);
}
