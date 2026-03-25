import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useStats } from "./hooks/useStats";
import { SummaryCards } from "./SummaryCards";
import { VolumeChart } from "./VolumeChart";
import { FrequencyChart } from "./FrequencyChart";
import { WorkoutHistoryList } from "./WorkoutHistoryList";

export default function StatisticsPage() {
  const stats = useStats();

  return (
    <div className="p-4 space-y-5 max-w-2xl mx-auto">
      <div>
        <h1 className="text-xl font-bold">Estadísticas</h1>
        <p className="text-sm text-muted-foreground">Analizá tu progreso</p>
      </div>

      <SummaryCards stats={stats} />

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
  );
}
