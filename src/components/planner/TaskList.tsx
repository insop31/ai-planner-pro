import { useState } from 'react';
import { Check, Trash2, AlertTriangle, Plus } from 'lucide-react';
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

const PRIORITY_STYLES: Record<Priority, string> = {
  high: 'border-l-priority-high bg-priority-high/5',
  medium: 'border-l-priority-medium bg-priority-medium/5',
  low: 'border-l-priority-low bg-priority-low/5',
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
    <div className="bg-card rounded-xl shadow-card overflow-hidden">
      <div className="p-4 flex items-center justify-between border-b border-border">
        <h2 className="font-semibold text-foreground text-lg">Today's Tasks</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-1.5 text-sm font-medium text-accent hover:text-accent/80 transition-colors"
        >
          <Plus className="w-4 h-4" /> Add Task
        </button>
      </div>

      {showForm && (
        <div className="p-4 border-b border-border bg-muted/50 space-y-3 animate-fade-in">
          <input
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="Task title..."
            className="w-full px-3 py-2 rounded-lg bg-background border border-input text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent/50"
            onKeyDown={e => e.key === 'Enter' && handleAdd()}
          />
          <div className="flex gap-2 flex-wrap">
            {(['high', 'medium', 'low'] as Priority[]).map(p => (
              <button
                key={p}
                onClick={() => setPriority(p)}
                className={cn(
                  'px-3 py-1 rounded-full text-xs font-medium capitalize transition-all',
                  priority === p ? 'bg-foreground text-background' : 'bg-secondary text-secondary-foreground'
                )}
              >
                {p}
              </button>
            ))}
            <select
              value={category}
              onChange={e => setCategory(e.target.value as TaskCategory)}
              className="px-2 py-1 rounded-lg bg-secondary text-secondary-foreground text-xs border-none"
            >
              {Object.entries(categoryLabels).map(([k, v]) => (
                <option key={k} value={k}>{v}</option>
              ))}
            </select>
            <input
              type="number"
              value={minutes}
              onChange={e => setMinutes(Number(e.target.value))}
              className="w-16 px-2 py-1 rounded-lg bg-secondary text-secondary-foreground text-xs"
              placeholder="min"
            />
            <button onClick={handleAdd} className="px-4 py-1 rounded-full gradient-accent text-accent-foreground text-xs font-semibold">
              Add
            </button>
          </div>
        </div>
      )}

      <div className="divide-y divide-border max-h-[420px] overflow-y-auto">
        {sorted.map(task => {
          const prediction = taskPrediction(task);
          return (
            <div
              key={task.id}
              className={cn(
                'flex items-center gap-3 p-3 border-l-4 transition-all hover:bg-muted/30',
                PRIORITY_STYLES[task.priority],
                task.completed && 'opacity-50'
              )}
            >
              <button
                onClick={() => onToggle(task.id)}
                className={cn(
                  'w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all flex-shrink-0',
                  task.completed
                    ? 'bg-success border-success'
                    : 'border-muted-foreground hover:border-accent'
                )}
              >
                {task.completed && <Check className="w-3 h-3 text-success-foreground" />}
              </button>
              <div className="flex-1 min-w-0">
                <p className={cn('text-sm font-medium text-foreground', task.completed && 'line-through')}>
                  {task.title}
                </p>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-xs text-muted-foreground">{task.estimatedMinutes}m</span>
                  {task.timeBlock && <span className="text-xs text-muted-foreground">⏰ {task.timeBlock}</span>}
                  {!task.completed && prediction < 60 && (
                    <span className="flex items-center gap-0.5 text-xs text-priority-high">
                      <AlertTriangle className="w-3 h-3" /> {prediction}% likely
                    </span>
                  )}
                </div>
              </div>
              <button onClick={() => onDelete(task.id)} className="text-muted-foreground hover:text-destructive transition-colors">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
