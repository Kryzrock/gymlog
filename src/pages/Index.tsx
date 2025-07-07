import { StatsCard } from "@/components/dashboard/StatsCard";
import { RecentWorkouts } from "@/components/dashboard/RecentWorkouts";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { Calendar, TrendingUp, Target, Dumbbell } from "lucide-react";

const Index = () => {
  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">¡Hola! 👋</h1>
        <p className="text-muted-foreground">Bienvenido de vuelta a tu entrenamiento</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        <StatsCard
          title="Entrenamientos"
          value="12"
          subtitle="Este mes"
          icon={Calendar}
          trend="up"
        />
        <StatsCard
          title="Peso Total"
          value="2,450kg"
          subtitle="Esta semana"
          icon={TrendingUp}
          trend="up"
        />
        <StatsCard
          title="Récord Personal"
          value="3"
          subtitle="Nuevos PR"
          icon={Target}
          trend="up"
        />
        <StatsCard
          title="Racha"
          value="5 días"
          subtitle="Consecutivos"
          icon={Dumbbell}
          trend="neutral"
        />
      </div>

      {/* Quick Actions */}
      <QuickActions />

      {/* Recent Workouts */}
      <RecentWorkouts />
    </div>
  );
};

export default Index;
