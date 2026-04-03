import { CalendarDays, Sparkles } from 'lucide-react';
import { usePlannerStore } from '@/hooks/usePlannerStore';
import { StatsBar } from '@/components/planner/StatsBar';
import { TaskList } from '@/components/planner/TaskList';
import { PomodoroTimer } from '@/components/planner/PomodoroTimer';
import { AnalyticsDashboard } from '@/components/planner/AnalyticsDashboard';
import { WeeklyReflectionCard } from '@/components/planner/WeeklyReflectionCard';
import { GamificationPanel } from '@/components/planner/GamificationPanel';
import { BurnoutAlert } from '@/components/planner/BurnoutAlert';

const Index = () => {
  const {
    todayTasks, completedToday, completionRate, points, streak,
    achievements, weeklyReflection, burnoutRisk, addTask, toggleTask,
    deleteTask, taskPrediction, CATEGORY_LABELS,
  } = usePlannerStore();

  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="gradient-primary px-4 py-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-accent" />
              <h1 className="text-xl font-bold text-primary-foreground">AI Virtual Planner</h1>
            </div>
            <div className="flex items-center gap-2 text-primary-foreground/70 text-sm">
              <CalendarDays className="w-4 h-4" />
              <span>{today}</span>
            </div>
          </div>
          <p className="text-primary-foreground/60 text-sm">Smart scheduling powered by AI</p>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 lg:px-8 py-6 space-y-6">
        <StatsBar
          completedToday={completedToday}
          totalToday={todayTasks.length}
          completionRate={completionRate}
          points={points}
          streak={streak}
        />

        <BurnoutAlert risk={burnoutRisk} />

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
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
          <div className="space-y-6">
            <PomodoroTimer />
            <WeeklyReflectionCard reflection={weeklyReflection} />
            <GamificationPanel achievements={achievements} points={points} streak={streak} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
