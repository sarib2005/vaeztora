"use client";

import React, { useRef, useState } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { ArrowLeft, ArrowRight, Eye, Check, X, ShoppingBag } from 'lucide-react';

interface TrendingProduct {
  id: number;
  title: string;
  price: string;
  inStock: boolean;
  image: string;
  hoverImage: string;
  category: string;
  sizes: string[];
  description: string;
}

const TRENDING_PRODUCTS: TrendingProduct[] = [
  {
    id: 1,
    title: 'Zip-Up Active Jacket',
    price: 'From Rs. 3,100.00 INR',
    inStock: true,
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=85',
    hoverImage: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1000&q=85',
    category: 'Activewear',
    sizes: ['XS', 'S', 'M', 'L'],
    description: 'High-performance four-way stretch compression jacket with thumbhole cuffs and ergonomic contouring.',
  },
  {
    id: 2,
    title: 'Wrap Waist Top',
    price: 'From Rs. 3,500.00 INR',
    inStock: true,
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=85',
    hoverImage: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1000&q=85',
    category: 'Tops & Blouses',
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'Sophisticated crossover V-neck drape crafted in breathable sandwashed crepe with flattering waist gathering.',
  },
  {
    id: 3,
    title: 'Winter Moto Jacket',
    price: 'From Rs. 4,400.00 INR',
    inStock: true,
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=1000&q=85',
    hoverImage: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1000&q=85',
    category: 'Outerwear',
    sizes: ['XS', 'S', 'M'],
    description: 'Plush faux shearling lined moto jacket featuring oversized notched lapels and brushed metal hardware.',
  },
  {
    id: 4,
    title: 'Stripe Summer Top',
    price: 'From Rs. 2,900.00 INR',
    inStock: true,
    image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1000&q=85',
    hoverImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=1000&q=85',
    category: 'Summer Tops',
    sizes: ['XS', 'S', 'M', 'L'],
    description: 'Delicate fine-stripe camisole with sweet-heart gathered bustline and adjustable skinny shoulder straps.',
  },
  {
    id: 5,
    title: 'Seamless Gym Top',
    price: 'From Rs. 3,200.00 INR',
    inStock: true,
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1000&q=85',
    hoverImage: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=85',
    category: 'Performance',
    sizes: ['S', 'M', 'L'],
    description: 'Ultra-resilient moisture-wicking seamless crop silhouette engineered for freedom of movement and sculpting hold.',
  },
  {
    id: 6,
    title: 'Tailored Linen Blazer',
    price: 'From Rs. 4,900.00 INR',
    inStock: true,
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1000&q=85',
    hoverImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=85',
    category: 'Tailoring',
    sizes: ['S', 'M', 'L'],
    description: 'Unstructured double-breasted silhouette made from 100% Belgian flax linen with horn buttons.',
  },
];

interface TrendingForHerProps {
  onAddToCart?: () => void;
}

const EASE_SMOOTH = [0.16, 1, 0.3, 1] as const;

// Section entrance — header + carousel
const sectionVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.05,
    },
  },
};

const headerVariants: Variants = {
  hidden: { y: 24 },
  visible: {
    y: 0,
    transition: { duration: 0.7, ease: EASE_SMOOTH },
  },
};

const carouselVariants: Variants = {
  hidden: { y: 30 },
  visible: {
    y: 0,
    transition: { duration: 0.8, ease: EASE_SMOOTH },
  },
};

