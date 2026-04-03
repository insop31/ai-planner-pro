import { Heart, Sparkles } from 'lucide-react';

interface StatsBarProps {
  completedToday: number;
  totalToday: number;
  completionRate: number;
  points: number;
  streak: number;
}

export function StatsBar({ completedToday, totalToday, completionRate, points, streak }: StatsBarProps) {
  const stats = [
    { label: 'Completed', value: `${completedToday}/${totalToday}`, emoji: '✅', gradient: 'gradient-mint' },
    { label: 'Progress', value: `${completionRate}%`, emoji: '💖', gradient: 'gradient-pink' },
    { label: 'Points', value: points.toString(), emoji: '⭐', gradient: 'gradient-peach' },
    { label: 'Streak', value: `${streak} days`, emoji: '🔥', gradient: 'gradient-lavender' },
  ];

  return (
    <div className="grid grid-cols-2 gap-3">
      {stats.map((stat, i) => (
        <div
          key={stat.label}
          className="glass-card rounded-2xl p-4 shadow-soft flex items-center gap-3 animate-fade-in"
          style={{ animationDelay: `${i * 100}ms` }}
        >
          <div className={`${stat.gradient} w-10 h-10 rounded-xl flex items-center justify-center text-lg`}>
            {stat.emoji}
          </div>
          <div>
            <p className="text-xl font-bold text-foreground">{stat.value}</p>
            <p className="text-xs text-muted-foreground font-medium">{stat.label}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
