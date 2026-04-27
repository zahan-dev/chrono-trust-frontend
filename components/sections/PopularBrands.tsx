'use client';

import { motion } from 'framer-motion';

export const PopularBrands = () => {
  const brands = [
    { name: 'Rolex', logo: 'ROLEX' },
    { name: 'Patek Philippe', logo: 'PATEK PHILIPPE' },
    { name: 'Audemars Piguet', logo: 'AUDEMARS PIGUET' },
    { name: 'Omega', logo: 'OMEGA' },
    { name: 'Cartier', logo: 'CARTIER' },
    { name: 'Tag Heuer', logo: 'TAG HEUER' },
  ];

  return (
    <section className="py-24 bg-white border-b border-slate-100 relative overflow-hidden">
      {/* Subtle Premium Texture */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.02]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' }}></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center justify-center gap-4 mb-6">
              <div className="h-px w-8 bg-silver"></div>
              <span className="text-[11px] font-bold tracking-[0.4em] text-silver uppercase">
                Explore Collections
              </span>
              <div className="h-px w-8 bg-silver"></div>
            </div>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary tracking-tight">
              Popular Luxury Brands
            </h2>
          </motion.div>
        </div>
      </div>

      {/* Marquee Strip */}
      <div className="relative w-full overflow-hidden flex py-16 bg-[#02050A] border-y border-primary/30 shadow-[inset_0_0_60px_rgba(0,0,0,0.5)]">
        {/* Gradient Mask for fading edges */}
        <div className="absolute inset-0 z-20 pointer-events-none bg-linear-to-r from-[#02050A] via-transparent to-[#02050A] w-full h-full" />
        
        <motion.div
          className="flex flex-nowrap gap-24 sm:gap-40 w-max items-center pr-24 sm:pr-40"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            repeat: Infinity,
            repeatType: "loop",
            duration: 40,
            ease: "linear",
          }}
        >
          {[...brands, ...brands, ...brands, ...brands].map((brand, idx) => (
            <a
              key={idx}
              href={`#${brand.name.toLowerCase().replace(' ', '-')}`}
              className="group relative shrink-0 flex items-center justify-center transform-gpu will-change-transform px-8 py-6 rounded-2xl hover:bg-white/5 transition-colors duration-500"
            >
              <span className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold tracking-[0.15em] text-silver/40 group-hover:text-white group-hover:scale-105 transition-all duration-500 relative z-10 group-hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]">
                {brand.logo}
                <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-[shine_1s_ease-in-out] pointer-events-none" />
              </span>
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
