"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Tag, Camera, Search, DollarSign, FileCheck, Truck, MessageCircle, ArrowRight, ChevronRight, CheckCircle } from "lucide-react";

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
  "Free, no-obligation valuation",
  "Competitive market-based pricing",
  "Global network of buyers",
  "Secure and insured shipping",
  "Fast payment processing",
  "Hassle-free experience",
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
        <section className="py-20 lg:py-28">
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
        <section className="py-20 lg:py-28 bg-white border-y border-slate-100">
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

        {/* FAQs */}
        <section className="py-20 lg:py-28">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <div className="text-center mb-12">
              <p className="text-[11px] tracking-[0.3em] uppercase text-silver mb-4">
                Common Questions
              </p>
              <h2 className="font-serif text-3xl md:text-4xl text-primary">
                Frequently Asked Questions
              </h2>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <motion.div
                  key={faq.question}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="bg-white p-6 rounded-xl border border-slate-100"
                >
                  <h3 className="font-serif text-lg text-primary mb-2">{faq.question}</h3>
                  <p className="text-slate-600 font-light">{faq.answer}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 lg:py-28 bg-primary text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="font-serif text-3xl md:text-4xl mb-4">
                  Ready to Sell?
                </h2>
                <p className="text-white/70 font-light leading-relaxed">
                  Get your free, no-obligation valuation today. Our team is ready
                  to help you achieve the best price for your timepiece.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row items-center justify-end gap-4">
                <Button
                  href="https://wa.me/17328329938"
                  target="_blank"
                  variant="secondary"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  WhatsApp Valuation
                </Button>
                <Button href="/contact" variant="primary">
                  Contact Form
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
