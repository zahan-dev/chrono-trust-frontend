'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ShoppingBag, User, Menu, X, Search } from 'lucide-react';
import { useState } from 'react';
import { useCartItemCount } from '@/hooks/useCart';
import { useAuth } from '@/hooks/useAuth';

export function ShopHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const cartCount = useCartItemCount();
  const { user, isAdmin, logout } = useAuth();

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-slate-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="flex items-center justify-between h-16 gap-4">
          <Link href="/" className="shrink-0">
            <Image src="/logo.png" alt="ChronoTrust" width={140} height={36} className="h-9 w-auto object-contain" />
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-xs font-semibold tracking-widest uppercase text-slate-600">
            <Link href="/collection" className="hover:text-primary transition-colors">Collection</Link>
            <Link href="/#services" className="hover:text-primary transition-colors">Services</Link>
            <Link href="/#faq-contact" className="hover:text-primary transition-colors">Contact</Link>
            {isAdmin && (
              <Link href="/admin" className="text-primary hover:text-primary/70 transition-colors">Admin</Link>
            )}
          </nav>

          <div className="flex items-center gap-3">
            <Link href="/collection?search=true" className="p-2 rounded-full text-slate-500 hover:text-primary hover:bg-slate-50 transition-colors">
              <Search className="w-4.5 h-4.5" />
            </Link>

            <Link href="/cart" className="relative p-2 rounded-full text-slate-500 hover:text-primary hover:bg-slate-50 transition-colors">
              <ShoppingBag className="w-4.5 h-4.5" />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-primary text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                  {cartCount > 9 ? '9+' : cartCount}
                </span>
              )}
            </Link>

            {user ? (
              <div className="relative group">
                <button className="flex items-center gap-2 p-1.5 rounded-full text-slate-600 hover:text-primary hover:bg-slate-50 transition-colors">
                  <div className="w-7 h-7 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                </button>
                <div className="absolute right-0 top-full mt-1 w-44 bg-white border border-slate-100 rounded-xl shadow-lg overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <div className="px-4 py-3 border-b border-slate-100">
                    <p className="text-xs font-semibold text-slate-800 truncate">{user.name}</p>
                    <p className="text-[10px] text-slate-400 truncate">{user.email}</p>
                  </div>
                  <Link href="/account" className="block px-4 py-2.5 text-xs text-slate-600 hover:bg-slate-50 hover:text-primary transition-colors">My Account</Link>
                  {isAdmin && <Link href="/admin" className="block px-4 py-2.5 text-xs text-primary font-semibold hover:bg-slate-50 transition-colors">Admin Panel</Link>}
                  <button onClick={logout} className="w-full text-left px-4 py-2.5 text-xs text-red-500 hover:bg-red-50 transition-colors border-t border-slate-100">
                    Sign Out
                  </button>
                </div>
              </div>
            ) : (
              <Link href="/account" className="p-2 rounded-full text-slate-500 hover:text-primary hover:bg-slate-50 transition-colors">
                <User className="w-4.5 h-4.5" />
              </Link>
            )}

            <button
              className="md:hidden p-2 rounded-full text-slate-500 hover:text-primary hover:bg-slate-50 transition-colors"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden border-t border-slate-100 bg-white px-6 py-6 flex flex-col gap-5">
          {[
            { href: '/collection', label: 'Collection' },
            { href: '/#services', label: 'Services' },
            { href: '/#faq-contact', label: 'Contact' },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-semibold tracking-widest uppercase text-slate-700 hover:text-primary transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          {isAdmin && (
            <Link href="/admin" className="text-sm font-semibold tracking-widest uppercase text-primary" onClick={() => setMenuOpen(false)}>
              Admin Panel
            </Link>
          )}
        </div>
      )}
    </header>
  );
}
