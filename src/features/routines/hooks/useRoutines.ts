import { useState } from "react";
import type { Routine } from "@/types";
import { storage } from "@/lib/storage";
import { STORAGE_KEYS } from "@/lib/constants";
import { DEFAULT_ROUTINES } from "@/data/default-routines";
import { genId } from "@/lib/utils";

function loadRoutines(): Routine[] {
  try {
    const stored = storage.get<Routine[]>(STORAGE_KEYS.ROUTINES);
    if (stored && stored.length > 0) return stored;
    storage.set(STORAGE_KEYS.ROUTINES, DEFAULT_ROUTINES);
    return DEFAULT_ROUTINES;
  } catch {
    return DEFAULT_ROUTINES;
  }
}

export function useRoutines() {
  const [routines, setRoutines] = useState<Routine[]>(loadRoutines);

  const persist = (list: Routine[]) => {
    setRoutines(list);
    try {
      storage.set(STORAGE_KEYS.ROUTINES, list);
    } catch {
      // storage full or unavailable — UI already reflects the change
    }
  };

  const createRoutine = (data: Omit<Routine, "id" | "isTemplate" | "createdAt" | "updatedAt">) => {
    const now = new Date().toISOString();
    const routine: Routine = {
      ...data,
      id: genId(),
      isTemplate: false,
      createdAt: now,
      updatedAt: now,
    };
    persist([...routines, routine]);
    return routine;
  };

  const updateRoutine = (id: string, data: Partial<Omit<Routine, "id" | "createdAt">>) => {
    persist(
      routines.map((r) =>
        r.id === id ? { ...r, ...data, updatedAt: new Date().toISOString() } : r
      )
    );
  };

  const duplicateRoutine = (routine: Routine) => {
    const now = new Date().toISOString();
    const copy: Routine = {
      ...routine,
      id: genId(),
      name: `${routine.name} (Copia)`,
      isTemplate: false,
      createdAt: now,
      updatedAt: now,
    };
    persist([...routines, copy]);
    return copy;
  };

  const deleteRoutine = (id: string) => {
    persist(routines.filter((r) => r.id !== id));
  };

  return { routines, createRoutine, updateRoutine, duplicateRoutine, deleteRoutine };
}
