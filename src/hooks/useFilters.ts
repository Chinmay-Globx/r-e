import { useSearchParams } from 'react-router-dom';
import { useMemo } from 'react';
import type { OrderStatus } from '../types';

export interface OrderFilters {
  status?: OrderStatus | OrderStatus[];
  date?: 'today' | 'week' | 'month' | string;
  createdBy?: string | 'me';
  deliveredBy?: string | 'me';
  search?: string;
}

export const useFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const filters = useMemo(() => {
    const params: OrderFilters = {};

    const status = searchParams.get('status');
    if (status) {
      params.status = status.includes(',')
        ? (status.split(',') as OrderStatus[])
        : (status as OrderStatus);
    }

    const date = searchParams.get('date');
    if (date) {
      params.date = date;
    }

    const createdBy = searchParams.get('createdBy');
    if (createdBy) {
      params.createdBy = createdBy;
    }

    const deliveredBy = searchParams.get('deliveredBy');
    if (deliveredBy) {
      params.deliveredBy = deliveredBy;
    }

    const search = searchParams.get('search');
    if (search) {
      params.search = search;
    }

    return params;
  }, [searchParams]);

  const setFilters = (newFilters: Partial<OrderFilters>) => {
    const params = new URLSearchParams();

    Object.entries(newFilters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        if (Array.isArray(value)) {
          params.set(key, value.join(','));
        } else {
          params.set(key, String(value));
        }
      }
    });

    setSearchParams(params);
  };

  const clearFilters = () => {
    setSearchParams(new URLSearchParams());
  };

  const hasActiveFilters = useMemo(() => {
    return searchParams.toString().length > 0;
  }, [searchParams]);

  return {
    filters,
    setFilters,
    clearFilters,
    hasActiveFilters,
  };
};
