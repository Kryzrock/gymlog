import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Copy, Edit, Trash2, Calendar, Clock, Dumbbell, Play } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical } from "lucide-react";

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

interface RoutineCardProps {
  routine: Routine;
  onDuplicate: (routine: Routine) => void;
  onDelete: (id: string) => void;
}

const getCategoryColor = (category: string) => {
  switch (category) {
    case "fuerza":
      return "bg-destructive text-destructive-foreground";
    case "hipertrofia":
      return "bg-primary text-primary-foreground";
    case "resistencia":
      return "bg-accent text-accent-foreground";
    default:
      return "bg-secondary text-secondary-foreground";
  }
};

export const RoutineCard = ({ routine, onDuplicate, onDelete }: RoutineCardProps) => {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <CardTitle className="text-lg">{routine.name}</CardTitle>
              {routine.isTemplate && (
                <Badge variant="outline" className="text-xs">
                  Plantilla
                </Badge>
              )}
            </div>
            <Badge className={`${getCategoryColor(routine.category)} text-xs`}>
              {routine.category.charAt(0).toUpperCase() + routine.category.slice(1)}
            </Badge>
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
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
                  <DropdownMenuItem>
                    <Edit className="h-4 w-4 mr-2" />
                    Editar
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={() => onDelete(routine.id)}
                    className="text-destructive"
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
      
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">{routine.description}</p>
        
        <div className="grid grid-cols-3 gap-4 text-sm">
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3 text-muted-foreground" />
            <span className="text-muted-foreground">{routine.days.length} días</span>
          </div>
          <div className="flex items-center gap-1">
            <Dumbbell className="h-3 w-3 text-muted-foreground" />
            <span className="text-muted-foreground">{routine.exercises} ejercicios</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3 text-muted-foreground" />
            <span className="text-muted-foreground">{routine.estimatedDuration}</span>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="text-xs text-muted-foreground">Días de entrenamiento:</div>
          <div className="flex gap-1 flex-wrap">
            {routine.days.map((day, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {day}
              </Badge>
            ))}
          </div>
        </div>
        
        {routine.lastUsed && (
          <div className="text-xs text-muted-foreground">
            Último uso: {routine.lastUsed}
          </div>
        )}
        
        <Button className="w-full">
          <Play className="h-4 w-4 mr-2" />
          {routine.isTemplate ? "Usar Plantilla" : "Comenzar Entrenamiento"}
        </Button>
      </CardContent>
    </Card>
  );
};