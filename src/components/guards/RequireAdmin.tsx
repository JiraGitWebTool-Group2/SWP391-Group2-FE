import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "@/stores/auth.store";

const RequireAdmin = () => {
  const { accessToken } = useAuthStore();

  if (!accessToken) {
    return <Navigate to="/login" replace />;
  }

  // if (role?.toUpperCase() !== "ADMIN") {
  //   return <Navigate to="/dashboard" replace />;
  // }

  return <Outlet />;
};

export default RequireAdmin;
