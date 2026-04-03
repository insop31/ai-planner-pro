import { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';
import { cn } from '@/lib/utils';

export function PomodoroTimer() {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [sessionsCompleted, setSessionsCompleted] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval>>();

  useEffect(() => {
    if (!isRunning) return;
    intervalRef.current = setInterval(() => {
      setSeconds(prev => {
        if (prev === 0) {
          setMinutes(m => {
            if (m === 0) {
              setIsRunning(false);
              if (!isBreak) setSessionsCompleted(s => s + 1);
              setIsBreak(b => !b);
              return isBreak ? 25 : 5;
            }
            return m - 1;
          });
          return prev === 0 && minutes === 0 ? 0 : 59;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(intervalRef.current);
  }, [isRunning, isBreak, minutes]);

  const reset = () => {
    setIsRunning(false);
    setMinutes(isBreak ? 5 : 25);
    setSeconds(0);
  };

  const total = isBreak ? 300 : 1500;
  const remaining = minutes * 60 + seconds;
  const progress = ((total - remaining) / total) * 100;

  return (
    <div className="bg-card rounded-xl shadow-card p-5">
      <h2 className="font-semibold text-foreground text-lg mb-4">
        {isBreak ? '☕ Break Time' : '🎯 Focus Session'}
      </h2>
      <div className="flex flex-col items-center">
        <div className="relative w-40 h-40 mb-4">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 128 128">
            <circle cx="64" cy="64" r="56" fill="none" stroke="hsl(var(--muted))" strokeWidth="8" />
            <circle
              cx="64" cy="64" r="56" fill="none"
              stroke={isBreak ? 'hsl(var(--success))' : 'hsl(var(--accent))'}
              strokeWidth="8" strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 56}`}
              strokeDashoffset={`${2 * Math.PI * 56 * (1 - progress / 100)}`}
              className="transition-all duration-1000"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-3xl font-bold text-foreground tabular-nums">
              {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
            </span>
          </div>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setIsRunning(!isRunning)}
            className={cn(
              'p-3 rounded-full transition-all',
              isRunning ? 'bg-secondary text-secondary-foreground' : 'gradient-accent text-accent-foreground animate-pulse-glow'
            )}
          >
            {isRunning ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
          </button>
          <button onClick={reset} className="p-3 rounded-full bg-secondary text-secondary-foreground hover:bg-muted transition-colors">
            <RotateCcw className="w-5 h-5" />
          </button>
        </div>
        <p className="text-xs text-muted-foreground mt-3">Sessions completed: {sessionsCompleted}</p>
      </div>
    </div>
  );
}
