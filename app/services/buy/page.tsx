"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Checkbox } from "@/components/ui/Checkbox";
import { CheckCircle, Shield, Search, FileCheck, Truck, MessageCircle, ArrowRight, ChevronRight, Loader2 } from "lucide-react";
import { useCreateInquiry } from "@/hooks/useInquiries";

const steps = [
  {
    number: "01",
    title: "Browse Collection",
    description: "Explore our curated selection of authenticated luxury watches from the world’s finest makers. Every timepiece is verified for authenticity and condition, ensuring confidence in your choice.",
    icon: Search,
  },
  {
    number: "02",
    title: "Expert Consultation",
    description: "Schedule a private appointment with our certified watch specialists to view pieces in person or discuss details. Receive personalized guidance to find the perfect watch for your collection.",
    icon: MessageCircle,
  },
  {
    number: "03",
    title: "Authentication",
    description: "Each watch undergoes a rigorous inspection by our master watchmakers, ensuring every piece meets the highest standards of quality, accuracy, and authenticity.",
    icon: FileCheck,
  },
  {
    number: "04",
    title: "Secure Delivery",
    description: "Your timepiece is shipped fully insured and with white-glove service, ensuring safe, discreet, and timely delivery to your door.",
    icon: Truck,
  },
];

const guarantees = [
  "Lifetime authenticity guarantee",
  "1-year mechanical warranty",
  "7-day return policy",
  "Full insurance during shipping",
  "Original box and papers when available",
  "Complimentary first service",
];

const brands = [
  "Rolex",
  "Patek Philippe",
  "Audemars Piguet",
  "Omega",
  "Cartier",
  "Vacheron Constantin",
  "Richard Mille",
  "Jaeger-LeCoultre",
];

const faqs = [
  {
    question: "Are all luxury watches authenticated before sale?",
    answer: "Yes, every timepiece at ChronoTrust undergoes a detailed authentication and inspection process before being listed for sale. Our specialists verify the movement, serial numbers, condition, and originality to ensure buyers receive authentic pre-owned luxury watches with complete confidence.",
  },
  {
    question: "Is it safe to buy pre-owned luxury watches online?",
    answer: "Yes. We focus on secure transactions, verified authentication, insured shipping, and transparent communication throughout the buying process. Our goal is to provide a trusted and reliable experience for anyone purchasing pre-owned luxury watches online.",
  },
  {
    question: "Can you help me find a specific luxury watch model?",
    answer: "Absolutely. Our sourcing team helps clients locate rare and highly sought-after luxury timepieces through our trusted watch network. Whether you are searching for Rolex, Audemars Piguet, Patek Philippe, or used Panerai watches, we can assist you in finding the right model.",
  },
  {
    question: "Why should I buy a pre-owned luxury watch instead of a new one?",
    answer: "Pre-owned luxury watches often offer better value, greater model availability, and access to discontinued collections that are difficult to purchase at retail stores. Many collectors prefer the pre-owned luxury watch market because it provides opportunities to own premium timepieces at competitive prices.",
  },
];

