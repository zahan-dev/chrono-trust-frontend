"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Checkbox } from "@/components/ui/Checkbox";
import { ImageUpload } from "@/components/ui/ImageUpload";
import { Tag, Camera, Search, DollarSign, FileCheck, Truck, MessageCircle, ArrowRight, ChevronRight, CheckCircle, Loader2 } from "lucide-react";
import { useCreateInquiry } from "@/hooks/useInquiries";

const steps = [
  {
    number: "01",
    title: "Submit Details",
    description: "Share detailed information and high-quality photos of your authenticated luxury watch through our secure online form or WhatsApp. This helps us provide an accurate valuation and fast response.",
    icon: Camera,
  },
  {
    number: "02",
    title: "Expert Evaluation",
    description: "Our certified watch specialists assess your timepiece for authenticity, condition, and current market value, ensuring you receive a fair and professional appraisal.",
    icon: Search,
  },
  {
    number: "03",
    title: "Receive Offer",
    description: "We present a competitive, data-driven offer based on market demand and fair value, connecting you with serious buyers worldwide.",
    icon: DollarSign,
  },
  {
    number: "04",
    title: "Secure Payment",
    description: "Once the offer is accepted, receive fast and secure payment via your preferred method, backed by our trusted transaction process.",
    icon: FileCheck,
  },
];

const benefits = [
  "Free, no-obligation professional valuation",
  "Competitive, market-driven pricing",
  "Access to our global network of serious buyers",
  "Secure and fully insured shipping",
  "Fast, reliable payment processing",
  "Hassle-free, expert-guided selling experience",
];

const faqs = [
  {
    question: "How can I get an accurate valuation for my luxury watch?",
    answer: "Submit your watch details via our secure form or WhatsApp, including high-quality photos, serial numbers, and any original papers. Our certified watch experts provide a free, no-obligation professional valuation within 24–48 hours.",
  },
  {
    question: "What information do I need to provide?",
    answer: "We require clear photos, serial numbers, original box & papers if available, and a detailed description of the watch’s condition. The more precise the details, the more accurate and fair the valuation.",
  },
  {
    question: "How quickly will I receive payment?",
    answer: "Once your watch is authenticated and the offer accepted, payment is processed via wire transfer, check, or your preferred method, typically within 24 hours for a fast and secure transaction.",
  },
  {
    question: "Do you buy watches without the original box or papers?",
    answer: "Yes, we purchase watches with or without the original box and papers. While full sets may command higher prices, we evaluate every piece individually to ensure fair value.",
  },
  {
    question: "Is the selling process safe and secure?",
    answer: "Absolutely. Every step is handled by certified watch specialists with insured shipping, secure payment processing, and transparency, ensuring your watch and funds are fully protected.",
  }
];

