"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Store, Globe, Phone, Check, MapPin, X, Clock } from 'lucide-react';
import { SocialIcons } from './SocialIcons';

interface CurrencyItem {
  symbol: string;
  code: string;
  flag: string;
  name: string;
}

const CURRENCY_LIST: CurrencyItem[] = [
  { symbol: '₹', code: 'INR', flag: '🇮🇳', name: 'Indian Rupee' },
  { symbol: '€', code: 'EUR', flag: '🇪🇺', name: 'Euro' },
  { symbol: '$', code: 'USD', flag: '🇺🇸', name: 'US Dollar' },
  { symbol: '£', code: 'GBP', flag: '🇬🇧', name: 'British Pound' },
  { symbol: 'د.إ', code: 'AED', flag: '🇦🇪', name: 'UAE Dirham' },
  { symbol: '¥', code: 'JPY', flag: '🇯🇵', name: 'Japanese Yen' },
];

const STORE_LOCATIONS = [
  {
    id: 'mumbai',
    name: 'Flagship Bandra West',
    address: 'Waterfield Road, Bandra West, Mumbai 400050',
    hours: '11:00 AM – 9:30 PM',
    phone: '+91 22 2640 1820',
    status: 'Open Now',
  },
  {
    id: 'delhi',
    name: 'The Chanakya Boutique',
    address: 'Chanakyapuri, New Delhi 110021',
    hours: '10:30 AM – 9:00 PM',
    phone: '+91 11 2611 4455',
    status: 'Open Now',
  },
  {
    id: 'bengaluru',
    name: 'Indiranagar Studio',
    address: '100 Feet Road, Indiranagar, Bengaluru 560038',
    hours: '11:00 AM – 9:00 PM',
    phone: '+91 80 4125 7890',
    status: 'Open Now',
  },
];

