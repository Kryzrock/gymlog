import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BookOpen, Dumbbell, BarChart3, Play } from "lucide-react";

const SECONDARY = [
  { label: "Mis rutinas", icon: BookOpen, path: "/routines" },
  { label: "Ejercicios", icon: Dumbbell, path: "/exercises" },
  { label: "Estadísticas", icon: BarChart3, path: "/statistics" },
];

export function QuickActions() {
  const navigate = useNavigate();

  return (
    <div className="space-y-3">
      {/* CTA principal */}
      <Button
        className="w-full h-14 text-sm gap-2"
        onClick={() => navigate("/routines")}
      >
        <Play className="h-5 w-5" />
        Iniciar entrenamiento
      </Button>

      {/* Acciones secundarias */}
      <div className="grid grid-cols-3 gap-3">
        {SECONDARY.map((action) => (
          <Button
            key={action.label}
            variant="outline"
            className="h-16 flex-col gap-1.5 text-xs"
            onClick={() => navigate(action.path)}
          >
            <action.icon className="h-5 w-5" />
            {action.label}
          </Button>
        ))}
      </div>
    </div>
  );
}
