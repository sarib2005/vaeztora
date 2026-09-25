"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { Plus, X, Check } from 'lucide-react';

export interface PairingProduct {
  id: string;
  name: string;
  price: number;
  priceFormatted: string;
  image: string;
  sizes: string[];
  colors: { name: string; hex: string }[];
}

const PRODUCTS: PairingProduct[] = [
  {
    id: 'prod-crew-neck',
    name: 'Crew Neck T-Shirt',
    price: 2500,
    priceFormatted: 'From Rs. 2,500.00 INR',
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=85',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Mint Green', hex: '#a3cfbb' },
      { name: 'Off White', hex: '#f2efe9' },
      { name: 'Black', hex: '#1c1b1a' },
    ],
  },
  {
    id: 'prod-checked-shirt',
    name: 'Checked Casual Shirt',
    price: 4400,
    priceFormatted: 'From Rs. 4,400.00 INR',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=85',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Sage & Cream Plaid', hex: '#586b5c' },
      { name: 'Rust Plaid', hex: '#8a4b38' },
    ],
  },
  {
    id: 'prod-wrap-top',
    name: 'Wrap Waist Top',
    price: 3500,
    priceFormatted: 'From Rs. 3,500.00 INR',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=85',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'Olive Green', hex: '#3b4436' },
      { name: 'Earthy Clay', hex: '#8c5d43' },
      { name: 'Midnight', hex: '#1e2124' },
    ],
  },
];

interface BundleSlotItem {
  product: PairingProduct;
  selectedSize: string;
  selectedColor: { name: string; hex: string };
}

interface PerfectPairingProps {
  onAddToCart?: (count?: number, message?: string) => void;
}

const EASE_SMOOTH = [0.16, 1, 0.3, 1] as const;

const sectionVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

const headingVariants: Variants = {
  hidden: { y: 24 },
  visible: {
    y: 0,
    transition: { duration: 0.7, ease: EASE_SMOOTH },
  },
};

const cardsContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.09,
    },
  },
};

const cardItemVariants: Variants = {
  hidden: { y: 34 },
  visible: {
    y: 0,
    transition: { duration: 0.7, ease: EASE_SMOOTH },
  },
};

