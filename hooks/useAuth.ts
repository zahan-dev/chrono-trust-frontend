'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/axios';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'ADMIN' | 'CUSTOMER';
}

const getStoredUser = (): User | null => {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem('ct_user');
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

export function useAuth() {
  const queryClient = useQueryClient();

  const { data: user } = useQuery<User | null>({
    queryKey: ['auth-user'],
    queryFn: async () => {
      const token = typeof window !== 'undefined' ? localStorage.getItem('ct_token') : null;
      if (!token) return null;
      try {
        const { data } = await api.get('/auth/me');
        localStorage.setItem('ct_user', JSON.stringify(data));
        return data;
      } catch {
        localStorage.removeItem('ct_token');
        localStorage.removeItem('ct_user');
        return null;
      }
    },
    initialData: getStoredUser,
    staleTime: 1000 * 60 * 10,
  });

  const loginMutation = useMutation({
    mutationFn: async (credentials: { email: string; password: string }) => {
      const { data } = await api.post('/auth/login', credentials);
      return data;
    },
    onSuccess: (data) => {
      localStorage.setItem('ct_token', data.access_token);
      localStorage.setItem('ct_user', JSON.stringify(data.user));
      queryClient.setQueryData(['auth-user'], data.user);
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });

  const registerMutation = useMutation({
    mutationFn: async (dto: { name: string; email: string; password: string }) => {
      const { data } = await api.post('/auth/register', dto);
      return data;
    },
  });

  const logout = () => {
    localStorage.removeItem('ct_token');
    localStorage.removeItem('ct_user');
    queryClient.setQueryData(['auth-user'], null);
    queryClient.clear();
  };

  return {
    user,
    isLoggedIn: !!user,
    isAdmin: user?.role === 'ADMIN',
    login: loginMutation.mutateAsync,
    loginLoading: loginMutation.isPending,
    loginError: loginMutation.error,
    register: registerMutation.mutateAsync,
    registerLoading: registerMutation.isPending,
    registerError: registerMutation.error,
    logout,
  };
}
