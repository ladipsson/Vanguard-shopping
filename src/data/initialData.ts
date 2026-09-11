import { Product, Review, Order, User } from '../types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    sku: 'VG-BLZ-001',
    name: 'Verona Wool & Silk Blazer',
    subtitle: 'Unstructured tailoring with peak lapel & horn buttons',
    category: 'blazers',
    price: 345,
    compareAtPrice: 420,
    description: 'Crafted in Biella, Italy from a luxurious blend of 85% virgin wool and 15% Mulberry silk. Cut in a modern relaxed drape that transitions seamlessly from executive meetings to evening receptions.',
    details: [
      'Unstructured shoulders with butterfly half-lining',
      'Hand-sewn pick stitching along lapels and pockets',
      'Genuine double-faced Buffalo horn buttons',
      'Dual rear vents for effortless movement',
      'Four interior pockets including passport slot'
    ],
    fabric: '85% Super 130s Virgin Wool, 15% Mulberry Silk',
    care: 'Dry clean only. Steam gently.',
    colors: [
      { name: 'Midnight Navy', hex: '#1e293b' },
      { name: 'Charcoal Houndstooth', hex: '#334155' },
      { name: 'Oatmeal Tweed', hex: '#d6d3d1' }
    ],
    sizes: ['38R', '40R', '42R', '44R', '46R'],
    stockPerVariant: {
      'Midnight Navy-38R': 4,
      'Midnight Navy-40R': 8,
      'Midnight Navy-42R': 12,
      'Midnight Navy-44R': 6,
      'Midnight Navy-46R': 2,
      'Charcoal Houndstooth-38R': 3,
      'Charcoal Houndstooth-40R': 5,
      'Charcoal Houndstooth-42R': 7,
      'Charcoal Houndstooth-44R': 4,
      'Charcoal Houndstooth-46R': 1,
      'Oatmeal Tweed-38R': 2,
      'Oatmeal Tweed-40R': 6,
      'Oatmeal Tweed-42R': 5,
      'Oatmeal Tweed-44R': 3,
      'Oatmeal Tweed-46R': 0
    },
    totalStock: 68,
    lowStockThreshold: 5,
    rating: 4.9,
    reviewCount: 42,
    images: [
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?auto=format&fit=crop&w=1200&q=80'
    ],
    badge: 'Bestseller',
    fitGuide: 'Tailored Athletic Fit. If between sizes or seeking an oversized look, size up.'
  },
  {
    id: 'prod-2',
    sku: 'VG-KNT-002',
    name: 'Highland Cashmere Cable Crew',
    subtitle: 'Pure 4-ply Mongolian cashmere in heritage honeycomb weave',
    category: 'knitwear',
    price: 260,
    description: 'Spun from Grade-A Mongolian cashmere fiber averaging 15.5 microns in fineness. Insanely soft against bare skin with pill-resistant twisted yarn longevity.',
    details: [
      '100% Mongolian Cashmere 4-ply gauge',
      'Ribbed collar, cuffs, and hem with Lycra retention',
      'Hand-linked seamless shoulder construction',
      'Pre-washed with mountain spring water for loft'
    ],
    fabric: '100% Grade-A Mongolian Cashmere',
    care: 'Hand wash cold or dry clean. Dry flat.',
    colors: [
      { name: 'Camel Tan', hex: '#b45309' },
      { name: 'Heather Charcoal', hex: '#475569' },
      { name: 'Forest Moss', hex: '#166534' }
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    stockPerVariant: {
      'Camel Tan-S': 2,
      'Camel Tan-M': 6,
      'Camel Tan-L': 7,
      'Camel Tan-XL': 3,
      'Camel Tan-XXL': 1,
      'Heather Charcoal-S': 4,
      'Heather Charcoal-M': 8,
      'Heather Charcoal-L': 5,
      'Heather Charcoal-XL': 2,
      'Heather Charcoal-XXL': 0,
      'Forest Moss-S': 3,
      'Forest Moss-M': 5,
      'Forest Moss-L': 4,
      'Forest Moss-XL': 1,
      'Forest Moss-XXL': 1
    },
    totalStock: 52,
    lowStockThreshold: 5,
    rating: 4.8,
    reviewCount: 38,
    images: [
      'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1614975058789-41316d0e2e9c?auto=format&fit=crop&w=1200&q=80'
    ],
    badge: 'New Arrival',
    fitGuide: 'True to size. Designed for a tailored contemporary silhouette.'
  },
  {
    id: 'prod-3',
    sku: 'VG-OUT-003',
    name: 'Kensington Double-Breasted Overcoat',
    subtitle: 'Heavyweight Melton wool with storm collar & satin lining',
    category: 'outerwear',
    price: 495,
    compareAtPrice: 580,
    description: 'Engineered to withstand harsh winter gusts while exuding Savile Row poise. Built with 28oz heavy Melton wool that naturally repels water and insulates down to sub-zero climates.',
    details: [
      '28oz British Melton Wool shell',
      'Quilted cupro satin internal insulation',
      'Concealed throat latch and storm tab',
      'Deep moleskin-lined handwarmer welt pockets',
      'Buttoned center back vent'
    ],
    fabric: '90% Melton Virgin Wool, 10% Polyamide (Cupro lining)',
    care: 'Specialist wool dry clean only.',
    colors: [
      { name: 'Camel Gold', hex: '#d97706' },
      { name: 'Obsidian Black', hex: '#0f172a' },
      { name: 'Espresso Brown', hex: '#451a03' }
    ],
    sizes: ['38R', '40R', '42R', '44R', '46R'],
    stockPerVariant: {
      'Camel Gold-38R': 1,
      'Camel Gold-40R': 3,
      'Camel Gold-42R': 4,
      'Camel Gold-44R': 2,
      'Camel Gold-46R': 1,
      'Obsidian Black-38R': 2,
      'Obsidian Black-40R': 5,
      'Obsidian Black-42R': 6,
      'Obsidian Black-44R': 3,
      'Obsidian Black-46R': 1,
      'Espresso Brown-38R': 0,
      'Espresso Brown-40R': 2,
      'Espresso Brown-42R': 3,
      'Espresso Brown-44R': 1,
      'Espresso Brown-46R': 0
    },
    totalStock: 34,
    lowStockThreshold: 4,
    rating: 5.0,
    reviewCount: 29,
    images: [
      'https://images.unsplash.com/photo-1544923246-77307dd654cb?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=1200&q=80'
    ],
    badge: 'Limited Edition',
    fitGuide: 'Slightly roomier cut to accommodate suiting or heavy knits underneath.'
  },
  {
    id: 'prod-4',
    sku: 'VG-SHT-004',
    name: 'Savile Row Egyptian Cotton Oxford',
    subtitle: '120/2 two-ply pinpoint weave with Mother-of-Pearl buttons',
    category: 'shirts',
    price: 135,
    description: 'The definitive dress shirt. Woven using rare Giza 87 long-staple Egyptian cotton for unprecedented silkiness, natural wrinkle recovery, and crisp architectural collar roll.',
    details: [
      'Giza 87 Extra Long Staple Egyptian Cotton',
      'Semi-spread collar with removable brass stays',
      'Australian Mother-of-Pearl shanked buttons',
      'Single needle 22 stitches-per-inch sewing',
      'Reinforced side gussets'
    ],
    fabric: '100% Giza 87 Egyptian Cotton',
    care: 'Machine wash warm gentle, hang dry, medium warm iron.',
    colors: [
      { name: 'Optical White', hex: '#f8fafc' },
      { name: 'Sky Chambray', hex: '#93c5fd' },
      { name: 'Bengal Stripe', hex: '#64748b' }
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    stockPerVariant: {
      'Optical White-S': 12,
      'Optical White-M': 25,
      'Optical White-L': 28,
      'Optical White-XL': 15,
      'Optical White-XXL': 6,
      'Sky Chambray-S': 8,
      'Sky Chambray-M': 18,
      'Sky Chambray-L': 20,
      'Sky Chambray-XL': 10,
      'Sky Chambray-XXL': 4,
      'Bengal Stripe-S': 6,
      'Bengal Stripe-M': 14,
      'Bengal Stripe-L': 12,
      'Bengal Stripe-XL': 5,
      'Bengal Stripe-XXL': 2
    },
    totalStock: 170,
    lowStockThreshold: 10,
    rating: 4.7,
    reviewCount: 64,
    images: [
      'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=1200&q=80'
    ],
    badge: 'Bestseller',
    fitGuide: 'Slim-Modern fit. Contoured through chest with clean waist taper.'
  },
  {
    id: 'prod-5',
    sku: 'VG-TRS-005',
    name: 'Milano Pleated Wool Flannel Trousers',
    subtitle: 'Double forward pleats with side adjusters & extended tab',
    category: 'trousers',
    price: 215,
    compareAtPrice: 250,
    description: 'Vintage elegance meets contemporary sartorial cut. Featuring authentic British forward pleats and brass side adjusters, allowing you to forego a belt for cleaner lines.',
    details: [
      'Super 110s Vitale Barberis Canonico Italian Flannel',
      'Double forward deep pleats',
      'Sartorial brass buckle side waist adjusters',
      'Curved curtain waistband for supreme seating comfort',
      'Unfinished 36" hem for bespoke cuffing or hemming'
    ],
    fabric: '100% Wool Flannel',
    care: 'Dry clean only.',
    colors: [
      { name: 'Flannel Grey', hex: '#64748b' },
      { name: 'Dark Navy', hex: '#0f172a' },
      { name: 'Olive Drab', hex: '#3f6212' }
    ],
    sizes: ['30', '32', '34', '36', '38'],
    stockPerVariant: {
      'Flannel Grey-30': 4,
      'Flannel Grey-32': 9,
      'Flannel Grey-34': 11,
      'Flannel Grey-36': 7,
      'Flannel Grey-38': 3,
      'Dark Navy-30': 5,
      'Dark Navy-32': 8,
      'Dark Navy-34': 10,
      'Dark Navy-36': 6,
      'Dark Navy-38': 2,
      'Olive Drab-30': 3,
      'Olive Drab-32': 6,
      'Olive Drab-34': 5,
      'Olive Drab-36': 4,
      'Olive Drab-38': 1
    },
    totalStock: 74,
    lowStockThreshold: 5,
    rating: 4.9,
    reviewCount: 31,
    images: [
      'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1479064555552-3ef4979f8908?auto=format&fit=crop&w=1200&q=80'
    ],
    badge: 'New Arrival',
    fitGuide: 'High-rise with relaxed thigh tapering softly to a 7.5-inch hem.'
  },
  {
    id: 'prod-6',
    sku: 'VG-OUT-006',
    name: 'Castel Suede Harrington Jacket',
    subtitle: 'Buttery Italian goatskin suede with two-way RiRi zip',
    category: 'outerwear',
    price: 520,
    description: 'An iconic silhouette re-imagined with ultra-pliant Tuscan goat suede. Features custom antiqued silver dual zippers, a scalloped storm-flap back, and silky cupro interior.',
    details: [
      'Velvety soft Italian lamb-suede shell',
      'Swiss RiRi brass double zipper',
      'Classic stand collar with horn button fastening',
      'Ribbed elasticated waistband and wrist cuffs',
      'Internal zippered security pouch'
    ],
    fabric: '100% Genuine Italian Lamb Suede, Cupro Lining',
    care: 'Specialist leather clean only.',
    colors: [
      { name: 'Cognac Saddle', hex: '#9a3412' },
      { name: 'Midnight Charcoal', hex: '#1e293b' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    stockPerVariant: {
      'Cognac Saddle-S': 1,
      'Cognac Saddle-M': 3,
      'Cognac Saddle-L': 4,
      'Cognac Saddle-XL': 2,
      'Midnight Charcoal-S': 2,
      'Midnight Charcoal-M': 5,
      'Midnight Charcoal-L': 3,
      'Midnight Charcoal-XL': 1
    },
    totalStock: 21,
    lowStockThreshold: 3,
    rating: 4.9,
    reviewCount: 19,
    images: [
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1520975954732-35dd22299614?auto=format&fit=crop&w=1200&q=80'
    ],
    badge: 'Low Stock',
    fitGuide: 'True to size. Hits squarely at the beltline for a sharp profile.'
  },
  {
    id: 'prod-7',
    sku: 'VG-ACC-007',
    name: 'Tuscan Goodyear-Welted Chelsea Boot',
    subtitle: 'Full-grain French calfskin with Dainite studded rubber sole',
    category: 'accessories',
    price: 320,
    compareAtPrice: 380,
    description: 'Built by third-generation Tuscan artisans using 360-degree Goodyear welt construction. The Dainite studded sole guarantees traction in wet conditions without sacrificing dressy profile.',
    details: [
      'Full-grain French box calfskin',
      'Traditional 360° Goodyear welted construction (fully resoleable)',
      'British Dainite rubber studded all-weather outsole',
      'Heavy duty herringbone pull tabs',
      'Cork footbed that molds to the contours of your feet'
    ],
    fabric: 'French Box Calfskin, Veg-tan leather lining',
    care: 'Condition with saphir cream polish every 4 months.',
    colors: [
      { name: 'Burnished Espresso', hex: '#451a03' },
      { name: 'Onyx Black', hex: '#020617' }
    ],
    sizes: ['8', '9', '10', '11', '12'],
    stockPerVariant: {
      'Burnished Espresso-8': 3,
      'Burnished Espresso-9': 7,
      'Burnished Espresso-10': 9,
      'Burnished Espresso-11': 4,
      'Burnished Espresso-12': 2,
      'Onyx Black-8': 4,
      'Onyx Black-9': 8,
      'Onyx Black-10': 10,
      'Onyx Black-11': 5,
      'Onyx Black-12': 3
    },
    totalStock: 55,
    lowStockThreshold: 5,
    rating: 4.8,
    reviewCount: 47,
    images: [
      'https://images.unsplash.com/photo-1638247025967-b4e38f787b76?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1533867617858-e7b97e060509?auto=format&fit=crop&w=1200&q=80'
    ],
    badge: 'Bestseller',
    fitGuide: 'Runs half size large like traditional dress boots. Size down 0.5 size from sneaker.'
  },
  {
    id: 'prod-8',
    sku: 'VG-KNT-008',
    name: 'Como Fine-Gauge Merino Long Sleeve Polo',
    subtitle: '100% Extrafine 24-gauge Australian Merino with knit collar',
    category: 'knitwear',
    price: 175,
    description: 'An understated wardrobe cornerstone. Offers thermal regulation and odor resistance for year-round layering under blazers or solo with tailored trousers.',
    details: [
      'Extrafine 24-Gauge Australian Merino Wool',
      'Fully fashioned point collar that stands under jacket lapels',
      'Seamless three-button placket with real smoke mother-of-pearl buttons',
      'Total easy-care yarn treated for gentle wool cycle washing'
    ],
    fabric: '100% Extrafine Merino Wool',
    care: 'Hand wash cold or gentle wool machine cycle.',
    colors: [
      { name: 'Navy Dusk', hex: '#172554' },
      { name: 'Sage Green', hex: '#3f6212' },
      { name: 'Ecru Chalk', hex: '#f5f5f4' }
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    stockPerVariant: {
      'Navy Dusk-S': 5,
      'Navy Dusk-M': 10,
      'Navy Dusk-L': 12,
      'Navy Dusk-XL': 7,
      'Navy Dusk-XXL': 3,
      'Sage Green-S': 4,
      'Sage Green-M': 8,
      'Sage Green-L': 9,
      'Sage Green-XL': 4,
      'Sage Green-XXL': 2,
      'Ecru Chalk-S': 6,
      'Ecru Chalk-M': 11,
      'Ecru Chalk-L': 13,
      'Ecru Chalk-XL': 6,
      'Ecru Chalk-XXL': 3
    },
    totalStock: 93,
    lowStockThreshold: 6,
    rating: 4.8,
    reviewCount: 34,
    images: [
      'https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=1200&q=80'
    ],
    badge: 'Bestseller',
    fitGuide: 'True to size modern athletic cut.'
  }
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    productId: 'prod-1',
    author: 'Julian M., London',
    rating: 5,
    title: 'Flawless tailoring and drape. Exceeded my high expectations.',
    comment: 'The shoulder drape on this Verona blazer is second to none. Very breathable yet retains crisp structure even after an 8-hour flight from Heathrow to JFK. I received numerous compliments at our corporate summit.',
    date: '2 days ago',
    verifiedBuyer: true,
    fit: 'True to Size',
    sizePurchased: '42R',
    colorPurchased: 'Midnight Navy',
    helpfulCount: 19
  },
  {
    id: 'rev-2',
    productId: 'prod-1',
    author: 'Marcus Vance, New York',
    rating: 5,
    title: 'The fabric feels like Loro Piana at a fraction of the cost',
    comment: 'The hand feel of this virgin wool and silk blend is sublime. Unlined construction keeps it light and effortless. I had my tailor shorten sleeves by a half inch and he commented on how high quality the interior canvas was.',
    date: '1 week ago',
    verifiedBuyer: true,
    fit: 'True to Size',
    sizePurchased: '40R',
    colorPurchased: 'Charcoal Houndstooth',
    helpfulCount: 12
  },
  {
    id: 'rev-3',
    productId: 'prod-2',
    author: 'Dr. Edward Chen, Chicago',
    rating: 5,
    title: 'Unbelievably soft, no itch whatsoever',
    comment: 'Most cable knits are stiff and bulky, but this 4-ply cashmere is dense without being heavy. Kept me wonderfully warm during Chicago winds. The camel tan color is rich and versatile.',
    date: '3 days ago',
    verifiedBuyer: true,
    fit: 'True to Size',
    sizePurchased: 'L',
    colorPurchased: 'Camel Tan',
    helpfulCount: 15
  },
  {
    id: 'rev-4',
    productId: 'prod-4',
    author: 'David Thorne, San Francisco',
    rating: 5,
    title: 'Crisp collar roll, durable mother-of-pearl buttons',
    comment: 'Egyptian Giza cotton makes a visible difference compared to standard off-the-rack oxfords. Ironing takes two minutes and the shirt looks immaculate all day under a sport coat.',
    date: '2 weeks ago',
    verifiedBuyer: true,
    fit: 'True to Size',
    sizePurchased: 'M',
    colorPurchased: 'Optical White',
    helpfulCount: 22
  },
  {
    id: 'rev-5',
    productId: 'prod-5',
    author: 'Harrison B., Milan',
    rating: 5,
    title: 'Pleats are back, and these are done right',
    comment: 'The side adjusters allow fine adjustments without a leather belt breaking the silhouette. The Vitale Barberis flannel has a glorious drape that falls cleanly over Chelsea boots.',
    date: '10 days ago',
    verifiedBuyer: true,
    fit: 'True to Size',
    sizePurchased: '32',
    colorPurchased: 'Flannel Grey',
    helpfulCount: 9
  },
  {
    id: 'rev-6',
    productId: 'prod-7',
    author: 'Arthur Sterling, Boston',
    rating: 4,
    title: 'Superb leather quality. Make sure to size down 1/2 size',
    comment: 'The Dainite rubber sole was essential for Boston cobblestone rain. French box calfskin broke in after only two days. Tip: definitely follow the sizing advice to drop half a size from your sneakers.',
    date: '5 days ago',
    verifiedBuyer: true,
    fit: 'Runs Large',
    sizePurchased: '10',
    colorPurchased: 'Burnished Espresso',
    helpfulCount: 18
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ord-9041',
    orderNumber: 'VG-89410',
    date: '2026-09-11',
    customer: {
      name: 'Alexander Wright',
      email: 'alex.wright@executive.co.uk',
      phone: '+1 (555) 392-8819',
      address: '742 Montgomery St, Suite 1400',
      city: 'San Francisco',
      postalCode: '94111',
      country: 'United States'
    },
    items: [
      {
        product: INITIAL_PRODUCTS[0],
        size: '42R',
        color: INITIAL_PRODUCTS[0].colors[0],
        quantity: 1
      },
      {
        product: INITIAL_PRODUCTS[3],
        size: 'L',
        color: INITIAL_PRODUCTS[3].colors[0],
        quantity: 2
      }
    ],
    subtotal: 615,
    shippingFee: 0,
    shippingMethod: 'Express Air',
    discount: 50,
    tax: 48,
    total: 613,
    paymentMethod: {
      type: 'credit_card',
      cardBrand: 'Visa',
      last4: '4242'
    },
    paymentStatus: 'Paid',
    tracking: {
      trackingNumber: 'FDX-79482910381',
      carrier: 'FedEx Priority',
      status: 'In Transit',
      currentStep: 3,
      estimatedDelivery: 'Tomorrow by 10:30 AM',
      origin: 'Atelier Distribution Hub, Florence IT',
      destination: 'San Francisco, CA, USA',
      serviceType: 'FedEx Priority Overnight International',
      lastUpdated: '12 minutes ago',
      checkpoints: [
        {
          time: 'Sep 10, 08:30 AM',
          status: 'Order Processed & Packaged',
          location: 'Florence Central Fulfillment, Italy',
          detail: 'Garments steamed, quality-checked, and custom boxed in breathable cotton garment bag.',
          completed: true
        },
        {
          time: 'Sep 10, 04:15 PM',
          status: 'Departed Export Facility',
          location: 'Milan Malpensa International Airport (MXP)',
          detail: 'Customs clearance approved. Loaded on transatlantic cargo flight FX-082.',
          completed: true
        },
        {
          time: 'Sep 11, 06:45 AM',
          status: 'Arrived at Regional Gateway Hub',
          location: 'Oakland International Airport Sorting Facility, CA',
          detail: 'Package scanned and sorted into delivery manifest container.',
          completed: true
        },
        {
          time: 'Sep 11, 01:20 PM',
          status: 'In Transit to Local Delivery Center',
          location: 'San Francisco Metro Delivery Hub, CA',
          detail: 'En route to local courier van dispatch.',
          completed: true,
          current: true
        },
        {
          time: 'Sep 12, 08:30 AM (Est.)',
          status: 'Out for Courier Delivery',
          location: 'San Francisco, CA',
          detail: 'Courier will attempt signature delivery with climate-controlled handling.',
          completed: false
        },
        {
          time: 'Sep 12, 10:30 AM (Est.)',
          status: 'Delivered',
          location: 'San Francisco, CA',
          detail: 'Direct signature required upon handover.',
          completed: false
        }
      ]
    }
  },
  {
    id: 'ord-9040',
    orderNumber: 'VG-89409',
    date: '2026-09-09',
    customer: {
      name: 'Oliver King',
      email: 'oliver.king@fashionhouse.com',
      phone: '+1 (555) 728-1092',
      address: '280 Park Avenue, Fl 22',
      city: 'New York',
      postalCode: '10017',
      country: 'United States'
    },
    items: [
      {
        product: INITIAL_PRODUCTS[1],
        size: 'M',
        color: INITIAL_PRODUCTS[1].colors[0],
        quantity: 1
      },
      {
        product: INITIAL_PRODUCTS[4],
        size: '32',
        color: INITIAL_PRODUCTS[4].colors[0],
        quantity: 1
      }
    ],
    subtotal: 475,
    shippingFee: 0,
    shippingMethod: 'Express Air',
    discount: 0,
    tax: 41,
    total: 516,
    paymentMethod: {
      type: 'apple_pay'
    },
    paymentStatus: 'Paid',
    tracking: {
      trackingNumber: 'DHL-8930198421',
      carrier: 'DHL Express',
      status: 'Delivered',
      currentStep: 5,
      estimatedDelivery: 'Delivered Yesterday at 2:15 PM',
      origin: 'Florence, Italy',
      destination: 'New York, NY, USA',
      serviceType: 'DHL Express Worldwide Door-to-Door',
      lastUpdated: 'Yesterday at 2:15 PM',
      checkpoints: [
        {
          time: 'Sep 08, 10:00 AM',
          status: 'Dispatched from Warehouse',
          location: 'Florence Central Hub',
          detail: 'Picked and verified.',
          completed: true
        },
        {
          time: 'Sep 09, 02:00 AM',
          status: 'Customs Cleared',
          location: 'JFK Airport, NY',
          detail: 'Cleared international customs.',
          completed: true
        },
        {
          time: 'Sep 09, 08:30 AM',
          status: 'With Delivery Courier',
          location: 'Manhattan South Hub, NY',
          detail: 'On vehicle for final delivery.',
          completed: true
        },
        {
          time: 'Sep 09, 02:15 PM',
          status: 'Delivered & Signed',
          location: '280 Park Avenue, NY',
          detail: 'Signed for by Front Desk / O. King.',
          completed: true,
          current: true
        }
      ]
    }
  }
];

export const INITIAL_USER: User = {
  id: 'usr-101',
  name: 'Prince Tunde',
  email: 'princetunde17@gmail.com',
  avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
  role: 'customer',
  provider: 'google',
  savedAddress: {
    name: 'Prince Tunde',
    address: '100 Mayfair Crescent',
    city: 'London',
    postalCode: 'W1J 8AJ',
    country: 'United Kingdom',
    phone: '+44 20 7946 0912'
  },
  memberSince: 'March 2025',
  ordersCount: 4
};

export const ANALYTICS_DATA = {
  overview: {
    totalRevenue: 148920,
    revenueGrowth: '+18.4%',
    totalOrders: 428,
    orderGrowth: '+12.1%',
    averageOrderValue: 348,
    aovGrowth: '+5.7%',
    conversionRate: 3.82,
    conversionGrowth: '+0.6%',
    returnRate: 2.1,
    inventoryTurnoverRate: '6.4x'
  },
  salesTrend7D: [
    { date: 'Sep 05', revenue: 18450, orders: 48, visitors: 1250 },
    { date: 'Sep 06', revenue: 22100, orders: 56, visitors: 1420 },
    { date: 'Sep 07', revenue: 19800, orders: 51, visitors: 1380 },
    { date: 'Sep 08', revenue: 24650, orders: 63, visitors: 1610 },
    { date: 'Sep 09', revenue: 27900, orders: 72, visitors: 1840 },
    { date: 'Sep 10', revenue: 23400, orders: 61, visitors: 1590 },
    { date: 'Sep 11', revenue: 29820, orders: 77, visitors: 1950 }
  ],
  salesTrend30D: [
    { date: 'Week 1', revenue: 112000, orders: 310, visitors: 8200 },
    { date: 'Week 2', revenue: 128500, orders: 355, visitors: 9400 },
    { date: 'Week 3', revenue: 139200, orders: 388, visitors: 10100 },
    { date: 'Week 4', revenue: 158400, orders: 428, visitors: 11500 }
  ],
  categorySales: [
    { name: 'Blazers & Suiting', value: 42, revenue: 62546, color: '#1e293b' },
    { name: 'Cashmere & Knitwear', value: 24, revenue: 35740, color: '#d97706' },
    { name: 'Outerwear & Coats', value: 18, revenue: 26805, color: '#475569' },
    { name: 'Trousers & Chinos', value: 10, revenue: 14892, color: '#166534' },
    { name: 'Shirts & Footwear', value: 6, revenue: 8937, color: '#0284c7' }
  ],
  customerSegments: [
    { segment: 'Returning VIP Executives', percentage: 48, aov: 490 },
    { segment: 'First-time Luxury Buyers', percentage: 34, aov: 275 },
    { segment: 'Gift & Occasion Shoppers', percentage: 18, aov: 310 }
  ],
  inventoryInsights: [
    { sku: 'VG-BLZ-001', name: 'Verona Wool & Silk Blazer', stock: 68, velocity: 'High', daysOfSupply: 14, restockStatus: 'Optimal' },
    { sku: 'VG-OUT-006', name: 'Castel Suede Harrington Jacket', stock: 21, velocity: 'Critical', daysOfSupply: 4, restockStatus: 'Urgent Restock' },
    { sku: 'VG-OUT-003', name: 'Kensington Double-Breasted Overcoat', stock: 34, velocity: 'High', daysOfSupply: 9, restockStatus: 'Reorder Soon' },
    { sku: 'VG-KNT-002', name: 'Highland Cashmere Cable Crew', stock: 52, velocity: 'Moderate', daysOfSupply: 21, restockStatus: 'Optimal' },
    { sku: 'VG-SHT-004', name: 'Savile Row Egyptian Cotton Oxford', stock: 170, velocity: 'High', daysOfSupply: 30, restockStatus: 'Surplus Safe' }
  ]
};
