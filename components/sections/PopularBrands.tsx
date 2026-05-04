'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const brands = [
  { name: 'Rolex', logo: '/brands/rolex.png' },
  { name: 'Omega', logo: '/brands/omega.png' },
  { name: 'Cartier', logo: '/brands/cartier.png' },
  { name: 'Patek Philippe', logo: '/brands/patek.png' },
  { name: 'Audemars Piguet', logo: '/brands/audemars-piguet.webp' },
  { name: 'Tag Heuer', logo: '/brands/tagheuer.png' },
  { name: 'Breitling', logo: '/brands/breitling.jpg' },
  { name: 'Tudor', logo: '/brands/tudor.png' },
];

export const PopularBrands = () => {
  // Duplicating brands for seamless infinite scroll
  const duplicatedBrands = [...brands, ...brands, ...brands, ...brands];

  return (
    <section className="py-16 lg:py-24 bg-white border-b border-slate-200 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        <div className="text-center mb-10 lg:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="text-[10px] font-bold tracking-[0.4em] text-silver uppercase mb-3 lg:mb-4 block">
              Trusted Names
            </span>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif font-medium text-primary tracking-tight mb-4 lg:mb-6">
              Popular Luxury Brands
            </h2>
            <p className="text-slate-500 max-w-2xl mx-auto text-sm md:text-base tracking-wide leading-relaxed">
              Explore iconic timepieces from the world&apos;s most respected watchmakers.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Premium Horizontal Logo Rail */}
      <div className="relative w-full py-8 lg:py-12 group">
        {/* Gradient Overlays for Fade Effect */}
        <div className="absolute inset-y-0 left-0 w-32 bg-linear-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-32 bg-linear-to-l from-white to-transparent z-10 pointer-events-none" />

        <div className="flex overflow-hidden">
          <motion.div
            className="flex flex-nowrap items-center gap-12 md:gap-24 pl-12 md:pl-24"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              repeat: Infinity,
              repeatType: "loop",
              duration: 40,
              ease: "linear",
            }}
            whileHover={{ transition: { duration: 80 } }} // Slow down on hover
          >
            {duplicatedBrands.map((brand, idx) => (
              <div
                key={idx}
                className="relative flex flex-col items-center justify-center cursor-pointer transition-all duration-500 group/item min-w-30 md:min-w-40"
              >
                {/* Brand Image Logo */}
                <div className="relative w-full h-16 md:h-20 mb-4 flex items-center justify-center filter grayscale opacity-50 group-hover/item:grayscale-0 group-hover/item:opacity-100 transition-all duration-500 transform group-hover/item:scale-110">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src={brand.logo} 
                    alt={`${brand.name} logo`} 
                    className="max-w-[100px] md:max-w-[140px] max-h-full object-contain"
                  />
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
