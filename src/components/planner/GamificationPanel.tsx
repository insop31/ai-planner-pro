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
    <div className="glass-card rounded-3xl shadow-soft p-5 space-y-4">
      <div className="flex items-center gap-2">
        <span className="text-lg">🏆</span>
        <h2 className="font-bold text-foreground text-lg">Achievements</h2>
      </div>

      <div className="gradient-lavender rounded-2xl p-4 text-center">
        <p className="text-3xl font-bold text-secondary-foreground">Level {level}</p>
        <div className="w-full bg-background/40 rounded-full h-2.5 mt-2">
          <div
            className="h-2.5 rounded-full gradient-pink transition-all duration-500"
            style={{ width: `${progressToNext}%` }}
          />
        </div>
        <p className="text-xs text-secondary-foreground/70 mt-1.5 font-medium">{progressToNext}/100 to next level ✨</p>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {achievements.map(a => (
          <div
            key={a.id}
            className={cn(
              'flex flex-col items-center p-3 rounded-2xl text-center transition-all',
              a.unlocked ? 'bg-muted shadow-soft' : 'bg-muted/30 opacity-40'
            )}
          >
            <span className="text-2xl">{a.icon}</span>
            <p className="text-xs font-bold text-foreground mt-1 leading-tight">{a.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
