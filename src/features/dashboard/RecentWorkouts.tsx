import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dumbbell, Clock, TrendingUp, ChevronRight } from "lucide-react";
import { EmptyState } from "@/components/shared/EmptyState";
import { formatDate, formatDuration } from "@/lib/utils";
import type { WorkoutRecord } from "@/types";

interface RecentWorkoutsProps {
  workouts: WorkoutRecord[];
}

export function RecentWorkouts({ workouts }: RecentWorkoutsProps) {
  const navigate = useNavigate();

  if (workouts.length === 0) {
    return (
      <Card>
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
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <CardTitle className="text-base">Entrenamientos recientes</CardTitle>
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
      <CardContent className="space-y-2">
        {workouts.map((workout) => (
          <div
            key={workout.id}
            className="flex items-center justify-between rounded-lg bg-muted/50 px-3 py-2.5"
          >
            <div className="space-y-0.5 min-w-0">
              <p className="text-sm font-medium truncate">{workout.routineName}</p>
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <span>{formatDate(workout.startedAt)}</span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {formatDuration(workout.duration)}
                </span>
              </div>
            </div>
            <div className="text-right shrink-0 ml-3">
              <p className="text-sm font-semibold">{Math.round(workout.totalVolume).toLocaleString()} kg</p>
              <p className="text-xs text-muted-foreground flex items-center justify-end gap-1">
                <TrendingUp className="h-3 w-3" />
                volumen
              </p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
