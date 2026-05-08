import { Mail, Phone, MapPin, ArrowUpRight } from 'lucide-react';
import Image from 'next/image';

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const TwitterIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export const Footer = () => {
  return (
    <footer className="bg-primary text-white/80 pt-24 pb-12 border-t border-white/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 lg:gap-8 mb-20">
          
          {/* Column 1: Brand & About */}
          <div className="lg:col-span-4">
            <div className="mb-8">
              <Image 
                src="/logo.png" 
                alt="ChronoTrust Logo" 
                width={200} 
                height={50}
                className="w-40 md:w-48 h-auto object-contain brightness-0 invert opacity-90"
              />
            </div>
            <p className="text-white/60 leading-relaxed font-light text-sm max-w-sm mb-8">
              A family-owned business dedicated to building trust and delivering excellence in luxury watch dealing. We source, authenticate, and deliver the world&apos;s finest timepieces.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 hover:border-white/30 transition-all">
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 hover:border-white/30 transition-all">
                <TwitterIcon className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 hover:border-white/30 transition-all">
                <LinkedinIcon className="w-4 h-4" />
              </a>
            </div>
          </div>
          
          {/* Column 2: Navigation */}
          <div className="lg:col-span-2 lg:col-start-6">
            <h3 className="text-xs font-semibold text-white/90 uppercase tracking-[0.2em] mb-8">Navigation</h3>
            <ul className="space-y-4 text-sm font-light">
              <li>
                <a href="/" className="text-white/60 hover:text-white transition-colors inline-flex items-center gap-2 group">
                  Home <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
                </a>
              </li>
              <li>
                <a href="/about" className="text-white/60 hover:text-white transition-colors inline-flex items-center gap-2 group">
                  About Us <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
                </a>
              </li>
              <li>
                <a href="/collection" className="text-white/60 hover:text-white transition-colors inline-flex items-center gap-2 group">
                  Collection <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
                </a>
              </li>
              <li>
                <a href="/services" className="text-white/60 hover:text-white transition-colors inline-flex items-center gap-2 group">
                  Services <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
                </a>
              </li>
            </ul>
          </div>
          
          {/* Column 3: Services */}
          <div className="lg:col-span-2">
            <h3 className="text-xs font-semibold text-white/90 uppercase tracking-[0.2em] mb-8">Expertise</h3>
            <ul className="space-y-4 text-sm font-light">
              <li>
                <a href="/services/buy" className="text-white/50 hover:text-white transition-colors inline-flex items-center gap-2 group">
                  Buy Watches <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
                </a>
              </li>
              <li>
                <a href="/services/sell" className="text-white/50 hover:text-white transition-colors inline-flex items-center gap-2 group">
                  Sell Watches <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
                </a>
              </li>
              <li>
                <a href="/services/trade" className="text-white/50 hover:text-white transition-colors inline-flex items-center gap-2 group">
                  Trade Watches <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
                </a>
              </li>
            </ul>
          </div>
          
          {/* Column 4: Contact Info */}
          <div className="lg:col-span-3 lg:col-start-10">
            <h3 className="text-xs font-semibold text-white/90 uppercase tracking-[0.2em] mb-8">Contact Us</h3>
            <ul className="space-y-5 text-sm font-light">
              <li>
                <a 
                  href="tel:+17328329938" 
                  className="flex items-center gap-4 text-white/50 hover:text-white transition-colors group"
                >
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-blue-600 transition-colors">
                    <Phone className="w-4 h-4" />
                  </div>
                  +1 (732) 832-9938
                </a>
              </li>
              <li>
                <a 
                  href="mailto:info@chronotrust.io" 
                  className="flex items-center gap-4 text-white/50 hover:text-white transition-colors group"
                >
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-blue-600 transition-colors">
                    <Mail className="w-4 h-4" />
                  </div>
                  info@chronotrust.io
                </a>
              </li>
              <li className="flex items-center gap-4 text-white/50 group">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <span>Premium Showroom<br/>New York, NY</span>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Bottom Footer */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-light text-white/40 uppercase tracking-widest">
          <p>
            &copy; {new Date().getFullYear()} ChronoTrust. All Rights Reserved.
          </p>
          <div className="flex gap-6">
            <a href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="/terms" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
