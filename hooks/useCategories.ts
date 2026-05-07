'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/axios';
import type { Product } from './useProducts';

interface CategoryProductsResponse {
  data: Product[];
  total: number;
  page: number;
  limit: number;
  category: Category;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string;
  canonicalUrl?: string;
  _count?: { products: number };
}

export function useCategories() {
  return useQuery<Category[]>({
    queryKey: ['categories'],
    queryFn: async () => {
      const { data } = await api.get('/categories');
      return data;
    },
  });
}

export function useCategoryProducts(slug: string, page = 1, limit = 12) {
  return useQuery({
    queryKey: ['category', slug, page],
    queryFn: async () => {
      const { data } = await api.get(`/categories/${slug}/products?page=${page}&limit=${limit}`);
      return data;
    },
    enabled: !!slug,
  });
}

export function useCreateCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (dto: { name: string; slug: string; description?: string; image?: string; metaTitle?: string; metaDescription?: string; metaKeywords?: string; canonicalUrl?: string }) => {
      const { data } = await api.post('/categories', dto);
      return data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['categories'] }),
  });
}

export function useUpdateCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, dto }: { id: string; dto: Partial<Category> }) => {
      const { data } = await api.patch(`/categories/${id}`, dto);
      return data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['categories'] }),
  });
}

export function useDeleteCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/categories/${id}`);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['categories'] }),
  });
}
