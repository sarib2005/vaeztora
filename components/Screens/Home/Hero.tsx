"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { ArrowRight, ArrowLeft, Package, ShieldCheck, RefreshCw, Headphones } from 'lucide-react';

interface SlideData {
  id: number;
  image: string;
  titleLine1: string;
  titleLine2: string;
  subtitle: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
}

const HERO_SLIDES: SlideData[] = [
  {
    id: 1,
    image: '/images/homeimgs/slide1.png',
    titleLine1: 'Your Signature Style',
    titleLine2: 'Right Starts Here',
    subtitle: 'Refresh your wardrobe with elevated everyday essentials.',
    primaryCta: { label: 'WOMEN', href: '#women' },
    secondaryCta: { label: 'VIEW ALL', href: '#all' },
  },
  {
    id: 2,
    image: '/images/homeimgs/slide2.png',
    titleLine1: 'Pure Textures,',
    titleLine2: 'Effortless Form',
    subtitle: 'Crafted from breathable organic linen and hand-spun mulberry silk.',
    primaryCta: { label: 'NEW IN', href: '#new-in' },
    secondaryCta: { label: 'COLLECTIONS', href: '#collections' },
  },
];

const EASE_SMOOTH = [0.16, 1, 0.3, 1] as const;

export const Hero: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);

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

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        setDirection(-1);
        setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
      }
      if (e.key === 'ArrowRight') {
        setDirection(1);
        setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Pure horizontal slide — no opacity, no scale, no fade
  const slideVariants: Variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? '100%' : '-100%',
    }),
    center: {
      x: 0,
      transition: {
        x: { type: 'spring', stiffness: 210, damping: 30, mass: 1 },
      },
    },
    exit: (dir: number) => ({
      x: dir < 0 ? '100%' : '-100%',
      transition: {
        x: { type: 'spring', stiffness: 210, damping: 30, mass: 1 },
      },
    }),
  };

  // Content entrance — no opacity on the wrapper, just a subtle y-lift per item
  const contentItemVariants: Variants = {
    hidden: { y: 18 },
    visible: {
      y: 0,
      transition: { duration: 0.7, ease: EASE_SMOOTH },
    },
  };

  return (
    <section className="relative w-full min-h-screen flex flex-col justify-between overflow-hidden bg-neutral-950 text-white select-none">

      {/* 1. SLIDESHOW BACKGROUND — pure slide, no fade */}
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
            dragElastic={0.15}
            onDragEnd={(_, info) => {
              const swipeThreshold = 60;
              const velocity = info.velocity.x;
              if (info.offset.x < -swipeThreshold || velocity < -500) {
                paginate(1);
              } else if (info.offset.x > swipeThreshold || velocity > 500) {
                paginate(-1);
              }
            }}
            className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing touch-pan-y will-change-transform"
          >
            <img
              src={slide.image}
              alt="Editorial fashion models"
              className="w-full h-full object-cover object-[center_28%] pointer-events-none"
              draggable={false}
            />
          </motion.div>
        </AnimatePresence>

        {/* Single subtle gradient for text legibility — sits behind everything */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent pointer-events-none" />
      </div>

      {/* 2. HERO CONTENT — width matches topbar */}
      <div className="relative z-20 w-full px-4 sm:px-6 md:px-8 lg:px-[98px] pt-36 sm:pt-44 lg:pt-48 pb-20 flex-1 flex flex-col justify-end">
        <AnimatePresence mode="wait">
          <motion.div
            key={`content-${currentSlide}`}
            className="max-w-2xl space-y-6"
          >
            <motion.h1
              variants={contentItemVariants}
              initial="hidden"
              animate="visible"
              className="font-heading text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.08] drop-shadow-md"
            >
              <span className="block">{slide.titleLine1}</span>
              <span className="block">{slide.titleLine2}</span>
            </motion.h1>

            <motion.p
              variants={contentItemVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.08 }}
              className="text-white/90 text-sm sm:text-base lg:text-lg max-w-lg font-normal drop-shadow-sm"
            >
              {slide.subtitle}
            </motion.p>

            <motion.div
              variants={contentItemVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.16 }}
              className="flex flex-wrap items-center gap-3.5 pt-2"
            >
              <a
                href={slide.primaryCta.href}
                className="group inline-flex items-center gap-3 px-5 sm:px-6 py-3 rounded-full bg-white text-neutral-950 font-semibold text-xs sm:text-sm tracking-wider uppercase shadow-xl hover:bg-neutral-100 transition-all duration-200 hover:scale-[1.02] active:scale-95 cursor-pointer"
              >
                <span className="w-5 h-5 rounded-full border border-neutral-950/30 flex items-center justify-center group-hover:border-neutral-950 transition-colors">
                  <ArrowRight className="w-3 h-3 text-neutral-950 group-hover:translate-x-0.5 transition-transform" />
                </span>
                <span>{slide.primaryCta.label}</span>
              </a>

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
          </motion.div>
        </AnimatePresence>
      </div>

      {/* 3. NAVIGATION ARROWS — aligned to topbar padding */}
      <div className="absolute right-4 sm:right-6 md:right-8 lg:right-[98px] bottom-28 sm:bottom-32 z-30 flex items-center gap-3">
        <motion.button
          type="button"
          onClick={() => paginate(-1)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.94 }}
          className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-white/95 text-neutral-900 shadow-2xl flex items-center justify-center hover:bg-white transition-all cursor-pointer group"
          title="Previous Slide"
          aria-label="Previous Slide"
        >
          <ArrowLeft className="w-[18px] h-[18px] text-neutral-800 group-hover:-translate-x-0.5 transition-transform" />
        </motion.button>

        <motion.button
          type="button"
          onClick={() => paginate(1)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.94 }}
          className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-white/95 text-neutral-900 shadow-2xl flex items-center justify-center hover:bg-white transition-all cursor-pointer group"
          title="Next Slide"
          aria-label="Next Slide"
        >
          <ArrowRight className="w-[18px] h-[18px] text-neutral-800 group-hover:translate-x-0.5 transition-transform" />
        </motion.button>
      </div>

      {/* 4. TRUST BAR — NO overlay, NO blur, NO background. Just sits over the hero. */}
      <div className="relative z-30 w-full border-t border-white/10">
        <div className="w-full px-4 sm:px-6 md:px-8 lg:px-[98px] py-6 sm:py-7">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">

            {/* Feature 1 */}
            <div className="flex items-start gap-4">
              <div className="w-9 h-9 rounded-full bg-black/25 border border-white/10 text-white flex items-center justify-center shrink-0">
                <Package className="w-5 h-5 stroke-[1.7]" />
              </div>
              <div className="space-y-1">
                <h3 className="font-heading font-semibold text-lg text-white tracking-tight">
                  Fast & Free Shipping
                </h3>
                <p className="text-sm text-white/75 leading-relaxed">
                  We deliver your favorite styles fast, with free shipping on eligible orders.
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="flex items-start gap-4">
              <div className="w-9 h-9 rounded-full bg-black/25 border border-white/10 text-white flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5 stroke-[1.7]" />
              </div>
              <div className="space-y-1">
                <h3 className="font-heading font-semibold text-lg text-white tracking-tight">
                  100% Secure
                </h3>
                <p className="text-sm text-white/75 leading-relaxed">
                  Pay with confidence through secure, encrypted, & trusted payments.
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="flex items-start gap-4">
              <div className="w-9 h-9 rounded-full bg-black/25 border border-white/10 text-white flex items-center justify-center shrink-0">
                <RefreshCw className="w-5 h-5 stroke-[1.7]" />
              </div>
              <div className="space-y-1">
                <h3 className="font-heading font-semibold text-lg text-white tracking-tight">
                  Returns & Exchanges
                </h3>
                <p className="text-sm text-white/75 leading-relaxed">
                  We make returns & exchanges quick, easy, & convenient for your peace.
                </p>
              </div>
            </div>

            {/* Feature 4 */}
            <div className="flex items-start gap-4">
              <div className="w-9 h-9 rounded-full bg-black/25 border border-white/10 text-white flex items-center justify-center shrink-0">
                <Headphones className="w-5 h-5 stroke-[1.7]" />
              </div>
              <div className="space-y-1">
                <h3 className="font-heading font-semibold text-lg text-white tracking-tight">
                  Our Premium Support
                </h3>
                <p className="text-sm text-white/75 leading-relaxed">
                  Our premium support team is always here to help for any query.
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>

    </section>
  );
};