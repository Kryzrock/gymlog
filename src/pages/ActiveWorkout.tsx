import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Pause, Play, Square, Clock } from "lucide-react";
import { WorkoutTimer } from "@/components/workout/WorkoutTimer";
import { ExerciseLogger } from "@/components/workout/ExerciseLogger";
import { useToast } from "@/hooks/use-toast";

interface Exercise {
  id: string;
  name: string;
  muscleGroup: string;
  targetSets: number;
  reps: string;
  restTime: number; // seconds
  lastWeight?: number;
}

interface WorkoutSet {
  reps: number;
  weight: number;
  completed: boolean;
}

interface WorkoutExercise extends Exercise {
  sets: WorkoutSet[];
  currentSet: number;
}

const mockExercises: Exercise[] = [
  {
    id: "1",
    name: "Press de Banca",
    muscleGroup: "Pecho",
    targetSets: 4,
    reps: "8-12",
    restTime: 180,
    lastWeight: 80
  },
  {
    id: "2",
    name: "Press Militar",
    muscleGroup: "Hombros", 
    targetSets: 3,
    reps: "10-12",
    restTime: 120,
    lastWeight: 45
  },
  {
    id: "3",
    name: "Fondos en Paralelas",
    muscleGroup: "Pecho",
    targetSets: 3,
    reps: "12-15",
    restTime: 90
  }
];

