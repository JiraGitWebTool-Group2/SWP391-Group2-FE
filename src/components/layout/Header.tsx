import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "../ui/navigation-menu";
import { cn } from "@/lib/utils";
import { ModeToggle } from "../ui/mode-toggle";
import { User, LayoutDashboard } from "lucide-react";
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
  AlertDialogOverlay,
} from "../ui/alert-dialog";
import { Button } from "../ui/button";

function Header() {
  const location = useLocation();
  const navigate = useNavigate();

  const logout = useAuthStore((state) => state.logout);
  const refreshToken = useAuthStore((state) => state.refreshToken);

  const currentProject = useProjectStore((state) => state.currentProject);
  const clearProject = useProjectStore((state) => state.clearProject);

  const navItems = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Groups", path: "/groups" },
    { name: "Sync", path: "/sync" },
    { name: "Tasks", path: "/tasks" },
    { name: "SRS", path: "/srs" },
    { name: "Reports", path: "/reports" },
  ];

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
        <Link
          to="/dashboard"
          className="flex items-center gap-2 text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"
        >
          <LayoutDashboard size={22} />
          SWP391 Tracker
        </Link>

        <div className="flex items-center gap-8">
          <NavigationMenu>
            {navItems.map((item) => {
              const isActive = location.pathname.startsWith(item.path);

              return (
                <NavigationMenuItem key={item.path} className="list-none">
                  <NavigationMenuLink asChild>
                    <Link
                      to={item.path}
                      className={cn(
                        navigationMenuTriggerStyle(),
                        "px-4 py-2 text-sm rounded-xl transition",
                        isActive &&
                          "text-blue-600 bg-blue-50 dark:bg-slate-800",
                      )}
                    >
                      {item.name}
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              );
            })}
          </NavigationMenu>

          {/* Logout Button + Dialog */}
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="ghost" size="sm">
                Logout
              </Button>
            </AlertDialogTrigger>

            <AlertDialogOverlay className="fixed inset-0 bg-black/40 backdrop-blur-sm" />

            <AlertDialogContent className="rounded-xl bg-white dark:bg-slate-900 shadow-xl">
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

          <div className="h-6 w-px bg-slate-200 dark:bg-slate-700" />

          <div className="flex items-center gap-4">
            <Link
              to="/profile"
              className="flex items-center justify-center w-9 h-9 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white"
            >
              <User size={18} />
            </Link>

            <ModeToggle />
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
