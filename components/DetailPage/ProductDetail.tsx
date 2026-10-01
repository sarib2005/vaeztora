"use client";

import React, { useRef, useState } from 'react';
import Link from 'next/link';
import {
  AnimatePresence,
  motion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from 'framer-motion';
import {
  ArrowRight,
  Check,
  ChevronDown,
  Heart,
  Minus,
  Play,
  Plus,
  RotateCcw,
  ShieldCheck,
  ShoppingBag,
  Truck,
} from 'lucide-react';
import { formatPrice, type Product } from '@/data/product';

const PAD = 'w-full px-4 sm:px-6 md:px-8 lg:px-[98px]';

/* ───────────── Word scroll (same effect as WordScroll, per-product text) ───────────── */

const Word: React.FC<{ children: string; progress: MotionValue<number>; range: [number, number] }> = ({
  children,
  progress,
  range,
}) => {
  const opacity = useTransform(progress, range, [0.22, 1]);
  return (
    <span className="relative inline-block mr-[0.25em] last:mr-0 select-none">
      <span className="text-[#a8abb5] font-bold">{children}</span>
      <motion.span style={{ opacity }} className="absolute inset-0 text-[#171824] font-bold">
        {children}
      </motion.span>
    </span>
  );
};

const Statement: React.FC<{ text: string }> = ({ text }) => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const progress = useSpring(scrollYProgress, { stiffness: 70, damping: 30, mass: 0.25 });
  const words = text.split(' ');
  const step = 0.82 / words.length;

  return (
    <section ref={ref} className="relative bg-[#f0f1f4] select-none py-24 sm:py-12">
      <div className="absolute inset-0 bg-radial from-white via-[#eff0f3] to-[#e4e6eb] pointer-events-none" />
      <div className={`${PAD} relative z-10 flex justify-center`}>
        <p className="w-full max-w-6xl text-center font-heading text-2xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-bold tracking-tight leading-[1.2] sm:leading-[1.16]">
          {words.map((w, i) => {
            const start = 0.05 + i * step;
            return (
              <Word key={`${w}-${i}`} progress={progress} range={[start, Math.min(start + step * 2.4, 0.95)]}>
                {w}
              </Word>
            );
          })}
        </p>
      </div>
    </section>
  );
};

/* ───────────── Small pieces ───────────── */

type Media = { type: 'image' | 'video'; src: string; alt: string; poster?: string };

const MainMedia: React.FC<{ media: Media }> = ({ media }) => (
  <div className="relative w-full h-[380px] sm:h-[480px] lg:h-[540px] rounded-[28px] overflow-hidden bg-[#e6e8ec] border border-black/5 shadow-xs">
    <AnimatePresence initial={false}>
      <motion.div
        key={media.src}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.35 }}
        className="absolute inset-0"
      >
        {media.type === 'video' ? (
          <video
            src={media.src}
            poster={media.poster}
            controls
            autoPlay
            muted
            loop
            playsInline
            aria-label={media.alt}
            className="w-full h-full object-cover"
          />
        ) : (
          <img src={media.src} alt={media.alt} className="w-full h-full object-cover object-center" />
        )}
      </motion.div>
    </AnimatePresence>
  </div>
);

const Thumb: React.FC<{ media: Media; onSelect: () => void }> = ({ media, onSelect }) => (
  <button
    type="button"
    onClick={onSelect}
    aria-label={media.type === 'video' ? `Play ${media.alt}` : `Show ${media.alt}`}
    className="relative aspect-[4/3] rounded-[20px] overflow-hidden bg-[#e6e8ec] border border-black/5 hover:border-neutral-950/50 transition-colors cursor-pointer group focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
  >
    <img
      src={media.type === 'video' ? media.poster : media.src}
      alt=""
      aria-hidden="true"
      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
    />
    {media.type === 'video' && (
      <span className="absolute inset-0 flex items-center justify-center bg-black/15">
        <span className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center shadow-lg transition-transform group-hover:scale-105">
          <Play className="w-4 h-4 text-neutral-950 translate-x-px" fill="currentColor" />
        </span>
      </span>
    )}
  </button>
);

