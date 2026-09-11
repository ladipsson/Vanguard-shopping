import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Truck, 
  User as UserIcon, 
  Search, 
  BarChart3, 
  Layers, 
  LogOut, 
  Check, 
  Menu, 
  X,
  SlidersHorizontal
} from 'lucide-react';
import { ProductCategory, User } from '../types';

interface NavbarProps {
  currentCategory: ProductCategory;
  onSelectCategory: (cat: ProductCategory) => void;
  cartCount: number;
  onOpenCart: () => void;
  onOpenTracker: () => void;
  onOpenAuth: () => void;
  user: User | null;
  onLogout: () => void;
  activeView: 'store' | 'inventory' | 'analytics';
  onChangeView: (view: 'store' | 'inventory' | 'analytics') => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  wishlistCount: number;
}

const CATEGORIES: { id: ProductCategory; label: string }[] = [
  { id: 'all', label: 'All Collection' },
  { id: 'blazers', label: 'Blazers & Suiting' },
  { id: 'knitwear', label: 'Cashmere & Knits' },
  { id: 'outerwear', label: 'Coats & Jackets' },
  { id: 'shirts', label: 'Tailored Shirts' },
  { id: 'trousers', label: 'Trousers' },
  { id: 'accessories', label: 'Footwear & Acc.' }
];

