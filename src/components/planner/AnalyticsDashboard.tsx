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
  { name: 'Study', value: 40, color: 'hsl(340, 60%, 72%)' },
  { name: 'Work', value: 25, color: 'hsl(280, 40%, 75%)' },
  { name: 'Personal', value: 15, color: 'hsl(170, 45%, 65%)' },
  { name: 'Exercise', value: 15, color: 'hsl(35, 80%, 65%)' },
  { name: 'Break', value: 5, color: 'hsl(200, 50%, 72%)' },
];

export function AnalyticsDashboard({ reflection }: AnalyticsDashboardProps) {
  return (
    <div className="glass-card rounded-3xl shadow-soft p-5 space-y-5">
      <div className="flex items-center gap-2">
        <span className="text-lg">📊</span>
        <h2 className="font-bold text-foreground text-lg">Productivity Analytics</h2>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {[
          { label: 'Completion', value: `${reflection.completionRate}%`, gradient: 'gradient-pink' },
          { label: 'Best Day', value: reflection.mostProductiveDay, gradient: 'gradient-lavender' },
          { label: 'Total Time', value: `${Math.round(reflection.totalMinutes / 60)}h`, gradient: 'gradient-mint' },
        ].map(s => (
          <div key={s.label} className={`text-center p-3 rounded-2xl ${s.gradient}`}>
            <p className="text-xl font-bold text-primary-foreground">{s.value}</p>
            <p className="text-xs text-primary-foreground/80 font-medium">{s.label}</p>
          </div>
        ))}
      </div>

      <div>
        <h3 className="text-sm font-semibold text-muted-foreground mb-2">Tasks per Day</h3>
        <ResponsiveContainer width="100%" height={130}>
          <BarChart data={weekData}>
            <XAxis dataKey="day" tick={{ fontSize: 11, fill: 'hsl(340, 15%, 50%)' }} axisLine={false} tickLine={false} />
            <YAxis hide />
            <Tooltip
              contentStyle={{ backgroundColor: 'hsl(20, 50%, 95%)', border: '1px solid hsl(20, 40%, 90%)', borderRadius: '16px', fontSize: '12px' }}
            />
            <Bar dataKey="tasks" radius={[8, 8, 0, 0]} fill="hsl(340, 60%, 78%)" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-muted-foreground mb-2">Time by Category</h3>
        <div className="flex items-center gap-4">
          <ResponsiveContainer width={110} height={110}>
            <PieChart>
              <Pie data={categoryData} innerRadius={28} outerRadius={48} dataKey="value" paddingAngle={4}>
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
                <span className="text-muted-foreground font-medium">{c.name}</span>
                <span className="font-bold text-foreground">{c.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