const Accordion: React.FC<{ items: { title: string; body: string }[] }> = ({ items }) => {
  const [open, setOpen] = useState(0);
  return (
    <div className="border-t border-neutral-200">
      {items.map((item, i) => (
        <div key={item.title} className="border-b border-neutral-200">
          <button
            type="button"
            onClick={() => setOpen(open === i ? -1 : i)}
            aria-expanded={open === i}
            className="w-full flex items-center justify-between py-4 text-left text-sm font-semibold text-neutral-950 cursor-pointer"
          >
            {item.title}
            <ChevronDown
              className={`w-4 h-4 text-neutral-500 transition-transform duration-300 ${open === i ? 'rotate-180' : ''}`}
            />
          </button>
          <AnimatePresence initial={false}>
            {open === i && (
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: 'auto' }}
                exit={{ height: 0 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="overflow-hidden"
              >
                <p className="pb-4 text-[13px] leading-relaxed text-neutral-500 max-w-prose">{item.body}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
};

/* ───────────── Page ───────────── */

export const ProductDetail: React.FC<{ product: Product; related: Product[] }> = ({ product, related }) => {
  const [color, setColor] = useState(product.colors[0]);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [wished, setWished] = useState(false);
  const [media, setMedia] = useState<Media[]>(() => [
    { type: 'image', src: product.image, alt: product.title },
    ...product.gallery.map((src, i) => ({
      type: 'image' as const,
      src,
      alt: `${product.title} detail ${i + 1}`,
    })),
    { type: 'video', src: product.video, poster: product.videoPoster, alt: `${product.title} video` },
  ]);

  // Clicked item swaps places with the current main one
  const selectMedia = (i: number) =>
    setMedia((m) => {
      const next = [...m];
      [next[0], next[i]] = [next[i], next[0]];
      return next;
    });

  const handleAdd = () => {
    // TODO: connect to your cart (context / store / API) using product.id, color.name and qty
    setAdded(true);
    setTimeout(() => setAdded(false), 1400);
  };

  return (
    <main className="bg-[#f9f9fb]">
      {/* ── Top: gallery (left) + info (right) ── */}
      <section className={`${PAD} pt-24 sm:pt-28 pb-12 sm:pb-16`}>
        <nav aria-label="Breadcrumb" className="mb-6 text-xs text-neutral-500 flex items-center gap-2">
          <Link href="/" className="hover:text-neutral-950 transition-colors">Home</Link>
          <span aria-hidden="true">/</span>
          <span>{product.category}</span>
          <span aria-hidden="true">/</span>
          <span className="text-neutral-950 font-medium truncate">{product.title}</span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-14 items-start">
          {/* Left — main media, with the other 3 below; click one to make it the main */}
          <div className="space-y-3">
            <MainMedia media={media[0]} />
            <div className="grid grid-cols-3 gap-3">
              {media.slice(1).map((m, i) => (
                <Thumb key={m.src} media={m} onSelect={() => selectMedia(i + 1)} />
              ))}
            </div>
          </div>

          {/* Right — info */}
          <div className="lg:sticky lg:top-28 space-y-6">
            <div className="space-y-3">
              <span className="inline-block px-2.5 py-1 rounded-full bg-white text-[10px] uppercase font-mono tracking-widest text-neutral-700 shadow-sm border border-black/5">
                {product.category}
              </span>
              <h1 className="font-heading text-3xl sm:text-5xl font-bold tracking-tight text-neutral-950">
                {product.title}
              </h1>
              <p className="text-sm text-neutral-500">{product.tagline}</p>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-xl font-bold text-neutral-950 tracking-tight">{formatPrice(product.price)}</span>
              <span className="flex items-center gap-1.5">
                <span className={`w-1.5 h-1.5 rounded-full ${product.inStock ? 'bg-emerald-500' : 'bg-red-500'}`} />
                <span className={`text-[11px] font-medium ${product.inStock ? 'text-emerald-600' : 'text-red-600'}`}>
                  {product.inStock ? 'In stock' : 'Out of stock'}
                </span>
              </span>
            </div>

            <p className="text-sm leading-relaxed text-neutral-600 max-w-prose">{product.description}</p>

            {/* Colour */}
            <div className="space-y-2.5">
              <p className="text-xs font-semibold text-neutral-950">
                Colour: <span className="font-normal text-neutral-500">{color.name}</span>
              </p>
              <div className="flex items-center gap-2.5" role="radiogroup" aria-label="Colour">
                {product.colors.map((c) => (
                  <button
                    key={c.name}
                    type="button"
                    role="radio"
                    aria-checked={color.name === c.name}
                    aria-label={c.name}
                    onClick={() => setColor(c)}
                    className={`w-9 h-9 rounded-full p-0.5 border-2 transition-all cursor-pointer ${
                      color.name === c.name ? 'border-neutral-950' : 'border-transparent hover:border-neutral-300'
                    }`}
                  >
                    <span className="block w-full h-full rounded-full border border-black/10" style={{ background: c.hex }} />
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity + actions */}
            <div className="flex items-center gap-2.5">
              <div className="h-12 rounded-xl bg-neutral-200/80 flex items-center shrink-0">
                <button
                  type="button"
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  aria-label="Decrease quantity"
                  className="w-10 h-12 flex items-center justify-center text-neutral-800 hover:text-black cursor-pointer"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-6 text-center text-sm font-semibold tabular-nums" aria-live="polite">{qty}</span>
                <button
                  type="button"
                  onClick={() => setQty((q) => Math.min(10, q + 1))}
                  aria-label="Increase quantity"
                  className="w-10 h-12 flex items-center justify-center text-neutral-800 hover:text-black cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              <button
                type="button"
                onClick={handleAdd}
                disabled={!product.inStock}
                className="flex-1 h-12 rounded-xl bg-black text-white hover:bg-neutral-800 text-sm font-semibold flex items-center justify-center gap-2 transition-all active:scale-[0.98] cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {added ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    Added to bag
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    Add to bag
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => setWished((w) => !w)}
                aria-pressed={wished}
                aria-label={wished ? 'Remove from wishlist' : 'Add to wishlist'}
                className="w-12 h-12 rounded-xl bg-neutral-200/80 hover:bg-neutral-300/80 flex items-center justify-center transition-all active:scale-95 cursor-pointer shrink-0"
              >
                <Heart className={`w-[18px] h-[18px] ${wished ? 'fill-neutral-950 text-neutral-950' : 'text-neutral-800'}`} />
              </button>
            </div>

            {/* Trust row */}
            <ul className="grid grid-cols-3 gap-3 text-[11px] text-neutral-600">
              {[
                { icon: Truck, label: 'Free delivery over Rs. 5,000' },
                { icon: RotateCcw, label: '7-day returns' },
                { icon: ShieldCheck, label: 'Quality checked' },
              ].map(({ icon: Icon, label }) => (
                <li key={label} className="flex flex-col items-start gap-1.5 rounded-2xl bg-white border border-black/5 p-3">
                  <Icon className="w-4 h-4 text-neutral-950" />
                  <span className="leading-snug">{label}</span>
                </li>
              ))}
            </ul>

            <Accordion items={product.details} />
          </div>
        </div>
      </section>

      {/* ── Word-scroll statement ── */}
      <Statement text={product.statement} />

      {/* ── Full-width video ── */}
      <section className={`${PAD} py-12 sm:py-16`}>
        <div className="relative w-full aspect-[4/5] sm:aspect-video max-h-[80vh] rounded-[28px] overflow-hidden bg-[#e6e8ec] border border-black/5">
          <video
            src={product.video}
            poster={product.videoPoster}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-label={`${product.title} video`}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent pointer-events-none" />
          <div className="absolute inset-x-0 bottom-0 p-6 sm:p-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4 text-white">
            <div className="space-y-1.5 max-w-lg">
              <h2 className="font-heading text-2xl sm:text-4xl font-bold tracking-tight">{product.title}</h2>
              <p className="text-xs sm:text-sm text-white/80">{product.tagline}</p>
            </div>
            <button
              type="button"
              onClick={handleAdd}
              className="self-start sm:self-auto h-11 px-5 rounded-xl bg-white text-neutral-950 hover:bg-neutral-100 text-xs font-semibold flex items-center gap-2 transition-all active:scale-95 cursor-pointer"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              {added ? 'Added to bag' : 'Add to bag'}
            </button>
          </div>
        </div>
      </section>

      {/* ── Collection ── */}
      <section className={`${PAD} space-y-8 sm:space-y-10`}>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5">
          <div className="space-y-2 max-w-xl">
            <h2 className="font-heading text-3xl sm:text-5xl font-bold tracking-tight text-neutral-950">
              More from the collection
            </h2>
            <p className="text-neutral-500 text-xs sm:text-sm leading-relaxed">
              Pieces that sit well alongside the {product.title}.
            </p>
          </div>
          <Link
            href="/"
            className="self-start sm:self-auto h-10 px-4 rounded-xl bg-black text-white hover:bg-neutral-800 text-xs font-semibold flex items-center gap-2 transition-all active:scale-95 shrink-0"
          >
            View all
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {related.slice(0, 4).map((p) => (
            <Link key={p.id} href={`/products/${p.slug}`} className="group block">
              <div className="relative aspect-[3/3.8] rounded-[28px] overflow-hidden bg-[#e6e8ec] mb-3.5 shadow-xs border border-black/5">
                <img
                  src={p.image}
                  alt={p.title}
                  className="absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-out group-hover:opacity-0 group-hover:scale-106"
                />
                <img
                  src={p.hoverImage}
                  alt=""
                  aria-hidden="true"
                  className="absolute inset-0 w-full h-full object-cover opacity-0 transition-all duration-700 ease-out group-hover:opacity-100 group-hover:scale-104"
                />
              </div>
              <div className="px-1 space-y-0.5">
                <h3 className="text-xs sm:text-[13px] font-medium text-neutral-800 truncate">{p.title}</h3>
                <p className="text-xs sm:text-[13px] font-bold text-neutral-950 tracking-tight">{formatPrice(p.price)}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
};