export function PerfectPairing({ onAddToCart }: PerfectPairingProps) {
  const [bundleSlots, setBundleSlots] = useState<(BundleSlotItem | null)[]>([
    {
      product: PRODUCTS[1],
      selectedSize: 'M',
      selectedColor: PRODUCTS[1].colors[0],
    },
    null,
    null,
  ]);

  const [modalProduct, setModalProduct] = useState<PairingProduct | null>(null);
  const [modalSize, setModalSize] = useState<string>('M');
  const [modalColor, setModalColor] = useState<{ name: string; hex: string } | null>(null);

  const handleOpenOptions = (product: PairingProduct) => {
    setModalProduct(product);
    setModalSize(product.sizes[0]);
    setModalColor(product.colors[0]);
  };

  const handleQuickAdd = (product: PairingProduct) => {
    const existingIndex = bundleSlots.findIndex((item) => item?.product.id === product.id);
    if (existingIndex !== -1) {
      handleRemoveSlot(existingIndex);
      return;
    }

    const emptyIndex = bundleSlots.findIndex((item) => item === null);
    if (emptyIndex !== -1) {
      setBundleSlots((prev) => {
        const next = [...prev];
        next[emptyIndex] = {
          product,
          selectedSize: product.sizes[0],
          selectedColor: product.colors[0],
        };
        return next;
      });
    } else {
      handleOpenOptions(product);
    }
  };

  const handleConfirmModal = () => {
    if (!modalProduct || !modalColor) return;

    const existingIndex = bundleSlots.findIndex((item) => item?.product.id === modalProduct.id);
    const targetIndex = existingIndex !== -1 ? existingIndex : bundleSlots.findIndex((item) => item === null);

    if (targetIndex !== -1) {
      setBundleSlots((prev) => {
        const next = [...prev];
        next[targetIndex] = {
          product: modalProduct,
          selectedSize: modalSize,
          selectedColor: modalColor,
        };
        return next;
      });
    }
    setModalProduct(null);
  };

  const handleRemoveSlot = (index: number) => {
    setBundleSlots((prev) => {
      const next = [...prev];
      next[index] = null;
      return next;
    });
  };

  const handleRemoveAll = () => {
    setBundleSlots([null, null, null]);
  };

  const activeItems = bundleSlots.filter((item): item is BundleSlotItem => item !== null);
  const totalAmount = activeItems.reduce((sum, item) => sum + item.product.price, 0);
  const totalFormatted = `Rs. ${totalAmount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  const handleAddToCart = () => {
    if (activeItems.length === 0) return;
    if (onAddToCart) {
      onAddToCart(activeItems.length, `${activeItems.length} items from bundle added to cart!`);
    }
  };

  return (
    <section className="w-full bg-white py-14 sm:py-12 border-t border-neutral-200 select-none">
      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="w-full px-4 sm:px-6 md:px-8 lg:px-[98px] space-y-8 sm:space-y-10"
      >

        {/* Heading — uses --font-heading via base layer; explicit font-heading for clarity */}
        <motion.div variants={headingVariants}>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-[42px] font-bold tracking-tight text-black">
            The Perfect Style Pairing
          </h2>
        </motion.div>

        {/* 4 Columns */}
        <motion.div
          variants={cardsContainerVariants}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-start"
        >

          {/* PRODUCT CARDS */}
          {PRODUCTS.map((product) => {
            const isAdded = bundleSlots.some((slot) => slot?.product.id === product.id);

            return (
              <motion.div
                key={product.id}
                variants={cardItemVariants}
                className="flex flex-col space-y-3"
              >
                <div className="relative aspect-[1/1.1] w-full rounded-2xl overflow-hidden bg-[#d9dde0]">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover object-center pointer-events-none"
                  />
                </div>

                {/* Product name (p-like span, uses Inter from body) */}
                <div className="space-y-1 pt-1">
                  <h3 className="font-sans text-xs sm:text-[13px] font-normal text-neutral-800 leading-tight">
                    {product.name}
                  </h3>
                  <p className="font-sans text-xs sm:text-[13px] font-bold text-black leading-tight">
                    {product.priceFormatted}
                  </p>
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => handleOpenOptions(product)}
                    className="flex-1 py-3 px-5 rounded-full bg-black text-white text-[11px] sm:text-xs font-semibold tracking-wider uppercase hover:bg-neutral-800 transition-colors cursor-pointer text-center font-sans"
                  >
                    CHOOSE OPTIONS
                  </button>

                  <button
                    type="button"
                    onClick={() => handleQuickAdd(product)}
                    className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-black text-white flex items-center justify-center hover:bg-neutral-800 transition-colors cursor-pointer shrink-0"
                    title={isAdded ? 'Remove from bundle' : 'Add to bundle'}
                  >
                    {isAdded ? (
                      <Check className="w-4 h-4 text-white" />
                    ) : (
                      <Plus className="w-5 h-5 text-white" />
                    )}
                  </button>
                </div>
              </motion.div>
            );
          })}

          {/* SHOP THE BUNDLE CARD */}
          <motion.div
            variants={cardItemVariants}
            className="bg-white rounded-3xl border border-neutral-200/90 shadow-[0_8px_30px_rgb(0,0,0,0.06)] p-6 sm:p-7 flex flex-col justify-between space-y-6"
          >

            <div className="space-y-6">

              <div className="text-center space-y-2">
                <h3 className="font-heading text-lg sm:text-xl font-bold text-black">
                  Shop the Bundle
                </h3>
                <p className="font-sans text-[11px] sm:text-xs text-neutral-600 leading-relaxed max-w-[280px] mx-auto">
                  Complete your look with handpicked clothing bundles that combine style, comfort, and exceptional value in one easy purchase.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-3 justify-center items-center">
                {bundleSlots.map((slot, index) => {
                  if (slot) {
                    return (
                      <div
                        key={index}
                        className="relative aspect-square rounded-xl border border-dashed border-neutral-400 bg-neutral-100 flex items-center justify-center overflow-visible"
                      >
                        <img
                          src={slot.product.image}
                          alt={slot.product.name}
                          className="w-full h-full object-cover rounded-xl"
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveSlot(index)}
                          className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-black text-white flex items-center justify-center hover:bg-neutral-800 transition-colors cursor-pointer shadow-sm"
                          title="Remove item"
                        >
                          <X className="w-3 h-3 text-white" />
                        </button>
                      </div>
                    );
                  }

                  return (
                    <div
                      key={index}
                      onClick={() => {
                        const unadded = PRODUCTS.find(
                          (p) => !bundleSlots.some((s) => s?.product.id === p.id)
                        );
                        if (unadded) handleQuickAdd(unadded);
                      }}
                      className="aspect-square rounded-xl border border-dashed border-neutral-300 bg-[#ebebeb]/70 hover:bg-[#ebebeb] flex items-center justify-center cursor-pointer transition-colors"
                      title="Click to add an item"
                    >
                      <Plus className="w-5 h-5 text-neutral-400" />
                    </div>
                  );
                })}
              </div>

            </div>

            <div className="space-y-4 pt-4 border-t border-neutral-200">

              <div className="flex items-center justify-between font-sans text-sm sm:text-base font-bold text-black px-1">
                <span>Total</span>
                <span>{totalFormatted}</span>
              </div>

              <div className="space-y-2.5">
                <button
                  type="button"
                  onClick={handleRemoveAll}
                  disabled={activeItems.length === 0}
                  className={`w-full py-3.5 rounded-full font-sans text-xs sm:text-sm font-semibold text-white transition-colors cursor-pointer ${
                    activeItems.length > 0
                      ? 'bg-black hover:bg-neutral-800'
                      : 'bg-neutral-300 text-neutral-500 cursor-not-allowed'
                  }`}
                >
                  Remove all
                </button>

                <button
                  type="button"
                  onClick={handleAddToCart}
                  disabled={activeItems.length === 0}
                  className={`w-full py-3.5 rounded-full font-sans text-xs sm:text-sm font-semibold text-white transition-colors cursor-pointer ${
                    activeItems.length > 0
                      ? 'bg-[#71767b] hover:bg-[#5f6368]'
                      : 'bg-neutral-300 text-neutral-500 cursor-not-allowed'
                  }`}
                >
                  {activeItems.length > 0
                    ? `${totalFormatted}: Add to cart`
                    : 'Add to cart'}
                </button>
              </div>

            </div>

          </motion.div>

        </motion.div>

      </motion.div>

      {/* CHOOSE OPTIONS MODAL */}
      <AnimatePresence>
        {modalProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-neutral-200 p-6 overflow-hidden text-neutral-900 space-y-5"
            >
              <button
                onClick={() => setModalProduct(null)}
                className="absolute top-4 right-4 p-1 rounded-full hover:bg-neutral-100 text-neutral-400 hover:text-black transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-4">
                <img
                  src={modalProduct.image}
                  alt={modalProduct.name}
                  className="w-16 h-20 rounded-xl object-cover bg-neutral-100 shrink-0"
                />
                <div className="space-y-1">
                  <h3 className="font-heading font-bold text-base text-black">
                    {modalProduct.name}
                  </h3>
                  <p className="font-sans text-sm font-semibold text-black">
                    {modalProduct.priceFormatted}
                  </p>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="font-sans text-xs font-semibold text-neutral-700">
                  Color: <span className="font-normal text-neutral-500">{modalColor?.name}</span>
                </label>
                <div className="flex items-center gap-2">
                  {modalProduct.colors.map((color) => {
                    const isSelected = modalColor?.name === color.name;
                    return (
                      <button
                        key={color.name}
                        type="button"
                        onClick={() => setModalColor(color)}
                        className={`w-7 h-7 rounded-full border-2 transition-all cursor-pointer ${
                          isSelected ? 'border-black scale-110' : 'border-transparent hover:scale-105'
                        }`}
                        style={{ backgroundColor: color.hex }}
                      />
                    );
                  })}
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="font-sans text-xs font-semibold text-neutral-700">
                  Size: <span className="font-normal text-neutral-500">{modalSize}</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {modalProduct.sizes.map((size) => {
                    const isSelected = modalSize === size;
                    return (
                      <button
                        key={size}
                        type="button"
                        onClick={() => setModalSize(size)}
                        className={`px-3 py-1.5 rounded-lg font-sans text-xs font-semibold transition-colors cursor-pointer border ${
                          isSelected
                            ? 'bg-black text-white border-black'
                            : 'bg-white text-neutral-800 border-neutral-300 hover:border-black'
                        }`}
                      >
                        {size}
                      </button>
                    );
                  })}
                </div>
              </div>

              <button
                type="button"
                onClick={handleConfirmModal}
                className="w-full py-3 rounded-full bg-black text-white font-sans text-xs font-semibold uppercase tracking-wider hover:bg-neutral-800 transition-colors cursor-pointer"
              >
                Add to Bundle
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default PerfectPairing;