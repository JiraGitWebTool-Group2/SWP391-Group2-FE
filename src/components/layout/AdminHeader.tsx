import { Link, useNavigate } from "react-router-dom";

export default function AdminHeader() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // TODO: clear token / auth state
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <header className="h-16 border-b bg-background px-6 flex items-center justify-between">
      {/* Logo / Title */}
      <div className="font-bold text-lg">Admin Page</div>

      {/* Navigation */}
      <nav className="flex items-center gap-8 text-base">
        <Link to="/admin" className="hover:text-blue-500">
          Dashboard
        </Link>

        <Link to="/admin/groups" className="hover:text-blue-500">
          Groups
        </Link>

        <Link to="/admin/lecturers" className="hover:text-blue-500">
          Lecturers
        </Link>

        <Link to="/admin/users" className="hover:text-blue-500">
          Users
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
