import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "@/stores/auth.store";
// 2. Định nghĩa interface cho Props
interface RequireAdminProps {
  children?: React.ReactNode;
}

// 3. Nhận children từ tham số
const RequireAdmin = ({ children }: RequireAdminProps) => {
  const { accessToken, user } = useAuthStore();

  if (!accessToken) {
    return <Navigate to="/login" replace />;
  }

  const role = user?.systemRole?.toUpperCase();

  if (role !== "ADMIN") {
    return <Navigate to="/dashboard" replace />;
  }

  // 4. Ưu tiên render children (nếu được bọc), nếu không thì dùng Outlet
  return children ? <>{children}</> : <Outlet />;
};

export default RequireAdmin;