export default function BuyPage() {
  const createInquiry = useCreateInquiry();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    referenceNumber: '',
    brand: '',
    model: '',
    budget: '',
    timeframe: '',
    additionalDetails: '',
    smsConsent: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.referenceNumber.trim()) newErrors.referenceNumber = 'Reference number is required';
    if (!formData.brand.trim()) newErrors.brand = 'Brand is required';
    if (!formData.model.trim()) newErrors.model = 'Model is required';
    if (!formData.budget.trim()) newErrors.budget = 'Budget is required';
    if (!formData.timeframe.trim()) newErrors.timeframe = 'Timeframe is required';
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
      const message = `ACQUISITION REQUEST\n\nWatch Details:\nReference: ${formData.referenceNumber}\nBrand: ${formData.brand}\nModel: ${formData.model}\nBudget: $${formData.budget} USD\nTimeframe: ${formData.timeframe}\n\nAdditional Details:\n${formData.additionalDetails || 'N/A'}\n\nSMS Consent: ${formData.smsConsent ? 'Yes' : 'No'}`;
      await createInquiry.mutateAsync({
        name: formData.fullName,
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
              src="https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=1920&q=80"
              alt="Luxury watches"
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
                <span>Buy</span>
              </div>
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight mb-6">
                Acquire Your Perfect Luxury Timepiece
              </h1>
              <p className="text-lg text-white/80 font-light leading-relaxed max-w-2xl mb-8">
                Discover authenticated luxury watches from the world’s most prestigious brands. Every timepiece in our collection is carefully verified for authenticity, quality, and provenance, giving you confidence in every purchase. Whether you’re a seasoned collector or first-time buyer, ChronoTrust ensures a seamless and expert-led buying experience.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button href="/collection" variant="secondary">
                  Browse Collection <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
                <Button
                  href="https://wa.me/17328329938"
                  target="_blank"
                  variant="primary"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Speak to an Expert
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Process Steps */}
        <section className="py-14 lg:py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <p className="text-[11px] tracking-[0.3em] uppercase text-silver mb-4">
                How It Works
              </p>
              <h2 className="font-serif text-3xl md:text-4xl text-primary">
                Your Journey to Ownership
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

        {/* Guarantees Section */}
        <section className="py-20 bg-white border-y border-slate-100">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <div className="relative aspect-square rounded-2xl overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1612817159949-195b6eb9e31a?w=800&q=80"
                    alt="Watch authentication"
                    fill
                    className="object-cover"
                  />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <div className="w-16 h-16 bg-primary/5 rounded-2xl flex items-center justify-center mb-6">
                  <Shield className="w-8 h-8 text-primary" />
                </div>
                <p className="text-[11px] tracking-[0.3em] uppercase text-silver mb-4">
                  Our Promise
                </p>
                <h2 className="font-serif text-3xl md:text-4xl text-primary mb-6">
                  The ChronoTrust Guarantee
                </h2>
                <p className="text-slate-600 font-light leading-relaxed mb-8">
                  Every timepiece you acquire from ChronoTrust comes with our comprehensive guarantee, ensuring your purchase is secure, authenticated, and backed by exceptional care and expertise. Enjoy complete peace of mind and protection for your investment.
                </p>

                <ul className="space-y-4">
                  {guarantees.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                      <span className="text-slate-600">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Brands Section */}
        <section className="py-14 lg:py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <p className="text-[11px] tracking-[0.3em] uppercase text-silver mb-4">
                Our Brands
              </p>
              <h2 className="font-serif text-3xl md:text-4xl text-primary">
                Prestigious Makers You Can Trust
              </h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {brands.map((brand, index) => (
                <motion.div
                  key={brand}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="bg-white p-6 rounded-xl border border-slate-100 text-center hover:border-primary/20 transition-colors"
                >
                  <p className="font-serif text-lg text-primary">{brand}</p>
                </motion.div>
              ))}
            </div>

            <div className="text-center mt-8">
              <p className="text-slate-500 text-sm">
                And a wide selection of additional prestigious makers to complement every collection.
              </p>
            </div>
          </div>
        </section>

        {/* Acquisition Form */}
        <section className="py-14 lg:py-20 bg-white border-y border-slate-100">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
              <div className="text-center mb-12">
                <p className="text-[11px] tracking-[0.3em] uppercase text-silver mb-4">Request Acquisition</p>
                <h2 className="font-serif text-3xl md:text-4xl text-primary mb-4">Acquisition Services</h2>
                <p className="text-slate-600 font-light max-w-2xl mx-auto">Let us help you find your perfect timepiece. Fill out the form and our experts will contact you within 24 hours.</p>
              </div>
              {isSubmitted ? (
                <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"><CheckCircle className="w-8 h-8 text-green-600" /></div>
                  <h3 className="font-serif text-2xl text-primary mb-2">Request Submitted!</h3>
                  <p className="text-slate-600 mb-6">Our team will contact you within 24 hours to discuss your acquisition.</p>
                  <Button onClick={() => setIsSubmitted(false)} variant="primary">Submit Another Request</Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-slate-100 p-8 lg:p-10 shadow-sm">
                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <Input label="Full Name" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="John Doe" required error={errors.fullName} />
                    <Input label="Email Address" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="john@example.com" required error={errors.email} />
                  </div>
                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <Input label="Phone Number" name="phone" type="tel" value={formData.phone} onChange={handleChange} placeholder="+1 (555) 000-0000" required error={errors.phone} />
                    <Input label="Reference Number" name="referenceNumber" value={formData.referenceNumber} onChange={handleChange} placeholder="Type watch name or reference" required error={errors.referenceNumber} />
                  </div>
                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <Input label="Brand" name="brand" value={formData.brand} onChange={handleChange} placeholder="Rolex" required error={errors.brand} />
                    <Input label="Model" name="model" value={formData.model} onChange={handleChange} placeholder="Submariner" required error={errors.model} />
                  </div>
                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <Input label="Budget (USD)" name="budget" type="number" value={formData.budget} onChange={handleChange} placeholder="50000" required error={errors.budget} />
                    <Input label="Timeframe" name="timeframe" value={formData.timeframe} onChange={handleChange} placeholder="Within a week" required error={errors.timeframe} />
                  </div>
                  <div className="mb-6"><Textarea label="Additional Details" name="additionalDetails" value={formData.additionalDetails} onChange={handleChange} placeholder="Any specific requirements..." rows={4} /></div>
                  <div className="mb-8"><Checkbox label="I consent to receiving SMS communications from ChronoTrust." name="smsConsent" checked={formData.smsConsent} onChange={handleChange} /></div>
                  <Button type="submit" variant="primary" disabled={createInquiry.isPending} className="w-full py-4 text-base">
                    {createInquiry.isPending ? <><Loader2 className="w-5 h-5 mr-2 animate-spin" />Submitting...</> : 'Submit Acquisition Request'}
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
                Get answers to common questions about buying authenticated pre-owned luxury watches from ChronoTrust.
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
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <p className="text-[11px] tracking-[0.3em] uppercase text-blue-200 mb-4 font-semibold">Expert Guidance</p>
                  <h2 className="font-serif text-4xl md:text-5xl mb-6 leading-tight">Questions About Buying?</h2>
                  <p className="text-white/80 font-light leading-relaxed text-lg">Our experts are ready to help you find the perfect timepiece for your collection. Get personalized recommendations and exclusive access.</p>
                </div>
                <div className="flex flex-col sm:flex-row items-center justify-end gap-4">
                  <Button href="https://wa.me/17328329938" target="_blank" variant="secondary" className="shadow-xl shadow-black/20">
                    <MessageCircle className="w-4 h-4 mr-2" />Chat on WhatsApp
                  </Button>
                  <Button href="/collection" variant="primary" className="shadow-xl shadow-black/20">
                    View Collection <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
          
          {/* Bottom elegant separator */}
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
        </section>
      </main>
    </>
  );
}
