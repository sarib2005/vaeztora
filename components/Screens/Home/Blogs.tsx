"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { ArrowRight, X, Calendar, Clock } from 'lucide-react';

interface ArticleItem {
  id: string;
  image: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  date: string;
  content: string;
}

const COL_1_ARTICLES: ArticleItem[] = [
  {
    id: 'art-1',
    image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=85',
    title: 'Chic Summer Looks for Every Occasion',
    excerpt: 'Refresh your summer wardrobe with effortlessly chic outfits designed for every occasion. Discover lightweight fabrics, timeless essentials, and versatile styling...',
    category: 'Summer Capsule',
    readTime: '4 min read',
    date: 'May 18, 2026',
    content: 'Summer dressing is fundamentally an art of reduction. By paring back heavy layers in favor of crisp breathable Belgian flax linen, silk poplins, and sandwashed cotton, your everyday silhouettes remain poised even under midday heat. Here are our top styling principles for building an all-day summer rotation that effortlessly shifts from relaxed resort brunches to twilight rooftop gatherings.',
  },
  {
    id: 'art-2',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=85',
    title: 'Effortless Everyday Dressing: The Capsule Guide',
    excerpt: 'Master minimal everyday looks with tailored separates and breathable natural textiles built for comfort, poise, and all-day versatility...',
    category: 'Style Essentials',
    readTime: '5 min read',
    date: 'May 14, 2026',
    content: 'A well-balanced capsule wardrobe is designed to eliminate morning friction. By investing in proportion-tested pleated trousers, structured ribbed knit tees, and relaxed overshirts, mixing and matching becomes second nature.',
  },
  {
    id: 'art-3',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=85',
    title: 'Refined Silhouettes: Modern Minimalist Essentials',
    excerpt: 'Clean contours, tonal palettes, and purposeful layering that bring an effortless elegance to your morning routine...',
    category: 'Modern Tailoring',
    readTime: '4 min read',
    date: 'May 08, 2026',
    content: 'Refinement is found in restraint. When clean cuts are paired with uncompromised material integrity, every ensemble carries quiet confidence without unnecessary distraction.',
  },
];

const COL_2_ARTICLES: ArticleItem[] = [
  {
    id: 'art-4',
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=85',
    title: 'Ultimate Guide to Choosing the Perfect Shirt',
    excerpt: 'Discover how the perfect shirt can elevate your everyday style. Explore different shirt styles, fabric choices, fit guides, and expert...',
    category: 'Craftsmanship & Tailoring',
    readTime: '7 min read',
    date: 'May 20, 2026',
    content: 'The collared shirt remains the single most transformative staple in modern fashion. From the crisp architecture of a 120-thread-count Egyptian cotton poplin to the fluid drape of raw mulberry silk, the choice of weave, collar point spread, and cuff closure establishes the entire tone of your outfit.',
  },
  {
    id: 'art-5',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=85',
    title: 'The Architectural Silhouette: Form Meets Texture',
    excerpt: 'Explore the structural balance of oversized cuts, drop shoulders, and tailored waistbands in our new seasonal collection, designed for effortless elegance...',
    category: 'Atelier Philosophy',
    readTime: '6 min read',
    date: 'May 12, 2026',
    content: 'Volume without structure can easily look unkempt; structure without movement feels rigid. Our atelier explores the harmonic median—using Japanese double-faced cotton twill and structured shoulder lines to craft modern heirlooms that move fluidly with your body.',
  },
];

const COL_3_ARTICLES: ArticleItem[] = [
  {
    id: 'art-6',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=85',
    title: 'Styling guides, & fashion inspiration',
    excerpt: 'Discover expert styling tips, fashion inspiration, and wardrobe essentials to create timeless looks for every occasion. Learn how to build...',
    category: 'Inspiration',
    readTime: '3 min read',
    date: 'May 16, 2026',
    content: 'Accessories dictate narrative. A handcrafted woven straw tote, hand-beveled acetate sunglasses, and raw leather mules instantly shift an ensemble from boardroom sharp to Mediterranean holiday ease. Explore our curated guidelines for tone-on-tone accessorizing.',
  },
  {
    id: 'art-7',
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=85',
    title: 'Mindful Movement: Athleisure Tailored for Living',
    excerpt: 'Seamless transitions from studio sessions to afternoon coffee runs with ergonomic activewear cuts designed for enduring comfort...',
    category: 'Active Lifestyle',
    readTime: '4 min read',
    date: 'May 10, 2026',
    content: 'Contemporary life rarely exists in clean compartments. Performance apparel must adapt to daily routines—offering moisture management during workouts alongside refined silhouettes suitable for casual dining.',
  },
  {
    id: 'art-8',
    image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=85',
    title: 'Summer Accessories: The Art of Subtle Accents',
    excerpt: 'Elevate warm-weather ensembles with handcrafted leather slide sandals, brushed gold earrings, and woven silk scarves...',
    category: 'Curated Accessories',
    readTime: '3 min read',
    date: 'May 06, 2026',
    content: 'The right finishing detail transforms understatement into intention. Explore our seasonal guide to lightweight accessories designed to catch the afternoon light with effortless grace.',
  },
];

