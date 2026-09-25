"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { Pause, Play, X, ArrowRight, Check, Sparkles, ShoppingBag } from 'lucide-react';

interface StoryCard {
  id: number;
  type: 'product' | 'story' | 'promo' | 'editorial';
  image: string;
  videoUrl?: string;
  hasGradientBorder?: boolean;
  hasPlayPause?: boolean;
  promoText?: string;
  product?: {
    title: string;
    price: string;
    thumbnail: string;
    description: string;
    sizes: string[];
  };
}

const STORY_CARDS: StoryCard[] = [
  {
    id: 1,
    type: 'product',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=85',
    product: {
      title: 'Wrap Waist Top',
      price: 'From Rs. 3,500.00 INR',
      thumbnail: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=200&q=80',
      description: 'Sophisticated draped silhouette crafted in breathable sandwashed crepe with flattering waist gathering.',
      sizes: ['XS', 'S', 'M', 'L'],
    },
  },
  {
    id: 2,
    type: 'story',
    hasGradientBorder: true,
    image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1000&q=85',
  },
  {
    id: 3,
    type: 'promo',
    hasPlayPause: true,
    promoText: 'Register now and get 10% OFF',
    videoUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/2e/%28Fashion_film%29_THYREN_2018_SPIRNG_-_SUMMER_COLLECTION_Fashion_Ad_Film_%28feat.Julia_Ratner%29.webm',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=85',
  },
  {
    id: 4,
    type: 'editorial',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1000&q=85',
  },
  {
    id: 5,
    type: 'product',
    hasPlayPause: true,
    videoUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/0d/Debora_Fantini_%28Fashion_Film%29.webm',
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1000&q=85',
    product: {
      title: 'Satin Cowl Neck Top',
      price: 'From Rs. 3,700.00 INR',
      thumbnail: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=200&q=80',
      description: 'Silky draped cowl neckline top in luminous fluid satin with delicate criss-cross back ties.',
      sizes: ['S', 'M', 'L'],
    },
  },
];

interface ExploreBeyondFashionProps {
  onAddToCart?: () => void;
}

const EASE_SMOOTH = [0.16, 1, 0.3, 1] as const;

// Section-level stagger: header first, then cards container
const sectionVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

// Header lift
const headerVariants: Variants = {
  hidden: { y: 26 },
  visible: {
    y: 0,
    transition: { duration: 0.7, ease: EASE_SMOOTH },
  },
};

// Cards container — pure stagger parent (no own motion)
const cardsContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.07,
    },
  },
};

// Individual card lift
const cardItemVariants: Variants = {
  hidden: { y: 32 },
  visible: {
    y: 0,
    transition: { duration: 0.65, ease: EASE_SMOOTH },
  },
};

