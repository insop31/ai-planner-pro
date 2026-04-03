import type { Achievement } from '@/types/planner';
import { cn } from '@/lib/utils';

interface Props {
  achievements: Achievement[];
  points: number;
  streak: number;
}

export function GamificationPanel({ achievements, points, streak }: Props) {
  const level = Math.floor(points / 100) + 1;
  const progressToNext = points % 100;

  return (
    <div className="bg-card rounded-xl shadow-card p-5 space-y-4">
      <h2 className="font-semibold text-foreground text-lg">🏆 Achievements</h2>

      <div className="gradient-accent rounded-lg p-4 text-center">
        <p className="text-3xl font-bold text-accent-foreground">Level {level}</p>
        <div className="w-full bg-background/30 rounded-full h-2 mt-2">
          <div
            className="h-2 rounded-full bg-background/80 transition-all duration-500"
            style={{ width: `${progressToNext}%` }}
          />
        </div>
        <p className="text-xs text-accent-foreground/80 mt-1">{progressToNext}/100 to next level</p>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {achievements.map(a => (
          <div
            key={a.id}
            className={cn(
              'flex flex-col items-center p-3 rounded-lg text-center transition-all',
              a.unlocked ? 'bg-muted' : 'bg-muted/40 opacity-50'
            )}
          >
            <span className="text-2xl">{a.icon}</span>
            <p className="text-xs font-medium text-foreground mt-1 leading-tight">{a.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
