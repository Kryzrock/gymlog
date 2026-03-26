import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Dumbbell, Clock, TrendingUp } from "lucide-react";
import type { Stats } from "./hooks/useStats";

function formatTime(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  if (h === 0) return `${m}m`;
  return `${h}h ${m}m`;
}

interface SummaryCardsProps {
  stats: Stats;
}

export function SummaryCards({ stats }: SummaryCardsProps) {
  const cards = [
    {
      label: "Entrenamientos",
      value: stats.totalWorkouts,
      icon: Dumbbell,
    },
    {
      label: "Días activo",
      value: stats.totalDays,
      icon: Calendar,
    },
    {
      label: "Tiempo total",
      value: formatTime(stats.totalTimeSeconds),
      icon: Clock,
    },
    {
      label: "Duración media",
      value: formatTime(stats.avgDurationSeconds),
      icon: TrendingUp,
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {cards.map((card) => (
        <Card key={card.label}>
          <CardContent className="p-4 flex items-center gap-3">
            <card.icon className="h-8 w-8 text-primary shrink-0" />
            <div>
              <p className="text-2xl font-bold leading-tight">{card.value}</p>
              <p className="text-xs text-muted-foreground">{card.label}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
