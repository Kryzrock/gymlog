import type { Routine } from "@/types";

export const DEFAULT_ROUTINES: Routine[] = [
  {
    id: "template-1",
    name: "Full Body — Principiante",
    description: "Rutina de cuerpo completo ideal para comenzar. Ejercicios básicos con peso corporal y barra.",
    exerciseIds: ["3", "6", "4", "8", "11"], // Flexiones, Sentadillas, Dominadas, Press Militar, Plancha
    category: "fuerza",
    difficulty: "principiante",
    estimatedDuration: 45,
    isTemplate: true,
    createdAt: new Date(0).toISOString(),
    updatedAt: new Date(0).toISOString(),
  },
  {
    id: "template-2",
    name: "Push — Pecho, Hombros y Tríceps",
    description: "Sesión de empuje enfocada en pectoral, deltoides y tríceps. Ideal para dividir tu semana en Push/Pull/Legs.",
    exerciseIds: ["1", "2", "8", "10"], // Press Banca Barra, Press Banca Mancuernas, Press Militar, Press Francés
    category: "hipertrofia",
    difficulty: "intermedio",
    estimatedDuration: 60,
    isTemplate: true,
    createdAt: new Date(0).toISOString(),
    updatedAt: new Date(0).toISOString(),
  },
  {
    id: "template-3",
    name: "Pull — Espalda y Bíceps",
    description: "Sesión de tracción centrada en espalda ancha y gruesa con trabajo de bíceps.",
    exerciseIds: ["4", "5", "9"], // Dominadas, Remo con Barra, Curl Bíceps
    category: "fuerza",
    difficulty: "intermedio",
    estimatedDuration: 50,
    isTemplate: true,
    createdAt: new Date(0).toISOString(),
    updatedAt: new Date(0).toISOString(),
  },
];
