import { AlertTriangle, Flame } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Props {
  risk: 'low' | 'medium' | 'high';
}

export function BurnoutAlert({ risk }: Props) {
  if (risk === 'low') return null;

  return (
    <div
      className={cn(
        'rounded-2xl p-4 flex items-start gap-3 animate-fade-in glass-card',
        risk === 'high' ? 'border border-destructive/30 bg-destructive/5' : 'border border-warning/30 bg-warning/5'
      )}
    >
      {risk === 'high' ? (
        <span className="text-xl flex-shrink-0">🔥</span>
      ) : (
        <span className="text-xl flex-shrink-0">💛</span>
      )}
      <div>
        <p className="text-sm font-bold text-foreground">
          {risk === 'high' ? 'Burnout Risk Detected' : 'Schedule Advisory'}
        </p>
        <p className="text-xs text-muted-foreground mt-0.5 font-medium">
          {risk === 'high'
            ? 'Your schedule may cause fatigue. Consider adding breaks or removing some tasks 🌸'
            : 'Busy day ahead! Remember to take breaks between tasks 💆‍♀️'}
        </p>
      </div>
    </div>
  );
}
