"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { CheckCircle, Shield, Search, FileCheck, Truck, MessageCircle, ArrowRight, ChevronRight } from "lucide-react";

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

export default function BuyPage() {
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
        <section className="py-20 lg:py-28">
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
        <section className="py-20 lg:py-28">
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

        {/* CTA Section */}
        <section className="py-20 lg:py-28 bg-primary text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="font-serif text-3xl md:text-4xl mb-4">
                Begin Your Luxury Watch Search
              </h2>
              <p className="text-white/70 font-light max-w-xl mx-auto mb-8">
                Explore our curated collection of authenticated luxury watches, or contact our expert team for personalized guidance. Whether you’re looking to buy a rare timepiece, add to your collection, or find an investment-worthy watch, ChronoTrust ensures a secure, expert-led, and seamless experience.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button href="/collection" variant="secondary">
                  View Collection <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
                <Button
                  href="https://wa.me/17328329938"
                  target="_blank"
                  variant="primary"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Chat on WhatsApp
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </>
  );
}
