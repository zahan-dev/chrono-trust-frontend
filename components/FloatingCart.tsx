'use client';

import Link from 'next/link';
import { useCartItemCount } from '@/hooks/useCart';
import { ShoppingBag } from 'lucide-react';
import { useState, useEffect } from 'react';

export function FloatingCart() {
  const count = useCartItemCount();
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (count > 0) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [count]);

  if (!mounted || !visible) return null;

  return (
    <Link
      href="/cart"
      className="fixed bottom-6 left-6 z-50 flex items-center gap-2.5 bg-primary text-white pl-4 pr-5 py-3.5 rounded-2xl shadow-[0_8px_32px_rgba(19,35,75,0.35)] hover:shadow-[0_12px_40px_rgba(19,35,75,0.45)] hover:scale-105 transition-all duration-300 group"
      style={{ animation: 'cart-pop 0.4s ease-out' }}
      aria-label="View cart"
    >
      <div className="relative">
        <ShoppingBag className="w-5 h-5" strokeWidth={1.5} />
        <span className="absolute -top-2 -right-2.5 min-w-4.5 h-4.5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center px-1 shadow-sm border border-white">
          {count > 99 ? '99+' : count}
        </span>
      </div>
      <span className="text-[11px] font-semibold tracking-wider uppercase hidden sm:inline">
        Cart
      </span>
    </Link>
  );
}
