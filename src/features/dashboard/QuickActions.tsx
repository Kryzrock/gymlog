import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";

export function QuickActions() {
  const navigate = useNavigate();

  return (
    <Button
      className="w-full h-16 text-base font-bold gap-3 rounded-2xl shadow-lg bg-gradient-to-r from-indigo-500 to-violet-600 hover:from-indigo-600 hover:to-violet-700 border-0"
      onClick={() => navigate("/routines")}
    >
      <Play className="h-5 w-5 fill-white" strokeWidth={0} />
      Iniciar entrenamiento
    </Button>
  );
}
