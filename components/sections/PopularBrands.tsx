'use client';

import { motion } from 'framer-motion';

const brands = [
  'Rolex',
  'Omega',
  'Cartier',
  'Patek Philippe',
  'Audemars Piguet',
  'Tag Heuer',
  'Breitling',
  'Tudor',
];

export const PopularBrands = () => {
  // Duplicating brands for seamless infinite scroll
  const duplicatedBrands = [...brands, ...brands, ...brands, ...brands];

  return (
    <section className="py-16 lg:py-24 bg-[#F8F9FA] border-b border-slate-200 relative overflow-hidden">
      {/* Background Accent */}
      <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-silver/20 to-transparent" />

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
      <div className="relative w-full py-8 lg:py-12 bg-white/50 backdrop-blur-sm border-y border-slate-100 group">
        {/* Gradient Overlays for Fade Effect */}
        <div className="absolute inset-y-0 left-0 w-32 bg-linear-to-r from-[#F8F9FA] to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-32 bg-linear-to-l from-[#F8F9FA] to-transparent z-10 pointer-events-none" />

        <div className="flex overflow-hidden">
          <motion.div
            className="flex flex-nowrap items-center gap-0"
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
                className="relative px-12 md:px-20 py-8 flex items-center justify-center cursor-pointer transition-all duration-500 group/item"
              >
                {/* Background Hover Effect */}
                <div className="absolute inset-0 bg-[#E9ECEF] opacity-0 group-hover/item:opacity-100 transition-opacity duration-500 z-0" />
                
                {/* Shine Animation */}
                <div className="absolute inset-0 overflow-hidden z-0">
                  <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover/item:animate-[shine_1.5s_infinite] pointer-events-none" />
                </div>

                {/* Brand Text Logo */}
                <span className="relative z-10 text-2xl md:text-3xl lg:text-4xl font-serif text-primary/40 group-hover/item:text-primary group-hover/item:font-black transition-all duration-500 tracking-wider transform group-hover/item:scale-110">
                  {brand}
                </span>

                {/* Subtle underline */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-0 h-[1px] bg-primary group-hover/item:w-12 transition-all duration-500" />
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes shine {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </section>
  );
};
