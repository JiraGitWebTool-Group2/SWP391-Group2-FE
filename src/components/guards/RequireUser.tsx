import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "@/stores/auth.store";

interface RequireUserProps {
  allowedRoles?: string[];
  children?: React.ReactNode;
}

const RequireUser = ({ allowedRoles, children }: RequireUserProps) => {
  const user = useAuthStore((state) => state.user);
  const role = user?.systemRole?.toUpperCase();

  // 1. Chưa đăng nhập -> Về trang Login
  if (!role) {
    return <Navigate to="/login" replace />;
  }

  // 2. Admin không được vào khu vực của User -> Đẩy về Admin Dashboard
  if (role === "ADMIN") {
    return <Navigate to="/admin" replace />;
  }

  // 3. Kiểm tra phân quyền chi tiết (Student vs Lecturer)
  if (allowedRoles && allowedRoles.length > 0) {
    if (!allowedRoles.includes(role)) {
      // Không đúng role quy định -> Trả về dashboard của user đó
      return <Navigate to="/dashboard" replace />;
    }
  }

  // Hợp lệ -> Render con
  return children ? <>{children}</> : <Outlet />;
};

export default RequireUser;
