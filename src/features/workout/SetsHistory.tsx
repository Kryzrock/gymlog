import { Check, Circle } from "lucide-react";
import { cn } from "@/lib/utils";
import type { SessionExercise } from "./hooks/useWorkoutSession";

interface SetsHistoryProps {
  exercise: SessionExercise;
  pendingSetIdx: number;
}

export function SetsHistory({ exercise, pendingSetIdx }: SetsHistoryProps) {
  return (
    <div className="space-y-2">
      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
        Series
      </p>
      <div className="space-y-1.5">
        {exercise.sets.map((set, i) => {
          const isActive = i === pendingSetIdx && !set.completed;
          return (
            <div
              key={i}
              className={cn(
                "flex items-center justify-between rounded-md px-3 py-2 text-sm transition-colors",
                set.completed
                  ? "bg-primary/10 border border-primary/20"
                  : isActive
                  ? "bg-muted border border-border ring-1 ring-primary/40"
                  : "bg-muted/40 border border-transparent opacity-60"
              )}
            >
              <div className="flex items-center gap-2">
                {set.completed ? (
                  <Check className="h-3.5 w-3.5 text-primary shrink-0" />
                ) : (
                  <Circle
                    className={cn(
                      "h-3.5 w-3.5 shrink-0",
                      isActive ? "text-primary" : "text-muted-foreground"
                    )}
                  />
                )}
                <span className={cn("font-medium", isActive && "text-foreground")}>
                  Serie {set.setNumber}
                </span>
              </div>

              {set.completed ? (
                <span className="text-xs font-medium">
                  {set.reps} reps × {set.weight} kg
                </span>
              ) : (
                <span className="text-xs text-muted-foreground">
                  {isActive ? "En curso" : "Pendiente"}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
