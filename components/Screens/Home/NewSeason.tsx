"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface PillCategory {
  id: string;
  type: 'pill' | 'image';
  label?: string;
  image?: string;
  count?: string;
  shape?: 'wide' | 'round';
}

export const NewSeason: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  // Row 1 items matching image
  const row1: PillCategory[] = [
    { id: 't-shirts', type: 'pill', label: 'T-Shirts', count: '48 styles' },
    {
      id: 'img-male',
      type: 'image',
      image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80',
      shape: 'wide',
    },
    { id: 'jackets', type: 'pill', label: 'Jackets', count: '32 styles' },
    { id: 'hoodies', type: 'pill', label: 'Hoodies', count: '24 styles' },
    { id: 'trending-tops', type: 'pill', label: 'Trending Tops', count: '56 styles' },
  ];

  // Row 2 items matching image
  const row2: PillCategory[] = [
    { id: 'summer-dresses', type: 'pill', label: 'Summer Dresses', count: '42 styles' },
    { id: 'sweaters', type: 'pill', label: 'Sweaters', count: '29 styles' },
    { id: 'casual-shirts', type: 'pill', label: 'Casual Shirts', count: '38 styles' },
    {
      id: 'img-summer',
      type: 'image',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=500&q=80',
      shape: 'wide',
    },
    { id: 'gym-suits', type: 'pill', label: 'Gym Suits', count: '22 styles' },
  ];

  // Row 3 items matching image
  const row3: PillCategory[] = [
    { id: 'sports-wear', type: 'pill', label: 'Sports wear', count: '35 styles' },
    {
      id: 'img-chic',
      type: 'image',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
      shape: 'round',
    },
    { id: 'chic-style', type: 'pill', label: 'Chic Style', count: '60 styles' },
  ];

  return (
    <section className="relative w-full bg-[#f4f4f7] py-20 sm:py-28 px-4 sm:px-6 lg:px-8 overflow-hidden select-none">
      
      {/* Soft Ethereal Sunset/Pastel Glow in the Background (Matching screenshot) */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <div className="w-[600px] sm:w-[900px] h-[350px] rounded-full bg-gradient-to-r from-amber-200/35 via-rose-200/25 to-sky-200/20 blur-3xl transform -rotate-6" />
      </div>

      <div className="relative max-w-5xl mx-auto space-y-10 sm:space-y-12 text-center">
        
        {/* Section Heading: "New Season, New Style" */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-2"
        >
          <h2 className="font-heading text-3xl sm:text-5xl font-bold tracking-tight text-neutral-950">
            New Season, New Style
          </h2>
        </motion.div>

        {/* Floating Category Pills & Image Capsules Cloud */}
        <div className="flex flex-col items-center gap-3.5 sm:gap-4.5">
          
          {/* Row 1 */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-wrap items-center justify-center gap-3 sm:gap-3.5"
          >
            {row1.map((item) => (
              <PillOrImage
                key={item.id}
                item={item}
                isActive={activeCategory === item.id}
                onSelect={() => setActiveCategory(item.id)}
              />
            ))}
          </motion.div>

          {/* Row 2 */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-wrap items-center justify-center gap-3 sm:gap-3.5"
          >
            {row2.map((item) => (
              <PillOrImage
                key={item.id}
                item={item}
                isActive={activeCategory === item.id}
                onSelect={() => setActiveCategory(item.id)}
              />
            ))}
          </motion.div>

          {/* Row 3 */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-3 sm:gap-3.5"
          >
            {row3.map((item) => (
              <PillOrImage
                key={item.id}
                item={item}
                isActive={activeCategory === item.id}
                onSelect={() => setActiveCategory(item.id)}
              />
            ))}
          </motion.div>

        </div>

      </div>
    </section>
  );
};

// Sub-component for individual text pill with "Fill from below" hover effect OR image capsule
interface PillOrImageProps {
  item: PillCategory;
  isActive: boolean;
  onSelect: () => void;
}

const PillOrImage: React.FC<PillOrImageProps> = ({ item, isActive, onSelect }) => {
  if (item.type === 'image') {
    if (item.shape === 'round') {
      return (
        <motion.div
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          className="w-11 h-11 sm:w-13 sm:h-13 rounded-full overflow-hidden border border-black shadow-sm bg-neutral-200 cursor-pointer shrink-0"
        >
          <img
            src={item.image}
            alt="Category preview"
            className="w-full h-full object-cover object-center"
          />
        </motion.div>
      );
    }

    return (
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.96 }}
        className="w-24 sm:w-28 h-10 sm:h-12 rounded-full overflow-hidden border border-black shadow-sm bg-neutral-200 cursor-pointer shrink-0"
      >
        <img
          src={item.image}
          alt="Category capsule"
          className="w-full h-full object-cover object-[center_30%]"
        />
      </motion.div>
    );
  }

  return (
    <button
      type="button"
      onClick={onSelect}
      className={`group relative overflow-hidden px-5 sm:px-6 py-2.5 sm:py-3 rounded-full border border-black shadow-xs cursor-pointer select-none transition-all duration-300 ${
        isActive ? 'bg-black text-white' : 'bg-transparent'
      }`}
    >
      {/* THE HOVER FILL FROM BELOW LAYER */}
      <span
        className="absolute inset-0 bg-black rounded-full transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out pointer-events-none"
        aria-hidden="true"
      />

      {/* Pill Text Content: Transitions color smoothly as fill rises */}
      <span
        className={`relative z-10 text-xs sm:text-sm font-medium tracking-tight whitespace-nowrap transition-colors duration-300 ${
          isActive ? 'text-white' : 'text-neutral-900 group-hover:text-white'
        }`}
      >
        {item.label}
      </span>
    </button>
  );
};
