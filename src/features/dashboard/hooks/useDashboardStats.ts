import { useMemo } from "react";
import type { WorkoutRecord, Exercise } from "@/types";
import { storage } from "@/lib/storage";
import { STORAGE_KEYS } from "@/lib/constants";
import { DEFAULT_EXERCISES } from "@/data/default-exercises";

export interface DailyVolume {
  day: string;   // "L", "M", "X"…
  volume: number;
}

export interface DashboardStats {
  workoutsThisMonth: number;
  weeklyVolume: number;        // kg
  totalExercises: number;
  streak: number;              // consecutive days
  recentWorkouts: WorkoutRecord[];
  dailyVolume: DailyVolume[];  // últimos 7 días
}

function compute(): DashboardStats {
  try {
    const history = storage.get<WorkoutRecord[]>(STORAGE_KEYS.WORKOUT_HISTORY) ?? [];
    const exercises = storage.get<Exercise[]>(STORAGE_KEYS.EXERCISES) ?? DEFAULT_EXERCISES;

    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

    const workoutsThisMonth = history.filter(
      (r) => new Date(r.startedAt) >= startOfMonth
    ).length;

    const weeklyVolume = Math.round(
      history
        .filter((r) => new Date(r.startedAt) >= sevenDaysAgo)
        .reduce((sum, r) => sum + r.totalVolume, 0)
    );

    // Streak: consecutive days (from today backwards) with at least 1 workout
    const workoutDays = new Set(history.map((r) => r.startedAt.slice(0, 10)));
    let streak = 0;
    const cursor = new Date(now);
    cursor.setHours(0, 0, 0, 0);
    while (workoutDays.has(cursor.toISOString().slice(0, 10))) {
      streak++;
      cursor.setDate(cursor.getDate() - 1);
    }

    // Daily volume — last 7 days
    const DAY_LABELS = ["D", "L", "M", "X", "J", "V", "S"];
    const dailyVolume: DailyVolume[] = Array.from({ length: 7 }, (_, i) => {
      const d = new Date(now);
      d.setDate(d.getDate() - (6 - i));
      const dateStr = d.toISOString().slice(0, 10);
      const volume = Math.round(
        history
          .filter((r) => r.startedAt.slice(0, 10) === dateStr)
          .reduce((sum, r) => sum + r.totalVolume, 0)
      );
      return { day: DAY_LABELS[d.getDay()], volume };
    });

    return {
      workoutsThisMonth,
      weeklyVolume,
      totalExercises: exercises.length,
      streak,
      recentWorkouts: history.slice(0, 3),
      dailyVolume,
    };
  } catch {
    return {
      workoutsThisMonth: 0,
      weeklyVolume: 0,
      totalExercises: 0,
      streak: 0,
      recentWorkouts: [],
      dailyVolume: [],
    };
  }
}

export function useDashboardStats(): DashboardStats {
  return useMemo(compute, []);
}
