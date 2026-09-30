"use client";

import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useLayoutEffect,
} from 'react';
import {
  motion,
  AnimatePresence,
  useMotionValue,
  animate,
  type Variants,
} from 'framer-motion';
import {
  ArrowRight,
  ArrowLeft,
  Package,
  ShieldCheck,
  RefreshCw,
  Headphones,
} from 'lucide-react';

interface SlideData {
  id: number;
  /** Path to the looping background video (5–10s, muted, no audio track needed) */
  video: string;
  /** Optional first-frame fallback while the video buffers */
  poster?: string;
  titleLine1: string;
  titleLine2: string;
  subtitle: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
}

const HERO_SLIDES: SlideData[] = [
  {
    id: 1,
    // Replace with your handbags video later
    video: 'https://www.w3schools.com/html/mov_bbb.mp4',
    titleLine1: 'Handcrafted Icons',
    titleLine2: 'Carried With Grace',
    subtitle:
      'Discover handbags cut from supple leather — made to move with you.',
    primaryCta: { label: 'SHOP BAGS', href: '#bags' },
    secondaryCta: { label: 'VIEW ALL', href: '#all' },
  },
  {
    id: 2,
    // Replace with your jewelry video later
    video: 'https://media.w3.org/2010/05/sintel/trailer.mp4',
    titleLine1: 'Quiet Luxury,',
    titleLine2: 'Worn Every Day',
    subtitle:
      'Fine jewellery in 18k gold and ethically sourced stones.',
    primaryCta: { label: 'SHOP JEWELLERY', href: '#jewellery' },
    secondaryCta: { label: 'COLLECTIONS', href: '#collections' },
  },
  {
    id: 3,
    // Replace with your abayas video later
    video: 'https://vjs.zencdn.net/v/oceans.mp4',
    titleLine1: 'Fluid Silhouettes,',
    titleLine2: 'Effortless Modesty',
    subtitle:
      'Contemporary abayas cut from breathable, flowing fabrics.',
    primaryCta: { label: 'SHOP ABAYAS', href: '#abayas' },
    secondaryCta: { label: 'NEW IN', href: '#new-in' },
  },
];

const TRUST_FEATURES = [
  {
    id: 'shipping',
    Icon: Package,
    title: 'Fast & Free Shipping',
    description:
      'We deliver your favorite styles fast, with free shipping on eligible orders.',
  },
  {
    id: 'secure',
    Icon: ShieldCheck,
    title: '100% Secure',
    description:
      'Pay with confidence through secure, encrypted, & trusted payments.',
  },
  {
    id: 'returns',
    Icon: RefreshCw,
    title: 'Returns & Exchanges',
    description:
      'We make returns & exchanges quick, easy, & convenient for your peace.',
  },
  {
    id: 'support',
    Icon: Headphones,
    title: 'Our Premium Support',
    description:
      'Our premium support team is always here to help for any query.',
  },
];

const EASE_SMOOTH = [0.16, 1, 0.3, 1] as const;

/* ---- Timing knobs (tweak these if you want slower / faster) ---- */
const SLIDE_DURATION = 1.15; // main slide transition, in seconds
const SNAP_DURATION = 0.75; // drag-cancel snap-back, in seconds

const SLIDE_COUNT = HERO_SLIDES.length;

/* Clone-a-slide-at-each-end carousel: [lastClone, ...slides, firstClone] */
const TRACK_SLIDES: SlideData[] = [
  HERO_SLIDES[SLIDE_COUNT - 1],
  ...HERO_SLIDES,
  HERO_SLIDES[0],
];

/* SSR-safe layout effect (avoids the React "useLayoutEffect on server" warning) */
const useIsoLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;

