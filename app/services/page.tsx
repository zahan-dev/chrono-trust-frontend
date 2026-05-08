"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { ShoppingBag, Tag, Repeat, ArrowRight, Shield, Clock, Award } from "lucide-react";

const services = [
  {
    id: "buy",
    title: "Buy Watches",
    subtitle: "Acquire Timeless Pieces",
    description: "Discover our curated collection of authenticated luxury watches. From vintage classics to modern masterpieces, ChronoTrust ensures every timepiece is verified for authenticity, quality, and provenance. Add the perfect addition to your collection with confidence and expert guidance.",
    icon: ShoppingBag,
    image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=800&q=80",
    features: ["100% Authenticity Guarantee", "Global Sourcing Network", "Competitive Pricing", "Lifetime Support"],
    cta: "Explore Collection",
    href: "/collection",
  },
  {
    id: "sell",
    title: "Sell Watches",
    subtitle: "Maximize Your Return",
    description: "Sell your timepiece with confidence. Our experts provide fair market valuations and connect you with serious buyers worldwide, ensuring you get the best possible price for your watch.",
    icon: Tag,
    image: "https://images.unsplash.com/photo-1612817159949-195b6eb9e31a?w=800&q=80",
    features: ["Free Professional Appraisal", "Global Buyer Network", "Secure Transaction", "Quick Payment"],
    cta: "Get Valuation",
    href: "/services/sell",
  },
  {
    id: "trade",
    title: "Trade Watches",
    subtitle: "Upgrade Your Collection",
    description: "Upgrade to your dream timepiece. ChronoTrust offers competitive trade-in values and seamless transactions, making it easy to enhance and diversify your collection.",
    icon: Repeat,
    image: "https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?w=800&q=80",
    features: ["Fair Trade-In Values", "Seamless Transition", "Collection Matching", "Expert Guidance"],
    cta: "Start Trading",
    href: "/services/trade",
  },
];

const guarantees = [
  {
    icon: Shield,
    title: "Authenticity Guaranteed",
    description: "Every luxury watch is thoroughly verified by our master watchmakers, ensuring 100% genuine, authenticated, and high-quality timepieces for every client.",
  },
  {
    icon: Clock,
    title: "Swift Process",
    description: "We provide efficient transactions with clear timelines, making buying, selling, or trading your watch fast, seamless, and hassle-free.",
  },
  {
    icon: Award,
    title: "Expert Guidance",
    description: "Enjoy personal consultation and expert guidance throughout your horological journey, from valuation to acquisition and trade.",
  },
];

export default function ServicesPage() {
  return (
    <>
      <main className="min-h-screen bg-[#FAFAFA]">
        {/* Hero Section */}
        <section className="relative bg-primary text-white py-38 overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <Image
              src="https://images.unsplash.com/photo-1509048191080-d2984bad6ae5?w=1920&q=80"
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
              className="text-center max-w-3xl mx-auto"
            >
              <p className="text-[11px] tracking-[0.3em] uppercase text-white/60 mb-4">
                Our Expertise
              </p>
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight mb-6">
                Premium Watch Services
              </h1>
              <p className="text-lg max-w-3xl text-white/80 font-light leading-relaxed">
                Whether you're acquiring, selling, or trading luxury watches, our expert team provides unmatched guidance, secure transactions, and personalized service for discerning collectors. Trust ChronoTrust for a seamless, reliable, and expert-led horological experience.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Services Cards */}
        <section className="py-20 lg:py-28">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="space-y-24">
              {services.map((service, index) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className={`grid lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? "lg:flex-row-reverse" : ""
                    }`}
                >
                  {/* Image */}
                  <div className={`relative ${index % 2 === 1 ? "lg:order-2" : ""}`}>
                    <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                      <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent" />
                    </div>
                    <div className="absolute -bottom-6 -right-6 bg-primary text-white p-6 rounded-xl">
                      <service.icon className="w-8 h-8" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                    <p className="text-[11px] tracking-[0.3em] uppercase text-silver mb-3">
                      {service.subtitle}
                    </p>
                    <h2 className="font-serif text-3xl md:text-4xl text-primary mb-4">
                      {service.title}
                    </h2>
                    <p className="text-slate-600 font-light leading-relaxed mb-6">
                      {service.description}
                    </p>

                    <ul className="space-y-3 mb-8">
                      {service.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-3 text-sm text-slate-600">
                          <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                          {feature}
                        </li>
                      ))}
                    </ul>

                    <Button href={service.href}>
                      {service.cta} <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Guarantees Section */}
        <section className="py-20 bg-white border-y border-slate-100">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <p className="text-[11px] tracking-[0.3em] uppercase text-silver mb-4">
                Our Promise
              </p>
              <h2 className="font-serif text-3xl md:text-4xl text-primary">
                The ChronoTrust Guarantee
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {guarantees.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="w-16 h-16 bg-primary/5 rounded-full flex items-center justify-center mx-auto mb-4">
                    <item.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-serif text-xl text-primary mb-2">{item.title}</h3>
                  <p className="text-slate-600 font-light">{item.description}</p>
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
                  Ready to Begin Your Luxury Watch Journey?
                </h2>
                <p className="text-white/70 font-light leading-relaxed">
                  Our team of expert horologists is standing by to assist you. Whether you have questions about buying, selling, or trading authenticated luxury watches, we provide personalized guidance, secure transactions, and seamless support every step of the way.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row items-center justify-end gap-4">
                <Button
                  href="https://wa.me/17328329938"
                  target="_blank"
                  variant="secondary"
                >
                  Chat on WhatsApp
                </Button>
                <Button href="/contact" variant="primary">
                  Contact Us
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
