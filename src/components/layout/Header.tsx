import { Link, useLocation } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "../ui/navigation-menu";
import { cn } from "@/lib/utils";
import { ModeToggle } from "../ui/mode-toggle";
import { User, LayoutDashboard } from "lucide-react";

function Header() {
  const location = useLocation();

  const navItems = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Groups", path: "/groups" },
    { name: "Tasks", path: "/tasks" },
    { name: "SRS", path: "/srs/generate" },
    { name: "Reports", path: "/reports" },
    { name: "Sync", path: "/sync" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/60 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl shadow-sm">
      <nav className="max-w-7xl mx-auto flex h-16 items-center justify-between px-8">
        {/* Logo */}
        <Link
          to="/dashboard"
          className="flex items-center gap-2 text-2xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent hover:opacity-80 transition"
        >
          <LayoutDashboard size={22} />
          ProjectFlow
        </Link>

        {/* Navigation */}
        <div className="flex items-center gap-8">
          <NavigationMenu>
            {navItems.map((item) => {
              const isActive = location.pathname.startsWith(
                item.path.split("/")[1]
                  ? `/${item.path.split("/")[1]}`
                  : item.path,
              );

              return (
                <NavigationMenuItem key={item.path} className="list-none">
                  <NavigationMenuLink asChild>
                    <Link
                      to={item.path}
                      className={cn(
                        navigationMenuTriggerStyle(),
                        "relative px-4 py-2 text-sm font-medium rounded-xl transition-all duration-300",
                        "hover:text-blue-600 dark:hover:text-blue-400",
                        isActive &&
                          "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-slate-800",
                      )}
                    >
                      {item.name}

                      {/* Underline Animation */}
                      <span
                        className={cn(
                          "absolute left-3 right-3 -bottom-1 h-[2px] bg-blue-600 origin-left scale-x-0 transition-transform duration-300",
                          isActive && "scale-x-100",
                        )}
                      />
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              );
            })}
          </NavigationMenu>

          {/* Divider */}
          <div className="h-6 w-px bg-slate-200 dark:bg-slate-700" />

          {/* Right Section */}
          <div className="flex items-center gap-4">
            {/* Profile */}
            <Link
              to="/profile"
              className="flex items-center justify-center w-9 h-9 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300"
            >
              <User size={18} />
            </Link>

            {/* Dark Mode */}
            <ModeToggle />
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
