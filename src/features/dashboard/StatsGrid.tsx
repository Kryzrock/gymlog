import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, TrendingUp, Dumbbell, Flame } from "lucide-react";
import type { DashboardStats } from "./hooks/useDashboardStats";

interface StatsGridProps {
  stats: DashboardStats;
}

export function StatsGrid({ stats }: StatsGridProps) {
  const cards = [
    {
      title: "Este mes",
      value: stats.workoutsThisMonth,
      subtitle: "entrenamientos",
      icon: Calendar,
    },
    {
      title: "Volumen semanal",
      value: `${stats.weeklyVolume.toLocaleString()} kg`,
      subtitle: "últimos 7 días",
      icon: TrendingUp,
    },
    {
      title: "Biblioteca",
      value: stats.totalExercises,
      subtitle: "ejercicios",
      icon: Dumbbell,
    },
    {
      title: "Racha",
      value: stats.streak,
      subtitle: stats.streak === 1 ? "día consecutivo" : "días consecutivos",
      icon: Flame,
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-3">
      {cards.map((card) => (
        <Card key={card.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 pt-3 px-3">
            <CardTitle className="text-xs font-medium text-muted-foreground">
              {card.title}
            </CardTitle>
            <card.icon className="h-3.5 w-3.5 text-muted-foreground" />
          </CardHeader>
          <CardContent className="px-3 pb-3">
            <p className="text-2xl font-bold leading-tight">{card.value}</p>
            <p className="text-xs text-muted-foreground">{card.subtitle}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
