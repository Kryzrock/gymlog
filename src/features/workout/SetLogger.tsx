import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Minus, Plus, Check, History } from "lucide-react";
import type { SessionExercise, SessionSet } from "./hooks/useWorkoutSession";

interface SetLoggerProps {
  exercise: SessionExercise;
  pendingSetIdx: number;
  onComplete: (weight: number, reps: number) => void;
}

const WEIGHT_STEPS = [-5, -2.5, +2.5, +5];
const QUICK_REPS = [6, 8, 10, 12, 15];

export function SetLogger({ exercise, pendingSetIdx, onComplete }: SetLoggerProps) {
  const lastCompleted: SessionSet | undefined = exercise.sets
    .filter((s) => s.completed)
    .at(-1);

  const [weight, setWeight] = useState(lastCompleted?.weight ?? 0);
  const [reps, setReps] = useState(lastCompleted?.reps ?? 0);

  // Reset inputs when set advances
  useEffect(() => {
    setWeight(lastCompleted?.weight ?? 0);
    setReps(lastCompleted?.reps ?? 0);
  }, [pendingSetIdx]); // eslint-disable-line react-hooks/exhaustive-deps

  const adjustWeight = (delta: number) =>
    setWeight((w) => Math.max(0, Math.round((w + delta) * 4) / 4));

  const adjustReps = (delta: number) => setReps((r) => Math.max(0, r + delta));

  const allDone = exercise.sets.every((s) => s.completed);

  return (
    <div className="space-y-5">
      {/* Set indicator */}
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-muted-foreground">
          Serie {pendingSetIdx + 1} de {exercise.sets.length}
        </p>
        <Badge variant="outline" className="text-xs">
          Objetivo: {exercise.targetReps} reps
        </Badge>
      </div>

      {/* Last set reference */}
      {lastCompleted && (
        <div className="flex items-center gap-2 text-xs text-muted-foreground bg-muted/50 rounded-md px-3 py-2">
          <History className="h-3 w-3 shrink-0" />
          <span>Última serie:</span>
          <Badge variant="secondary" className="text-xs">
            {lastCompleted.reps} reps × {lastCompleted.weight} kg
          </Badge>
        </div>
      )}

      {/* Weight */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Peso (kg)</label>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="h-10 w-10 p-0"
            onClick={() => adjustWeight(-2.5)}
            disabled={weight <= 0}
          >
            <Minus className="h-4 w-4" />
          </Button>
          <Input
            type="number"
            value={weight}
            onChange={(e) => setWeight(Math.max(0, Number(e.target.value)))}
            className="text-center text-xl font-bold h-10"
            step="0.5"
            min="0"
          />
          <Button
            variant="outline"
            size="sm"
            className="h-10 w-10 p-0"
            onClick={() => adjustWeight(2.5)}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex gap-1 justify-center">
          {WEIGHT_STEPS.map((step) => (
            <Button
              key={step}
              variant="ghost"
              size="sm"
              className="text-xs px-2 h-7"
              onClick={() => adjustWeight(step)}
            >
              {step > 0 ? "+" : ""}
              {step}
            </Button>
          ))}
        </div>
      </div>

      {/* Reps */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Repeticiones</label>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="h-10 w-10 p-0"
            onClick={() => adjustReps(-1)}
            disabled={reps <= 0}
          >
            <Minus className="h-4 w-4" />
          </Button>
          <Input
            type="number"
            value={reps}
            onChange={(e) => setReps(Math.max(0, Number(e.target.value)))}
            className="text-center text-xl font-bold h-10"
            min="0"
          />
          <Button
            variant="outline"
            size="sm"
            className="h-10 w-10 p-0"
            onClick={() => adjustReps(1)}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex gap-1 justify-center">
          {QUICK_REPS.map((r) => (
            <Button
              key={r}
              variant="ghost"
              size="sm"
              className="text-xs px-2 h-7"
              onClick={() => setReps(r)}
            >
              {r}
            </Button>
          ))}
        </div>
      </div>

      {/* Complete button */}
      <Button
        className="w-full h-12 text-base font-semibold"
        onClick={() => onComplete(weight, reps)}
        disabled={reps <= 0 || allDone}
      >
        <Check className="h-5 w-5 mr-2" />
        {allDone ? "Todas las series completadas" : "Completar serie"}
      </Button>
    </div>
  );
}
