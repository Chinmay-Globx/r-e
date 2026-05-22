import { Badge } from './ui/badge';
import { Sparkles, FileText, XCircle, Package, Truck, CheckCircle } from 'lucide-react';
import type { OrderStatus } from '../types';

interface OrderStatusBadgeProps {
  status: OrderStatus;
}

const OrderStatusBadge = ({ status }: OrderStatusBadgeProps) => {
  const statusConfig = {
    new: { 
      label: 'New', 
      variant: 'warning' as const,
      icon: Sparkles,
      className: 'bg-amber-100 text-amber-700 border-amber-300'
    },
    do_raised: { 
      label: 'DO Raised', 
      variant: 'default' as const,
      icon: FileText,
      className: 'bg-sky-100 text-sky-700 border-sky-300'
    },
    not_available: { 
      label: 'Not Available', 
      variant: 'destructive' as const,
      icon: XCircle,
      className: 'bg-rose-100 text-rose-700 border-rose-300'
    },
    roll_ready: { 
      label: 'Roll Ready', 
      variant: 'secondary' as const,
      icon: Package,
      className: 'bg-indigo-100 text-indigo-700 border-indigo-300'
    },
    dispatched: { 
      label: 'Dispatched', 
      variant: 'secondary' as const,
      icon: Truck,
      className: 'bg-purple-100 text-purple-700 border-purple-300'
    },
    delivered: { 
      label: 'Delivered', 
      variant: 'success' as const,
      icon: CheckCircle,
      className: 'bg-emerald-100 text-emerald-700 border-emerald-300'
    },
  };

  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <Badge variant={config.variant} className={`capitalize border ${config.className} flex items-center gap-1`}>
      <Icon className="h-3 w-3" />
      {config.label}
    </Badge>
  );
};

export default OrderStatusBadge;
