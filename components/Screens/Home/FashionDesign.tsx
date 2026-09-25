"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";
import { Sparkles } from "lucide-react";

// ---------- types ----------

interface MarqueeItem {
  type: "text" | "image";
  content?: string; // used when type === "text"
  src?: string; // used when type === "image"
  alt?: string;
}

interface ShowcaseOption {
  id: string;
  label: string;
  image: string;
  alt: string;
}

interface SplitPanelData {
  /** options[0] is the resting / default state for the panel */
  options: ShowcaseOption[];
}

// ---------- helpers ----------

function wrap(min: number, max: number, value: number) {
  const range = max - min;
  return ((((value - min) % range) + range) % range) + min;
}

// ---------- default content — swap for real photos/copy ----------

const defaultTicker: MarqueeItem[] = [
  { type: "text", content: "New Drops" },
  { type: "image", src: "https://images.unsplash.com/photo-1621062089461-01f1eaebb66c?w=200&h=200&fit=crop&auto=format&q=80", alt: "" },
  { type: "text", content: "Tank Top" },
  { type: "image", src: "https://images.unsplash.com/photo-1698681375999-8faa3e824cd9?w=200&h=200&fit=crop&auto=format&q=80", alt: "" },
  { type: "text", content: "Summer" },
  { type: "image", src: "https://images.unsplash.com/photo-1621061415651-2b7fa415360b?w=200&h=200&fit=crop&auto=format&q=80", alt: "" },
  { type: "text", content: "Shirts" },
  { type: "image", src: "https://images.unsplash.com/photo-1517677129300-07b130802f46?w=200&h=200&fit=crop&auto=format&q=80", alt: "" },
];

const defaultLeft: SplitPanelData = {
  options: [
    { id: "newest", label: "Newest", image: "/images/homeimgs/3f.webp", alt: "Men — newest" },
    { id: "stylish", label: "Stylish", image: "/images/homeimgs/2f.webp", alt: "Men — stylish" },
    { id: "hottest", label: "Hottest", image: "/images/homeimgs/1f.webp", alt: "Men — hottest" },
  ],
};

const defaultRight: SplitPanelData = {
  options: [
    { id: "newest", label: "Trending", image: "/images/homeimgs/img-r.webp", alt: "Women — newest" },
    { id: "stylish", label: "Latest", image: "/images/homeimgs/img-4.webp", alt: "Women — stylish" },
    { id: "hottest", label: "Ultimate", image: "/images/homeimgs/img-3.webp", alt: "Women — hottest" },
  ],
};

// ---------- component ----------

interface FashionShowcaseProps {
  tickerItems?: MarqueeItem[];
  left?: SplitPanelData;
  right?: SplitPanelData;
  dividerLabel?: string;
}

/**
 * Ticker: still at rest — only moves while the page is actually being
 * scrolled. Scroll up drifts it left, scroll down drifts it right; hovering
 * forces it right for as long as scrolling continues. Divider text loops
 * on its own regardless of scroll or hover.
 * Hover a panel: backdrop blurs, the 3-option menu fades in.
 * Hover an option: it becomes active (sparkle + pill) and the background
 * photo crossfades to it. Leaving the panel does NOT reset — the last
 * hovered option stays active until another one is picked.
 */
