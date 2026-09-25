"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { ArrowRight, Eye, Check, X, ShoppingBag } from 'lucide-react';

interface SaleProduct {
    id: string;
    title: string;
    price: string;
    image: string;
    hoverImage: string;
    sizes: string[];
    colors: { name: string; hex: string }[];
    description: string;
}

const COLUMN_1_PRODUCTS: SaleProduct[] = [
    {
        id: 'sale-1',
        title: 'Seamless Gym Top',
        price: 'From Rs. 3,200.00 INR',
        image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=85',
        hoverImage: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=85',
        sizes: ['XS', 'S', 'M', 'L'],
        colors: [
            { name: 'Teal Emerald', hex: '#2d6a69' },
            { name: 'Cloud White', hex: '#f0ede6' },
            { name: 'Onyx', hex: '#1c1b1a' },
        ],
        description: 'Four-way stretch seamless compression silhouette engineered with sweat-wicking breathability and ergonomic ribbing.',
    },
    {
        id: 'sale-2',
        title: 'Zip-Up Active Jacket',
        price: 'From Rs. 3,100.00 INR',
        image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=85',
        hoverImage: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=85',
        sizes: ['S', 'M', 'L', 'XL'],
        colors: [
            { name: 'Powder Blue', hex: '#97b8cc' },
            { name: 'Dove Grey', hex: '#d1d2d4' },
            { name: 'Pitch Black', hex: '#121212' },
        ],
        description: 'Contoured performance knit with thumb-holes, dual zip pockets, and lightweight aerodynamic fabric.',
    },
    {
        id: 'sale-3',
        title: 'Contrast Polo Top',
        price: 'From Rs. 2,900.00 INR',
        image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=85',
        hoverImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=85',
        sizes: ['XS', 'S', 'M'],
        colors: [
            { name: 'Vintage Forest', hex: '#2f4336' },
            { name: 'Chalk White', hex: '#f9f8f4' },
        ],
        description: 'Vintage collegiate collar sleeveless polo crafted in organic pique cotton with brushed brass zip teeth.',
    },
];

const COLUMN_2_PRODUCTS: SaleProduct[] = [
    {
        id: 'sale-4',
        title: 'Checked Casual Shirt',
        price: 'From Rs. 4,400.00 INR',
        image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=85',
        hoverImage: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=800&q=85',
        sizes: ['M', 'L', 'XL', 'XXL'],
        colors: [
            { name: 'Sage & Cream Plaid', hex: '#586b5c' },
            { name: 'Rust Plaid', hex: '#8a4b38' },
        ],
        description: 'Brushed twill flannel overshirt featuring dual flap pockets and horn-effect buttons.',
    },
    {
        id: 'sale-5',
        title: 'Zip Hooded Sweatshirt',
        price: 'From Rs. 4,200.00 INR',
        image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=85',
        hoverImage: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=85',
        sizes: ['S', 'M', 'L', 'XL'],
        colors: [
            { name: 'Espresso Brown', hex: '#3d2e26' },
            { name: 'Washed Charcoal', hex: '#2e2e2e' },
            { name: 'Heather Grey', hex: '#bcbcba' },
        ],
        description: 'Heavyweight 450 GSM French terry cotton with structured hood and dropped shoulders.',
    },
    {
        id: 'sale-6',
        title: 'Relaxed Wool Overshirt',
        price: 'From Rs. 4,800.00 INR',
        image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=85',
        hoverImage: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=85',
        sizes: ['M', 'L', 'XL'],
        colors: [
            { name: 'Mocha Melange', hex: '#4e382b' },
            { name: 'Slate Black', hex: '#1a1918' },
        ],
        description: 'Warm virgin wool blend woven with subtle texture and tailored interior binding for relaxed refinement.',
    },
];

const LOOP_COL_1 = [...COLUMN_1_PRODUCTS, ...COLUMN_1_PRODUCTS, ...COLUMN_1_PRODUCTS];
const LOOP_COL_2 = [...COLUMN_2_PRODUCTS, ...COLUMN_2_PRODUCTS, ...COLUMN_2_PRODUCTS];

interface PremiumPicksSaleSectionProps {
    onAddToCart?: (count?: number, message?: string) => void;
}

const EASE_SMOOTH = [0.16, 1, 0.3, 1] as const;

// Container — lift entire rounded card
const containerVariants: Variants = {
    hidden: { y: 44 },
    visible: {
        y: 0,
        transition: { duration: 0.85, ease: EASE_SMOOTH },
    },
};

// Content stagger — starts after card lands
const contentStagger: Variants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.25,
        },
    },
};

// Left column — sub-staggers its own children
const leftColumnVariants: Variants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.12,
        },
    },
};

