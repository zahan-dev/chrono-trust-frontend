'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { Button } from '../ui/Button';
import { ArrowRight, ChevronRight, ChevronLeft } from 'lucide-react';
import { motion } from 'framer-motion';

export const NewArrivals = () => {
  const whatsappNumber = '+17328329938';
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const arrivals = [
    {
      brand: 'Rolex',
      model: 'Sea-Dweller Deepsea',
      ref: '136660',
      image: '/rolex-1.jpg',
    },
    {
      brand: 'Audemars Piguet',
      model: 'Royal Oak Chronograph',
      ref: '26240OR',
      image: '/Audemars Piguet 1.jpg',
    },
    {
      brand: 'Patek Philippe',
      model: 'Nautilus Chronograph',
      ref: '5980/1R',
      image: '/Patek Philippe 1.webp',
    },
    {
      brand: 'Omega',
      model: 'Seamaster Diver 300M',
      ref: '210.30.42.20.03.001',
      image: '/Omega 2.webp',
    },
    {
      brand: 'Cartier',
      model: 'Tank Must Diamond',
      ref: 'WJTA0023',
      image: '/Cartier 1.webp',
    },
    {
      brand: 'Rolex',
      model: 'Deepsea Sea-Dweller',
      ref: '126660',
      image: '/rolex-2.webp',
    },
    {
      brand: 'IWC',
      model: 'Portugieser Perpetual',
      ref: 'IW503302',
      image: '/IWC 1.webp',
    },
    {
      brand: 'Patek Philippe',
      model: 'Nautilus Sport',
      ref: '5990/1A',
      image: '/Patek Philippe 2.webp',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const scrollPosition = scrollRef.current.scrollLeft;
    // Calculate the width of one single snap item (total scrollable width / total items)
    const itemWidth = scrollRef.current.scrollWidth / arrivals.length;
    setActiveIndex(Math.round(scrollPosition / itemWidth));
  };

  const scrollToIndex = (index: number) => {
    if (!scrollRef.current) return;
    const itemWidth = scrollRef.current.scrollWidth / arrivals.length;
    scrollRef.current.scrollTo({ left: itemWidth * index, behavior: 'smooth' });
  };

  const scrollNext = () => {
    if (activeIndex < arrivals.length - 1) scrollToIndex(activeIndex + 1);
  };

  const scrollPrev = () => {
    if (activeIndex > 0) scrollToIndex(activeIndex - 1);
  };

  return (
    <section
      className="py-16 lg:py-32 border-b border-slate-100 relative overflow-hidden"
      id="new-arrivals"
      style={{ backgroundColor: '#FAFAFA' }}
    >
      {/* Subtle texture */}
      <div
        className="absolute inset-0 z-0 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")',
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 md:mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <div className="inline-flex items-center gap-3 mb-4 md:mb-6">
              <div className="h-px w-8 md:w-10 bg-primary" />
              <span className="text-silver font-medium text-[10px] md:text-xs tracking-[0.3em] uppercase">
                Just Added
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif font-medium text-primary leading-[1.1] tracking-tight">
              New Arrivals
            </h2>
          </motion.div>

          {/* Slider Navigation (Desktop & Tablet) */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="hidden md:flex items-center gap-3"
          >
            <button 
              onClick={scrollPrev}
              disabled={activeIndex === 0}
              className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all duration-300 ${
                activeIndex === 0 
                  ? 'border-slate-200 text-slate-300 cursor-not-allowed' 
                  : 'border-silver/50 text-primary hover:bg-primary hover:text-white hover:border-primary'
              }`}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button 
              onClick={scrollNext}
              disabled={activeIndex === arrivals.length - 1}
              className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all duration-300 ${
                activeIndex === arrivals.length - 1 
                  ? 'border-slate-200 text-slate-300 cursor-not-allowed' 
                  : 'border-silver/50 text-primary hover:bg-primary hover:text-white hover:border-primary'
              }`}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </motion.div>
        </div>

        {/* Grid / Slider */}
        <motion.div
          ref={scrollRef}
          onScroll={handleScroll}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="flex gap-4 md:gap-6 lg:gap-8 overflow-x-auto snap-x snap-mandatory pb-8 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:mx-0 lg:px-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] w-screen lg:w-full scroll-smooth"
        >
          {arrivals.map((watch, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-slate-100 cursor-pointer w-[80vw] sm:w-[45vw] md:w-[calc(50%-12px)] lg:w-[calc(25%-24px)] shrink-0 snap-start"
              style={{
                boxShadow: 'none',
                transition: 'box-shadow 0.5s ease, transform 0.5s ease',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.boxShadow =
                  '0 24px 64px rgba(19,35,75,0.08)';
                (e.currentTarget as HTMLElement).style.transform =
                  'translateY(-6px)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                (e.currentTarget as HTMLElement).style.transform =
                  'translateY(0)';
              }}
              onClick={() =>
                window.open(
                  `https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                    `I'm inquiring about the ${watch.brand} ${watch.model} (Ref. ${watch.ref}) from New Arrivals.`
                  )}`
                )
              }
            >
              {/* Image */}
              <div className="relative w-full overflow-hidden bg-[#f0f0f0]" style={{ aspectRatio: '4/5' }}>
                <Image
                  src={watch.image}
                  alt={`${watch.brand} ${watch.model}`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw"
                  className="object-cover object-center transition-transform duration-1000 ease-out group-hover:scale-105"
                  priority={index < 4}
                />
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                  style={{
                    background:
                      'linear-gradient(to top, rgba(19,35,75,0.12) 0%, transparent 60%)',
                  }}
                />
              </div>

              {/* Info */}
              <div className="flex flex-col flex-1 px-6 py-6 text-center">
                <span className="text-silver text-[10px] tracking-[0.35em] uppercase mb-2 font-semibold">
                  {watch.brand}
                </span>
                <h3 className="text-lg lg:text-xl font-serif font-medium text-primary mb-1 line-clamp-1">
                  {watch.model}
                </h3>
                {watch.ref && (
                  <span className="text-[10px] tracking-[0.18em] text-primary/35 uppercase font-medium mb-4">
                    Ref. {watch.ref}
                  </span>
                )}
                <div className="mt-auto flex items-center justify-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.22em] text-primary/50 group-hover:text-primary transition-colors duration-300">
                  Inquire Now
                  <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </div>
            </motion.div>
          ))}
          {/* Mobile Spacer */}
          <div className="w-4 shrink-0 md:hidden" aria-hidden="true" />
        </motion.div>

        {/* Slider Dots */}
        <div className="flex items-center justify-center gap-2 mt-4 md:mt-8">
          {arrivals.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollToIndex(index)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                activeIndex === index
                  ? 'w-6 bg-primary'
                  : 'w-1.5 bg-primary/20 hover:bg-primary/40'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="flex justify-center mt-14"
        >
          <Button variant="outline" href="#listings" className="gap-3">
            View Full Collection <ArrowRight className="w-4 h-4" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};
