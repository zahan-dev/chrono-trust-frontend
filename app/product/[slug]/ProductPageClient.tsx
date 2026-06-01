'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRelatedProducts } from '@/hooks/useProducts';
import { useAddToCart } from '@/hooks/useCart';
import { useCreateInquiry } from '@/hooks/useInquiries';
import { ProductCard } from '@/components/ProductCard';
import {
  ShoppingBag, MessageCircle, Package,
  CheckCircle, AlertCircle, Shield, Award,
  Headphones, Zap, ChevronRight, ZoomIn
} from 'lucide-react';

import type { Product } from '@/hooks/useProducts';

interface ProductPageClientProps {
  product: Product;
}

export function ProductPageClient({ product }: ProductPageClientProps) {
  const { data: related } = useRelatedProducts(product.slug);
  const addToCart = useAddToCart();
  const createInquiry = useCreateInquiry();

  const [activeImage, setActiveImage] = useState(0);
  const [addedToCart, setAddedToCart] = useState(false);
  const [showInquiryForm, setShowInquiryForm] = useState(false);
  const defaultMessage = [
    `I am interested in: ${product.title}`,
    product.brand ? `Brand: ${product.brand}` : null,
    product.model ? `Model: ${product.model}` : null,
    product.sku ? `Reference: ${product.sku}` : null,
    ``,
    `Please provide more information on availability and pricing.`,
  ].filter(Boolean).join('\n');
  const [inquiryData, setInquiryData] = useState({ name: '', email: '', phone: '', message: defaultMessage });
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

  const productUrl = `https://chronotrust.io/product/${product.slug}`;
  const inquiryLines = [
    `Hello ChronoTrust,`,
    ``,
    `I am interested in the following timepiece:`,
    ``,
    `Product: ${product.title}`,
    product.brand ? `Brand: ${product.brand}` : null,
    product.model ? `Model: ${product.model}` : null,
    product.sku ? `Reference: ${product.sku}` : null,
    product.price ? `Price: $${product.price.toLocaleString()}` : null,
    `URL: ${productUrl}`,
    ``,
    `I would appreciate more information regarding availability, condition, and purchasing options.`,
    ``,
    `Thank you.`,
  ].filter(Boolean).join('\n');
  const whatsappMsg = encodeURIComponent(inquiryLines);

  const images = product.images?.length > 0 ? product.images : [];

  const trustBadges = [
    { icon: Shield, label: 'Authenticity', value: '100% Guaranteed' },
    { icon: Award, label: 'Condition', value: 'Expert Verified' },
    { icon: Headphones, label: 'Support', value: 'Specialist Backed' },
    { icon: Zap, label: 'Response', value: 'Within 24 Hours' },
  ];

  return (
    <>
      <main className="bg-[#F7F8FA] min-h-screen">

        {/* ─── Slim dark header bar ───────────────────────────────────── */}
        <div className="bg-primary pt-28 sm:pt-32 pb-6 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto max-w-7xl">
            <nav className="flex items-center gap-1.5 text-[10px] sm:text-xs text-white/50 uppercase tracking-widest font-medium">
              <Link href="/" className="hover:text-white/80 transition-colors">Home</Link>
              <ChevronRight className="w-3 h-3 opacity-40" />
              <Link href="/collection" className="hover:text-white/80 transition-colors">Collection</Link>
              {product.category && (
                <>
                  <ChevronRight className="w-3 h-3 opacity-40" />
                  <Link href={`/category/${product.category.slug}`} className="hover:text-white/80 transition-colors">
                    {product.category.name}
                  </Link>
                </>
              )}
              <ChevronRight className="w-3 h-3 opacity-40" />
              <span className="text-white/40 max-w-[120px] sm:max-w-xs truncate">{product.title}</span>
            </nav>
          </div>
        </div>

        {/* ─── Main product section ────────────────────────────────────── */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-6 sm:py-10">
          <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">

            {/* DESKTOP: Vertical Thumbnails (left) */}
            {images.length > 1 && (
              <div className="hidden lg:flex flex-col gap-2 w-16 shrink-0 max-h-160 overflow-y-auto scrollbar-hide pr-0.5">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(idx)}
                    className={`relative w-full aspect-square rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                      activeImage === idx
                        ? 'border-primary shadow-[0_0_0_3px_rgba(19,35,75,0.12)]'
                        : 'border-transparent hover:border-slate-300 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <Image src={img} alt={`View ${idx + 1}`} fill className="object-cover" sizes="80px" />
                  </button>
                ))}
              </div>
            )}

            {/* Main Image + Mobile Thumbs */}
            <div className="flex-1 min-w-0">
              <div className="relative bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm group">
                <div className="relative aspect-square sm:aspect-[4/3] lg:aspect-square cursor-zoom-in">
                  {images[activeImage] ? (
                    <Image
                      src={images[activeImage]}
                      alt={product.title}
                      fill
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                      priority
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-slate-50">
                      <Package className="w-16 h-16 text-slate-300 mb-3" />
                      <p className="text-xs text-slate-400">No image available</p>
                    </div>
                  )}
                  {!product.inStock && (
                    <div className="absolute inset-0 bg-white/75 flex items-center justify-center backdrop-blur-[2px]">
                      <span className="text-sm font-bold tracking-[0.25em] uppercase text-slate-500 border-2 border-slate-300 px-10 py-3 rounded-full bg-white/90 shadow">
                        Sold
                      </span>
                    </div>
                  )}
                  {images.length > 1 && (
                    <div className="absolute top-4 right-4 bg-black/30 backdrop-blur-sm rounded-full px-3 py-1">
                      <span className="text-white text-xs font-medium">{activeImage + 1} / {images.length}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* MOBILE: Horizontal Thumbnails */}
              {images.length > 1 && (
                <div className="flex gap-2.5 mt-3 overflow-x-auto pb-1 scrollbar-hide lg:hidden">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImage(idx)}
                      className={`relative shrink-0 w-16 h-16 rounded-xl overflow-hidden border-2 transition-all duration-200 ${
                        activeImage === idx
                          ? 'border-primary shadow-[0_0_0_3px_rgba(19,35,75,0.12)]'
                          : 'border-transparent hover:border-slate-300 opacity-60 hover:opacity-100'
                      }`}
                    >
                      <Image src={img} alt={`View ${idx + 1}`} fill className="object-cover" sizes="80px" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info Panel */}
            <div className="w-full lg:w-96 xl:w-105 shrink-0">
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 sm:p-8 lg:sticky lg:top-24">

                {/* Brand + category pills */}
                <div className="flex items-center gap-2 flex-wrap mb-4">
                  {product.category && (
                    <Link
                      href={`/category/${product.category.slug}`}
                      className="text-[10px] font-bold tracking-widest uppercase bg-primary/8 text-primary px-3 py-1.5 rounded-full hover:bg-primary hover:text-white transition-all"
                    >
                      {product.category.name}
                    </Link>
                  )}
                  <span className={`flex items-center gap-1.5 text-[10px] font-bold tracking-widest uppercase px-3 py-1.5 rounded-full ${
                    product.inStock ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-500'
                  }`}>
                    {product.inStock ? <CheckCircle className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}
                    {product.inStock ? 'In Stock' : 'Sold Out'}
                  </span>
                </div>

                {/* Brand & model */}
                {(product.brand || product.model) && (
                  <p className="text-xs font-semibold tracking-[0.28em] uppercase text-slate-400 mb-2">
                    {[product.brand, product.model].filter(Boolean).join(' · ')}
                  </p>
                )}

                {/* Title */}
                <h1 className="font-serif text-2xl sm:text-3xl text-primary font-medium leading-snug mb-3">
                  {product.title}
                </h1>

                {/* Reference */}
                {product.sku && (
                  <p className="text-xs text-slate-400 tracking-[0.2em] uppercase mb-5">
                    Ref. {product.sku}
                  </p>
                )}

                {/* Divider */}
                <div className="h-px bg-slate-100 mb-5" />

                {/* Price */}
                <div className="mb-6">
                  {product.price ? (
                    <>
                      <p className="text-[10px] tracking-widest uppercase text-slate-400 font-semibold mb-1">Price</p>
                      <p className="font-serif text-3xl sm:text-4xl text-primary font-medium">
                        ${Number(product.price).toLocaleString()}
                      </p>
                      <p className="text-xs text-slate-400 mt-1">Inclusive of all applicable charges</p>
                    </>
                  ) : (
                    <div className="bg-slate-50 border border-slate-100 rounded-xl px-5 py-4">
                      <p className="text-sm font-semibold text-primary">Price Upon Request</p>
                      <p className="text-xs text-slate-500 mt-0.5">Contact us for exclusive pricing</p>
                    </div>
                  )}
                </div>

                {/* Inquiry sent confirmation */}
                {inquirySent && (
                  <div className="p-4 bg-green-50 border border-green-100 rounded-xl flex items-center gap-3 mb-4">
                    <CheckCircle className="w-5 h-5 text-green-600 shrink-0" />
                    <p className="text-sm text-green-800 font-medium">Inquiry sent! A specialist will contact you shortly.</p>
                  </div>
                )}

                {/* CTAs */}
                <div className="space-y-3 mb-6">
                  {product.price ? (
                    /* Priced product: Add to Cart only */
                    product.inStock && (
                      <button
                        onClick={handleAddToCart}
                        disabled={addToCart.isPending || addedToCart}
                        className={`w-full flex items-center justify-center gap-2.5 py-4 text-xs font-bold tracking-[0.15em] uppercase rounded-xl transition-all ${
                          addedToCart
                            ? 'bg-green-500 text-white'
                            : 'bg-primary text-white hover:bg-primary/90 shadow-[0_4px_16px_rgba(19,35,75,0.22)] hover:shadow-[0_6px_22px_rgba(19,35,75,0.30)]'
                        } disabled:opacity-60`}
                      >
                        {addedToCart ? (
                          <><CheckCircle className="w-4 h-4" /> Added to Cart</>
                        ) : (
                          <><ShoppingBag className="w-4 h-4" /> Add to Cart</>
                        )}
                      </button>
                    )
                  ) : (
                    /* Unpriced product: Inquiry options */
                    <>
                      <a
                        href={`https://wa.me/17328329938?text=${whatsappMsg}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full flex items-center justify-center gap-2.5 py-4 bg-primary text-white text-xs font-bold tracking-[0.15em] uppercase rounded-xl hover:bg-primary/90 transition-all shadow-[0_4px_16px_rgba(19,35,75,0.22)] hover:shadow-[0_6px_22px_rgba(19,35,75,0.30)]"
                      >
                        <MessageCircle className="w-4 h-4" />
                        Inquire Now
                      </a>

                      <button
                        onClick={() => setShowInquiryForm(!showInquiryForm)}
                        className="w-full py-3 text-xs text-slate-500 hover:text-primary transition-colors border border-slate-200 hover:border-primary/30 rounded-xl"
                      >
                        {showInquiryForm ? 'Hide Form' : 'Send Email Inquiry'}
                      </button>
                    </>
                  )}
                </div>

                {/* Email Inquiry Form */}
                {showInquiryForm && (
                  <div className="bg-slate-50 rounded-xl border border-slate-100 p-5 mb-6">
                    <h4 className="text-xs font-bold tracking-widest uppercase text-primary mb-4">Email Inquiry</h4>
                    <form onSubmit={handleInquiry} className="space-y-3">
                      <input required type="text" placeholder="Your Name" value={inquiryData.name}
                        onChange={(e) => setInquiryData({ ...inquiryData, name: e.target.value })}
                        className="w-full text-sm px-4 py-2.5 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all" />
                      <input required type="email" placeholder="Email Address" value={inquiryData.email}
                        onChange={(e) => setInquiryData({ ...inquiryData, email: e.target.value })}
                        className="w-full text-sm px-4 py-2.5 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all" />
                      <input type="tel" placeholder="Phone (optional)" value={inquiryData.phone}
                        onChange={(e) => setInquiryData({ ...inquiryData, phone: e.target.value })}
                        className="w-full text-sm px-4 py-2.5 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all" />
                      <textarea required rows={3} placeholder="Your message..." value={inquiryData.message}
                        onChange={(e) => setInquiryData({ ...inquiryData, message: e.target.value })}
                        className="w-full text-sm px-4 py-2.5 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all resize-none" />
                      <button type="submit" disabled={createInquiry.isPending}
                        className="w-full py-3 bg-primary text-white text-xs font-bold tracking-widest uppercase rounded-lg hover:bg-primary/90 disabled:opacity-60 transition-colors">
                        {createInquiry.isPending ? 'Sending...' : 'Send Inquiry'}
                      </button>
                    </form>
                  </div>
                )}

                {/* Trust Badges */}
                <div className="grid grid-cols-2 gap-3">
                  {trustBadges.map(({ icon: Icon, label, value }) => (
                    <div key={label} className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl">
                      <div className="w-8 h-8 bg-primary/8 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                        <Icon className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-[9px] uppercase tracking-widest text-slate-400 font-semibold leading-tight">{label}</p>
                        <p className="text-xs font-semibold text-slate-700 mt-0.5">{value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ─── Description & Specs Section ──────────────────────────────── */}
          {product.description && (
            <div className="mt-8 sm:mt-12">
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                <div className="px-6 sm:px-8 py-5 border-b border-slate-100 flex items-center gap-4">
                  <h2 className="font-serif text-xl sm:text-2xl text-primary font-medium">Product Details</h2>
                  <div className="h-px flex-1 bg-slate-100" />
                </div>
                <div className="p-6 sm:p-8">
                  <div
                    className="product-description"
                    dangerouslySetInnerHTML={{ __html: product.description }}
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ─── Related Products ──────────────────────────────────────────── */}
        {related && related.length > 0 && (
          <section className="mt-12 sm:mt-16 pb-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
              <div className="flex items-center gap-6 mb-8">
                <h2 className="font-serif text-2xl sm:text-3xl text-primary font-medium whitespace-nowrap">You May Also Like</h2>
                <div className="h-px flex-1 bg-slate-200" />
                <Link href="/collection" className="text-xs font-semibold uppercase tracking-widest text-slate-400 hover:text-primary transition-colors whitespace-nowrap">
                  View All
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                {related.slice(0, 4).map((p) => <ProductCard key={p.id} product={p} />)}
              </div>
            </div>
          </section>
        )}
      </main>
    </>
  );
}
