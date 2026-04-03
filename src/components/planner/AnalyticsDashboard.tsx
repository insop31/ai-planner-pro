import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';
import type { WeeklyReflection } from '@/types/planner';

interface AnalyticsDashboardProps {
  reflection: WeeklyReflection;
}

const weekData = [
  { day: 'Mon', tasks: 5 },
  { day: 'Tue', tasks: 8 },
  { day: 'Wed', tasks: 6 },
  { day: 'Thu', tasks: 4 },
  { day: 'Fri', tasks: 7 },
  { day: 'Sat', tasks: 3 },
  { day: 'Sun', tasks: 2 },
];

const categoryData = [
  { name: 'Study', value: 40, color: 'hsl(222, 47%, 15%)' },
  { name: 'Work', value: 25, color: 'hsl(35, 92%, 55%)' },
  { name: 'Personal', value: 15, color: 'hsl(152, 60%, 45%)' },
  { name: 'Exercise', value: 15, color: 'hsl(262, 52%, 55%)' },
  { name: 'Break', value: 5, color: 'hsl(195, 74%, 50%)' },
];

export function AnalyticsDashboard({ reflection }: AnalyticsDashboardProps) {
  return (
    <div className="bg-card rounded-xl shadow-card p-5 space-y-5">
      <h2 className="font-semibold text-foreground text-lg">📊 Productivity Analytics</h2>

      <div className="grid grid-cols-3 gap-3">
        <div className="text-center p-3 bg-muted rounded-lg">
          <p className="text-2xl font-bold text-foreground">{reflection.completionRate}%</p>
          <p className="text-xs text-muted-foreground">Completion</p>
        </div>
        <div className="text-center p-3 bg-muted rounded-lg">
          <p className="text-2xl font-bold text-foreground">{reflection.mostProductiveDay}</p>
          <p className="text-xs text-muted-foreground">Best Day</p>
        </div>
        <div className="text-center p-3 bg-muted rounded-lg">
          <p className="text-2xl font-bold text-foreground">{Math.round(reflection.totalMinutes / 60)}h</p>
          <p className="text-xs text-muted-foreground">Total Time</p>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium text-muted-foreground mb-2">Tasks per Day</h3>
        <ResponsiveContainer width="100%" height={140}>
          <BarChart data={weekData}>
            <XAxis dataKey="day" tick={{ fontSize: 11, fill: 'hsl(215, 16%, 47%)' }} axisLine={false} tickLine={false} />
            <YAxis hide />
            <Tooltip
              contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px', fontSize: '12px' }}
            />
            <Bar dataKey="tasks" radius={[4, 4, 0, 0]} fill="hsl(35, 92%, 55%)" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div>
        <h3 className="text-sm font-medium text-muted-foreground mb-2">Time by Category</h3>
        <div className="flex items-center gap-4">
          <ResponsiveContainer width={120} height={120}>
            <PieChart>
              <Pie data={categoryData} innerRadius={30} outerRadius={50} dataKey="value" paddingAngle={3}>
                {categoryData.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-1.5">
            {categoryData.map(c => (
              <div key={c.name} className="flex items-center gap-2 text-xs">
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: c.color }} />
                <span className="text-muted-foreground">{c.name}</span>
                <span className="font-medium text-foreground">{c.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
