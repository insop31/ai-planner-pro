import { useMemo } from 'react';

interface WeekCalendarProps {
  selectedDate?: Date;
}

export function WeekCalendar({ selectedDate = new Date() }: WeekCalendarProps) {
  const days = useMemo(() => {
    const today = selectedDate;
    const dayOfWeek = today.getDay();
    const monday = new Date(today);
    monday.setDate(today.getDate() - ((dayOfWeek + 6) % 7));

    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(monday);
      d.setDate(monday.getDate() + i);
      return {
        label: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'][i],
        date: d.getDate(),
        isToday: d.toDateString() === today.toDateString(),
      };
    });
  }, [selectedDate]);

  return (
    <div className="glass-card rounded-3xl shadow-soft p-5">
      <div className="flex items-center justify-between">
        {days.map(day => (
          <div key={day.label} className="flex flex-col items-center gap-1.5">
            <span className="text-xs font-semibold text-muted-foreground">{day.label}</span>
            <div
              className={
                day.isToday
                  ? 'w-9 h-9 rounded-xl gradient-pink flex items-center justify-center text-sm font-bold text-primary-foreground shadow-glow'
                  : 'w-9 h-9 rounded-xl bg-muted flex items-center justify-center text-sm font-semibold text-foreground'
              }
            >
              {day.date}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
