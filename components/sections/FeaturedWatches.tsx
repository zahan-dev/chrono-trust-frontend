'use client';

import Image from 'next/image';
import { Button } from '../ui/Button';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export const FeaturedWatches = () => {
  const watches = [
    {
      brand: 'Patek Philippe',
      model: 'Nautilus 5711/1A',
      desc: 'The defining luxury sports watch. Designed by Gérald Genta, the Nautilus features its iconic porthole-shaped case and horizontally embossed dial.',
      ref: '5711/1A',
      image: 'https://images.unsplash.com/photo-1548171915-e79a380a2a4b?auto=format&fit=crop&w=1600&q=80',
    },
    {
      brand: 'Audemars Piguet',
      model: 'Royal Oak Selfwinding',
      desc: 'Shattering the rules of watchmaking since 1972. The Royal Oak is an icon of design with its octagonal bezel and integrated bracelet.',
      ref: '15500ST',
      image: 'https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?auto=format&fit=crop&w=1600&q=80',
    },
    {
      brand: 'Rolex',
      model: 'Cosmograph Daytona',
      desc: 'Born to race. The Rolex Daytona is the ultimate tool watch for those with a passion for driving and speed, an icon of motorsport history.',
      ref: '116500LN',
      image: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=1600&q=80',
    },
  ];
  
  const whatsappNumber = '+17328329938';
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const } },
  };

  return (
    <section className="py-24 lg:py-32 bg-[#02050A] text-white relative overflow-hidden" id="featured">
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          {/* Section Header */}
          <div className="flex flex-col items-center text-center gap-6 mb-20 max-w-3xl mx-auto">
            <motion.div variants={itemVariants} className="inline-flex items-center gap-3">
              <div className="h-px w-8 bg-silver/50"></div>
              <span className="text-silver font-medium text-[10px] sm:text-xs tracking-[0.3em] uppercase">
                Handpicked Featured Collection
              </span>
              <div className="h-px w-8 bg-silver/50"></div>
            </motion.div>
            <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl lg:text-6xl font-serif font-medium leading-[1.1] tracking-tight">
              Exclusive Masterpieces
            </motion.h2>
            <motion.p variants={itemVariants} className="text-silver/80 font-light leading-relaxed text-lg">
              Explore our curated selection of extraordinary timepieces, representing the pinnacle of horological craftsmanship.
            </motion.p>
          </div>
          
          {/* Horizontal Showcase Grid */}
          <div className="flex flex-col gap-12 lg:gap-20">
            {watches.map((watch, index) => {
              const isEven = index % 2 === 0;
              return (
                <motion.div 
                  key={index} 
                  variants={itemVariants} 
                  className={`group flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-stretch gap-0 bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 transition-colors duration-500 cursor-pointer`}
                  onClick={() => window.open(`https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`I'm interested in the ${watch.model}`)}`)}
                >
                  {/* Image Side */}
                  <div className="w-full lg:w-1/2 relative min-h-75 lg:min-h-125 overflow-hidden bg-black/20">
                    <Image
                      src={watch.image}
                      alt={watch.model}
                      fill
                      className="object-cover transition-transform duration-[2s] ease-[0.16,1,0.3,1] group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-[#02050A]/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-700" />
                  </div>
                  
                  {/* Content Side */}
                  <div className="w-full lg:w-1/2 flex flex-col justify-center p-8 lg:p-16 relative">
                    <div className="absolute top-0 right-0 p-8 opacity-10 font-serif text-8xl font-bold italic translate-x-4 -translate-y-4 pointer-events-none">
                      0{index + 1}
                    </div>
                    
                    <span className="text-silver text-[11px] tracking-[0.4em] uppercase mb-4 font-semibold">
                      {watch.brand}
                    </span>
                    
                    <h3 className="text-3xl lg:text-4xl font-serif font-medium mb-6 leading-tight group-hover:text-silver transition-colors duration-300">
                      {watch.model}
                    </h3>
                    
                    <p className="text-silver/70 font-light leading-relaxed text-lg mb-8 max-w-lg">
                      {watch.desc}
                    </p>

                    <div className="mt-auto pt-8 border-t border-white/10 flex items-center justify-between">
                      <span className="text-sm font-mono tracking-widest text-silver/50 uppercase">
                        REF. {watch.ref}
                      </span>
                      <div className="flex items-center gap-3 text-sm font-medium uppercase tracking-[0.2em] text-white group-hover:text-silver transition-colors duration-300">
                        Inquire Now 
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
          
          <div className="mt-20 flex justify-center text-center">
            <Button 
              variant="outline" 
              className="gap-3"
              href="#listings"
            >
              View Full Collection <ArrowRight className="w-4 h-4" />
            </Button>
          </div>

        </motion.div>
      </div>
    </section>
  );
};
