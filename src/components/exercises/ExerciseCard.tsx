import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Clock, 
  Target, 
  Dumbbell, 
  Star, 
  MoreVertical,
  Play,
  Eye,
  Edit,
  Heart
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Exercise {
  id: string;
  name: string;
  description: string;
  technique: string[];
  muscleGroups: {
    primary: string[];
    secondary: string[];
  };
  equipment: string[];
  difficulty: 'principiante' | 'intermedio' | 'avanzado';
  category: 'fuerza' | 'hipertrofia' | 'resistencia' | 'funcional';
  instructions: string[];
  tips: string[];
  variations: string[];
  targetSets: number;
  targetReps: string;
  restTime: number;
  isCustom: boolean;
  createdBy?: string;
  imageUrl?: string;
  videoUrl?: string;
}

interface ExerciseCardProps {
  exercise: Exercise;
  onAddToWorkout?: (exerciseId: string) => void;
  onViewDetails?: (exerciseId: string) => void;
  onEdit?: (exerciseId: string) => void;
  onToggleFavorite?: (exerciseId: string) => void;
}

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case "principiante":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
    case "intermedio":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
    case "avanzado":
      return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
  }
};

const getCategoryColor = (category: string) => {
  switch (category) {
    case "fuerza":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
    case "hipertrofia":
      return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200";
    case "resistencia":
      return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200";
    case "funcional":
      return "bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-200";
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
  }
};

export const ExerciseCard = ({ 
  exercise, 
  onAddToWorkout, 
  onViewDetails, 
  onEdit, 
  onToggleFavorite 
}: ExerciseCardProps) => {
  return (
    <Card className="hover:shadow-md transition-shadow animate-fade-in">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-2 flex-1">
            <div className="flex items-center gap-2">
              <CardTitle className="text-lg leading-tight">{exercise.name}</CardTitle>
              {exercise.isCustom && (
                <Badge variant="outline" className="text-xs">
                  <Star className="h-3 w-3 mr-1" />
                  Personal
                </Badge>
              )}
            </div>
            
            <div className="flex flex-wrap gap-1">
              <Badge className={`${getDifficultyColor(exercise.difficulty)} text-xs`}>
                {exercise.difficulty.charAt(0).toUpperCase() + exercise.difficulty.slice(1)}
              </Badge>
              <Badge className={`${getCategoryColor(exercise.category)} text-xs`}>
                {exercise.category.charAt(0).toUpperCase() + exercise.category.slice(1)}
              </Badge>
            </div>
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onViewDetails?.(exercise.id)}>
                <Eye className="h-4 w-4 mr-2" />
                Ver Detalles
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onToggleFavorite?.(exercise.id)}>
                <Heart className="h-4 w-4 mr-2" />
                Favorito
              </DropdownMenuItem>
              {exercise.isCustom && (
                <DropdownMenuItem onClick={() => onEdit?.(exercise.id)}>
                  <Edit className="h-4 w-4 mr-2" />
                  Editar
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground line-clamp-2">
          {exercise.description}
        </p>
        
        {/* Muscle Groups */}
        <div className="space-y-1">
          <div className="text-xs font-medium text-muted-foreground">Músculos principales:</div>
          <div className="flex flex-wrap gap-1">
            {exercise.muscleGroups.primary.map((muscle, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {muscle}
              </Badge>
            ))}
          </div>
        </div>
        
        {/* Equipment */}
        <div className="space-y-1">
          <div className="text-xs font-medium text-muted-foreground">Equipo:</div>
          <div className="flex flex-wrap gap-1">
            {exercise.equipment.slice(0, 2).map((eq, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {eq}
              </Badge>
            ))}
            {exercise.equipment.length > 2 && (
              <Badge variant="outline" className="text-xs">
                +{exercise.equipment.length - 2} más
              </Badge>
            )}
          </div>
        </div>
        
        {/* Stats */}
        <div className="grid grid-cols-3 gap-2 text-xs">
          <div className="flex items-center gap-1">
            <Target className="h-3 w-3 text-muted-foreground" />
            <span className="text-muted-foreground">{exercise.targetSets} series</span>
          </div>
          <div className="flex items-center gap-1">
            <Dumbbell className="h-3 w-3 text-muted-foreground" />
            <span className="text-muted-foreground">{exercise.targetReps} reps</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3 text-muted-foreground" />
            <span className="text-muted-foreground">{exercise.restTime}s</span>
          </div>
        </div>
        
        {/* Actions */}
        <div className="flex gap-2 pt-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1"
            onClick={() => onViewDetails?.(exercise.id)}
          >
            <Eye className="h-3 w-3 mr-1" />
            Ver
          </Button>
          <Button 
            size="sm" 
            className="flex-1"
            onClick={() => onAddToWorkout?.(exercise.id)}
          >
            <Play className="h-3 w-3 mr-1" />
            Añadir
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};