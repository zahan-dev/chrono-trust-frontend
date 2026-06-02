"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ProductCard } from "@/components/ProductCard";
import { PageSkeleton } from "@/components/SkeletonCard";
import { useProducts } from "@/hooks/useProducts";
import { useCategories } from "@/hooks/useCategories";
import { Search, ChevronLeft, ChevronRight, X, Grid3X3, LayoutGrid } from "lucide-react";

const SORT_OPTIONS = [
  { value: "newest", label: "Newest Arrivals" },
  { value: "price_asc", label: "Price: Low to High" },
  { value: "price_desc", label: "Price: High to Low" },
  { value: "title_asc", label: "Name: A to Z" },
];

export default function CollectionPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [q, setQ] = useState("");
  const [categorySlug, setCategorySlug] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "compact">("grid");
  const LIMIT = 12;

  const { data, isLoading } = useProducts({
    page,
    limit: LIMIT,
    q,
    categorySlug,
    sortBy,
  });
  const { data: categories } = useCategories();

  const totalPages = data ? Math.ceil(data.total / LIMIT) : 1;

  useEffect(() => {
    const timer = setTimeout(() => {
      setQ(search);
      setPage(1);
    }, 350);
    return () => clearTimeout(timer);
  }, [search]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setQ(search);
    setPage(1);
  };

  const clearFilters = () => {
    setSearch("");
    setQ("");
    setCategorySlug("");
    setSortBy("newest");
    setPage(1);
  };

  const hasFilters = q || categorySlug || sortBy !== "newest";

  return (
    <main className="min-h-screen bg-[#FAFAFA] flex flex-col">
      {/* Cinematic Hero Section */}
      <section className="relative w-full flex items-center justify-center overflow-hidden bg-primary min-h-[300px] h-[45vh] sm:h-[50vh] max-h-[580px]">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-linear-to-t from-primary/90 via-primary/50 to-transparent" />
        </div>

        <div className="relative z-10 container mx-auto px-6 text-center pt-20 sm:pt-16 pb-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <p className="text-white/60 text-[10px] sm:text-xs tracking-[0.3em] sm:tracking-[0.4em] uppercase font-semibold mb-3 sm:mb-5">
              Curated Excellence
            </p>
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white font-medium tracking-tight mb-3 sm:mb-5 drop-shadow-sm">
              Our Luxury Collection
            </h1>
            <div className="w-12 h-px bg-white/30 mx-auto mb-3 sm:mb-5" />
            <p className="text-white/70 font-light max-w-2xl mx-auto text-sm sm:text-base leading-relaxed hidden sm:block">
              Handpicked luxury timepieces verified for authenticity and condition.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Premium Filter Bar */}
      <section className="sticky top-0 z-40 bg-white/95 backdrop-blur-xl border-b border-slate-200/50 shadow-sm transition-all">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="py-3 flex flex-row gap-2 items-center justify-between">
            {/* Search Input */}
            <form onSubmit={handleSearch} className="flex-1 min-w-0 relative group">
              <div className="absolute inset-y-0 left-3 sm:left-4 flex items-center pointer-events-none">
                <Search className="w-4 h-4 text-slate-400 group-focus-within:text-primary transition-colors" />
              </div>
              <input
                type="text"
                placeholder="Search brand, model, SKU..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 sm:pl-11 pr-8 py-2 sm:py-2.5 bg-slate-50/50 border border-slate-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all placeholder:text-slate-400"
              />
              {search && (
                <button
                  type="button"
                  onClick={() => { setSearch(""); setQ(""); setPage(1); }}
                  className="absolute inset-y-0 right-3 flex items-center text-slate-400 hover:text-primary transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </form>

            {/* Controls */}
            <div className="flex items-center gap-2 shrink-0">
              <select
                value={sortBy}
                onChange={(e) => { setSortBy(e.target.value); setPage(1); }}
                className="hidden sm:block py-2 pl-3 pr-7 bg-slate-50 border border-slate-200 rounded-full text-xs font-medium text-primary focus:outline-none cursor-pointer appearance-none"
              >
                {SORT_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>

              <div className="flex items-center bg-slate-100 rounded-full p-1">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-1.5 sm:p-2 rounded-full transition-all duration-300 ${viewMode === "grid" ? "bg-white text-primary shadow-sm" : "text-slate-400 hover:text-primary"}`}
                  aria-label="Grid View"
                >
                  <LayoutGrid className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </button>
                <button
                  onClick={() => setViewMode("compact")}
                  className={`p-1.5 sm:p-2 rounded-full transition-all duration-300 ${viewMode === "compact" ? "bg-white text-primary shadow-sm" : "text-slate-400 hover:text-primary"}`}
                  aria-label="Compact View"
                >
                  <Grid3X3 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Mobile sort row */}
          <div className="flex sm:hidden items-center gap-2 pb-2 overflow-x-auto hide-scrollbar">
            {SORT_OPTIONS.map((o) => (
              <button
                key={o.value}
                onClick={() => { setSortBy(o.value); setPage(1); }}
                className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${sortBy === o.value ? 'bg-primary text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
              >
                {o.label}
              </button>
            ))}
          </div>
        </div>

        {/* Categories Bar */}
        <div className="border-t border-slate-100 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="flex items-center gap-6 overflow-x-auto py-4 hide-scrollbar">
              <button
                onClick={() => {
                  setCategorySlug("");
                  setPage(1);
                }}
                className={`flex-shrink-0 text-sm font-medium transition-all relative pb-1 ${!categorySlug ? "text-primary" : "text-slate-500 hover:text-primary"
                  }`}
              >
                All Brands
                {!categorySlug && (
                  <motion.div layoutId="activeCategory" className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
                )}
              </button>
              {categories?.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    setCategorySlug(cat.slug);
                    setPage(1);
                  }}
                  className={`flex-shrink-0 text-sm font-medium transition-all relative pb-1 flex items-center gap-1.5 ${categorySlug === cat.slug ? "text-primary" : "text-slate-500 hover:text-primary"
                    }`}
                >
                  {cat.name}
                  <span className="text-[10px] bg-slate-100 px-1.5 py-0.5 rounded-full text-slate-500">
                    {cat._count?.products || 0}
                  </span>
                  {categorySlug === cat.slug && (
                    <motion.div layoutId="activeCategory" className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="flex-1 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">

          {/* Active Filters Info */}
          {hasFilters && (
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-200/50">
              <div className="flex items-center gap-2">
                <span className="text-sm text-slate-500">Active Filters:</span>
                {q && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-white border border-slate-200 rounded-full text-xs font-medium text-primary shadow-sm">
                    Search: {q}
                  </span>
                )}
                {categorySlug && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-white border border-slate-200 rounded-full text-xs font-medium text-primary shadow-sm">
                    {categories?.find(c => c.slug === categorySlug)?.name || categorySlug}
                  </span>
                )}
              </div>
              <button
                onClick={clearFilters}
                className="text-xs font-medium text-slate-400 hover:text-primary flex items-center gap-1 transition-colors"
              >
                <X className="w-3 h-3" /> Clear All
              </button>
            </div>
          )}

          {/* Results State */}
          <div className="mb-6 flex justify-between items-end">
            <h2 className="font-serif text-2xl text-primary font-medium">
              {categorySlug ? (categories?.find(c => c.slug === categorySlug)?.name || 'Collection') : 'Featured Timepieces'}
            </h2>
            <p className="text-sm text-slate-500">
              {isLoading ? (
                "Loading collection..."
              ) : (
                <>Showing <span className="text-primary font-medium">{data?.data?.length || 0}</span> of <span className="text-primary font-medium">{data?.total || 0}</span></>
              )}
            </p>
          </div>

          {/* Grid */}
          {isLoading ? (
            <PageSkeleton />
          ) : data?.data?.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-32 bg-white rounded-2xl border border-slate-100 shadow-sm"
            >
              <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="w-6 h-6 text-slate-300" />
              </div>
              <h3 className="font-serif text-2xl text-primary mb-3">No Timepieces Found</h3>
              <p className="text-slate-500 mb-8 max-w-md mx-auto">
                We couldn't find any watches matching your current filters. Try exploring other categories or clearing your search.
              </p>
              <button
                onClick={clearFilters}
                className="px-8 py-3 bg-primary text-white text-sm font-medium tracking-wide uppercase rounded-full hover:bg-primary/90 transition-all hover:shadow-lg hover:shadow-primary/20"
              >
                Reset Filters
              </button>
            </motion.div>
          ) : (
            <div
              className={`grid gap-x-4 sm:gap-x-6 gap-y-8 sm:gap-y-10 ${viewMode === "grid"
                  ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                  : "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
                }`}
            >
              {data?.data?.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05, ease: "easeOut" }}
                >
                  <ProductCard product={product} compact={viewMode === "compact"} />
                </motion.div>
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-16 pt-8 border-t border-slate-200/50">
              <button
                onClick={() => {
                  setPage((p) => Math.max(1, p - 1));
                  window.scrollTo({ top: 400, behavior: 'smooth' });
                }}
                disabled={page === 1}
                className="w-10 h-10 flex items-center justify-center rounded-full border border-slate-200 text-slate-500 hover:border-primary hover:text-primary hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter((p) => p === 1 || p === totalPages || Math.abs(p - page) <= 1)
                .map((p, idx, arr) => (
                  <div key={p} className="flex items-center">
                    {idx > 0 && (arr[idx - 1] as number) !== p - 1 && (
                      <span className="px-3 text-slate-300">...</span>
                    )}
                    <button
                      onClick={() => {
                        setPage(p);
                        window.scrollTo({ top: 400, behavior: 'smooth' });
                      }}
                      className={`w-10 h-10 flex items-center justify-center rounded-full text-sm font-medium transition-all ${page === p
                          ? "bg-primary text-white shadow-md shadow-primary/20"
                          : "text-slate-600 hover:bg-slate-100"
                        }`}
                    >
                      {p}
                    </button>
                  </div>
                ))}

              <button
                onClick={() => {
                  setPage((p) => Math.min(totalPages, p + 1));
                  window.scrollTo({ top: 400, behavior: 'smooth' });
                }}
                disabled={page === totalPages}
                className="w-10 h-10 flex items-center justify-center rounded-full border border-slate-200 text-slate-500 hover:border-primary hover:text-primary hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Global hide scrollbar styles since we used it */}
      <style dangerouslySetInnerHTML={{
        __html: `
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />
    </main>
  );
}
