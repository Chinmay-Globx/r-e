import type { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { ArrowRight, TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '../../lib/utils';

interface ClickableMetricCardProps {
  title: string;
  value: number | string;
  description: string;
  icon: ReactNode;
  onClick?: () => void;
  href?: string;
  trend?: {
    value: number;
    direction: 'up' | 'down';
  };
  variant?: 'default' | 'success' | 'warning' | 'danger';
  className?: string;
}

export const ClickableMetricCard = ({
  title,
  value,
  description,
  icon,
  onClick,
  href,
  trend,
  variant = 'default',
  className,
}: ClickableMetricCardProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else if (href) {
      navigate(href);
    }
  };

  const isClickable = !!(onClick || href);

  const variantStyles = {
    default: 'hover:border-primary/50',
    success: 'hover:border-green-500/50 border-green-500/20',
    warning: 'hover:border-yellow-500/50 border-yellow-500/20',
    danger: 'hover:border-red-500/50 border-red-500/20',
  };

  return (
    <Card
      className={cn(
        'transition-all duration-200',
        isClickable && [
          'cursor-pointer hover:shadow-md hover:-translate-y-1',
          variantStyles[variant],
          'group',
        ],
        className
      )}
      onClick={isClickable ? handleClick : undefined}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="flex items-center gap-2">
          {icon}
          {isClickable && (
            <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-end justify-between">
          <div>
            <div className="text-2xl font-bold">{value}</div>
            <p className="text-xs text-muted-foreground mt-1">{description}</p>
          </div>
          {trend && (
            <div
              className={cn(
                'flex items-center gap-1 text-xs font-medium',
                trend.direction === 'up' ? 'text-green-600' : 'text-red-600'
              )}
            >
              {trend.direction === 'up' ? (
                <TrendingUp className="h-3 w-3" />
              ) : (
                <TrendingDown className="h-3 w-3" />
              )}
              <span>{Math.abs(trend.value)}%</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
