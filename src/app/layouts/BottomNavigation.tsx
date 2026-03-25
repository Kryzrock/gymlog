import { Home, BookOpen, Target, BarChart3 } from "lucide-react";
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";

const navItems = [
  { icon: Home, label: "Inicio", path: "/" },
  { icon: BookOpen, label: "Rutinas", path: "/routines" },
  { icon: Target, label: "Ejercicios", path: "/exercises" },
  { icon: BarChart3, label: "Estadísticas", path: "/statistics" },
];

export const BottomNavigation = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border">
      <div className="flex items-center justify-around py-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              cn(
                "flex flex-col items-center justify-center p-2 text-xs font-medium transition-colors min-w-[60px]",
                isActive
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              )
            }
          >
            <item.icon className="h-5 w-5 mb-1" />
            {item.label}
          </NavLink>
        ))}
      </div>
    </nav>
  );
};