export const Navbar: React.FC<NavbarProps> = ({
  currentCategory,
  onSelectCategory,
  cartCount,
  onOpenCart,
  onOpenTracker,
  onOpenAuth,
  user,
  onLogout,
  activeView,
  onChangeView,
  searchQuery,
  onSearchChange
}) => {
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-stone-900 text-stone-100 shadow-md">
      {/* Top Utility Announcement Bar */}
      <div className="bg-stone-950 text-stone-300 text-xs py-1.5 px-4 border-b border-stone-800 tracking-wider flex items-center justify-between">
        <div className="hidden md:flex items-center space-x-4">
          <span className="flex items-center text-amber-400 font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mr-1.5 animate-pulse"></span>
            AUTUMN/WINTER ATELIER COLLECTION LIVE
          </span>
          <span className="text-stone-500">•</span>
          <span>Complimentary worldwide express shipping on orders over $250</span>
        </div>
        <div className="flex items-center justify-between w-full md:w-auto text-stone-400 space-x-6 text-[11px]">
          <button 
            id="nav-track-order-top"
            onClick={onOpenTracker}
            className="hover:text-amber-400 transition-colors flex items-center gap-1.5"
          >
            <Truck className="w-3.5 h-3.5 text-amber-400" />
            <span>Track Live Shipment</span>
          </button>
          <div className="flex items-center space-x-3">
            <span className="text-stone-500">USD ($)</span>
            <span className="text-stone-600">|</span>
            {user ? (
              <span className="text-stone-300 font-medium truncate max-w-[140px]">
                {user.name} ({user.role === 'admin' ? 'Store Owner' : 'VIP Client'})
              </span>
            ) : (
              <button 
                id="nav-login-top"
                onClick={onOpenAuth} 
                className="hover:text-white transition-colors"
              >
                Sign In / Register
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Nav Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <button
              id="nav-mobile-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-stone-300 hover:text-white"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Brand Logo */}
          <div className="flex flex-col items-center md:items-start cursor-pointer" onClick={() => onChangeView('store')}>
            <div className="flex items-center space-x-2">
              <span className="font-['Playfair_Display',serif] tracking-[0.22em] text-2xl md:text-3xl font-bold uppercase text-white">
                VANGUARD
              </span>
            </div>
            <span className="text-[9px] tracking-[0.3em] uppercase text-amber-400 font-medium">
              Sartorial Atelier & Co.
            </span>
          </div>

          {/* Search bar on desktop */}
          <div className="hidden lg:flex items-center flex-1 max-w-xs mx-8">
            <div className="relative w-full">
              <input
                id="nav-search-input"
                type="text"
                placeholder="Search cashmere, blazers, boots..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full bg-stone-800 text-stone-100 placeholder-stone-400 text-xs rounded-none border border-stone-700 py-2 pl-9 pr-4 focus:outline-none focus:border-amber-400 transition-colors"
              />
              <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-2.5" />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute right-2.5 top-2 text-stone-400 hover:text-white text-xs"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Nav Mode Switcher (Storefront vs Inventory vs Analytics) */}
          <div className="hidden sm:flex items-center bg-stone-800/80 p-1 rounded border border-stone-700/60 text-xs">
            <button
              id="view-mode-store"
              onClick={() => onChangeView('store')}
              className={`px-3 py-1.5 font-medium transition-all ${
                activeView === 'store'
                  ? 'bg-amber-500 text-stone-950 shadow'
                  : 'text-stone-300 hover:text-white'
              }`}
            >
              Storefront
            </button>
            <button
              id="view-mode-inventory"
              onClick={() => onChangeView('inventory')}
              className={`px-3 py-1.5 font-medium flex items-center gap-1.5 transition-all ${
                activeView === 'inventory'
                  ? 'bg-amber-500 text-stone-950 shadow'
                  : 'text-stone-300 hover:text-white'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              Inventory Mgr
            </button>
            <button
              id="view-mode-analytics"
              onClick={() => onChangeView('analytics')}
              className={`px-3 py-1.5 font-medium flex items-center gap-1.5 transition-all ${
                activeView === 'analytics'
                  ? 'bg-amber-500 text-stone-950 shadow'
                  : 'text-stone-300 hover:text-white'
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5" />
              Analytics
            </button>
          </div>

          {/* Actions: Search icon (mobile), Tracker, User Profile, Cart */}
          <div className="flex items-center space-x-4">
            <button
              id="nav-search-toggle-mobile"
              onClick={() => setSearchOpen(!searchOpen)}
              className="lg:hidden p-2 text-stone-300 hover:text-white"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>

            <button
              id="nav-track-btn"
              onClick={onOpenTracker}
              className="hidden sm:flex items-center gap-1.5 text-xs font-medium text-stone-200 hover:text-amber-400 bg-stone-800/50 hover:bg-stone-800 px-3 py-2 border border-stone-700 transition"
              title="Track Active Shipment"
            >
              <Truck className="w-4 h-4 text-amber-400" />
              <span>Track Orders</span>
            </button>

            {/* User Account Menu */}
            <div className="relative">
              <button
                id="nav-user-menu-btn"
                onClick={() => {
                  if (!user) {
                    onOpenAuth();
                  } else {
                    setUserMenuOpen(!userMenuOpen);
                  }
                }}
                className="flex items-center space-x-2 text-stone-300 hover:text-white p-1.5 transition"
              >
                {user?.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-7 h-7 rounded-full object-cover border border-amber-400/50"
                  />
                ) : (
                  <div className="w-7 h-7 rounded-full bg-stone-800 flex items-center justify-center border border-stone-700">
                    <UserIcon className="w-4 h-4 text-stone-300" />
                  </div>
                )}
              </button>

              {userMenuOpen && user && (
                <div className="absolute right-0 mt-2 w-64 bg-stone-900 border border-stone-700 shadow-xl py-2 z-50 text-xs">
                  <div className="px-4 py-2.5 border-b border-stone-800">
                    <p className="font-semibold text-white text-sm">{user.name}</p>
                    <p className="text-stone-400 text-[11px] truncate">{user.email}</p>
                    <span className="inline-block mt-1 px-2 py-0.5 text-[10px] bg-amber-400/10 text-amber-400 border border-amber-400/20 uppercase tracking-wider font-semibold">
                      {user.role === 'admin' ? 'Store Administrator' : 'Verified Member'}
                    </span>
                  </div>

                  <div className="py-1">
                    <button
                      onClick={() => {
                        onChangeView('store');
                        setUserMenuOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-stone-800 text-stone-200 flex items-center justify-between"
                    >
                      <span>Storefront Catalog</span>
                      {activeView === 'store' && <Check className="w-3.5 h-3.5 text-amber-400" />}
                    </button>
                    <button
                      onClick={() => {
                        onChangeView('inventory');
                        setUserMenuOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-stone-800 text-stone-200 flex items-center justify-between"
                    >
                      <span className="flex items-center gap-2">
                        <Layers className="w-3.5 h-3.5 text-amber-400" />
                        Inventory Management
                      </span>
                      {activeView === 'inventory' && <Check className="w-3.5 h-3.5 text-amber-400" />}
                    </button>
                    <button
                      onClick={() => {
                        onChangeView('analytics');
                        setUserMenuOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-stone-800 text-stone-200 flex items-center justify-between"
                    >
                      <span className="flex items-center gap-2">
                        <BarChart3 className="w-3.5 h-3.5 text-amber-400" />
                        Executive Analytics
                      </span>
                      {activeView === 'analytics' && <Check className="w-3.5 h-3.5 text-amber-400" />}
                    </button>
                    <button
                      onClick={() => {
                        onOpenTracker();
                        setUserMenuOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-stone-800 text-stone-200 flex items-center gap-2"
                    >
                      <Truck className="w-3.5 h-3.5 text-stone-400" />
                      Track My Orders
                    </button>
                  </div>

                  <div className="pt-1 border-t border-stone-800">
                    <button
                      onClick={() => {
                        onLogout();
                        setUserMenuOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-red-950/40 text-red-400 flex items-center gap-2"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Shopping Cart Trigger */}
            <button
              id="nav-cart-btn"
              onClick={onOpenCart}
              className="relative flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-stone-950 font-semibold px-4 py-2 text-xs transition"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline">Bag</span>
              <span className="bg-stone-950 text-amber-400 text-[11px] font-bold px-1.5 py-0.2 rounded-full min-w-[18px] text-center">
                {cartCount}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Search dropdown */}
        {searchOpen && (
          <div className="lg:hidden pb-3 pt-1">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search collection..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full bg-stone-800 text-stone-100 placeholder-stone-400 text-xs py-2 pl-9 pr-4 focus:outline-none focus:border-amber-400 border border-stone-700"
              />
              <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-2.5" />
            </div>
          </div>
        )}
      </div>

      {/* Category Navigation Bar (visible when viewing Storefront) */}
      {activeView === 'store' && (
        <nav className="border-t border-stone-800 bg-stone-900/95 overflow-x-auto scrollbar-none">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center space-x-1 sm:space-x-4 py-2.5 whitespace-nowrap min-w-max">
              {CATEGORIES.map((cat) => {
                const isActive = currentCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    id={`cat-btn-${cat.id}`}
                    onClick={() => onSelectCategory(cat.id)}
                    className={`px-3.5 py-1 text-xs tracking-wider uppercase font-medium transition-colors relative ${
                      isActive
                        ? 'text-amber-400 font-semibold'
                        : 'text-stone-400 hover:text-stone-100'
                    }`}
                  >
                    {cat.label}
                    {isActive && (
                      <span className="absolute bottom-[-10px] left-0 right-0 h-[2px] bg-amber-400"></span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </nav>
      )}

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-stone-800 bg-stone-900 p-4 space-y-4">
          <div className="flex flex-col space-y-2">
            <span className="text-xs uppercase text-amber-400 tracking-wider font-semibold">View Mode</span>
            <div className="grid grid-cols-3 gap-2 text-xs">
              <button
                onClick={() => {
                  onChangeView('store');
                  setMobileMenuOpen(false);
                }}
                className={`p-2 text-center ${activeView === 'store' ? 'bg-amber-500 text-stone-950 font-bold' : 'bg-stone-800 text-stone-300'}`}
              >
                Store
              </button>
              <button
                onClick={() => {
                  onChangeView('inventory');
                  setMobileMenuOpen(false);
                }}
                className={`p-2 text-center ${activeView === 'inventory' ? 'bg-amber-500 text-stone-950 font-bold' : 'bg-stone-800 text-stone-300'}`}
              >
                Inventory
              </button>
              <button
                onClick={() => {
                  onChangeView('analytics');
                  setMobileMenuOpen(false);
                }}
                className={`p-2 text-center ${activeView === 'analytics' ? 'bg-amber-500 text-stone-950 font-bold' : 'bg-stone-800 text-stone-300'}`}
              >
                Analytics
              </button>
            </div>
          </div>

          <div className="pt-2 border-t border-stone-800 flex flex-col space-y-2 text-xs">
            <button
              onClick={() => {
                onOpenTracker();
                setMobileMenuOpen(false);
              }}
              className="flex items-center gap-2 p-2 bg-stone-800 text-stone-200"
            >
              <Truck className="w-4 h-4 text-amber-400" />
              <span>Track Orders in Real-Time</span>
            </button>
            {user ? (
              <button
                onClick={() => {
                  onLogout();
                  setMobileMenuOpen(false);
                }}
                className="flex items-center gap-2 p-2 bg-stone-800 text-red-400"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out ({user.name})</span>
              </button>
            ) : (
              <button
                onClick={() => {
                  onOpenAuth();
                  setMobileMenuOpen(false);
                }}
                className="flex items-center justify-center p-2 bg-amber-500 text-stone-950 font-semibold"
              >
                Sign In / Create Account
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
