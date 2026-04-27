'use client';

import Image from 'next/image';
import { Button } from '../ui/Button';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

export const NewArrivals = () => {
  const whatsappNumber = '+17328329938';
  
  const arrivals = [
    {
      brand: 'Rolex',
      model: 'Submariner Date',
      ref: '126610LN',
      image: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&w=800&q=80',
    },
    {
      brand: 'Audemars Piguet',
      model: 'Royal Oak Offshore',
      ref: '26420SO',
      image: 'https://images.unsplash.com/photo-1548171915-e79a380a2a4b?auto=format&fit=crop&w=800&q=80',
    },
    {
      brand: 'Patek Philippe',
      model: 'Aquanaut',
      ref: '5167A',
      image: 'https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?auto=format&fit=crop&w=800&q=80',
    },
    {
      brand: 'Omega',
      model: 'Speedmaster Professional',
      ref: '310.30.42.50.01.002',
      image: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=800&q=80',
    },
    {
      brand: 'Omega',
      model: 'Speedmaster Professional',
      image: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&w=800&q=80',
    },
    {
      brand: 'Cartier',
      model: 'Santos de Cartier',
      image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=800&q=80',
    },
    {
      brand: 'Tudor',
      model: 'Monaco Calibre 11',
      image: 'https://images.unsplash.com/photo-1509048191080-d2984bad6ae5?auto=format&fit=crop&w=800&q=80',
    },
    {
      brand: 'Rolex',
      model: 'Datejust 41',
      image: 'https://images.unsplash.com/photo-1547996160-81dfa63595aa?auto=format&fit=crop&w=800&q=80',
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const } },
  };

  return (
    <section className="py-24 lg:py-32 bg-[#FAFAFA] border-b border-slate-100 relative overflow-hidden" id="new-arrivals">
      {/* Subtle Premium Texture */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.02]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' }}></div>

      <div className="container mx-auto text-center px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <div className="inline-flex items-center gap-3 mb-6">
              <div className="h-px w-10 bg-primary"></div>
              <span className="text-silver font-medium text-xs tracking-[0.3em] uppercase">
                Just Added
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-medium text-primary leading-[1.1] tracking-tight">
              New Arrivals
            </h2>
          </motion.div>
          
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-8 lg:gap-10"
        >
          {arrivals.map((watch, index) => (
            <motion.div 
              key={index} 
              variants={itemVariants} 
              className="group flex flex-col bg-white rounded-xl overflow-hidden shadow-none hover:shadow-[0_20px_60px_rgba(30,58,95,0.06)] transition-all duration-700 hover:-translate-y-2 border border-slate-100 cursor-pointer"
              onClick={() => window.open(`https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`I'm inquiring about the ${watch.brand} ${watch.model} from New Arrivals.`)}`)}
            >
              {/* Image Area */}
              <div className="relative aspect-4/5 w-full overflow-hidden bg-[#fafafa]">
                <Image
                  src={watch.image}
                  alt={watch.model}
                  fill
                  className="object-cover transition-transform duration-[1.5s] ease-[0.16,1,0.3,1] group-hover:scale-105 mix-blend-multiply"
                />
                <div className="absolute inset-0 bg-linear-to-t from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              </div>
              
              {/* Content Area */}
              <div className="flex flex-col flex-1 p-6 lg:p-8 bg-white relative z-20 text-center border-t border-slate-50">
                <span className="text-silver text-[10px] tracking-[0.3em] uppercase mb-3 font-medium">
                  {watch.brand}
                </span>
                
                <h3 className="text-xl lg:text-2xl font-serif font-medium text-primary mb-3 line-clamp-1">
                  {watch.model}
                </h3>
                
                <div className="mt-auto pt-4 flex flex-col items-center gap-3">
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary/60 group-hover:text-primary transition-colors duration-300">
                    View Details 
                    <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="shrink-0"
          >
            <Button 
              variant="outline" 
              href="#listings" 
              className="gap-3 mt-8"
            >
              View Full Collection <ArrowRight className="w-4 h-4" />
            </Button>
          </motion.div>
      </div>
    </section>
  );
};
