import { Outlet } from "react-router-dom";
import { BottomNavigation } from "./BottomNavigation";
import { Sidebar } from "./Sidebar";

export const AppLayout = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar — solo desktop */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {/* Contenido principal */}
      <main className="pb-16 md:pb-0 md:ml-[220px]">
        <Outlet />
      </main>

      {/* Bottom nav — solo mobile */}
      <div className="md:hidden">
        <BottomNavigation />
      </div>
    </div>
  );
};
