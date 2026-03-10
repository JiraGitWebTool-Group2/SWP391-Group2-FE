import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuthStore } from "@/stores/auth.store";

function Header() {
  const location = useLocation();
  const navigate = useNavigate();

  const user = useAuthStore((state) => state.user);
  const role = user?.systemRole?.toUpperCase();

  const logout = useAuthStore((state) => state.logout);

  // STUDENT MENU
  const studentNav = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Groups", path: "/groups" },
    { name: "Tasks", path: "/tasks" },
    { name: "Sync", path: "/sync" }, // Thêm trang dùng chung vào đây
  ];

  // LECTURER MENU
  const lecturerNav = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Groups", path: "/groups" },
    { name: "Review SRS", path: "/srs/review" },
    { name: "Review Report", path: "/reports/review" }, // Thêm trang review report nếu cần
    { name: "Sync", path: "/sync" }, // Thêm trang dùng chung vào đây
  ];

  // KHẮC PHỤC LỖI Ở ĐÂY:
  // Khởi tạo mảng rỗng mặc định để tránh việc hiển thị nhầm menu
  let navItems: { name: string; path: string }[] = [];

  // Bắt chính xác theo Role
  if (role === "STUDENT") {
    navItems = studentNav;
  } else if (role === "LECTURER") {
    navItems = lecturerNav;
  }

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="border-b">
      <nav className="max-w-7xl mx-auto flex h-16 items-center justify-between px-8">
        {/* LOGO */}
        <Link to="/dashboard" className="text-xl font-bold">
          SWP391 Tracker
        </Link>

        {/* MENU */}
        <div className="flex items-center gap-6">
          {navItems.map((item) => {
            const isActive = location.pathname.startsWith(item.path);

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`${isActive ? "text-blue-600 font-semibold" : ""}`}
              >
                {item.name}
              </Link>
            );
          })}

          {/* LOGOUT BUTTON */}
          <button
            onClick={handleLogout}
            className="ml-4 px-3 py-1 rounded bg-red-500 text-white hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </nav>
    </header>
  );
}

export default Header;
