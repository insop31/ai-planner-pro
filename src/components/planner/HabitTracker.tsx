interface HabitTrackerProps {}

const habits = [
  { name: 'Skincare', emoji: '🌸', progress: 75, color: 'gradient-pink' },
  { name: 'Reading', emoji: '📖', progress: 90, color: 'gradient-mint' },
  { name: 'Hydration', emoji: '💧', progress: 60, color: 'gradient-lavender' },
  { name: 'Meditation', emoji: '🧘', progress: 45, color: 'gradient-peach' },
];

export function HabitTracker() {
  return (
    <div className="glass-card rounded-3xl shadow-soft p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-lg">💫</span>
          <h2 className="font-bold text-foreground text-lg">Habit Tracker</h2>
        </div>
        <div className="w-5 h-5 rounded-full bg-success flex items-center justify-center">
          <span className="text-xs text-success-foreground">✓</span>
        </div>
      </div>
      <div className="space-y-3">
        {habits.map(habit => (
          <div key={habit.name} className="flex items-center gap-3">
            <span className="text-base w-6 text-center">{habit.emoji}</span>
            <span className="text-sm font-semibold text-foreground w-24">{habit.name}</span>
            <div className="flex-1 bg-muted rounded-full h-3 overflow-hidden">
              <div
                className={`h-full rounded-full ${habit.color} transition-all duration-700`}
                style={{ width: `${habit.progress}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
