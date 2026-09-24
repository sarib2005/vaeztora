"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, ArrowUpRight, Package, ShieldCheck, RefreshCw, Headphones } from 'lucide-react';

interface SlideData {
  id: number;
  image: string;
  badge?: string;
  titleLine1: string;
  titleLine2: string;
  subtitle: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
}

const HERO_SLIDES: SlideData[] = [
  {
    id: 1,
    // Golden hour sunlight fashion editorial with models in clean white shirts and tops
    image: '/images/homeimgs/slide1.png',
    titleLine1: 'Your Signature Style',
    titleLine2: 'Right Starts Here',
    subtitle: 'Refresh your wardrobe with elevated everyday essentials.',
    primaryCta: { label: 'WOMEN', href: '#women' },
    secondaryCta: { label: 'VIEW ALL', href: '#all' },
  },
  {
    id: 2,
    // Elegant warm light linen & desert luxury fashion aesthetic
    image: '/images/homeimgs/slide2.png',
    titleLine1: 'Pure Textures,',
    titleLine2: 'Effortless Form',
    subtitle: 'Crafted from breathable organic linen and hand-spun mulberry silk.',
    primaryCta: { label: 'NEW IN', href: '#new-in' },
    secondaryCta: { label: 'COLLECTIONS', href: '#collections' },
  },
  {
    id: 3,
    // Modern architectural tailoring in golden sun
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=2400&q=85',
    titleLine1: 'Summer Capsule',
    titleLine2: 'Edition 2026',
    subtitle: 'Thoughtfully designed silhouettes that transition from dawn to dusk.',
    primaryCta: { label: 'DISCOVER', href: '#discover' },
    secondaryCta: { label: 'LOOKBOOK', href: '#lookbook' },
  },
];

