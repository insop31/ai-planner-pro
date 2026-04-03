import { Brain, TrendingUp, Lightbulb } from 'lucide-react';
import type { WeeklyReflection } from '@/types/planner';

interface Props {
  reflection: WeeklyReflection;
}

export function WeeklyReflectionCard({ reflection }: Props) {
  return (
    <div className="bg-card rounded-xl shadow-card p-5 space-y-4">
      <div className="flex items-center gap-2">
        <Brain className="w-5 h-5 text-accent" />
        <h2 className="font-semibold text-foreground text-lg">AI Weekly Reflection</h2>
      </div>

      <div className="gradient-primary rounded-lg p-4 space-y-2">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-accent" />
          <p className="text-sm font-medium text-primary-foreground">
            You completed {reflection.completionRate}% of your tasks this week!
          </p>
        </div>
        <p className="text-xs text-primary-foreground/70">
          {reflection.completedTasks} out of {reflection.totalTasks} tasks • {reflection.mostProductiveDay} was your most productive day
        </p>
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2 mb-2">
          <Lightbulb className="w-4 h-4 text-warning" />
          <h3 className="text-sm font-medium text-foreground">AI Suggestions</h3>
        </div>
        {reflection.suggestions.map((s, i) => (
          <div key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
            <span className="text-accent mt-0.5">•</span>
            <p>{s}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
