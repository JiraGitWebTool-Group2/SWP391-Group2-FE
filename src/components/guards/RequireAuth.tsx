import { Navigate } from "react-router-dom";
import { useAuthStore } from "@/stores/auth.store";

const RequireAuth = ({ children }: { children: React.ReactNode }) => {
  const token = useAuthStore((state) => state.accessToken);

  if (!token) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};

export default RequireAuth;
