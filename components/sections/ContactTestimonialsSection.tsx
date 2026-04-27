'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Send, ArrowRight, ArrowLeft } from 'lucide-react';
import { Button } from '../ui/Button';

const testimonials = [
  {
    name: 'Michael R.',
    role: 'Watch Collector',
    review: 'The sourcing process was flawless. They found the exact Daytona I was looking for within weeks. Highly recommended for serious collectors.',
  },
  {
    name: 'James H.',
    role: 'First-time Buyer',
    review: 'Incredible experience from start to finish. The team took the time to explain the history of the watch and made me feel completely at ease.',
  },
  {
    name: 'David L.',
    role: 'Private Client',
    review: 'Traded in two pieces for a rare Patek. The valuation was extremely fair, and the transaction was secure and discreet.',
  },
  {
    name: 'Sarah M.',
    role: 'Enthusiast',
    review: 'Their attention to detail and knowledge of horology is unmatched. I won\'t go anywhere else for my luxury timepieces.',
  },
];

export const ContactTestimonialsSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'buy',
    message: ''
  });

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-24 lg:py-32 bg-primary border-t border-white/5 relative overflow-hidden" id="contact">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* LEFT: Premium Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="mb-10">
              <div className="inline-flex items-center gap-3 mb-6">
                <div className="h-px w-8 bg-silver"></div>
                <span className="text-white/60 font-medium text-xs tracking-[0.3em] uppercase">
                  Get In Touch
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-serif font-medium text-white mb-6 leading-[1.1] tracking-tight">
                Start Your Journey
              </h2>
              <p className="text-white/60 font-light text-base leading-relaxed max-w-md">
                Whether you&apos;re looking to acquire a rare piece, sell your watch, or seek expert valuation, our team is at your service.
              </p>
            </div>

            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <input 
                  type="text" 
                  placeholder="Full Name" 
                  className="w-full bg-white/5 border border-white/10 rounded-sm px-5 py-4 text-white text-sm placeholder:text-white/40 focus:outline-none focus:border-silver transition-colors"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                />
                <input 
                  type="email" 
                  placeholder="Email Address" 
                  className="w-full bg-white/5 border border-white/10 rounded-sm px-5 py-4 text-white text-sm placeholder:text-white/40 focus:outline-none focus:border-silver transition-colors"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  required
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <input 
                  type="tel" 
                  placeholder="Phone Number" 
                  className="w-full bg-white/5 border border-white/10 rounded-sm px-5 py-4 text-white text-sm placeholder:text-white/40 focus:outline-none focus:border-silver transition-colors"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  required
                />
                <select 
                  className="w-full bg-white/5 border border-white/10 rounded-sm px-5 py-4 text-white/40 text-sm focus:outline-none focus:border-silver transition-colors appearance-none cursor-pointer"
                  value={formData.service}
                  onChange={(e) => setFormData({...formData, service: e.target.value})}
                >
                  <option value="buy" className="bg-primary">I want to Buy</option>
                  <option value="sell" className="bg-primary">I want to Sell</option>
                  <option value="trade" className="bg-primary">I want to Trade</option>
                  <option value="sourcing" className="bg-primary">Watch Sourcing</option>
                </select>
              </div>
              <div>
                <textarea 
                  placeholder="Your Message / Details about the watch" 
                  rows={4}
                  className="w-full bg-white/5 border border-white/10 rounded-sm px-5 py-4 text-white text-sm placeholder:text-white/40 focus:outline-none focus:border-silver transition-colors resize-none"
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                />
              </div>
              
              <Button 
                variant="primary"
                type="submit"
                className="w-full flex items-center justify-center gap-3"
              >
                Send Message <Send className="w-4 h-4" />
              </Button>
            </form>
          </motion.div>

          {/* RIGHT: Testimonials Slider */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-serif text-white">Client Stories</h3>
              <div className="flex gap-2">
                <button onClick={handlePrev} className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:bg-white hover:text-primary hover:border-white transition-all">
                  <ArrowLeft className="w-4 h-4" />
                </button>
                <button onClick={handleNext} className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:bg-white hover:text-primary hover:border-white transition-all">
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="relative w-full min-h-87.5 sm:min-h-75">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 sm:p-10 shadow-2xl flex flex-col justify-between h-full"
                >
                  <div>
                    <div className="flex gap-1.5 mb-8">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-silver fill-silver drop-shadow-[0_0_8px_rgba(168,181,196,0.5)]" />
                      ))}
                    </div>
                    
                    <p className="text-xl md:text-2xl text-white/90 font-serif leading-relaxed mb-8 italic">
                      &quot;{testimonials[currentIndex].review}&quot;
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-4 mt-auto">
                    <div className="w-12 h-12 rounded-full bg-silver/20 border border-silver/30 flex items-center justify-center text-white font-serif font-medium text-lg">
                      {testimonials[currentIndex].name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-white font-medium tracking-wide">{testimonials[currentIndex].name}</p>
                      <p className="text-white/50 text-xs uppercase tracking-widest mt-1">{testimonials[currentIndex].role}</p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
