import { Badge } from './ui/badge';
import type { OrderStatus } from '../types';

interface OrderStatusBadgeProps {
  status: OrderStatus;
}

const OrderStatusBadge = ({ status }: OrderStatusBadgeProps) => {
  const statusConfig = {
    new: { label: 'New', variant: 'secondary' as const },
    do_raised: { label: 'DO Raised', variant: 'default' as const },
    not_available: { label: 'Not Available', variant: 'destructive' as const },
    roll_ready: { label: 'Roll Ready', variant: 'default' as const },
    dispatched: { label: 'Dispatched', variant: 'default' as const },
    delivered: { label: 'Delivered', variant: 'default' as const },
  };

  const config = statusConfig[status];

  return (
    <Badge variant={config.variant} className="capitalize">
      {config.label}
    </Badge>
  );
};

export default OrderStatusBadge;
