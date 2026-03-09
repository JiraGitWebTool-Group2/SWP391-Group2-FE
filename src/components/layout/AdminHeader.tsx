import { Link, useNavigate, useLocation } from "react-router-dom";

export default function AdminHeader() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const navClass = (path: string) => {
    const isActive =
      path === "/admin"
        ? location.pathname === "/admin"
        : location.pathname.startsWith(path);

    return `hover:text-blue-600 transition ${
      isActive ? "text-blue-600 font-semibold" : "text-gray-600"
    }`;
  };

  return (
    <header className="h-16 border-b bg-white px-8 flex items-center justify-between shadow-sm">
      {/* Logo */}
      <div
        className="font-bold text-lg text-gray-800 cursor-pointer"
        onClick={() => navigate("/admin")}
      >
        Admin Panel
      </div>

      {/* Navigation */}
      <nav className="flex items-center gap-8 text-sm font-medium">
        <Link to="/admin" className={navClass("/admin")}>
          Dashboard
        </Link>

        <Link to="/admin/semesters" className={navClass("/admin/semesters")}>
          Semesters
        </Link>

        {/* <Link to="/admin/classes" className={navClass("/admin/classes")}>
          Classes
        </Link> */}

        <Link to="/admin/lecturers" className={navClass("/admin/lecturers")}>
          Lecturers
        </Link>

        <Link to="/admin/users" className={navClass("/admin/users")}>
          Users
        </Link>

        <Link
          to="/admin/integrations"
          className={navClass("/admin/integrations")}
        >
          Integrations
        </Link>
      </nav>

      {/* Logout */}
      <button
        onClick={handleLogout}
        className="text-sm text-red-500 hover:underline"
      >
        Logout
      </button>
    </header>
  );
}
