import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BookOpen, Dumbbell, BarChart3, Play } from "lucide-react";

const ACTIONS = [
  { label: "Iniciar entrenamiento", icon: Play, path: "/routines", variant: "default" as const },
  { label: "Mis rutinas", icon: BookOpen, path: "/routines", variant: "outline" as const },
  { label: "Ejercicios", icon: Dumbbell, path: "/exercises", variant: "outline" as const },
  { label: "Estadísticas", icon: BarChart3, path: "/statistics", variant: "outline" as const },
];

export function QuickActions() {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-2 gap-3">
      {ACTIONS.map((action) => (
        <Button
          key={action.label}
          variant={action.variant}
          className="h-16 flex-col gap-1.5 text-xs"
          onClick={() => navigate(action.path)}
        >
          <action.icon className="h-5 w-5" />
          {action.label}
        </Button>
      ))}
    </div>
  );
}
