import { Outlet } from "react-router-dom";
import Header from "./Header";

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* HEADER */}
      <Header />

      {/* MAIN CONTENT */}
      <main className="flex-1 max-w-6xl mx-auto w-full px-8 py-8">
        <Outlet />
      </main>

      {/* FOOTER */}
      <footer className="border-t bg-muted/40 py-8 text-center text-sm text-muted-foreground">
        <div className="max-w-6xl mx-auto">
          <p className="font-medium">© 2026 HabitFlow</p>
          <p className="mt-1">Built with React, shadcn/ui & Tailwind CSS</p>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
