import { z } from "zod";

export const UserLoginFromSchema = z.object({
  email: z
    .string({
      invalid_type_error: "Email is invalid",
    })
    .email({
      message: "Email is required",
    }),
  password: z
    .string({
      required_error: "Password is required",
      invalid_type_error: "Password is invalid",
    })
    .min(8, {
      message: "Password must be at least 8 characters long",
    }),
});
