export type UserRole = 'admin' | 'backup_office' | 'godown_incharge' | 'dispatcher' | 'delivery_man';

export type OrderStatus = 
  | 'new'
  | 'do_raised'
  | 'not_available'
  | 'roll_ready'
  | 'dispatched'
  | 'delivered';

export type VehicleType = 'bus' | 'truck' | 'other';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  phone: string;
  createdAt: string;
}

export interface Customer {
  id: string;
  name: string;
  phone: string;
  address: string;
  email?: string;
}

export interface OrderItem {
  id: string;
  productName: string;
  quantity: number;
  rollCount?: number;
}

export interface Order {
  id: string;
  customerId: string;
  customer: Customer;
  items: OrderItem[];
  status: OrderStatus;
  createdAt: string;
  createdBy: string;
  doNumber?: string;
  doRaisedAt?: string;
  doRaisedBy?: string;
  rollReadyAt?: string;
  dispatchedAt?: string;
  dispatchedBy?: string;
  deliveredAt?: string;
  deliveredBy?: string;
  vehicleType?: VehicleType;
  deliveryPhoto?: string;
  notes?: string;
  unavailableReason?: string;
}

export interface Notification {
  id: string;
  userId: string;
  orderId: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'error';
  read: boolean;
  createdAt: string;
}

export interface ActivityLog {
  id: string;
  orderId: string;
  userId: string;
  userName: string;
  action: string;
  timestamp: string;
  details?: string;
}
