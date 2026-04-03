import { Sparkles } from 'lucide-react';
import { usePlannerStore } from '@/hooks/usePlannerStore';
import { StatsBar } from '@/components/planner/StatsBar';
import { TaskList } from '@/components/planner/TaskList';
import { PomodoroTimer } from '@/components/planner/PomodoroTimer';
import { AnalyticsDashboard } from '@/components/planner/AnalyticsDashboard';
import { WeeklyReflectionCard } from '@/components/planner/WeeklyReflectionCard';
import { GamificationPanel } from '@/components/planner/GamificationPanel';
import { BurnoutAlert } from '@/components/planner/BurnoutAlert';
import { WeekCalendar } from '@/components/planner/WeekCalendar';
import { HabitTracker } from '@/components/planner/HabitTracker';
import { MotivationalCard } from '@/components/planner/MotivationalCard';

const Index = () => {
  const {
    todayTasks, completedToday, completionRate, points, streak,
    achievements, weeklyReflection, burnoutRisk, addTask, toggleTask,
    deleteTask, taskPrediction, CATEGORY_LABELS,
  } = usePlannerStore();

  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });

  return (
    <div className="min-h-screen pb-8">
      {/* Header */}
      <header className="px-4 pt-6 pb-4 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="text-2xl animate-float">😊</span>
              <h1 className="text-2xl font-extrabold text-foreground">My Day</h1>
            </div>
            <div className="w-10 h-10 rounded-full gradient-pink flex items-center justify-center shadow-glow">
              <span className="text-sm">👩</span>
            </div>
          </div>
          <p className="text-sm text-muted-foreground font-medium">{today}</p>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-5xl mx-auto px-4 lg:px-8 space-y-4">
        <MotivationalCard />

        <WeekCalendar />

        <BurnoutAlert risk={burnoutRisk} />

        <div className="grid lg:grid-cols-3 gap-4">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-4">
            <HabitTracker />
            
            <TaskList
              tasks={todayTasks}
              onToggle={toggleTask}
              onDelete={deleteTask}
              onAdd={addTask}
              taskPrediction={taskPrediction}
              categoryLabels={CATEGORY_LABELS}
            />
            
            <AnalyticsDashboard reflection={weeklyReflection} />
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            <StatsBar
              completedToday={completedToday}
              totalToday={todayTasks.length}
              completionRate={completionRate}
              points={points}
              streak={streak}
            />
            <PomodoroTimer />
            <WeeklyReflectionCard reflection={weeklyReflection} />
            <GamificationPanel achievements={achievements} points={points} streak={streak} />
          </div>
        </div>

        {/* Bottom Action Cards */}
        <div className="grid grid-cols-3 gap-3 pt-2">
          {[
            { emoji: '⭐', label: 'Gratitude', gradient: 'gradient-peach' },
            { emoji: '💖', label: 'Wins Today', gradient: 'gradient-pink' },
            { emoji: '✨', label: 'Self-Care', gradient: 'gradient-lavender' },
          ].map(card => (
            <button
              key={card.label}
              className={`glass-card rounded-2xl p-4 shadow-soft flex flex-col items-center gap-2 hover:shadow-glow transition-all hover:scale-[1.02]`}
            >
              <div className={`w-10 h-10 rounded-xl ${card.gradient} flex items-center justify-center text-lg`}>
                {card.emoji}
              </div>
              <span className="text-xs font-bold text-foreground">{card.label}</span>
            </button>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Index;