export default function SellPage() {
  const createInquiry = useCreateInquiry();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    watchBrand: '',
    watchModel: '',
    additionalNotes: '',
    hearAboutUs: '',
    transactionalConsent: false,
    marketingConsent: false,
  });
  const [images, setImages] = useState<string[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email';
    if (!formData.watchBrand.trim()) newErrors.watchBrand = 'Watch brand is required';
    if (!formData.watchModel.trim()) newErrors.watchModel = 'Watch model is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    try {
      const message = `CONSIGNMENT SUBMISSION\n\nSeller Info:\nName: ${formData.firstName} ${formData.lastName}\nPhone: ${formData.phone}\nEmail: ${formData.email}\n\nWatch Details:\nBrand: ${formData.watchBrand}\nModel/Reference: ${formData.watchModel}\n\nAdditional Notes:\n${formData.additionalNotes || 'N/A'}\n\nHow they heard about us: ${formData.hearAboutUs || 'N/A'}\n\nPhotos: ${images.length > 0 ? images.join(', ') : 'None'}\n\nConsents:\nTransactional: ${formData.transactionalConsent ? 'Yes' : 'No'}\nMarketing: ${formData.marketingConsent ? 'Yes' : 'No'}`;
      await createInquiry.mutateAsync({
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        phone: formData.phone,
        message,
      });
      setIsSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      alert('Failed to submit. Please try again.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  return (
    <>
      <main className="min-h-screen bg-[#FAFAFA]">
        {/* Hero Section */}
        <section className="relative bg-primary text-white py-38 overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <Image
              src="https://images.unsplash.com/photo-1612817159949-195b6eb9e31a?w=1920&q=80"
              alt="Luxury watch"
              fill
              className="object-cover"
            />
          </div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-3xl"
            >
              <div className="flex items-center gap-2 text-sm text-white/60 mb-4">
                <Link href="/services" className="hover:text-white transition-colors">
                  Services
                </Link>
                <ChevronRight className="w-4 h-4" />
                <span>Sell</span>
              </div>
              <h1 className="font-serif text-4xl md:text-5xl font-medium tracking-tight mb-6">
                Sell Your Luxury Timepiece with Confidence
              </h1>
              <p className="text-lg text-white/80 font-light leading-relaxed max-w-2xl mb-8">
                Maximize the value of your authenticated luxury watch with ChronoTrust. Our team connects you with serious buyers worldwide, provides accurate market valuations, and ensures a secure, seamless, and transparent transaction process from start to finish.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  href="https://wa.me/17328329938"
                  target="_blank"
                  variant="secondary"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Get Valuation
                </Button>
                <Button href="/contact" variant="primary">
                  Contact Us <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-16 bg-white border-b border-slate-100">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-14 h-14 bg-primary/5 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Tag className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-serif text-lg text-primary mb-2">Best Prices</h3>
                <p className="text-slate-600 font-light text-sm">
                  Competitive offers based on current market values
                </p>
              </div>
              <div className="text-center">
                <div className="w-14 h-14 bg-primary/5 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Truck className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-serif text-lg text-primary mb-2">Insured Shipping</h3>
                <p className="text-slate-600 font-light text-sm">
                  Fully insured shipping with white-glove handling
                </p>
              </div>
              <div className="text-center">
                <div className="w-14 h-14 bg-primary/5 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <DollarSign className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-serif text-lg text-primary mb-2">Fast Payment</h3>
                <p className="text-slate-600 font-light text-sm">
                  Quick payment processing within 24 hours
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Process Steps */}
        <section className="py-14 lg:py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <p className="text-[11px] tracking-[0.3em] uppercase text-silver mb-4">
                Simple Process
              </p>
              <h2 className="font-serif text-3xl md:text-4xl text-primary">
                How to Sell Your Luxury Watch
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {steps.map((step, index) => (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="relative"
                >
                  <div className="bg-white p-8 rounded-2xl border border-slate-100 h-full">
                    <span className="font-serif text-5xl text-slate-100 font-bold">
                      {step.number}
                    </span>
                    <div className="w-12 h-12 bg-primary/5 rounded-xl flex items-center justify-center mb-4 -mt-4">
                      <step.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-serif text-xl text-primary mb-3">{step.title}</h3>
                    <p className="text-slate-600 font-light text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-14 lg:py-20 bg-white border-y border-slate-100">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <p className="text-[11px] tracking-[0.3em] uppercase text-silver mb-4">
                  Why Choose Us
                </p>
                <h2 className="font-serif text-3xl md:text-4xl text-primary mb-6">
                  The Smart Way to Sell Your Luxury Watch
                </h2>
                <p className="text-slate-600 font-light leading-relaxed mb-8">
                  With decades of experience and a global network of collectors, ChronoTrust ensures you receive the best value for your authenticated luxury watch with minimal effort, maximum security, and complete peace of mind. Every step of the selling process is handled by certified watch experts to make your experience seamless and rewarding.
                </p>

                <ul className="space-y-4">
                  {benefits.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                      <span className="text-slate-600">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                  <Image
                    src="/Patek Philippe 1.webp"
                    alt="Watch evaluation"
                    fill
                    className="object-cover"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Sell Form */}
        <section className="py-14 lg:py-20 bg-white border-y border-slate-100">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
              <div className="text-center mb-12">
                <p className="text-[11px] tracking-[0.3em] uppercase text-silver mb-4">Submit Your Watch</p>
                <h2 className="font-serif text-3xl md:text-4xl text-primary mb-4">Consignment Submission Form</h2>
                <p className="text-slate-600 font-light max-w-2xl mx-auto">Fill out the form below and our team will contact you via email about your watch within 24 hours.</p>
              </div>
              {isSubmitted ? (
                <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"><CheckCircle className="w-8 h-8 text-green-600" /></div>
                  <h3 className="font-serif text-2xl text-primary mb-2">Submission Received!</h3>
                  <p className="text-slate-600 mb-6">We will contact you via email within 24 hours to discuss your watch.</p>
                  <Button onClick={() => setIsSubmitted(false)} variant="primary">Submit Another Watch</Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-slate-100 p-8 lg:p-10 shadow-sm">
                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <Input label="First Name" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="John" required error={errors.firstName} />
                    <Input label="Last Name" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Doe" required error={errors.lastName} />
                  </div>
                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <Input label="Phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} placeholder="+1 (555) 000-0000" required error={errors.phone} />
                    <Input label="Email" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="john@example.com" required error={errors.email} helperText="We will contact you via email about your watch" />
                  </div>
                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <Input label="Watch Brand" name="watchBrand" value={formData.watchBrand} onChange={handleChange} placeholder="Rolex, Omega, Panerai etc" required error={errors.watchBrand} />
                    <Input label="Watch Model / Reference" name="watchModel" value={formData.watchModel} onChange={handleChange} placeholder="Include model name/reference number" required error={errors.watchModel} />
                  </div>
                  <div className="mb-6"><ImageUpload label="File Upload" maxImages={12} onImagesChange={setImages} /></div>
                  <div className="mb-6"><Textarea label="Additional Notes" name="additionalNotes" value={formData.additionalNotes} onChange={handleChange} placeholder="Any additional information about your watch..." rows={4} /></div>
                  <div className="mb-6"><Input label="How did you hear about us?" name="hearAboutUs" value={formData.hearAboutUs} onChange={handleChange} placeholder="Google, Instagram, Friend/Family etc" /></div>
                  <div className="mb-4"><Checkbox label="I consent to receiving transactional messages from ChronoTrust." name="transactionalConsent" checked={formData.transactionalConsent} onChange={handleChange} /></div>
                  <div className="mb-8"><Checkbox label="I consent to receiving marketing and promotional messages from ChronoTrust." name="marketingConsent" checked={formData.marketingConsent} onChange={handleChange} /></div>
                  <Button type="submit" variant="primary" disabled={createInquiry.isPending} className="w-full py-4 text-base">
                    {createInquiry.isPending ? <><Loader2 className="w-5 h-5 mr-2 animate-spin" />Submitting...</> : 'Submit Consignment'}
                  </Button>
                </form>
              )}
            </motion.div>
          </div>
        </section>
        
        {/* FAQs */}
        <section className="py-16 lg:py-20 bg-[#FAFAFA]">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <div className="mb-10">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-4 tracking-wide uppercase">
                FREQUENTLY ASKED QUESTIONS
              </h2>
              <p className="text-slate-600 font-light text-base md:text-lg leading-relaxed max-w-2xl">
                Get answers to common questions about selling your luxury watch with ChronoTrust.
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
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="relative py-16 lg:py-24 bg-gradient-to-br from-[#2d5b8f] via-[#1e3a5f] to-[#152a47] text-white overflow-hidden">
          {/* Elegant top separator */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
          
          {/* Subtle pattern overlay */}
          <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
          
          {/* Glow effects */}
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-300/10 rounded-full blur-3xl"></div>
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <p className="text-[11px] tracking-[0.3em] uppercase text-blue-200 mb-4 font-semibold">Get Expert Assistance</p>
                <h2 className="font-serif text-4xl md:text-5xl mb-6 leading-tight">Questions About Selling?</h2>
                <p className="text-white/80 font-light leading-relaxed text-lg">Our team is ready to help you achieve the best price for your timepiece. Get a professional valuation and personalized guidance.</p>
              </div>
              <div className="flex flex-col sm:flex-row items-center justify-end gap-4">
                <Button href="https://wa.me/17328329938" target="_blank" variant="secondary" className="shadow-xl shadow-black/20">
                  <MessageCircle className="w-4 h-4 mr-2" />WhatsApp Valuation
                </Button>
                <Button href="/contact" variant="primary" className="shadow-xl shadow-black/20">
                  Contact Us
                </Button>
              </div>
            </div>
          </div>
          
          {/* Bottom elegant separator */}
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
        </section>
      </main>
    </>
  );
}
