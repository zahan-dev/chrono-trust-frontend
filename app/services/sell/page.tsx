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
    description: "Share photos and information about your timepiece through our secure form or WhatsApp.",
    icon: Camera,
  },
  {
    number: "02",
    title: "Expert Evaluation",
    description: "Our specialists assess condition, authenticity, and current market value.",
    icon: Search,
  },
  {
    number: "03",
    title: "Receive Offer",
    description: "We present a competitive offer based on fair market value and demand.",
    icon: DollarSign,
  },
  {
    number: "04",
    title: "Secure Payment",
    description: "Once accepted, receive prompt payment via your preferred method.",
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
    question: "How do I get a valuation?",
    answer: "Simply contact us via WhatsApp or our contact form with photos and details of your watch. Our experts will provide a free, no-obligation valuation within 24-48 hours.",
  },
  {
    question: "What information do you need?",
    answer: "We need clear photos of the watch, serial number, any box and papers you have, and a description of its condition. The more details, the more accurate our valuation.",
  },
  {
    question: "How quickly will I be paid?",
    answer: "Once we receive and authenticate your watch, payment is processed within 24 hours via wire transfer, check, or other agreed method.",
  },
  {
    question: "Do you buy watches without box and papers?",
    answer: "Yes, we purchase watches with or without original box and papers. While complete sets may command higher prices, we buy timepieces in various conditions.",
  },
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
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight mb-6">
                Sell Your Timepiece
              </h1>
              <p className="text-lg text-white/80 font-light leading-relaxed max-w-2xl mb-8">
                Maximize the value of your luxury watch with our expert service. 
                We connect you with serious buyers worldwide and ensure a smooth, 
                secure transaction process.
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
                <Button href="/contact" variant="outline">
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
                How to Sell Your Watch
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
                  The Smart Way to Sell
                </h2>
                <p className="text-slate-600 font-light leading-relaxed mb-8">
                  With years of experience and a global network of collectors, we 
                  ensure you receive the best value for your timepiece with minimal 
                  effort and maximum security.
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
                    src="https://images.unsplash.com/photo-1547996663-b8308d6e161c?w=800&q=80"
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
                <Button href="/contact" variant="outline">
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
