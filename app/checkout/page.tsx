'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart, useClearCart } from '@/hooks/useCart';
import { useCreatePayPalOrder, useCapturePayPalOrder, useCreateOrder, type Order } from '@/hooks/useOrders';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import api from '@/lib/axios';
import { Package, ArrowLeft, CheckCircle, Loader2, AlertCircle } from 'lucide-react';

export default function CheckoutPage() {
  const { data: cart } = useCart();
  const createPayPalOrder = useCreatePayPalOrder();
  const capturePayPalOrder = useCapturePayPalOrder();
  const createOrder = useCreateOrder();
  const clearCart = useClearCart();

  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    address: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'USA',
    note: '',
  });

  const [paymentMethod, setPaymentMethod] = useState<'PAYPAL' | 'WIRE_TRANSFER'>('PAYPAL');
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderData, setOrderData] = useState<Order | null>(null);
  const [paypalError, setPaypalError] = useState('');
  const [wireError, setWireError] = useState('');
  const [payPalClientId, setPayPalClientId] = useState('');

  useEffect(() => {
    api.get('/payments/paypal/client-id')
      .then((res) => setPayPalClientId(res.data.clientId))
      .catch(() => setPayPalClientId(''));
  }, []);

  const subtotal = cart?.items?.reduce((sum, item) => {
    const price = item.product.price || 0;
    return sum + price * item.quantity;
  }, 0) || 0;

  const isFormValid =
    formData.customerName &&
    formData.customerEmail &&
    formData.customerPhone &&
    formData.address &&
    formData.city &&
    formData.state &&
    formData.postalCode &&
    formData.country;

  if (orderComplete && orderData) {
    const isWireTransfer = orderData.paymentMethod === 'WIRE_TRANSFER';
    return (
      <>
        <main className="min-h-screen bg-[#FAFAFA]">
          {/* Hero Banner */}
          <section className="relative w-full flex items-center justify-center overflow-hidden bg-primary min-h-[280px] h-[40vh] max-h-[400px]">
            <div className="absolute inset-0 bg-gradient-to-b from-primary/90 via-primary/50 to-transparent" />
            <div className="relative z-10 container mx-auto px-6 text-center pt-20 pb-8">
              <div className="w-20 h-20 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6 border border-white/20">
                <CheckCircle className="w-10 h-10 text-white" />
              </div>
              <p className="text-white/60 text-xs tracking-[0.3em] uppercase font-semibold mb-3">
                Order Confirmed
              </p>
              <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-white font-medium tracking-tight mb-3 drop-shadow-sm">
                Thank You for Your Purchase
              </h1>
              <div className="w-12 h-px bg-white/30 mx-auto mb-3" />
              <p className="text-white/70 font-light max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
                Your order has been received and is being processed
              </p>
            </div>
          </section>

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl py-12">

            {/* Wire Transfer Notice */}
            {isWireTransfer && (
              <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 mb-8">
                <h3 className="font-semibold text-primary mb-2">Wire Transfer Selected</h3>
                <p className="text-sm text-slate-600 mb-1">
                  Your order has been placed successfully.
                </p>
                <p className="text-sm text-slate-600">
                  Our team will contact you shortly with payment instructions.
                </p>
              </div>
            )}

            {/* Order Details Card */}
            <div className="bg-white border border-slate-100 rounded-xl p-6 md:p-8 mb-8">
              <h2 className="font-serif text-xl text-primary mb-6">Order Details</h2>
              <div className="space-y-4">
                <div className="flex justify-between py-3 border-b border-slate-50">
                  <span className="text-sm text-slate-500">Order Number</span>
                  <span className="text-sm font-semibold text-primary font-mono">{orderData.orderNumber}</span>
                </div>
                <div className="flex justify-between py-3 border-b border-slate-50">
                  <span className="text-sm text-slate-500">Customer</span>
                  <span className="text-sm font-medium text-primary">{orderData.customerName}</span>
                </div>
                <div className="flex justify-between py-3 border-b border-slate-50">
                  <span className="text-sm text-slate-500">Email</span>
                  <span className="text-sm font-medium text-primary">{orderData.customerEmail}</span>
                </div>
                <div className="flex justify-between py-3 border-b border-slate-50">
                  <span className="text-sm text-slate-500">Payment Method</span>
                  <span className="text-sm font-medium text-primary">{orderData.paymentMethod?.replace('_', ' ')}</span>
                </div>
                <div className="flex justify-between py-3 border-b border-slate-50">
                  <span className="text-sm text-slate-500">Payment Status</span>
                  <span className={`text-sm font-medium ${isWireTransfer ? 'text-amber-600' : 'text-green-600'}`}>
                    {orderData.paymentStatus?.replace('_', ' ')}
                  </span>
                </div>
                <div className="flex justify-between py-3">
                  <span className="text-sm text-slate-500">Total</span>
                  <span className="text-lg font-semibold text-primary">${orderData.total?.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Order Items */}
            <div className="bg-white border border-slate-100 rounded-xl p-6 md:p-8 mb-8">
              <h2 className="font-serif text-xl text-primary mb-6">Order Summary</h2>
              <div className="space-y-4">
                {orderData.items.map((item) => (
                  <div key={item.id} className="flex gap-4 items-center">
                    <div className="w-16 h-16 bg-slate-50 rounded-lg overflow-hidden shrink-0">
                      {item.product.images?.[0] ? (
                        <Image src={item.product.images[0]} alt={item.product.title} width={64} height={64} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center"><Package className="w-6 h-6 text-slate-300" /></div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-primary line-clamp-1">{item.product.title}</p>
                      <p className="text-xs text-slate-500">Qty: {item.quantity}</p>
                    </div>
                    <p className="text-sm font-medium text-primary">${(item.price * item.quantity).toLocaleString()}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-center">
              <Link
                href="/collection"
                className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white text-sm font-semibold tracking-widest uppercase rounded-full hover:bg-primary/90 transition-colors"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </main>
      </>
    );
  }

  if (!cart?.items?.length) {
    return (
      <>
        <main className="min-h-screen bg-[#FAFAFA] pt-32">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-24 text-center">
            <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Package className="w-10 h-10 text-slate-400" />
            </div>
            <h2 className="text-2xl font-serif text-primary mb-3">Your cart is empty</h2>
            <Link
              href="/collection"
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white text-sm font-semibold tracking-widest uppercase rounded-full hover:bg-primary/90 transition-colors"
            >
              Browse Collection
            </Link>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <main className="min-h-screen bg-[#FAFAFA]">
        <div className="bg-primary text-white pt-32 pb-14">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <Link
              href="/cart"
              className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors mb-4"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Cart
            </Link>
            <h1 className="font-serif text-4xl md:text-5xl font-medium tracking-tight">Checkout</h1>
          </div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-10">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Customer Information */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white border border-slate-100 rounded-xl p-6">
                <h2 className="font-serif text-xl text-primary mb-6">Contact Information</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold tracking-wider uppercase text-slate-500 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.customerName}
                      onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-primary/40 transition-colors"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold tracking-wider uppercase text-slate-500 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.customerEmail}
                      onChange={(e) => setFormData({ ...formData, customerEmail: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-primary/40 transition-colors"
                      placeholder="john@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold tracking-wider uppercase text-slate-500 mb-2">
                      Phone *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.customerPhone}
                      onChange={(e) => setFormData({ ...formData, customerPhone: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-primary/40 transition-colors"
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-white border border-slate-100 rounded-xl p-6">
                <h2 className="font-serif text-xl text-primary mb-6">Shipping Address</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold tracking-wider uppercase text-slate-500 mb-2">
                      Street Address *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-primary/40 transition-colors"
                      placeholder="123 Luxury Avenue"
                    />
                  </div>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-semibold tracking-wider uppercase text-slate-500 mb-2">
                        City *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-primary/40 transition-colors"
                        placeholder="New York"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold tracking-wider uppercase text-slate-500 mb-2">
                        State *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.state}
                        onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-primary/40 transition-colors"
                        placeholder="NY"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold tracking-wider uppercase text-slate-500 mb-2">
                        Postal Code *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.postalCode}
                        onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-primary/40 transition-colors"
                        placeholder="10001"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold tracking-wider uppercase text-slate-500 mb-2">
                      Country *
                    </label>
                    <select
                      value={formData.country}
                      onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-primary/40 transition-colors"
                    >
                      <option value="USA">United States</option>
                      <option value="UK">United Kingdom</option>
                      <option value="CA">Canada</option>
                      <option value="AU">Australia</option>
                      <option value="OTHER">Other</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-slate-100 rounded-xl p-6">
                <h2 className="font-serif text-xl text-primary mb-6">Additional Information</h2>
                <div>
                  <label className="block text-xs font-semibold tracking-wider uppercase text-slate-500 mb-2">
                    Order Notes (Optional)
                  </label>
                  <textarea
                    rows={3}
                    value={formData.note}
                    onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-primary/40 transition-colors resize-none"
                    placeholder="Special instructions for your order..."
                  />
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white border border-slate-100 rounded-xl p-6 sticky top-24">
                <h2 className="font-serif text-xl text-primary mb-6">Order Summary</h2>

                {/* Items */}
                <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
                  {cart.items.map((item) => (
                    <div key={item.id} className="flex gap-3">
                      <div className="w-16 h-16 bg-slate-50 rounded-lg overflow-hidden shrink-0">
                        {item.product.images?.[0] ? (
                          <Image
                            src={item.product.images[0]}
                            alt={item.product.title}
                            width={64}
                            height={64}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <Package className="w-6 h-6 text-slate-300" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-primary line-clamp-1">
                          {item.product.title}
                        </p>
                        <p className="text-xs text-slate-500">
                          Qty: {item.quantity}
                        </p>
                        <p className="text-sm font-medium text-primary">
                          ${((item.product.price || 0) * item.quantity).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Totals */}
                <div className="border-t border-slate-100 pt-4 space-y-2 text-sm">
                  <div className="flex justify-between text-slate-600">
                    <span>Subtotal</span>
                    <span>${subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Shipping</span>
                    <span className="text-green-600">Free</span>
                  </div>
                  <div className="border-t border-slate-100 pt-2 flex justify-between font-medium text-primary text-base">
                    <span>Total</span>
                    <span>${subtotal.toLocaleString()}</span>
                  </div>
                </div>

                {/* Payment Method Selector */}
                {isFormValid && (
                  <div className="mt-6 space-y-3">
                    <p className="text-xs font-semibold tracking-widest uppercase text-slate-500 mb-3">Payment Method</p>
                    <label className={`flex items-start gap-3 p-4 border rounded-xl cursor-pointer transition-all ${paymentMethod === 'PAYPAL' ? 'border-primary bg-primary/5' : 'border-slate-200 hover:border-primary/30'}`}>
                      <input type="radio" name="paymentMethod" value="PAYPAL" checked={paymentMethod === 'PAYPAL'} onChange={(e) => setPaymentMethod(e.target.value as 'PAYPAL' | 'WIRE_TRANSFER')} className="mt-1" />
                      <div>
                        <p className="text-sm font-semibold text-primary">PayPal</p>
                        <p className="text-xs text-slate-500">Pay securely using PayPal.</p>
                      </div>
                    </label>
                    <label className={`flex items-start gap-3 p-4 border rounded-xl cursor-pointer transition-all ${paymentMethod === 'WIRE_TRANSFER' ? 'border-primary bg-primary/5' : 'border-slate-200 hover:border-primary/30'}`}>
                      <input type="radio" name="paymentMethod" value="WIRE_TRANSFER" checked={paymentMethod === 'WIRE_TRANSFER'} onChange={(e) => setPaymentMethod(e.target.value as 'PAYPAL' | 'WIRE_TRANSFER')} className="mt-1" />
                      <div>
                        <p className="text-sm font-semibold text-primary">Wire Transfer</p>
                        <p className="text-xs text-slate-500">Recommended for high-value luxury watch purchases.</p>
                      </div>
                    </label>
                  </div>
                )}

                {/* Errors */}
                {paypalError && (
                  <div className="mt-4 p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    {paypalError}
                  </div>
                )}
                {paymentMethod === 'PAYPAL' && payPalClientId && isFormValid && (
                  <div className="mt-6">
                    <PayPalScriptProvider
                      options={{ clientId: payPalClientId, currency: 'USD' }}
                    >
                      <PayPalButtons
                        style={{ layout: 'vertical', color: 'gold', shape: 'rect' }}
                        createOrder={async () => {
                          setPaypalError('');
                          const items = cart!.items.map((item) => ({
                            productId: item.product.id,
                            quantity: item.quantity,
                          }));
                          const paypalOrder = await createPayPalOrder.mutateAsync(items);
                          return paypalOrder.id;
                        }}
                        onApprove={async (data) => {
                          try {
                            const res = await capturePayPalOrder.mutateAsync({
                              orderId: data.orderID,
                              dto: {
                                customerName: formData.customerName,
                                customerEmail: formData.customerEmail,
                                customerPhone: formData.customerPhone,
                                address: formData.address,
                                city: formData.city,
                                state: formData.state,
                                postalCode: formData.postalCode,
                                country: formData.country,
                                note: formData.note,
                                items: cart!.items.map((item) => ({
                                  productId: item.product.id,
                                  quantity: item.quantity,
                                })),
                              },
                            });
                            // Clear cart after successful order
                            await clearCart.mutateAsync();
                            setOrderData(res.order);
                            setOrderComplete(true);
                          } catch {
                            setPaypalError('Payment capture failed. Please try again or contact support.');
                          }
                        }}
                        onError={() => {
                          setPaypalError('PayPal payment error. Please try again.');
                        }}
                        onCancel={() => setPaypalError('Payment cancelled. You can try again when ready.')}
                      />
                    </PayPalScriptProvider>
                  </div>
                )}

                {/* Wire Transfer Place Order */}
                {paymentMethod === 'WIRE_TRANSFER' && isFormValid && (
                  <div className="mt-6">
                    {wireError && (
                      <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100 flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        {wireError}
                      </div>
                    )}
                    <button
                      onClick={async () => {
                        setWireError('');
                        if (!cart?.items?.length) return;
                        try {
                          const order = await createOrder.mutateAsync({
                            ...formData,
                            paymentMethod: 'WIRE_TRANSFER',
                            items: cart.items.map((item) => ({
                              productId: item.product.id,
                              quantity: item.quantity,
                            })),
                          });
                          // Clear cart after successful order
                          await clearCart.mutateAsync();
                          setOrderData(order);
                          setOrderComplete(true);
                        } catch {
                          setWireError('Order creation failed. Please try again.');
                        }
                      }}
                      disabled={createOrder.isPending}
                      className="w-full flex items-center justify-center gap-2 py-4 bg-primary text-white text-sm font-semibold tracking-widest uppercase rounded-xl hover:bg-primary/90 disabled:opacity-60 transition-colors"
                    >
                      {createOrder.isPending ? (
                        <><Loader2 className="w-4 h-4 animate-spin" /> Processing...</>
                      ) : (
                        'Place Order'
                      )}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
