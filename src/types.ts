export type ProductCategory = 'all' | 'blazers' | 'knitwear' | 'shirts' | 'trousers' | 'outerwear' | 'accessories';

export interface ProductColor {
  name: string;
  hex: string;
}

export interface Product {
  id: string;
  sku: string;
  name: string;
  subtitle: string;
  category: ProductCategory;
  price: number;
  compareAtPrice?: number;
  description: string;
  details: string[];
  fabric: string;
  care: string;
  colors: ProductColor[];
  sizes: string[];
  stockPerVariant: Record<string, number>; // key: `${colorName}-${size}`, value: quantity
  totalStock: number;
  lowStockThreshold: number;
  rating: number;
  reviewCount: number;
  images: string[];
  badge?: 'New Arrival' | 'Bestseller' | 'Limited Edition' | 'Low Stock';
  fitGuide: string;
}

export interface Review {
  id: string;
  productId: string;
  author: string;
  rating: number;
  title: string;
  comment: string;
  date: string;
  verifiedBuyer: boolean;
  fit: 'Runs Small' | 'True to Size' | 'Runs Large';
  sizePurchased: string;
  colorPurchased: string;
  helpfulCount: number;
  userVotedHelpful?: boolean;
}

export interface CartItem {
  product: Product;
  size: string;
  color: ProductColor;
  quantity: number;
}

export type ShippingCarrier = 'FedEx Priority' | 'DHL Express' | 'UPS Worldwide Expedited';

export type TrackingStatus = 
  | 'Order Placed'
  | 'Processing & Tailoring'
  | 'Dispatched & Carrier Scanned'
  | 'In Transit'
  | 'Out for Delivery'
  | 'Delivered';

export interface TrackingCheckpoint {
  time: string;
  status: string;
  location: string;
  detail: string;
  completed: boolean;
  current?: boolean;
}

export interface TrackingInfo {
  trackingNumber: string;
  carrier: ShippingCarrier;
  status: TrackingStatus;
  currentStep: number; // 0 to 4
  estimatedDelivery: string;
  origin: string;
  destination: string;
  serviceType: string;
  checkpoints: TrackingCheckpoint[];
  lastUpdated: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  date: string;
  customer: {
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    postalCode: string;
    country: string;
  };
  items: CartItem[];
  subtotal: number;
  shippingFee: number;
  shippingMethod: 'Standard Delivery' | 'Express Air' | 'White Glove Priority';
  discount: number;
  tax: number;
  total: number;
  paymentMethod: {
    type: 'credit_card' | 'apple_pay' | 'google_pay';
    cardBrand?: string;
    last4?: string;
  };
  paymentStatus: 'Paid' | 'Processing' | 'Refunded';
  tracking: TrackingInfo;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'customer' | 'admin';
  provider: 'email' | 'google' | 'apple' | 'github';
  savedAddress?: {
    name: string;
    address: string;
    city: string;
    postalCode: string;
    country: string;
    phone: string;
  };
  memberSince: string;
  ordersCount: number;
}
