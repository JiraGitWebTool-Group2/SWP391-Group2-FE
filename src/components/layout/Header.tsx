import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "../ui/navigation-menu";

import { cn } from "@/lib/utils";
import { ModeToggle } from "../ui/mode-toggle";

import {
  User,
  LayoutDashboard,
  LogOut,
  GraduationCap,
  RefreshCcw,
  CheckSquare,
  FileText,
  BarChart,
} from "lucide-react";

import { useAuthStore } from "@/stores/auth.store";
import { authService } from "@/features/auth/services";
import { useProjectStore } from "@/stores/project.store";
import { toast } from "sonner";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogTrigger,
} from "../ui/alert-dialog";

import { Button } from "../ui/button";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "../ui/dropdown-menu";

function Header() {
  const location = useLocation();
  const navigate = useNavigate();

  const logout = useAuthStore((state) => state.logout);
  const refreshToken = useAuthStore((state) => state.refreshToken);

  const clearProject = useProjectStore((state) => state.clearProject);

  const [user, setUser] = useState<any>(null);

  // ================= GET USER =================
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await authService.getMe();
        setUser(res.data);
      } catch (error) {
        console.log("Get user failed", error);
      }
    };

    fetchUser();
  }, []);

  // ================= NAVIGATION BY ROLE =================

  const lecturerNav = [
    { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { name: "Classes", path: "/classes", icon: GraduationCap },
    { name: "Sync", path: "/sync", icon: RefreshCcw },
    { name: "Reports", path: "/reports", icon: BarChart },
  ];

  const studentNav = [
    { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    {
      name: "Project",
      path: "/project",
      icon: FileText,
    },
    { name: "Sync", path: "/sync", icon: RefreshCcw },
    { name: "Tasks", path: "/tasks", icon: CheckSquare },
    { name: "SRS", path: "/srs", icon: FileText },
    { name: "Reports", path: "/reports", icon: BarChart },
  ];

  const navItems =
    user && user.system_Role === "LECTURER" ? lecturerNav : studentNav;

  // ================= LOGOUT =================

  const handleLogout = async () => {
    try {
      if (refreshToken) {
        await authService.logout(refreshToken);
      }
    } catch {
      console.log("Logout API failed");
    } finally {
      clearProject();
      logout();
      toast.success("Logout successful");
      navigate("/login", { replace: true });
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl shadow-sm">
      <nav className="max-w-7xl mx-auto flex h-16 items-center justify-between px-8">
        {/* ================= LOGO ================= */}
        <Link
          to="/dashboard"
          className="flex items-center gap-2 text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"
        >
          <LayoutDashboard size={22} />
          SWP391 Tracker
        </Link>

        {/* ================= RIGHT SIDE ================= */}
        <div className="flex items-center gap-8">
          {/* ================= NAVIGATION ================= */}
          <NavigationMenu>
            {navItems.map((item) => {
              const isActive = location.pathname.startsWith(item.path);
              const Icon = item.icon;

              return (
                <NavigationMenuItem key={item.path} className="list-none">
                  <NavigationMenuLink asChild>
                    <Link
                      to={item.path}
                      className={cn(
                        navigationMenuTriggerStyle(),
                        "px-4 py-2 rounded-xl text-sm flex items-center gap-2 transition-all",
                        "hover:bg-slate-100 dark:hover:bg-slate-800",
                        isActive &&
                          "text-blue-600 bg-blue-50 dark:bg-slate-800 font-medium",
                      )}
                    >
                      <Icon size={16} />
                      {item.name}
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              );
            })}
          </NavigationMenu>

          {/* ================= LOGOUT ================= */}
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center gap-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-950"
              >
                <LogOut size={16} />
                Logout
              </Button>
            </AlertDialogTrigger>

            <AlertDialogContent className="rounded-xl bg-white dark:bg-slate-800">
              <AlertDialogHeader>
                <AlertDialogTitle>Confirm Logout</AlertDialogTitle>

                <AlertDialogDescription>
                  Are you sure you want to log out? You will need to sign in
                  again to continue.
                </AlertDialogDescription>
              </AlertDialogHeader>

              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>

                <AlertDialogAction
                  onClick={handleLogout}
                  className="bg-red-600 hover:bg-red-700"
                >
                  Logout
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          {/* ================= DIVIDER ================= */}
          <div className="h-6 w-px bg-slate-200 dark:bg-slate-700" />

          {/* ================= PROFILE ================= */}
          <div className="flex items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  className="
                  flex items-center justify-center
                  w-9 h-9 rounded-full
                  bg-gradient-to-r from-blue-500 to-indigo-500
                  text-white shadow-sm
                  hover:scale-105 transition
                  "
                >
                  {user?.fullName?.charAt(0).toUpperCase() || (
                    <User size={18} />
                  )}
                </button>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                align="end"
                className="w-72 p-2 rounded-xl shadow-xl"
              >
                <DropdownMenuLabel className="flex flex-col gap-1">
                  <span className="font-semibold text-sm">
                    {user?.fullName}
                  </span>
                  <span className="text-xs text-slate-500">{user?.email}</span>
                </DropdownMenuLabel>

                <DropdownMenuSeparator />

                <DropdownMenuItem className="text-sm">
                  Role: {user?.system_Role}
                </DropdownMenuItem>

                <DropdownMenuSeparator />
              </DropdownMenuContent>
            </DropdownMenu>

            {/* ================= DARK MODE ================= */}
            <ModeToggle />
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
