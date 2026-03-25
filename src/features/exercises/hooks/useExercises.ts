import { useState } from "react";
import type { Exercise } from "@/types";
import { storage } from "@/lib/storage";
import { STORAGE_KEYS } from "@/lib/constants";
import { DEFAULT_EXERCISES } from "@/data/default-exercises";
import { genId } from "@/lib/utils";

function loadExercises(): Exercise[] {
  try {
    const stored = storage.get<Exercise[]>(STORAGE_KEYS.EXERCISES);
    if (stored && stored.length > 0) return stored;
    storage.set(STORAGE_KEYS.EXERCISES, DEFAULT_EXERCISES);
    return DEFAULT_EXERCISES;
  } catch {
    return DEFAULT_EXERCISES;
  }
}

export function useExercises() {
  const [exercises, setExercises] = useState<Exercise[]>(loadExercises);

  const persist = (list: Exercise[]) => {
    setExercises(list);
    try {
      storage.set(STORAGE_KEYS.EXERCISES, list);
    } catch {
      // storage full or unavailable — UI already reflects the change
    }
  };

  const createExercise = (data: Omit<Exercise, "id" | "isCustom">) => {
    const exercise: Exercise = { ...data, id: genId(), isCustom: true };
    persist([...exercises, exercise]);
    return exercise;
  };

  const updateExercise = (id: string, data: Partial<Omit<Exercise, "id">>) => {
    persist(exercises.map((e) => (e.id === id ? { ...e, ...data } : e)));
  };

  const deleteExercise = (id: string) => {
    persist(exercises.filter((e) => e.id !== id));
  };

  return { exercises, createExercise, updateExercise, deleteExercise };
}
