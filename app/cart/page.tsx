'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { useCart, useUpdateCartItem, useRemoveFromCart, useClearCart } from '@/hooks/useCart';
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight, Package } from 'lucide-react';

export default function CartPage() {
  const { data: cart, isLoading } = useCart();
  const updateCartItem = useUpdateCartItem();
  const removeFromCart = useRemoveFromCart();
  const clearCart = useClearCart();
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const handleQuantityChange = async (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    setUpdatingId(itemId);
    await updateCartItem.mutateAsync({ itemId, quantity: newQuantity });
    setUpdatingId(null);
  };

  const handleRemove = async (itemId: string) => {
    await removeFromCart.mutateAsync(itemId);
  };

  const subtotal = cart?.items?.reduce((sum, item) => {
    const price = item.product.price || 0;
    return sum + price * item.quantity;
  }, 0) || 0;

  return (
    <>
      <main className="min-h-screen bg-[#FAFAFA]">
        <div className="bg-primary text-white pt-32 pb-14">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl text-center">
            <p className="text-[11px] tracking-[0.3em] uppercase text-white/60 mb-3">Your Selection</p>
            <h1 className="font-serif text-4xl md:text-5xl font-medium tracking-tight">Shopping Cart</h1>
          </div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-10">
          {isLoading ? (
            <div className="flex items-center justify-center py-24">
              <div className="animate-pulse flex flex-col items-center">
                <ShoppingBag className="w-12 h-12 text-slate-300 mb-4" />
                <p className="text-slate-400">Loading cart...</p>
              </div>
            </div>
          ) : !cart?.items?.length ? (
            <div className="text-center py-20 sm:py-24">
              <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Package className="w-10 h-10 text-slate-400" />
              </div>
              <h2 className="text-2xl font-serif text-primary mb-3">Your cart is empty</h2>
              <p className="text-slate-500 mb-8">Discover our collection of luxury timepieces</p>
              <Link
                href="/collection"
                className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white text-sm font-semibold tracking-widest uppercase rounded-full hover:bg-primary/90 transition-colors"
              >
                Browse Collection <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-4">
                <div className="flex items-center justify-between mb-6">
                  <p className="text-sm text-slate-500">
                    {cart.items.length} {cart.items.length === 1 ? 'item' : 'items'}
                  </p>
                  <button
                    onClick={() => clearCart.mutate()}
                    className="text-xs text-red-500 hover:text-red-600 transition-colors"
                  >
                    Clear Cart
                  </button>
                </div>

                {cart.items.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white border border-slate-100 rounded-xl p-4 flex gap-4"
                  >
                    {/* Product Image */}
                    <Link href={`/product/${item.product.slug}`} className="shrink-0">
                      <div className="w-24 h-24 bg-slate-50 rounded-lg overflow-hidden">
                        {item.product.images?.[0] ? (
                          <Image
                            src={item.product.images[0]}
                            alt={item.product.title}
                            width={96}
                            height={96}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <Package className="w-8 h-8 text-slate-300" />
                          </div>
                        )}
                      </div>
                    </Link>

                    {/* Product Info */}
                    <div className="flex-1 min-w-0">
                      <Link href={`/product/${item.product.slug}`}>
                        <h3 className="font-serif text-primary text-base mb-1 hover:text-primary/80 transition-colors line-clamp-1">
                          {item.product.title}
                        </h3>
                      </Link>
                      {item.product.brand && (
                        <p className="text-[11px] tracking-widest uppercase text-silver mb-3">
                          {item.product.brand}
                        </p>
                      )}

                      <div className="flex items-center justify-between">
                        {/* Quantity Controls */}
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1 || updatingId === item.id}
                            className="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center text-slate-600 hover:border-primary hover:text-primary disabled:opacity-50 transition-colors"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-10 text-center text-sm font-medium">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                            disabled={updatingId === item.id}
                            className="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center text-slate-600 hover:border-primary hover:text-primary disabled:opacity-50 transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        {/* Price & Remove */}
                        <div className="flex items-center gap-4">
                          <span className="font-medium text-primary">
                            ${((item.product.price || 0) * item.quantity).toLocaleString()}
                          </span>
                          <button
                            onClick={() => handleRemove(item.id)}
                            className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-white border border-slate-100 rounded-xl p-6 sticky top-24">
                  <h2 className="font-serif text-xl text-primary mb-6">Order Summary</h2>

                  <div className="space-y-3 text-sm mb-6">
                    <div className="flex justify-between text-slate-600">
                      <span>Subtotal</span>
                      <span>${subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span>Shipping</span>
                      <span className="text-green-600">Free</span>
                    </div>
                    <div className="border-t border-slate-100 pt-3 flex justify-between font-medium text-primary">
                      <span>Total</span>
                      <span>${subtotal.toLocaleString()}</span>
                    </div>
                  </div>

                  <Link
                    href="/checkout"
                    className="w-full flex items-center justify-center gap-2 py-4 bg-primary text-white text-sm font-semibold tracking-widest uppercase rounded-xl hover:bg-primary/90 transition-colors"
                  >
                    Proceed to Checkout <ArrowRight className="w-4 h-4" />
                  </Link>

                  <Link
                    href="/collection"
                    className="w-full flex items-center justify-center py-3 mt-3 text-xs text-slate-500 hover:text-primary transition-colors"
                  >
                    Continue Shopping
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
