'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/axios';

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
  status: 'OPEN' | 'IN_PROGRESS' | 'CLOSED';
  productId?: string;
  product?: { id: string; title: string; images?: string[] };
  createdAt: string;
}

export function useAllInquiries() {
  return useQuery<Inquiry[]>({
    queryKey: ['admin-inquiries'],
    queryFn: async () => {
      const { data } = await api.get('/inquiries');
      return data;
    },
  });
}

export function useCreateInquiry() {
  return useMutation({
    mutationFn: async (dto: { name: string; email: string; phone?: string; message: string; productId?: string }) => {
      const { data } = await api.post('/inquiries', dto);
      return data;
    },
  });
}

export function useUpdateInquiryStatus() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, status }: { id: string; status: Inquiry['status'] }) => {
      const { data } = await api.patch(`/inquiries/${id}`, { status });
      return data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin-inquiries'] }),
  });
}

export function useDeleteInquiry() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/inquiries/${id}`);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin-inquiries'] }),
  });
}
