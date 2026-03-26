import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useStats } from "./hooks/useStats";
import { SummaryCards } from "./SummaryCards";
import { VolumeChart } from "./VolumeChart";
import { FrequencyChart } from "./FrequencyChart";
import { WorkoutHistoryList } from "./WorkoutHistoryList";

export default function StatisticsPage() {
  const stats = useStats();

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6">
      <div>
        <h1 className="text-xl md:text-2xl font-bold">Estadísticas</h1>
        <p className="text-sm text-muted-foreground">Analizá tu progreso</p>
      </div>

      <SummaryCards stats={stats} />

      {/* Mobile: tabs | Desktop: todo visible */}
      <div className="md:hidden">
        <Tabs defaultValue="volumen">
          <TabsList className="w-full grid grid-cols-3">
            <TabsTrigger value="volumen">Volumen</TabsTrigger>
            <TabsTrigger value="frecuencia">Frecuencia</TabsTrigger>
            <TabsTrigger value="historial">Historial</TabsTrigger>
          </TabsList>
          <TabsContent value="volumen" className="mt-4">
            <VolumeChart data={stats.monthlyVolume} />
          </TabsContent>
          <TabsContent value="frecuencia" className="mt-4">
            <FrequencyChart data={stats.frequencyByDay} />
          </TabsContent>
          <TabsContent value="historial" className="mt-4">
            <WorkoutHistoryList workouts={stats.allWorkouts} />
          </TabsContent>
        </Tabs>
      </div>

      <div className="hidden md:space-y-6 md:block">
        <div className="grid grid-cols-2 gap-6">
          <VolumeChart data={stats.monthlyVolume} />
          <FrequencyChart data={stats.frequencyByDay} />
        </div>
        <WorkoutHistoryList workouts={stats.allWorkouts} />
      </div>
    </div>
  );
}
