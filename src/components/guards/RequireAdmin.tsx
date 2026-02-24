import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "@/stores/auth.store";

export default function RequireAdmin() {
  const { accessToken, role } = useAuthStore((state) => ({
    accessToken: state.accessToken,
    role: state.role,
  }));

  // chưa login
  if (!accessToken) {
    return <Navigate to="/login" replace />;
  }

  // không phải admin
  if (role !== "admin") {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}
