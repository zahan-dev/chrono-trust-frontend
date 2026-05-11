'use client';

import { Watch, ArrowRight, Wallet, RefreshCw, BadgeCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '../ui/Button';
import Link from 'next/link';

export const ServicesSection = () => {
  const services = [
    {
      icon: Watch,
      title: 'Acquire',
      description: 'Discover rare, unworn, and highly sought-after luxury timepieces sourced from our global network of trusted collectors. Each piece is carefully verified for authenticity and quality.',
      link: '/services/buy'
    },
    {
      icon: Wallet,
      title: 'Sell',
      description: 'Receive an immediate, competitive offer for your pre-owned luxury watch, with secure same-day bank transfers and hassle-free handling.',
      link: '/services/sell'
    },
    {
      icon: RefreshCw,
      title: 'Trade',
      description: 'Upgrade your collection by trading in your current watch for any timepiece in our exclusive inventory, ensuring value and authenticity.',
      link: '/services/trade'
    },
    {
      icon: BadgeCheck,
      title: 'Valuation',
      description: 'Get a complimentary, data-driven market appraisal from our certified horological experts to understand the true value of your timepiece.',
      link: '/contact'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const } },
  };

  return (
    <section className="py-18 bg-[#fafafa] relative overflow-hidden border-t border-slate-100" id="services">
      {/* Subtle Premium Texture */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.02]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' }}></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        
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
                Our Services
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-medium text-primary leading-[1.1] tracking-tight">
              Comprehensive <br className="hidden sm:block" /> Horological Solutions
            </h2>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="shrink-0"
          >
            <Button 
              variant="secondary" 
              href="/contact" 
              className="gap-3"
            >
              Book a Consultation <ArrowRight className="w-4 h-4" />
            </Button>
          </motion.div>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
        >
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div 
                key={index}
                variants={itemVariants}
                className="group relative bg-white p-8 lg:p-10 rounded-2xl border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_10px_40px_rgba(30,58,95,0.06)] hover:-translate-y-1 transition-all duration-500 flex flex-col h-full overflow-hidden cursor-pointer"
                onClick={() => { window.location.href = service.link; }}
              >
                {/* Top highlight bar */}
                <div className="absolute top-0 left-0 w-full h-1 bg-silver/20 group-hover:bg-primary transition-colors duration-500" />
                
                <div className="shrink-0 w-14 h-14 mb-8 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-primary transition-colors duration-500 border border-slate-100 group-hover:border-primary">
                  <Icon className="w-6 h-6 text-primary group-hover:text-white transition-colors duration-500" strokeWidth={1.5} />
                </div>
                
                <h3 className="text-2xl font-serif font-medium text-primary mb-4 group-hover:text-primary/80 transition-colors duration-300">
                  {service.title}
                </h3>
                
                <p className="text-slate-500 font-light leading-relaxed mb-8 grow">
                  {service.description}
                </p>
                <Link href={service.link} className="mt-auto flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-silver group-hover:text-primary transition-colors duration-300">
                  Learn More 
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
};
