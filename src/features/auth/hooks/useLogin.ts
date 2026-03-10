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

      // If backend returns no token → account not registered
      if (!response.data?.accessToken) {
        const message = "This account is not registered";
        setError(message);
        toast.error(message);
        return;
      }

      const { accessToken, refreshToken } = response.data;

      // Save token to store
      login(accessToken, refreshToken);

      toast.success("Login successful");

      console.log("ROLE AFTER LOGIN:", role);

      const userRole = role?.toLowerCase();

      if (userRole === "admin") {
        navigate("/admin", { replace: true });
      } else {
        navigate("/dashboard", { replace: true });
      }
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
