import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Dumbbell } from "lucide-react";

interface Workout {
  id: string;
  name: string;
  date: string;
  duration: string;
  exercises: number;
  status: "completed" | "in-progress";
}

const mockWorkouts: Workout[] = [
  {
    id: "1",
    name: "Push Day",
    date: "Hoy",
    duration: "1h 15m",
    exercises: 6,
    status: "completed"
  },
  {
    id: "2",
    name: "Pull Day",
    date: "Ayer",
    duration: "1h 5m",
    exercises: 7,
    status: "completed"
  },
  {
    id: "3",
    name: "Leg Day",
    date: "2 días",
    duration: "1h 30m",
    exercises: 8,
    status: "completed"
  }
];

export const RecentWorkouts = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Dumbbell className="h-5 w-5" />
          Entrenamientos Recientes
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {mockWorkouts.map((workout) => (
          <div key={workout.id} className="flex items-center justify-between p-3 bg-secondary rounded-lg">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h3 className="font-medium">{workout.name}</h3>
                <Badge variant={workout.status === "completed" ? "default" : "secondary"}>
                  {workout.status === "completed" ? "Completado" : "En progreso"}
                </Badge>
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {workout.date}
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {workout.duration}
                </div>
                <span>{workout.exercises} ejercicios</span>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};