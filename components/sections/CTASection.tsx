'use client';

import { Button } from '../ui/Button';
import { Phone, Calendar } from 'lucide-react';
import Image from 'next/image';
import { motion } from 'framer-motion';

export const CTASection = () => {
  return (
    <section className="relative py-24 lg:py-32 overflow-hidden bg-primary" id="cta">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="https://images.unsplash.com/photo-1547996160-81dfa63595aa?auto=format&fit=crop&w=2000&q=80"
          alt="Luxury Watch Movement"
          fill
          className="object-cover opacity-20 mix-blend-luminosity"
        />
        <div className="absolute inset-0 bg-linear-to-r from-primary via-primary/95 to-primary/80" />
      </div>

      {/* Subtle Premium Texture */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-30 mix-blend-overlay" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' }}></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8">
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:w-1/2 text-center lg:text-left"
          >
            <div className="inline-flex items-center gap-3 mb-6 justify-center lg:justify-start">
              <div className="h-px w-8 bg-silver"></div>
              <span className="text-white/60 font-medium text-[10px] sm:text-xs tracking-[0.3em] uppercase">
                Your Next Timepiece Awaits
              </span>
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-medium text-white leading-[1.1] tracking-tight mb-6">
              Ready to Upgrade <br className="hidden sm:block" /> Your Collection?
            </h2>
            
            <p className="text-lg text-white/70 max-w-lg mx-auto lg:mx-0 font-light leading-relaxed mb-8">
              Connect with our master horologists for a private consultation, precise valuation, or to request a specific model.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:w-auto shrink-0 flex flex-col sm:flex-row gap-4"
          >
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center lg:justify-start">
              <Button 
                variant="primary" 
                size="lg" 
                href="tel:+17328329938"
                className="w-full sm:w-auto bg-white text-primary hover:bg-silver hover:text-white"
              >
                <Phone className="w-4 h-4 mr-2" />
                Call Now
              </Button>
              
              <Button 
                variant="outline" 
                href="#contact"
                className="w-full sm:w-auto"
              >
                <Calendar className="w-4 h-4 mr-2" />
                Book Consultation
              </Button>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
