export interface Product {
  id: number;
  slug: string;
  title: string;
  price: number; // INR
  inStock: boolean;
  image: string;
  hoverImage: string;
  category: string;
  tagline: string;
  description: string;
  statement: string;
  colors: { name: string; hex: string }[];
  gallery: [string, string]; // two extra images
  video: string; // swap for your own product video (mp4)
  videoPoster: string;
  details: { title: string; body: string }[];
}

export const formatPrice = (n: number) =>
  `Rs. ${n.toLocaleString('en-IN', { minimumFractionDigits: 2 })} INR`;

const U = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1200&q=85`;

// Placeholder clip — replace with each product's own video.
const VIDEO = 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4';

const SHARED_DETAILS = [
  {
    title: 'Materials & care',
    body: 'Wipe clean with a soft, dry cloth. Store in the dust bag provided and keep away from direct sunlight and moisture.',
  },
  {
    title: 'Shipping & returns',
    body: 'Free delivery on orders over Rs. 5,000. Delivered in 3–5 working days. Returns accepted within 7 days of delivery, unused and in original packaging.',
  },
];

const COLORS = [
  { name: 'Black', hex: '#171824' },
  { name: 'Tan', hex: '#b68d63' },
  { name: 'Ivory', hex: '#ece6da' },
];

export const PRODUCTS: Product[] = [
  {
    id: 1,
    slug: 'structured-leather-tote',
    title: 'Structured Leather Tote',
    price: 4200,
    inStock: true,
    image: U('photo-1584917865442-de89df76afd3'),
    hoverImage: U('photo-1591561954557-26941169b49e'),
    category: 'Totes',
    tagline: 'Built for the long day',
    description:
      'A roomy, structured tote that holds its shape from the morning commute to dinner. Reinforced handles, a zip-top inner pocket and a soft suede lining keep everything in its place.',
    statement:
      'Structure that holds, space that works. A tote made to carry your whole day with ease and still look sharp at the end of it.',
    colors: COLORS,
    gallery: [U('photo-1591561954557-26941169b49e'), U('photo-1548863227-3af567fc3b27')],
    video: VIDEO,
    videoPoster: U('photo-1584917865442-de89df76afd3'),
    details: [
      { title: 'Product details', body: 'Full-grain leather · 38 × 30 × 14 cm · Fits a 13" laptop · Magnetic closure · Inner zip pocket and two slip pockets.' },
      ...SHARED_DETAILS,
    ],
  },
  {
    id: 2,
    slug: 'quilted-chain-crossbody',
    title: 'Quilted Chain Crossbody',
    price: 3650,
    inStock: true,
    image: U('photo-1548036328-c9fa89d128fa'),
    hoverImage: U('photo-1566150905458-1bf1fc113f0d'),
    category: 'Crossbody',
    tagline: 'Light, polished, hands-free',
    description:
      'A quilted crossbody with an adjustable chain strap that sits comfortably at the hip. Compact enough for the essentials, polished enough for any outfit.',
    statement:
      'Small in size, big on polish. A quilted crossbody that keeps your hands free and your look put together, wherever the day goes.',
    colors: COLORS,
    gallery: [U('photo-1566150905458-1bf1fc113f0d'), U('photo-1594223274512-ad4803739b7c')],
    video: VIDEO,
    videoPoster: U('photo-1548036328-c9fa89d128fa'),
    details: [
      { title: 'Product details', body: 'Quilted faux leather · 24 × 15 × 7 cm · Adjustable chain strap · Flap with turn-lock · Fits phone, cards and keys.' },
      ...SHARED_DETAILS,
    ],
  },
  {
    id: 3,
    slug: 'mini-top-handle-bag',
    title: 'Mini Top-Handle Bag',
    price: 2980,
    inStock: true,
    image: U('photo-1594223274512-ad4803739b7c'),
    hoverImage: U('photo-1590874103328-eac38a683ce7'),
    category: 'Mini Bags',
    tagline: 'Small bag, clear statement',
    description:
      'A mini top-handle bag with clean lines and a detachable strap. Carry it by hand or over the shoulder.',
    statement:
      'Clean lines in a compact frame. A mini bag that pairs with everything and takes you from daytime plans to evening ones.',
    colors: COLORS,
    gallery: [U('photo-1590874103328-eac38a683ce7'), U('photo-1584917865442-de89df76afd3')],
    video: VIDEO,
    videoPoster: U('photo-1594223274512-ad4803739b7c'),
    details: [
      { title: 'Product details', body: 'Smooth faux leather · 20 × 14 × 9 cm · Detachable strap · Zip closure · One main compartment.' },
      ...SHARED_DETAILS,
    ],
  },
  {
    id: 4,
    slug: 'woven-raffia-shoulder-bag',
    title: 'Woven Raffia Shoulder Bag',
    price: 3150,
    inStock: true,
    image: U('photo-1548863227-3af567fc3b27'),
    hoverImage: U('photo-1584917865442-de89df76afd3'),
    category: 'Shoulder Bags',
    tagline: 'Handwoven warmth',
    description:
      'A handwoven raffia shoulder bag with a lined interior and a soft leather strap. Light to carry and made for warm days.',
    statement:
      'Handwoven texture for easy days. A shoulder bag that is light to carry and finishes any summer look.',
    colors: COLORS,
    gallery: [U('photo-1584917865442-de89df76afd3'), U('photo-1591561954557-26941169b49e')],
    video: VIDEO,
    videoPoster: U('photo-1548863227-3af567fc3b27'),
    details: [
      { title: 'Product details', body: 'Natural raffia with leather trim · 30 × 24 × 10 cm · Cotton lining · Snap closure · One inner pocket.' },
      ...SHARED_DETAILS,
    ],
  },
  {
    id: 5,
    slug: 'evening-satin-clutch',
    title: 'Evening Satin Clutch',
    price: 2450,
    inStock: true,
    image: U('photo-1566150905458-1bf1fc113f0d'),
    hoverImage: U('photo-1548036328-c9fa89d128fa'),
    category: 'Clutches',
    tagline: 'For the evenings that matter',
    description:
      'A satin clutch with a soft sheen and a hidden magnetic closure. Holds a phone, lipstick and cards, with a slim chain you can tuck away.',
    statement:
      'A soft sheen for the evening. A clutch that carries just what you need and lets the outfit do the talking.',
    colors: COLORS,
    gallery: [U('photo-1548036328-c9fa89d128fa'), U('photo-1590874103328-eac38a683ce7')],
    video: VIDEO,
    videoPoster: U('photo-1566150905458-1bf1fc113f0d'),
    details: [
      { title: 'Product details', body: 'Satin with metal hardware · 22 × 12 × 5 cm · Magnetic closure · Removable chain · Fits a phone and essentials.' },
      ...SHARED_DETAILS,
    ],
  },
  {
    id: 6,
    slug: 'soft-slouch-hobo-bag',
    title: 'Soft Slouch Hobo Bag',
    price: 5100,
    inStock: true,
    image: U('photo-1590874103328-eac38a683ce7'),
    hoverImage: U('photo-1594223274512-ad4803739b7c'),
    category: 'Hobo Bags',
    tagline: 'Relaxed shape, rich leather',
    description:
      'A soft, slouchy hobo in supple leather that moulds to you over time. Generous inside, relaxed outside.',
    statement:
      'Relaxed in shape, rich in feel. A hobo bag in supple leather that gets better the more you wear it.',
    colors: COLORS,
    gallery: [U('photo-1594223274512-ad4803739b7c'), U('photo-1566150905458-1bf1fc113f0d')],
    video: VIDEO,
    videoPoster: U('photo-1590874103328-eac38a683ce7'),
    details: [
      { title: 'Product details', body: 'Soft full-grain leather · 34 × 28 × 11 cm · Zip-top closure · Two inner pockets · Shoulder drop 24 cm.' },
      ...SHARED_DETAILS,
    ],
  },
];

export const getProduct = (slug: string) => PRODUCTS.find((p) => p.slug === slug);