/**
 * API Client for ChronoTrust Backend
 * 
 * This file provides type-safe API calls to the NestJS backend
 */

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

// Helper function to get auth token from localStorage
const getAuthToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('auth_token');
  }
  return null;
};

// Helper function to make authenticated requests
const fetchWithAuth = async (url: string, options: RequestInit = {}) => {
  const token = getAuthToken();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}${url}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Request failed' }));
    throw new Error(error.message || 'Request failed');
  }

  return response.json();
};

// ==========================================
// AUTHENTICATION
// ==========================================

export const auth = {
  register: async (data: { name: string; email: string; password: string }) => {
    return fetchWithAuth('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  login: async (data: { email: string; password: string }) => {
    const response = await fetchWithAuth('/auth/login', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    
    // Store token in localStorage
    if (response.access_token && typeof window !== 'undefined') {
      localStorage.setItem('auth_token', response.access_token);
    }
    
    return response;
  },

  logout: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth_token');
    }
  },

  getProfile: async () => {
    return fetchWithAuth('/auth/me');
  },
};

// ==========================================
// PRODUCTS
// ==========================================

export const products = {
  getAll: async (params?: { page?: number; limit?: number }) => {
    const query = new URLSearchParams(params as any).toString();
    return fetch(`${API_URL}/products?${query}`).then(r => r.json());
  },

  search: async (params: {
    q?: string;
    categorySlug?: string;
    brand?: string;
    minPrice?: number;
    maxPrice?: number;
    page?: number;
    limit?: number;
  }) => {
    const query = new URLSearchParams(params as any).toString();
    return fetch(`${API_URL}/products/search?${query}`).then(r => r.json());
  },

  getFeatured: async () => {
    return fetch(`${API_URL}/products/featured`).then(r => r.json());
  },

  getBySlug: async (slug: string) => {
    return fetch(`${API_URL}/products/${slug}`).then(r => r.json());
  },

  getRelated: async (slug: string) => {
    return fetch(`${API_URL}/products/${slug}/related`).then(r => r.json());
  },

  // Admin only
  create: async (data: any) => {
    return fetchWithAuth('/products', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  update: async (id: string, data: any) => {
    return fetchWithAuth(`/products/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  },

  delete: async (id: string) => {
    return fetchWithAuth(`/products/${id}`, {
      method: 'DELETE',
    });
  },
};

// ==========================================
// CATEGORIES
// ==========================================

export const categories = {
  getAll: async () => {
    return fetch(`${API_URL}/categories`).then(r => r.json());
  },

  getBySlug: async (slug: string) => {
    return fetch(`${API_URL}/categories/${slug}`).then(r => r.json());
  },

  getProducts: async (slug: string, params?: { page?: number; limit?: number }) => {
    const query = new URLSearchParams(params as any).toString();
    return fetch(`${API_URL}/categories/${slug}/products?${query}`).then(r => r.json());
  },

  // Admin only
  create: async (data: any) => {
    return fetchWithAuth('/categories', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  update: async (id: string, data: any) => {
    return fetchWithAuth(`/categories/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  },

  delete: async (id: string) => {
    return fetchWithAuth(`/categories/${id}`, {
      method: 'DELETE',
    });
  },
};

// ==========================================
// CART
// ==========================================

export const cart = {
  get: async () => {
    return fetchWithAuth('/cart');
  },

  addItem: async (data: { productId: string; quantity: number }) => {
    return fetchWithAuth('/cart/items', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  updateItem: async (itemId: string, data: { quantity: number }) => {
    return fetchWithAuth(`/cart/items/${itemId}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  },

  removeItem: async (itemId: string) => {
    return fetchWithAuth(`/cart/items/${itemId}`, {
      method: 'DELETE',
    });
  },

  clear: async () => {
    return fetchWithAuth('/cart', {
      method: 'DELETE',
    });
  },
};

// ==========================================
// ORDERS
// ==========================================

export const orders = {
  create: async (data: {
    customerName: string;
    customerEmail: string;
    customerPhone?: string;
    address: string;
    city: string;
    state?: string;
    postalCode: string;
    country: string;
    note?: string;
    paymentMethod?: string;
    items: Array<{ productId: string; quantity: number }>;
  }) => {
    return fetchWithAuth('/orders', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  getMyOrders: async () => {
    return fetchWithAuth('/orders/my-orders');
  },

  getById: async (id: string) => {
    return fetchWithAuth(`/orders/${id}`);
  },

  // Admin only
  getAll: async () => {
    return fetchWithAuth('/orders');
  },

  updateStatus: async (id: string, status: string) => {
    return fetchWithAuth(`/orders/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    });
  },

  delete: async (id: string) => {
    return fetchWithAuth(`/orders/${id}`, {
      method: 'DELETE',
    });
  },
};

// ==========================================
// INQUIRIES
// ==========================================

export const inquiries = {
  create: async (data: {
    name: string;
    email: string;
    phone?: string;
    message: string;
    productId?: string;
  }) => {
    return fetch(`${API_URL}/inquiries`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then(r => r.json());
  },

  // Admin only
  getAll: async () => {
    return fetchWithAuth('/inquiries');
  },

  getById: async (id: string) => {
    return fetchWithAuth(`/inquiries/${id}`);
  },

  updateStatus: async (id: string, status: string) => {
    return fetchWithAuth(`/inquiries/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    });
  },

  delete: async (id: string) => {
    return fetchWithAuth(`/inquiries/${id}`, {
      method: 'DELETE',
    });
  },
};

// ==========================================
// TYPES (for TypeScript)
// ==========================================

export type Product = {
  id: string;
  title: string;
  slug: string;
  description?: string;
  brand?: string;
  model?: string;
  price?: number;
  images: string[];
  categoryId?: string;
  featured: boolean;
  inStock: boolean;
  sku?: string;
  metaTitle?: string;
  metaDesc?: string;
  createdAt: string;
  updatedAt: string;
};

export type Category = {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  createdAt: string;
  updatedAt: string;
};

export type CartItem = {
  id: string;
  quantity: number;
  product: Product;
};

export type Cart = {
  id: string;
  items: CartItem[];
  createdAt: string;
  updatedAt: string;
};

export type Order = {
  id: string;
  orderNumber: string;
  total: number;
  status: 'PENDING' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  address: string;
  city: string;
  state?: string;
  postalCode: string;
  country: string;
  items: Array<{
    id: string;
    quantity: number;
    price: number;
    product: Product;
  }>;
  createdAt: string;
  updatedAt: string;
};

export type User = {
  id: string;
  name: string;
  email: string;
  role: 'ADMIN' | 'CUSTOMER';
  createdAt: string;
  updatedAt: string;
};
