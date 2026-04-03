import { CheckCircle2, Clock, Flame, Trophy } from 'lucide-react';

interface StatsBarProps {
  completedToday: number;
  totalToday: number;
  completionRate: number;
  points: number;
  streak: number;
}

export function StatsBar({ completedToday, totalToday, completionRate, points, streak }: StatsBarProps) {
  const stats = [
    { label: 'Completed', value: `${completedToday}/${totalToday}`, icon: CheckCircle2, color: 'text-success' },
    { label: 'Progress', value: `${completionRate}%`, icon: Clock, color: 'text-accent' },
    { label: 'Points', value: points.toString(), icon: Trophy, color: 'text-warning' },
    { label: 'Streak', value: `${streak} days`, icon: Flame, color: 'text-destructive' },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      {stats.map((stat, i) => (
        <div
          key={stat.label}
          className="bg-card rounded-xl p-4 shadow-card flex items-center gap-3 animate-fade-in"
          style={{ animationDelay: `${i * 80}ms` }}
        >
          <div className={`${stat.color} p-2 rounded-lg bg-muted`}>
            <stat.icon className="w-5 h-5" />
          </div>
          <div>
            <p className="text-2xl font-bold text-foreground animate-count-up">{stat.value}</p>
            <p className="text-xs text-muted-foreground">{stat.label}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