export const Trending: React.FC<TrendingForHerProps> = ({ onAddToCart }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [quickViewProduct, setQuickViewProduct] = useState<TrendingProduct | null>(null);
  const [selectedSize, setSelectedSize] = useState<string>('S');
  const [modalActiveImage, setModalActiveImage] = useState<'primary' | 'hover'>('primary');
  const [isAddedToast, setIsAddedToast] = useState(false);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 340;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const handleQuickAdd = () => {
    if (onAddToCart) onAddToCart();
    setIsAddedToast(true);
    setTimeout(() => {
      setIsAddedToast(false);
      setQuickViewProduct(null);
    }, 1200);
  };

  return (
    <section className="w-full bg-[#f9f9fb] py-18 sm:py-24 select-none transition-colors">
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
              Trending For Her
            </h2>
            <p className="text-neutral-500 text-xs sm:text-sm font-sans leading-relaxed">
              Refresh your wardrobe with trending styles that combine elegance, comfort, and contemporary fashion.
            </p>
          </div>

          <div className="flex items-center gap-2.5 self-start sm:self-auto shrink-0">
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
          {TRENDING_PRODUCTS.map((product, idx) => (
            <motion.div
              key={product.id}
              initial={{ y: 26 }}
              whileInView={{
                y: 0,
                transition: { duration: 0.65, ease: EASE_SMOOTH, delay: idx * 0.06 },
              }}
              viewport={{ once: true, amount: 0.2 }}
              className="min-w-[280px] sm:min-w-[305px] max-w-[320px] flex flex-col justify-between snap-start group"
            >
              {/* Product Image Frame */}
              <div className="relative aspect-[3/3.8] rounded-[28px] overflow-hidden bg-[#e6e8ec] mb-3.5 shadow-xs border border-black/5">
                <img
                  src={product.image}
                  alt={product.title}
                  className="absolute inset-0 w-full h-full object-cover object-top transition-all duration-700 ease-out group-hover:opacity-0 group-hover:scale-106"
                />
                <img
                  src={product.hoverImage}
                  alt={`${product.title} alternate pose`}
                  className="absolute inset-0 w-full h-full object-cover object-top opacity-0 transition-all duration-700 ease-out group-hover:opacity-100 group-hover:scale-104"
                />

                <div className="absolute inset-0 bg-radial from-transparent to-black/5 pointer-events-none" />

                <button
                  type="button"
                  onClick={() => {
                    setQuickViewProduct(product);
                    setSelectedSize(product.sizes[0]);
                    setModalActiveImage('primary');
                  }}
                  className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center cursor-pointer z-10"
                >
                  <span className="px-4 py-2 rounded-full bg-white/95 backdrop-blur-md text-neutral-950 text-xs font-semibold shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 flex items-center gap-1.5">
                    <Eye className="w-3.5 h-3.5" />
                    <span>Quick View</span>
                  </span>
                </button>
              </div>

              {/* Product Info Row */}
              <div className="flex items-center justify-between gap-2 px-1">
                <div className="space-y-0.5 min-w-0">
                  <h3 className="text-xs sm:text-[13px] font-medium text-neutral-800 truncate">
                    {product.title}
                  </h3>
                  <div className="text-xs sm:text-[13px] font-bold text-neutral-950 font-sans tracking-tight">
                    {product.price}
                  </div>
                  <div className="flex items-center gap-1.5 pt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                    <span className="text-[11px] text-emerald-600 font-medium">In stock</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setQuickViewProduct(product);
                    setSelectedSize(product.sizes[0]);
                    setModalActiveImage('primary');
                  }}
                  className="w-9 h-9 rounded-full bg-black text-white flex items-center justify-center hover:bg-neutral-800 hover:scale-105 active:scale-95 transition-all shadow-xs shrink-0 cursor-pointer"
                  title="Quick View"
                  aria-label={`View details of ${product.title}`}
                >
                  <Eye className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </motion.div>

      {/* QUICK VIEW MODAL */}
      <AnimatePresence>
        {quickViewProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-2xl bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row text-neutral-900 border border-neutral-200"
            >
              <button
                type="button"
                onClick={() => setQuickViewProduct(null)}
                className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-white/80 backdrop-blur-md text-neutral-700 hover:text-black flex items-center justify-center shadow-sm cursor-pointer transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="w-full md:w-1/2 aspect-[3/3.8] md:aspect-auto bg-[#e6e8ec] relative">
                <img
                  src={modalActiveImage === 'primary' ? quickViewProduct.image : quickViewProduct.hoverImage}
                  alt={quickViewProduct.title}
                  className="w-full h-full object-cover object-top transition-all duration-500"
                />

                <div className="absolute bottom-3 left-3 flex gap-2 z-10">
                  <button
                    type="button"
                    onClick={() => setModalActiveImage('primary')}
                    className={`w-9 h-9 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                      modalActiveImage === 'primary' ? 'border-black scale-105 shadow-md' : 'border-white/80 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={quickViewProduct.image} alt="Front view" className="w-full h-full object-cover" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setModalActiveImage('hover')}
                    className={`w-9 h-9 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                      modalActiveImage === 'hover' ? 'border-black scale-105 shadow-md' : 'border-white/80 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={quickViewProduct.hoverImage} alt="Alternate view" className="w-full h-full object-cover" />
                  </button>
                </div>
              </div>

              <div className="p-6 md:p-8 flex-1 flex flex-col justify-between space-y-6">
                <div className="space-y-3">
                  <span className="text-[10px] uppercase font-mono tracking-widest text-neutral-400">
                    {quickViewProduct.category}
                  </span>
                  <h3 className="font-heading text-2xl font-bold text-neutral-950">
                    {quickViewProduct.title}
                  </h3>
                  <div className="font-bold text-lg text-neutral-950">
                    {quickViewProduct.price}
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-emerald-600 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <span>In stock & ready to ship</span>
                  </div>
                  <p className="text-xs text-neutral-600 leading-relaxed pt-1">
                    {quickViewProduct.description}
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-semibold text-neutral-800">
                    <span>Select Size</span>
                    <span className="text-neutral-400 font-normal text-[11px]">Size Guide</span>
                  </div>
                  <div className="flex gap-2">
                    {quickViewProduct.sizes.map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setSelectedSize(s)}
                        className={`w-10 h-10 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                          selectedSize === s
                            ? 'bg-black text-white border-black shadow-sm'
                            : 'bg-neutral-100 text-neutral-800 border-neutral-200 hover:border-neutral-400'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={handleQuickAdd}
                    className="w-full py-3.5 rounded-full bg-black text-white hover:bg-neutral-800 transition-all font-semibold text-xs tracking-wider uppercase flex items-center justify-center gap-2 shadow-lg active:scale-98 cursor-pointer"
                  >
                    {isAddedToast ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-400" />
                        <span>Added to Bag!</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-4 h-4" />
                        <span>Add To Bag</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};