const EASE_SMOOTH = [0.16, 1, 0.3, 1] as const;

// Section stagger: header → bento grid
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

const gridVariants: Variants = {
  hidden: { y: 40 },
  visible: {
    y: 0,
    transition: { duration: 0.85, ease: EASE_SMOOTH },
  },
};

export function Blogs() {
  const [activeArticle, setActiveArticle] = useState<ArticleItem | null>(null);

  return (
    <section className="relative w-full py-16 sm:py-12 overflow-hidden select-none bg-[#fbfbfb]">

      {/* BACKGROUND IMAGE OVERLAY */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <img
          src="/images/homeimgs/bgblogs.webp"
          alt="Custom Background Overlay"
          className="w-full h-full object-cover  scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#fbfbfb]/80 via-transparent to-[#fbfbfb]/90" />
      </div>

      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="relative z-10 w-full px-4 sm:px-6 md:px-8 lg:px-[98px] space-y-10 sm:space-y-12"
      >

        {/* Header Bar */}
        <motion.div
          variants={headerVariants}
          className="flex flex-col sm:flex-row sm:items-start justify-between gap-6"
        >
          <div className="space-y-2 max-w-2xl">
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-[44px] font-bold tracking-tight text-neutral-950 leading-tight">
              Latest Post &amp; Articles
            </h2>
            <p className="font-sans text-xs sm:text-sm text-neutral-500 leading-relaxed max-w-xl">
              Dive into our blog for a wealth of insights and inspiration! Whether you're looking for expert advice, the latest trends, or creative ideas, our articles are designed to inform and motivate.
            </p>
          </div>

          <div className="self-start sm:self-auto shrink-0 pt-1">
            <button
              onClick={() => setActiveArticle(COL_2_ARTICLES[0])}
              className="inline-flex items-center gap-3 px-6 py-3.5 rounded-full bg-black text-white hover:bg-neutral-800 transition-colors shadow-sm font-heading font-bold text-xs uppercase tracking-wider cursor-pointer group"
            >
              <div className="w-5 h-5 rounded-full border border-white/70 flex items-center justify-center group-hover:translate-x-0.5 transition-transform">
                <ArrowRight className="w-3 h-3 text-white" />
              </div>
              <span>VIEW MORE</span>
            </button>
          </div>
        </motion.div>

        {/* BENTO GRID */}
        <motion.div
          variants={gridVariants}
          className="rounded-[32px] sm:rounded-[36px] overflow-hidden border border-neutral-200/60 shadow-[0_8px_30px_rgba(0,0,0,0.04)] grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-neutral-200/60"
        >

          {/* COLUMN 1 */}
          <div className="lg:col-span-3 flex flex-col divide-y divide-neutral-200/60">
            {COL_1_ARTICLES.map((article) => (
              <ArticleCard
                key={article.id}
                article={article}
                size="small"
                onRead={() => setActiveArticle(article)}
              />
            ))}
          </div>

          {/* COLUMN 2 */}
          <div className="lg:col-span-6 flex flex-col divide-y divide-neutral-200/60">
            {COL_2_ARTICLES.map((article) => (
              <ArticleCard
                key={article.id}
                article={article}
                size="large"
                onRead={() => setActiveArticle(article)}
              />
            ))}
          </div>

          {/* COLUMN 3 */}
          <div className="lg:col-span-3 flex flex-col divide-y divide-neutral-200/60">
            {COL_3_ARTICLES.map((article) => (
              <ArticleCard
                key={article.id}
                article={article}
                size="small"
                onRead={() => setActiveArticle(article)}
              />
            ))}
          </div>

        </motion.div>

      </motion.div>

      {/* ARTICLE READER MODAL */}
      <AnimatePresence>
        {activeArticle && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-2xl max-h-[90vh] bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col text-neutral-900 border border-neutral-200"
            >
              <button
                type="button"
                onClick={() => setActiveArticle(null)}
                className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-white/90 hover:bg-white text-neutral-700 hover:text-black flex items-center justify-center shadow-md transition-colors cursor-pointer"
                aria-label="Close article"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="overflow-y-auto p-6 sm:p-8 space-y-6">

                <div className="aspect-[16/9] w-full rounded-2xl overflow-hidden bg-neutral-100">
                  <img
                    src={activeArticle.image}
                    alt={activeArticle.title}
                    className="w-full h-full object-cover object-center"
                  />
                </div>

                <div className="space-y-3">
                  <div className="flex flex-wrap items-center gap-3 text-xs text-neutral-500">
                    <span className="bg-neutral-100 text-neutral-800 px-2.5 py-1 rounded-full font-sans font-medium text-[11px]">
                      {activeArticle.category}
                    </span>
                    <span className="flex items-center gap-1 font-sans">
                      <Clock className="w-3.5 h-3.5" />
                      {activeArticle.readTime}
                    </span>
                    <span className="flex items-center gap-1 font-sans">
                      <Calendar className="w-3.5 h-3.5" />
                      {activeArticle.date}
                    </span>
                  </div>

                  <h3 className="font-heading font-bold text-2xl sm:text-3xl text-neutral-950 leading-tight">
                    {activeArticle.title}
                  </h3>

                  <p className="font-sans text-sm font-medium text-neutral-700 leading-relaxed italic border-l-2 border-neutral-900 pl-3">
                    {activeArticle.excerpt}
                  </p>
                </div>

                <div className="font-sans text-sm text-neutral-600 leading-relaxed border-t border-neutral-100 pt-4">
                  <p>{activeArticle.content}</p>
                  <p className="mt-4">
                    Whether you are refreshing timeless staples or exploring new architectural cuts, our conscious fabric sourcing and ergonomic tailoring ensure every garment feels like a natural extension of your personal style.
                  </p>
                </div>

                <div className="pt-4 flex items-center justify-between border-t border-neutral-100">
                  <span className="font-sans text-xs text-neutral-500">
                    Atelier Editorial Journal · King Studio
                  </span>
                  <button
                    onClick={() => setActiveArticle(null)}
                    className="px-5 py-2.5 rounded-full bg-black text-white font-sans text-xs font-semibold hover:bg-neutral-800 transition-colors cursor-pointer"
                  >
                    Close Article
                  </button>
                </div>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}

interface ArticleCardProps {
  article: ArticleItem;
  size: 'small' | 'large';
  onRead: () => void;
}

function ArticleCard({ article, size, onRead }: ArticleCardProps) {
  const isLarge = size === 'large';

  return (
    <div
      onClick={onRead}
      className={`group flex flex-col justify-between bg-transparent transition-colors duration-300 cursor-pointer ${
        isLarge
          ? 'p-6 sm:p-8 lg:p-9 space-y-5'
          : 'p-5 sm:p-5 lg:p-6 space-y-3.5'
      }`}
    >
      <div className="space-y-3">
        <div
          className={`w-full overflow-hidden rounded-2xl bg-neutral-100 relative ${
            isLarge
              ? 'aspect-[1.5/1] sm:aspect-[1.65/1]'
              : 'aspect-[1.38/1] sm:aspect-[1.45/1]'
          }`}
        >
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.06] pointer-events-none"
          />
        </div>

        <div className="space-y-1.5">
          <h3
            className={`font-heading font-bold text-neutral-900 leading-snug group-hover:text-black transition-colors ${
              isLarge
                ? 'text-xl sm:text-2xl lg:text-[25px]'
                : 'text-sm sm:text-base lg:text-[17px]'
            }`}
          >
            {article.title}
          </h3>

          <p
            className={`font-sans text-neutral-500 leading-relaxed line-clamp-2 ${
              isLarge ? 'text-xs sm:text-[13px]' : 'text-xs leading-normal'
            }`}
          >
            {article.excerpt}
          </p>
        </div>
      </div>

      <div className="pt-2">
        <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center shadow-xs shrink-0">
          <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 ease-out group-hover:translate-x-1.5" />
        </div>
      </div>
    </div>
  );
}