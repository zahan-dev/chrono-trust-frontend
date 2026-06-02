'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/axios';

export interface OrderItem {
  id: string;
  quantity: number;
  price: number;
  product: { id: string; title: string; images: string[] };
}

export interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  address: string;
  city: string;
  state?: string;
  postalCode: string;
  country: string;
  note?: string;
  paymentMethod?: 'PAYPAL' | 'WIRE_TRANSFER';
  paymentStatus?: 'PENDING' | 'AWAITING_TRANSFER' | 'PAID' | 'FAILED' | 'REFUNDED';
  paypalOrderId?: string;
  paypalCaptureId?: string;
  paypalTransactionId?: string;
  status: 'PENDING' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';
  total: number;
  items: OrderItem[];
  createdAt: string;
}

export interface CreateOrderDto {
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  address: string;
  city: string;
  state?: string;
  postalCode: string;
  country: string;
  note?: string;
  paymentMethod?: 'PAYPAL' | 'WIRE_TRANSFER';
  items: { productId: string; quantity: number }[];
}

export function useMyOrders() {
  return useQuery<Order[]>({
    queryKey: ['my-orders'],
    queryFn: async () => {
      const { data } = await api.get('/orders/my-orders');
      return data;
    },
  });
}

export function useCreateOrder() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (dto: CreateOrderDto) => {
      const { data } = await api.post('/orders', dto);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      queryClient.invalidateQueries({ queryKey: ['my-orders'] });
    },
  });
}

export function useAllOrders() {
  return useQuery<Order[]>({
    queryKey: ['admin-orders'],
    queryFn: async () => {
      const { data } = await api.get('/orders');
      return data;
    },
  });
}

export function useUpdateOrderStatus() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, status }: { id: string; status: Order['status'] }) => {
      const { data } = await api.patch(`/orders/${id}/status`, { status });
      return data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin-orders'] }),
  });
}

export function useUpdateOrderPaymentStatus() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, paymentStatus }: { id: string; paymentStatus: Order['paymentStatus'] }) => {
      const { data } = await api.patch(`/orders/${id}/payment-status`, { paymentStatus });
      return data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin-orders'] }),
  });
}

export function useCreatePayPalOrder() {
  return useMutation({
    mutationFn: async (items: { productId: string; quantity: number }[]) => {
      const { data } = await api.post('/payments/paypal/create-order', { items });
      return data as { id: string };
    },
  });
}

export interface CapturePayPalOrderDto {
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  address: string;
  city: string;
  state?: string;
  postalCode: string;
  country: string;
  note?: string;
  items: { productId: string; quantity: number }[];
}

export function useCapturePayPalOrder() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ orderId, dto }: { orderId: string; dto: CapturePayPalOrderDto }) => {
      const { data } = await api.post(`/payments/paypal/capture/${orderId}`, dto);
      return data as { order: Order };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      queryClient.invalidateQueries({ queryKey: ['my-orders'] });
      queryClient.invalidateQueries({ queryKey: ['admin-orders'] });
    },
  });
}

export function useDeleteOrder() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/orders/${id}`);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin-orders'] }),
  });
}
