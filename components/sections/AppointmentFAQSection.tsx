"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Send } from "lucide-react";
import { Button } from "../ui/Button";

export const AppointmentFAQSection = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'buy',
    message: ''
  });

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
    <section className="py-16 lg:py-24 bg-[#FAFAFA] border-b border-slate-200 relative overflow-hidden" id="faq-contact">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        
        <div className="grid lg:grid-cols-12 gap-16 lg:gap-12 items-start">
          
          {/* Left Side: FAQs */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7"
          >
            <div className="mb-10">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-primary mb-4 tracking-wide uppercase">
                FREQUENTLY ASKED QUESTIONS
              </h2>
              <p className="text-slate-600 font-light text-base md:text-lg leading-relaxed max-w-2xl">
                We want you to feel completely comfortable buying, selling, or trading in your timepiece online. Please, take a moment to read the common questions we get below so you can get comfortable with how we do things here at ChronoTrust.
              </p>
            </div>

            <div className="space-y-0">
              {faqs.map((faq, index) => {
                const isOpen = openFaq === index;
                return (
                  <div 
                    key={index}
                    className={`border-b transition-colors duration-500 ${isOpen ? 'border-primary/20' : 'border-slate-200 hover:border-slate-300'}`}
                  >
                    <button
                      className="w-full py-6 md:py-8 text-left flex items-center justify-between focus:outline-none group gap-6"
                      onClick={() => setOpenFaq(isOpen ? null : index)}
                    >
                      <div className="flex gap-4 sm:gap-6 items-center">
                        <span className={`font-serif text-lg sm:text-xl font-medium pr-4 leading-tight transition-colors duration-500 ${isOpen ? 'text-primary' : 'text-slate-800 group-hover:text-primary'}`}>
                          {index + 1}. {faq.question}
                        </span>
                      </div>
                      <div className={`shrink-0 w-8 h-8 flex items-center justify-center font-light text-2xl transition-colors duration-500 ${isOpen ? 'text-primary' : 'text-slate-400 group-hover:text-primary'}`}>
                        {isOpen ? '-' : '+'}
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
                          <div className="pr-8 sm:pr-16 pb-8 text-slate-500 font-light leading-relaxed text-base">
                            {faq.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Right Side: Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 h-full"
          >
            <div className="bg-white rounded-2xl p-8 sm:p-10 relative overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.06)] h-full flex flex-col border border-slate-100">
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-primary mb-8 text-center uppercase tracking-wide">
                GET IN TOUCH
              </h3>
              
              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <input 
                  type="text" 
                  placeholder="Name" 
                  className="w-full bg-slate-50 border border-slate-200 rounded-md px-4 py-3 text-slate-800 text-sm placeholder:text-slate-400 focus:outline-none focus:border-primary/40 focus:ring-1 focus:ring-primary/40 transition-all"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                />
                <input 
                  type="tel" 
                  placeholder="Phone Number" 
                  className="w-full bg-slate-50 border border-slate-200 rounded-md px-4 py-3 text-slate-800 text-sm placeholder:text-slate-400 focus:outline-none focus:border-primary/40 focus:ring-1 focus:ring-primary/40 transition-all"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  required
                />
                <input 
                  type="email" 
                  placeholder="Email" 
                  className="w-full bg-slate-50 border border-slate-200 rounded-md px-4 py-3 text-slate-800 text-sm placeholder:text-slate-400 focus:outline-none focus:border-primary/40 focus:ring-1 focus:ring-primary/40 transition-all"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  required
                />
                <select 
                  className="w-full bg-slate-50 border border-slate-200 rounded-md px-4 py-3 text-slate-800 text-sm focus:outline-none focus:border-primary/40 focus:ring-1 focus:ring-primary/40 transition-all appearance-none cursor-pointer"
                  value={formData.service}
                  onChange={(e) => setFormData({...formData, service: e.target.value})}
                >
                  <option value="buy">I&apos;m Interested In...</option>
                  <option value="sell">I want to Sell</option>
                  <option value="trade">I want to Trade</option>
                </select>
                <textarea 
                  placeholder="Message" 
                  rows={4}
                  className="w-full bg-slate-50 border border-slate-200 rounded-md px-4 py-3 text-slate-800 text-sm placeholder:text-slate-400 focus:outline-none focus:border-primary/40 focus:ring-1 focus:ring-primary/40 transition-all resize-none"
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                />
                
                <div className="mt-6 mb-6">
                  <p className="text-slate-700 font-bold text-xs mb-2">Notice of Consent <span className="text-red-500">*</span></p>
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input type="checkbox" required className="mt-1 border-slate-300 rounded-sm text-primary focus:ring-primary" />
                    <span className="text-slate-500 text-[10px] sm:text-xs leading-tight">
                      By checking this box, I agree to opt into receiving SMS text messages from ChronoTrust. Message and data rates may apply. Opt Out can be obtained by replying STOP.<br /><br />
                      <a href="#" className="text-primary hover:underline">Terms & Conditions</a> | <a href="#" className="text-primary hover:underline">Privacy Policy</a>
                    </span>
                  </label>
                </div>
                
                <Button 
                  variant="primary"
                  type="submit"
                  className="w-full flex items-center justify-center py-4 rounded-full bg-primary hover:bg-primary/90 text-white font-bold uppercase tracking-widest text-sm shadow-md"
                >
                  Submit
                </Button>
              </form>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
