import type { Category, Difficulty } from "@/types";

export const CATEGORY_COLORS: Record<Category, string> = {
  fuerza: "bg-red-500/20 text-red-400",
  hipertrofia: "bg-purple-500/20 text-purple-400",
  funcional: "bg-green-500/20 text-green-400",
  cardio: "bg-orange-500/20 text-orange-400",
};

export const DIFFICULTY_COLORS: Record<Difficulty, string> = {
  principiante: "bg-green-500/20 text-green-400",
  intermedio: "bg-yellow-500/20 text-yellow-400",
  avanzado: "bg-red-500/20 text-red-400",
};

export const MUSCLE_GROUPS = [
  "Pectoral mayor",
  "Dorsal ancho",
  "Romboides",
  "Trapecio",
  "Trapecio superior",
  "Trapecio medio",
  "Deltoides anterior",
  "Deltoides medio",
  "Deltoides posterior",
  "Bíceps",
  "Braquial",
  "Braquiorradial",
  "Tríceps",
  "Cuádriceps",
  "Isquiotibiales",
  "Glúteos",
  "Pantorrillas",
  "Core",
  "Oblicuos",
  "Recto abdominal",
  "Transverso abdominal",
  "Erectores espinales",
  "Erector espinal",
] as const;

export const EQUIPMENT_TYPES = [
  "Peso corporal",
  "Barra",
  "Mancuernas",
  "Máquina",
  "Polea",
  "Bandas elásticas",
  "Kettlebell",
  "TRX",
  "Banco",
  "Rack",
  "Discos",
  "Barra de dominadas",
  "Barra EZ",
] as const;

export const DAYS_OF_WEEK = [
  "Domingo",
  "Lunes",
  "Martes",
  "Miércoles",
  "Jueves",
  "Viernes",
  "Sábado",
] as const;

export const STORAGE_KEYS = {
  EXERCISES: "exercises",
  ROUTINES: "routines",
  WORKOUT_HISTORY: "workout-history",
} as const;
