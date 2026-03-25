import { useDashboardStats } from "./hooks/useDashboardStats";
import { StatsGrid } from "./StatsGrid";
import { QuickActions } from "./QuickActions";
import { RecentWorkouts } from "./RecentWorkouts";

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "Buenos días";
  if (hour < 18) return "Buenas tardes";
  return "Buenas noches";
}

export default function DashboardPage() {
  const stats = useDashboardStats();

  return (
    <div className="p-4 space-y-5 max-w-2xl mx-auto">
      <div>
        <h1 className="text-xl font-bold">{getGreeting()} 💪</h1>
        <p className="text-sm text-muted-foreground">¿Listo para entrenar?</p>
      </div>

      <StatsGrid stats={stats} />

      <div>
        <h2 className="text-sm font-semibold mb-3 text-muted-foreground uppercase tracking-wide">
          Acciones rápidas
        </h2>
        <QuickActions />
      </div>

      <div>
        <h2 className="text-sm font-semibold mb-3 text-muted-foreground uppercase tracking-wide">
          Historial reciente
        </h2>
        <RecentWorkouts workouts={stats.recentWorkouts} />
      </div>
    </div>
  );
}
