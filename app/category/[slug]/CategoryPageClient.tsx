'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useCategoryProducts } from '@/hooks/useCategories';
import { ProductCard } from '@/components/ProductCard';
import { PageSkeleton } from '@/components/SkeletonCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { Product } from '@/hooks/useProducts';

interface CategoryPageClientProps {
  slug: string;
}

export function CategoryPageClient({ slug }: CategoryPageClientProps) {
  const [page, setPage] = useState(1);
  const LIMIT = 12;

  const { data, isLoading } = useCategoryProducts(slug, page, LIMIT);
  const totalPages = data ? Math.ceil(data.total / LIMIT) : 1;

  return (
    <>
      <main className="min-h-screen bg-[#FAFAFA]">
        <div className="bg-primary text-white pt-38 pb-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl text-center">
            <p className="text-[11px] tracking-[0.3em] uppercase text-white/60 mb-3">Collection</p>
            <h1 className="font-serif text-4xl md:text-5xl font-medium tracking-tight capitalize">
              {data?.category?.name ?? slug.replace(/-/g, ' ')}
            </h1>
            {data?.category?.description && (
              <p className="text-white/60 mt-3 text-sm font-light max-w-md mx-auto">
                {data.category.description}
              </p>
            )}
          </div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-10">
          <nav className="flex items-center gap-2 text-[11px] text-slate-400 mb-8 uppercase tracking-wider">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <span>/</span>
            <Link href="/collection" className="hover:text-primary transition-colors">Collection</Link>
            <span>/</span>
            <span className="text-slate-600 capitalize">{data?.category?.name ?? slug.replace(/-/g, ' ')}</span>
          </nav>

          <div className="flex items-center justify-between mb-6">
            <p className="text-sm text-slate-500">
              {isLoading ? '…' : `${data?.total ?? 0} timepieces`}
            </p>
            <p className="text-xs text-slate-400">Page {page} of {totalPages}</p>
          </div>

          {isLoading ? (
            <PageSkeleton />
          ) : data?.data?.length === 0 ? (
            <div className="text-center py-24">
              <p className="text-slate-400 text-lg font-light">No timepieces in this category yet.</p>
              <Link href="/collection" className="mt-4 inline-block text-sm text-primary hover:underline">
                ← View All Collection
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {data?.data?.map((product: Product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-12">
              <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}
                className="p-2.5 rounded-xl border border-slate-200 text-slate-500 hover:border-primary hover:text-primary disabled:opacity-30 disabled:cursor-not-allowed transition-colors">
                <ChevronLeft className="w-4 h-4" />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button key={p} onClick={() => setPage(p)}
                  className={`w-9 h-9 rounded-xl text-sm font-medium transition-colors ${page === p ? 'bg-primary text-white' : 'border border-slate-200 text-slate-600 hover:border-primary hover:text-primary'}`}>
                  {p}
                </button>
              ))}
              <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages}
                className="p-2.5 rounded-xl border border-slate-200 text-slate-500 hover:border-primary hover:text-primary disabled:opacity-30 disabled:cursor-not-allowed transition-colors">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
