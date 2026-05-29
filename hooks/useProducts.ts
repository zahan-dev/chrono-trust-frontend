'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/axios';

export interface Product {
  id: string;
  title: string;
  slug: string;
  brand?: string;
  model?: string;
  description?: string;
  price?: number;
  images: string[];
  inStock: boolean;
  sku?: string;
  featured: boolean;
  categoryId?: string;
  category?: { id: string; name: string; slug: string };
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string;
  canonicalUrl?: string;
  createdAt: string;
}

export interface ProductsResponse {
  data: Product[];
  total: number;
  page: number;
  limit: number;
}

export interface ProductFilters {
  page?: number;
  limit?: number;
  q?: string;
  categorySlug?: string;
  minPrice?: number;
  maxPrice?: number;
  featured?: boolean;
  sortBy?: string;
}

export function useProducts(filters: ProductFilters = {}) {
  const params = new URLSearchParams();
  if (filters.page) params.set('page', String(filters.page));
  if (filters.limit) params.set('limit', String(filters.limit));
  if (filters.q) params.set('q', filters.q);
  if (filters.categorySlug) params.set('categorySlug', filters.categorySlug);
  if (filters.minPrice !== undefined) params.set('minPrice', String(filters.minPrice));
  if (filters.maxPrice !== undefined) params.set('maxPrice', String(filters.maxPrice));
  if (filters.featured !== undefined) params.set('featured', String(filters.featured));
  if (filters.sortBy) params.set('sortBy', filters.sortBy);

  return useQuery<ProductsResponse>({
    queryKey: ['products', filters],
    queryFn: async () => {
      const { data } = await api.get(`/products?${params.toString()}`);
      return data;
    },
  });
}

export function useFeaturedProducts() {
  return useQuery<Product[]>({
    queryKey: ['products', 'featured'],
    queryFn: async () => {
      const { data } = await api.get('/products/featured');
      return data;
    },
  });
}

export function useProduct(slug: string) {
  return useQuery<Product>({
    queryKey: ['product', slug],
    queryFn: async () => {
      const { data } = await api.get(`/products/slug/${slug}`);
      return data;
    },
    enabled: !!slug,
  });
}

export function useRelatedProducts(slug: string) {
  return useQuery<Product[]>({
    queryKey: ['products', 'related', slug],
    queryFn: async () => {
      const { data } = await api.get(`/products/slug/${slug}/related`);
      return data;
    },
    enabled: !!slug,
  });
}

export function useCreateProduct() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (dto: Partial<Product>) => {
      const { data } = await api.post('/products', dto);
      return data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['products'] }),
  });
}

export function useUpdateProduct() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, dto }: { id: string; dto: Partial<Product> }) => {
      const { data } = await api.patch(`/products/${id}`, dto);
      return data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['products'] }),
  });
}

export function useDeleteProduct() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/products/${id}`);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['products'] }),
  });
}
