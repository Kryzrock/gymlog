import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Play, MoreVertical, Copy, Edit, Trash2, Dumbbell, Clock } from "lucide-react";
import type { Routine, Exercise } from "@/types";
import { CATEGORY_COLORS, DIFFICULTY_COLORS } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface RoutineCardProps {
  routine: Routine;
  exercises: Exercise[];
  onEdit: (routine: Routine) => void;
  onDuplicate: (routine: Routine) => void;
  onDelete: (routine: Routine) => void;
}

export function RoutineCard({
  routine,
  exercises,
  onEdit,
  onDuplicate,
  onDelete,
}: RoutineCardProps) {
  const navigate = useNavigate();
  const exerciseCount = routine.exerciseIds.length;
  const exerciseNames = routine.exerciseIds
    .map((id) => exercises.find((e) => e.id === id)?.name)
    .filter(Boolean)
    .slice(0, 3);

  return (
    <Card className="transition-shadow hover:shadow-md">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="space-y-2 flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <CardTitle className="text-base leading-tight">{routine.name}</CardTitle>
              {routine.isTemplate && (
                <Badge variant="outline" className="text-xs shrink-0">
                  Plantilla
                </Badge>
              )}
            </div>
            <div className="flex flex-wrap gap-1">
              <Badge className={cn("text-xs", CATEGORY_COLORS[routine.category])}>
                {routine.category.charAt(0).toUpperCase() + routine.category.slice(1)}
              </Badge>
              <Badge className={cn("text-xs", DIFFICULTY_COLORS[routine.difficulty])}>
                {routine.difficulty.charAt(0).toUpperCase() + routine.difficulty.slice(1)}
              </Badge>
            </div>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0 shrink-0">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onDuplicate(routine)}>
                <Copy className="h-4 w-4 mr-2" />
                Duplicar
              </DropdownMenuItem>
              {!routine.isTemplate && (
                <>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => onEdit(routine)}>
                    <Edit className="h-4 w-4 mr-2" />
                    Editar
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="text-destructive focus:text-destructive"
                    onClick={() => onDelete(routine)}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Eliminar
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        <p className="text-sm text-muted-foreground line-clamp-2">{routine.description}</p>

        {/* Stats */}
        <div className="flex gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Dumbbell className="h-3 w-3" />
            {exerciseCount} ejercicio{exerciseCount !== 1 ? "s" : ""}
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            ~{routine.estimatedDuration} min
          </div>
        </div>

        {/* Exercise preview */}
        {exerciseNames.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {exerciseNames.map((name) => (
              <Badge key={name} variant="secondary" className="text-xs">
                {name}
              </Badge>
            ))}
            {exerciseCount > 3 && (
              <Badge variant="secondary" className="text-xs">
                +{exerciseCount - 3} más
              </Badge>
            )}
          </div>
        )}

        <Button className="w-full" onClick={() => navigate(`/workout/${routine.id}`)}>
          <Play className="h-4 w-4 mr-2" />
          {routine.isTemplate ? "Usar plantilla" : "Iniciar entrenamiento"}
        </Button>
      </CardContent>
    </Card>
  );
}
