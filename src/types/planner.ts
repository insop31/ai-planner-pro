export type Priority = 'high' | 'medium' | 'low';
export type TaskCategory = 'study' | 'work' | 'personal' | 'exercise' | 'break';

export interface Task {
  id: string;
  title: string;
  priority: Priority;
  category: TaskCategory;
  completed: boolean;
  createdAt: Date;
  completedAt?: Date;
  deadline?: Date;
  estimatedMinutes: number;
  actualMinutes?: number;
  timeBlock?: string;
}

export interface DayStats {
  date: string;
  tasksCompleted: number;
  tasksPending: number;
  totalMinutes: number;
  points: number;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: Date;
}

export interface WeeklyReflection {
  completionRate: number;
  totalTasks: number;
  completedTasks: number;
  mostProductiveDay: string;
  topCategory: TaskCategory;
  totalMinutes: number;
  suggestions: string[];
}
