import type { ReactNode } from 'react';
import { Button } from '../ui/button';
import { Plus } from 'lucide-react';
import { cn } from '../../lib/utils';

interface QuickAction {
  label: string;
  icon: ReactNode;
  onClick: () => void;
  variant?: 'default' | 'outline' | 'secondary' | 'ghost' | 'destructive';
  className?: string;
}

interface QuickActionBarProps {
  actions: QuickAction[];
  className?: string;
}

export const QuickActionBar = ({ actions, className }: QuickActionBarProps) => {
  return (
    <div className={cn('flex flex-wrap items-center gap-3', className)}>
      {actions.map((action, index) => (
        <Button
          key={index}
          onClick={action.onClick}
          variant={action.variant || 'default'}
          className={cn('gap-2', action.className)}
        >
          {action.icon}
          <span>{action.label}</span>
        </Button>
      ))}
    </div>
  );
};

interface FloatingActionButtonProps {
  icon?: ReactNode;
  label: string;
  onClick: () => void;
  className?: string;
}

export const FloatingActionButton = ({
  icon = <Plus className="h-5 w-5" />,
  label,
  onClick,
  className,
}: FloatingActionButtonProps) => {
  return (
    <Button
      onClick={onClick}
      size="lg"
      className={cn(
        'fixed bottom-6 right-6 rounded-full shadow-lg h-14 px-6 gap-2 z-50',
        'lg:hidden', // Only show on mobile
        className
      )}
    >
      {icon}
      <span className="font-medium">{label}</span>
    </Button>
  );
};
