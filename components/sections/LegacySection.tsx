'use client';

import { motion, useInView } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

const AnimatedNumber = ({ end, suffix = '' }: { end: number, suffix?: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (inView) {
      let startTimestamp: number | null = null;
      const duration = 2500;
      
      const step = (timestamp: number) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        setCount(Math.floor(easeOutQuart * end));
        
        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      };
      window.requestAnimationFrame(step);
    }
  }, [inView, end]);

  return <span ref={ref}>{count}{suffix}</span>;
};

export const LegacySection = () => {
  const stats = [
    { value: 15, suffix: '+', label: 'Years Experience' },
    { value: 5000, suffix: '+', label: 'Global Collectors' },
    { value: 100, suffix: '%', label: 'Trusted Transactions' },
  ];

  return (
    <section className="py-24 lg:py-32 bg-[#03060A] relative overflow-hidden" id="about">
      {/* Cinematic Background Lighting */}
      <div className="absolute top-0 right-0 w-200 h-200 bg-blue-900/10 rounded-full blur-[150px] pointer-events-none translate-x-1/3 -translate-y-1/4" />
      <div className="absolute bottom-0 left-0 w-150 h-150 bg-white/5 rounded-full blur-[120px] pointer-events-none -translate-x-1/3 translate-y-1/3" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          
          {/* Left Column: Content */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="inline-flex items-center gap-3 mb-8">
              <div className="h-px w-10 bg-blue-500"></div>
              <span className="text-white/50 font-semibold text-xs tracking-[0.3em] uppercase">
                Our Legacy
              </span>
            </div>
            
            <h2 className="text-5xl sm:text-6xl lg:text-7xl font-serif font-medium text-white mb-10 leading-[1.05] tracking-tight drop-shadow-xl">
              Built on Trust. <br /> Driven by <br className="hidden lg:block" /> Timeless Passion.
            </h2>
            
            <p className="text-lg md:text-xl text-white/60 font-light leading-relaxed mb-16 max-w-lg">
              For over a decade, we have curated the world&apos;s most exceptional timepieces for discerning collectors. Every transaction is a testament to our unwavering commitment to authenticity, privacy, and horological excellence.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-6 border-t border-white/10 pt-10">
              {stats.map((stat, idx) => (
                <div key={idx} className="relative pr-8 last:pr-0 text-center sm:text-left">
                  <div className="text-4xl lg:text-5xl font-serif text-white mb-2 flex items-center justify-center sm:justify-start gap-1">
                    <AnimatedNumber end={stat.value} />
                    <span className="text-silver">{stat.suffix}</span>
                  </div>
                  <div className="text-white/50 text-[10px] sm:text-xs font-medium tracking-[0.2em] uppercase">
                    {stat.label}
                  </div>
                  
                  {/* Divider Line */}
                  {idx !== stats.length - 1 && (
                    <div className="hidden sm:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-12 bg-white/10" />
                  )}
                </div>
              ))}
            </div>

          </motion.div>
          
          {/* Right Column: Layered Imagery */}
          <div className="relative h-125 lg:h-150 w-full hidden md:block perspective-1000">
            {/* Back Image (Large) */}
            <motion.div 
              initial={{ opacity: 0, x: 40, rotateY: 10 }}
              whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="absolute top-0 right-0 w-[85%] h-[85%] rounded-4xl overflow-hidden shadow-2xl"
            >
              <Image 
                src="https://images.unsplash.com/photo-1547996160-81dfa63595aa?auto=format&fit=crop&w=800&q=80"
                alt="ChronoTrust Showroom"
                fill
                className="object-cover hover:scale-105 transition-transform duration-[2s] opacity-70 mix-blend-luminosity"
              />
              <div className="absolute inset-0 bg-linear-to-tr from-[#03060A]/80 via-transparent to-transparent pointer-events-none" />
            </motion.div>

            {/* Front Image (Small Overlapping) */}
            <motion.div 
              initial={{ opacity: 0, y: 40, rotateY: -10 }}
              whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.5, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="absolute bottom-0 left-0 w-[55%] h-[60%] rounded-4xl overflow-hidden border border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.6)]"
            >
              <Image 
                src="https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&w=600&q=80"
                alt="Master Watchmaker"
                fill
                className="object-cover hover:scale-105 transition-transform duration-[2s]"
              />
            </motion.div>
            
            {/* Floating Trust Badge */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="absolute top-[15%] left-[-5%] bg-[#03060A]/80 backdrop-blur-xl rounded-2xl p-6 shadow-2xl flex items-center gap-5 border border-white/10"
            >
              <div className="w-14 h-14 rounded-full bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
              </div>
              <div>
                <div className="text-base font-serif font-medium text-white mb-1">100% Authentic</div>
                <div className="text-[10px] text-white/50 uppercase tracking-[0.2em] font-bold">Guaranteed</div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};
