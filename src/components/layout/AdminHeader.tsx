import { Link, useNavigate } from "react-router-dom";

export default function AdminHeader() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <header className="h-16 border-b bg-white px-8 flex items-center justify-between shadow-sm">
      {/* Left */}
      <div className="font-bold text-lg text-gray-800">Admin Panel</div>

      {/* Navigation */}
      <nav className="flex items-center gap-8 text-sm font-medium text-gray-600">
        <Link to="/admin" className="hover:text-blue-600 transition">
          Dashboard
        </Link>

        <Link to="/admin/groups" className="hover:text-blue-600 transition">
          Groups
        </Link>

        <Link to="/admin/lecturers" className="hover:text-blue-600 transition">
          Lecturers
        </Link>

        <Link to="/admin/users" className="hover:text-blue-600 transition">
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
