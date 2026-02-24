import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthStore } from "@/stores/auth.store";

export default function RequireAuth() {
  const accessToken = useAuthStore((state: any) => state.accessToken);
  const location = useLocation();

  // ❌ Chưa login
  if (!accessToken) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // ✅ Đã login
  return <Outlet />;
}
