import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent 
} from "@/components/ui/chart";
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";
import { 
  TrendingUp, 
  Calendar, 
  Target, 
  Clock, 
  Zap,
  Filter,
  Download
} from "lucide-react";

// Mock data - En una app real, esto vendría de una base de datos
const progressData = [
  { date: "Ene", peso: 70, repeticiones: 120 },
  { date: "Feb", peso: 72, repeticiones: 135 },
  { date: "Mar", peso: 75, repeticiones: 150 },
  { date: "Abr", peso: 78, repeticiones: 165 },
  { date: "May", peso: 80, repeticiones: 180 },
  { date: "Jun", peso: 82, repeticiones: 195 }
];

const workoutHistory = [
  {
    id: 1,
    date: "2024-07-08",
    routine: "Push Day",
    duration: "45 min",
    exercises: 6,
    totalSets: 18,
    status: "completed"
  },
  {
    id: 2,
    date: "2024-07-06",
    routine: "Pull Day",
    duration: "50 min",
    exercises: 7,
    totalSets: 21,
    status: "completed"
  },
  {
    id: 3,
    date: "2024-07-04",
    routine: "Leg Day",
    duration: "60 min",
    exercises: 8,
    totalSets: 24,
    status: "completed"
  },
  {
    id: 4,
    date: "2024-07-02",
    routine: "Push Day",
    duration: "35 min",
    exercises: 5,
    totalSets: 15,
    status: "incomplete"
  }
];

const categoryData = [
  { name: "Push", value: 35, color: "hsl(var(--primary))" },
  { name: "Pull", value: 30, color: "hsl(var(--secondary))" },
  { name: "Piernas", value: 25, color: "hsl(var(--accent))" },
  { name: "Cardio", value: 10, color: "hsl(var(--muted-foreground))" }
];

const weeklyData = [
  { day: "L", workouts: 1 },
  { day: "M", workouts: 0 },
  { day: "X", workouts: 1 },
  { day: "J", workouts: 0 },
  { day: "V", workouts: 1 },
  { day: "S", workouts: 2 },
  { day: "D", workouts: 0 }
];

const chartConfig = {
  peso: {
    label: "Peso Total (kg)",
    color: "hsl(var(--primary))"
  },
  repeticiones: {
    label: "Repeticiones",
    color: "hsl(var(--secondary))"
  },
  workouts: {
    label: "Entrenamientos",
    color: "hsl(var(--accent))"
  }
};

