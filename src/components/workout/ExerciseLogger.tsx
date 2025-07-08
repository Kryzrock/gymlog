import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Minus, Plus, Check, History } from "lucide-react";

interface WorkoutSet {
  reps: number;
  weight: number;
  completed: boolean;
}

interface Exercise {
  id: string;
  name: string;
  muscleGroup: string;
  sets: WorkoutSet[];
  currentSet: number;
  lastWeight?: number;
}

interface ExerciseLoggerProps {
  exercise: Exercise;
  currentSet: WorkoutSet;
  onSetComplete: (reps: number, weight: number) => void;
}

export const ExerciseLogger = ({ 
  exercise, 
  currentSet, 
  onSetComplete 
}: ExerciseLoggerProps) => {
  const [reps, setReps] = useState(currentSet?.reps || 0);
  const [weight, setWeight] = useState(currentSet?.weight || exercise.lastWeight || 0);

  useEffect(() => {
    setReps(currentSet?.reps || 0);
    setWeight(currentSet?.weight || exercise.lastWeight || 0);
  }, [currentSet, exercise.lastWeight]);

  const handleWeightChange = (increment: number) => {
    setWeight(prev => Math.max(0, prev + increment));
  };

  const handleRepsChange = (increment: number) => {
    setReps(prev => Math.max(0, prev + increment));
  };

  const handleComplete = () => {
    if (reps > 0) {
      onSetComplete(reps, weight);
    }
  };

  const lastCompletedSet = exercise.sets
    .slice(0, exercise.currentSet)
    .filter(set => set.completed)
    .pop();

  return (
    <div className="space-y-4">
      {/* Previous Set Reference */}
      {lastCompletedSet && (
        <Card className="bg-muted/50">
          <CardContent className="p-3">
            <div className="flex items-center gap-2 text-sm">
              <History className="h-3 w-3 text-muted-foreground" />
              <span className="text-muted-foreground">Última serie:</span>
              <Badge variant="outline" className="text-xs">
                {lastCompletedSet.reps} reps × {lastCompletedSet.weight}kg
              </Badge>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Weight Input */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Peso (kg)</label>
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => handleWeightChange(-2.5)}
            disabled={weight <= 0}
          >
            <Minus className="h-3 w-3" />
          </Button>
          
          <div className="flex-1 relative">
            <Input
              type="number"
              value={weight}
              onChange={(e) => setWeight(Number(e.target.value))}
              className="text-center text-lg font-semibold"
              step="0.5"
              min="0"
            />
          </div>
          
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => handleWeightChange(2.5)}
          >
            <Plus className="h-3 w-3" />
          </Button>
        </div>
        
        {/* Quick weight buttons */}
        <div className="flex gap-1 justify-center">
          {[-5, -2.5, +2.5, +5].map((increment) => (
            <Button
              key={increment}
              variant="ghost"
              size="sm"
              className="text-xs px-2 h-6"
              onClick={() => handleWeightChange(increment)}
            >
              {increment > 0 ? '+' : ''}{increment}
            </Button>
          ))}
        </div>
      </div>

      {/* Reps Input */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Repeticiones</label>
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => handleRepsChange(-1)}
            disabled={reps <= 0}
          >
            <Minus className="h-3 w-3" />
          </Button>
          
          <div className="flex-1 relative">
            <Input
              type="number"
              value={reps}
              onChange={(e) => setReps(Number(e.target.value))}
              className="text-center text-lg font-semibold"
              min="0"
            />
          </div>
          
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => handleRepsChange(1)}
          >
            <Plus className="h-3 w-3" />
          </Button>
        </div>
        
        {/* Quick reps buttons */}
        <div className="flex gap-1 justify-center">
          {[8, 10, 12, 15].map((repCount) => (
            <Button
              key={repCount}
              variant="ghost"
              size="sm"
              className="text-xs px-2 h-6"
              onClick={() => setReps(repCount)}
            >
              {repCount}
            </Button>
          ))}
        </div>
      </div>

      {/* Complete Set Button */}
      <Button 
        className="w-full h-12 text-lg"
        onClick={handleComplete}
        disabled={reps <= 0}
      >
        <Check className="h-5 w-5 mr-2" />
        Completar Serie
      </Button>
    </div>
  );
};