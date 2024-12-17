import { z } from "zod";

// Zod schema for createUser
export const createUserDTO = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" })
    .max(50, { message: "Password must not exceed 50 characters" }),
  name: z
    .string()
    .min(3, { message: "Name is required" })
    .max(25, { message: "Name must not exceed 100 characters" }),
});
