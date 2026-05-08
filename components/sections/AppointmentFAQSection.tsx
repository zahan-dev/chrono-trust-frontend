"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Send, CheckCircle, Loader2 } from "lucide-react";
import { Button } from "../ui/Button";
import { useCreateInquiry } from "@/hooks/useInquiries";

export const AppointmentFAQSection = () => {
  const createInquiry = useCreateInquiry();
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'buy',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createInquiry.mutateAsync({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: `Service Interest: ${formData.service}\n\n${formData.message}`,
      });
      setIsSubmitted(true);
      setFormData({ name: '', email: '', phone: '', message: '', service: 'buy' });
    } catch (error) {
      console.error("Failed to submit inquiry:", error);
    }
  };

  const faqs = [
    {
      question: 'Are all watches sold by ChronoTrust authentic?',
      answer: 'Yes. Every watch is carefully inspected and authenticated by our certified horological experts. You can trust that each timepiece is 100% genuine and of the highest quality.'
    },
    {
      question: 'How does ChronoTrust source its luxury watches?',
      answer: 'We acquire watches through a global network of trusted collectors and dealers, selecting only highly sought-after, pristine timepieces. Each watch is verified for authenticity and condition before listing.'
    },
    {
      question: 'Can I sell or trade my watch through ChronoTrust?',
      answer: 'Absolutely. ChronoTrust offers secure selling and trading options. Receive a competitive offer for your watch or trade it toward any timepiece in our exclusive inventory.'
    },
    {
      question: 'What payment methods are accepted?',
      answer: 'We primarily accept secure bank transfers for all transactions. Optional in-person payments are available at our private showroom. All transactions are fully insured and discreet.'
    },
    {
      question: 'How can I schedule a consultation or get assistance?',
      answer: 'You can book a personalized consultation or reach out via WhatsApp, email, or our contact form. Our team provides expert guidance for buying, selling, or trading watches with full transparency and discretion.'
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
                We want you to feel completely confident when buying, selling, or trading your luxury watches online. Here are the most common questions we receive to help you understand how ChronoTrust ensures authenticity, security, and a seamless experience.
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

              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-green-50 border border-green-100 rounded-2xl p-8 text-center flex flex-col items-center justify-center h-full min-h-[300px]"
                >
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="font-serif text-2xl text-primary mb-2">Message Sent!</h3>
                  <p className="text-slate-600 font-light mb-6">
                    Thank you for reaching out. We&apos;ll be in touch shortly.
                  </p>
                  <Button
                    onClick={() => setIsSubmitted(false)}
                    variant="outline"
                    className="rounded-full px-6"
                  >
                    Send Another Message
                  </Button>
                </motion.div>
              ) : (
                <form className="space-y-4" onSubmit={handleSubmit}>
                  <input
                    type="text"
                    placeholder="Name"
                    className="w-full bg-slate-50 border border-slate-200 rounded-md px-4 py-3 text-slate-800 text-sm placeholder:text-slate-400 focus:outline-none focus:border-primary/40 focus:ring-1 focus:ring-primary/40 transition-all"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    className="w-full bg-slate-50 border border-slate-200 rounded-md px-4 py-3 text-slate-800 text-sm placeholder:text-slate-400 focus:outline-none focus:border-primary/40 focus:ring-1 focus:ring-primary/40 transition-all"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    className="w-full bg-slate-50 border border-slate-200 rounded-md px-4 py-3 text-slate-800 text-sm placeholder:text-slate-400 focus:outline-none focus:border-primary/40 focus:ring-1 focus:ring-primary/40 transition-all"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                  <select
                    className="w-full bg-slate-50 border border-slate-200 rounded-md px-4 py-3 text-slate-800 text-sm focus:outline-none focus:border-primary/40 focus:ring-1 focus:ring-primary/40 transition-all appearance-none cursor-pointer"
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
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
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />

                  <div className="mt-6 mb-6">
                    <p className="text-slate-700 font-bold text-xs mb-2">Notice of Consent <span className="text-red-500">*</span></p>
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input type="checkbox" required className="mt-1 border-slate-300 rounded-sm text-primary focus:ring-primary" />
                      <span className="text-slate-500 text-[10px] sm:text-xs leading-tight">
                        By checking this box, I agree to opt into receiving SMS text messages from ChronoTrust. Message and data rates may apply. Opt Out can be obtained by replying STOP.<br /><br />
                        <a href="/terms" className="text-primary hover:underline">Terms & Conditions</a> | <a href="/privacy-policy" className="text-primary hover:underline">Privacy Policy</a>
                      </span>
                    </label>
                  </div>

                  <Button
                    variant="primary"
                    type="submit"
                    disabled={createInquiry.isPending}
                    className="w-full flex items-center justify-center gap-2 py-4 rounded-full bg-primary hover:bg-primary/90 text-white font-bold uppercase tracking-widest text-sm shadow-md disabled:opacity-70"
                  >
                    {createInquiry.isPending ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        Submit
                      </>
                    )}
                  </Button>
                </form>
              )}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
