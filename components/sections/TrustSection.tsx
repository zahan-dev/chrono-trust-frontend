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
    <section className="py-12 lg:py-16 bg-[#FAFAFA] border-b border-slate-200 relative overflow-hidden -mt-8 md:-mt-12 z-30 rounded-t-[3rem] md:rounded-t-[4rem] shadow-[0_-20px_50px_rgba(0,0,0,0.1)]" id="trust">
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
                <div className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center group-hover:scale-110 transition-transform duration-500 drop-shadow-2xl">
                  <svg viewBox="0 0 24 24" className="w-16 h-16 text-white fill-white" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 5v14l11-7z" />
                  </svg>
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
            className="flex flex-col justify-center h-full py-4 lg:pl-4"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-primary mb-5 uppercase tracking-wide">
              Why Shop With Us?
            </h2>
            
            <p className="text-slate-600 font-light leading-relaxed text-sm md:text-base mb-8 max-w-xl">
              At ChronoTrust, we&apos;re more than a marketplace. We&apos;re your partner in discovering, buying, selling, and trading authentic pre-owned luxury watches from Rolex, Patek Philippe, Audemars Piguet, Omega, Cartier, Hublot, IWC, Tudor, Breitling, Panerai, and more. Rest assured every piece is carefully inspected for authenticity, quality, shipped fully insured, and backed by our guarantee.
            </p>

            <div className="flex flex-col gap-4 mb-10">
              {bullets.map((bullet, index) => {
                const Icon = bullet.icon;
                return (
                  <div key={index} className="flex items-center gap-4">
                    <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center shrink-0">
                      <Icon className="w-3.5 h-3.5 text-white" strokeWidth={3} />
                    </div>
                    <span className="text-[15px] sm:text-base font-medium text-slate-800">{bullet.text}</span>
                  </div>
                );
              })}
            </div>

            <div>
              <Button variant="primary" href="#listings" className="rounded-full px-8 py-3.5 text-sm uppercase tracking-widest font-bold">
                Get Your Watch
              </Button>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
