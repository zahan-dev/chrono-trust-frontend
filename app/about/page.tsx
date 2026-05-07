"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { ShieldCheck, Diamond, Users, Clock, MessageCircle, ArrowRight } from "lucide-react";

const stats = [
  { value: "15+", label: "Years Experience" },
  { value: "5,000+", label: "Watches Sold" },
  { value: "100%", label: "Authenticity Guarantee" },
  { value: "24/7", label: "Expert Support" },
];

const values = [
  {
    icon: ShieldCheck,
    title: "Trust & Transparency",
    description: "Every transaction is built on complete transparency. We provide detailed condition reports and authentication certificates.",
  },
  {
    icon: Diamond,
    title: "Expert Authentication",
    description: "Our master watchmakers with decades of experience authenticate every timepiece that passes through our doors.",
  },
  {
    icon: Users,
    title: "Family Legacy",
    description: "A family-owned business passed down through generations, treating every client like part of our extended family.",
  },
  {
    icon: Clock,
    title: "Timeless Service",
    description: "From sourcing rare pieces to after-sales support, we're with you for the lifetime of your timepiece.",
  },
];

export default function AboutPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  return (
    <>
      <main className="min-h-screen bg-[#FAFAFA]">
        {/* Cinematic Hero Section */}
        <section className="relative flex flex-col justify-center min-h-[70vh] pt-32 pb-24 overflow-hidden bg-primary">
          <div className="absolute inset-0 z-0">
            <Image
              src="https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?w=1920&q=80"
              alt="Luxury watches background"
              fill
              className="object-cover opacity-30 mix-blend-luminosity scale-105"
            />
            <div className="absolute inset-0 bg-radial-gradient from-transparent via-primary/80 to-primary z-10" />
            <div className="absolute inset-0 bg-linear-to-t from-primary via-primary/50 to-transparent z-10" />
          </div>
          <div className="absolute inset-0 z-10 pointer-events-none opacity-[0.05] mix-blend-overlay" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' }}></div>

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-20">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="max-w-3xl"
            >
              <motion.div variants={itemVariants} className="inline-flex items-center gap-3 mb-6">
                <div className="h-px w-8 bg-silver"></div>
                <span className="text-[10px] sm:text-xs tracking-[0.3em] uppercase text-silver font-medium">
                  About ChronoTrust
                </span>
              </motion.div>
              <motion.h1 variants={itemVariants} className="font-serif text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight mb-8 text-white leading-[1.1]">
                A Legacy Built <br className="hidden md:block" /> on Trust
              </motion.h1>
              <motion.p variants={itemVariants} className="text-lg md:text-xl text-white/70 font-light leading-relaxed max-w-2xl">
                For over 15 years, we have been the trusted destination for discerning collectors seeking the world&apos;s finest timepieces. Our commitment to authenticity and exceptional service defines everything we do.
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* Brand Story */}
        <section className="py-24 lg:py-32 relative">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="grid lg:grid-cols-12 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="lg:col-span-5"
              >
                <div className="inline-flex items-center gap-3 mb-6">
                  <div className="h-px w-8 bg-primary"></div>
                  <p className="text-[10px] tracking-[0.3em] uppercase text-slate-500 font-medium">
                    Our Story
                  </p>
                </div>
                <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-primary mb-8 leading-[1.1]">
                  Where Passion <br /> Meets Precision
                </h2>
                <div className="space-y-6 text-slate-600 font-light leading-relaxed text-lg">
                  <p>
                    Founded in 2009, ChronoTrust began as a small family passion project in New York City. What started as a father and son&apos;s shared love for horology has grown into one of the most respected names in luxury watch dealing.
                  </p>
                  <p>
                    Our journey has taken us from humble beginnings to becoming trusted partners for collectors worldwide. Through it all, our core values remain unchanged: authenticity, transparency, and treating every client like family.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="lg:col-span-7 relative"
              >
                <div className="relative aspect-4/3 rounded-4xl overflow-hidden shadow-2xl border border-slate-100">
                  <Image
                    src="https://images.unsplash.com/photo-1612817159949-195b6eb9e31a?w=1200&q=80"
                    alt="Luxury watch showcase"
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-1000"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-primary/40 to-transparent" />
                </div>
                {/* Floating Badge */}
                <div className="absolute -bottom-10 -left-6 md:-left-10 bg-white p-8 rounded-4xl shadow-[0_20px_60px_rgba(0,0,0,0.08)] border border-slate-100 backdrop-blur-xl flex flex-col items-center justify-center">
                  <p className="font-serif text-5xl text-primary mb-2">15+</p>
                  <p className="text-xs tracking-widest uppercase text-slate-500 font-medium text-center">Years of<br/>Excellence</p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Premium Stats Section */}
        <section className="py-24 bg-primary text-white relative overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Image 
              src="https://images.unsplash.com/photo-1547996160-81dfa63595aa?auto=format&fit=crop&w=2000&q=80"
              alt="Luxury Watch Movement"
              fill
              className="object-cover opacity-10 mix-blend-luminosity"
            />
          </div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-12 lg:gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="flex flex-col items-center text-center group"
                >
                  <p className="font-serif text-5xl md:text-6xl text-white mb-4 group-hover:scale-110 transition-transform duration-500 text-shadow-sm">
                    {stat.value}
                  </p>
                  <p className="text-[10px] md:text-xs text-silver uppercase tracking-[0.2em] font-medium">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-24 lg:py-32 bg-[#FAFAFA]">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-20">
              <div className="inline-flex items-center gap-3 mb-6">
                <div className="h-px w-8 bg-primary"></div>
                <span className="text-[10px] sm:text-xs tracking-[0.3em] uppercase text-slate-500 font-medium">
                  Our Values
                </span>
                <div className="h-px w-8 bg-primary"></div>
              </div>
              <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-primary leading-[1.1]">
                What Sets Us Apart
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {values.map((value, index) => {
                const Icon = value.icon;
                return (
                  <motion.div
                    key={value.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="bg-white p-10 rounded-3xl border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_40px_rgba(30,58,95,0.06)] hover:-translate-y-2 transition-all duration-500 flex flex-col group"
                  >
                    <div className="w-16 h-16 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center mb-8 group-hover:bg-primary group-hover:border-primary transition-colors duration-500 shrink-0">
                      <Icon className="w-7 h-7 text-primary group-hover:text-white transition-colors duration-500" strokeWidth={1.5} />
                    </div>
                    <h3 className="font-serif text-2xl md:text-3xl text-primary mb-4">
                      {value.title}
                    </h3>
                    <p className="text-slate-500 font-light leading-relaxed text-lg">
                      {value.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 lg:py-32 bg-primary text-white relative overflow-hidden">
          <div className="absolute inset-0 z-0">
             <div className="absolute inset-0 bg-radial-gradient from-primary/80 via-primary to-primary z-10" />
             <div className="absolute inset-0 pointer-events-none opacity-[0.05] mix-blend-overlay" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' }}></div>
          </div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="max-w-3xl mx-auto"
            >
              <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-6 leading-[1.1]">
                Begin Your Journey
              </h2>
              <p className="text-white/70 font-light max-w-xl mx-auto mb-10 text-lg">
                Whether you&apos;re buying, selling, or trading, our team is ready to 
                provide the exceptional service you deserve.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button
                  href="https://wa.me/17328329938"
                  variant="secondary"
                  className="flex items-center justify-center gap-2 w-full sm:w-auto"
                >
                  <MessageCircle className="w-4 h-4" />
                  Chat on WhatsApp
                </Button>
                <Button
                  href="/collection"
                  variant="outline"
                  className="flex items-center justify-center w-full sm:w-auto text-white border-white/20 hover:bg-white/10"
                >
                  View Collection <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </>
  );
}
