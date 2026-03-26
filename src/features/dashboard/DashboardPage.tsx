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
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6">
      <div>
        <h1 className="text-xl md:text-2xl font-bold">{getGreeting()} 💪</h1>
        <p className="text-sm text-muted-foreground">¿Listo para entrenar?</p>
      </div>

      <StatsGrid stats={stats} />

      {/* Desktop: dos columnas | Mobile: una columna */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6">
        {/* Columna principal */}
        <div className="space-y-5">
          <div>
            <h2 className="text-sm font-semibold mb-3 text-muted-foreground uppercase tracking-wide">
              Acciones rápidas
            </h2>
            <QuickActions />
          </div>
        </div>

        {/* Columna lateral */}
        <div>
          <h2 className="text-sm font-semibold mb-3 text-muted-foreground uppercase tracking-wide">
            Historial reciente
          </h2>
          <RecentWorkouts workouts={stats.recentWorkouts} />
        </div>
      </div>
    </div>
  );
}
