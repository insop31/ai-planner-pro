import { useState, useCallback, useMemo } from 'react';
import type { Task, Priority, TaskCategory, DayStats, Achievement, WeeklyReflection } from '@/types/planner';

const CATEGORY_LABELS: Record<TaskCategory, string> = {
  study: '📚 Study',
  work: '💼 Work',
  personal: '🏠 Personal',
  exercise: '🏃 Exercise',
  break: '☕ Break',
};

const INITIAL_ACHIEVEMENTS: Achievement[] = [
  { id: 'first-task', title: 'First Step', description: 'Complete your first task', icon: '🎯', unlocked: false },
  { id: 'five-streak', title: 'On Fire', description: '5-day completion streak', icon: '🔥', unlocked: false },
  { id: 'ten-tasks', title: 'Taskmaster', description: 'Complete 10 tasks', icon: '⚡', unlocked: false },
  { id: 'early-bird', title: 'Early Bird', description: 'Complete a task before 9 AM', icon: '🌅', unlocked: false },
  { id: 'perfect-day', title: 'Perfect Day', description: 'Complete all tasks in a day', icon: '✨', unlocked: false },
  { id: 'fifty-tasks', title: 'Unstoppable', description: 'Complete 50 tasks', icon: '🚀', unlocked: false },
];

const generateId = () => Math.random().toString(36).substring(2, 9);

const SAMPLE_TASKS: Task[] = [
  { id: generateId(), title: 'Review Linear Algebra Chapter 5', priority: 'high', category: 'study', completed: true, createdAt: new Date(Date.now() - 86400000 * 2), completedAt: new Date(Date.now() - 86400000 * 2), estimatedMinutes: 60, actualMinutes: 55 },
  { id: generateId(), title: 'Complete Python Assignment', priority: 'high', category: 'study', completed: true, createdAt: new Date(Date.now() - 86400000), completedAt: new Date(Date.now() - 86400000), estimatedMinutes: 90, actualMinutes: 80 },
  { id: generateId(), title: 'Morning Jog - 30 min', priority: 'medium', category: 'exercise', completed: true, createdAt: new Date(Date.now() - 86400000), completedAt: new Date(Date.now() - 86400000), estimatedMinutes: 30, actualMinutes: 35 },
  { id: generateId(), title: 'Read AI Research Paper', priority: 'high', category: 'study', completed: false, createdAt: new Date(), estimatedMinutes: 45, timeBlock: '09:00' },
  { id: generateId(), title: 'Team Standup Meeting', priority: 'medium', category: 'work', completed: false, createdAt: new Date(), estimatedMinutes: 30, timeBlock: '10:00' },
  { id: generateId(), title: 'Practice Data Structures', priority: 'high', category: 'study', completed: false, createdAt: new Date(), estimatedMinutes: 60, timeBlock: '11:00' },
  { id: generateId(), title: 'Lunch Break', priority: 'low', category: 'break', completed: false, createdAt: new Date(), estimatedMinutes: 60, timeBlock: '12:00' },
  { id: generateId(), title: 'Work on Portfolio Project', priority: 'medium', category: 'work', completed: false, createdAt: new Date(), estimatedMinutes: 90, timeBlock: '13:00' },
  { id: generateId(), title: 'Evening Workout', priority: 'medium', category: 'exercise', completed: false, createdAt: new Date(), estimatedMinutes: 45, timeBlock: '17:00' },
];

export function usePlannerStore() {
  const [tasks, setTasks] = useState<Task[]>(SAMPLE_TASKS);
  const [achievements, setAchievements] = useState<Achievement[]>(INITIAL_ACHIEVEMENTS);
  const [points, setPoints] = useState(145);
  const [streak, setStreak] = useState(3);

  const addTask = useCallback((title: string, priority: Priority, category: TaskCategory, estimatedMinutes: number, timeBlock?: string) => {
    const newTask: Task = {
      id: generateId(),
      title,
      priority,
      category,
      completed: false,
      createdAt: new Date(),
      estimatedMinutes,
      timeBlock,
    };
    setTasks(prev => [...prev, newTask]);
  }, []);

  const toggleTask = useCallback((id: string) => {
    setTasks(prev => prev.map(t => {
      if (t.id !== id) return t;
      const nowCompleted = !t.completed;
      if (nowCompleted) {
        setPoints(p => p + (t.priority === 'high' ? 30 : t.priority === 'medium' ? 20 : 10));
      }
      return { ...t, completed: nowCompleted, completedAt: nowCompleted ? new Date() : undefined, actualMinutes: nowCompleted ? t.estimatedMinutes : undefined };
    }));
  }, []);

  const deleteTask = useCallback((id: string) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  }, []);

  const todayTasks = useMemo(() => {
    const today = new Date().toDateString();
    return tasks.filter(t => t.createdAt.toDateString() === today);
  }, [tasks]);

  const completedToday = useMemo(() => todayTasks.filter(t => t.completed).length, [todayTasks]);
  const completionRate = useMemo(() => todayTasks.length ? Math.round((completedToday / todayTasks.length) * 100) : 0, [completedToday, todayTasks]);

  const weeklyReflection: WeeklyReflection = useMemo(() => {
    const completed = tasks.filter(t => t.completed);
    const categoryCount: Record<string, number> = {};
    completed.forEach(t => { categoryCount[t.category] = (categoryCount[t.category] || 0) + 1; });
    const topCategory = (Object.entries(categoryCount).sort((a, b) => b[1] - a[1])[0]?.[0] || 'study') as TaskCategory;
    const totalMinutes = completed.reduce((sum, t) => sum + (t.actualMinutes || t.estimatedMinutes), 0);

    return {
      completionRate: tasks.length ? Math.round((completed.length / tasks.length) * 100) : 0,
      totalTasks: tasks.length,
      completedTasks: completed.length,
      mostProductiveDay: 'Tuesday',
      topCategory,
      totalMinutes,
      suggestions: [
        'Try scheduling difficult tasks in the morning when focus is highest.',
        'Consider adding short breaks between intensive study sessions.',
        'Your exercise routine is consistent — keep it up!',
      ],
    };
  }, [tasks]);

  const burnoutRisk = useMemo(() => {
    const todayCount = todayTasks.length;
    const totalEst = todayTasks.reduce((s, t) => s + t.estimatedMinutes, 0);
    if (todayCount > 8 || totalEst > 480) return 'high';
    if (todayCount > 5 || totalEst > 360) return 'medium';
    return 'low';
  }, [todayTasks]);

  const taskPrediction = useCallback((task: Task) => {
    let score = 70;
    if (task.priority === 'high') score -= 10;
    if (task.estimatedMinutes > 60) score -= 10;
    if (todayTasks.length > 6) score -= 15;
    return Math.max(20, Math.min(95, score));
  }, [todayTasks]);

  return {
    tasks, todayTasks, completedToday, completionRate, points, streak,
    achievements, weeklyReflection, burnoutRisk, addTask, toggleTask, deleteTask,
    taskPrediction, CATEGORY_LABELS,
  };
}
