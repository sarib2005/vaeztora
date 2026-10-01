"use client";

import React, { useRef, useState } from 'react';
import Link from 'next/link';
import { motion, type Variants } from 'framer-motion';
import { ArrowLeft, ArrowRight, ShoppingBag, Check } from 'lucide-react';
import { PRODUCTS, formatPrice } from '@/data/product';

interface TrendingForHerProps {
  onAddToCart?: () => void;
  onViewAll?: () => void;
}

const EASE_SMOOTH = [0.16, 1, 0.3, 1] as const;

const sectionVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};

const headerVariants: Variants = {
  hidden: { y: 24 },
  visible: { y: 0, transition: { duration: 0.7, ease: EASE_SMOOTH } },
};

const carouselVariants: Variants = {
  hidden: { y: 30 },
  visible: { y: 0, transition: { duration: 0.8, ease: EASE_SMOOTH } },
};

export const TrendingHandbags: React.FC<TrendingForHerProps> = ({ onAddToCart, onViewAll }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [addedId, setAddedId] = useState<number | null>(null);

  const scroll = (direction: 'left' | 'right') => {
    scrollContainerRef.current?.scrollBy({
      left: direction === 'left' ? -340 : 340,
      behavior: 'smooth',
    });
  };

  const handleAddToCart = (id: number) => {
    if (onAddToCart) onAddToCart();
    setAddedId(id);
    setTimeout(() => setAddedId(null), 1400);
  };

  return (
    <section className="w-full bg-[#f9f9fb] py-18 sm:py-12 select-none transition-colors">
      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        className="w-full px-4 sm:px-6 md:px-8 lg:px-[98px] space-y-8 sm:space-y-10"
      >
        {/* Header Bar */}
        <motion.div
          variants={headerVariants}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-5"
        >
          <div className="space-y-2 max-w-xl">
            <h2 className="font-heading text-3xl sm:text-5xl font-bold tracking-tight text-neutral-950">
              Trending Handbags
            </h2>
            <p className="text-neutral-500 text-xs sm:text-sm font-sans leading-relaxed">
              Discover this season&apos;s most-loved handbags — crafted silhouettes, rich textures,
              and everyday elegance in one edit.
            </p>
          </div>

          <div className="flex items-center gap-2.5 self-start sm:self-auto shrink-0">
            <button
              type="button"
              onClick={onViewAll}
              className="h-10 px-4 rounded-xl bg-black text-white hover:bg-neutral-800 text-xs font-semibold tracking-wide flex items-center gap-2 transition-all active:scale-95 cursor-pointer shadow-2xs"
              title="View all handbags"
              aria-label="View all handbags"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <span className="w-px h-6 bg-neutral-300/70 mx-0.5" aria-hidden="true" />

            <button
              type="button"
              onClick={() => scroll('left')}
              className="w-10 h-10 rounded-xl bg-neutral-200/80 hover:bg-neutral-300/80 text-neutral-800 flex items-center justify-center transition-all active:scale-95 cursor-pointer shadow-2xs"
              title="Previous products"
              aria-label="Previous products"
            >
              <ArrowLeft className="w-[18px] h-[18px]" />
            </button>
            <button
              type="button"
              onClick={() => scroll('right')}
              className="w-10 h-10 rounded-xl bg-neutral-200/80 hover:bg-neutral-300/80 text-neutral-800 flex items-center justify-center transition-all active:scale-95 cursor-pointer shadow-2xs"
              title="Next products"
              aria-label="Next products"
            >
              <ArrowRight className="w-[18px] h-[18px]" />
            </button>
          </div>
        </motion.div>

        {/* Carousel Scroll Area */}
        <motion.div
          variants={carouselVariants}
          ref={scrollContainerRef}
          className="flex items-stretch gap-6 overflow-x-auto scrollbar-none pb-4 pt-1 snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {PRODUCTS.map((product, idx) => (
            <motion.div
              key={product.id}
              initial={{ y: 26 }}
              whileInView={{
                y: 0,
                transition: { duration: 0.65, ease: EASE_SMOOTH, delay: idx * 0.06 },
              }}
              viewport={{ once: true, amount: 0.2 }}
              className="relative min-w-[280px] sm:min-w-[305px] max-w-[320px] flex flex-col justify-between snap-start group"
            >
              {/* Stretched link: whole card opens the product page.
                  Buttons sit above it with a higher z-index. */}
              <Link
                href={`/products/${product.slug}`}
                aria-label={`View ${product.title}`}
                className="absolute inset-0 z-[5] rounded-[28px] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black"
              />

              {/* Product Image Frame */}
              <div className="relative aspect-[3/3.8] rounded-[28px] overflow-hidden bg-[#e6e8ec] mb-3.5 shadow-xs border border-black/5">
                <img
                  src={product.image}
                  alt={product.title}
                  className="absolute inset-0 w-full h-full object-cover object-center transition-all duration-700 ease-out group-hover:opacity-0 group-hover:scale-106"
                />
                <img
                  src={product.hoverImage}
                  alt={`${product.title} alternate angle`}
                  className="absolute inset-0 w-full h-full object-cover object-center opacity-0 transition-all duration-700 ease-out group-hover:opacity-100 group-hover:scale-104"
                />

                <div className="absolute inset-0 bg-radial from-transparent to-black/5 pointer-events-none" />

                <span className="absolute top-3.5 left-3.5 z-10 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md text-[10px] uppercase font-mono tracking-widest text-neutral-700 shadow-sm pointer-events-none">
                  {product.category}
                </span>

                <button
                  type="button"
                  onClick={() => handleAddToCart(product.id)}
                  className="absolute inset-x-3 bottom-3 z-10 py-3 rounded-full bg-white/95 backdrop-blur-md text-neutral-950 text-xs font-semibold shadow-lg opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 focus-visible:opacity-100 focus-visible:translate-y-0 transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer hover:bg-white"
                >
                  {addedId === product.id ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-500" />
                      <span>Added to Bag!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Add to Bag</span>
                    </>
                  )}
                </button>
              </div>

              {/* Product Info Row */}
              <div className="flex items-center justify-between gap-2 px-1">
                <div className="space-y-0.5 min-w-0">
                  <h3 className="text-xs sm:text-[13px] font-medium text-neutral-800 truncate">
                    {product.title}
                  </h3>
                  <div className="text-xs sm:text-[13px] font-bold text-neutral-950 font-sans tracking-tight">
                    From {formatPrice(product.price)}
                  </div>
                  <div className="flex items-center gap-1.5 pt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                    <span className="text-[11px] text-emerald-600 font-medium">In stock</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleAddToCart(product.id)}
                  className="relative z-10 w-9 h-9 rounded-full bg-black text-white flex items-center justify-center hover:bg-neutral-800 hover:scale-105 active:scale-95 transition-all shadow-xs shrink-0 cursor-pointer"
                  title="Add to Bag"
                  aria-label={`Add ${product.title} to bag`}
                >
                  {addedId === product.id ? (
                    <Check className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <ShoppingBag className="w-4 h-4" />
                  )}
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};