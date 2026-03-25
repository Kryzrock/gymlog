export type Difficulty = "principiante" | "intermedio" | "avanzado";
export type Category = "fuerza" | "hipertrofia" | "funcional" | "cardio";

export interface Exercise {
  id: string;
  name: string;
  description: string;
  technique: string[];
  muscleGroups: {
    primary: string[];
    secondary: string[];
  };
  equipment: string[];
  difficulty: Difficulty;
  category: Category;
  instructions: string[];
  tips: string[];
  variations: string[];
  targetSets: number;
  targetReps: string;
  restTime: number; // seconds
  isCustom: boolean;
}

export interface Routine {
  id: string;
  name: string;
  description: string;
  exerciseIds: string[];
  category: Category;
  difficulty: Difficulty;
  estimatedDuration: number; // minutes
  isTemplate: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface WorkoutSet {
  id: string;
  setNumber: number;
  weight: number; // kg
  reps: number;
  duration?: number; // seconds, for timed exercises
  completed: boolean;
  notes?: string;
}

export interface WorkoutExercise {
  exerciseId: string;
  exerciseName: string;
  order: number;
  sets: WorkoutSet[];
}

export interface WorkoutRecord {
  id: string;
  routineId: string;
  routineName: string;
  startedAt: string;
  finishedAt: string;
  duration: number; // seconds
  exercises: WorkoutExercise[];
  notes?: string;
  totalVolume: number; // sum of (weight * reps) across all sets
}
