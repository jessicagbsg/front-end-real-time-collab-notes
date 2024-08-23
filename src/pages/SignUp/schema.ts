import { z } from "zod";

export const CreateUserFromSchema = z.object({
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
  firstName: z
    .string({
      invalid_type_error: "First name is invalid",
    })
    .min(2, {
      message: "First name must be at least 2 characters long",
    }),
  lastName: z
    .string({
      invalid_type_error: "Last name is invalid",
    })
    .min(2, {
      message: "Last name must be at least 2 characters long",
    }),
});
