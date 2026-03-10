import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/stores/auth.store";
import { authService } from "../services";
import type { CredentialResponse } from "@react-oauth/google";
import { toast } from "sonner";

interface UseGoogleLoginReturn {
  handleGoogleSuccess: (
    credentialResponse: CredentialResponse,
    role: string,
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
    role: string,
  ) => {
    try {
      setError(null);

      if (!credentialResponse.credential) {
        const message = "Failed to receive token from Google";
        setError(message);
        toast.error(message);
        return;
      }

      setIsLoading(true);

      const response = await authService.googleLogin({
        idToken: credentialResponse.credential,
        role: role,
      });

      if (!response.data?.accessToken) {
        const message = "This account is not registered";
        setError(message);
        toast.error(message);
        return;
      }

      // 1. Chỉ lấy accessToken và refreshToken từ backend
      const { accessToken, refreshToken } = response.data;

      // 2. SỬ DỤNG ROLE TỪ THAM SỐ CỦA HÀM (do form truyền vào) thay vì đợi backend
      const roleUpper = role.toUpperCase();

      // 3. Lưu vào store
      login(accessToken, refreshToken, {
        systemRole: roleUpper,
        email: "", // Tạm để rỗng vì backend không trả về
        name: "User", // Tạm để mặc định vì backend không trả về
      });

      toast.success("Login successful");

      // 4. Điều hướng
      if (roleUpper === "ADMIN") {
        navigate("/admin", { replace: true });
      } else if (roleUpper === "LECTURER" || roleUpper === "STUDENT") {
        navigate("/dashboard", { replace: true });
      } else {
        toast.error("Role không hợp lệ!");
      }
      // ... (giữ nguyên phần catch bên dưới) [cite: 54-57]
    } catch (err: any) {
      let message = "";

      if (err.response) {
        message = err.response.data?.message || "Server error";
      } else {
        message = "Unable to connect to the server";
      }

      setError(message);
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleError = () => {
    const message = "Google login failed";
    setError(message);
    toast.error(message);
  };

  return {
    handleGoogleSuccess,
    handleGoogleError,
    isLoading,
    error,
  };
};
