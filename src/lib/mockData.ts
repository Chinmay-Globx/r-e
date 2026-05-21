import type { User, Customer, Order } from '../types';

export const mockUsers: User[] = [
  {
    id: 'user-1',
    name: 'Admin User',
    email: 'admin@rasmi.com',
    role: 'admin',
    phone: '+91 9876543210',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'user-2',
    name: 'Rajesh Kumar',
    email: 'rajesh@rasmi.com',
    role: 'backup_office',
    phone: '+91 9876543211',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'user-3',
    name: 'Suresh Patel',
    email: 'suresh@rasmi.com',
    role: 'godown_incharge',
    phone: '+91 9876543212',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'user-4',
    name: 'Amit Singh',
    email: 'amit@rasmi.com',
    role: 'dispatcher',
    phone: '+91 9876543213',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'user-5',
    name: 'Vijay Sharma',
    email: 'vijay@rasmi.com',
    role: 'delivery_man',
    phone: '+91 9876543214',
    createdAt: new Date().toISOString(),
  },
];

export const mockCustomers: Customer[] = [
  {
    id: 'cust-1',
    name: 'ABC Textiles Pvt Ltd',
    phone: '+91 9988776655',
    address: '123, Industrial Area, Phase 1, Mumbai',
    email: 'orders@abctextiles.com',
  },
  {
    id: 'cust-2',
    name: 'XYZ Fabrics',
    phone: '+91 9988776656',
    address: '456, Textile Market, Delhi',
    email: 'purchase@xyzfabrics.com',
  },
  {
    id: 'cust-3',
    name: 'Modern Garments',
    phone: '+91 9988776657',
    address: '789, Fashion Street, Bangalore',
    email: 'info@moderngarments.com',
  },
  {
    id: 'cust-4',
    name: 'Supreme Textiles',
    phone: '+91 9988776658',
    address: '321, Market Road, Chennai',
    email: 'orders@supremetextiles.com',
  },
  {
    id: 'cust-5',
    name: 'Elite Fabrics Co',
    phone: '+91 9988776659',
    address: '654, Trade Center, Ahmedabad',
    email: 'sales@elitefabrics.com',
  },
];

const getRandomDate = (daysAgo: number) => {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  return date.toISOString();
};

export const mockOrders: Order[] = [
  {
    id: 'ORD-2024-001',
    customerId: 'cust-1',
    customer: mockCustomers[0],
    items: [
      { id: 'item-1', productName: 'Cotton Fabric Roll', quantity: 50, rollCount: 50 },
      { id: 'item-2', productName: 'Silk Fabric Roll', quantity: 30, rollCount: 30 },
    ],
    status: 'delivered',
    createdAt: getRandomDate(5),
    createdBy: 'user-2',
    doNumber: 'DO-001',
    doRaisedAt: getRandomDate(4),
    doRaisedBy: 'user-3',
    rollReadyAt: getRandomDate(3),
    dispatchedAt: getRandomDate(2),
    dispatchedBy: 'user-4',
    deliveredAt: getRandomDate(1),
    deliveredBy: 'user-5',
    vehicleType: 'truck',
    deliveryPhoto: 'https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?w=400',
  },
  {
    id: 'ORD-2024-002',
    customerId: 'cust-2',
    customer: mockCustomers[1],
    items: [
      { id: 'item-3', productName: 'Polyester Fabric Roll', quantity: 100, rollCount: 100 },
    ],
    status: 'dispatched',
    createdAt: getRandomDate(2),
    createdBy: 'user-2',
    doNumber: 'DO-002',
    doRaisedAt: getRandomDate(1),
    doRaisedBy: 'user-3',
    rollReadyAt: getRandomDate(1),
    dispatchedAt: new Date().toISOString(),
    dispatchedBy: 'user-4',
    vehicleType: 'bus',
  },
  {
    id: 'ORD-2024-003',
    customerId: 'cust-3',
    customer: mockCustomers[2],
    items: [
      { id: 'item-4', productName: 'Linen Fabric Roll', quantity: 25, rollCount: 25 },
      { id: 'item-5', productName: 'Wool Fabric Roll', quantity: 15, rollCount: 15 },
    ],
    status: 'roll_ready',
    createdAt: getRandomDate(1),
    createdBy: 'user-2',
    doNumber: 'DO-003',
    doRaisedAt: new Date().toISOString(),
    doRaisedBy: 'user-3',
    rollReadyAt: new Date().toISOString(),
  },
  {
    id: 'ORD-2024-004',
    customerId: 'cust-4',
    customer: mockCustomers[3],
    items: [
      { id: 'item-6', productName: 'Denim Fabric Roll', quantity: 75 },
    ],
    status: 'do_raised',
    createdAt: new Date().toISOString(),
    createdBy: 'user-2',
    doNumber: 'DO-004',
    doRaisedAt: new Date().toISOString(),
    doRaisedBy: 'user-3',
  },
  {
    id: 'ORD-2024-005',
    customerId: 'cust-5',
    customer: mockCustomers[4],
    items: [
      { id: 'item-7', productName: 'Velvet Fabric Roll', quantity: 40 },
    ],
    status: 'new',
    createdAt: new Date().toISOString(),
    createdBy: 'user-2',
  },
  {
    id: 'ORD-2024-006',
    customerId: 'cust-1',
    customer: mockCustomers[0],
    items: [
      { id: 'item-8', productName: 'Chiffon Fabric Roll', quantity: 60 },
    ],
    status: 'not_available',
    createdAt: getRandomDate(1),
    createdBy: 'user-2',
    unavailableReason: 'Out of stock - Expected delivery in 3 days',
  },
];

export const initializeMockData = (store: any) => {
  const existingOrders = store.getState().orders;
  const existingCustomers = store.getState().customers;
  const existingUsers = store.getState().users;

  if (existingOrders.length === 0) {
    mockOrders.forEach((order) => {
      store.setState((state: any) => ({
        orders: [...state.orders, order],
      }));
    });
  }

  if (existingCustomers.length === 0) {
    mockCustomers.forEach((customer) => {
      store.setState((state: any) => ({
        customers: [...state.customers, customer],
      }));
    });
  }

  if (existingUsers.length === 0) {
    store.setState({ users: mockUsers });
  }
};
