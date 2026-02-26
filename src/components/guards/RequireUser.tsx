import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "@/stores/auth.store";

export default function RequireUser() {
  const accessToken = useAuthStore((state) => state.accessToken);

  if (!accessToken) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
