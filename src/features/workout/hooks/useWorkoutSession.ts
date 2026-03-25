import { useState, useEffect } from "react";
import type { WorkoutRecord, WorkoutExercise, WorkoutSet, Routine, Exercise } from "@/types";
import { storage } from "@/lib/storage";
import { STORAGE_KEYS } from "@/lib/constants";
import { DEFAULT_EXERCISES } from "@/data/default-exercises";
import { DEFAULT_ROUTINES } from "@/data/default-routines";
import { genId } from "@/lib/utils";

export interface SessionSet {
  setNumber: number;
  weight: number;
  reps: number;
  completed: boolean;
}

export interface SessionExercise {
  exerciseId: string;
  exerciseName: string;
  primaryMuscle: string;
  targetSets: number;
  targetReps: string;
  restTime: number;
  order: number;
  sets: SessionSet[];
}

type SessionStatus = "loading" | "active" | "done" | "not_found";

export function useWorkoutSession(routineId: string) {
  const [status, setStatus] = useState<SessionStatus>("loading");
  const [routineName, setRoutineName] = useState("");
  const [sessionExercises, setSessionExercises] = useState<SessionExercise[]>([]);
  const [currentExerciseIdx, setCurrentExerciseIdx] = useState(0);
  const [startedAt] = useState(() => new Date().toISOString());

  useEffect(() => {
    const routines = storage.get<Routine[]>(STORAGE_KEYS.ROUTINES) ?? DEFAULT_ROUTINES;
    const exercises = storage.get<Exercise[]>(STORAGE_KEYS.EXERCISES) ?? DEFAULT_EXERCISES;
    const routine = routines.find((r) => r.id === routineId);

    if (!routine) {
      setStatus("not_found");
      return;
    }

    setRoutineName(routine.name);

    const session: SessionExercise[] = routine.exerciseIds.map((id, order) => {
      const ex = exercises.find((e) => e.id === id);
      const targetSets = ex?.targetSets ?? 3;
      return {
        exerciseId: id,
        exerciseName: ex?.name ?? "Ejercicio",
        primaryMuscle: ex?.muscleGroups.primary[0] ?? "",
        targetSets,
        targetReps: ex?.targetReps ?? "8-12",
        restTime: ex?.restTime ?? 90,
        order,
        sets: Array.from({ length: targetSets }, (_, i) => ({
          setNumber: i + 1,
          weight: 0,
          reps: 0,
          completed: false,
        })),
      };
    });

    setSessionExercises(session);
    setStatus("active");
  }, [routineId]);

  const currentExercise = sessionExercises[currentExerciseIdx] ?? null;
  const currentSetIdx = currentExercise?.sets.findIndex((s) => !s.completed) ?? 0;
  const pendingSetIdx = currentSetIdx === -1 ? currentExercise?.sets.length ?? 0 : currentSetIdx;

  const totalSets = sessionExercises.reduce((sum, ex) => sum + ex.sets.length, 0);
  const completedSets = sessionExercises.reduce(
    (sum, ex) => sum + ex.sets.filter((s) => s.completed).length,
    0
  );

  const logSet = (weight: number, reps: number): boolean => {
    if (!currentExercise) return false;

    // Compute restNeeded BEFORE setState — React's updater fn is not called
    // synchronously, so side-effects inside it are unreliable as return values.
    const restNeeded = pendingSetIdx + 1 < currentExercise.sets.length;

    setSessionExercises((prev) =>
      prev.map((ex, i) => {
        if (i !== currentExerciseIdx) return ex;
        const sets = ex.sets.map((s) =>
          s.setNumber === pendingSetIdx + 1 && !s.completed
            ? { ...s, weight, reps, completed: true }
            : s
        );
        return { ...ex, sets };
      })
    );

    return restNeeded;
  };

  const goToExercise = (idx: number) => {
    if (idx >= 0 && idx < sessionExercises.length) {
      setCurrentExerciseIdx(idx);
    }
  };

  const finishWorkout = (durationSeconds: number): WorkoutRecord => {
    const finishedAt = new Date().toISOString();

    const exercises: WorkoutExercise[] = sessionExercises.map((ex) => ({
      exerciseId: ex.exerciseId,
      exerciseName: ex.exerciseName,
      order: ex.order,
      sets: ex.sets.map((s): WorkoutSet => ({
        id: genId(),
        setNumber: s.setNumber,
        weight: s.weight,
        reps: s.reps,
        completed: s.completed,
      })),
    }));

    const totalVolume = exercises.reduce((sum, ex) =>
      sum + ex.sets.reduce((s2, set) => s2 + (set.completed ? set.weight * set.reps : 0), 0), 0
    );

    const record: WorkoutRecord = {
      id: genId(),
      routineId,
      routineName,
      startedAt,
      finishedAt,
      duration: durationSeconds,
      exercises,
      totalVolume,
    };

    const history = storage.get<WorkoutRecord[]>(STORAGE_KEYS.WORKOUT_HISTORY) ?? [];
    storage.set(STORAGE_KEYS.WORKOUT_HISTORY, [record, ...history]);

    setStatus("done");
    return record;
  };

  return {
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
  };
}
