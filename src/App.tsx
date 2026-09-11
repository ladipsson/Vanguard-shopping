import React, { useState, useMemo } from 'react';
import { 
  Product, 
  ProductCategory, 
  Review, 
  CartItem, 
  Order, 
  User, 
  ProductColor, 
  TrackingInfo 
} from './types';
import { 
  INITIAL_PRODUCTS, 
  INITIAL_REVIEWS, 
  INITIAL_ORDERS, 
  INITIAL_USER 
} from './data/initialData';
import { Navbar } from './components/Navbar';
import { ProductCard } from './components/ProductCard';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { ShippingTrackerModal } from './components/ShippingTrackerModal';
import { AuthModal } from './components/AuthModal';
import { InventoryManager } from './components/InventoryManager';
import { AnalyticsDashboard } from './components/AnalyticsDashboard';
import { ReviewModal } from './components/ReviewModal';
import { Footer } from './components/Footer';
import { 
  SlidersHorizontal, 
  Sparkles, 
  ArrowRight, 
  Truck, 
  ShieldCheck, 
  Layers, 
  BarChart3, 
  ChevronDown 
} from 'lucide-react';

export default function App() {
  // Core Application State
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [reviews, setReviews] = useState<Review[]>(INITIAL_REVIEWS);
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [user, setUser] = useState<User | null>(INITIAL_USER);

  // Cart State (Initialized with 1 sample item so user can immediately test cart & checkout)
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      product: INITIAL_PRODUCTS[0],
      size: '40R',
      color: INITIAL_PRODUCTS[0].colors[0],
      quantity: 1
    }
  ]);
  const [discountCode, setDiscountCode] = useState<string>('');
  const [discountAmount, setDiscountAmount] = useState<number>(0);

  // View Mode & Filtering
  const [activeView, setActiveView] = useState<'store' | 'inventory' | 'analytics'>('store');
  const [currentCategory, setCurrentCategory] = useState<ProductCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'rating'>('featured');
  const [priceFilter, setPriceFilter] = useState<number>(600);

  // Modals and Drawers
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isTrackerOpen, setIsTrackerOpen] = useState(false);
  const [activeTrackingNumber, setActiveTrackingNumber] = useState<string>('');
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [reviewModalProductId, setReviewModalProductId] = useState<string | null>(null);

  // Total cart count
  const cartCount = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + item.quantity, 0);
  }, [cartItems]);

  // Cart operations
  const handleAddToCart = (
    product: Product, 
    size: string, 
    color: ProductColor, 
    quantity: number = 1
  ) => {
    setCartItems((prev) => {
      const existingIndex = prev.findIndex(
        (item) => 
          item.product.id === product.id && 
          item.size === size && 
          item.color.name === color.name
      );

      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex].quantity += quantity;
        return next;
      }
      return [...prev, { product, size, color, quantity }];
    });
  };

  const handleUpdateCartQuantity = (index: number, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveCartItem(index);
      return;
    }
    setCartItems((prev) => {
      const next = [...prev];
      next[index].quantity = quantity;
      return next;
    });
  };

  const handleRemoveCartItem = (index: number) => {
    setCartItems((prev) => prev.filter((_, i) => i !== index));
  };

  const handleApplyDiscount = (code: string): boolean => {
    const clean = code.trim().toUpperCase();
    const subtotal = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    
    if (clean === 'VANGUARD15') {
      const discount = Math.round(subtotal * 0.15);
      setDiscountCode('VANGUARD15');
      setDiscountAmount(discount);
      return true;
    } else if (clean === 'AUTUMN20') {
      const discount = Math.round(subtotal * 0.20);
      setDiscountCode('AUTUMN20');
      setDiscountAmount(discount);
      return true;
    }
    return false;
  };

  // Order Placement & Stock decrement
  const handleOrderPlaced = (newOrder: Order) => {
    setOrders((prev) => [newOrder, ...prev]);

    // Decrement inventory stock for items ordered
    setProducts((prev) => {
      return prev.map((p) => {
        const orderedItem = newOrder.items.find((i) => i.product.id === p.id);
        if (!orderedItem) return p;

        const variantKey = `${orderedItem.color.name}-${orderedItem.size}`;
        const currentVariantStock = p.stockPerVariant[variantKey] || 0;
        const newVariantStock = Math.max(0, currentVariantStock - orderedItem.quantity);
        const newTotalStock = Math.max(0, p.totalStock - orderedItem.quantity);

        return {
          ...p,
          totalStock: newTotalStock,
          stockPerVariant: {
            ...p.stockPerVariant,
            [variantKey]: newVariantStock
          }
        };
      });
    });

    // Clear cart
    setCartItems([]);
    setDiscountCode('');
    setDiscountAmount(0);
  };

  // Tracking Simulation (Advances checkpoints in real-time)
  const handleSimulateAdvanceTracking = (trackingNumber: string) => {
    setOrders((prevOrders) => {
      return prevOrders.map((ord) => {
        if (ord.tracking.trackingNumber !== trackingNumber) return ord;

        const currentStep = ord.tracking.currentStep;
        if (currentStep >= 4) {
          // Already delivered, reset or loop for demonstration
          return ord;
        }

        const nextStep = currentStep + 1;
        const statusMap: TrackingInfo['status'][] = [
          'Order Placed',
          'Processing & Tailoring',
          'Dispatched & Carrier Scanned',
          'In Transit',
          'Out for Delivery',
          'Delivered'
        ];

        const nextStatus = statusMap[nextStep] || 'Delivered';

        const updatedCheckpoints = ord.tracking.checkpoints.map((cp, idx) => {
          if (idx < nextStep) {
            return { ...cp, completed: true, current: false };
          } else if (idx === nextStep) {
            return { ...cp, completed: true, current: true, time: 'Just now' };
          }
          return { ...cp, completed: false, current: false };
        });

        return {
          ...ord,
          tracking: {
            ...ord.tracking,
            status: nextStatus,
            currentStep: nextStep,
            lastUpdated: 'Just now (Live carrier sync)',
            checkpoints: updatedCheckpoints
          }
        };
      });
    });
  };

  // Inventory Management Handlers
  const handleUpdateStock = (productId: string, variantKey: string, delta: number) => {
    setProducts((prev) => 
      prev.map((p) => {
        if (p.id !== productId) return p;
        const current = p.stockPerVariant[variantKey] || 0;
        const updated = Math.max(0, current + delta);
        const newVariants = { ...p.stockPerVariant, [variantKey]: updated };
        const newTotal = Object.values(newVariants).reduce((a: number, b: number) => a + b, 0);

        return {
          ...p,
          stockPerVariant: newVariants,
          totalStock: newTotal
        };
      })
    );
  };

  const handleQuickRestockTotal = (productId: string, amount: number) => {
    setProducts((prev) => 
      prev.map((p) => {
        if (p.id !== productId) return p;
        const newTotal = Math.max(0, p.totalStock + amount);
        // Distribute proportionally across variants
        const keys = Object.keys(p.stockPerVariant);
        const perKey = Math.floor(amount / keys.length);
        const newVariants = { ...p.stockPerVariant };
        keys.forEach((k) => {
          newVariants[k] = Math.max(0, (newVariants[k] || 0) + perKey);
        });

        return {
          ...p,
          totalStock: newTotal,
          stockPerVariant: newVariants
        };
      })
    );
  };

  const handleUpdatePrice = (productId: string, newPrice: number) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === productId ? { ...p, price: newPrice } : p))
    );
  };

  const handleBulkRestockLow = () => {
    setProducts((prev) =>
      prev.map((p) => {
        if (p.totalStock <= p.lowStockThreshold) {
          const added = 15;
          const newTotal = p.totalStock + added;
          const keys = Object.keys(p.stockPerVariant);
          const perKey = Math.ceil(added / keys.length);
          const newVariants = { ...p.stockPerVariant };
          keys.forEach((k) => {
            newVariants[k] = (newVariants[k] || 0) + perKey;
          });
          return {
            ...p,
            totalStock: newTotal,
            stockPerVariant: newVariants
          };
        }
        return p;
      })
    );
  };

  // Review Submission
  const handleSubmitReview = (newRevData: Omit<Review, 'id' | 'date' | 'helpfulCount'>) => {
    const newReview: Review = {
      ...newRevData,
      id: `rev-${Date.now()}`,
      date: 'Just now',
      helpfulCount: 0
    };

    setReviews((prev) => [newReview, ...prev]);

    // Recalculate product rating
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id !== newRevData.productId) return p;
        const productReviews = [...reviews.filter((r) => r.productId === p.id), newReview];
        const avg = productReviews.reduce((sum, r) => sum + r.rating, 0) / productReviews.length;
        return {
          ...p,
          rating: parseFloat(avg.toFixed(1)),
          reviewCount: productReviews.length
        };
      })
    );
  };

  const handleHelpfulReview = (reviewId: string) => {
    setReviews((prev) =>
      prev.map((r) => {
        if (r.id === reviewId) {
          return {
            ...r,
            helpfulCount: r.userVotedHelpful ? r.helpfulCount - 1 : r.helpfulCount + 1,
            userVotedHelpful: !r.userVotedHelpful
          };
        }
        return r;
      })
    );
  };

  // Filtered and Sorted Storefront Products
  const displayedProducts = useMemo(() => {
    let list = [...products];

    // Category filter
    if (currentCategory !== 'all') {
      list = list.filter((p) => p.category === currentCategory);
    }

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (p) => 
          p.name.toLowerCase().includes(q) ||
          p.subtitle.toLowerCase().includes(q) ||
          p.fabric.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }

    // Price filter
    list = list.filter((p) => p.price <= priceFilter);

    // Sorting
    if (sortBy === 'price-low') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      list.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      list.sort((a, b) => b.rating - a.rating);
    }

    return list;
  }, [products, currentCategory, searchQuery, priceFilter, sortBy]);

  return (
    <div className="min-h-screen bg-[#faf9f6] text-stone-900 flex flex-col selection:bg-stone-900 selection:text-amber-400">
      {/* Navigation */}
      <Navbar
        currentCategory={currentCategory}
        onSelectCategory={setCurrentCategory}
        cartCount={cartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenTracker={() => {
          setActiveTrackingNumber(orders[0]?.tracking.trackingNumber || '');
          setIsTrackerOpen(true);
        }}
        onOpenAuth={() => setIsAuthOpen(true)}
        user={user}
        onLogout={() => setUser(null)}
        activeView={activeView}
        onChangeView={setActiveView}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        wishlistCount={2}
      />

      {/* Main Content Router based on activeView */}
      <main className="flex-1">
        {activeView === 'inventory' ? (
          <InventoryManager
            products={products}
            onUpdateStock={handleUpdateStock}
            onQuickRestockTotal={handleQuickRestockTotal}
            onUpdatePrice={handleUpdatePrice}
            onBulkRestockLow={handleBulkRestockLow}
          />
        ) : activeView === 'analytics' ? (
          <AnalyticsDashboard orders={orders} />
        ) : (
          /* Storefront View */
          <div>
            {/* Hero Editorial Banner */}
            <div className="relative bg-stone-900 text-white overflow-hidden">
              <div className="absolute inset-0 z-0 opacity-40">
                <img
                  src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=2000&q=80"
                  alt="Editorial Sartorial Menswear"
                  className="w-full h-full object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-stone-950 via-stone-950/80 to-transparent" />
              </div>

              <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-28 flex flex-col justify-center">
                <div className="max-w-xl space-y-4">
                  <div className="flex items-center space-x-2 text-amber-400 text-xs font-bold uppercase tracking-[0.25em]">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Autumn / Winter Atelier Release</span>
                  </div>

                  <h1 className="font-['Playfair_Display',serif] text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
                    The Architecture of Modern Elegance
                  </h1>

                  <p className="text-stone-300 text-xs sm:text-sm leading-relaxed max-w-lg">
                    Impeccably canvassed Italian virgin wool blazers, 4-ply Mongolian cashmere crewnecks, and Goodyear-welted French calfskin footwear. Engineered for longevity and distinguished silhouette.
                  </p>

                  <div className="pt-4 flex flex-wrap items-center gap-3">
                    <button
                      onClick={() => setCurrentCategory('blazers')}
                      className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-bold tracking-widest uppercase transition flex items-center gap-2 shadow-lg"
                    >
                      <span>Explore Suiting & Tailoring</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => {
                        setActiveTrackingNumber(orders[0]?.tracking.trackingNumber || '');
                        setIsTrackerOpen(true);
                      }}
                      className="px-5 py-3 bg-stone-800/90 hover:bg-stone-700 text-white text-xs font-semibold tracking-wider uppercase border border-stone-600 transition flex items-center gap-2"
                    >
                      <Truck className="w-4 h-4 text-amber-400" />
                      <span>Track Active Orders</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Ticker at bottom of hero */}
              <div className="relative z-10 bg-stone-950/90 border-t border-stone-800 py-3 px-4 text-stone-400 text-[11px] flex items-center justify-around overflow-x-auto">
                <span className="flex items-center gap-1.5 whitespace-nowrap">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-400" /> Biella & Savile Row Provenance
                </span>
                <span className="hidden sm:inline">•</span>
                <span className="flex items-center gap-1.5 whitespace-nowrap">
                  <Truck className="w-3.5 h-3.5 text-amber-400" /> Real-Time GPS Delivery Tracking
                </span>
                <span className="hidden sm:inline">•</span>
                <span className="flex items-center gap-1.5 whitespace-nowrap">
                  <Layers className="w-3.5 h-3.5 text-amber-400" /> Live Inventory Sync
                </span>
              </div>
            </div>

            {/* Catalog Grid Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-8">
              {/* Filter and Control Bar */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-stone-200 pb-5">
                <div>
                  <h2 className="font-['Playfair_Display',serif] text-2xl font-bold text-stone-900 capitalize">
                    {currentCategory === 'all' ? "Men's Wardrobe Collection" : `${currentCategory} Selection`}
                  </h2>
                  <p className="text-xs text-stone-500 mt-0.5">
                    Displaying {displayedProducts.length} sartorial pieces
                  </p>
                </div>

                {/* Filters & Sorting */}
                <div className="flex flex-wrap items-center gap-4 text-xs w-full sm:w-auto">
                  {/* Price Filter */}
                  <div className="flex items-center space-x-2 bg-white px-3 py-2 border border-stone-200">
                    <span className="text-stone-500">Max Price:</span>
                    <strong className="text-stone-900">${priceFilter}</strong>
                    <input
                      type="range"
                      min="100"
                      max="600"
                      step="25"
                      value={priceFilter}
                      onChange={(e) => setPriceFilter(Number(e.target.value))}
                      className="w-20 accent-stone-900"
                    />
                  </div>

                  {/* Sort Selector */}
                  <div className="flex items-center space-x-2 bg-white px-3 py-2 border border-stone-200">
                    <span className="text-stone-500">Sort:</span>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value as any)}
                      className="text-xs font-semibold text-stone-900 bg-transparent focus:outline-none cursor-pointer"
                    >
                      <option value="featured">Featured Atelier</option>
                      <option value="rating">Highest Rated</option>
                      <option value="price-low">Price: Low to High</option>
                      <option value="price-high">Price: High to Low</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Product Grid */}
              {displayedProducts.length === 0 ? (
                <div className="py-20 text-center bg-white border border-stone-200 p-8 space-y-3">
                  <p className="text-stone-500 text-sm">No items found matching your current filter settings.</p>
                  <button
                    onClick={() => {
                      setCurrentCategory('all');
                      setSearchQuery('');
                      setPriceFilter(600);
                    }}
                    className="px-4 py-2 bg-stone-900 text-white text-xs font-bold uppercase tracking-wider"
                  >
                    Reset All Filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7">
                  {displayedProducts.map((prod) => (
                    <ProductCard
                      key={prod.id}
                      product={prod}
                      onQuickView={setSelectedProduct}
                      onAddToCart={(product, size, color) => handleAddToCart(product, size, color, 1)}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          reviews={reviews}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={handleAddToCart}
          onOpenReviewModal={(productId) => {
            setReviewModalProductId(productId);
          }}
          onHelpfulReview={handleHelpfulReview}
        />
      )}

      {/* Review Submission Modal */}
      {reviewModalProductId && (
        <ReviewModal
          product={products.find((p) => p.id === reviewModalProductId) || products[0]}
          onClose={() => setReviewModalProductId(null)}
          onSubmitReview={handleSubmitReview}
        />
      )}

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onProceedToCheckout={() => setIsCheckoutOpen(true)}
        discountCode={discountCode}
        onApplyDiscount={handleApplyDiscount}
        discountAmount={discountAmount}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        user={user}
        discountAmount={discountAmount}
        onOrderPlaced={handleOrderPlaced}
        onTrackOrder={(trackingNumber) => {
          setActiveTrackingNumber(trackingNumber);
          setIsTrackerOpen(true);
        }}
      />

      {/* Real-time Shipping Tracker Modal */}
      <ShippingTrackerModal
        isOpen={isTrackerOpen}
        onClose={() => setIsTrackerOpen(false)}
        orders={orders}
        initialTrackingNumber={activeTrackingNumber}
        onSimulateAdvanceTracking={handleSimulateAdvanceTracking}
      />

      {/* Secure User Authentication Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onLogin={(newUser) => setUser(newUser)}
      />

      {/* Responsive Footer */}
      <Footer
        onOpenTracker={() => {
          setActiveTrackingNumber(orders[0]?.tracking.trackingNumber || '');
          setIsTrackerOpen(true);
        }}
        onOpenAuth={() => setIsAuthOpen(true)}
      />
    </div>
  );
}
