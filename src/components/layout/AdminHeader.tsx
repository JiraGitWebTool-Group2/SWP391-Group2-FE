import { Link } from "react-router-dom";

export default function AdminHeader() {
  return (
    <header className="h-16 border-b bg-background px-6 flex items-center justify-between">
      <div className="flex items-center gap-3 font-bold text-lg">
        Admin Page
      </div>

      <nav className="flex items-center gap-10 text-base">
        <Link to="/admin" className="hover:text-blue-500">
          Dashboard
        </Link>

        <Link to="/admin/groups" className="hover:text-blue-500">
          Groups
        </Link>

        <Link to="/admin/lecturers" className="hover:text-blue-500">
          Lecturers
        </Link>

        <Link to="/admin/integration" className="hover:text-blue-500">
          Integration
        </Link>

        <Link to="/admin/users" className="hover:text-blue-500">
          Add Users
        </Link>
      </nav>

      <button className="text-sm text-red-500">Logout</button>
    </header>
  );
}
