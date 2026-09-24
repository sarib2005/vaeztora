"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface FashionCard {
  id: number;
  numberStr: string;
  image: string;
  tickerText: string;
  title: string;
  description: string;
  buttonText: string;
  link: string;
}

const CARDS_DATA: FashionCard[] = [
  {
    id: 1,
    numberStr: '01',
    image: '/images/homeimgs/show1.png',
    // tickerText: 'TANK TOP SALE · TANK TOP SALE · TANK TOP SALE',
    title: 'Modern Fits for Modern Life',
    description:
      'Elevate your everyday style with modern designs made for comfort, & confidence. Discover thoughtfully crafted apparel that blends contemporary design.',
    buttonText: 'SHOP NOW',
    link: '#shop-tank-tops',
  },
  {
    id: 2,
    numberStr: '02',
    image: '/images/homeimgs/show2.png',
    // tickerText: 'SUNLIT FLEECE · WINTER WARMTH · LIMITED DROP',
    title: 'Sunlit Textures & Warmth',
    description:
      'Ultra-soft statement shearling silhouettes infused with rich earth tones. Unrivaled insulation without compromising effortless luxury.',
    buttonText: 'VIEW COLLECTION',
    link: '#view-collection',
  },
  {
    id: 3,
    numberStr: '03',
    image: '/images/homeimgs/show3.png',
    // tickerText: 'STREET LAYERS · NEW ARRIVALS · AUTUMN CAPSULE',
    title: 'Architectural Comfort',
    description:
      'Engineered for transition and movement. Lightweight weather-resistant outerwear tailored with sculpted necklines and fluid draping.',
    buttonText: 'EXPLORE NOW',
    link: '#explore-outerwear',
  },
];

// Softer, slower spring — the whole point is that nothing should feel like it "snaps"
const LAYOUT_SPRING = {
  type: 'spring' as const,
  stiffness: 140,
  damping: 26,
  mass: 1,
  restDelta: 0.001,
};

const CONTENT_EASE = [0.16, 1, 0.3, 1] as const;

