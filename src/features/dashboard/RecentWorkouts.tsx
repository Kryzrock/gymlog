import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dumbbell, ChevronRight } from "lucide-react";
import { EmptyState } from "@/components/shared/EmptyState";
import { formatDuration } from "@/lib/utils";
import type { WorkoutRecord } from "@/types";

function relativeDay(dateStr: string): string {
  const diff = Math.floor(
    (Date.now() - new Date(dateStr).getTime()) / (1000 * 60 * 60 * 24)
  );
  if (diff === 0) return "Hoy";
  if (diff === 1) return "Ayer";
  return `Hace ${diff} días`;
}

interface RecentWorkoutsProps {
  workouts: WorkoutRecord[];
}

export function RecentWorkouts({ workouts }: RecentWorkoutsProps) {
  const navigate = useNavigate();

  if (workouts.length === 0) {
    return (
      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle className="text-base">Entrenamientos recientes</CardTitle>
        </CardHeader>
        <CardContent>
          <EmptyState
            icon={Dumbbell}
            title="Sin entrenamientos aún"
            description="Completá tu primer entrenamiento para verlo aquí."
            action={{ label: "Ver rutinas", onClick: () => navigate("/routines") }}
          />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="rounded-2xl">
      <CardHeader className="flex flex-row items-center justify-between pb-3 pt-4 px-4">
        <CardTitle className="text-base font-semibold">Recientes</CardTitle>
        <Button
          variant="ghost"
          size="sm"
          className="text-xs h-7 text-muted-foreground"
          onClick={() => navigate("/statistics")}
        >
          Ver todos
          <ChevronRight className="h-3 w-3 ml-1" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-2 px-4 pb-4">
        {workouts.map((workout) => (
          <div
            key={workout.id}
            className="flex items-center gap-3 rounded-xl bg-muted/40 px-3 py-3"
          >
            <div className="h-9 w-9 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
              <Dumbbell className="h-4 w-4 text-primary" strokeWidth={2.5} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold truncate">{workout.routineName}</p>
              <p className="text-xs text-muted-foreground">{relativeDay(workout.startedAt)}</p>
            </div>
            <div className="flex flex-col items-end gap-1 shrink-0">
              <Badge variant="secondary" className="text-xs font-medium px-2 py-0">
                {formatDuration(workout.duration)}
              </Badge>
              <Badge variant="outline" className="text-xs font-medium px-2 py-0">
                {Math.round(workout.totalVolume).toLocaleString()} kg
              </Badge>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
