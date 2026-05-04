'use client';

import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

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
];

export const ContactTestimonialsSection = () => {
  return (
    <section className="py-16 bg-white border-b border-slate-200 relative overflow-hidden" id="testimonials">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16 lg:mb-24"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-px w-8 bg-primary"></div>
            <span className="text-silver font-medium text-xs tracking-[0.3em] uppercase">
              Client Stories
            </span>
            <div className="h-px w-8 bg-primary"></div>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-medium text-primary leading-[1.1] tracking-tight">
            Trusted by Collectors<br className="hidden sm:block" /> Worldwide
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {testimonials.map((testimonial, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="bg-[#FAFAFA] rounded-2xl p-8 lg:p-10 border border-slate-100 hover:shadow-[0_20px_60px_rgba(0,0,0,0.03)] hover:-translate-y-1 transition-all duration-500 group flex flex-col h-full"
            >
              <div className="flex gap-1.5 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-primary fill-primary" />
                ))}
              </div>
              
              <p className="text-slate-600 font-light leading-relaxed text-lg mb-10 flex-grow">
                &quot;{testimonial.review}&quot;
              </p>
              
              <div className="flex items-center gap-4 mt-auto pt-6 border-t border-slate-200">
                <div className="w-12 h-12 rounded-full bg-white border border-slate-200 flex items-center justify-center text-primary font-serif font-bold text-lg shadow-sm group-hover:bg-primary group-hover:text-white transition-colors duration-500">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <p className="text-slate-800 font-medium tracking-wide text-sm mb-0.5">{testimonial.name}</p>
                  <p className="text-silver text-[10px] uppercase tracking-widest font-semibold">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
