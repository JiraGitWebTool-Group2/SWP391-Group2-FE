// import axios from "axios";
// import type {
//   LoginRequest,
//   TokenResponse,
//   GoogleLoginRequest,
//   MeResponse,
// } from "./types";

// export const api = axios.create({
//   baseURL: "https://localhost:5163/api",
// });

// // LOGIN
// export const loginApi = (data: LoginRequest) =>
//   api.post<TokenResponse>("/auth/login", data);

// // GOOGLE
// export const googleLoginApi = (data: GoogleLoginRequest) =>
//   api.post<TokenResponse>("/auth/google", data);

// // REFRESH
// export const refreshApi = (refreshToken: string) =>
//   api.post<TokenResponse>("/auth/refresh", { refreshToken });

// // LOGOUT
// export const logoutApi = (refreshToken: string) =>
//   api.post("/auth/logout", { refreshToken });

// // ME
// export const getMeApi = () => api.get<MeResponse>("/auth/me");
