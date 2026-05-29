'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRelatedProducts } from '@/hooks/useProducts';
import { useAddToCart } from '@/hooks/useCart';
import { useAuth } from '@/hooks/useAuth';
import { useCreateInquiry } from '@/hooks/useInquiries';
import { ProductCard } from '@/components/ProductCard';
import {
  ShoppingBag, MessageCircle, Package,
  CheckCircle, AlertCircle
} from 'lucide-react';

import type { Product } from '@/hooks/useProducts';

interface ProductPageClientProps {
  product: Product;
}

export function ProductPageClient({ product }: ProductPageClientProps) {
  const { data: related } = useRelatedProducts(product.slug);
  const { isLoggedIn } = useAuth();
  const addToCart = useAddToCart();
  const createInquiry = useCreateInquiry();

  const [activeImage, setActiveImage] = useState(0);
  const [addedToCart, setAddedToCart] = useState(false);
  const [showInquiryForm, setShowInquiryForm] = useState(false);
  const [inquiryData, setInquiryData] = useState({ name: '', email: '', phone: '', message: '' });
  const [inquirySent, setInquirySent] = useState(false);

  const handleAddToCart = async () => {
    await addToCart.mutateAsync({ productId: product.id, quantity: 1, product });
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2500);
  };

  const handleInquiry = async (e: React.FormEvent) => {
    e.preventDefault();
    await createInquiry.mutateAsync({ ...inquiryData, productId: product.id });
    setInquirySent(true);
    setShowInquiryForm(false);
  };

  const whatsappMsg = encodeURIComponent(
    `Hi, I'm interested in: ${product.title}${product.sku ? ` (Ref: ${product.sku})` : ''}`
  );

  const images = product.images?.length > 0 ? product.images : [];

  return (
    <>
      <main className="bg-[#FAFAFA] min-h-screen pb-20">
        {/* Dark Hero Section for Header visibility */}
        <div className="bg-primary pt-32 pb-24 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto max-w-7xl relative z-10">
            <nav className="flex items-center gap-2 text-[10px] sm:text-xs text-white/50 mb-8 sm:mb-12 uppercase tracking-widest font-medium">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <span>/</span>
              <Link href="/collection" className="hover:text-white transition-colors">Collection</Link>
              {product.category && (
                <>
                  <span>/</span>
                  <Link href={`/category/${product.category.slug}`} className="hover:text-white transition-colors">
                    {product.category.name}
                  </Link>
                </>
              )}
            </nav>
            <div className="max-w-3xl">
              {(product.brand || product.model) && (
                <p className="text-xs sm:text-sm font-semibold tracking-[0.3em] uppercase text-silver mb-4">
                  {product.brand}{product.brand && product.model && ' · '}{product.model}
                </p>
              )}
              <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-white font-medium leading-tight mb-6">
                {product.title}
              </h1>
              {product.sku && (
                <p className="text-sm text-white/60 tracking-widest uppercase">Reference: {product.sku}</p>
              )}
            </div>
          </div>
          
          {/* Subtle background texture */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at center, white 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl -mt-12 sm:-mt-16 relative z-20">
          <div className="bg-white rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.06)] border border-slate-100 overflow-hidden">
            <div className="grid lg:grid-cols-2 gap-0">
              
              {/* Left: Images */}
              <div className="p-4 sm:p-6 lg:p-8 border-b lg:border-b-0 lg:border-r border-slate-100">
                <div className="relative aspect-square bg-[#F8F9FA] rounded-xl overflow-hidden mb-4">
                  {images[activeImage] ? (
                    <Image
                      src={images[activeImage]}
                      alt={product.title}
                      fill
                      className="object-cover"
                      priority
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Package className="w-20 h-20 text-slate-300" />
                    </div>
                  )}
                  {!product.inStock && (
                    <div className="absolute inset-0 bg-white/70 flex items-center justify-center backdrop-blur-[2px]">
                      <span className="text-sm font-semibold tracking-widest uppercase text-slate-500 border-2 border-slate-300 px-8 py-3 rounded-full bg-white shadow-sm">Sold</span>
                    </div>
                  )}
                </div>
                {images.length > 1 && (
                  <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                    {images.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveImage(idx)}
                        className={`relative shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${activeImage === idx ? 'border-primary ring-2 ring-primary/20 ring-offset-1' : 'border-transparent hover:border-slate-300'}`}
                      >
                        <Image src={img} alt={`${product.title} ${idx + 1}`} fill className="object-cover" sizes="80px" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Right: Details & Action */}
              <div className="p-6 sm:p-8 lg:p-12 flex flex-col h-full bg-white">
                <div className="flex items-center justify-between mb-8">
                  {product.category && (
                    <Link href={`/category/${product.category.slug}`} className="inline-block text-[10px] font-bold tracking-widest uppercase bg-slate-100 text-slate-600 px-4 py-1.5 rounded-full hover:bg-primary hover:text-white transition-colors">
                      {product.category.name}
                    </Link>
                  )}
                  <span className={`flex items-center gap-1.5 text-xs font-bold tracking-wider uppercase ${product.inStock ? 'text-green-600' : 'text-slate-400'}`}>
                    {product.inStock ? <CheckCircle className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
                    {product.inStock ? 'Available' : 'Sold Out'}
                  </span>
                </div>

                {/* Description */}
                <div className="flex-1">
                  <h3 className="text-sm font-semibold tracking-widest uppercase text-slate-900 mb-4">About this timepiece</h3>
                  {product.description ? (
                    <div
                      className="prose prose-slate prose-sm max-w-none text-slate-600 font-light leading-relaxed mb-8"
                      dangerouslySetInnerHTML={{ __html: product.description }}
                    />
                  ) : (
                    <p className="text-slate-500 font-light italic mb-8">No description available for this timepiece.</p>
                  )}
                </div>

                <div className="mt-auto space-y-6 pt-8 border-t border-slate-100">
                  {inquirySent && (
                    <div className="p-4 bg-green-50 border border-green-100 rounded-xl flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 shrink-0" />
                      <p className="text-sm text-green-800 font-medium">Inquiry sent! A specialist will contact you shortly.</p>
                    </div>
                  )}

                  <div className="flex flex-col sm:flex-row gap-4">
                    <a
                      href={`https://wa.me/17328329938?text=${whatsappMsg}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 py-4 bg-primary text-white text-xs sm:text-sm font-semibold tracking-widest uppercase rounded-xl hover:bg-primary/90 transition-all shadow-[0_4px_14px_rgba(30,58,95,0.25)] hover:shadow-[0_6px_20px_rgba(30,58,95,0.3)]"
                    >
                      <MessageCircle className="w-4 h-4" />
                      Inquire via WhatsApp
                    </a>
                    {product.inStock && isLoggedIn && (
                      <button
                        onClick={handleAddToCart}
                        disabled={addToCart.isPending || addedToCart}
                        className="flex-1 flex items-center justify-center gap-2 py-4 border-2 border-primary text-primary text-xs sm:text-sm font-semibold tracking-widest uppercase rounded-xl hover:bg-slate-50 disabled:opacity-60 transition-all"
                      >
                        {addedToCart ? (
                          <><CheckCircle className="w-4 h-4" /> Added to Cart</>
                        ) : (
                          <><ShoppingBag className="w-4 h-4" /> Add to Cart</>
                        )}
                      </button>
                    )}
                  </div>

                  {!showInquiryForm ? (
                    <button
                      onClick={() => setShowInquiryForm(true)}
                      className="block w-full text-center text-xs text-slate-500 hover:text-primary transition-colors underline underline-offset-4"
                    >
                      Prefer email? Send an inquiry instead
                    </button>
                  ) : (
                    <div className="mt-6 p-6 bg-[#FAFAFA] rounded-2xl border border-slate-100">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-sm font-semibold tracking-widest uppercase text-primary">Email Inquiry</h4>
                        <button onClick={() => setShowInquiryForm(false)} className="text-xs text-slate-400 hover:text-slate-600">Cancel</button>
                      </div>
                      <form onSubmit={handleInquiry} className="space-y-4">
                        <input required type="text" placeholder="Your Name" value={inquiryData.name}
                          onChange={(e) => setInquiryData({ ...inquiryData, name: e.target.value })}
                          className="w-full text-sm px-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-primary/40 focus:ring-1 focus:ring-primary/40 transition-all shadow-sm" />
                        <input required type="email" placeholder="Your Email" value={inquiryData.email}
                          onChange={(e) => setInquiryData({ ...inquiryData, email: e.target.value })}
                          className="w-full text-sm px-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-primary/40 focus:ring-1 focus:ring-primary/40 transition-all shadow-sm" />
                        <input type="tel" placeholder="Phone (optional)" value={inquiryData.phone}
                          onChange={(e) => setInquiryData({ ...inquiryData, phone: e.target.value })}
                          className="w-full text-sm px-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-primary/40 focus:ring-1 focus:ring-primary/40 transition-all shadow-sm" />
                        <textarea required placeholder="How can we help you?" rows={3} value={inquiryData.message}
                          onChange={(e) => setInquiryData({ ...inquiryData, message: e.target.value })}
                          className="w-full text-sm px-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-primary/40 focus:ring-1 focus:ring-primary/40 transition-all shadow-sm resize-none" />
                        <button type="submit" disabled={createInquiry.isPending}
                          className="w-full py-3.5 bg-slate-900 text-white text-xs font-semibold tracking-widest uppercase rounded-xl hover:bg-black disabled:opacity-60 transition-colors shadow-md">
                          {createInquiry.isPending ? 'Sending...' : 'Send Message'}
                        </button>
                      </form>
                    </div>
                  )}

                  <div className="grid grid-cols-3 gap-2 pt-6">
                    {[
                      { label: 'Authenticity', value: '100% Guaranteed' },
                      { label: 'Warranty', value: '1 Year Included' },
                      { label: 'Shipping', value: 'Fully Insured' },
                    ].map((item) => (
                      <div key={item.label} className="text-center p-3 bg-slate-50 rounded-xl">
                        <p className="text-[9px] uppercase tracking-widest text-slate-400 font-semibold mb-1">{item.label}</p>
                        <p className="text-xs font-medium text-slate-700">{item.value}</p>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>

        {related && related.length > 0 && (
          <section className="mt-24 pb-12">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
              <div className="flex items-center justify-between mb-10">
                <h2 className="font-serif text-3xl text-primary">You May Also Like</h2>
                <div className="h-px flex-1 bg-slate-200 ml-8 hidden sm:block" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {related.slice(0, 4).map((p) => <ProductCard key={p.id} product={p} />)}
              </div>
            </div>
          </section>
        )}
      </main>
    </>
  );
}
