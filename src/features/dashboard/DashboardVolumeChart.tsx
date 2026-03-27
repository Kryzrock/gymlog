import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, ResponsiveContainer, Tooltip } from "recharts";
import type { DailyVolume } from "./hooks/useDashboardStats";

interface DashboardVolumeChartProps {
  data: DailyVolume[];
}

export function DashboardVolumeChart({ data }: DashboardVolumeChartProps) {
  const hasData = data.some((d) => d.volume > 0);

  return (
    <Card className="rounded-2xl">
      <CardHeader className="pb-2 pt-4 px-4">
        <CardTitle className="text-sm font-semibold">Volumen · últimos 7 días</CardTitle>
      </CardHeader>
      <CardContent className="px-2 pb-3">
        {hasData ? (
          <ResponsiveContainer width="100%" height={90}>
            <BarChart data={data} margin={{ top: 0, right: 4, left: 4, bottom: 0 }}>
              <XAxis
                dataKey="day"
                tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                formatter={(value: number) => [`${value.toLocaleString()} kg`, "Volumen"]}
                cursor={{ fill: "hsl(var(--muted))", radius: 6 }}
                contentStyle={{
                  background: "hsl(var(--popover))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                  fontSize: "12px",
                }}
              />
              <Bar dataKey="volume" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-[90px] flex items-center justify-center">
            <p className="text-xs text-muted-foreground">Sin datos esta semana</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
