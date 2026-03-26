import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";
import type { Difficulty, Category } from "@/types";

export interface ExerciseFilterState {
  search: string;
  muscleGroup: string;
  difficulty: Difficulty | "todos";
  category: Category | "todos";
}

interface ExerciseFiltersProps {
  filters: ExerciseFilterState;
  onChange: (filters: ExerciseFilterState) => void;
  onClear: () => void;
  showSearch?: boolean;
}

const MUSCLE_OPTIONS = [
  { value: "todos", label: "Todos" },
  { value: "Pectoral", label: "Pecho" },
  { value: "Dorsal", label: "Espalda" },
  { value: "Cuádriceps", label: "Piernas" },
  { value: "Deltoides", label: "Hombros" },
  { value: "Bíceps", label: "Brazos" },
  { value: "Core", label: "Core" },
];

const DIFFICULTY_OPTIONS: { value: Difficulty | "todos"; label: string }[] = [
  { value: "todos", label: "Todos" },
  { value: "principiante", label: "Principiante" },
  { value: "intermedio", label: "Intermedio" },
  { value: "avanzado", label: "Avanzado" },
];

const CATEGORY_OPTIONS: { value: Category | "todos"; label: string }[] = [
  { value: "todos", label: "Todos" },
  { value: "fuerza", label: "Fuerza" },
  { value: "hipertrofia", label: "Hipertrofia" },
  { value: "funcional", label: "Funcional" },
  { value: "cardio", label: "Cardio" },
];

export function ExerciseFilters({ filters, onChange, onClear, showSearch = true }: ExerciseFiltersProps) {
  const isActive =
    !!filters.search ||
    filters.muscleGroup !== "todos" ||
    filters.difficulty !== "todos" ||
    filters.category !== "todos";

  return (
    <div className="space-y-4">
      {/* Search — opcional (oculto en sidebar desktop) */}
      {showSearch && (
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar ejercicios..."
            value={filters.search}
            onChange={(e) => onChange({ ...filters, search: e.target.value })}
            className="pl-10 pr-10"
          />
          {filters.search && (
            <button
              onClick={() => onChange({ ...filters, search: "" })}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      )}

      {/* Muscle group */}
      <div className="space-y-1.5">
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Músculo</p>
        <div className="flex flex-wrap gap-1">
          {MUSCLE_OPTIONS.map((opt) => (
            <Button
              key={opt.value}
              variant={filters.muscleGroup === opt.value ? "default" : "outline"}
              size="sm"
              className="text-xs h-7"
              onClick={() => onChange({ ...filters, muscleGroup: opt.value })}
            >
              {opt.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Difficulty */}
      <div className="space-y-1.5">
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Dificultad</p>
        <div className="flex flex-wrap gap-1">
          {DIFFICULTY_OPTIONS.map((opt) => (
            <Button
              key={opt.value}
              variant={filters.difficulty === opt.value ? "default" : "outline"}
              size="sm"
              className="text-xs h-7"
              onClick={() => onChange({ ...filters, difficulty: opt.value })}
            >
              {opt.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Category */}
      <div className="space-y-1.5">
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Categoría</p>
        <div className="flex flex-wrap gap-1">
          {CATEGORY_OPTIONS.map((opt) => (
            <Button
              key={opt.value}
              variant={filters.category === opt.value ? "default" : "outline"}
              size="sm"
              className="text-xs h-7"
              onClick={() => onChange({ ...filters, category: opt.value })}
            >
              {opt.label}
            </Button>
          ))}
        </div>
      </div>

      {isActive && (
        <Button
          variant="ghost"
          size="sm"
          onClick={onClear}
          className="w-full text-xs text-muted-foreground"
        >
          <X className="h-3 w-3 mr-1" />
          Limpiar filtros
        </Button>
      )}
    </div>
  );
}
