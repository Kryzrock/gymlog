import { useDashboardStats } from "./hooks/useDashboardStats";
import { HeaderSection } from "./HeaderSection";
import { StatsGrid } from "./StatsGrid";
import { QuickActions } from "./QuickActions";
import { DashboardVolumeChart } from "./DashboardVolumeChart";
import { RecentWorkouts } from "./RecentWorkouts";

export default function DashboardPage() {
  const stats = useDashboardStats();

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-5">
      <HeaderSection />

      <StatsGrid stats={stats} />

      {/* Desktop: dos columnas | Mobile: una columna */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-5">

        {/* Columna principal */}
        <div className="space-y-4">
          <QuickActions />
          <DashboardVolumeChart data={stats.dailyVolume} />
        </div>

        {/* Columna lateral */}
        <RecentWorkouts workouts={stats.recentWorkouts} />
      </div>
    </div>
  );
}
