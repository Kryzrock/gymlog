import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Timer, SkipForward } from "lucide-react";

interface RestTimerProps {
  seconds: number;
  onComplete: () => void;
  onSkip: () => void;
}

export function RestTimer({ seconds, onComplete, onSkip }: RestTimerProps) {
  const [timeLeft, setTimeLeft] = useState(seconds);

  // Reset when a new rest starts
  useEffect(() => {
    setTimeLeft(seconds);
  }, [seconds]);

  useEffect(() => {
    if (timeLeft <= 0) {
      onComplete();
      return;
    }
    const interval = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(interval);
  }, [timeLeft, onComplete]);

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${String(sec).padStart(2, "0")}`;
  };

  const progress = ((seconds - timeLeft) / seconds) * 100;

  return (
    <Card className="mx-4 my-3 border-primary/30 bg-primary/5">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2 text-sm font-medium">
            <Timer className="h-4 w-4 text-primary" />
            Descanso
          </div>
          <Button variant="ghost" size="sm" className="text-xs h-7" onClick={onSkip}>
            <SkipForward className="h-3 w-3 mr-1" />
            Saltar
          </Button>
        </div>

        <p className="text-4xl font-mono font-bold text-primary text-center mb-3">
          {formatTime(timeLeft)}
        </p>

        <div className="w-full bg-secondary rounded-full h-2 overflow-hidden">
          <div
            className="bg-primary h-2 rounded-full transition-all duration-1000"
            style={{ width: `${progress}%` }}
          />
        </div>
      </CardContent>
    </Card>
  );
}
