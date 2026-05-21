import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { User, Order, Notification, ActivityLog, Customer } from '../types';

interface AppState {
  currentUser: User | null;
  users: User[];
  orders: Order[];
  customers: Customer[];
  notifications: Notification[];
  activityLogs: ActivityLog[];
  
  setCurrentUser: (user: User | null) => void;
  addOrder: (order: Order) => void;
  updateOrder: (orderId: string, updates: Partial<Order>) => void;
  addNotification: (notification: Notification) => void;
  markNotificationRead: (notificationId: string) => void;
  addActivityLog: (log: ActivityLog) => void;
  addCustomer: (customer: Customer) => void;
  logout: () => void;
  clearAllData: () => void;
}

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      currentUser: null,
      users: [],
      orders: [],
      customers: [],
      notifications: [],
      activityLogs: [],

      setCurrentUser: (user) => set({ currentUser: user }),

      addOrder: (order) => {
        set((state) => ({
          orders: [order, ...state.orders],
        }));
        
        const log: ActivityLog = {
          id: `log-${Date.now()}`,
          orderId: order.id,
          userId: order.createdBy,
          userName: get().currentUser?.name || 'System',
          action: 'Order Created',
          timestamp: new Date().toISOString(),
          details: `Order ${order.id} created for ${order.customer.name}`,
        };
        get().addActivityLog(log);
      },

      updateOrder: (orderId, updates) => {
        set((state) => ({
          orders: state.orders.map((order) =>
            order.id === orderId ? { ...order, ...updates } : order
          ),
        }));

        const order = get().orders.find((o) => o.id === orderId);
        if (order) {
          const log: ActivityLog = {
            id: `log-${Date.now()}`,
            orderId,
            userId: get().currentUser?.id || 'system',
            userName: get().currentUser?.name || 'System',
            action: `Status updated to ${updates.status || 'unknown'}`,
            timestamp: new Date().toISOString(),
            details: JSON.stringify(updates),
          };
          get().addActivityLog(log);
        }
      },

      addNotification: (notification) =>
        set((state) => ({
          notifications: [notification, ...state.notifications],
        })),

      markNotificationRead: (notificationId) =>
        set((state) => ({
          notifications: state.notifications.map((n) =>
            n.id === notificationId ? { ...n, read: true } : n
          ),
        })),

      addActivityLog: (log) =>
        set((state) => ({
          activityLogs: [log, ...state.activityLogs],
        })),

      addCustomer: (customer) =>
        set((state) => ({
          customers: [customer, ...state.customers],
        })),

      logout: () => set({ currentUser: null }),

      clearAllData: () =>
        set({
          currentUser: null,
          orders: [],
          notifications: [],
          activityLogs: [],
        }),
    }),
    {
      name: 'rasmi-erp-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
