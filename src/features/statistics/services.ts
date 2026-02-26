import { api } from "@/lib/axios";

export interface GoogleLoginRequest {
  idToken: string;
}

export interface GoogleLoginResponse {
  accessToken: string;
  refreshToken: string;
  role: "ADMIN" | "LECTURER" | "STUDENT";
  email?: string;
  name?: string;
}

export const authService = {
  googleLogin: (data: GoogleLoginRequest) =>
    api.post<GoogleLoginResponse>("/auth/google", data),

  refreshToken: (refreshToken: string) =>
    api.post("/auth/refresh", { refreshToken }),

  logout: (refreshToken: string) => api.post("/auth/logout", { refreshToken }),

  getMe: () => api.get("/auth/me"),
};
