"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, User, ShoppingBag, ChevronDown, Menu, X, ArrowRight } from 'lucide-react';
import { usePathname } from 'next/navigation';

interface HeaderProps {
  cartCount?: number;
  onOpenCart?: () => void;
  onOpenSearch?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount = 2,
  onOpenCart,
  onOpenSearch,
}) => {
  const pathname = usePathname();
  const isHomePage = pathname === '/';
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isPastTopBanner, setIsPastTopBanner] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Use a ref instead of state so the effect doesn't re-run on every scroll tick
  const lastScrollY = useRef(0);

  // Smart Hide on Scroll Down, Reveal on Scroll Up
  useEffect(() => {
    if (!isHomePage) {
      return;
    }

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Check if scrolled past top banner (40px)
      setIsPastTopBanner(currentScrollY > 40);

      // Check if scrolled past top threshold for glassmorphic styling
      setIsScrolled(currentScrollY > 20);

      // Hide header when scrolling down, reveal when scrolling up
      if (currentScrollY > 120) {
        if (currentScrollY > lastScrollY.current && currentScrollY - lastScrollY.current > 5) {
          // Scrolling down -> smoothly hide
          setIsVisible(false);
          setActiveDropdown(null);
        } else if (lastScrollY.current - currentScrollY > 5) {
          // Scrolling up -> smoothly reappear
          setIsVisible(true);
        }
      } else {
        setIsVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHomePage]);

  const headerPosition = isHomePage
    ? isPastTopBanner ? 'top-0' : 'top-[var(--announcement-height)]'
    : 'top-0';
  const headerAppearance = isHomePage
    ? isScrolled
      ? 'bg-neutral-950/35 backdrop-blur-sm border-b border-white/[0.08] py-3.5'
      : 'bg-black/10 backdrop-blur-[2px] border-b border-white/[0.06] py-4 sm:py-5'
    : 'bg-white border-b border-neutral-200 py-3.5 shadow-sm';

  const navItems = [
    { label: 'Home', href: '#home', hasDropdown: false },
    {
      label: 'Handbags',
      href: '#handbags',
      hasDropdown: true,
      items: [
        { name: 'Tote Bags', badge: 'Hot', href: '#totes' },
        { name: 'Shoulder Bags', href: '#shoulder' },
        { name: 'Crossbody Bags', href: '#crossbody' },
        { name: 'Clutches & Evening', badge: 'New', href: '#clutches' },
        { name: 'Mini & Micro Bags', href: '#mini' },
        { name: 'Leather Care & Straps', href: '#accessories' },
      ],
    },
    {
      label: 'Jewelries',
      href: '#jewelries',
      hasDropdown: true,
      items: [
        { name: 'Necklaces & Pendants', badge: 'Editorial', href: '#necklaces' },
        { name: 'Earrings & Studs', href: '#earrings' },
        { name: 'Rings & Stackables', href: '#rings' },
        { name: 'Bracelets & Bangles', href: '#bracelets' },
        { name: 'Anklets & Body Chains', href: '#anklets' },
        { name: 'Bridal & Fine Gold', href: '#bridal' },
      ],
    },
    {
      label: 'Abayas',
      href: '#abayas',
      hasDropdown: true,
      items: [
        { name: 'Classic Black Abayas', href: '#classic' },
        { name: 'Embroidered & Embellished', badge: 'New', href: '#embroidered' },
        { name: 'Open-Front & Cardigan Styles', href: '#open-front' },
        { name: 'Pastel & Neutral Tones', href: '#pastel' },
        { name: 'Prayer & Travel Abayas', href: '#prayer' },
        { name: 'Matching Hijabs & Scarves', href: '#hijabs' },
      ],
    },
    { label: 'About', href: '#about', hasDropdown: false },
    { label: 'Track Order', href: '#track-order', hasDropdown: false },
    { label: 'Contact', href: '#contact', hasDropdown: false },
  ];

  return (
    <motion.header
      initial={{ y: 0 }}
      animate={{ y: isHomePage && !isVisible ? -100 : 0 }}
      transition={{
        duration: 0.35,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={`fixed ${headerPosition} left-0 right-0 z-40 transition-all duration-300 ${headerAppearance}`}
    >
      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-[98px] flex items-center justify-between">

        {/* 1. BRAND LOGO: "King" with Crown Icon atop K */}
        <motion.a
          href="#home"
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex items-center gap-1.5 group select-none cursor-pointer"
        >
          <div className="relative inline-flex items-center">
            {/* Crown Icon floating gracefully over the 'K' */}
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-4 h-4 text-amber-200/90 absolute -top-2.5 -left-0.5 group-hover:scale-110 transition-transform duration-300"
              aria-hidden="true"
            >
              <path d="M5 16L3 5l5.5 5L12 4l3.5 6L21 5l-2 11H5zm14 3c0 .6-.4 1-1 1H6c-.6 0-1-.4-1-1v-1h14v1z" />
            </svg>
            {/* Logo Typography matching reference */}
            <span className={`font-heading text-2xl sm:text-3xl font-bold tracking-tight ${isHomePage ? 'text-white drop-shadow-sm' : 'text-neutral-950'}`}>
              King
            </span>
          </div>
        </motion.a>

        {/* 2. CENTER NAVIGATION */}
        <nav className={`hidden md:flex items-center gap-6 lg:gap-8 text-xs lg:text-sm font-medium ${isHomePage ? 'text-white/90' : 'text-neutral-950'}`}>
          {navItems.map((item, idx) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.15 + idx * 0.05 }}
              className="relative"
              onMouseEnter={() => item.hasDropdown && setActiveDropdown(item.label)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <a
                href={item.href}
                className={`flex items-center gap-1 transition-all py-1 cursor-pointer ${
                  activeDropdown === item.label
                    ? isHomePage ? 'text-white font-semibold drop-shadow-md' : 'text-neutral-950 font-semibold'
                    : isHomePage ? 'text-white/85 hover:text-white' : 'text-neutral-700 hover:text-black'
                }`}
              >
                <span>{item.label}</span>
                {item.hasDropdown && (
                  <ChevronDown
                    className={`w-3.5 h-3.5 opacity-80 transition-transform duration-200 ${
                      activeDropdown === item.label ? 'rotate-180 text-white' : ''
                    }`}
                  />
                )}
              </a>

              {/* Dropdown Popover */}
              <AnimatePresence>
                {item.hasDropdown && activeDropdown === item.label && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.98 }}
                    transition={{ duration: 0.18, ease: 'easeOut' }}
                    className="absolute top-full left-1/2 -translate-x-1/2 pt-2 z-50 w-56"
                  >
                    <div className={`${isHomePage ? 'bg-neutral-950/75 backdrop-blur-md border-white/10 divide-white/5' : 'bg-white border-neutral-200 divide-neutral-100'} border rounded-xl p-2 shadow-xl overflow-hidden`}>
                      <div className="py-1 space-y-0.5">
                        {item.items?.map((subItem) => (
                          <a
                            key={subItem.name}
                            href={subItem.href}
                            className={`flex items-center justify-between px-3 py-2 text-xs rounded-lg transition-colors group ${isHomePage ? 'text-neutral-200 hover:text-white hover:bg-white/10' : 'text-neutral-700 hover:text-black hover:bg-neutral-100'}`}
                          >
                            <span>{subItem.name}</span>
                            {subItem.badge ? (
                              <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-amber-400/20 text-amber-200 border border-amber-400/30">
                                {subItem.badge}
                              </span>
                            ) : (
                              <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                            )}
                          </a>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </nav>

        {/* 3. RIGHT ICONS: Search, Account, Shopping Bag */}
        <motion.div
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className={`flex items-center gap-3 sm:gap-4 ${isHomePage ? 'text-white/90' : 'text-neutral-950'}`}
        >
          {/* Search */}
          <button
            type="button"
            onClick={onOpenSearch}
            className={`p-1.5 hover:scale-105 active:scale-95 transition-all cursor-pointer rounded-full ${isHomePage ? 'hover:text-white hover:bg-white/10' : 'hover:text-neutral-600 hover:bg-neutral-100'}`}
            title="Search collection"
            aria-label="Search"
          >
            <Search className="w-[18px] h-[18px] stroke-[1.8]" />
          </button>

          

          {/* Shopping Bag */}
          <button
            type="button"
            onClick={onOpenCart}
            className={`relative p-1.5 hover:scale-105 active:scale-95 transition-all cursor-pointer rounded-full ${isHomePage ? 'hover:text-white hover:bg-white/10' : 'hover:text-neutral-600 hover:bg-neutral-100'}`}
            title="Shopping Bag"
            aria-label="Bag"
          >
            <ShoppingBag className="w-[18px] h-[18px] stroke-[1.8]" />
            {cartCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 min-w-[17px] h-[17px] px-1 bg-white text-neutral-950 font-bold text-[9.5px] rounded-full flex items-center justify-center shadow-md">
                {cartCount}
              </span>
            )}
          </button>

          {/* Profile / User */}
          <button
            type="button"
            className={`p-1.5 hover:scale-105 active:scale-95 transition-all cursor-pointer rounded-full ${isHomePage ? 'hover:text-white hover:bg-white/10' : 'hover:text-neutral-600 hover:bg-neutral-100'}`}
            title="My Account"
            aria-label="Account"
          >
            <User className="w-[18px] h-[18px] stroke-[1.8]" />
          </button>

          {/* Mobile Hamburger Menu */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`md:hidden p-1.5 transition-colors cursor-pointer rounded-lg ${isHomePage ? 'hover:text-white hover:bg-white/10' : 'hover:text-neutral-600 hover:bg-neutral-100'}`}
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </motion.div>

      </div>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className={`md:hidden border-t px-4 sm:px-6 md:px-8 py-5 space-y-4 ${isHomePage ? 'border-white/10 bg-neutral-950/85 backdrop-blur-md' : 'border-neutral-200 bg-white'}`}
          >
            {navItems.map((item) => (
              <div key={item.label} className="space-y-2">
                <a
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block font-medium text-sm transition-colors ${isHomePage ? 'text-white hover:text-amber-200' : 'text-neutral-950 hover:text-neutral-500'}`}
                >
                  {item.label}
                </a>
                {item.hasDropdown && (
                  <div className={`pl-3 border-l space-y-1.5 ${isHomePage ? 'border-white/10' : 'border-neutral-200'}`}>
                    {item.items?.map((sub) => (
                      <a
                        key={sub.name}
                        href={sub.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`block text-xs transition-colors ${isHomePage ? 'text-neutral-400 hover:text-white' : 'text-neutral-500 hover:text-black'}`}
                      >
                        {sub.name}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};