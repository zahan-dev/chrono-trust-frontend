"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Calendar, Clock, MapPin, ArrowRight } from "lucide-react";
import { Button } from "../ui/Button";

export const AppointmentFAQSection = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      question: 'Do you offer authenticity guarantees?',
      answer: 'Yes, every timepiece is rigorously inspected by our master watchmakers. We provide a lifetime authenticity guarantee and a 1-year mechanical warranty on all purchases.'
    },
    {
      question: 'How does the sourcing process work?',
      answer: 'If you are looking for a specific reference, our global network of collectors and dealers allows us to source rare pieces. We require a small deposit to begin the dedicated search.'
    },
    {
      question: 'Do you accept trade-ins?',
      answer: 'Absolutely. We offer highly competitive trade-in values. Our experts will evaluate your current timepiece and apply its value towards your next purchase.'
    },
    {
      question: 'What payment methods are accepted?',
      answer: 'We accept wire transfers, certified bank checks, and major credit cards. For international clients, we also support multi-currency wires via secure banking channels.'
    }
  ];

  return (
    <section className="py-24 lg:py-32 bg-[#FAFAFA] relative overflow-hidden" id="faq">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        
        <div className="grid lg:grid-cols-12 gap-16 lg:gap-12 items-stretch">
          
          {/* Left Side: Booking Card */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 h-full"
          >
            <div className="bg-primary rounded-2xl p-8 sm:p-12 relative overflow-hidden shadow-2xl h-full flex flex-col justify-between">
              {/* Card Background Effects */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-silver/10 rounded-full blur-[80px] pointer-events-none -translate-y-1/2 translate-x-1/2" />
              
              <div className="relative z-10">
                <div className="inline-flex items-center gap-3 mb-6">
                  <div className="h-px w-8 bg-silver"></div>
                  <span className="text-silver font-medium text-xs tracking-[0.3em] uppercase">
                    Private Viewing
                  </span>
                </div>
                
                <h3 className="text-3xl sm:text-4xl font-serif font-medium text-white mb-8 leading-[1.1]">
                  Book a Private <br /> Consultation
                </h3>
                
                <div className="space-y-6 mb-10">
                  <div className="flex items-center gap-4 text-white/70">
                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                      <MapPin className="w-4 h-4 text-silver" />
                    </div>
                    <span className="font-light">Premium Showroom, New York, NY</span>
                  </div>
                  <div className="flex items-center gap-4 text-white/70">
                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                      <Clock className="w-4 h-4 text-silver" />
                    </div>
                    <span className="font-light">Mon - Sat, 10:00 AM - 6:00 PM</span>
                  </div>
                </div>

                <Button 
                  variant="secondary" 
                  href="#contact"
                  className="w-full mt-4"
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  Schedule Appointment
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Right Side: FAQs */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 lg:pl-12"
          >
            <div className="mb-12">
              <h2 className="text-4xl font-serif font-medium text-primary mb-4 tracking-tight">
                Frequently Asked
              </h2>
              <p className="text-slate-500 font-light text-lg">
                Everything you need to know about our services and process.
              </p>
            </div>

            <div className="space-y-0">
              {faqs.map((faq, index) => {
                const isOpen = openFaq === index;
                return (
                  <div 
                    key={index}
                    className={`border-b transition-colors duration-500 ${isOpen ? 'border-primary/30' : 'border-slate-200 hover:border-primary/20'}`}
                  >
                    <button
                      className="w-full py-8 text-left flex items-start justify-between focus:outline-none group gap-6"
                      onClick={() => setOpenFaq(isOpen ? null : index)}
                    >
                      <div className="flex gap-6 sm:gap-10 items-start">
                        <span className="font-mono text-sm tracking-[0.2em] text-silver/80 pt-1.5 hidden sm:block">
                          0{index + 1}
                        </span>
                        <span className={`font-serif text-xl sm:text-2xl lg:text-3xl font-medium pr-4 leading-tight transition-colors duration-500 ${isOpen ? 'text-primary' : 'text-slate-800 group-hover:text-primary'}`}>
                          {faq.question}
                        </span>
                      </div>
                      <div className={`shrink-0 w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-700 ease-[0.16,1,0.3,1] ${isOpen ? 'border-primary bg-primary text-white scale-110 shadow-lg shadow-primary/20' : 'border-slate-200 bg-transparent text-slate-400 group-hover:border-primary/30 group-hover:text-primary group-hover:bg-slate-50'}`}>
                        <ChevronDown className={`w-5 h-5 transition-transform duration-700 ease-[0.16,1,0.3,1] ${isOpen ? 'rotate-180' : ''}`} />
                      </div>
                    </button>
                    
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        >
                          <div className="sm:pl-18 pr-8 sm:pr-16 pb-10 text-slate-500 font-light leading-relaxed text-lg lg:text-xl">
                            {faq.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
            
            <div className="mt-10 pt-8 border-t border-slate-200 flex items-center justify-between">
              <span className="text-slate-500 font-light">Have more questions?</span>
              <a href="#contact" className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-primary hover:text-silver transition-colors duration-300 group">
                Contact Us 
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
            
          </motion.div>

        </div>
      </div>
    </section>
  );
};
