import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Clock,
  Target,
  Dumbbell,
  Star,
  MoreVertical,
  ChevronDown,
  ChevronUp,
  Trash2,
  Edit,
} from "lucide-react";
import type { Exercise } from "@/types";
import { CATEGORY_COLORS, DIFFICULTY_COLORS } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface ExerciseCardProps {
  exercise: Exercise;
  onEdit?: (exercise: Exercise) => void;
  onDelete?: (id: string) => void;
}

export function ExerciseCard({ exercise, onEdit, onDelete }: ExerciseCardProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <Card className="transition-shadow hover:shadow-md">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="space-y-2 flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <CardTitle className="text-base leading-tight">{exercise.name}</CardTitle>
              {exercise.isCustom && (
                <Badge variant="outline" className="text-xs shrink-0">
                  <Star className="h-3 w-3 mr-1" />
                  Personal
                </Badge>
              )}
            </div>
            <div className="flex flex-wrap gap-1">
              <Badge className={cn("text-xs", DIFFICULTY_COLORS[exercise.difficulty])}>
                {exercise.difficulty.charAt(0).toUpperCase() + exercise.difficulty.slice(1)}
              </Badge>
              <Badge className={cn("text-xs", CATEGORY_COLORS[exercise.category])}>
                {exercise.category.charAt(0).toUpperCase() + exercise.category.slice(1)}
              </Badge>
            </div>
          </div>

          {exercise.isCustom && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0 shrink-0">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => onEdit?.(exercise)}>
                  <Edit className="h-4 w-4 mr-2" />
                  Editar
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="text-destructive focus:text-destructive"
                  onClick={() => onDelete?.(exercise.id)}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Eliminar
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        <p className="text-sm text-muted-foreground line-clamp-2">{exercise.description}</p>

        {/* Primary muscles */}
        <div className="space-y-1">
          <p className="text-xs font-medium text-muted-foreground">Músculos principales</p>
          <div className="flex flex-wrap gap-1">
            {exercise.muscleGroups.primary.map((muscle) => (
              <Badge key={muscle} variant="secondary" className="text-xs">
                {muscle}
              </Badge>
            ))}
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-2 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Target className="h-3 w-3" />
            {exercise.targetSets} series
          </div>
          <div className="flex items-center gap-1">
            <Dumbbell className="h-3 w-3" />
            {exercise.targetReps} reps
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {exercise.restTime}s
          </div>
        </div>

        {/* Expandable details */}
        {expanded && (
          <div className="space-y-3 pt-2 border-t border-border">
            {exercise.equipment.length > 0 && (
              <div className="space-y-1">
                <p className="text-xs font-medium text-muted-foreground">Equipo</p>
                <div className="flex flex-wrap gap-1">
                  {exercise.equipment.map((eq) => (
                    <Badge key={eq} variant="outline" className="text-xs">
                      {eq}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {exercise.muscleGroups.secondary.length > 0 && (
              <div className="space-y-1">
                <p className="text-xs font-medium text-muted-foreground">Músculos secundarios</p>
                <div className="flex flex-wrap gap-1">
                  {exercise.muscleGroups.secondary.map((muscle) => (
                    <Badge key={muscle} variant="outline" className="text-xs">
                      {muscle}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {exercise.instructions.length > 0 && (
              <div className="space-y-1">
                <p className="text-xs font-medium text-muted-foreground">Instrucciones clave</p>
                <ul className="space-y-1">
                  {exercise.instructions.map((ins, i) => (
                    <li key={i} className="text-xs text-muted-foreground flex gap-2">
                      <span className="shrink-0 text-primary font-medium">{i + 1}.</span>
                      {ins}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {exercise.tips.length > 0 && (
              <div className="space-y-1">
                <p className="text-xs font-medium text-muted-foreground">Consejos</p>
                <ul className="space-y-1">
                  {exercise.tips.map((tip, i) => (
                    <li key={i} className="text-xs text-muted-foreground flex gap-2">
                      <span className="shrink-0">•</span>
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        <Button
          variant="ghost"
          size="sm"
          className="w-full text-xs text-muted-foreground h-7"
          onClick={() => setExpanded((v) => !v)}
        >
          {expanded ? (
            <>
              <ChevronUp className="h-3 w-3 mr-1" />
              Ver menos
            </>
          ) : (
            <>
              <ChevronDown className="h-3 w-3 mr-1" />
              Ver detalles
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
