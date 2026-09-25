"use client";

import React, { useRef, useState, useEffect } from 'react';
import { motion, type Variants } from 'framer-motion';
import { Star, CornerUpLeft, CornerUpRight } from 'lucide-react';

interface TestimonialItem {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  title: string;
  review: string;
}

const TESTIMONIALS: TestimonialItem[] = [
  {
    id: 'test-1',
    name: 'Hobby Gems',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=85',
    rating: 5,
    title: 'Best quality fabric',
    review:
      'I was struggling with the H1 heading tag sequence for product pages so I contacted support and after a few days of reviewing this, they fixed it. I thought it wouldn\'t be possible but they did it. 100% recommended.',
  },
  {
    id: 'test-2',
    name: 'The Taylors',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=85',
    rating: 5,
    title: 'Simple and elegant',
    review:
      'Decided to change to this theme after 3 years with another theme. It offers some great features & customers like the layout more. Customer service was excellent and very fast. We would recommend this theme.',
  },
  {
    id: 'test-3',
    name: 'Julian Vance',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=85',
    rating: 5,
    title: 'Designer cut & silhouettes',
    review:
      'This is hands down the best investment for our seasonal wardrobe. The drape of the linen trousers and tailored overshirts is exceptional. True luxury without the ridiculous markup.',
  },
  {
    id: 'test-4',
    name: 'Seraphina Lin',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=85',
    rating: 5,
    title: 'Impeccable craft and feel',
    review:
      'The attention to detail—from horn buttons to hand-finished inner seams—proves how serious this atelier is about long-lasting craftsmanship. The sizing is consistent and fits perfectly.',
  },
  {
    id: 'test-5',
    name: 'Marcus Sterling',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&q=85',
    rating: 5,
    title: 'Customer support is world-class',
    review:
      'Had a quick query regarding fabric care and international express delivery. The team responded in less than 20 minutes with detailed advice and follow-up tracking. Five stars all around.',
  },
];

const EASE_SMOOTH = [0.16, 1, 0.3, 1] as const;

// Section stagger: header → carousel
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
  hidden: { y: 26 },
  visible: {
    y: 0,
    transition: { duration: 0.7, ease: EASE_SMOOTH },
  },
};

const carouselVariants: Variants = {
  hidden: { y: 36 },
  visible: {
    y: 0,
    transition: { duration: 0.8, ease: EASE_SMOOTH },
  },
};

export function Testimonials() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollability = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 10);
    }
  };

  // Run once on mount to sync arrow state
  useEffect(() => {
    checkScrollability();
    window.addEventListener('resize', checkScrollability);
    return () => window.removeEventListener('resize', checkScrollability);
  }, []);

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const cards = container.querySelectorAll<HTMLElement>('[data-testimonial-card]');
      if (cards.length === 0) return;

      const firstCard = cards[0];
      const secondCard = cards[1];
      const stride = secondCard
        ? secondCard.offsetLeft - firstCard.offsetLeft
        : firstCard.offsetWidth + 24;

      const currentScroll = container.scrollLeft;
      let targetScroll = 0;

      if (direction === 'right') {
        const currentIndex = Math.round(currentScroll / stride);
        const nextIndex = Math.min(cards.length - 1, currentIndex + 1);
        targetScroll = cards[nextIndex] ? cards[nextIndex].offsetLeft - container.offsetLeft : currentScroll + stride;
      } else {
        const currentIndex = Math.round(currentScroll / stride);
        const prevIndex = Math.max(0, currentIndex - 1);
        targetScroll = cards[prevIndex] ? cards[prevIndex].offsetLeft - container.offsetLeft : Math.max(0, currentScroll - stride);
      }

      container.scrollTo({
        left: Math.max(0, targetScroll),
        behavior: 'smooth',
      });
      setTimeout(checkScrollability, 350);
    }
  };

  return (
    <section className="w-full bg-white py-16 sm:py-12 select-none overflow-hidden">
      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="w-full px-4 sm:px-6 md:px-8 lg:px-[98px] space-y-8 sm:space-y-10"
      >

        {/* Header Bar */}
        <motion.div
          variants={headerVariants}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-6"
        >
          <div className="space-y-2 max-w-2xl">
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-[44px] font-bold tracking-tight text-neutral-950 leading-tight">
              What Our Client's Say
            </h2>
            <p className="font-sans text-xs sm:text-sm text-neutral-500 leading-relaxed max-w-xl">
              Discover why our customers love shopping with us! Read through genuine reviews and testimonials from people who have experienced our products and services firsthand.
            </p>
          </div>

          <div className="flex items-center gap-3 self-start sm:self-auto shrink-0">
            <button
              type="button"
              onClick={() => handleScroll('left')}
              disabled={!canScrollLeft}
              className={`w-11 h-11 rounded-2xl flex items-center justify-center transition-all active:scale-95 cursor-pointer shadow-2xs ${
                canScrollLeft
                  ? 'bg-neutral-100 hover:bg-neutral-200 text-neutral-600 hover:text-black'
                  : 'bg-neutral-100/60 text-neutral-300 cursor-not-allowed'
              }`}
              title="Previous testimonials"
              aria-label="Previous testimonials"
            >
              <CornerUpLeft className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => handleScroll('right')}
              disabled={!canScrollRight}
              className={`w-11 h-11 rounded-2xl flex items-center justify-center transition-all active:scale-95 cursor-pointer shadow-2xs ${
                canScrollRight
                  ? 'bg-neutral-200 hover:bg-neutral-300 text-neutral-800 hover:text-black'
                  : 'bg-neutral-200/60 text-neutral-300 cursor-not-allowed'
              }`}
              title="Next testimonials"
              aria-label="Next testimonials"
            >
              <CornerUpRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>

        {/* Carousel */}
        <motion.div
          variants={carouselVariants}
          ref={scrollContainerRef}
          onScroll={checkScrollability}
          className="flex items-stretch gap-6 overflow-x-auto scrollbar-none pb-4 pt-1 snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {TESTIMONIALS.map((item) => (
            <div
              key={item.id}
              data-testimonial-card
              className="min-w-[320px] sm:min-w-[480px] lg:min-w-[540px] max-w-[560px] bg-[#f4f4f4] rounded-[32px] sm:rounded-[36px] p-7 sm:p-9 flex flex-col justify-between space-y-6 snap-start shrink-0 shadow-2xs border border-neutral-200/40"
            >
              <div className="space-y-6">

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-[52px] h-[52px] rounded-full ring-2 ring-black ring-offset-2 overflow-hidden bg-neutral-200 shrink-0">
                      <img
                        src={item.avatar}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="font-heading font-bold text-lg sm:text-xl text-neutral-950">
                      {item.name}
                    </h3>
                  </div>

                  <span
                    className="text-neutral-300/80 font-serif text-5xl sm:text-6xl leading-none select-none tracking-tighter"
                    aria-hidden="true"
                  >
                    "
                  </span>
                </div>

                <div className="w-full border-t border-neutral-200/90" />

                <div className="flex items-center gap-1 text-neutral-400">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-neutral-400 text-neutral-400"
                    />
                  ))}
                </div>

                <div className="space-y-2">
                  <h4 className="font-heading font-bold text-base sm:text-lg text-neutral-950">
                    {item.title}
                  </h4>
                  <p className="font-sans text-xs sm:text-[13px] text-neutral-600 leading-relaxed">
                    {item.review}
                  </p>
                </div>

              </div>
            </div>
          ))}
        </motion.div>

      </motion.div>
    </section>
  );
}

export default Testimonials;