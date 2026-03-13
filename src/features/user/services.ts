import { api } from "@/lib/axios";
import type { UserGetMe } from "./types";

export const authService = {
  getMe: async (): Promise<UserGetMe> => {
    const res = await api.get<UserGetMe>("/auth/me");
    return res.data;
  },
};
