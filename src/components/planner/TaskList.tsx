import { useState } from 'react';
import { Check, Trash2, AlertTriangle, Plus, Heart } from 'lucide-react';
import type { Task, Priority, TaskCategory } from '@/types/planner';
import { cn } from '@/lib/utils';

interface TaskListProps {
  tasks: Task[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onAdd: (title: string, priority: Priority, category: TaskCategory, estimatedMinutes: number, timeBlock?: string) => void;
  taskPrediction: (task: Task) => number;
  categoryLabels: Record<TaskCategory, string>;
}

const PRIORITY_DOTS: Record<Priority, string> = {
  high: 'bg-priority-high',
  medium: 'bg-priority-medium',
  low: 'bg-priority-low',
};

export function TaskList({ tasks, onToggle, onDelete, onAdd, taskPrediction, categoryLabels }: TaskListProps) {
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState<Priority>('medium');
  const [category, setCategory] = useState<TaskCategory>('study');
  const [minutes, setMinutes] = useState(30);

  const handleAdd = () => {
    if (!title.trim()) return;
    onAdd(title.trim(), priority, category, minutes);
    setTitle('');
    setShowForm(false);
  };

  const sorted = [...tasks].sort((a, b) => {
    if (a.completed !== b.completed) return a.completed ? 1 : -1;
    const pOrder: Record<Priority, number> = { high: 0, medium: 1, low: 2 };
    return pOrder[a.priority] - pOrder[b.priority];
  });

  return (
    <div className="glass-card rounded-3xl shadow-soft overflow-hidden">
      <div className="p-5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-lg">📋</span>
          <h2 className="font-bold text-foreground text-lg">Today's Tasks</h2>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary/70 transition-colors px-3 py-1.5 rounded-full bg-primary/10"
        >
          <Plus className="w-4 h-4" /> Add
        </button>
      </div>

      {showForm && (
        <div className="px-5 pb-4 space-y-3 animate-fade-in">
          <input
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="What do you want to accomplish? ✨"
            className="w-full px-4 py-2.5 rounded-2xl bg-muted border-none text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
            onKeyDown={e => e.key === 'Enter' && handleAdd()}
          />
          <div className="flex gap-2 flex-wrap items-center">
            {(['high', 'medium', 'low'] as Priority[]).map(p => (
              <button
                key={p}
                onClick={() => setPriority(p)}
                className={cn(
                  'px-3 py-1.5 rounded-full text-xs font-semibold capitalize transition-all',
                  priority === p ? 'gradient-pink text-primary-foreground shadow-glow' : 'bg-muted text-muted-foreground'
                )}
              >
                {p === 'high' ? '🔴' : p === 'medium' ? '🟡' : '🟢'} {p}
              </button>
            ))}
            <select
              value={category}
              onChange={e => setCategory(e.target.value as TaskCategory)}
              className="px-3 py-1.5 rounded-full bg-muted text-muted-foreground text-xs border-none font-medium"
            >
              {Object.entries(categoryLabels).map(([k, v]) => (
                <option key={k} value={k}>{v}</option>
              ))}
            </select>
            <input
              type="number"
              value={minutes}
              onChange={e => setMinutes(Number(e.target.value))}
              className="w-16 px-3 py-1.5 rounded-full bg-muted text-muted-foreground text-xs border-none text-center"
              placeholder="min"
            />
            <button onClick={handleAdd} className="px-5 py-1.5 rounded-full gradient-pink text-primary-foreground text-xs font-bold shadow-glow">
              Add ✨
            </button>
          </div>
        </div>
      )}

      <div className="divide-y divide-border/50 max-h-[380px] overflow-y-auto px-2 pb-2">
        {sorted.map(task => {
          const prediction = taskPrediction(task);
          return (
            <div
              key={task.id}
              className={cn(
                'flex items-center gap-3 p-3 rounded-2xl mx-1 my-1 transition-all hover:bg-muted/50',
                task.completed && 'opacity-40'
              )}
            >
              <button
                onClick={() => onToggle(task.id)}
                className={cn(
                  'w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all flex-shrink-0',
                  task.completed
                    ? 'bg-success border-success'
                    : 'border-primary/40 hover:border-primary hover:bg-primary/10'
                )}
              >
                {task.completed && <Check className="w-3.5 h-3.5 text-success-foreground" />}
              </button>
              <div className={cn('w-2 h-2 rounded-full flex-shrink-0', PRIORITY_DOTS[task.priority])} />
              <div className="flex-1 min-w-0">
                <p className={cn('text-sm font-semibold text-foreground', task.completed && 'line-through')}>
                  {task.title}
                </p>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-xs text-muted-foreground">{task.estimatedMinutes}m</span>
                  {task.timeBlock && <span className="text-xs text-muted-foreground">⏰ {task.timeBlock}</span>}
                  {!task.completed && prediction < 60 && (
                    <span className="flex items-center gap-0.5 text-xs text-priority-high font-medium">
                      <AlertTriangle className="w-3 h-3" /> {prediction}%
                    </span>
                  )}
                </div>
              </div>
              <button onClick={() => onDelete(task.id)} className="text-muted-foreground/40 hover:text-destructive transition-colors">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
