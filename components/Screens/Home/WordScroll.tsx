"use client";

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, MotionValue } from 'framer-motion';

interface WordProps {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
}

const Word: React.FC<WordProps> = ({ children, progress, range }) => {
  const opacity = useTransform(progress, range, [0.22, 1]);

  return (
    <span className="relative inline-block mr-[0.25em] last:mr-0 select-none">
      <span className="text-[#a8abb5] font-bold select-none">{children}</span>

      <motion.span
        style={{ opacity }}
        className="absolute inset-0 text-[#171824] font-bold select-none"
      >
        {children}
      </motion.span>
    </span>
  );
};

export const WordScroll: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // Smoother spring — fluid liquid feel
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 30,
    mass: 0.25,
  });

  const statement =
    'Classic designs, exceptional quality, and everyday versatility made to keep you looking confident wherever you go. Dress with confidence in timeless essentials designed to complement your lifestyle, season after season.';

  const words = statement.split(' ');
  const totalWords = words.length;

  return (
    <section
      ref={containerRef}
      className="relative bg-[#f0f1f4] text-neutral-900 select-none py-24 sm:py-12"
    >
      {/* Soft studio radial gradient */}
      <div className="absolute inset-0 bg-radial from-white via-[#eff0f3] to-[#e4e6eb] pointer-events-none" />

      {/* Content — width aligned with topbar, wider text container */}
      <div className="relative z-10 w-full px-4 sm:px-6 md:px-8 lg:px-[98px] flex justify-center">
        <div className="w-full max-w-6xl text-center">
          <p className="font-heading text-2xl sm:text-4xl md:text-5xl lg:text-[3.25rem] xl:text-[3.45rem] font-bold tracking-tight leading-[1.2] sm:leading-[1.16] text-center">
            {words.map((word, i) => {
              const step = 0.82 / totalWords;
              const start = 0.05 + i * step;
              const end = Math.min(start + step * 2.4, 0.95);

              return (
                <Word
                  key={`${word}-${i}`}
                  progress={smoothProgress}
                  range={[start, end]}
                >
                  {word}
                </Word>
              );
            })}
          </p>
        </div>
      </div>
    </section>
  );
};