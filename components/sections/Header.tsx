'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Button } from '../ui/Button';
import { MessageCircle, ChevronDown, Phone, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const FacebookIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const TwitterIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const navLinks = [
    { name: 'Home', href: '#' },
    { name: 'About Us', href: '#about' },
    { name: 'Listings', href: '#listings' },
    { 
      name: 'Services', 
      href: '#services', 
      subItems: [
        { name: 'Buy Watches', href: '#services' },
        { name: 'Sell Watches', href: '#sell' },
        { name: 'Trade Watches', href: '#trade' }
      ] 
    },
    { name: 'Sell Watches', href: '#sell' },
    { name: 'Trade Watches', href: '#trade' },
    { name: 'Contact', href: '#contact' },
  ];

  const whatsappNumber = '+17328329938';
  const whatsappUrl = `https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent('Hi, I am interested in ChronoTrust luxury watches')}`;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-primary/95 backdrop-blur-xl py-3 border-b border-white/10 shadow-xl' 
          : 'bg-transparent py-6 border-b border-transparent'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-350">
        {/* Top Info Bar (Visible on larger screens) */}
        {!isScrolled && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
            className="hidden md:flex justify-between items-center pb-4 mb-4 border-b border-white/10 text-white/70 text-xs font-medium tracking-wider uppercase"
          >
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1 text-yellow-400">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <Star className="w-3.5 h-3.5 fill-current" />
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="font-semibold text-white">5.0</span>
                  <span className="text-white/60">Google Reviews</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <a href="tel:+17328329938" className="flex items-center gap-2 hover:text-white transition-colors">
                <Phone className="w-3.5 h-3.5" />
                +1 (732) 832-9938
              </a>
            </div>
          </motion.div>
        )}

        <div className="flex items-center justify-between relative">
          
          {/* Left: Hamburger Menu (Always visible) */}
          <div className="flex-1 flex items-center">
            <button 
              className="relative z-60 p-2 -ml-2 text-white/90 hover:text-white transition-colors group flex items-center gap-3"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <div className="w-6 h-5 relative flex flex-col justify-between">
                <span className={`w-full h-0.5 bg-current rounded-full transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-2.25' : ''}`} />
                <span className={`w-full h-0.5 bg-current rounded-full transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : 'opacity-100'}`} />
                <span className={`w-full h-0.5 bg-current rounded-full transition-all duration-300 origin-left ${mobileMenuOpen ? '-rotate-45 -translate-y-2.25 w-[calc(100%+4px)]' : 'w-4/5 group-hover:w-full'}`} />
              </div>
              <span className="text-xs font-medium uppercase tracking-[0.2em] hidden sm:block mt-0.5">Menu</span>
            </button>
          </div>

          {/* Center: Logo */}
          <motion.a 
            href="#" 
            className="absolute left-1/2 -translate-x-1/2 z-10 flex items-center justify-center -mt-2 md:-mt-3"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Image 
              src="/logo.png" 
              alt="ChronoTrust Logo" 
              width={400} 
              height={120}
              className={`w-auto object-contain brightness-0 invert transition-all duration-500 ${isScrolled ? 'h-12 md:h-14' : 'h-16 md:h-20'}`}
              priority
            />
          </motion.a>

          {/* Right: CTAs */}
          <div className="hidden lg:flex flex-1 items-center justify-end gap-3 sm:gap-4">
            <Button 
              variant="outline" 
              size="sm" 
              href="#sell" 
              className="border-silver/30 text-white hover:bg-silver hover:text-primary rounded-full text-xs tracking-wider uppercase px-5 py-2.5 transition-all shadow-none"
            >
              Sell Watch
            </Button>
            <Button 
              variant="primary" 
              size="sm" 
              href={whatsappUrl} 
              className="bg-primary hover:bg-primary/90 text-white rounded-full text-xs font-medium tracking-wider uppercase px-6 py-2.5 transition-all shadow-none flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              Chat on WhatsApp
            </Button>
          </div>

        </div>
      </div>

      {/* Fullscreen Overlay Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 bg-primary z-55 flex flex-col h-screen overflow-y-auto"
          >
            {/* Background Image/Texture for Menu */}
            <div className="absolute inset-0 opacity-10 pointer-events-none mix-blend-luminosity">
              <Image 
                src="https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=2000&q=80" 
                alt="Menu Background" 
                fill 
                className="object-cover grayscale"
              />
              <div className="absolute inset-0 bg-linear-to-r from-primary via-transparent to-primary" />
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 grow flex flex-col relative z-10">
              <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 h-full">
                
                {/* Main Links */}
                <div className="lg:col-span-7 flex flex-col justify-center pt-8">
                  <span className="text-silver text-xs font-medium tracking-[0.3em] uppercase mb-10 pl-2">Navigation</span>
                  <ul className="flex flex-col gap-2">
                    {navLinks.map((link, i) => (
                      <motion.li 
                        key={link.name} 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.08 + 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <div className="flex flex-col group/nav">
                          <div 
                            className="flex items-center justify-between hover:text-white transition-colors cursor-pointer py-3 lg:py-4 px-2 rounded-lg hover:bg-white/5"
                            onClick={() => {
                              if (link.subItems) {
                                setActiveDropdown(activeDropdown === link.name ? null : link.name);
                              } else {
                                setMobileMenuOpen(false);
                                window.location.href = link.href;
                              }
                            }}
                          >
                            <span className="text-3xl sm:text-4xl lg:text-5xl font-serif font-medium text-white/70 group-hover/nav:text-white transition-colors">{link.name}</span>
                            {link.subItems && (
                              <ChevronDown className={`w-8 h-8 opacity-50 transition-transform duration-500 ${activeDropdown === link.name ? 'rotate-180 text-blue-500 opacity-100' : ''}`} />
                            )}
                          </div>
                          {link.subItems && (
                            <AnimatePresence>
                              {activeDropdown === link.name && (
                                <motion.ul
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: 'auto', opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                                  className="flex flex-col gap-2 overflow-hidden bg-white/5 rounded-lg mb-4"
                                >
                                  {link.subItems.map((subItem) => (
                                    <li key={subItem.name}>
                                      <a
                                        href={subItem.href}
                                        className="block text-lg lg:text-xl font-serif text-white/60 hover:text-white hover:bg-white/10 transition-colors py-4 px-6 lg:px-8"
                                        onClick={() => setMobileMenuOpen(false)}
                                      >
                                        {subItem.name}
                                      </a>
                                    </li>
                                  ))}
                                </motion.ul>
                              )}
                            </AnimatePresence>
                          )}
                        </div>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {/* Right side contact info (Desktop and Mobile) */}
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  className="flex lg:col-span-5 flex-col justify-center border-t lg:border-t-0 lg:border-l border-white/10 pt-8 mt-4 lg:pt-0 lg:mt-0 lg:pl-12 pb-12 lg:pb-0"
                >
                  <div className="space-y-10 lg:space-y-12 max-w-sm">
                    <div className="hidden lg:block">
                      <h4 className="text-white/50 text-xs font-medium tracking-[0.2em] uppercase mb-4">Contact</h4>
                      <a href="mailto:info@chronotrust.io" className="block text-2xl font-serif text-white/90 hover:text-white mb-2 transition-colors">info@chronotrust.io</a>
                      <a href="tel:+17328329938" className="block text-2xl font-serif text-white/90 hover:text-white transition-colors">+1 (732) 832-9938</a>
                    </div>
                    
                    <div className="hidden lg:block">
                      <h4 className="text-white/50 text-xs font-medium tracking-[0.2em] uppercase mb-4">Location</h4>
                      <p className="text-lg font-serif text-white/80 leading-relaxed">
                        By Appointment Only<br />
                        Premium Showroom<br />
                        New York, NY
                      </p>
                    </div>

                    <div>
                      <h4 className="hidden lg:block text-white/50 text-xs font-medium tracking-[0.2em] uppercase mb-4">Connect</h4>
                      <div className="flex flex-col sm:flex-row items-center gap-4 mt-2 lg:mt-4">
                        <a href={`https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}`} className="w-full text-center px-8 py-4 bg-primary text-white rounded-full text-sm tracking-widest uppercase hover:bg-primary/90 transition-all flex items-center justify-center gap-2 border border-primary">
                          <MessageCircle className="w-4 h-4" /> Chat on WhatsApp
                        </a>
                        <a href="#contact" className="w-full text-center px-8 py-4 border border-silver/30 rounded-full text-silver text-sm tracking-widest uppercase hover:bg-silver hover:text-primary transition-all">
                          Book Consultation
                        </a>
                      </div>
                    </div>
                  </div>
                </motion.div>

              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};
