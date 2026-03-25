import { useMemo } from "react";
import type { WorkoutRecord } from "@/types";
import { storage } from "@/lib/storage";
import { STORAGE_KEYS } from "@/lib/constants";

export interface MonthlyVolume {
  month: string; // "Ene", "Feb", ...
  volume: number; // kg
}

export interface DayFrequency {
  day: string; // "L", "M", "X", "J", "V", "S", "D"
  count: number;
}

export interface Stats {
  totalWorkouts: number;
  totalDays: number;
  totalTimeSeconds: number;
  avgDurationSeconds: number;
  monthlyVolume: MonthlyVolume[];
  frequencyByDay: DayFrequency[];
  allWorkouts: WorkoutRecord[];
}

const MONTH_NAMES = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
const DAY_LABELS = ["D", "L", "M", "X", "J", "V", "S"]; // 0=Sun

function compute(): Stats {
  try {
    const history = storage.get<WorkoutRecord[]>(STORAGE_KEYS.WORKOUT_HISTORY) ?? [];

    const totalWorkouts = history.length;
    const totalDays = new Set(history.map((r) => r.startedAt.slice(0, 10))).size;
    const totalTimeSeconds = history.reduce((sum, r) => sum + r.duration, 0);
    const avgDurationSeconds = totalWorkouts > 0 ? Math.round(totalTimeSeconds / totalWorkouts) : 0;

    // Monthly volume — last 6 months
    const now = new Date();
    const monthlyVolume: MonthlyVolume[] = [];
    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const year = d.getFullYear();
      const month = d.getMonth();
      const volume = Math.round(
        history
          .filter((r) => {
            const rd = new Date(r.startedAt);
            return rd.getFullYear() === year && rd.getMonth() === month;
          })
          .reduce((sum, r) => sum + r.totalVolume, 0)
      );
      monthlyVolume.push({ month: MONTH_NAMES[month], volume });
    }

    // Frequency by day of week — Mon first
    const dayCounts = new Array(7).fill(0);
    history.forEach((r) => {
      dayCounts[new Date(r.startedAt).getDay()]++;
    });
    const frequencyByDay: DayFrequency[] = [1, 2, 3, 4, 5, 6, 0].map((dow) => ({
      day: DAY_LABELS[dow],
      count: dayCounts[dow],
    }));

    return { totalWorkouts, totalDays, totalTimeSeconds, avgDurationSeconds, monthlyVolume, frequencyByDay, allWorkouts: history };
  } catch {
    return {
      totalWorkouts: 0,
      totalDays: 0,
      totalTimeSeconds: 0,
      avgDurationSeconds: 0,
      monthlyVolume: [],
      frequencyByDay: [],
      allWorkouts: [],
    };
  }
}

export function useStats(): Stats {
  return useMemo(compute, []);
}
