'use client';

import { Button } from '../ui/Button';
import { motion } from 'framer-motion';
import { ShieldCheck, Star } from 'lucide-react';

export const HeroSection = () => {
  const whatsappNumber = '+17328329938';
  const whatsappShopUrl = `https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent('Hi, I am interested in buying a watch')}`;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] as const } },
  };

  return (
    <section className="relative flex flex-col items-center justify-center min-h-[75vh] max-h-[80vh] md:min-h-screen pt-20 md:pt-32 pb-10 md:pb-16 overflow-hidden bg-[#1e3a5f]">
      
      {/* REAL WORKING BACKGROUND VIDEO */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden pointer-events-none">
        <motion.div
          initial={{ scale: 1.05 }}
          animate={{ scale: 1 }}
          transition={{ duration: 10, ease: "easeOut" }}
          className="w-full h-full"
        >
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-60 brightness-110 contrast-125 mix-blend-luminosity"
          >
            <source src="/watches.mp4" type="video/mp4" />
          </video>
        </motion.div>

        {/* Premium Cinematic Gradients - Centered */}
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#1e3a5f]/80 to-[#1e3a5f] z-10" />
        <div className="absolute inset-0 bg-linear-to-t from-[#1e3a5f] via-[#1e3a5f]/40 to-[#1e3a5f]/80 z-10" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-20 flex flex-col justify-center items-center text-center max-w-5xl h-full">
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-6 md:space-y-8 mt-8 md:mt-16 w-full"
        >
          {/* Trust Stars */}
          <motion.div variants={itemVariants} className="flex flex-col items-center gap-2 md:gap-3">
            <div className="flex gap-1.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 md:w-5 md:h-5 text-[#a8b5c4] fill-[#a8b5c4] drop-shadow-[0_0_12px_rgba(168,181,196,0.6)]" />
              ))}
            </div>
            <span className="text-[#a8b5c4] font-serif italic text-xs md:text-sm tracking-[0.15em] uppercase">
              5-Star Trusted Service
            </span>
          </motion.div>

          {/* Top Badge */}
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 md:gap-3 px-4 md:px-6 py-2 md:py-2.5 rounded-full border border-[#a8b5c4]/30 bg-white/5 backdrop-blur-md shadow-2xl">
            <ShieldCheck className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#a8b5c4]" />
            <span className="text-white font-semibold text-[9px] sm:text-xs tracking-[0.2em] md:tracking-[0.25em] uppercase">
              Trusted by Collectors Worldwide
            </span>
          </motion.div>
          
          {/* Main Heading */}
          <motion.div variants={itemVariants} className="space-y-4 md:space-y-6">
            <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-[5.5rem] font-serif font-medium leading-[1.15] md:leading-[1.1] text-white tracking-tight drop-shadow-2xl px-2">
              Buy, Sell & Trade <br className="hidden md:block" />
              Luxury Watches <br className="hidden md:block" />
              With Confidence
            </h1>
          </motion.div>
          
          {/* Subheading Paragraph */}
          <motion.p variants={itemVariants} className="text-base sm:text-lg md:text-2xl text-[#a8b5c4] max-w-2xl mx-auto leading-relaxed font-light drop-shadow-lg px-4">
            Timeless Pieces. Trusted Transactions. Discover the ultimate destination for luxury horology.
          </motion.p>
          
          {/* CTA Buttons in a Premium Row */}
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 md:gap-4 pt-6 md:pt-10 w-full px-4 sm:px-0">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full sm:w-auto">
              <Button 
                variant="primary" 
                size="lg" 
                href={whatsappShopUrl}
                className="w-full"
              >
                Chat on WhatsApp
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full sm:w-auto">
              <Button 
                variant="outline" 
                href="#services"
                className="w-full text-white"
              >
                Explore Services
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full sm:w-auto">
              <Button 
                variant="outline" 
                href="#contact"
                className="w-full text-white"
              >
                Book Consultation
              </Button>
            </motion.div>
          </motion.div>

        </motion.div>
      </div>
      
      {/* Subtle Premium Texture Overlay */}
      <div className="absolute inset-0 z-10 pointer-events-none opacity-[0.05] mix-blend-overlay" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' }}></div>
    </section>
  );
};

