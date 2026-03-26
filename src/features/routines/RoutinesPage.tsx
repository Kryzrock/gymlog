import { useState } from "react";
import { Plus, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/shared/EmptyState";
import { useRoutines } from "./hooks/useRoutines";
import { useExercises } from "@/features/exercises/hooks/useExercises";
import { RoutineCard } from "./RoutineCard";
import { RoutineFormModal } from "./RoutineFormModal";
import { DeleteConfirmDialog } from "./DeleteConfirmDialog";
import type { Category, Routine } from "@/types";

const CATEGORY_FILTERS: { value: Category | "todas"; label: string }[] = [
  { value: "todas", label: "Todas" },
  { value: "fuerza", label: "Fuerza" },
  { value: "hipertrofia", label: "Hipertrofia" },
  { value: "funcional", label: "Funcional" },
  { value: "cardio", label: "Cardio" },
];

export default function RoutinesPage() {
  const { routines, createRoutine, updateRoutine, duplicateRoutine, deleteRoutine } = useRoutines();
  const { exercises } = useExercises();

  const [categoryFilter, setCategoryFilter] = useState<Category | "todas">("todas");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingRoutine, setEditingRoutine] = useState<Routine | null>(null);
  const [deletingRoutine, setDeletingRoutine] = useState<Routine | null>(null);

  const filtered =
    categoryFilter === "todas"
      ? routines
      : routines.filter((r) => r.category === categoryFilter);

  const personalRoutines = filtered.filter((r) => !r.isTemplate);
  const templates = filtered.filter((r) => r.isTemplate);

  const handleEdit = (routine: Routine) => {
    setEditingRoutine(routine);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingRoutine(null);
  };

  const handleConfirmDelete = () => {
    if (deletingRoutine) {
      deleteRoutine(deletingRoutine.id);
      setDeletingRoutine(null);
    }
  };

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Rutinas</h1>
          <p className="text-sm text-muted-foreground">
            {routines.filter((r) => !r.isTemplate).length} personales ·{" "}
            {routines.filter((r) => r.isTemplate).length} plantillas
          </p>
        </div>
        <Button size="sm" onClick={() => setIsFormOpen(true)}>
          <Plus className="h-4 w-4 mr-1" />
          Nueva
        </Button>
      </div>

      {/* Category filter */}
      <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
        {CATEGORY_FILTERS.map((f) => (
          <Button
            key={f.value}
            variant={categoryFilter === f.value ? "default" : "outline"}
            size="sm"
            className="shrink-0 text-xs"
            onClick={() => setCategoryFilter(f.value)}
          >
            {f.label}
          </Button>
        ))}
      </div>

      {/* Mis Rutinas */}
      {personalRoutines.length > 0 && (
        <section className="space-y-3">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
            Mis Rutinas
          </h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {personalRoutines.map((routine) => (
              <RoutineCard
                key={routine.id}
                routine={routine}
                exercises={exercises}
                onEdit={handleEdit}
                onDuplicate={duplicateRoutine}
                onDelete={setDeletingRoutine}
              />
            ))}
          </div>
        </section>
      )}

      {/* Plantillas */}
      {templates.length > 0 && (
        <section className="space-y-3">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
            Plantillas
          </h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {templates.map((routine) => (
              <RoutineCard
                key={routine.id}
                routine={routine}
                exercises={exercises}
                onEdit={handleEdit}
                onDuplicate={duplicateRoutine}
                onDelete={setDeletingRoutine}
              />
            ))}
          </div>
        </section>
      )}

      {/* Empty state global */}
      {personalRoutines.length === 0 && templates.length === 0 && (
        <EmptyState
          icon={BookOpen}
          title="No hay rutinas"
          description={
            categoryFilter !== "todas"
              ? "No hay rutinas con esa categoría. Cambiá el filtro o creá una nueva."
              : "Creá tu primera rutina o duplicá una plantilla para empezar."
          }
          action={{ label: "Crear rutina", onClick: () => setIsFormOpen(true) }}
        />
      )}

      {/* Form modal */}
      <RoutineFormModal
        open={isFormOpen}
        onOpenChange={handleCloseForm}
        routine={editingRoutine}
        exercises={exercises}
        onCreate={createRoutine}
        onUpdate={updateRoutine}
      />

      {/* Delete confirm */}
      <DeleteConfirmDialog
        open={!!deletingRoutine}
        onOpenChange={(open) => !open && setDeletingRoutine(null)}
        itemName={deletingRoutine?.name ?? ""}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}
