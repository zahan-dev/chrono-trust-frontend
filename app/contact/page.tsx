"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { useCreateInquiry } from "@/hooks/useInquiries";
import { MessageCircle, Mail, Phone, MapPin, Clock, Send, CheckCircle, Loader2, ArrowRight } from "lucide-react";

const contactInfo = [
  {
    icon: Phone,
    title: "Phone",
    value: "+1 (732) 832-9938",
    href: "tel:+17328329938",
    description: "Available for calls and WhatsApp",
  },
  {
    icon: Mail,
    title: "Email",
    value: "info@chronotrust.io",
    href: "mailto:info@chronotrust.io",
    description: "We respond within 24 hours",
  },
  {
    icon: MapPin,
    title: "Showroom",
    value: "New York, NY",
    href: "https://maps.google.com",
    description: "By appointment only",
  },
  {
    icon: Clock,
    title: "Hours",
    value: "By Appointment",
    href: "#",
    description: "Flexible scheduling available",
  },
];

export default function ContactPage() {
  const createInquiry = useCreateInquiry();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    service: "general",
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
      setFormData({ name: "", email: "", phone: "", message: "", service: "general" });
    } catch (error) {
      console.error("Failed to submit inquiry:", error);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
  };

  const itemVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  return (
    <>
      <main className="min-h-screen bg-[#FAFAFA]">
        {/* Cinematic Hero Section */}
        <section className="relative flex flex-col justify-center min-h-[60vh] pt-32 pb-24 overflow-hidden bg-primary">
          <div className="absolute inset-0 z-0">
            <Image
              src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1920&q=80"
              alt="Contact background"
              fill
              className="object-cover opacity-20 mix-blend-luminosity scale-105"
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
              className="text-center max-w-3xl mx-auto"
            >
              <motion.div variants={itemVariants} className="inline-flex items-center gap-3 mb-6">
                <div className="h-px w-8 bg-silver"></div>
                <span className="text-[10px] sm:text-xs tracking-[0.3em] uppercase text-silver font-medium">
                  Get In Touch
                </span>
                <div className="h-px w-8 bg-silver"></div>
              </motion.div>
              <motion.h1 variants={itemVariants} className="font-serif text-3xl md:text-4xl lg:text-6xl font-medium tracking-tight mb-8 text-white leading-[1.1]">
                Contact ChronoTrust Luxury Watch, Experts
              </motion.h1>
              <motion.p variants={itemVariants} className="text-lg md:text-xl text-white/70 font-light leading-relaxed max-w-4xl mx-auto">
                We’re here to assist you with any questions about buying, selling, or trading luxury watches. Our expert team ensures that every inquiry is handled with personalized guidance, transparency, and complete confidentiality. Reach out today to start your seamless horological experience.
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* Contact Info Cards */}
        <section className="py-20 lg:py-24 bg-white border-b border-slate-100 relative z-30 -mt-10 rounded-t-[3rem] shadow-[0_-20px_50px_rgba(0,0,0,0.05)]">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              {contactInfo.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <Link
                      href={item.href}
                      target={item.href.startsWith("http") ? "_blank" : undefined}
                      className="block p-8 bg-[#FAFAFA] rounded-3xl border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_40px_rgba(30,58,95,0.06)] hover:-translate-y-2 transition-all duration-500 h-full group"
                    >
                      <div className="w-14 h-14 bg-white border border-slate-200 rounded-full flex items-center justify-center mb-6 group-hover:bg-primary group-hover:border-primary transition-colors duration-500">
                        <Icon className="w-6 h-6 text-primary group-hover:text-white transition-colors duration-500" strokeWidth={1.5} />
                      </div>
                      <h3 className="font-serif text-2xl text-primary mb-2">{item.title}</h3>
                      <p className="text-primary font-medium mb-3 text-lg">{item.value}</p>
                      <p className="text-sm text-slate-500 font-light leading-relaxed">{item.description}</p>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="py-24 lg:py-32">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="grid lg:grid-cols-12 gap-16 lg:gap-12 items-start">

              {/* Info Side */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="lg:col-span-5 lg:sticky lg:top-32"
              >
                <div className="mb-10">
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-primary mb-4 tracking-wide uppercase">
                    SEND A MESSAGE
                  </h2>
                  <p className="text-slate-600 font-light text-base md:text-lg leading-relaxed max-w-2xl">
                    Fill out the form below, and our dedicated luxury watch experts will respond within 24 hours. For immediate assistance, connect with us directly via WhatsApp for personalized guidance on buying, selling, or trading authenticated timepieces.
                  </p>
                </div>

                <div className="relative aspect-4/3 rounded-3xl overflow-hidden mb-8 shadow-2xl border border-slate-100">
                  <Image
                    src="https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?w=800&q=80"
                    alt="ChronoTrust Showroom"
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
                  <h3 className="font-serif text-xl md:text-2xl text-primary mb-4">
                    Prefer to Chat?
                  </h3>
                  <p className="text-slate-600 font-light mb-6">
                    Connect with us directly on WhatsApp for immediate assistance from our team.
                  </p>
                  <Link
                    href="https://wa.me/17328329938"
                    target="_blank"
                    className="flex items-center justify-center gap-2 w-full py-4 bg-green-500 text-white text-sm font-semibold tracking-wider uppercase rounded-full hover:bg-green-600 transition-colors shadow-lg shadow-green-500/20"
                  >
                    <MessageCircle className="w-5 h-5" />
                    Chat on WhatsApp
                  </Link>
                </div>
              </motion.div>

              {/* Form Side */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="lg:col-span-7"
              >
                <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-[0_20px_60px_rgba(0,0,0,0.06)] border border-slate-100">
                  <h3 className="text-2xl sm:text-3xl font-serif font-bold text-primary mb-8 text-center uppercase tracking-wide">
                    INQUIRY FORM
                  </h3>

                  {isSubmitted ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="bg-green-50 border border-green-100 rounded-2xl p-10 text-center flex flex-col items-center justify-center h-[500px]"
                    >
                      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
                        <CheckCircle className="w-10 h-10 text-green-600" />
                      </div>
                      <h3 className="font-serif text-3xl text-primary mb-4">Message Sent Successfully!</h3>
                      <p className="text-slate-600 font-light text-lg mb-8 max-w-md">
                        Thank you for reaching out. A dedicated specialist will review your inquiry and be in touch shortly.
                      </p>
                      <Button
                        onClick={() => setIsSubmitted(false)}
                        variant="outline"
                        className="rounded-full px-8"
                      >
                        Send Another Message
                      </Button>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div>
                        <label className="block text-[11px] font-semibold tracking-widest uppercase text-slate-500 mb-2">
                          I&apos;m Interested In <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <select
                            value={formData.service}
                            onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                            className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm focus:outline-none focus:border-primary/40 focus:ring-1 focus:ring-primary/40 transition-all appearance-none cursor-pointer font-medium"
                          >
                            <option value="general">General Inquiry</option>
                            <option value="buy">Buying a Watch</option>
                            <option value="sell">Selling a Watch</option>
                            <option value="trade">Trading a Watch</option>
                            <option value="service">Watch Service / Appraisal</option>
                          </select>
                          <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-slate-400">
                            <ArrowRight className="w-4 h-4 rotate-90" />
                          </div>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-[11px] font-semibold tracking-widest uppercase text-slate-500 mb-2">
                            Full Name <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm focus:outline-none focus:border-primary/40 focus:ring-1 focus:ring-primary/40 transition-all font-medium placeholder:text-slate-400"
                            placeholder="John Doe"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-semibold tracking-widest uppercase text-slate-500 mb-2">
                            Email Address <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm focus:outline-none focus:border-primary/40 focus:ring-1 focus:ring-primary/40 transition-all font-medium placeholder:text-slate-400"
                            placeholder="john@example.com"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold tracking-widest uppercase text-slate-500 mb-2">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm focus:outline-none focus:border-primary/40 focus:ring-1 focus:ring-primary/40 transition-all font-medium placeholder:text-slate-400"
                          placeholder="+1 (555) 000-0000"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold tracking-widest uppercase text-slate-500 mb-2">
                          Message <span className="text-red-500">*</span>
                        </label>
                        <textarea
                          required
                          rows={5}
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm focus:outline-none focus:border-primary/40 focus:ring-1 focus:ring-primary/40 transition-all resize-none font-medium placeholder:text-slate-400"
                          placeholder="Tell us about the timepiece you are looking for..."
                        />
                      </div>

                      <div className="pt-2">
                        <Button
                          variant="primary"
                          type="submit"
                          disabled={createInquiry.isPending}
                          className="w-full flex items-center justify-center gap-2 py-5 bg-primary hover:bg-primary/90 text-white font-bold uppercase tracking-widest text-sm shadow-xl shadow-primary/20 rounded-full transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                          {createInquiry.isPending ? (
                            <>
                              <Loader2 className="w-5 h-5 animate-spin" />
                              Processing...
                            </>
                          ) : (
                            <>
                              <Send className="w-5 h-5" />
                              Send Message
                            </>
                          )}
                        </Button>
                      </div>

                      <p className="text-center text-[10px] text-slate-400 font-medium">
                        Your information is secure and will never be shared. <br className="hidden sm:block" />
                        By submitting, you agree to our Terms & Privacy Policy.
                      </p>
                    </form>
                  )}
                </div>
              </motion.div>

            </div>
          </div>
        </section>
      </main>
    </>
  );
}
