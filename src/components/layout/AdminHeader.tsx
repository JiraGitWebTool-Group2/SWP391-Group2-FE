import { Link, useNavigate, useLocation } from "react-router-dom";
import { LogOut, LayoutDashboard, Users, BookOpen } from "lucide-react";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
  AlertDialogFooter,
  AlertDialogHeader,
} from "@/components/ui/alert-dialog";

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

    return `flex items-center gap-2 px-3 py-2 rounded-lg transition ${
      isActive
        ? "bg-blue-50 text-blue-600 font-semibold"
        : "text-gray-600 hover:bg-gray-100"
    }`;
  };

  return (
    <header className="h-16 border-b bg-white px-10 flex items-center justify-between shadow-sm">
      {/* LOGO */}
      <div
        className="font-bold text-lg text-gray-800 cursor-pointer"
        onClick={() => navigate("/admin")}
      >
        Admin Panel
      </div>

      {/* NAV */}
      <nav className="flex items-center gap-4 text-sm">
        <Link to="/admin" className={navClass("/admin")}>
          <LayoutDashboard size={16} />
          Dashboard
        </Link>

        <Link to="/admin/semesters" className={navClass("/admin/semesters")}>
          <BookOpen size={16} />
          Semesters
        </Link>

        <Link to="/admin/lecturers" className={navClass("/admin/lecturers")}>
          <Users size={16} />
          Lecturers
        </Link>

        <Link to="/admin/users" className={navClass("/admin/users")}>
          <Users size={16} />
          Users
        </Link>
      </nav>

      {/* LOGOUT */}
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <button className="flex items-center gap-2 text-sm text-red-500 hover:bg-red-50 px-3 py-2 rounded-lg transition">
            <LogOut size={16} />
            Logout
          </button>
        </AlertDialogTrigger>

        <AlertDialogContent className="bg-white">
          <AlertDialogHeader>
            <AlertDialogTitle>Logout</AlertDialogTitle>

            <AlertDialogDescription>
              Are you sure you want to logout from the admin panel?
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>

            <AlertDialogAction
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600"
            >
              Logout
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </header>
  );
}
