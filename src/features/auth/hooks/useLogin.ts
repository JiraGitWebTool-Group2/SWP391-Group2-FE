import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/stores/auth.store";
import { authService } from "../services";
import type { CredentialResponse } from "@react-oauth/google";

interface UseGoogleLoginReturn {
  handleGoogleSuccess: (
    credentialResponse: CredentialResponse,
  ) => Promise<void>;
  handleGoogleError: () => void;
  isLoading: boolean;
  error: string | null;
}

export const useGoogleLogin = (): UseGoogleLoginReturn => {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGoogleSuccess = async (
    credentialResponse: CredentialResponse,
  ) => {
    try {
      setError(null);

      if (!credentialResponse.credential) {
        setError("Không nhận được token từ Google");
        return;
      }

      setIsLoading(true);

      const response = await authService.googleLogin({
        idToken: credentialResponse.credential,
      });

      const { accessToken, refreshToken } = response.data;

      login(accessToken, refreshToken);

      navigate("/dashboard", { replace: true });
    } catch (err: any) {
      if (err.response) {
        setError(err.response.data?.message || "Lỗi server");
      } else {
        setError("Không thể kết nối đến server");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleError = () => {
    setError("Đăng nhập Google thất bại");
  };

  return {
    handleGoogleSuccess,
    handleGoogleError,
    isLoading,
    error,
  };
};
