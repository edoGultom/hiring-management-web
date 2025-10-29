import { z } from "zod";

// Schema  register
export const registerSchema = z.object({
  email: z.string().min(1, "Username is required"),
  password: z.string().min(5, "Password must be at least 5 characters"),
});

// Type register
export type RegisterFormData = z.infer<typeof registerSchema>;