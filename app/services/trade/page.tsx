"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Select } from "@/components/ui/Select";
import { Checkbox } from "@/components/ui/Checkbox";
import { ImageUpload } from "@/components/ui/ImageUpload";
import { Repeat, Search, Scale, FileCheck, Truck, MessageCircle, ArrowRight, ChevronRight, CheckCircle, TrendingUp, Loader2 } from "lucide-react";
import { useCreateInquiry } from "@/hooks/useInquiries";

const steps = [
  {
    number: "01",
    title: "Share Your Watch",
    description: "Submit your authenticated luxury watch details and high-quality photos via our secure form or WhatsApp. This ensures a fast and accurate assessment for your trade.",
    icon: Search,
  },
  {
    number: "02",
    title: "Choose Your Upgrade",
    description: "Browse our curated collection of luxury watches or let our certified experts suggest pieces tailored to your preferences and collection goals.",
    icon: Search,
  },
  {
    number: "03",
    title: "Fair Valuation",
    description: "Receive a transparent, data-driven valuation for both your current watch and the selected upgrade, ensuring you get optimal value.",
    icon: Scale,
  },
  {
    number: "04",
    title: "Seamless Exchange",
    description: "Complete the trade through secure shipping, verified authentication, and professional handling, guaranteeing a smooth and trustworthy transaction.",
    icon: FileCheck,
  },
];

const benefits = [
  "Fair Trade-in Values: Receive transparent valuations based on current market rates.",
  "Wide Upgrade Selection: Access a curated collection of premium watches for your trade",
  "No Sales Tax on Trades: Where applicable, enjoy tax-free transactions for better overall value.",
  "Simplified Single Transaction: Combine selling and buying into one seamless process.",
  "Expert Guidance Throughout: Certified watch experts assist at every step of the trade.",
  "Secure, Insured Shipping Both Ways: Your watches are protected during transit with insured shipping.",
];

const scenarios = [
  {
    title: "Trade Up",
    description: "Upgrade from a mid-tier or pre-owned watch to a high-value luxury timepiece that completes your collection. Achieve your dream watch with expert guidance and transparent valuations.",
    example: "Omega Speedmaster → Rolex Daytona",
  },
  {
    title: "Diversify",
    description: "Exchange a single high-value watch for multiple watches across brands, expanding your collection while maintaining optimal market value.",
    example: "Single Patek → Rolex + AP + JLC",
  },
  {
    title: "Refresh",
    description: "Swap your older or previous generation model for the latest version or a different style, ensuring your collection stays modern and aligned with your preferences.",
    example: "Previous Gen → Current Model",
  },
  {
    title: "Downsize",
    description: "Trade multiple watches for one exceptional timepiece, allowing you to consolidate value while acquiring a rare or vintage watch that enhances your collection.",
    example: "3 Watches → 1 Rare Vintage",
  },
];

