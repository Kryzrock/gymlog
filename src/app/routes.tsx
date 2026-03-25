import { Routes, Route } from "react-router-dom";
import { AppLayout } from "./layouts/AppLayout";
import Index from "@/features/dashboard/DashboardPage";
import Routines from "@/features/routines/RoutinesPage";
import Exercises from "@/features/exercises/ExercisesPage";
import Statistics from "@/features/statistics/StatisticsPage";
import ActiveWorkout from "@/features/workout/ActiveWorkoutPage";
import NotFound from "@/pages/NotFound";

export const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<AppLayout />}>
      <Route index element={<Index />} />
      <Route path="/routines" element={<Routines />} />
      <Route path="/exercises" element={<Exercises />} />
      <Route path="/statistics" element={<Statistics />} />
      <Route path="*" element={<NotFound />} />
    </Route>
    <Route path="/workout/:routineId" element={<ActiveWorkout />} />
  </Routes>
);