export const Hero: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const trackRef = useRef<HTMLDivElement | null>(null);
  const x = useMotionValue(0);

  const indexRef = useRef(0); // 0 .. SLIDE_COUNT-1
  const posRef = useRef(1); // track position (1 .. SLIDE_COUNT)
  const widthRef = useRef(0); // one slide width in px
  const animatingRef = useRef(false);
  const dragRef = useRef({
    active: false,
    pointerId: -1,
    startX: 0,
    startValue: 0,
  });

  /* One <video> per track slot (including the two clones) */
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  /* Track index of the video that is currently allowed to play */
  const activeVideoPosRef = useRef(-1);

  const slide = HERO_SLIDES[currentSlide];

  /* ------------------------------------------------------------------ */
  /*  VIDEO HELPERS                                                      */
  /* ------------------------------------------------------------------ */

  /** Play the video at `pos`, pause every other one. */
  const playVideoAt = useCallback((pos: number, keepTime = false) => {
    const list = videoRefs.current;

    for (let i = 0; i < list.length; i++) {
      const v = list[i];
      if (!v || i === pos) continue;
      if (!v.paused) v.pause();
    }

    const v = list[pos];
    if (!v) return;

    if (!keepTime) {
      try {
        if (v.currentTime !== 0) v.currentTime = 0;
      } catch {
        /* metadata not ready yet — browser will start from 0 anyway */
      }
    }

    const p = v.play();
    if (p && typeof p.catch === 'function') p.catch(() => {});

    activeVideoPosRef.current = pos;
  }, []);

  /** Carry the playhead across the clone → real-slide teleport. */
  const copyVideoTime = useCallback((fromPos: number, toPos: number) => {
    const from = videoRefs.current[fromPos];
    const to = videoRefs.current[toPos];
    if (!from || !to || to.readyState < 1) return;
    try {
      const t = from.currentTime;
      if (Number.isFinite(t)) to.currentTime = t;
    } catch {
      /* ignore */
    }
  }, []);

  /* ------------------------------------------------------------------ */
  /*  POSITION HELPERS                                                   */
  /* ------------------------------------------------------------------ */

  /* After a wrap animation finishes, silently teleport to the real slide */
  const normalize = useCallback(() => {
    const w = widthRef.current;
    if (!w) return;

    if (posRef.current > SLIDE_COUNT) {
      const from = posRef.current;
      posRef.current = 1;
      copyVideoTime(from, 1);
      x.set(-w);
      playVideoAt(1, true); // keep the playhead — no visible jump
    } else if (posRef.current < 1) {
      const from = posRef.current;
      posRef.current = SLIDE_COUNT;
      copyVideoTime(from, SLIDE_COUNT);
      x.set(-SLIDE_COUNT * w);
      playVideoAt(SLIDE_COUNT, true);
    }
  }, [copyVideoTime, playVideoAt, x]);

  /* Slow, smooth glide between slides */
  const slideTo = useCallback(
    (targetPos: number) => {
      const w = widthRef.current;
      if (!w) return;
      posRef.current = targetPos;
      animatingRef.current = true;

      /* Start the incoming video right away so the slide feels alive */
      playVideoAt(targetPos);

      animate(x, -targetPos * w, {
        type: 'tween',
        duration: SLIDE_DURATION,
        ease: EASE_SMOOTH,
        onComplete: () => {
          animatingRef.current = false;
          normalize();
        },
      });
    },
    [normalize, playVideoAt, x]
  );

  /* Drag didn't pass the threshold — glide gently back into place */
  const snapBack = useCallback(() => {
    const w = widthRef.current;
    if (!w) return;
    animatingRef.current = true;
    animate(x, -posRef.current * w, {
      type: 'tween',
      duration: SNAP_DURATION,
      ease: EASE_SMOOTH,
      onComplete: () => {
        animatingRef.current = false;
        normalize();
      },
    });
  }, [normalize, x]);

  const goTo = useCallback(
    (dir: 1 | -1) => {
      if (animatingRef.current || !widthRef.current) return;
      const nextIndex = (indexRef.current + dir + SLIDE_COUNT) % SLIDE_COUNT;
      indexRef.current = nextIndex;
      setCurrentSlide(nextIndex);
      slideTo(posRef.current + dir);
    },
    [slideTo]
  );

  /* A video finished → glide to the next slide (and its video) */
  const handleVideoEnd = useCallback(
    (trackIndex: number) => {
      if (trackIndex !== activeVideoPosRef.current) return; // stale/clone
      if (dragRef.current.active) return; // let the user finish dragging
      if (animatingRef.current) return; // already moving on
      goTo(1);
    },
    [goTo]
  );

  /* ------------------------------------------------------------------ */
  /*  MEASURE — keeps x in sync with the real pixel width               */
  /* ------------------------------------------------------------------ */
  useIsoLayoutEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    const update = () => {
      const w = el.offsetWidth;
      if (!w) return;
      widthRef.current = w;
      /* instant, no animation — this is a resize, not a slide change */
      x.set(-posRef.current * w);
    };

    update();

    /* Kick off the first video as soon as the hero is on screen */
    playVideoAt(1);

    const ro = new ResizeObserver(update);
    ro.observe(el);
    window.addEventListener('orientationchange', update);

    return () => {
      ro.disconnect();
      window.removeEventListener('orientationchange', update);
    };
  }, [playVideoAt, x]);

  /* ------------------------------------------------------------------ */
  /*  KEYBOARD                                                           */
  /* ------------------------------------------------------------------ */
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') goTo(-1);
      if (e.key === 'ArrowRight') goTo(1);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goTo]);

  /* ------------------------------------------------------------------ */
  /*  UNIFIED POINTER DRAG — works for mouse, trackpad & touch          */
  /* ------------------------------------------------------------------ */
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (animatingRef.current) return; // let the current slide settle
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    if (!widthRef.current) return;

    dragRef.current = {
      active: true,
      pointerId: e.pointerId,
      startX: e.clientX,
      startValue: x.get(),
    };
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const d = dragRef.current;
    if (!d.active || d.pointerId !== e.pointerId) return;

    const w = widthRef.current;
    const min = -(SLIDE_COUNT + 1) * w;
    const max = 0;

    let next = d.startValue + (e.clientX - d.startX);
    if (next > max) next = max;
    if (next < min) next = min;

    x.set(next);
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    const d = dragRef.current;
    if (!d.active || d.pointerId !== e.pointerId) return;
    d.active = false;

    const w = widthRef.current;
    if (!w) return;

    const delta = x.get() - d.startValue;
    const threshold = Math.min(w * 0.16, 110);

    if (delta <= -threshold) {
      goTo(1);
    } else if (delta >= threshold) {
      goTo(-1);
    } else {
      snapBack();
    }
  };

  const handlePointerCancel = (e: React.PointerEvent<HTMLDivElement>) => {
    const d = dragRef.current;
    if (!d.active || d.pointerId !== e.pointerId) return;
    d.active = false;
    snapBack();
  };

  /* ------------------------------------------------------------------ */
  /*  VARIANTS                                                           */
  /* ------------------------------------------------------------------ */
  const contentContainerVariants: Variants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.09, delayChildren: 0.05 },
    },
    exit: {
      opacity: 0,
      y: -12,
      transition: { duration: 0.35, ease: EASE_SMOOTH },
    },
  };

  const contentItemVariants: Variants = {
    hidden: { opacity: 0, y: 22 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: EASE_SMOOTH },
    },
  };

  const trustContainerVariants: Variants = {
    hidden: {},
    visible: { transition: { delayChildren: 0.3, staggerChildren: 0.09 } },
  };

  const trustItemVariants: Variants = {
    hidden: { opacity: 0, y: 14 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: EASE_SMOOTH },
    },
  };

  return (
    <section className="relative w-full h-[calc(100dvh-var(--announcement-height))] flex flex-col justify-between overflow-hidden bg-neutral-950 text-white select-none">
      {/* 1. SLIDESHOW — one continuous track, dragged by hand */}
      <div
        className="absolute inset-0 z-0 overflow-hidden cursor-grab active:cursor-grabbing touch-pan-y"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerCancel}
      >
        <motion.div
          ref={trackRef}
          style={{ x }}
          className="flex h-full w-full will-change-transform"
        >
          {TRACK_SLIDES.map((s, i) => (
            <div
              key={`${s.id}-${i}`}
              className="relative h-full w-full shrink-0 overflow-hidden"
            >
              <video
                ref={(el) => {
                  videoRefs.current[i] = el;
                  if (el) {
                    /* React sometimes drops these on hydration — force them */
                    el.muted = true;
                    el.playsInline = true;
                    el.setAttribute('muted', '');
                    el.setAttribute('playsinline', '');
                    el.setAttribute('webkit-playsinline', '');
                  }
                }}
                src={s.video}
                poster={s.poster}
                muted
                playsInline
                autoPlay={i === 1}
                preload="auto"
                disablePictureInPicture
                controls={false}
                onEnded={() => handleVideoEnd(i)}
                /* Safety net: if autoplay was blocked, retry once playable */
                onCanPlay={(e) => {
                  if (
                    activeVideoPosRef.current === i &&
                    e.currentTarget.paused
                  ) {
                    e.currentTarget.play().catch(() => {});
                  }
                }}
                className="
                  h-full w-full object-cover
                  object-[center_35%]
                  sm:object-[center_30%]
                  lg:object-[center_28%]
                  pointer-events-none select-none
                "
                draggable={false}
                aria-hidden="true"
              />
            </div>
          ))}
        </motion.div>

        {/* Legibility gradient — sits above media, below content */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent pointer-events-none" />
        {/* Extra bottom gradient for small screens so text stays readable */}
        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none lg:hidden" />
      </div>

      {/* 2. HERO CONTENT — width matches topbar */}
      <div className="relative z-20 w-full px-4 sm:px-6 md:px-8 lg:px-[98px] pt-32 sm:pt-44 lg:pt-48 pb-16 sm:pb-20 flex-1 flex flex-col justify-end pointer-events-none">
        <AnimatePresence mode="wait">
          <motion.div
            key={`content-${currentSlide}`}
            variants={contentContainerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="max-w-2xl space-y-4 sm:space-y-6 mx-auto lg:mx-0 text-center lg:text-left"
          >
            <motion.h1
              variants={contentItemVariants}
              className="font-heading text-[32px] leading-[1.1] sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white drop-shadow-md"
            >
              <span className="block">{slide.titleLine1}</span>
              <span className="block">{slide.titleLine2}</span>
            </motion.h1>

            <motion.p
              variants={contentItemVariants}
              className="text-white/90 text-sm sm:text-base lg:text-lg max-w-lg font-normal drop-shadow-sm mx-auto lg:mx-0"
            >
              {slide.subtitle}
            </motion.p>

            <motion.div
              variants={contentItemVariants}
              className="flex flex-wrap items-center gap-3 sm:gap-3.5 pt-2 justify-center lg:justify-start"
            >
              <a
                href={slide.primaryCta.href}
                className="pointer-events-auto group inline-flex items-center gap-3 px-5 sm:px-6 py-3 rounded-full bg-white text-neutral-950 font-semibold text-xs sm:text-sm tracking-wider uppercase shadow-xl hover:bg-neutral-100 transition-all duration-200 hover:scale-[1.02] active:scale-95 cursor-pointer"
              >
                <span className="w-5 h-5 rounded-full border border-neutral-950/30 flex items-center justify-center group-hover:border-neutral-950 transition-colors">
                  <ArrowRight className="w-3 h-3 text-neutral-950 group-hover:translate-x-0.5 transition-transform" />
                </span>
                <span>{slide.primaryCta.label}</span>
              </a>

              <a
                href={slide.secondaryCta.href}
                className="pointer-events-auto group inline-flex items-center gap-3 px-5 sm:px-6 py-3 rounded-full bg-white text-neutral-950 font-semibold text-xs sm:text-sm tracking-wider uppercase shadow-xl hover:bg-neutral-100 transition-all duration-200 hover:scale-[1.02] active:scale-95 cursor-pointer"
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

      {/* 3. NAVIGATION ARROWS — only on lg and up */}
      <div className="hidden lg:flex absolute right-[98px] bottom-32 z-30 items-center gap-3">
        <motion.button
          type="button"
          onClick={() => goTo(-1)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.94 }}
          className="w-12 h-12 rounded-xl bg-white/95 text-neutral-900 shadow-2xl flex items-center justify-center hover:bg-white transition-all cursor-pointer group"
          title="Previous Slide"
          aria-label="Previous Slide"
        >
          <ArrowLeft className="w-[18px] h-[18px] text-neutral-800 group-hover:-translate-x-0.5 transition-transform" />
        </motion.button>

        <motion.button
          type="button"
          onClick={() => goTo(1)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.94 }}
          className="w-12 h-12 rounded-xl bg-white/95 text-neutral-900 shadow-2xl flex items-center justify-center hover:bg-white transition-all cursor-pointer group"
          title="Next Slide"
          aria-label="Next Slide"
        >
          <ArrowRight className="w-[18px] h-[18px] text-neutral-800 group-hover:translate-x-0.5 transition-transform" />
        </motion.button>
      </div>

      {/* 4. TRUST BAR — aligned with hero text, left-aligned items */}
      <div className="relative z-30 w-full border-t border-white/10">
        <div className="w-full px-4 sm:px-6 md:px-8 lg:px-[98px] py-5 sm:py-7">
          <motion.div
            variants={trustContainerVariants}
            initial="hidden"
            animate="visible"
            className="
              flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth
              pb-1
              [scrollbar-width:none] [&::-webkit-scrollbar]:hidden
              sm:gap-6 sm:overflow-visible sm:pb-0
              sm:grid sm:grid-cols-2 lg:grid-cols-4 lg:gap-8
            "
          >
            {TRUST_FEATURES.map(({ id, Icon, title, description }) => (
              <motion.div
                key={id}
                variants={trustItemVariants}
                className="
                  flex items-start gap-3 sm:gap-4
                  shrink-0 w-[82%] snap-start
                  sm:w-auto sm:shrink
                "
              >
                <div className="w-9 h-9 rounded-full bg-black/25 border border-white/10 text-white flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5 stroke-[1.7]" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-heading font-semibold text-base sm:text-lg text-white tracking-tight">
                    {title}
                  </h3>
                  <p className="text-[13px] sm:text-sm text-white/75 leading-relaxed">
                    {description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};