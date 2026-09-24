"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useAnimationFrame, type Variants } from 'framer-motion';
import { ShoppingBag, Plus } from 'lucide-react';

interface ProductItem {
  id: number;
  badge?: string;
  title: string;
  price: string;
  image: string;
}

const PRODUCTS: ProductItem[] = [
  {
    id: 1,
    badge: 'OVERSIZE',
    title: 'Check Bomber Jacket',
    price: 'Rs. 5,300.00 INR',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=85',
  },
  {
    id: 2,
    title: 'Corduroy Shirt Jacket',
    price: 'From Rs. 4,200.00 INR',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=800&q=85',
  },
  {
    id: 3,
    title: 'Off-Shoulder Knit Pullover',
    price: 'From Rs. 3,800.00 INR',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=85',
  },
  {
    id: 4,
    badge: 'LIMITED',
    title: 'Minimal Cotton Trench',
    price: 'Rs. 6,200.00 INR',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=85',
  },
  {
    id: 5,
    title: 'Relaxed Wool Overshirt',
    price: 'From Rs. 4,900.00 INR',
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=85',
  },
];

const DISPLAY_PRODUCTS = [...PRODUCTS, ...PRODUCTS, ...PRODUCTS];

const ITEM_STEP = 284;
const SINGLE_SET_WIDTH = PRODUCTS.length * ITEM_STEP;

const wrapOffset = (val: number, min: number, max: number) => {
  const range = max - min;
  return ((((val - min) % range) + range) % range) + min;
};

interface PremiumComfortSectionProps {
  onAddToCart?: () => void;
}

const EASE_SMOOTH = [0.16, 1, 0.3, 1] as const;

const containerVariants: Variants = {
  hidden: { y: 40 },
  visible: {
    y: 0,
    transition: { duration: 0.85, ease: EASE_SMOOTH },
  },
};

const contentStagger: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.25,
    },
  },
};

const contentItem: Variants = {
  hidden: { y: 22 },
  visible: {
    y: 0,
    transition: { duration: 0.75, ease: EASE_SMOOTH },
  },
};