export const ExploreBeyondFashion: React.FC<ExploreBeyondFashionProps> = ({ onAddToCart }) => {
  const [playingStates, setPlayingStates] = useState<{ [id: number]: boolean }>({
    3: true,
    5: true,
  });

  const videoRefs = useRef<{ [id: number]: HTMLVideoElement | null }>({});

  const [activeModalProduct, setActiveModalProduct] = useState<StoryCard['product'] | null>(null);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerSuccess, setRegisterSuccess] = useState(false);
  const [activeStoryItem, setActiveStoryItem] = useState<StoryCard | null>(null);

  useEffect(() => {
    [3, 5].forEach((id) => {
      const vid = videoRefs.current[id];
      if (vid && playingStates[id]) {
        vid.play().catch(() => {});
      }
    });
  }, [playingStates]);

  const togglePlay = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    const willPlay = !playingStates[id];
    setPlayingStates((prev) => ({
      ...prev,
      [id]: willPlay,
    }));
    const vid = videoRefs.current[id];
    if (vid) {
      if (willPlay) {
        vid.play().catch(() => {});
      } else {
        vid.pause();
      }
    }
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!registerEmail) return;
    setRegisterSuccess(true);
    setTimeout(() => {
      setIsRegisterOpen(false);
      setRegisterSuccess(false);
      setRegisterEmail('');
    }, 1800);
  };

  return (
    <section className="w-full bg-white py-16 sm:py-24 select-none transition-colors">
      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="w-full px-4 sm:px-6 md:px-8 lg:px-[98px] space-y-10 sm:space-y-12"
      >

        {/* Header */}
        <motion.div
          variants={headerVariants}
          className="text-center space-y-3 max-w-2xl mx-auto"
        >
          <h2 className="font-heading text-3xl sm:text-5xl font-bold tracking-tight text-neutral-950">
            Explore Beyond Fashion
          </h2>
          <p className="text-neutral-500 text-xs sm:text-sm font-sans leading-relaxed">
            Discover style inspiration, exclusive updates, and behind the scenes moments that bring fashion to life.
          </p>
        </motion.div>

        {/* 5-Card Layout — cards stagger in individually */}
        <motion.div
          variants={cardsContainerVariants}
          className="flex sm:grid sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-5 overflow-x-auto pb-4 pt-1 scrollbar-none snap-x"
        >
          {STORY_CARDS.map((card) => {
            const isPlaying = playingStates[card.id] ?? false;

            const content = (
              <div
                onClick={() => {
                  if (card.type === 'promo') {
                    setIsRegisterOpen(true);
                  } else if (card.hasGradientBorder) {
                    setActiveStoryItem(card);
                  }
                }}
                className="relative w-full aspect-[9/16] rounded-[28px] sm:rounded-[32px] overflow-hidden bg-neutral-900 shadow-sm cursor-pointer group"
              >
                {card.videoUrl ? (
                  /* Video — NO zoom on hover */
                  <video
                    ref={(el) => {
                      videoRefs.current[card.id] = el;
                    }}
                    src={card.videoUrl}
                    poster={card.image}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover object-center"
                  />
                ) : (
                  /* Image — zooms on hover only */
                  <img
                    src={card.image}
                    alt={card.product?.title || 'Fashion story visual'}
                    className="w-full h-full object-cover object-center transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.08] will-change-transform"
                  />
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10 pointer-events-none" />

                {card.hasPlayPause && (
                  <button
                    type="button"
                    onClick={(e) => togglePlay(card.id, e)}
                    className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-white/95 text-neutral-900 shadow-md flex items-center justify-center hover:bg-white active:scale-95 transition-all cursor-pointer"
                    title={isPlaying ? 'Pause video' : 'Play video'}
                    aria-label={isPlaying ? 'Pause video' : 'Play video'}
                  >
                    {isPlaying ? (
                      <Pause className="w-3.5 h-3.5 fill-current text-neutral-900" />
                    ) : (
                      <Play className="w-3.5 h-3.5 fill-current text-neutral-900 ml-0.5" />
                    )}
                  </button>
                )}

                {card.type === 'promo' && card.promoText && (
                  <div className="absolute inset-0 z-10 flex flex-col items-center justify-center p-6 text-center">
                    <span className="font-heading text-xl sm:text-2xl font-extrabold text-white leading-tight drop-shadow-md max-w-[200px]">
                      {card.promoText}
                    </span>
                    <span className="mt-3 px-3.5 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/40 text-white text-[11px] font-semibold tracking-wider uppercase group-hover:bg-white group-hover:text-black transition-colors shadow-sm">
                      Claim Now
                    </span>
                  </div>
                )}

                {card.product && (
                  <div className="absolute bottom-3 left-3 right-3 z-10">
                    <div className="bg-white/90 backdrop-blur-md rounded-[18px] p-2 sm:p-2.5 flex items-center justify-between gap-2.5 shadow-lg border border-white/60">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="w-9 h-11 rounded-lg overflow-hidden bg-neutral-200 shrink-0 border border-black/5">
                          <img
                            src={card.product.thumbnail}
                            alt={card.product.title}
                            className="w-full h-full object-cover object-top"
                          />
                        </div>

                        <div className="min-w-0 space-y-0.5">
                          <h4 className="text-[11.5px] font-semibold text-neutral-900 truncate">
                            {card.product.title}
                          </h4>
                          <p className="text-[10.5px] font-bold text-neutral-950 font-sans tracking-tight">
                            {card.product.price}
                          </p>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveModalProduct(card.product);
                        }}
                        className="text-[10px] font-medium text-neutral-600 hover:text-black hover:underline shrink-0 pr-1 cursor-pointer transition-colors"
                      >
                        View details
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );

            return (
              <motion.div
                key={card.id}
                variants={cardItemVariants}
                className="min-w-[230px] sm:min-w-0 flex-1 snap-start"
              >
                {card.hasGradientBorder ? (
                  <div className="p-[2.5px] rounded-[30.5px] sm:rounded-[34.5px] bg-gradient-to-b from-[#f97316] via-[#ec4899] to-[#d946ef] shadow-md">
                    {content}
                  </div>
                ) : (
                  content
                )}
              </motion.div>
            );
          })}
        </motion.div>

      </motion.div>

      {/* 1. PRODUCT DETAILS QUICK MODAL */}
      <AnimatePresence>
        {activeModalProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative w-full max-w-lg bg-white rounded-3xl overflow-hidden shadow-2xl p-6 sm:p-8 space-y-6 border border-neutral-200"
            >
              <button
                type="button"
                onClick={() => setActiveModalProduct(null)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-700 flex items-center justify-center cursor-pointer transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex gap-4 items-start">
                <div className="w-24 h-32 rounded-2xl overflow-hidden bg-neutral-100 shrink-0 border border-black/5">
                  <img
                    src={activeModalProduct.thumbnail}
                    alt={activeModalProduct.title}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div className="space-y-1.5 min-w-0">
                  <span className="text-[10px] uppercase font-mono tracking-widest text-neutral-400">
                    Featured Item
                  </span>
                  <h3 className="font-heading text-xl font-bold text-neutral-950">
                    {activeModalProduct.title}
                  </h3>
                  <div className="text-base font-bold text-neutral-950">
                    {activeModalProduct.price}
                  </div>
                  <p className="text-xs text-neutral-600 leading-relaxed pt-1">
                    {activeModalProduct.description}
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <span className="text-xs font-semibold text-neutral-900">Available Sizes</span>
                <div className="flex gap-2">
                  {activeModalProduct.sizes.map((s) => (
                    <span
                      key={s}
                      className="w-9 h-9 rounded-xl border border-neutral-200 flex items-center justify-center text-xs font-semibold text-neutral-800"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  if (onAddToCart) onAddToCart();
                  setActiveModalProduct(null);
                }}
                className="w-full py-3.5 rounded-full bg-black text-white hover:bg-neutral-800 transition-all font-semibold text-xs tracking-wider uppercase flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add To Bag</span>
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 2. REGISTER & GET 10% OFF MODAL */}
      <AnimatePresence>
        {isRegisterOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative w-full max-w-md bg-white rounded-3xl overflow-hidden shadow-2xl p-6 sm:p-8 space-y-6 text-center border border-neutral-200"
            >
              <button
                type="button"
                onClick={() => setIsRegisterOpen(false)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-700 flex items-center justify-center cursor-pointer transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="w-12 h-12 rounded-2xl bg-neutral-100 text-neutral-900 mx-auto flex items-center justify-center shadow-2xs">
                <Sparkles className="w-6 h-6 text-neutral-900" />
              </div>

              <div className="space-y-1.5">
                <h3 className="font-heading text-2xl font-bold text-neutral-950">
                  Enjoy 10% Off
                </h3>
                <p className="text-xs text-neutral-500 max-w-xs mx-auto">
                  Sign up for King VIP access to unlock your exclusive 10% discount on your first order.
                </p>
              </div>

              {registerSuccess ? (
                <div className="py-6 space-y-2 bg-emerald-50 rounded-2xl border border-emerald-200">
                  <div className="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto">
                    <Check className="w-5 h-5" />
                  </div>
                  <p className="text-xs font-bold text-emerald-800">You're on the VIP list!</p>
                  <p className="text-[11px] text-emerald-600">Check your inbox for code: KING10</p>
                </div>
              ) : (
                <form onSubmit={handleRegisterSubmit} className="space-y-3">
                  <input
                    type="email"
                    required
                    placeholder="Enter your email address"
                    value={registerEmail}
                    onChange={(e) => setRegisterEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-full border border-neutral-300 text-xs focus:outline-hidden focus:border-black transition-colors"
                  />
                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-full bg-black text-white hover:bg-neutral-800 transition-all font-semibold text-xs tracking-wider uppercase flex items-center justify-center gap-2 cursor-pointer shadow-md"
                  >
                    <span>Claim 10% Voucher</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 3. STORY VIEWER MODAL */}
      <AnimatePresence>
        {activeStoryItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-sm aspect-[9/16] rounded-3xl overflow-hidden shadow-2xl bg-black"
            >
              <button
                type="button"
                onClick={() => setActiveStoryItem(null)}
                className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center cursor-pointer hover:bg-black/80 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              <img
                src={activeStoryItem.image}
                alt="Story visual"
                className="w-full h-full object-cover object-center"
              />

              <div className="absolute top-2.5 inset-x-3 flex gap-1 z-20">
                <div className="h-1 flex-1 bg-white/40 rounded-full overflow-hidden">
                  <div className="h-full bg-white animate-[pulse_2s_infinite]" />
                </div>
              </div>

              <div className="absolute bottom-6 inset-x-6 z-20 text-white space-y-1">
                <span className="text-[10px] uppercase font-mono tracking-widest text-white/70">Behind The Scenes</span>
                <h4 className="font-heading text-lg font-bold">Spring Floral Capsule</h4>
                <p className="text-xs text-white/80">Captured on location in Florence, Italy.</p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
};