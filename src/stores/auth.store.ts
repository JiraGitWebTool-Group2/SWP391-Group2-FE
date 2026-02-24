import { create } from "zustand";

interface AuthState {
  accessToken: string | null;
  role: string | null;
  login: (token: string, role: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: null,
  role: null,
  login: (token, role) => set({ accessToken: token, role }),
  logout: () => set({ accessToken: null, role: null }),
}));
