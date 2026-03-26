import { useMemo, useState } from "react";
import { Plus, Dumbbell, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { EmptyState } from "@/components/shared/EmptyState";
import { useExercises } from "./hooks/useExercises";
import { ExerciseCard } from "./ExerciseCard";
import { ExerciseFilters, type ExerciseFilterState } from "./ExerciseFilters";
import { ExerciseFormModal } from "./ExerciseFormModal";
import type { Exercise } from "@/types";

const DEFAULT_FILTERS: ExerciseFilterState = {
  search: "",
  muscleGroup: "todos",
  difficulty: "todos",
  category: "todos",
};

export default function ExercisesPage() {
  const { exercises, createExercise, updateExercise, deleteExercise } = useExercises();
  const [filters, setFilters] = useState<ExerciseFilterState>(DEFAULT_FILTERS);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingExercise, setEditingExercise] = useState<Exercise | null>(null);

  const filtered = useMemo(() => {
    return exercises.filter((e) => {
      const q = filters.search.toLowerCase();
      const matchesSearch =
        !q || e.name.toLowerCase().includes(q) || e.description.toLowerCase().includes(q);
      const matchesMuscle =
        filters.muscleGroup === "todos" ||
        e.muscleGroups.primary.some((m) =>
          m.toLowerCase().includes(filters.muscleGroup.toLowerCase())
        );
      const matchesDifficulty =
        filters.difficulty === "todos" || e.difficulty === filters.difficulty;
      const matchesCategory =
        filters.category === "todos" || e.category === filters.category;
      return matchesSearch && matchesMuscle && matchesDifficulty && matchesCategory;
    });
  }, [exercises, filters]);

  const handleEdit = (exercise: Exercise) => {
    setEditingExercise(exercise);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingExercise(null);
  };

  const customCount = exercises.filter((e) => e.isCustom).length;

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Ejercicios</h1>
          <p className="text-sm text-muted-foreground">
            {exercises.length} en biblioteca
            {customCount > 0 && ` · ${customCount} personalizados`}
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          {/* Search — solo desktop, en el header */}
          <div className="relative hidden lg:block w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar ejercicios..."
              value={filters.search}
              onChange={(e) => setFilters({ ...filters, search: e.target.value })}
              className="pl-10 pr-10"
            />
            {filters.search && (
              <button
                onClick={() => setFilters({ ...filters, search: "" })}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
          <Button size="sm" onClick={() => setIsFormOpen(true)}>
            <Plus className="h-4 w-4 mr-1" />
            Nuevo
          </Button>
        </div>
      </div>

      {/* Mobile: filtros como card apilada */}
      <div className="lg:hidden">
        <Card>
          <CardContent className="pt-4 pb-4">
            <ExerciseFilters
              filters={filters}
              onChange={setFilters}
              onClear={() => setFilters(DEFAULT_FILTERS)}
            />
          </CardContent>
        </Card>
      </div>

      {/* Desktop: dos columnas | Mobile: solo grid */}
      <div className="lg:grid lg:grid-cols-[220px_1fr] lg:gap-6 lg:items-start">

        {/* Sidebar filtros — solo desktop */}
        <aside className="hidden lg:block sticky top-4">
          <Card>
            <CardContent className="pt-4 pb-4">
              <ExerciseFilters
                filters={filters}
                onChange={setFilters}
                onClear={() => setFilters(DEFAULT_FILTERS)}
                showSearch={false}
              />
            </CardContent>
          </Card>
        </aside>

        {/* Contenido principal */}
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            {filtered.length} resultado{filtered.length !== 1 ? "s" : ""}
          </p>

          {filtered.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filtered.map((exercise) => (
                <ExerciseCard
                  key={exercise.id}
                  exercise={exercise}
                  onEdit={handleEdit}
                  onDelete={deleteExercise}
                />
              ))}
            </div>
          ) : (
            <EmptyState
              icon={Dumbbell}
              title="No se encontraron ejercicios"
              description="Ajustá los filtros o creá tu propio ejercicio personalizado."
              action={{ label: "Limpiar filtros", onClick: () => setFilters(DEFAULT_FILTERS) }}
            />
          )}
        </div>
      </div>

      <ExerciseFormModal
        open={isFormOpen}
        onOpenChange={handleCloseForm}
        exercise={editingExercise}
        onCreate={createExercise}
        onUpdate={updateExercise}
      />
    </div>
  );
}
