'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/axios';
import type { Product } from './useProducts';

export interface CartItem {
  id: string;
  productId: string;
  quantity: number;
  product: Product;
}

export interface Cart {
  id: string;
  items: CartItem[];
}

const CART_STORAGE_KEY = 'ct_guest_cart';

function getGuestCart(): Cart {
  if (typeof window === 'undefined') return { id: 'guest', items: [] };
  const stored = localStorage.getItem(CART_STORAGE_KEY);
  return stored ? JSON.parse(stored) : { id: 'guest', items: [] };
}

function saveGuestCart(cart: Cart) {
  if (typeof window !== 'undefined') {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  }
}

export function useCart() {
  return useQuery<Cart | null>({
    queryKey: ['cart'],
    queryFn: async () => {
      // Use localStorage for guest cart
      return getGuestCart();
    },
    staleTime: Infinity,
  });
}

export function useCartItemCount() {
  const { data: cart } = useCart();
  return cart?.items?.reduce((sum, item) => sum + item.quantity, 0) ?? 0;
}

export function useAddToCart() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ productId, quantity, product }: { productId: string; quantity: number; product: Product }) => {
      const cart = getGuestCart();
      const existingItem = cart.items.find((item) => item.product.id === productId);

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        cart.items.push({
          id: `${Date.now()}-${productId}`,
          productId,
          quantity,
          product,
        });
      }

      saveGuestCart(cart);
      return cart;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['cart'] }),
  });
}

export function useUpdateCartItem() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ itemId, quantity }: { itemId: string; quantity: number }) => {
      const cart = getGuestCart();
      const item = cart.items.find((i) => i.id === itemId);
      if (item) {
        item.quantity = quantity;
      }
      saveGuestCart(cart);
      return cart;
    },
    onMutate: async ({ itemId, quantity }) => {
      await queryClient.cancelQueries({ queryKey: ['cart'] });
      const prev = queryClient.getQueryData<Cart>(['cart']);
      queryClient.setQueryData<Cart | null>(['cart'], (old) => {
        if (!old) return old;
        return {
          ...old,
          items: old.items.map((item) =>
            item.id === itemId ? { ...item, quantity } : item
          ),
        };
      });
      return { prev };
    },
    onError: (_err, _vars, ctx) => {
      if (ctx?.prev) queryClient.setQueryData(['cart'], ctx.prev);
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: ['cart'] }),
  });
}

export function useRemoveFromCart() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (itemId: string) => {
      const cart = getGuestCart();
      cart.items = cart.items.filter((i) => i.id !== itemId);
      saveGuestCart(cart);
      return cart;
    },
    onMutate: async (itemId) => {
      await queryClient.cancelQueries({ queryKey: ['cart'] });
      const prev = queryClient.getQueryData<Cart>(['cart']);
      queryClient.setQueryData<Cart | null>(['cart'], (old) => {
        if (!old) return old;
        return { ...old, items: old.items.filter((i) => i.id !== itemId) };
      });
      return { prev };
    },
    onError: (_err, _vars, ctx) => {
      if (ctx?.prev) queryClient.setQueryData(['cart'], ctx.prev);
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: ['cart'] }),
  });
}

export function useClearCart() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      const cart: Cart = { id: 'guest', items: [] };
      saveGuestCart(cart);
      return cart;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['cart'] }),
  });
}
