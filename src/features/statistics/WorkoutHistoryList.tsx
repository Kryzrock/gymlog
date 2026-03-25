import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EmptyState } from "@/components/shared/EmptyState";
import { Dumbbell, Clock } from "lucide-react";
import { formatDate, formatDuration } from "@/lib/utils";
import type { WorkoutRecord } from "@/types";

interface WorkoutHistoryListProps {
  workouts: WorkoutRecord[];
}

export function WorkoutHistoryList({ workouts }: WorkoutHistoryListProps) {
  if (workouts.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Historial</CardTitle>
        </CardHeader>
        <CardContent>
          <EmptyState
            icon={Dumbbell}
            title="Sin entrenamientos aún"
            description="Completá tu primer entrenamiento para verlo aquí."
          />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base">Historial completo</CardTitle>
        <p className="text-xs text-muted-foreground">{workouts.length} entrenamientos registrados</p>
      </CardHeader>
      <CardContent className="space-y-2">
        {workouts.map((workout) => {
          const completedSets = workout.exercises.reduce(
            (sum, ex) => sum + ex.sets.filter((s) => s.completed).length,
            0
          );
          return (
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
                  <span>{completedSets} series</span>
                </div>
              </div>
              <div className="text-right shrink-0 ml-3">
                <p className="text-sm font-semibold">
                  {Math.round(workout.totalVolume).toLocaleString()} kg
                </p>
                <p className="text-xs text-muted-foreground">volumen</p>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
