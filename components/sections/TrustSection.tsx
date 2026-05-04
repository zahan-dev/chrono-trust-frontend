'use client';

import { ShieldCheck, Diamond, Lock, Truck, PlayCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Button } from '../ui/Button';

export const TrustSection = () => {
  const bullets = [
    { icon: ShieldCheck, text: 'Authenticity Guaranteed' },
    { icon: Diamond, text: 'Luxury Brand Selection' },
    { icon: Lock, text: 'Secure Transactions' },
    { icon: Truck, text: 'Fast & Insured Shipping' },
  ];

  return (
    <section className="py-16 lg:py-24 bg-[#FAFAFA] border-b border-slate-200 relative overflow-hidden -mt-8 md:-mt-12 z-30 rounded-t-[3rem] md:rounded-t-[4rem] shadow-[0_-20px_50px_rgba(0,0,0,0.1)]" id="trust">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-stretch">
          
          {/* Left Column: Video Container */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="w-full h-full flex flex-col"
          >
            <div className="relative w-full h-full min-h-75 md:min-h-100 rounded-xl overflow-hidden bg-slate-900 group cursor-pointer border border-silver/20 shadow-2xl">
              <Image 
                src="https://images.unsplash.com/photo-1547996160-81dfa63595aa?auto=format&fit=crop&w=1200&q=80"
                alt="ChronoTrust Experience Video"
                fill
                className="object-cover opacity-80 group-hover:opacity-90 group-hover:scale-105 transition-all duration-700 ease-[0.16,1,0.3,1]"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/90 backdrop-blur-sm flex items-center justify-center pl-1 group-hover:scale-110 transition-transform duration-500 shadow-lg group-hover:bg-white rounded-full">
                  <PlayCircle className="w-8 h-8 text-primary" strokeWidth={1.5} />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Content */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col justify-start h-full py-2"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-primary mb-5 tracking-wide">
              Why Shop With Us?
            </h2>
            
            <p className="text-slate-600 font-light leading-relaxed text-sm md:text-base mb-6 max-w-xl">
              At ChronoTrust, we are your trusted partner in luxury horology. Every piece is meticulously authenticated, fully insured, and backed by our guarantee.
            </p>

            <div className="flex flex-col gap-3 mb-8">
              {bullets.map((bullet, index) => {
                const Icon = bullet.icon;
                return (
                  <div key={index} className="flex items-center gap-3 bg-white border border-slate-200 rounded-lg p-3 shadow-xs">
                    <div className="w-8 h-8 rounded-full bg-primary/5 flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4 text-primary" strokeWidth={2} />
                    </div>
                    <span className="text-sm font-medium text-slate-800">{bullet.text}</span>
                  </div>
                );
              })}
            </div>

            <div className="mt-auto">
              <Button variant="primary" href="#listings" className="rounded-full px-8 py-3 text-sm uppercase tracking-widest font-bold">
                Get Your Watch
              </Button>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
