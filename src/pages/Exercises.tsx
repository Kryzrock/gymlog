import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { 
  Search, 
  Plus, 
  Filter,
  Dumbbell,
  Target,
  Clock,
  User,
  Star
} from "lucide-react";
import { ExerciseCard } from "@/components/exercises/ExerciseCard";
import { CreateExerciseDialog } from "@/components/exercises/CreateExerciseDialog";
import { exercisesData } from "@/data/exercises";

const Exercises = () => {
  const [exercises] = useState(exercisesData);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMuscleGroup, setSelectedMuscleGroup] = useState("todos");
  const [selectedEquipment, setSelectedEquipment] = useState("todos");
  const [selectedDifficulty, setSelectedDifficulty] = useState("todos");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  const muscleGroups = [
    { value: "todos", label: "Todos" },
    { value: "pecho", label: "Pecho" },
    { value: "espalda", label: "Espalda" },
    { value: "piernas", label: "Piernas" },
    { value: "hombros", label: "Hombros" },
    { value: "brazos", label: "Brazos" },
    { value: "core", label: "Core" }
  ];

  const equipmentTypes = [
    { value: "todos", label: "Todos" },
    { value: "peso corporal", label: "Peso Corporal" },
    { value: "mancuernas", label: "Mancuernas" },
    { value: "barra", label: "Barra" },
    { value: "máquinas", label: "Máquinas" },
    { value: "poleas", label: "Poleas" }
  ];

  const difficultyLevels = [
    { value: "todos", label: "Todos" },
    { value: "principiante", label: "Principiante" },
    { value: "intermedio", label: "Intermedio" },
    { value: "avanzado", label: "Avanzado" }
  ];

  // Filter exercises
  const filteredExercises = exercises.filter(exercise => {
    const matchesSearch = exercise.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         exercise.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesMuscleGroup = selectedMuscleGroup === "todos" ||
                              exercise.muscleGroups.primary.some(group => 
                                group.toLowerCase().includes(selectedMuscleGroup.toLowerCase())
                              );
    
    const matchesEquipment = selectedEquipment === "todos" ||
                           exercise.equipment.some(eq => 
                             eq.toLowerCase().includes(selectedEquipment.toLowerCase())
                           );
    
    const matchesDifficulty = selectedDifficulty === "todos" ||
                            exercise.difficulty === selectedDifficulty;

    return matchesSearch && matchesMuscleGroup && matchesEquipment && matchesDifficulty;
  });

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Biblioteca de Ejercicios</h1>
          <p className="text-muted-foreground">
            Explora y gestiona tu colección de ejercicios
          </p>
        </div>
        <Button onClick={() => setIsCreateDialogOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Nuevo Ejercicio
        </Button>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader className="pb-4">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            <CardTitle className="text-lg">Filtros</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar ejercicios..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <Separator />

          {/* Filter Groups */}
          <div className="grid gap-4 md:grid-cols-3">
            {/* Muscle Groups */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Grupo Muscular</label>
              <div className="flex flex-wrap gap-1">
                {muscleGroups.map((group) => (
                  <Button
                    key={group.value}
                    variant={selectedMuscleGroup === group.value ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedMuscleGroup(group.value)}
                    className="text-xs"
                  >
                    {group.label}
                  </Button>
                ))}
              </div>
            </div>

            {/* Equipment */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Equipo</label>
              <div className="flex flex-wrap gap-1">
                {equipmentTypes.map((equipment) => (
                  <Button
                    key={equipment.value}
                    variant={selectedEquipment === equipment.value ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedEquipment(equipment.value)}
                    className="text-xs"
                  >
                    {equipment.label}
                  </Button>
                ))}
              </div>
            </div>

            {/* Difficulty */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Dificultad</label>
              <div className="flex flex-wrap gap-1">
                {difficultyLevels.map((difficulty) => (
                  <Button
                    key={difficulty.value}
                    variant={selectedDifficulty === difficulty.value ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedDifficulty(difficulty.value)}
                    className="text-xs"
                  >
                    {difficulty.label}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">
            Ejercicios ({filteredExercises.length})
          </h2>
          
          {/* Stats */}
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <User className="h-3 w-3" />
              <span>{exercises.filter(e => e.isCustom).length} personalizados</span>
            </div>
            <div className="flex items-center gap-1">
              <Star className="h-3 w-3" />
              <span>{exercises.filter(e => !e.isCustom).length} predefinidos</span>
            </div>
          </div>
        </div>

        {/* Exercise Grid */}
        {filteredExercises.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredExercises.map((exercise) => (
              <ExerciseCard key={exercise.id} exercise={exercise} />
            ))}
          </div>
        ) : (
          <Card className="text-center py-12">
            <CardContent>
              <Dumbbell className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-semibold mb-2">No se encontraron ejercicios</h3>
              <p className="text-muted-foreground mb-4">
                Intenta ajustar los filtros o buscar otros términos
              </p>
              <Button variant="outline" onClick={() => {
                setSearchTerm("");
                setSelectedMuscleGroup("todos");
                setSelectedEquipment("todos");
                setSelectedDifficulty("todos");
              }}>
                Limpiar Filtros
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      <CreateExerciseDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        onCreateExercise={(exercise) => {
          // In a real app, this would be handled by the data layer
          console.log("New exercise:", exercise);
          setIsCreateDialogOpen(false);
        }}
      />
    </div>
  );
};

export default Exercises;