// Any individual lift item
const itemVariants: Variants = {
    hidden: { y: 26 },
    visible: {
        y: 0,
        transition: { duration: 0.7, ease: EASE_SMOOTH },
    },
};

// Right marquee container
const rightColumnVariants: Variants = {
    hidden: { y: 40 },
    visible: {
        y: 0,
        transition: { duration: 0.85, ease: EASE_SMOOTH },
    },
};

export function PicksSale({ onAddToCart }: PremiumPicksSaleSectionProps) {
    const [timeLeft, setTimeLeft] = useState({
        days: 73,
        hours: 19,
        minutes: 0,
        seconds: 10,
    });

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev.seconds > 0) {
                    return { ...prev, seconds: prev.seconds - 1 };
                } else if (prev.minutes > 0) {
                    return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
                } else if (prev.hours > 0) {
                    return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
                } else if (prev.days > 0) {
                    return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
                }
                return prev;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const [modalProduct, setModalProduct] = useState<SaleProduct | null>(null);
    const [selectedSize, setSelectedSize] = useState<string>('S');
    const [selectedColor, setSelectedColor] = useState<{ name: string; hex: string } | null>(null);
    const [addedToast, setAddedToast] = useState(false);

    const handleOpenQuickView = (product: SaleProduct) => {
        setModalProduct(product);
        setSelectedSize(product.sizes[0]);
        setSelectedColor(product.colors[0]);
    };

    const handleQuickAdd = () => {
        if (!modalProduct) return;
        setAddedToast(true);
        if (onAddToCart) {
            onAddToCart(1, `${modalProduct.title} added to bag!`);
        }
        setTimeout(() => {
            setAddedToast(false);
            setModalProduct(null);
        }, 1000);
    };

    return (
        <section className="w-full bg-[#f9f9fb] py-14 sm:py-12 select-none">
            {/* Width aligned with topbar */}
            <div className="w-full px-4 sm:px-6 md:px-8 lg:px-[98px]">

                {/* Giant Main Container with entrance lift — ORIGINAL SIZE RESTORED */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                    className="relative rounded-[32px] sm:rounded-[40px] overflow-hidden bg-neutral-950 shadow-2xl min-h-[640px] lg:min-h-[720px] flex items-center"
                >

                    {/* Blurred Atmospheric Background — ORIGINAL OVERLAYS RESTORED */}
                    <div className="absolute inset-0 pointer-events-none overflow-hidden">
                        <img
                            src="/images/homeimgs/img11.webp"
                            alt="Editorial Background"
                            className="w-full h-full object-cover object-center filter blur-sm scale-110 "
                        />
                        <div className="absolute inset-0 bg-black/40" />
                    </div>

                    {/* Content grid — staggered entrance */}
                    <motion.div
                        variants={contentStagger}
                        className="relative z-10 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 p-6 sm:p-10 lg:p-14 items-center"
                    >

                        {/* LEFT SIDE */}
                        <motion.div
                            variants={leftColumnVariants}
                            className="lg:col-span-6 space-y-8 sm:space-y-10"
                        >

                            {/* Countdown — one lift for the whole row */}
                            <motion.div
                                variants={itemVariants}
                                className="grid grid-cols-4 gap-2.5 sm:gap-4 max-w-md"
                            >
                                <div className="bg-white rounded-2xl p-3 sm:p-4 text-center shadow-md flex flex-col justify-center items-center">
                                    <span className="font-heading font-extrabold text-2xl sm:text-4xl text-black leading-none">
                                        {String(timeLeft.days).padStart(2, '0')}
                                    </span>
                                    <span className="font-sans text-[10px] sm:text-xs text-neutral-500 font-medium mt-1 uppercase tracking-wider">
                                        Days
                                    </span>
                                </div>

                                <div className="bg-white rounded-2xl p-3 sm:p-4 text-center shadow-md flex flex-col justify-center items-center">
                                    <span className="font-heading font-extrabold text-2xl sm:text-4xl text-black leading-none">
                                        {String(timeLeft.hours).padStart(2, '0')}
                                    </span>
                                    <span className="font-sans text-[10px] sm:text-xs text-neutral-500 font-medium mt-1 uppercase tracking-wider">
                                        Hours
                                    </span>
                                </div>

                                <div className="bg-white rounded-2xl p-3 sm:p-4 text-center shadow-md flex flex-col justify-center items-center">
                                    <span className="font-heading font-extrabold text-2xl sm:text-4xl text-black leading-none">
                                        {String(timeLeft.minutes).padStart(2, '0')}
                                    </span>
                                    <span className="font-sans text-[10px] sm:text-xs text-neutral-500 font-medium mt-1 uppercase tracking-wider">
                                        Minutes
                                    </span>
                                </div>

                                <div className="bg-white rounded-2xl p-3 sm:p-4 text-center shadow-md flex flex-col justify-center items-center">
                                    <span className="font-heading font-extrabold text-2xl sm:text-4xl text-black leading-none tabular-nums">
                                        {String(timeLeft.seconds).padStart(2, '0')}
                                    </span>
                                    <span className="font-sans text-[10px] sm:text-xs text-neutral-500 font-medium mt-1 uppercase tracking-wider">
                                        Seconds
                                    </span>
                                </div>
                            </motion.div>

                            {/* Headline — uses heading font */}
                            <motion.div variants={itemVariants} className="space-y-3">
                                <h2 className="font-heading text-4xl sm:text-5xl lg:text-[56px] font-bold text-white tracking-tight leading-[1.08]">
                                    Premium Picks on <br className="hidden sm:inline" />
                                    Sale For Limited <br className="hidden sm:inline" />
                                    Time
                                </h2>
                            </motion.div>

                            {/* CTA */}
                            <motion.div variants={itemVariants}>
                                <a
                                    href="#catalog"
                                    className="inline-flex items-center gap-3 px-6 py-3.5 rounded-full bg-black text-white hover:bg-neutral-900 border border-neutral-700/80 font-sans font-bold text-xs sm:text-sm tracking-wider uppercase transition-all duration-200 shadow-lg group cursor-pointer"
                                >
                                    <div className="w-6 h-6 rounded-full border border-white/60 flex items-center justify-center group-hover:translate-x-0.5 transition-transform">
                                        <ArrowRight className="w-3.5 h-3.5 text-white" />
                                    </div>
                                    <span>SHOP NOW</span>
                                </a>
                            </motion.div>

                        </motion.div>

                        {/* RIGHT SIDE: 2 Vertical Infinite Columns */}
                        <motion.div
                            variants={rightColumnVariants}
                            className="lg:col-span-6 relative h-[520px] sm:h-[600px] overflow-hidden rounded-3xl"
                        >
                            {/* FIXED: gap-x-4 controls the exact horizontal gap between columns */}
                            <div className="grid grid-cols-2 gap-x-4 gap-y-0 h-full">

                                {/* COLUMN 1 — moving up */}
                                <div className="relative overflow-hidden h-full">
                                    <motion.div
                                        className="flex flex-col will-change-transform"
                                        animate={{ y: ['0%', '-33.3333%'] }}
                                        transition={{
                                            duration: 16,
                                            ease: 'linear',
                                            repeat: Infinity,
                                        }}
                                    >
                                        {LOOP_COL_1.map((product, idx) => (
                                            <div
                                                key={`${product.id}-${idx}`}
                                                // Pushes the smaller card to the right, towards the center gap
                                                className="shrink-0 pb-3 flex justify-end"
                                            >
                                                <ProductLoopCard
                                                    product={product}
                                                    onQuickView={() => handleOpenQuickView(product)}
                                                />
                                            </div>
                                        ))}
                                    </motion.div>
                                </div>

                                {/* COLUMN 2 — moving down */}
                                <div className="relative overflow-hidden h-full">
                                    <motion.div
                                        className="flex flex-col will-change-transform"
                                        animate={{ y: ['-33.3333%', '0%'] }}
                                        transition={{
                                            duration: 16,
                                            ease: 'linear',
                                            repeat: Infinity,
                                        }}
                                    >
                                        {LOOP_COL_2.map((product, idx) => (
                                            <div
                                                key={`${product.id}-${idx}`}
                                                // Pushes the smaller card to the left, towards the center gap
                                                className="shrink-0 pb-3 flex justify-start"
                                            >
                                                <ProductLoopCard
                                                    product={product}
                                                    onQuickView={() => handleOpenQuickView(product)}
                                                />
                                            </div>
                                        ))}
                                    </motion.div>
                                </div>

                            </div>
                        </motion.div>

                    </motion.div>

                </motion.div>

            </div>

            {/* QUICK VIEW MODAL */}
            <AnimatePresence>
                {modalProduct && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 15 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 15 }}
                            transition={{ duration: 0.2 }}
                            className="relative w-full max-w-2xl bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row text-neutral-900 border border-neutral-200"
                        >
                            <button
                                type="button"
                                onClick={() => setModalProduct(null)}
                                className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-600 hover:text-black flex items-center justify-center transition-colors cursor-pointer"
                                aria-label="Close modal"
                            >
                                <X className="w-4 h-4" />
                            </button>

                            <div className="md:w-1/2 relative bg-neutral-100 min-h-[300px] md:min-h-full">
                                <img
                                    src={modalProduct.image}
                                    alt={modalProduct.title}
                                    className="w-full h-full object-cover object-top"
                                />
                            </div>

                            <div className="md:w-1/2 p-6 sm:p-8 flex flex-col justify-between space-y-6">
                                <div className="space-y-4">
                                    <div className="space-y-1">
                                        <span className="font-sans text-[11px] font-medium text-emerald-600 uppercase tracking-wider">
                                            Limited Time Sale
                                        </span>
                                        <h3 className="font-heading text-xl sm:text-2xl font-bold text-neutral-950">
                                            {modalProduct.title}
                                        </h3>
                                        <div className="font-heading font-bold text-lg text-neutral-950">
                                            {modalProduct.price}
                                        </div>
                                    </div>

                                    <p className="font-sans text-xs text-neutral-600 leading-relaxed">
                                        {modalProduct.description}
                                    </p>

                                    <div className="space-y-2">
                                        <label className="font-sans text-xs font-semibold text-neutral-800">
                                            Select Size:
                                        </label>
                                        <div className="flex flex-wrap gap-2">
                                            {modalProduct.sizes.map((size) => (
                                                <button
                                                    key={size}
                                                    type="button"
                                                    onClick={() => setSelectedSize(size)}
                                                    className={`w-9 h-9 rounded-xl font-sans text-xs font-semibold flex items-center justify-center transition-all cursor-pointer ${selectedSize === size
                                                            ? 'bg-neutral-950 text-white shadow-xs'
                                                            : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                                                        }`}
                                                >
                                                    {size}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {selectedColor && (
                                        <div className="space-y-1.5">
                                            <div className="font-sans text-xs font-semibold text-neutral-800">
                                                Color: <span className="font-normal text-neutral-500">{selectedColor.name}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                {modalProduct.colors.map((c) => (
                                                    <button
                                                        key={c.name}
                                                        type="button"
                                                        onClick={() => setSelectedColor(c)}
                                                        className={`w-7 h-7 rounded-full border-2 transition-all cursor-pointer ${selectedColor.name === c.name ? 'border-black scale-110' : 'border-transparent'
                                                            }`}
                                                        style={{ backgroundColor: c.hex }}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <button
                                    type="button"
                                    onClick={handleQuickAdd}
                                    className="w-full py-3.5 rounded-full bg-neutral-950 hover:bg-black text-white font-sans text-xs font-semibold tracking-wider uppercase transition-all shadow-md active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
                                >
                                    {addedToast ? (
                                        <>
                                            <Check className="w-4 h-4 text-emerald-400" />
                                            <span>Added to Bag!</span>
                                        </>
                                    ) : (
                                        <>
                                            <ShoppingBag className="w-4 h-4" />
                                            <span>Add to Shopping Bag</span>
                                        </>
                                    )}
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

        </section>
    );
}

/* -------------------------------------------------------
   PRODUCT LOOP CARD — FIXED (20% smaller, pushed to center)
   ------------------------------------------------------- */
function ProductLoopCard({
    product,
    onQuickView,
}: {
    product: SaleProduct;
    onQuickView: () => void;
}) {
    return (
        <div
            onClick={onQuickView}
            // FIXED: w-[80%] makes both the width and height (via aspect ratio) 20% smaller
            className="group relative aspect-[3/4] w-[80%] rounded-2xl sm:rounded-3xl overflow-hidden bg-[#d9dde0] cursor-pointer shrink-0"
        >
            {/* Primary image */}
            <img
                src={product.image}
                alt={product.title}
                className="absolute inset-0 w-full h-full object-cover object-top transition-all duration-700 ease-out group-hover:opacity-0 group-hover:scale-[1.06] pointer-events-none"
            />

            {/* Hover image */}
            <img
                src={product.hoverImage}
                alt={`${product.title} alternate pose`}
                className="absolute inset-0 w-full h-full object-cover object-top opacity-0 transition-all duration-700 ease-out group-hover:opacity-100 group-hover:scale-[1.04] pointer-events-none"
            />

            {/* Quick view pill — no shadow */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-10 pointer-events-none">
                <span className="px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-md text-neutral-950 font-sans text-[11px] font-semibold transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 flex items-center gap-1.5">
                    <Eye className="w-3.5 h-3.5" />
                    <span>Quick View</span>
                </span>
            </div>

            {/* Product info — no shadow */}
            <div className="absolute bottom-3 left-3 right-3 z-10 pointer-events-none">
                <div className="bg-white rounded-xl py-2 px-3 space-y-0.5">
                    <h4 className="font-sans text-[11px] sm:text-xs font-medium text-neutral-800 truncate">
                        {product.title}
                    </h4>
                    <p className="font-sans text-[11px] sm:text-xs font-bold text-neutral-950">
                        {product.price}
                    </p>
                </div>
            </div>
        </div>
    );
}