export const FashionShowcase: React.FC = () => {
  const [activeId, setActiveId] = useState<number>(1);

  return (
    <section className="w-full bg-[#f6f6f8] text-neutral-900 py-16 sm:py-24 select-none transition-colors duration-300">
      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-[98px] space-y-8 sm:space-y-10">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, ease: CONTENT_EASE }}
        >
          <h2 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-black">
            Minimal Fashion
          </h2>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-5 lg:gap-6 items-stretch min-h-[460px] lg:h-[490px]">
          {CARDS_DATA.map((card, index) => {
            const isOpened = activeId === card.id;

            return (
              <motion.div
                key={card.id}
                layout
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{
                  layout: LAYOUT_SPRING,
                  default: { duration: 0.6, ease: CONTENT_EASE, delay: index * 0.1 },
                }}
                onMouseEnter={() => setActiveId(card.id)}
                onClick={() => setActiveId(card.id)}
                // Padding is now the SAME in both states (moved out of the ternary,
                // into the shared base classes below). It used to jump from
                // p-3/p-3.5 -> p-4/p-5 the instant a card opened. That jump is a
                // real box-model change, not something Framer's layout FLIP can
                // fake with a transform, so the inner content box shrank by that
                // padding delta for a frame or two before the outer card's spring
                // caught up — that's the "shrink" glitch. Keeping padding constant
                // removes that mismatch entirely.
                className={`relative rounded-[32px] overflow-hidden cursor-pointer transform-gpu will-change-[transform,flex] transition-[background-color,border-color,box-shadow] duration-300 p-4 sm:p-5 ${
                  isOpened
                    ? 'lg:flex-[2.5] bg-white border border-neutral-200/90 shadow-sm'
                    : 'lg:flex-[1.3] bg-white border border-neutral-200/80 shadow-sm hover:shadow-md hover:border-neutral-300'
                }`}
              >
                {/*
                  Single flex wrapper that just changes direction/alignment.
                  Nothing here mounts/unmounts — only sizes change — so `layout`
                  can smoothly interpolate everything inside it in one motion.
                */}
                <motion.div
                  layout
                  transition={{ layout: LAYOUT_SPRING }}
                  className={`h-full flex ${
                    isOpened
                      ? 'flex-col md:flex-row gap-6 md:gap-8 items-center justify-between'
                      : 'flex-col'
                  }`}
                >
                  {/*
                    The image block is ALWAYS mounted — same element, same key —
                    across both states. `layout` morphs its size/position smoothly
                    and Framer Motion compensates the border-radius as it scales,
                    so it never "pops" back to square edges mid-transition, and it
                    keeps the exact same rounded-[24px] corner in every state.

                    z-10 here (paired with z-0 on the text panel below) pins the
                    image above the text panel in stacking order. Framer applies
                    layout animations as CSS transforms, and any element with a
                    transform gets its own stacking context — without an explicit
                    z-index, plain DOM order decides who paints on top when two
                    transformed siblings visually overlap mid-transition. The text
                    panel comes after the image in the JSX, so it was winning that
                    default ordering and briefly drawing over the image while the
                    row was still settling. Explicit z-index removes the ambiguity.

                    md:w-[52%] (not 48%) is the actual fix for the shrink itself.
                    The row always has one card at flex 2.5 and two at flex 1.3
                    (sum 5.1), so a collapsed card's width ≈ 1.3/5.1 of the row
                    and an opened card's width ≈ 2.5/5.1 of the row. For the
                    image's rendered PIXEL width to stay identical across both
                    states, its share of the opened card must equal
                    1.3/2.5 = 0.52 — not an arbitrary 0.48. At exactly 52%, the
                    image's before/after size is the same number, so there's
                    nothing for the layout spring to animate on that axis at
                    all: it doesn't just move faster, it doesn't move. That's
                    also why left-to-right vs right-to-left no longer matters —
                    there's no size delta to be asymmetric about either way. The
                    card growing around it is what makes room for the text.
                  */}
                  <motion.div
                    layout
                    transition={{ layout: LAYOUT_SPRING }}
                    style={{ borderRadius: 24 }}
                    className={`relative z-10 overflow-hidden bg-neutral-100 group ${
                      isOpened
                        ? 'w-full md:w-[52%] h-64 md:h-full shrink-0'
                        : 'w-full h-64 lg:h-full'
                    }`}
                  >
                    {/*
                      Deliberately a plain <img>, not a motion element with
                      its own `layout`. The container above already has
                      `layout` and does the resizing — this image just fills
                      it with w-full h-full, so it naturally inherits the
                      container's transform like any normal child.
                      Giving the image its OWN `layout` on top of the
                      container's was the actual bug: Framer treated them as
                      two independently-animating boxes, each applying its
                      own corrective scale/border-radius transform, and the
                      two fighting each other is what caused the extra
                      "shrink" and ate the bottom corner radius mid-transition.
                    */}
                    <img
                      src={card.image}
                      alt={card.title}
                      className="w-full h-full object-cover object-top"
                    />

                    {/* Collapsed-only: gradient, watermark number, hover title */}
                    <AnimatePresence initial={false}>
                      {!isOpened && (
                        <motion.div
                          key="collapsed-overlay"
                          initial={{ opacity: 0 }}
                          animate={{
                            opacity: 1,
                            transition: { duration: 0.4, ease: CONTENT_EASE, delay: 0.12 },
                          }}
                          exit={{ opacity: 0, transition: { duration: 0.18, ease: CONTENT_EASE } }}
                          className="absolute inset-0 pointer-events-none"
                        >
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                          <div className="absolute bottom-3 right-4 select-none">
                            <span
                              className="font-heading text-6xl sm:text-7xl font-bold tracking-tighter"
                              style={{
                                WebkitTextStroke: '2px rgba(255, 255, 255, 0.75)',
                                color: 'transparent',
                              }}
                            >
                              {card.numberStr}
                            </span>
                          </div>
                          <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-auto">
                            <span className="px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider bg-black/60 backdrop-blur-md text-white border border-white/20">
                              {card.title}
                            </span>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Expanded-only: ticker strip along the bottom of the image */}
                    {/* <AnimatePresence initial={false}>
                      {isOpened && (
                        <motion.div
                          key="ticker"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{
                            opacity: 1,
                            y: 0,
                            transition: { duration: 0.45, ease: CONTENT_EASE, delay: 0.18 },
                          }}
                          exit={{ opacity: 0, y: 10, transition: { duration: 0.18, ease: CONTENT_EASE } }}
                          className="absolute inset-x-0 bottom-0 rounded-b-[24px] bg-neutral-900/60 backdrop-blur-md py-2 px-3 border-t border-white/10 overflow-hidden"
                        >
                          <div className="whitespace-nowrap flex gap-4 text-[10.5px] sm:text-xs font-bold uppercase tracking-widest text-white/95 font-mono">
                            <span>{card.tickerText}</span>
                            <span className="hidden sm:inline">·</span>
                            <span className="hidden sm:inline">{card.tickerText}</span>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence> */}
                  </motion.div>

                  {/*
                    Expanded-only: title, description, CTA, large outline number.
                    mode="popLayout" is the key fix for the "shrink then snap" glitch:
                    without it, this panel keeps its flex space reserved for the
                    full 0.18s exit fade, so the image's layout spring only gets
                    its real final width partway through, then jumps the rest of
                    the way instantly when the panel finally unmounts. popLayout
                    takes it out of flow (position: absolute) the instant it starts
                    exiting, so the image animates to its true final size in one
                    continuous motion instead of two.

                    z-0 here explicitly puts this panel BEHIND the image container
                    (which is z-10) whenever the two visually overlap mid-animation,
                    instead of relying on DOM order (which put it on top before).
                  */}
                  <AnimatePresence mode="popLayout" initial={false}>
                    {isOpened && (
                      <motion.div
                        key="text"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{
                          opacity: 1,
                          x: 0,
                          transition: { duration: 0.55, delay: 0.2, ease: CONTENT_EASE },
                        }}
                        exit={{ opacity: 0, x: 10, transition: { duration: 0.18, ease: CONTENT_EASE } }}
                        className="relative z-0 flex-1 flex flex-col justify-between py-2 md:py-6 pr-2 md:pr-4 h-full w-full"
                      >
                        <div className="space-y-4 max-w-md">
                          <h3 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-neutral-950 leading-tight">
                            {card.title}
                          </h3>

                          <p className="text-neutral-500 text-xs sm:text-sm leading-relaxed font-sans">
                            {card.description}
                          </p>

                          <div className="pt-2">
                            <a
                              href={card.link}
                              className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-black text-white hover:bg-neutral-800 transition-all duration-200 text-xs sm:text-sm font-semibold tracking-wider uppercase shadow-md hover:scale-[1.02] active:scale-95 group cursor-pointer"
                            >
                              <span className="w-5 h-5 rounded-full border border-white/40 flex items-center justify-center group-hover:border-white transition-colors">
                                <ArrowRight className="w-3 h-3 text-white group-hover:translate-x-0.5 transition-transform" />
                              </span>
                              <span>{card.buttonText}</span>
                            </a>
                          </div>
                        </div>

                        <div className="self-end mt-4 md:mt-0 select-none pointer-events-none">
                          <span
                            className="font-heading text-6xl sm:text-8xl lg:text-9xl font-bold tracking-tighter"
                            style={{
                              WebkitTextStroke: '2px #d4d4d8',
                              color: 'transparent',
                            }}
                          >
                            {card.numberStr}
                          </span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};