"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ProductCard } from "@/components/ProductCard";
import { PageSkeleton } from "@/components/SkeletonCard";
import { useProducts } from "@/hooks/useProducts";
import { useCategories } from "@/hooks/useCategories";
import { Search, SlidersHorizontal, ChevronLeft, ChevronRight, X, Grid3X3, LayoutGrid } from "lucide-react";

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
      <section className="relative w-full h-[50vh] min-h-[400px] max-h-[600px] flex items-center justify-center overflow-hidden bg-primary">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1549972574-8e3e1ed6a20d?q=80&w=2000"
            alt="Luxury watches collection"
            fill
            className="object-cover opacity-40 scale-105 transform hover:scale-100 transition-transform duration-[10s]"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/50 to-transparent" />
        </div>

        <div className="relative z-10 container mx-auto px-4 text-center mt-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <p className="text-white/60 text-xs tracking-[0.4em] uppercase font-semibold mb-6">
              Curated Excellence
            </p>
            <h1 className="font-serif text-5xl md:text-6xl text-white font-medium tracking-tight mb-6 drop-shadow-sm">
              Explore Our Curated Luxury Timepieces
            </h1>
            <div className="w-16 h-[1px] bg-white/30 mx-auto mb-6" />
            <p className="text-white/80 font-light max-w-4xl mx-auto text-lg">
              Experience a handpicked selection of the world’s most prestigious watches, chosen for their rarity, craftsmanship, and timeless elegance. Each piece in our collection is verified for authenticity and comes with expert-backed guidance to ensure a secure and confident acquisition.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Premium Filter Bar */}
      <section className="sticky top-0 z-40 bg-white/90 backdrop-blur-xl border-b border-slate-200/50 shadow-sm transition-all">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="py-4 flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search Input */}
            <form onSubmit={handleSearch} className="w-full md:w-auto md:flex-1 max-w-md relative group">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                <Search className="w-4 h-4 text-slate-400 group-focus-within:text-primary transition-colors" />
              </div>
              <input
                type="text"
                placeholder="Search by brand, model, or reference..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-11 pr-4 py-2.5 bg-slate-50/50 border border-slate-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all placeholder:text-slate-400"
              />
              {search && (
                <button
                  type="button"
                  onClick={() => {
                    setSearch("");
                    setQ("");
                    setPage(1);
                  }}
                  className="absolute inset-y-0 right-4 flex items-center text-slate-400 hover:text-primary transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </form>

            {/* Controls */}
            <div className="flex items-center gap-3 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
              <div className="flex items-center gap-2 pr-4 md:pr-0 border-r border-slate-200 md:border-none">
                <span className="text-xs font-medium text-slate-400 uppercase tracking-wider whitespace-nowrap">Sort By</span>
                <select
                  value={sortBy}
                  onChange={(e) => {
                    setSortBy(e.target.value);
                    setPage(1);
                  }}
                  className="py-2 pl-3 pr-8 bg-transparent text-sm font-medium text-primary focus:outline-none cursor-pointer appearance-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMiIgaGVpZ2h0PSIxMiIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiMxMzIzNGIiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48cG9seWxpbmUgcG9pbnRzPSI2IDkgMTIgMTUgMTggOSI+PC9wb2x5bGluZT48L3N2Zz4=')] bg-no-repeat bg-[right_8px_center]"
                >
                  {SORT_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center bg-slate-100/80 rounded-full p-1 ml-auto md:ml-4 flex-shrink-0">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-full transition-all duration-300 ${viewMode === "grid"
                      ? "bg-white text-primary shadow-sm"
                      : "text-slate-400 hover:text-primary"
                    }`}
                  aria-label="Grid View"
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode("compact")}
                  className={`p-2 rounded-full transition-all duration-300 ${viewMode === "compact"
                      ? "bg-white text-primary shadow-sm"
                      : "text-slate-400 hover:text-primary"
                    }`}
                  aria-label="Compact View"
                >
                  <Grid3X3 className="w-4 h-4" />
                </button>
              </div>
            </div>
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
              className={`grid gap-x-6 gap-y-10 ${viewMode === "grid"
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
