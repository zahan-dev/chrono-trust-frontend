'use client';

import { ShieldCheck, Scale, Globe, PlayCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import Image from 'next/image';

export const TrustSection = () => {
  const features = [
    {
      icon: ShieldCheck,
      title: 'Guaranteed Authentic',
      description: 'Every timepiece undergoes a rigorous multi-point inspection by our master watchmakers to ensure 100% authenticity.',
    },
    {
      icon: Scale,
      title: 'Expert Valuation',
      description: 'Transparent, data-driven pricing backed by global market intelligence, guaranteeing fair value for every transaction.',
    },
    {
      icon: Globe,
      title: 'Secure Global Transit',
      description: 'Fully insured, discreet, and seamless worldwide shipping with dedicated tracking for absolute peace of mind.',
    },
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
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const } },
  };

  return (
    <section className="py-16 lg:py-32 bg-[#fafafa] relative overflow-hidden border-b border-slate-200" id="trust">
      {/* Subtle Premium Texture */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.8\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' }}></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-stretch">
          
          {/* Left Column: Text & Video */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col justify-between h-full"
          >
            <div className="mb-8 lg:mb-10">
              <div className="inline-flex items-center gap-3 mb-4 lg:mb-6">
                <div className="h-px w-8 bg-primary"></div>
                <span className="text-silver font-medium text-[10px] sm:text-xs tracking-[0.3em] uppercase">
                  Why Shop With Us
                </span>
              </div>
              
              <h2 className="text-3xl md:text-5xl font-serif font-medium text-primary leading-[1.1] tracking-tight mb-4 lg:mb-6">
                The Standard for Luxury Timepieces
              </h2>
              
              <p className="text-slate-500 font-light leading-relaxed text-base md:text-lg max-w-md">
                Experience the pinnacle of horological service. We combine deep industry expertise with absolute discretion to deliver an unparalleled buying and selling experience.
              </p>
            </div>

            {/* Placeholder Video Container */}
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-slate-900 group cursor-pointer mt-4 lg:mt-auto border border-silver/20 shadow-[0_10px_40px_rgba(30,58,95,0.08)]">
              {/* Replace img src with actual video thumbnail or use iframe */}
              <Image 
                src="https://images.unsplash.com/photo-1547996160-81dfa63595aa?auto=format&fit=crop&w=1200&q=80" 
                alt="ChronoTrust Experience Video"
                fill
                className="object-cover opacity-60 group-hover:opacity-70 group-hover:scale-105 transition-all duration-700 ease-[0.16,1,0.3,1]"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 lg:w-16 lg:h-16 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 group-hover:bg-primary group-hover:border-primary transition-all duration-500">
                  <PlayCircle className="w-6 h-6 lg:w-8 lg:h-8 text-white ml-1" strokeWidth={1.5} />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Benefit Cards */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="flex flex-col gap-4 lg:gap-6 h-full mt-4 lg:mt-0"
          >
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div 
                  key={index}
                  variants={itemVariants}
                  className="bg-white rounded-2xl p-5 lg:p-8 border border-silver/20 shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_10px_40px_rgba(30,58,95,0.06)] hover:-translate-y-1 transition-all duration-500 group flex flex-col sm:flex-row items-start gap-4 lg:gap-6 flex-1"
                >
                  <div className="shrink-0 w-12 h-12 lg:w-14 lg:h-14 rounded-full bg-[#fafafa] flex items-center justify-center border border-silver/30 group-hover:bg-primary transition-colors duration-500">
                    <Icon className="w-5 h-5 lg:w-6 lg:h-6 text-primary group-hover:text-white transition-colors duration-500" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="text-lg lg:text-xl font-serif font-medium text-primary mb-2 lg:mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-slate-500 font-light leading-relaxed text-sm md:text-base">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

        </div>
      </div>
    </section>
  );
};
