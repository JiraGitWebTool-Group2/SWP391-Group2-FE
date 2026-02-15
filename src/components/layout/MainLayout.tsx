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
    </div>
  );
};

export default MainLayout;
