import { Outlet } from "react-router-dom";
import { BottomNavigation } from "./BottomNavigation";

export const AppLayout = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <main className="flex-1 pb-16">
        <Outlet />
      </main>
      <BottomNavigation />
    </div>
  );
};
