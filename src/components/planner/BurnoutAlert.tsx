import { AlertTriangle, Shield, Flame } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Props {
  risk: 'low' | 'medium' | 'high';
}

export function BurnoutAlert({ risk }: Props) {
  if (risk === 'low') return null;

  return (
    <div
      className={cn(
        'rounded-xl p-4 flex items-start gap-3 animate-fade-in',
        risk === 'high' ? 'bg-destructive/10 border border-destructive/20' : 'bg-warning/10 border border-warning/20'
      )}
    >
      {risk === 'high' ? (
        <Flame className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
      ) : (
        <AlertTriangle className="w-5 h-5 text-warning flex-shrink-0 mt-0.5" />
      )}
      <div>
        <p className="text-sm font-semibold text-foreground">
          {risk === 'high' ? '⚠️ Burnout Risk Detected' : '🔔 Schedule Advisory'}
        </p>
        <p className="text-xs text-muted-foreground mt-0.5">
          {risk === 'high'
            ? 'Your schedule is overloaded. Consider removing some tasks or adding breaks to avoid fatigue.'
            : 'You have a busy day ahead. Make sure to take regular breaks between tasks.'}
        </p>
      </div>
    </div>
  );
}
