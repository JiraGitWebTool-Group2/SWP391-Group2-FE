import { api } from "@/lib/axios";

export interface GoogleLoginRequest {
  idToken: string;
  role: string;
}

export interface GoogleLoginResponse {
  accessToken: string;
  refreshToken: string;
  role: string;
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
