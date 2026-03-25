import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { ChevronLeft, ChevronRight, Flag } from "lucide-react";
import { useWorkoutTimer } from "./hooks/useWorkoutTimer";
import { useWorkoutSession } from "./hooks/useWorkoutSession";
import { WorkoutHeader } from "./WorkoutHeader";
import { RestTimer } from "./RestTimer";
import { SetLogger } from "./SetLogger";
import { SetsHistory } from "./SetsHistory";
import { useToast } from "@/hooks/useToast";
import { formatDuration } from "@/lib/utils";

export default function ActiveWorkoutPage() {
  const { routineId } = useParams<{ routineId: string }>();
  const navigate = useNavigate();
  const toast = useToast();

  const { seconds, isRunning, toggle } = useWorkoutTimer();
  const {
    status,
    routineName,
    sessionExercises,
    currentExerciseIdx,
    currentExercise,
    pendingSetIdx,
    totalSets,
    completedSets,
    logSet,
    goToExercise,
    finishWorkout,
  } = useWorkoutSession(routineId ?? "");

  const [restSeconds, setRestSeconds] = useState<number | null>(null);
  const [showExitDialog, setShowExitDialog] = useState(false);
  const [showFinishDialog, setShowFinishDialog] = useState(false);

  // ─── Handlers ────────────────────────────────────────────────────────────
  const handleSetComplete = (weight: number, reps: number) => {
    const restNeeded = logSet(weight, reps);
    toast.success(`Serie completada: ${reps} reps × ${weight} kg`);
    if (restNeeded && currentExercise) {
      setRestSeconds(currentExercise.restTime);
    }
  };

  const handleRestDone = () => setRestSeconds(null);

  const handleFinish = () => {
    const record = finishWorkout(seconds);
    toast.success(
      `¡Entrenamiento terminado! ${formatDuration(record.duration)} · ${Math.round(record.totalVolume)} kg de volumen`
    );
    navigate("/");
  };

  // ─── Loading / error states ───────────────────────────────────────────────
  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <p className="text-muted-foreground">Cargando entrenamiento...</p>
      </div>
    );
  }

  if (status === "not_found" || !currentExercise) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-background p-4">
        <p className="text-lg font-semibold">Rutina no encontrada</p>
        <Button onClick={() => navigate("/routines")}>Volver a rutinas</Button>
      </div>
    );
  }

  const isFirst = currentExerciseIdx === 0;
  const isLast = currentExerciseIdx === sessionExercises.length - 1;
  const allSetsOfCurrentDone = currentExercise.sets.every((s) => s.completed);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Sticky header */}
      <WorkoutHeader
        routineName={routineName}
        timerSeconds={seconds}
        isRunning={isRunning}
        currentExerciseIdx={currentExerciseIdx}
        totalExercises={sessionExercises.length}
        completedSets={completedSets}
        totalSets={totalSets}
        onTogglePause={toggle}
        onExit={() => setShowExitDialog(true)}
      />

      {/* Rest timer (shown above content when active) */}
      {restSeconds !== null && (
        <RestTimer
          seconds={restSeconds}
          onComplete={handleRestDone}
          onSkip={handleRestDone}
        />
      )}

      {/* Main content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Exercise title */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between gap-2">
              <div className="space-y-1">
                <CardTitle className="text-xl">{currentExercise.exerciseName}</CardTitle>
                {currentExercise.primaryMuscle && (
                  <Badge variant="secondary" className="text-xs">
                    {currentExercise.primaryMuscle}
                  </Badge>
                )}
              </div>
              <div className="text-right text-xs text-muted-foreground shrink-0">
                <p>~{currentExercise.restTime}s descanso</p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {restSeconds !== null || allSetsOfCurrentDone ? (
              <p className="text-center text-muted-foreground py-4 text-sm">
                {allSetsOfCurrentDone
                  ? "✓ Todas las series completadas"
                  : "Descansando..."}
              </p>
            ) : (
              <SetLogger
                exercise={currentExercise}
                pendingSetIdx={pendingSetIdx}
                onComplete={handleSetComplete}
              />
            )}
          </CardContent>
        </Card>

        {/* Sets history */}
        <SetsHistory exercise={currentExercise} pendingSetIdx={pendingSetIdx} />

        {/* Exercise navigation */}
        <div className="flex gap-2 pt-2">
          <Button
            variant="outline"
            className="flex-1"
            disabled={isFirst}
            onClick={() => goToExercise(currentExerciseIdx - 1)}
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Anterior
          </Button>

          {isLast ? (
            <Button
              className="flex-1"
              onClick={() => setShowFinishDialog(true)}
            >
              <Flag className="h-4 w-4 mr-1" />
              Finalizar
            </Button>
          ) : (
            <Button
              className="flex-1"
              onClick={() => goToExercise(currentExerciseIdx + 1)}
            >
              Siguiente
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          )}
        </div>

        {/* Exercise list (mini overview) */}
        <div className="space-y-1.5 pb-6">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
            Ejercicios de la rutina
          </p>
          {sessionExercises.map((ex, i) => {
            const done = ex.sets.every((s) => s.completed);
            const partial = ex.sets.some((s) => s.completed) && !done;
            return (
              <button
                key={ex.exerciseId}
                onClick={() => goToExercise(i)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-sm text-left transition-colors
                  ${i === currentExerciseIdx ? "bg-primary/10 border border-primary/20" : "bg-muted/40 hover:bg-muted"}`}
              >
                <span className={done ? "line-through text-muted-foreground" : ""}>
                  {ex.exerciseName}
                </span>
                <span className="text-xs text-muted-foreground">
                  {done ? "✓" : partial ? `${ex.sets.filter((s) => s.completed).length}/${ex.sets.length}` : ex.targetSets + " series"}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Exit confirmation */}
      <AlertDialog open={showExitDialog} onOpenChange={setShowExitDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Salir del entrenamiento?</AlertDialogTitle>
            <AlertDialogDescription>
              El progreso no se guardará. ¿Querés abandonar?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Continuar entrenando</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={() => navigate("/routines")}
            >
              Salir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Finish confirmation */}
      <AlertDialog open={showFinishDialog} onOpenChange={setShowFinishDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Finalizar entrenamiento?</AlertDialogTitle>
            <AlertDialogDescription>
              Tiempo: {formatDuration(seconds)} · {completedSets} series completadas.
              Se guardará en tu historial.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Seguir entrenando</AlertDialogCancel>
            <AlertDialogAction onClick={handleFinish}>Finalizar y guardar</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