export default function FashionDesign({
  tickerItems = defaultTicker,
  left = defaultLeft,
  right = defaultRight,
  dividerLabel = "Newest",
}: FashionShowcaseProps) {
  // ----- ticker motion -----
  const baseX = useMotionValue(0);
  const x = useTransform(baseX, (v) => `${wrap(-25, 0, v)}%`);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  const velocityFactor = useTransform(smoothVelocity, [-2000, 2000], [-4, 4], { clamp: false });
  const [tickerHovered, setTickerHovered] = useState(false);

  useAnimationFrame((_, delta) => {
    const scrollSpeed = velocityFactor.get(); // 0 at rest
    const direction = tickerHovered ? 1 : scrollSpeed < 0 ? -1 : 1;
    const moveBy = direction * Math.abs(scrollSpeed) * 6 * (delta / 1000);
    baseX.set(baseX.get() + moveBy);
  });

  const tickerTrack = [...tickerItems, ...tickerItems, ...tickerItems, ...tickerItems];

  // ----- center divider motion (drives both orientations) -----
  const baseY = useMotionValue(0);
  const dividerY = useTransform(baseY, (v) => `${wrap(-50, 0, v)}%`); // md+ : vertical column
  const dividerX = useTransform(baseY, (v) => `${wrap(-50, 0, v)}%`); // mobile : horizontal strip
  useAnimationFrame((_, delta) => {
    // slowed down: was -6, now -1.5
    baseY.set(baseY.get() - 1.5 * (delta / 1000));
  });
  const dividerWords = useMemo(
    () => Array.from({ length: 20 }, () => dividerLabel),
    [dividerLabel]
  );

  return (
    <section className="w-full bg-white">
      {/* ticker */}
      <div
        className="relative overflow-hidden whitespace-nowrap border-y border-black/10"
        onMouseEnter={() => setTickerHovered(true)}
        onMouseLeave={() => setTickerHovered(false)}
      >
        <motion.div style={{ x }} className="flex w-max items-center py-2">
          {tickerTrack.map((item, i) =>
            item.type === "text" ? (
              <span
                key={i}
                className="font-heading px-6 text-[clamp(2rem,6vw,4.5rem)] uppercase leading-none tracking-tight text-neutral-950"
              >
                {item.content}
              </span>
            ) : (
              <span
                key={i}
                className="relative mx-3 h-14 w-14 shrink-0 overflow-hidden rounded-full sm:h-16 sm:w-16"
              >
                <Image
                  src={item.src as string}
                  alt={item.alt ?? ""}
                  fill
                  sizes="64px"
                  className="object-cover"
                />
              </span>
            )
          )}
        </motion.div>
      </div>

      {/* split panels */}
      <div className="relative flex w-full flex-col md:flex-row">
        <Panel data={left} />

        {/* divider — horizontal strip on mobile / tablet portrait, vertical column on md+ */}
        <div className="w-full shrink-0 bg-neutral-950 md:hidden">
          <div className="pointer-events-none w-full overflow-hidden py-2" aria-hidden="true">
            <motion.div style={{ x: dividerX }} className="flex w-max items-center gap-8 px-3">
              {[...dividerWords, ...dividerWords].map((word, i) => (
                <span
                  key={i}
                  className="whitespace-nowrap text-[9px] font-semibold uppercase tracking-[0.25em] text-white/60"
                >
                  {word}
                </span>
              ))}
            </motion.div>
          </div>
        </div>

        {/* narrower strip, smaller text, matched to the 800px panel height */}
        <div className="hidden h-[800px] w-7 shrink-0 overflow-hidden bg-neutral-950 md:block">
          <div className="pointer-events-none h-full w-full overflow-hidden" aria-hidden="true">
            <motion.div style={{ y: dividerY }} className="flex flex-col items-center gap-8 py-8">
              {[...dividerWords, ...dividerWords].map((word, i) => (
                <span
                  key={i}
                  className="text-[9px] font-semibold uppercase tracking-[0.25em] text-white/60 [writing-mode:vertical-rl]"
                >
                  {word}
                </span>
              ))}
            </motion.div>
          </div>
        </div>

        <Panel data={right} />
      </div>
    </section>
  );
}

// kept as a small internal helper (used twice) rather than a second file
function Panel({ data }: { data: SplitPanelData }) {
  const defaultOption = data.options[0];
  const [activeId, setActiveId] = useState(defaultOption.id);
  const [hovered, setHovered] = useState(false);

  const active = data.options.find((o) => o.id === activeId) ?? defaultOption;

  return (
    <div
      className="group relative h-[800px] w-full overflow-hidden bg-neutral-950 md:flex-1"
      onMouseEnter={() => setHovered(true)}
      // note: we only toggle the "hovered" flag here —
      // the active option is intentionally NOT reset, so the last
      // hovered choice stays as the resting state.
      onMouseLeave={() => setHovered(false)}
    >
      <AnimatePresence initial={false}>
        <motion.div
          key={active.id}
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
        >
          <Image
            src={active.image}
            alt={active.alt}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover object-top"
            priority={active.id === defaultOption.id}
          />
        </motion.div>
      </AnimatePresence>

      {/* hover backdrop: darkens + blurs the photo */}
      <motion.div
        initial={false}
        animate={{
          opacity: hovered ? 1 : 0,
          backdropFilter: hovered ? "blur(8px)" : "blur(0px)",
          WebkitBackdropFilter: hovered ? "blur(8px)" : "blur(0px)",
        }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="absolute inset-0 bg-black/45"
      />

      {/* quiet base gradient so the photo reads even without hover */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />

      <div className="relative flex h-full flex-col items-center justify-center gap-6">
        {data.options.map((option) => {
          const isActive = option.id === activeId;
          return (
            <motion.button
              key={option.id}
              type="button"
              onMouseEnter={() => setActiveId(option.id)}
              initial={false}
              animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 10 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="flex items-center gap-3 text-2xl font-semibold text-white sm:text-3xl"
            >
              {isActive && <Sparkles className="h-5 w-5" strokeWidth={1.5} />}
              <span
                className={
                  isActive
                    ? "rounded-full border border-white/70 px-6 py-2"
                    : "px-6 py-2"
                }
              >
                {option.label}
              </span>
              {isActive && <Sparkles className="h-5 w-5" strokeWidth={1.5} />}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}