export default function TradePage() {
  const createInquiry = useCreateInquiry();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    referenceNumber: '',
    brand: '',
    model: '',
    condition: '',
    includedItems: '',
    yearOfProduction: '',
    tradingToward: '',
    additionalDetails: '',
    smsConsent: false,
  });
  const [images, setImages] = useState<string[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.referenceNumber.trim()) newErrors.referenceNumber = 'Reference number is required';
    if (!formData.brand.trim()) newErrors.brand = 'Brand is required';
    if (!formData.model.trim()) newErrors.model = 'Model is required';
    if (!formData.condition) newErrors.condition = 'Condition is required';
    if (!formData.includedItems.trim()) newErrors.includedItems = 'Included items are required';
    if (!formData.yearOfProduction.trim()) newErrors.yearOfProduction = 'Year is required';
    if (!formData.tradingToward.trim()) newErrors.tradingToward = 'Trading toward is required';
    if (images.length === 0) newErrors.images = 'At least one photo is required';

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
      const message = `TRADE REQUEST

Watch Details:
Reference: ${formData.referenceNumber}
Brand: ${formData.brand}
Model: ${formData.model}
Condition: ${formData.condition}
Included Items: ${formData.includedItems}
Year: ${formData.yearOfProduction}

Trading Toward:
${formData.tradingToward}

Additional Details:
${formData.additionalDetails || 'N/A'}

Photos: ${images.join(', ')}

SMS Consent: ${formData.smsConsent ? 'Yes' : 'No'}`;

      await createInquiry.mutateAsync({
        name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        message,
      });

      setIsSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      console.error('Failed to submit trade request:', error);
      alert('Failed to submit. Please try again.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <>
      <main className="min-h-screen bg-[#FAFAFA]">
        {/* Hero Section */}
        <section className="relative bg-primary text-white py-38 overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <Image
              src="https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?w=1920&q=80"
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
                <span>Trade</span>
              </div>
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight mb-6">
                Trade Your Luxury Timepiece with Ease
              </h1>
              <p className="text-lg text-white/80 font-light leading-relaxed max-w-2xl mb-8">
                Upgrade your collection seamlessly with ChronoTrust. Trade your authenticated luxury watch for a new acquisition, guided by our certified experts. Experience a secure, transparent, and streamlined process that ensures you receive fair value and expert guidance every step of the way.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  href="https://wa.me/17328329938"
                  target="_blank"
                  variant="secondary"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Start Trading
                </Button>
                <Button href="/collection" variant="primary">
                  Browse Collection <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Benefits Bar */}
        <section className="py-16 bg-white border-b border-slate-100">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-14 h-14 bg-primary/5 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Scale className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-serif text-lg text-primary mb-2">Fair Value</h3>
                <p className="text-slate-600 font-light text-sm">
                  Transparent valuations based on current market rates
                </p>
              </div>
              <div className="text-center">
                <div className="w-14 h-14 bg-primary/5 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-serif text-lg text-primary mb-2">Upgrade Path</h3>
                <p className="text-slate-600 font-light text-sm">
                  Clear path to your next dream timepiece
                </p>
              </div>
              <div className="text-center">
                <div className="w-14 h-14 bg-primary/5 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Repeat className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-serif text-lg text-primary mb-2">One Transaction</h3>
                <p className="text-slate-600 font-light text-sm">
                  Simplified process with single paperwork
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
                How It Works
              </p>
              <h2 className="font-serif text-3xl md:text-4xl text-primary">
                The Trading Process
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

        {/* Trading Scenarios */}
        <section className="py-14 lg:py-20 bg-white border-y border-slate-100">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <p className="text-[11px] tracking-[0.3em] uppercase text-silver mb-4">
                Trading Scenarios
              </p>
              <h2 className="font-serif text-3xl md:text-4xl text-primary">
                Ways to Trade Your Luxury Watch
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {scenarios.map((scenario, index) => (
                <motion.div
                  key={scenario.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-slate-50 p-8 rounded-2xl"
                >
                  <h3 className="font-serif text-xl text-primary mb-3">{scenario.title}</h3>
                  <p className="text-slate-600 font-light mb-4">{scenario.description}</p>
                  <p className="text-sm text-primary font-medium">{scenario.example}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-14 lg:py-20">
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
                    src="/IWC 1.webp"
                    alt="Watch collection"
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
                <p className="text-[11px] tracking-[0.3em] uppercase text-silver mb-4">
                  Why Trade With Us
                </p>
                <h2 className="font-serif text-3xl md:text-4xl text-primary mb-6">
                  Benefits of Trading Your Luxury Watch
                </h2>
                <p className="text-slate-600 font-light leading-relaxed mb-8">
                  Trading your authenticated luxury watch with ChronoTrust offers distinct advantages over selling and buying separately. Experience a streamlined process, enhanced value, and expert guidance, all designed to make your watch upgrade smooth, secure, and rewarding.
                </p>

                <ul className="space-y-4">
                  {benefits.map((item) => {
                    const [boldPart, ...rest] = item.split(':');
                    return (
                      <li key={item} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                        <span className="text-slate-600">
                          <strong className="font-semibold">{boldPart}:</strong>
                          {rest.join(':')}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Trade Form Section */}
        <section className="py-14 lg:py-20 bg-white border-y border-slate-100">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="text-center mb-12">
                <p className="text-[11px] tracking-[0.3em] uppercase text-silver mb-4">
                  Submit Your Trade
                </p>
                <h2 className="font-serif text-3xl md:text-4xl text-primary mb-4">
                  Trade a Watch
                </h2>
                <p className="text-slate-600 font-light max-w-2xl mx-auto">
                  Fill out the form below to begin your trade process. Our experts will review your submission and contact you within 24 hours.
                </p>
              </div>

              {isSubmitted ? (
                <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="font-serif text-2xl text-primary mb-2">Trade Request Submitted!</h3>
                  <p className="text-slate-600 mb-6">
                    Thank you for your submission. Our team will review your trade request and contact you within 24 hours.
                  </p>
                  <Button onClick={() => setIsSubmitted(false)} variant="primary">
                    Submit Another Trade
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-slate-100 p-8 lg:p-10 shadow-sm">
                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <Input
                      label="Full Name"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="John Doe"
                      required
                      error={errors.fullName}
                    />
                    <Input
                      label="Email Address"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      required
                      error={errors.email}
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <Input
                      label="Phone Number"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+1 (555) 000-0000"
                      required
                      error={errors.phone}
                    />
                    <Input
                      label="Reference Number"
                      name="referenceNumber"
                      value={formData.referenceNumber}
                      onChange={handleChange}
                      placeholder="Type a watch name or exact reference number"
                      required
                      error={errors.referenceNumber}
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <Input
                      label="Brand"
                      name="brand"
                      value={formData.brand}
                      onChange={handleChange}
                      placeholder="Rolex"
                      required
                      error={errors.brand}
                    />
                    <Input
                      label="Model"
                      name="model"
                      value={formData.model}
                      onChange={handleChange}
                      placeholder="Daytona"
                      required
                      error={errors.model}
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <Select
                      label="Condition"
                      name="condition"
                      value={formData.condition}
                      onChange={handleChange}
                      required
                      error={errors.condition}
                      options={[
                        { value: '', label: 'Select condition' },
                        { value: 'Brand New', label: 'Brand New' },
                        { value: 'Pre-Owned', label: 'Pre-Owned' },
                        { value: 'Other', label: 'Other' },
                      ]}
                    />
                    <Input
                      label="Year of Production"
                      name="yearOfProduction"
                      type="number"
                      value={formData.yearOfProduction}
                      onChange={handleChange}
                      placeholder="2000"
                      required
                      error={errors.yearOfProduction}
                    />
                  </div>

                  <div className="mb-6">
                    <Input
                      label="Included Items"
                      name="includedItems"
                      value={formData.includedItems}
                      onChange={handleChange}
                      placeholder="Watch with original box and papers"
                      required
                      error={errors.includedItems}
                    />
                  </div>

                  <div className="mb-6">
                    <Textarea
                      label="Trading Toward"
                      name="tradingToward"
                      value={formData.tradingToward}
                      onChange={handleChange}
                      placeholder="Describe what you're looking for"
                      required
                      error={errors.tradingToward}
                      rows={3}
                    />
                  </div>

                  <div className="mb-6">
                    <ImageUpload
                      label="Upload Photos"
                      maxImages={12}
                      onImagesChange={setImages}
                      required
                      error={errors.images}
                    />
                  </div>

                  <div className="mb-6">
                    <Textarea
                      label="Additional Details"
                      name="additionalDetails"
                      value={formData.additionalDetails}
                      onChange={handleChange}
                      placeholder="Any other information you'd like to share..."
                      rows={4}
                    />
                  </div>

                  <div className="mb-8">
                    <Checkbox
                      label="I consent to receiving SMS communications from ChronoTrust."
                      name="smsConsent"
                      checked={formData.smsConsent}
                      onChange={handleChange}
                    />
                  </div>

                  <Button
                    type="submit"
                    variant="primary"
                    disabled={createInquiry.isPending}
                    className="w-full py-4 text-base"
                  >
                    {createInquiry.isPending ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      'Submit Trade Request'
                    )}
                  </Button>
                </form>
              )}
            </motion.div>
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
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <p className="text-[11px] tracking-[0.3em] uppercase text-blue-200 mb-4 font-semibold">Trade With Confidence</p>
                  <h2 className="font-serif text-4xl md:text-5xl mb-6 leading-tight">Questions About Trading?</h2>
                  <p className="text-white/80 font-light leading-relaxed text-lg">Our experts are ready to provide personalized guidance and answer any questions about the trade process. Get fair valuations and seamless upgrades.</p>
                </div>
                <div className="flex flex-col sm:flex-row items-center justify-end gap-4">
                  <Button
                    href="https://wa.me/17328329938"
                    target="_blank"
                    variant="secondary"
                    className="shadow-xl shadow-black/20"
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Chat on WhatsApp
                  </Button>
                  <Button href="/collection" variant="primary" className="shadow-xl shadow-black/20">
                    Browse Collection <ArrowRight className="w-4 h-4 ml-2" />
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