export const PremiumSection: React.FC<PremiumComfortSectionProps> = ({ onAddToCart }) => {
  const [isCardHovered, setIsCardHovered] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const dragAreaRef = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const isDragging = useRef(false);
  const isHoveredRef = useRef(false);

  // Detect desktop viewport AFTER mount to avoid SSR/client hydration mismatch
  useEffect(() => {
    const checkDesktop = () => setIsDesktop(window.innerWidth >= 1024);
    checkDesktop();
    window.addEventListener('resize', checkDesktop);
    return () => window.removeEventListener('resize', checkDesktop);
  }, []);

  // Auto-glide loop — only runs once layout is settled
  useAnimationFrame((_, delta) => {
    if (!isDesktop) return;
    if (isDragging.current) return;
    const speed = isHoveredRef.current ? 0 : 0.45;
    if (speed > 0) {
      const nextX = wrapOffset(x.get() - speed * (delta / 16.66), -SINGLE_SET_WIDTH, 0);
      x.set(nextX);
    }
  });

  // Desktop-only inline dimensions (falls back to CSS for mobile stacking)
  const leftPanelWidth = isDesktop ? (isCardHovered ? '60%' : '65%') : '100%';
  const rightPanelWidth = isDesktop ? (isCardHovered ? '40%' : '35%') : '100%';
  const trackLeft = isDesktop
    ? isCardHovered
      ? 'calc(60% - 135px)'
      : 'calc(65% - 135px)'
    : '0';

  return (
    <section className="w-full bg-[#f4f4f7] py-12 sm:py-12 select-none transition-colors">
      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-[98px]">

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="relative w-full min-h-[580px] lg:h-[620px] rounded-[36px] sm:rounded-[44px] overflow-hidden bg-neutral-950 flex flex-col lg:flex-row border border-black/10"
        >

          {/* ================= 1. LEFT PANEL ================= */}
          <div
            className="relative h-[380px] lg:h-full transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden shrink-0"
            style={{ width: leftPanelWidth }}
          >
            <img
              src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1800&q=85"
              alt="Model in straw hat relaxing on beach"
              draggable={false}
              className="absolute inset-0 w-full h-full object-cover object-[center_42%] scale-[1.02] transition-transform duration-1000 pointer-events-none"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent pointer-events-none" />

            <motion.div
              variants={contentStagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="relative z-10 h-full flex flex-col justify-end p-8 sm:p-12 lg:p-14 space-y-6 max-w-lg"
            >
              <motion.div variants={contentItem} className="space-y-1 sm:space-y-2">
                <h2 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.08] drop-shadow-md">
                  <span className="block">Wear Premium</span>
                  <span className="block">Comfort Every</span>
                  <span className="block">Single Day</span>
                </h2>
              </motion.div>

              <motion.p
                variants={contentItem}
                className="text-white/90 text-xs sm:text-sm font-sans leading-relaxed max-w-md drop-shadow-sm"
              >
                Discover wardrobe staples made with superior fabrics, modern fits, and lasting quality for daily wear.
              </motion.p>

              <motion.div variants={contentItem} className="pt-2">
                <a
                  href="#explore-collection"
                  className="inline-flex items-center gap-3.5 pl-2 pr-5 py-2 rounded-full bg-white text-neutral-950 font-semibold text-xs sm:text-sm tracking-wider shadow-lg hover:bg-neutral-100 transition-all duration-300 hover:scale-[1.03] active:scale-95 group cursor-pointer"
                >
                  <span className="w-8 h-8 rounded-full overflow-hidden border border-neutral-300 bg-neutral-200 shrink-0">
                    <img
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
                      alt="Thumbnail"
                      draggable={false}
                      className="w-full h-full object-cover pointer-events-none"
                    />
                  </span>

                  <span className="font-heading tracking-wide uppercase text-xs font-bold">
                    EXPLORE
                  </span>

                  <Plus className="w-4 h-4 text-neutral-900 group-hover:rotate-90 transition-transform duration-300" />
                </a>
              </motion.div>
            </motion.div>
          </div>

          {/* ================= 2. RIGHT PANEL ================= */}
          <div
            className="relative flex-1 h-[420px] lg:h-full transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] bg-[#4a4b46] overflow-hidden"
            style={{ width: rightPanelWidth }}
          >
            <div
              className="absolute inset-0 opacity-25"
              style={{
                backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)',
                backgroundSize: '16px 16px',
              }}
            />
          </div>

          {/* ================= 3. FLOATING INFINITE LOOP DRAGGABLE CARDS ================= */}
          <div
            ref={dragAreaRef}
            className="lg:absolute lg:inset-y-0 lg:right-0 z-20 flex items-center transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden px-4 lg:pl-1 lg:pr-0 py-6 lg:py-0"
            style={{ left: trackLeft }}
            onMouseEnter={() => {
              isHoveredRef.current = true;
              setIsCardHovered(true);
            }}
            onMouseLeave={() => {
              isHoveredRef.current = false;
              setIsCardHovered(false);
            }}
          >
            <motion.div
              style={{
                x,
                willChange: 'transform',
                touchAction: 'pan-y',
              }}
              onPanStart={() => {
                isDragging.current = true;
              }}
              onPan={(_, info) => {
                const currentX = x.get();
                const nextX = wrapOffset(currentX + info.delta.x, -SINGLE_SET_WIDTH, 0);
                x.set(nextX);
              }}
              onPanEnd={() => {
                isDragging.current = false;
              }}
              className="flex items-center gap-6 py-8 px-1 cursor-grab active:cursor-grabbing select-none"
            >
              {DISPLAY_PRODUCTS.map((product, index) => (
                <div
                  key={`${product.id}-${index}`}
                  className="w-[235px] sm:w-[260px] h-[360px] sm:h-[400px] rounded-[24px] bg-[#dedfe3] flex flex-col justify-between overflow-hidden shrink-0 group border border-neutral-300/40 select-none transition-transform duration-300 hover:-translate-y-1.5"
                >
                  <div className="relative flex-1 w-full bg-[#dedfe3] overflow-hidden">
                    {product.badge && (
                      <div className="absolute top-3.5 left-3.5 z-10 pointer-events-none">
                        <span className="px-2 py-0.5 rounded-xs bg-black text-white text-[9.5px] font-bold tracking-widest uppercase font-mono">
                          {product.badge}
                        </span>
                      </div>
                    )}

                    <img
                      src={product.image}
                      alt={product.title}
                      draggable={false}
                      className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.06] pointer-events-none select-none"
                    />
                  </div>

                  <div className="bg-white px-4 py-3.5 flex items-center justify-between gap-2 border-t border-neutral-100">
                    <div className="min-w-0 space-y-0.5">
                      <h3 className="text-xs font-semibold text-neutral-900 truncate">
                        {product.title}
                      </h3>
                      <p className="text-[11px] font-bold text-neutral-900 font-sans">
                        {product.price}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (onAddToCart) onAddToCart();
                      }}
                      className="w-[34px] h-[34px] rounded-full bg-black text-white flex items-center justify-center hover:bg-neutral-800 hover:scale-105 active:scale-95 transition-all shrink-0 cursor-pointer"
                      title="Add to Cart"
                      aria-label={`Add ${product.title} to cart`}
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                    </button>
                  </div>

                </div>
              ))}
            </motion.div>
          </div>

        </motion.div>

      </div>
    </section>
  );
};