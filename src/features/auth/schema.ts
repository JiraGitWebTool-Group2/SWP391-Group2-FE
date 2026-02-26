import { z } from "zod";

// Schema cho role
export const RoleEnum = z.enum(["ADMIN", "LECTURER", "STUDENT"]);
export type Role = z.infer<typeof RoleEnum>;

// Schema cho login request
export const GoogleLoginSchema = z.object({
  idToken: z.string().min(1, "Token không được để trống"),
});

// Schema cho login response
export const AuthResponseSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
  role: RoleEnum,
  email: z.string().email().optional(),
  name: z.string().optional(),
});

export type GoogleLoginInput = z.infer<typeof GoogleLoginSchema>;
export type AuthResponse = z.infer<typeof AuthResponseSchema>;
