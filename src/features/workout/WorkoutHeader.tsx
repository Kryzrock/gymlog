import { ArrowLeft, Pause, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { formatDuration } from "@/lib/utils";

interface WorkoutHeaderProps {
  routineName: string;
  timerSeconds: number;
  isRunning: boolean;
  currentExerciseIdx: number;
  totalExercises: number;
  completedSets: number;
  totalSets: number;
  onTogglePause: () => void;
  onExit: () => void;
}

export function WorkoutHeader({
  routineName,
  timerSeconds,
  isRunning,
  currentExerciseIdx,
  totalExercises,
  completedSets,
  totalSets,
  onTogglePause,
  onExit,
}: WorkoutHeaderProps) {
  const progress = totalSets > 0 ? Math.round((completedSets / totalSets) * 100) : 0;

  return (
    <div className="sticky top-0 z-10 bg-background/95 backdrop-blur border-b border-border px-4 py-3 space-y-2">
      {/* Top row */}
      <div className="flex items-center justify-between">
        <Button variant="ghost" size="sm" className="h-8 px-2 text-muted-foreground" onClick={onExit}>
          <ArrowLeft className="h-4 w-4 mr-1" />
          Salir
        </Button>

        <div className="text-center">
          <p className="text-xs text-muted-foreground truncate max-w-[140px]">{routineName}</p>
          <p className="font-mono text-lg font-bold leading-tight">{formatDuration(timerSeconds)}</p>
        </div>

        <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={onTogglePause}>
          {isRunning ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
        </Button>
      </div>

      {/* Progress row */}
      <div className="space-y-1">
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>
            Ejercicio {currentExerciseIdx + 1} / {totalExercises}
          </span>
          <span>
            {completedSets} / {totalSets} series
          </span>
        </div>
        <Progress value={progress} className="h-1.5" />
      </div>
    </div>
  );
}
