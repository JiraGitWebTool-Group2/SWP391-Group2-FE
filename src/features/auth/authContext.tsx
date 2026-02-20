import { createContext, useContext, useEffect, useState } from "react";
import { api, getMeApi, refreshApi, logoutApi } from "./services";
import type { MeResponse } from "./types";

interface AuthContextType {
  user: MeResponse | null;
  loading: boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<MeResponse | null>(null);
  const [loading, setLoading] = useState(true);

  // attach access token
  api.interceptors.request.use((config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  // auto refresh
  api.interceptors.response.use(
    (res) => res,
    async (err) => {
      if (err.response?.status === 401) {
        const refreshToken = localStorage.getItem("refreshToken");
        if (!refreshToken) {
          handleLogout();
          return Promise.reject(err);
        }

        try {
          const { data } = await refreshApi(refreshToken);

          localStorage.setItem("accessToken", data.accessToken);
          localStorage.setItem("refreshToken", data.refreshToken);

          err.config.headers.Authorization = "Bearer " + data.accessToken;

          return api(err.config);
        } catch {
          handleLogout();
        }
      }
      return Promise.reject(err);
    },
  );

  const handleLogout = async () => {
    const refreshToken = localStorage.getItem("refreshToken");
    if (refreshToken) {
      await logoutApi(refreshToken);
    }
    localStorage.clear();
    setUser(null);
  };

  useEffect(() => {
    const init = async () => {
      try {
        const me = await getMeApi();
        setUser(me.data);
      } catch {
        handleLogout();
      } finally {
        setLoading(false);
      }
    };

    if (localStorage.getItem("accessToken")) {
      init();
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, logout: handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext)!;
