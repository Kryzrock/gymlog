import { Home, BookOpen, Target, BarChart3 } from "lucide-react";
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";

const navItems = [
  { icon: Home, label: "Inicio", path: "/" },
  { icon: BookOpen, label: "Rutinas", path: "/routines" },
  { icon: Target, label: "Ejercicios", path: "/exercises" },
  { icon: BarChart3, label: "Estadísticas", path: "/statistics" },
];

export const Sidebar = () => {
  return (
    <aside className="fixed left-0 top-0 h-full w-[220px] bg-card border-r border-border flex flex-col z-40">
      <div className="px-5 py-6 border-b border-border">
        <div className="flex items-center gap-2.5">
          <img src="/favicon.svg" alt="GymLog" className="h-7 w-7" />
          <span className="text-lg font-bold tracking-tight">GymLog</span>
        </div>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )
            }
          >
            <item.icon className="h-4.5 w-4.5 shrink-0" />
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};
