import { useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Timer, Play, Pause, SkipForward } from "lucide-react";

interface WorkoutTimerProps {
  duration: number; // Total duration in seconds
  timeLeft: number; // Time left in seconds
  onTimeUpdate: (timeLeft: number) => void;
  onComplete: () => void;
}

export const WorkoutTimer = ({ 
  duration, 
  timeLeft, 
  onTimeUpdate, 
  onComplete 
}: WorkoutTimerProps) => {
  useEffect(() => {
    if (timeLeft <= 0) {
      onComplete();
      return;
    }

    const interval = setInterval(() => {
      onTimeUpdate(timeLeft - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft, onTimeUpdate, onComplete]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = ((duration - timeLeft) / duration) * 100;

  return (
    <Card className="mx-4 mb-4 bg-primary/5 border-primary/20">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Timer className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">Tiempo de descanso</span>
          </div>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={onComplete}
            className="text-xs"
          >
            <SkipForward className="h-3 w-3 mr-1" />
            Saltar
          </Button>
        </div>
        
        <div className="text-center mb-3">
          <div className="text-3xl font-mono font-bold text-primary">
            {formatTime(timeLeft)}
          </div>
        </div>
        
        <div className="w-full bg-secondary rounded-full h-2">
          <div 
            className="bg-primary h-2 rounded-full transition-all duration-1000"
            style={{ width: `${progress}%` }}
          />
        </div>
      </CardContent>
    </Card>
  );
};