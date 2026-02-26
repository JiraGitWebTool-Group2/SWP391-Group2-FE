import { api } from "@/lib/axios";

export interface GoogleLoginRequest {
  idToken: string;
}

export interface GoogleLoginResponse {
  accessToken: string;
  refreshToken: string;
  role: string;
  email?: string;
  name?: string;
}

export const authService = {
  /**
   * Đăng nhập với Google
   * POST /api/auth/google
   */
  googleLogin: (data: GoogleLoginRequest) =>
    api.post<GoogleLoginResponse>("/auth/google", data),

  /**
   * Refresh token
   * POST /api/auth/refresh
   */
  refreshToken: (refreshToken: string) =>
    api.post("/auth/refresh", { refreshToken }),

  /**
   * Đăng xuất
   * POST /api/auth/logout
   */
  logout: (refreshToken: string) => api.post("/auth/logout", { refreshToken }),

  /**
   * Lấy thông tin user hiện tại
   * GET /api/auth/me
   */
  getMe: () => api.get("/auth/me"),
};
