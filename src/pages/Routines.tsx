import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Copy, Edit, Trash2, Calendar } from "lucide-react";
import { CreateRoutineDialog } from "@/components/routines/CreateRoutineDialog";
import { EditRoutineDialog } from "@/components/routines/EditRoutineDialog";
import { DeleteConfirmDialog } from "@/components/routines/DeleteConfirmDialog";
import { RoutineCard } from "@/components/routines/RoutineCard";

interface Routine {
  id: string;
  name: string;
  description: string;
  category: "fuerza" | "hipertrofia" | "resistencia";
  days: string[];
  exercises: number;
  estimatedDuration: string;
  isTemplate: boolean;
  lastUsed?: string;
}

const mockRoutines: Routine[] = [
  {
    id: "1",
    name: "Push Pull Legs",
    description: "Rutina dividida en 3 días enfocada en empuje, tirón y piernas",
    category: "hipertrofia",
    days: ["Lunes", "Miércoles", "Viernes"],
    exercises: 18,
    estimatedDuration: "75 min",
    isTemplate: true
  },
  {
    id: "2",
    name: "Full Body Beginner",
    description: "Rutina de cuerpo completo ideal para principiantes",
    category: "fuerza",
    days: ["Lunes", "Miércoles", "Viernes"],
    exercises: 8,
    estimatedDuration: "45 min",
    isTemplate: true
  },
  {
    id: "3",
    name: "Mi Rutina Personal",
    description: "Rutina personalizada enfocada en tren superior",
    category: "hipertrofia",
    days: ["Martes", "Jueves", "Sábado"],
    exercises: 12,
    estimatedDuration: "60 min",
    isTemplate: false,
    lastUsed: "Hace 2 días"
  }
];

const Routines = () => {
  const [routines, setRoutines] = useState<Routine[]>(mockRoutines);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedRoutine, setSelectedRoutine] = useState<Routine | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("todas");

  const categories = [
    { value: "todas", label: "Todas" },
    { value: "fuerza", label: "Fuerza" },
    { value: "hipertrofia", label: "Hipertrofia" },
    { value: "resistencia", label: "Resistencia" }
  ];

  const filteredRoutines = selectedCategory === "todas" 
    ? routines 
    : routines.filter(r => r.category === selectedCategory);

  const templates = filteredRoutines.filter(r => r.isTemplate);
  const personalRoutines = filteredRoutines.filter(r => !r.isTemplate);

  const handleCreateRoutine = (newRoutine: Omit<Routine, "id">) => {
    const routine: Routine = {
      ...newRoutine,
      id: Date.now().toString()
    };
    setRoutines(prev => [...prev, routine]);
    setIsCreateDialogOpen(false);
  };

  const handleDuplicateRoutine = (routine: Routine) => {
    const duplicated: Routine = {
      ...routine,
      id: Date.now().toString(),
      name: `${routine.name} (Copia)`,
      isTemplate: false
    };
    setRoutines(prev => [...prev, duplicated]);
  };

  const handleEditRoutine = (routine: Routine) => {
    setSelectedRoutine(routine);
    setIsEditDialogOpen(true);
  };

  const handleUpdateRoutine = (id: string, updatedRoutine: Omit<Routine, "id">) => {
    setRoutines(prev => prev.map(r => 
      r.id === id ? { ...updatedRoutine, id } : r
    ));
  };

  const handleDeleteRoutine = (id: string) => {
    const routine = routines.find(r => r.id === id);
    if (routine) {
      setSelectedRoutine(routine);
      setIsDeleteDialogOpen(true);
    }
  };

  const confirmDeleteRoutine = () => {
    if (selectedRoutine) {
      setRoutines(prev => prev.filter(r => r.id !== selectedRoutine.id));
      setSelectedRoutine(null);
    }
  };

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Rutinas</h1>
          <p className="text-muted-foreground">Gestiona tus rutinas de entrenamiento</p>
        </div>
        <Button onClick={() => setIsCreateDialogOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Nueva Rutina
        </Button>
      </div>

      {/* Category Filter */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {categories.map((category) => (
          <Button
            key={category.value}
            variant={selectedCategory === category.value ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory(category.value)}
            className="flex-shrink-0"
          >
            {category.label}
          </Button>
        ))}
      </div>

      {/* Personal Routines */}
      {personalRoutines.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Mis Rutinas</h2>
          <div className="grid gap-4">
            {personalRoutines.map((routine) => (
              <RoutineCard
                key={routine.id}
                routine={routine}
                onDuplicate={handleDuplicateRoutine}
                onEdit={handleEditRoutine}
                onDelete={handleDeleteRoutine}
              />
            ))}
          </div>
        </div>
      )}

      {/* Templates */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Plantillas</h2>
        <div className="grid gap-4">
          {templates.map((routine) => (
            <RoutineCard
              key={routine.id}
              routine={routine}
              onDuplicate={handleDuplicateRoutine}
              onEdit={handleEditRoutine}
              onDelete={handleDeleteRoutine}
            />
          ))}
        </div>
      </div>

      <CreateRoutineDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        onCreateRoutine={handleCreateRoutine}
      />

      <EditRoutineDialog
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        routine={selectedRoutine}
        onEditRoutine={handleUpdateRoutine}
      />

      <DeleteConfirmDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        routineName={selectedRoutine?.name || ""}
        onConfirm={confirmDeleteRoutine}
      />
    </div>
  );
};

export default Routines;