import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "@/stores/auth.store";

export default function RequireUser() {
  const { accessToken, role } = useAuthStore((state) => ({
    accessToken: state.accessToken,
    role: state.role,
  }));

  if (!accessToken) {
    return <Navigate to="/login" replace />;
  }

  // Admin không được vào khu user
  if (role?.toUpperCase() === "ADMIN") {
    return <Navigate to="/admin" replace />;
  }

  return <Outlet />;
}
