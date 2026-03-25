import { useState, useEffect, useCallback } from "react";

export function useWorkoutTimer() {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(true);

  useEffect(() => {
    if (!isRunning) return;
    const interval = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(interval);
  }, [isRunning]);

  const pause = useCallback(() => setIsRunning(false), []);
  const resume = useCallback(() => setIsRunning(true), []);
  const toggle = useCallback(() => setIsRunning((r) => !r), []);

  return { seconds, isRunning, pause, resume, toggle };
}
