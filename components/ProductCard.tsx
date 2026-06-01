'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Package, ArrowRight } from 'lucide-react';
import type { Product } from '@/hooks/useProducts';

interface ProductCardProps {
  product: Product;
  onInquire?: (product: Product) => void;
  compact?: boolean;
}

export function ProductCard({ product, compact }: ProductCardProps) {
  const image = product.images?.[0];

  return (
    <div className={`group bg-white border border-slate-100 rounded-xl overflow-hidden hover:shadow-[0_20px_60px_rgba(30,58,95,0.1)] hover:-translate-y-1 transition-all duration-500 ${compact ? 'scale-[0.98]' : ''}`}>
      <Link href={`/product/${product.slug}`} className="block">
        <div className={`relative bg-slate-50 overflow-hidden ${compact ? 'aspect-[4/5]' : 'aspect-square'}`}>
          {image ? (
            <Image
              src={image}
              alt={product.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Package className="w-16 h-16 text-slate-200" />
            </div>
          )}

          {product.featured && (
            <div className="absolute top-3 left-3 bg-primary text-white text-[10px] font-semibold tracking-widest uppercase px-3 py-1 rounded-full">
              Featured
            </div>
          )}
          {!product.inStock && (
            <div className="absolute inset-0 bg-white/60 flex items-center justify-center">
              <span className="text-xs font-semibold tracking-widest uppercase text-slate-500 border border-slate-300 px-4 py-2 rounded-full bg-white">
                Sold
              </span>
            </div>
          )}
        </div>
      </Link>

      <div className={compact ? 'p-3' : 'p-5'}>
        {(product.brand || product.model) && (
          <p className={`font-semibold tracking-[0.2em] uppercase text-silver mb-1 ${compact ? 'text-[9px]' : 'text-[10px]'}`}>
            {product.brand}
            {product.brand && product.model && ' · '}
            {product.model}
          </p>
        )}
        <Link href={`/product/${product.slug}`}>
          <h3 className={`font-serif font-medium text-primary leading-snug mb-2 hover:text-primary/80 transition-colors line-clamp-2 ${compact ? 'text-sm' : 'text-base'}`}>
            {product.title}
          </h3>
        </Link>

        {product.sku && !compact && (
          <p className="text-[11px] text-slate-400 mb-3">Ref. {product.sku}</p>
        )}

        <div className="mt-3 pt-3 border-t border-slate-100">
          <Link
            href={`/product/${product.slug}`}
            className={`flex items-center justify-center gap-1.5 w-full font-semibold tracking-wider uppercase text-primary hover:text-primary/70 transition-colors ${compact ? 'text-[10px] py-1' : 'text-[11px] py-1.5'}`}
          >
            View Product
            <ArrowRight className={`${compact ? 'w-3 h-3' : 'w-3.5 h-3.5'}`} />
          </Link>
        </div>
      </div>
    </div>
  );
}
