import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Play, Plus, BarChart3, Target } from "lucide-react";

export const QuickActions = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Acciones Rápidas</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-3">
        <Button className="h-20 flex-col gap-2" variant="default">
          <Play className="h-6 w-6" />
          <span className="text-sm">Comenzar Entrenamiento</span>
        </Button>
        <Button className="h-20 flex-col gap-2" variant="outline">
          <Plus className="h-6 w-6" />
          <span className="text-sm">Nueva Rutina</span>
        </Button>
        <Button className="h-20 flex-col gap-2" variant="outline">
          <BarChart3 className="h-6 w-6" />
          <span className="text-sm">Ver Progreso</span>
        </Button>
        <Button className="h-20 flex-col gap-2" variant="outline">
          <Target className="h-6 w-6" />
          <span className="text-sm">Establecer Metas</span>
        </Button>
      </CardContent>
    </Card>
  );
};