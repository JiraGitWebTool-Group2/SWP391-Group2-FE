import { createContext, useContext, type ReactNode } from "react";
import { useAuthStore } from "@/stores/auth.store";

interface AuthContextType {
  isAuthenticated: boolean;
  accessToken: string | null;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { accessToken, isAuthenticated, logout } = useAuthStore();

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        accessToken,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
