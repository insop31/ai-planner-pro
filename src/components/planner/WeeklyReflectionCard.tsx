import { Brain, TrendingUp, Lightbulb, Sparkles } from 'lucide-react';
import type { WeeklyReflection } from '@/types/planner';

interface Props {
  reflection: WeeklyReflection;
}

export function WeeklyReflectionCard({ reflection }: Props) {
  return (
    <div className="glass-card rounded-3xl shadow-soft p-5 space-y-4">
      <div className="flex items-center gap-2">
        <span className="text-lg">🧠</span>
        <h2 className="font-bold text-foreground text-lg">AI Reflection</h2>
      </div>

      <div className="gradient-pink rounded-2xl p-4 space-y-2">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-primary-foreground/80" />
          <p className="text-sm font-bold text-primary-foreground">
            You completed {reflection.completionRate}% of tasks! 🎉
          </p>
        </div>
        <p className="text-xs text-primary-foreground/70 font-medium">
          {reflection.completedTasks}/{reflection.totalTasks} tasks • {reflection.mostProductiveDay} was your best day
        </p>
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2 mb-2">
          <Lightbulb className="w-4 h-4 text-warning" />
          <h3 className="text-sm font-semibold text-foreground">Suggestions</h3>
        </div>
        {reflection.suggestions.map((s, i) => (
          <div key={i} className="flex items-start gap-2 text-sm text-muted-foreground bg-muted/50 rounded-xl p-2.5">
            <span className="text-primary mt-0.5">✨</span>
            <p className="font-medium">{s}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
