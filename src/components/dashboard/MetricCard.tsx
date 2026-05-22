import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import type { LucideIcon } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: number | string;
  description?: string;
  icon: LucideIcon;
  gradient?: 'blue' | 'purple' | 'emerald' | 'amber' | 'sky' | 'rose' | 'indigo';
  trend?: {
    value: number;
    isPositive: boolean;
  };
  href?: string;
}

const gradientClasses = {
  blue: 'gradient-blue border-blue-200',
  purple: 'gradient-purple border-purple-200',
  emerald: 'gradient-emerald border-emerald-200',
  amber: 'gradient-amber border-amber-200',
  sky: 'gradient-sky border-sky-200',
  rose: 'gradient-rose border-rose-200',
  indigo: 'bg-gradient-to-br from-indigo-50 to-indigo-100 border-indigo-200',
};

const iconBgClasses = {
  blue: 'bg-blue-500',
  purple: 'bg-purple-500',
  emerald: 'bg-emerald-500',
  amber: 'bg-amber-500',
  sky: 'bg-sky-500',
  rose: 'bg-rose-500',
  indigo: 'bg-indigo-500',
};

const textClasses = {
  blue: 'text-blue-700',
  purple: 'text-purple-700',
  emerald: 'text-emerald-700',
  amber: 'text-amber-700',
  sky: 'text-sky-700',
  rose: 'text-rose-700',
  indigo: 'text-indigo-700',
};

const MetricCard = ({ 
  title, 
  value, 
  description, 
  icon: Icon, 
  gradient = 'blue',
  trend,
  href 
}: MetricCardProps) => {
  const CardWrapper = href ? 'a' : 'div';
  const cardProps = href ? { href, className: 'block' } : {};

  return (
    <CardWrapper {...cardProps}>
      <Card className={`hover-lift border-2 ${gradientClasses[gradient]} transition-all duration-200 cursor-pointer animate-scale-in`}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-gray-700">
            {title}
          </CardTitle>
          <div className={`${iconBgClasses[gradient]} p-2 rounded-full`}>
            <Icon className="h-4 w-4 text-white" />
          </div>
        </CardHeader>
        <CardContent>
          <div className={`text-3xl font-bold ${textClasses[gradient]} mb-1`}>
            {value}
          </div>
          {description && (
            <p className="text-xs text-gray-600">
              {description}
            </p>
          )}
          {trend && (
            <div className={`text-xs font-medium mt-2 flex items-center gap-1 ${trend.isPositive ? 'text-emerald-600' : 'text-rose-600'}`}>
              <span>{trend.isPositive ? '↑' : '↓'}</span>
              <span>{Math.abs(trend.value)}%</span>
              <span className="text-gray-500">vs last period</span>
            </div>
          )}
        </CardContent>
      </Card>
    </CardWrapper>
  );
};

export default MetricCard;