export const Hero: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const slide = HERO_SLIDES[currentSlide];

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentSlide((prev) => {
      let next = prev + newDirection;
      if (next < 0) next = HERO_SLIDES.length - 1;
      if (next >= HERO_SLIDES.length) next = 0;
      return next;
    });
  };

  // Keyboard navigation support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') paginate(-1);
      if (e.key === 'ArrowRight') paginate(1);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? '100%' : '-100%',
      opacity: 0,
      scale: 1.05,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: 'spring' as const, stiffness: 280, damping: 32 },
        opacity: { duration: 0.5 },
        scale: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
      },
    },
    exit: (dir: number) => ({
      x: dir < 0 ? '100%' : '-100%',
      opacity: 0,
      scale: 0.98,
      transition: {
        x: { type: 'spring' as const, stiffness: 280, damping: 32 },
        opacity: { duration: 0.4 },
      },
    }),
  };

  return (
    <section className="relative w-full min-h-screen flex flex-col justify-between overflow-hidden bg-neutral-950 text-white select-none">
      
      {/* 1. SLIDESHOW BACKGROUND CAROUSEL WITH DRAG/SWIPE SUPPORT */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentSlide}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.25}
            onDragStart={() => setIsDragging(true)}
            onDragEnd={(_, info) => {
              setIsDragging(false);
              const swipeThreshold = 50;
              if (info.offset.x < -swipeThreshold) {
                paginate(1);
              } else if (info.offset.x > swipeThreshold) {
                paginate(-1);
              }
            }}
            className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing touch-pan-y"
          >
            {/* Background High-Res Image */}
            <img
              src={slide.image}
              alt="Editorial fashion models"
              className="w-full h-full object-cover object-[center_28%] pointer-events-none"
            />

            {/* Cinematic Gradient Overlays to match the warm golden sunset ambiance */}
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-black/35 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/20 to-transparent pointer-events-none" />
            <div className="absolute inset-0 bg-amber-900/10 mix-blend-color pointer-events-none" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* 2. HERO CONTENT OVERLAY (Centered / Left Aligned) */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-36 sm:pt-44 lg:pt-48 pb-20 flex-1 flex flex-col justify-end">
        <div className="max-w-2xl space-y-6">
          
          {/* Animated Headline: Exactly matching reference */}
          <div className="space-y-1 sm:space-y-2">
            <motion.h1
              key={`title-${currentSlide}`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="font-heading text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.08] drop-shadow-md"
            >
              <span className="block">{slide.titleLine1}</span>
              <span className="block">{slide.titleLine2}</span>
            </motion.h1>
          </div>

          {/* Subtitle */}
          <motion.p
            key={`subtitle-${currentSlide}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.28, ease: 'easeOut' }}
            className="text-white/90 text-sm sm:text-base lg:text-lg max-w-lg font-normal drop-shadow-sm"
          >
            {slide.subtitle}
          </motion.p>

          {/* Call to Action Pill Buttons */}
          <motion.div
            key={`cta-${currentSlide}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.38, ease: 'easeOut' }}
            className="flex flex-wrap items-center gap-3.5 pt-2"
          >
            {/* Button 1: WOMEN */}
            <a
              href={slide.primaryCta.href}
              className="group inline-flex items-center gap-3 px-5 sm:px-6 py-3 rounded-full bg-white text-neutral-950 font-semibold text-xs sm:text-sm tracking-wider uppercase shadow-xl hover:bg-neutral-100 transition-all duration-200 hover:scale-[1.02] active:scale-95 cursor-pointer"
            >
              <span className="w-5 h-5 rounded-full border border-neutral-950/30 flex items-center justify-center group-hover:border-neutral-950 transition-colors">
                <ArrowRight className="w-3 h-3 text-neutral-950 group-hover:translate-x-0.5 transition-transform" />
              </span>
              <span>{slide.primaryCta.label}</span>
            </a>

            {/* Button 2: VIEW ALL */}
            <a
              href={slide.secondaryCta.href}
              className="group inline-flex items-center gap-3 px-5 sm:px-6 py-3 rounded-full bg-white text-neutral-950 font-semibold text-xs sm:text-sm tracking-wider uppercase shadow-xl hover:bg-neutral-100 transition-all duration-200 hover:scale-[1.02] active:scale-95 cursor-pointer"
            >
              <span className="w-5 h-5 rounded-full border border-neutral-950/30 flex items-center justify-center group-hover:border-neutral-950 transition-colors">
                <ArrowRight className="w-3 h-3 text-neutral-950 group-hover:translate-x-0.5 transition-transform" />
              </span>
              <span>{slide.secondaryCta.label}</span>
            </a>
          </motion.div>

        </div>
      </div>

      {/* 3. CAROUSEL NAVIGATION ARROWS (Bottom Right - Exactly as in the screenshot) */}
      <div className="absolute right-6 sm:right-10 lg:right-16 bottom-28 sm:bottom-32 z-30 flex items-center gap-3">
        {/* Left Arrow Button (Pill with rounded corners) */}
        <motion.button
          type="button"
          onClick={() => paginate(-1)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.94 }}
          className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-white/95 text-neutral-900 shadow-2xl flex items-center justify-center hover:bg-white transition-all cursor-pointer group"
          title="Previous Slide"
          aria-label="Previous Slide"
        >
          {/* Curved/clean left arrow matching screenshot */}
          <ArrowLeft className="w-4.5 h-4.5 text-neutral-800 group-hover:-translate-x-0.5 transition-transform" />
        </motion.button>

        {/* Right Arrow Button (Pill with rounded corners) */}
        <motion.button
          type="button"
          onClick={() => paginate(1)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.94 }}
          className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-white/95 text-neutral-900 shadow-2xl flex items-center justify-center hover:bg-white transition-all cursor-pointer group"
          title="Next Slide"
          aria-label="Next Slide"
        >
          {/* Curved/clean right arrow matching screenshot */}
          <ArrowRight className="w-4.5 h-4.5 text-neutral-800 group-hover:translate-x-0.5 transition-transform" />
        </motion.button>
      </div>

      {/* 4. GLASSMORPHIC BOTTOM FEATURE DOCK (Docked across the entire bottom of the hero) */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.45, ease: 'easeOut' }}
        className="relative z-30 w-full bg-neutral-950/40 backdrop-blur-xl border-t border-white/10"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            
            {/* Feature 1: Fast & Free Shipping */}
            <div className="flex items-start gap-3.5 group">
              <div className="w-10 h-10 rounded-lg bg-amber-950/40 border border-amber-600/30 text-amber-200 flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-105 group-hover:border-amber-500/50 transition-all duration-300">
                <Package className="w-5 h-5 stroke-[1.7]" />
              </div>
              <div className="space-y-0.5">
                <h3 className="font-heading font-semibold text-sm text-white tracking-tight">
                  Fast & Free Shipping
                </h3>
                <p className="text-xs text-white/70 leading-relaxed">
                  We deliver your favorite styles fast, with free shipping on eligible orders.
                </p>
              </div>
            </div>

            {/* Feature 2: 100% Secure */}
            <div className="flex items-start gap-3.5 group">
              <div className="w-10 h-10 rounded-lg bg-amber-950/40 border border-amber-600/30 text-amber-200 flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-105 group-hover:border-amber-500/50 transition-all duration-300">
                <ShieldCheck className="w-5 h-5 stroke-[1.7]" />
              </div>
              <div className="space-y-0.5">
                <h3 className="font-heading font-semibold text-sm text-white tracking-tight">
                  100% Secure
                </h3>
                <p className="text-xs text-white/70 leading-relaxed">
                  Pay with confidence through secure, encrypted, & trusted payments.
                </p>
              </div>
            </div>

            {/* Feature 3: Returns & Exchanges */}
            <div className="flex items-start gap-3.5 group">
              <div className="w-10 h-10 rounded-lg bg-amber-950/40 border border-amber-600/30 text-amber-200 flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-105 group-hover:border-amber-500/50 transition-all duration-300">
                <RefreshCw className="w-5 h-5 stroke-[1.7]" />
              </div>
              <div className="space-y-0.5">
                <h3 className="font-heading font-semibold text-sm text-white tracking-tight">
                  Returns & Exchanges
                </h3>
                <p className="text-xs text-white/70 leading-relaxed">
                  We make returns & exchanges quick, easy, & convenient for your peace.
                </p>
              </div>
            </div>

            {/* Feature 4: Our Premium Support */}
            <div className="flex items-start gap-3.5 group">
              <div className="w-10 h-10 rounded-lg bg-amber-950/40 border border-amber-600/30 text-amber-200 flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-105 group-hover:border-amber-500/50 transition-all duration-300">
                <Headphones className="w-5 h-5 stroke-[1.7]" />
              </div>
              <div className="space-y-0.5">
                <h3 className="font-heading font-semibold text-sm text-white tracking-tight">
                  Our Premium Support
                </h3>
                <p className="text-xs text-white/70 leading-relaxed">
                  Our premium support team is always here to help for any query.
                </p>
              </div>
            </div>

          </div>
        </div>
      </motion.div>

    </section>
  );
};
