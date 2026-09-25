"use client";

import React, { useState } from 'react';
import { motion, type Variants } from 'framer-motion';
import { Globe } from 'lucide-react';
import { SocialIcons } from '../Reusable/SocialIcons';

interface SiteFooterProps {
  onSearchClick?: () => void;
}

const EASE_SMOOTH = [0.16, 1, 0.3, 1] as const;

const containerVariants: Variants = {
  hidden: { y: 50 },
  visible: {
    y: 0,
    transition: { duration: 0.9, ease: EASE_SMOOTH },
  },
};

const contentStagger: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.2,
    },
  },
};

const leftColumnVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const rightColumnVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { y: 26 },
  visible: {
    y: 0,
    transition: { duration: 0.7, ease: EASE_SMOOTH },
  },
};

export function SiteFooter({ onSearchClick }: SiteFooterProps) {
  const [activeLinkId, setActiveLinkId] = useState<string>('Quick Links');

  const handleLinkClick = (id: string, action?: () => void) => {
    setActiveLinkId(id);
    if (action) action();
  };

  return (
    <motion.footer
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.05 }}
      className="w-full bg-[#fbfbfb] pt-12 sm:pt-16 select-none"
    >
      {/* Full-width dark container — no side padding, spans viewport edge to edge */}
      <div className="w-full rounded-t-[36px] sm:rounded-t-[48px] bg-[#1a1b1f] text-neutral-300 pt-14 sm:pt-20 pb-10 px-6 sm:px-12 lg:px-16 space-y-14 shadow-2xl">

        {/* Main 2-Column Layout */}
        <motion.div
          variants={contentStagger}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16"
        >

          {/* LEFT COLUMN */}
          <motion.div
            variants={leftColumnVariants}
            className="lg:col-span-4 space-y-6"
          >

            {/* King Logo with Crown */}
            <motion.div variants={itemVariants} className="space-y-1">
              <div className="inline-flex items-center gap-1 font-heading text-3xl sm:text-4xl text-white font-bold tracking-tight">
                <span className="relative">
                  K
                  <span className="relative inline-block">
                    i
                    <svg
                      className="w-3.5 h-3.5 text-white absolute -top-2.5 left-1/2 -translate-x-1/2"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      stroke="none"
                      aria-hidden="true"
                    >
                      <path d="M5 16L3 5l5.5 5L12 4l3.5 6L21 5l-2 11H5zm14 3c0 .6-.4 1-1 1H6c-.6 0-1-.4-1-1v-1h14v1z" />
                    </svg>
                  </span>
                  ng
                </span>
              </div>
            </motion.div>

            {/* Disclaimer */}
            <motion.p
              variants={itemVariants}
              className="font-sans text-xs text-neutral-400 leading-relaxed max-w-sm"
            >
              This is a demonstration store. This demo product is not available for purchase. The product images have been taken from freepik.
            </motion.p>

            {/* Social Icons — imported from SocialIcons.tsx */}
            <motion.div variants={itemVariants} className="pt-2">
              <SocialIcons
                className="flex items-center gap-3 text-neutral-300"
                iconClassName="w-5 h-5 transition-colors duration-200 hover:text-white"
                onSocialClick={(platform) => {
                  console.log(`Opening ${platform}...`);
                }}
              />
            </motion.div>

          </motion.div>

          {/* RIGHT COLUMN */}
          <motion.div
            variants={rightColumnVariants}
            className="lg:col-span-8 space-y-10 sm:space-y-12"
          >

            {/* Tagline */}
            <motion.div variants={itemVariants}>
              <a
                href="#catalog"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="block w-full font-heading text-xl sm:text-2xl lg:text-[27px] font-bold text-white tracking-tight leading-snug cursor-pointer transition-colors hover:text-neutral-200"
              >
                Introducing our New Fashion Collection, where contemporary style meets timeless elegance.
              </a>
            </motion.div>

            {/* 3 Nav Columns */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-6">

              {/* 1. Quick Links */}
              <motion.div variants={itemVariants} className="space-y-4">
                <FooterHeading
                  title="Quick Links"
                  onClick={() => {
                    handleLinkClick('Quick Links');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                />
                <ul className="space-y-2.5">
                  {['Home page', 'Search', 'Contact', 'News', 'FAQ'].map((link) => (
                    <li key={link}>
                      <FooterLink
                        name={link}
                        isActive={activeLinkId === link}
                        onClick={() => {
                          if (link === 'Home page') {
                            handleLinkClick(link, () => window.scrollTo({ top: 0, behavior: 'smooth' }));
                          } else if (link === 'Search' && onSearchClick) {
                            handleLinkClick(link, onSearchClick);
                          } else {
                            handleLinkClick(link);
                          }
                        }}
                      />
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* 2. All Collections */}
              <motion.div variants={itemVariants} className="space-y-4">
                <FooterHeading
                  title="All Collections"
                  onClick={() => {
                    handleLinkClick('All Collections');
                    const target = document.getElementById('categories') || document.getElementById('catalog');
                    if (target) {
                      target.scrollIntoView({ behavior: 'smooth' });
                    } else {
                      window.scrollTo({ top: 700, behavior: 'smooth' });
                    }
                  }}
                />
                <ul className="space-y-2.5">
                  {['Best Sellings', 'Jacket', 'Men', 'New Arrivals', 'Women'].map((link) => (
                    <li key={link}>
                      <FooterLink
                        name={link}
                        isActive={activeLinkId === link}
                        onClick={() => {
                          handleLinkClick(link, () => {
                            const target = document.getElementById('catalog') || document.getElementById('categories');
                            if (target) target.scrollIntoView({ behavior: 'smooth' });
                          });
                        }}
                      />
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* 3. Top Sellings */}
              <motion.div variants={itemVariants} className="space-y-4">
                <FooterHeading
                  title="Top Sellings"
                  onClick={() => {
                    handleLinkClick('Top Sellings');
                    const target = document.getElementById('catalog');
                    if (target) {
                      target.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                />
                <ul className="space-y-2.5">
                  {[
                    'Balloon Sleeve Top',
                    'Corduroy Shirt Jacket',
                    'Overshirt Jacket',
                    'Satin Cowl Neck Top',
                    'Solid Casual Overshirt',
                  ].map((link) => (
                    <li key={link}>
                      <FooterLink
                        name={link}
                        isActive={activeLinkId === link}
                        onClick={() => {
                          handleLinkClick(link, () => {
                            const target = document.getElementById('catalog');
                            if (target) target.scrollIntoView({ behavior: 'smooth' });
                          });
                        }}
                      />
                    </li>
                  ))}
                </ul>
              </motion.div>

            </div>

          </motion.div>

        </motion.div>

        {/* BOTTOM BAR */}
        <motion.div
          variants={itemVariants}
          className="pt-8 border-t border-neutral-800/80 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-neutral-400"
        >

          <div className="flex items-center gap-2 text-neutral-300 hover:text-white transition-colors cursor-pointer">
            <Globe className="w-3.5 h-3.5" />
            <span className="font-sans font-medium tracking-wide">₹ INR / EN</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[11px] sm:text-xs">
            {[
              'Refund policy',
              'Privacy policy',
              'Terms of service',
              'Shipping policy',
              'Contact information',
              'Legal notice',
            ].map((policy) => (
              <FooterLink
                key={policy}
                name={policy}
                isActive={activeLinkId === policy}
                onClick={() => handleLinkClick(policy)}
              />
            ))}
          </div>

          <div className="font-sans text-[11px] sm:text-xs text-neutral-400 text-center md:text-right">
            Copyright© 2026 theking-castle Powered by Shopify
          </div>

        </motion.div>

      </div>
    </motion.footer>
  );
}

/**
 * Footer link — animated sliding underline on hover, pinned when active.
 */
interface FooterLinkProps {
  name: string;
  isActive: boolean;
  onClick: () => void;
}

function FooterLink({ name, isActive, onClick }: FooterLinkProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group relative inline-block text-left text-xs sm:text-[13px] py-0.5 cursor-pointer font-sans transition-colors ${
        isActive ? 'text-white font-medium' : 'text-neutral-400 hover:text-white'
      }`}
    >
      <span>{name}</span>
      <span
        aria-hidden="true"
        className={`absolute bottom-0 left-0 w-full h-[1.5px] bg-white transition-transform duration-300 ease-out ${
          isActive
            ? 'scale-x-100 origin-left'
            : 'scale-x-0 origin-right group-hover:scale-x-100 group-hover:origin-left'
        }`}
      />
    </button>
  );
}

/**
 * Section column heading — full-width, no hover effect, no underline.
 */
function FooterHeading({
  title,
  onClick,
}: {
  title: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="block w-full text-left font-heading font-bold text-sm sm:text-base text-white tracking-wide cursor-pointer"
    >
      {title}
    </button>
  );
}

export default SiteFooter;