export function AnnouncementBar() {
  const [currency, setCurrency] = useState<CurrencyItem>(CURRENCY_LIST[0]);
  const [language, setLanguage] = useState<'EN' | 'HI' | 'FR' | 'DE'>('EN');

  const [isStoreOpen, setIsStoreOpen] = useState(false);
  const [isCurrencyOpen, setIsCurrencyOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isCopiedCode, setIsCopiedCode] = useState(false);
  const [isCopiedPhone, setIsCopiedPhone] = useState(false);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2400);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText('WELCOME');
    setIsCopiedCode(true);
    showToast('Promo code "WELCOME" copied to clipboard!');
    setTimeout(() => setIsCopiedCode(false), 2400);
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText('0123456780');
    setIsCopiedPhone(true);
    showToast('Phone "0123456780" copied to clipboard!');
    setTimeout(() => setIsCopiedPhone(false), 2400);
  };

  return (
    <>
      {/* MONOCHROME BLACK TOP UTILITY BANNER */}
      <motion.div
        initial={{ y: -36, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full bg-black text-neutral-300 border-b border-neutral-900 select-none text-[11.5px] tracking-tight z-40"
      >
        <div className="w-full px-[98px] h-10 flex items-center justify-between gap-4">
          
          {/* 1. LEFT: Social Icons + Phone Number */}
          <motion.div
            initial={{ opacity: 0, x: -14 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.15, ease: 'easeOut' }}
            className="flex items-center gap-3 sm:gap-4 shrink-0"
          >
            {/* Social Icons from SocialIcons.tsx */}
            <SocialIcons
              className="flex items-center gap-2.5 sm:gap-3 text-neutral-400"
              iconClassName="w-3.5 h-3.5 hover:text-white transition-colors"
              onSocialClick={(platform) => showToast(`Opening ${platform}...`)}
            />

            <span className="hidden sm:inline text-neutral-800">|</span>

            {/* Telephone Number */}
            <button
              type="button"
              onClick={handleCopyPhone}
              className="flex items-center gap-1.5 font-medium text-neutral-300 hover:text-white transition-colors cursor-pointer group"
              title="Click to copy telephone number"
            >
              <Phone className="w-3 h-3 text-neutral-500 group-hover:text-neutral-300 transition-colors hidden sm:inline" />
              <span className="font-mono text-neutral-200 group-hover:text-white tracking-normal">
                0323-3232541
              </span>
              {isCopiedPhone && (
                <span className="text-[10px] text-emerald-400 font-sans hidden md:inline flex items-center gap-0.5">
                  <Check className="w-2.5 h-2.5" /> Copied
                </span>
              )}
            </button>
          </motion.div>

          {/* 2. CENTER: Promotional Announcement (NEW CUSTOMERS 10% OFF WITH WELCOME) */}
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.22, ease: 'easeOut' }}
            className="flex-1 text-center truncate px-2"
          >
            <button
              type="button"
              onClick={handleCopyCode}
              className="inline-flex items-center gap-1.5 font-medium uppercase tracking-wider text-[11px] sm:text-[11.5px] text-neutral-200 hover:text-white cursor-pointer transition-colors group"
              title="Click to copy coupon code WELCOME"
            >
              <span>NEW CUSTOMERS 10% OFF WITH WELCOME</span>
              <span className="hidden sm:inline-flex items-center px-1.5 py-0.2 rounded bg-neutral-900 border border-neutral-800 group-hover:border-neutral-700 text-[9.5px] text-neutral-300 group-hover:text-white font-mono tracking-widest transition-colors">
                {isCopiedCode ? 'COPIED ✓' : 'COPY'}
              </span>
            </button>
          </motion.div>

          {/* 3. RIGHT: Stores & Currency */}
          <motion.div
            initial={{ opacity: 0, x: 14 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.18, ease: 'easeOut' }}
            className="flex items-center gap-4 sm:gap-5 shrink-0"
          >
            {/* Stores Button */}
            <button
              type="button"
              onClick={() => setIsStoreOpen(true)}
              className="flex items-center gap-1.5 font-medium text-neutral-300 hover:text-white transition-colors cursor-pointer group"
              title="View Boutique Stores"
            >
              <Store className="w-3.5 h-3.5 text-neutral-400 group-hover:text-white transition-colors" />
              <span>Stores</span>
            </button>

            {/* Currency & Language Button */}
            <button
              type="button"
              onClick={() => setIsCurrencyOpen(true)}
              className="flex items-center gap-1.5 font-medium text-neutral-300 hover:text-white transition-colors cursor-pointer group"
              title="Select Currency and Language"
            >
              <Globe className="w-3.5 h-3.5 text-neutral-400 group-hover:text-white transition-colors" />
              <span className="font-mono">
                {currency.symbol} {currency.code} / {language}
              </span>
            </button>
          </motion.div>

        </div>

        {/* Dynamic Toast Feedback */}
        <AnimatePresence>
          {toastMessage && (
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.96 }}
              transition={{ duration: 0.18 }}
              className="absolute left-1/2 -translate-x-1/2 top-full mt-2 z-50 px-3.5 py-1.5 bg-neutral-900 border border-neutral-700 rounded-full text-xs text-white shadow-2xl flex items-center gap-2 pointer-events-none"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>{toastMessage}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* STORE LOCATOR MODAL */}
      <AnimatePresence>
        {isStoreOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.2 }}
              className="w-full max-w-lg bg-neutral-950 border border-neutral-800 rounded-xl p-6 shadow-2xl text-left text-neutral-100"
            >
              <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
                <div className="flex items-center gap-2">
                  <Store className="w-4 h-4 text-white" />
                  <h2 className="text-sm font-semibold uppercase tracking-wider text-white">Boutique Stores</h2>
                </div>
                <button
                  type="button"
                  onClick={() => setIsStoreOpen(false)}
                  className="p-1 text-neutral-400 hover:text-white rounded cursor-pointer transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="py-4 space-y-3 max-h-80 overflow-y-auto">
                {STORE_LOCATIONS.map((s) => (
                  <div key={s.id} className="p-3.5 rounded-lg border border-neutral-800 bg-neutral-900/50 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-xs text-white">{s.name}</span>
                      <span className="text-[10px] text-emerald-400 font-mono">{s.status}</span>
                    </div>
                    <p className="text-[11.5px] text-neutral-400 flex items-start gap-1.5">
                      <MapPin className="w-3.5 h-3.5 shrink-0 text-neutral-500 mt-0.5" />
                      <span>{s.address}</span>
                    </p>
                    <div className="flex items-center gap-3 text-[11px] text-neutral-500 pt-1">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {s.hours}
                      </span>
                      <span>{s.phone}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-3 border-t border-neutral-800 flex justify-end">
                <button
                  type="button"
                  onClick={() => setIsStoreOpen(false)}
                  className="px-4 py-1.5 rounded-lg bg-white text-black text-xs font-semibold hover:bg-neutral-200 transition-colors cursor-pointer"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* CURRENCY & LANGUAGE SELECTOR MODAL */}
      <AnimatePresence>
        {isCurrencyOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.2 }}
              className="w-full max-w-md bg-neutral-950 border border-neutral-800 rounded-xl p-6 shadow-2xl text-left text-neutral-100"
            >
              <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-white" />
                  <h2 className="text-sm font-semibold uppercase tracking-wider text-white">Region & Currency</h2>
                </div>
                <button
                  type="button"
                  onClick={() => setIsCurrencyOpen(false)}
                  className="p-1 text-neutral-400 hover:text-white rounded cursor-pointer transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="py-4 space-y-4">
                <div className="space-y-2">
                  <label className="text-[11px] font-medium uppercase tracking-wider text-neutral-400">
                    Currency
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {CURRENCY_LIST.map((c) => (
                      <button
                        key={c.code}
                        type="button"
                        onClick={() => setCurrency(c)}
                        className={`flex items-center justify-between p-2.5 rounded-lg border text-xs cursor-pointer transition-colors ${
                          currency.code === c.code
                            ? 'bg-neutral-800 border-white text-white font-semibold'
                            : 'bg-neutral-900 border-neutral-800 text-neutral-300 hover:border-neutral-700'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span>{c.flag}</span>
                          <span>{c.symbol} {c.code}</span>
                        </div>
                        {currency.code === c.code && <Check className="w-3 h-3 text-white" />}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[11px] font-medium uppercase tracking-wider text-neutral-400">
                    Language
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {(['EN', 'HI', 'FR', 'DE'] as const).map((l) => (
                      <button
                        key={l}
                        type="button"
                        onClick={() => setLanguage(l)}
                        className={`py-2 text-center rounded-lg border text-xs cursor-pointer transition-colors ${
                          language === l
                            ? 'bg-neutral-800 border-white text-white font-semibold'
                            : 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:border-neutral-700'
                        }`}
                      >
                        {l}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-neutral-800 flex justify-end">
                <button
                  type="button"
                  onClick={() => setIsCurrencyOpen(false)}
                  className="px-4 py-1.5 rounded-lg bg-white text-black text-xs font-semibold hover:bg-neutral-200 transition-colors cursor-pointer"
                >
                  Done
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

export default AnnouncementBar;