const Statistics = () => {
  const [timeFilter, setTimeFilter] = useState("6m");

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', { 
      day: 'numeric', 
      month: 'short' 
    });
  };

  const getStatusColor = (status: string) => {
    return status === "completed" ? "bg-success/10 text-success" : "bg-warning/10 text-warning";
  };

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Estadísticas</h1>
          <p className="text-muted-foreground">Analiza tu progreso</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filtrar
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Exportar
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <Calendar className="h-8 w-8 mx-auto mb-2 text-primary" />
            <div className="text-2xl font-bold">24</div>
            <div className="text-xs text-muted-foreground">Días activo</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <Target className="h-8 w-8 mx-auto mb-2 text-secondary" />
            <div className="text-2xl font-bold">18</div>
            <div className="text-xs text-muted-foreground">Entrenamientos</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <Clock className="h-8 w-8 mx-auto mb-2 text-accent" />
            <div className="text-2xl font-bold">15h</div>
            <div className="text-xs text-muted-foreground">Tiempo total</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <Zap className="h-8 w-8 mx-auto mb-2 text-primary" />
            <div className="text-2xl font-bold">85%</div>
            <div className="text-xs text-muted-foreground">Consistencia</div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <Tabs defaultValue="progress" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="progress">Progreso</TabsTrigger>
          <TabsTrigger value="frequency">Frecuencia</TabsTrigger>
          <TabsTrigger value="distribution">Distribución</TabsTrigger>
        </TabsList>

        <TabsContent value="progress">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Progreso Mensual</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Evolución de peso y repeticiones
                  </p>
                </div>
                <div className="flex gap-2">
                  {["3m", "6m", "1a"].map((period) => (
                    <Button
                      key={period}
                      variant={timeFilter === period ? "default" : "outline"}
                      size="sm"
                      onClick={() => setTimeFilter(period)}
                    >
                      {period}
                    </Button>
                  ))}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={progressData}>
                    <XAxis dataKey="date" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line
                      yAxisId="left"
                      type="monotone"
                      dataKey="peso"
                      stroke="hsl(var(--primary))"
                      strokeWidth={3}
                      dot={{ fill: "hsl(var(--primary))" }}
                    />
                    <Line
                      yAxisId="right"
                      type="monotone"
                      dataKey="repeticiones"
                      stroke="hsl(var(--secondary))"
                      strokeWidth={3}
                      dot={{ fill: "hsl(var(--secondary))" }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
              <div className="flex justify-center gap-6 mt-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-primary"></div>
                  <span className="text-sm">Peso (kg)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-secondary"></div>
                  <span className="text-sm">Repeticiones</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="frequency">
          <Card>
            <CardHeader>
              <CardTitle>Frecuencia Semanal</CardTitle>
              <p className="text-sm text-muted-foreground">
                Entrenamientos por día de la semana
              </p>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={weeklyData}>
                    <XAxis dataKey="day" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar 
                      dataKey="workouts" 
                      fill="hsl(var(--accent))"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="distribution">
          <div className="grid md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Distribución por Categoría</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Tipos de entrenamiento
                </p>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="h-[250px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={categoryData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        dataKey="value"
                        startAngle={90}
                        endAngle={450}
                      >
                        {categoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <ChartTooltip content={<ChartTooltipContent />} />
                    </PieChart>
                  </ResponsiveContainer>
                </ChartContainer>
                <div className="grid grid-cols-2 gap-2 mt-4">
                  {categoryData.map((item, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: item.color }}
                      ></div>
                      <span className="text-sm">{item.name}</span>
                      <span className="text-sm text-muted-foreground ml-auto">
                        {item.value}%
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Tendencias</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Últimas 4 semanas
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-success/5 rounded-lg">
                  <div>
                    <div className="font-medium">Volumen Total</div>
                    <div className="text-sm text-muted-foreground">+12% vs mes anterior</div>
                  </div>
                  <TrendingUp className="h-5 w-5 text-success" />
                </div>
                
                <div className="flex items-center justify-between p-3 bg-success/5 rounded-lg">
                  <div>
                    <div className="font-medium">Consistencia</div>
                    <div className="text-sm text-muted-foreground">+8% vs mes anterior</div>
                  </div>
                  <TrendingUp className="h-5 w-5 text-success" />
                </div>
                
                <div className="flex items-center justify-between p-3 bg-primary/5 rounded-lg">
                  <div>
                    <div className="font-medium">Duración Promedio</div>
                    <div className="text-sm text-muted-foreground">47 min por sesión</div>
                  </div>
                  <Clock className="h-5 w-5 text-primary" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Workout History */}
      <Card>
        <CardHeader>
          <CardTitle>Historial de Entrenamientos</CardTitle>
          <p className="text-sm text-muted-foreground">
            Últimas sesiones completadas
          </p>
        </CardHeader>
        <CardContent className="space-y-3">
          {workoutHistory.map((workout) => (
            <div
              key={workout.id}
              className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors"
            >
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-medium">{workout.routine}</h3>
                  <Badge 
                    variant="secondary" 
                    className={getStatusColor(workout.status)}
                  >
                    {workout.status === "completed" ? "Completado" : "Incompleto"}
                  </Badge>
                </div>
                <div className="text-sm text-muted-foreground">
                  {formatDate(workout.date)} • {workout.duration} • {workout.exercises} ejercicios
                </div>
              </div>
              <div className="text-right">
                <div className="font-medium">{workout.totalSets}</div>
                <div className="text-xs text-muted-foreground">series</div>
              </div>
            </div>
          ))}
          
          <Button variant="outline" className="w-full mt-4">
            Ver historial completo
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Statistics;