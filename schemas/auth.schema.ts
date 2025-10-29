import { z } from "zod";

// Schema  auth
export const authSchema = z.object({
  email: z.string().min(1, "Alamat email tidak boleh kosong"),
  password: z.string().min(5, "Password must be at least 5 characters"),
});

// Type auth
export type AuthFormData = z.infer<typeof authSchema>;
