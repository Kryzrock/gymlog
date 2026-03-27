import { Card, CardContent } from "@/components/ui/card";
import { Calendar, TrendingUp, Dumbbell, Flame } from "lucide-react";
import type { DashboardStats } from "./hooks/useDashboardStats";

interface StatsGridProps {
  stats: DashboardStats;
}

const cards = (stats: DashboardStats) => [
  {
    title: "Este mes",
    value: stats.workoutsThisMonth,
    subtitle: "entrenamientos",
    icon: Calendar,
    iconClass: "text-blue-500",
    bgClass: "bg-blue-500/10",
  },
  {
    title: "Volumen",
    value: `${stats.weeklyVolume.toLocaleString()}`,
    subtitle: "kg esta semana",
    icon: TrendingUp,
    iconClass: "text-emerald-500",
    bgClass: "bg-emerald-500/10",
  },
  {
    title: "Biblioteca",
    value: stats.totalExercises,
    subtitle: "ejercicios",
    icon: Dumbbell,
    iconClass: "text-violet-500",
    bgClass: "bg-violet-500/10",
  },
  {
    title: "Racha",
    value: stats.streak,
    subtitle: stats.streak === 1 ? "día consecutivo" : "días consecutivos",
    icon: Flame,
    iconClass: "text-orange-500",
    bgClass: "bg-orange-500/10",
  },
];

export function StatsGrid({ stats }: StatsGridProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {cards(stats).map((card) => (
        <Card key={card.title} className="rounded-2xl">
          <CardContent className="p-4">
            <div className={`inline-flex p-2 rounded-xl mb-3 ${card.bgClass}`}>
              <card.icon className={`h-4 w-4 ${card.iconClass}`} strokeWidth={2.5} />
            </div>
            <p className="text-2xl font-black leading-none tracking-tight">{card.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{card.subtitle}</p>
            <p className="text-xs font-medium text-muted-foreground/60 mt-0.5">{card.title}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