const ActiveWorkout = () => {
  const navigate = useNavigate();
  const { routineId } = useParams();
  const { toast } = useToast();
  
  const [workoutExercises, setWorkoutExercises] = useState<WorkoutExercise[]>([]);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [workoutStartTime] = useState(new Date());
  const [workoutDuration, setWorkoutDuration] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isRestMode, setIsRestMode] = useState(false);
  const [restTimeLeft, setRestTimeLeft] = useState(0);

  // Initialize workout exercises
  useEffect(() => {
    const exercises: WorkoutExercise[] = mockExercises.map(exercise => ({
      ...exercise,
      sets: Array(exercise.targetSets).fill(null).map(() => ({
        reps: 0,
        weight: exercise.lastWeight || 0,
        completed: false
      })),
      currentSet: 0
    }));
    setWorkoutExercises(exercises);
  }, [routineId]);

  // Workout duration timer
  useEffect(() => {
    if (isPaused) return;
    
    const interval = setInterval(() => {
      setWorkoutDuration(Math.floor((Date.now() - workoutStartTime.getTime()) / 1000));
    }, 1000);

    return () => clearInterval(interval);
  }, [workoutStartTime, isPaused]);

  const currentExercise = workoutExercises[currentExerciseIndex];
  const currentSet = currentExercise?.sets[currentExercise.currentSet];

  const handleSetComplete = (exerciseIndex: number, setIndex: number, reps: number, weight: number) => {
    setWorkoutExercises(prev => {
      const updated = [...prev];
      updated[exerciseIndex].sets[setIndex] = {
        reps,
        weight,
        completed: true
      };
      
      // Move to next set or exercise
      if (setIndex < updated[exerciseIndex].sets.length - 1) {
        updated[exerciseIndex].currentSet = setIndex + 1;
      }
      
      return updated;
    });

    // Start rest timer
    if (currentExercise && setIndex < currentExercise.sets.length - 1) {
      setIsRestMode(true);
      setRestTimeLeft(currentExercise.restTime);
    }

    toast({
      title: "Serie completada",
      description: `${reps} reps con ${weight}kg registradas`
    });
  };

  const handleNextExercise = () => {
    if (currentExerciseIndex < workoutExercises.length - 1) {
      setCurrentExerciseIndex(prev => prev + 1);
      setIsRestMode(false);
      setRestTimeLeft(0);
    }
  };

  const handlePreviousExercise = () => {
    if (currentExerciseIndex > 0) {
      setCurrentExerciseIndex(prev => prev - 1);
      setIsRestMode(false);
      setRestTimeLeft(0);
    }
  };

  const handleFinishWorkout = () => {
    // TODO: Save workout data
    toast({
      title: "¡Entrenamiento completado!",
      description: `Duración: ${Math.floor(workoutDuration / 60)} minutos`
    });
    navigate("/");
  };

  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  const completedSets = workoutExercises.reduce((total, exercise) => {
    return total + exercise.sets.filter(set => set.completed).length;
  }, 0);

  const totalSets = workoutExercises.reduce((total, exercise) => {
    return total + exercise.sets.length;
  }, 0);

  if (!currentExercise) {
    return (
      <div className="p-4">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">Cargando entrenamiento...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background border-b p-4">
        <div className="flex items-center justify-between mb-4">
          <Button variant="ghost" size="sm" onClick={() => navigate("/routines")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Salir
          </Button>
          
          <div className="text-center">
            <div className="text-sm text-muted-foreground">Duración</div>
            <div className="font-mono text-lg font-semibold">{formatDuration(workoutDuration)}</div>
          </div>
          
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => setIsPaused(!isPaused)}
          >
            {isPaused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
          </Button>
        </div>

        {/* Progress */}
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">
            Ejercicio {currentExerciseIndex + 1} de {workoutExercises.length}
          </span>
          <span className="text-muted-foreground">
            {completedSets}/{totalSets} series
          </span>
        </div>
        
        <div className="w-full bg-secondary rounded-full h-2 mt-2">
          <div 
            className="bg-primary h-2 rounded-full transition-all duration-300"
            style={{ width: `${(completedSets / totalSets) * 100}%` }}
          />
        </div>
      </div>

      {/* Rest Timer */}
      {isRestMode && (
        <WorkoutTimer
          duration={currentExercise.restTime}
          timeLeft={restTimeLeft}
          onTimeUpdate={setRestTimeLeft}
          onComplete={() => {
            setIsRestMode(false);
            setRestTimeLeft(0);
          }}
        />
      )}

      {/* Current Exercise */}
      <div className="p-4 space-y-4">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl">{currentExercise.name}</CardTitle>
                <Badge variant="secondary" className="mt-1">
                  {currentExercise.muscleGroup}
                </Badge>
              </div>
              <div className="text-right text-sm text-muted-foreground">
                <div>Serie {currentExercise.currentSet + 1} de {currentExercise.sets.length}</div>
                <div>{currentExercise.reps} reps</div>
              </div>
            </div>
          </CardHeader>
          
          <CardContent>
            <ExerciseLogger
              exercise={currentExercise}
              currentSet={currentSet}
              onSetComplete={(reps, weight) => 
                handleSetComplete(currentExerciseIndex, currentExercise.currentSet, reps, weight)
              }
            />
          </CardContent>
        </Card>

        {/* Exercise Navigation */}
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            className="flex-1"
            disabled={currentExerciseIndex === 0}
            onClick={handlePreviousExercise}
          >
            Anterior
          </Button>
          
          {currentExerciseIndex === workoutExercises.length - 1 ? (
            <Button 
              className="flex-1"
              onClick={handleFinishWorkout}
            >
              <Square className="h-4 w-4 mr-2" />
              Finalizar
            </Button>
          ) : (
            <Button 
              className="flex-1"
              onClick={handleNextExercise}
            >
              Siguiente
            </Button>
          )}
        </div>

        {/* Exercise History */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Series Registradas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {currentExercise.sets.map((set, index) => (
                <div 
                  key={index}
                  className={`flex items-center justify-between p-3 rounded-lg border ${
                    set.completed ? 'bg-primary/5 border-primary/20' : 'bg-muted/50'
                  }`}
                >
                  <span className="font-medium">Serie {index + 1}</span>
                  {set.completed ? (
                    <span className="text-sm">
                      {set.reps} reps × {set.weight}kg
                    </span>
                  ) : (
                    <span className="text-sm text-muted-foreground">
                      {index === currentExercise.currentSet ? 'Actual' : 'Pendiente'}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ActiveWorkout;