import type { Order } from '../types';
import type { OrderFilters } from '../hooks/useFilters';

export const filterOrders = (
  orders: Order[],
  filters: OrderFilters,
  currentUserId?: string
): Order[] => {
  let filtered = [...orders];

  // Filter by status
  if (filters.status) {
    const statuses = Array.isArray(filters.status) ? filters.status : [filters.status];
    filtered = filtered.filter((order) => statuses.includes(order.status));
  }

  // Filter by date
  if (filters.date) {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    if (filters.date === 'today') {
      filtered = filtered.filter((order) => {
        const orderDate = new Date(order.createdAt);
        return orderDate >= today;
      });
    } else if (filters.date === 'week') {
      const weekAgo = new Date(today);
      weekAgo.setDate(weekAgo.getDate() - 7);
      filtered = filtered.filter((order) => {
        const orderDate = new Date(order.createdAt);
        return orderDate >= weekAgo;
      });
    } else if (filters.date === 'month') {
      const monthAgo = new Date(today);
      monthAgo.setMonth(monthAgo.getMonth() - 1);
      filtered = filtered.filter((order) => {
        const orderDate = new Date(order.createdAt);
        return orderDate >= monthAgo;
      });
    }
  }

  // Filter by creator
  if (filters.createdBy) {
    if (filters.createdBy === 'me' && currentUserId) {
      filtered = filtered.filter((order) => order.createdBy === currentUserId);
    } else if (filters.createdBy !== 'me') {
      filtered = filtered.filter((order) => order.createdBy === filters.createdBy);
    }
  }

  // Filter by delivery person
  if (filters.deliveredBy) {
    if (filters.deliveredBy === 'me' && currentUserId) {
      filtered = filtered.filter((order) => order.deliveredBy === currentUserId);
    } else if (filters.deliveredBy !== 'me') {
      filtered = filtered.filter((order) => order.deliveredBy === filters.deliveredBy);
    }
  }

  // Filter by search term
  if (filters.search) {
    const searchLower = filters.search.toLowerCase();
    filtered = filtered.filter(
      (order) =>
        order.id.toLowerCase().includes(searchLower) ||
        order.customer.name.toLowerCase().includes(searchLower) ||
        order.customer.phone.includes(searchLower) ||
        order.doNumber?.toLowerCase().includes(searchLower)
    );
  }

  return filtered;
};
