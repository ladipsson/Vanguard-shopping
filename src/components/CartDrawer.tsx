import React, { useState } from 'react';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ArrowRight, 
  ShoppingBag, 
  Tag, 
  Truck, 
  ShieldCheck,
  Check
} from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (index: number, quantity: number) => void;
  onRemoveItem: (index: number) => void;
  onProceedToCheckout: () => void;
  discountCode: string;
  onApplyDiscount: (code: string) => boolean;
  discountAmount: number;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
  discountCode,
  onApplyDiscount,
  discountAmount
}) => {
  const [promoInput, setPromoInput] = useState('');
  const [promoError, setPromoError] = useState('');
  const [promoSuccess, setPromoSuccess] = useState(false);

  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const freeShippingThreshold = 250;
  const progressToFreeShipping = Math.min(100, (subtotal / freeShippingThreshold) * 100);
  const amountNeededForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const estimatedShipping = subtotal >= freeShippingThreshold || subtotal === 0 ? 0 : 15;
  const finalDiscount = discountAmount;
  const estimatedTax = Math.round((subtotal - finalDiscount) * 0.08);
  const total = Math.max(0, subtotal - finalDiscount + estimatedShipping + estimatedTax);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError('');
    if (!promoInput.trim()) return;

    const valid = onApplyDiscount(promoInput.trim());
    if (valid) {
      setPromoSuccess(true);
      setPromoError('');
    } else {
      setPromoError('Invalid code. Try "VANGUARD15" for 15% off or "AUTUMN20"');
      setPromoSuccess(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div 
        className="absolute inset-0 bg-stone-950/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div 
          id="cart-drawer-panel"
          className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between border-l border-stone-200"
        >
          {/* Header */}
          <div className="p-5 border-b border-stone-200 bg-stone-900 text-white flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <ShoppingBag className="w-5 h-5 text-amber-400" />
              <h2 className="font-['Playfair_Display',serif] text-lg font-bold tracking-wide">
                Your Shopping Bag ({items.reduce((s, i) => s + i.quantity, 0)})
              </h2>
            </div>
            <button
              id="close-cart-btn"
              onClick={onClose}
              className="p-1.5 text-stone-400 hover:text-white transition"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="bg-stone-100 p-3.5 border-b border-stone-200 text-xs text-stone-700">
            <div className="flex items-center justify-between mb-1.5 font-medium">
              <span className="flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5 text-amber-600" />
                {amountNeededForFreeShipping === 0 ? (
                  <span className="text-emerald-700 font-bold">You've unlocked Complimentary Express Shipping!</span>
                ) : (
                  <span>Add <strong>${amountNeededForFreeShipping.toFixed(2)}</strong> more for Free Worldwide Express</span>
                )}
              </span>
              <span className="font-bold text-stone-900">{Math.round(progressToFreeShipping)}%</span>
            </div>
            <div className="w-full bg-stone-300 h-1.5 rounded-full overflow-hidden">
              <div 
                className="bg-amber-600 h-full transition-all duration-500 rounded-full"
                style={{ width: `${progressToFreeShipping}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 divide-y divide-stone-100">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4 text-stone-500">
                <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center text-stone-400">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="font-['Playfair_Display',serif] text-base font-bold text-stone-800">
                    Your bag is currently empty
                  </h3>
                  <p className="text-xs text-stone-500 mt-1 max-w-xs">
                    Explore our collection of Italian suiting, Mongolian cashmere, and Goodyear-welted footwear.
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 bg-stone-900 text-white text-xs font-bold tracking-wider uppercase hover:bg-amber-600 transition"
                >
                  Explore Collection
                </button>
              </div>
            ) : (
              items.map((item, index) => (
                <div key={`${item.product.id}-${item.size}-${item.color.name}`} className="py-4 flex space-x-4">
                  {/* Thumbnail */}
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-20 h-24 object-cover object-center bg-stone-100 border border-stone-200"
                  />

                  {/* Item info */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h4 className="font-['Playfair_Display',serif] text-sm font-semibold text-stone-900 line-clamp-1">
                          {item.product.name}
                        </h4>
                        <span className="text-sm font-bold text-stone-900">
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                      <div className="text-[11px] text-stone-500 mt-1 space-x-2">
                        <span>Size: <strong className="text-stone-800">{item.size}</strong></span>
                        <span>•</span>
                        <span>Color: <strong className="text-stone-800">{item.color.name}</strong></span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      {/* Quantity Controls */}
                      <div className="flex items-center border border-stone-300">
                        <button
                          onClick={() => onUpdateQuantity(index, item.quantity - 1)}
                          className="p-1 hover:bg-stone-100 text-stone-600"
                          aria-label="Decrease"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2.5 py-0.5 text-xs font-semibold text-stone-900">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(index, item.quantity + 1)}
                          className="p-1 hover:bg-stone-100 text-stone-600"
                          aria-label="Increase"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => onRemoveItem(index)}
                        className="text-stone-400 hover:text-rose-600 p-1 transition"
                        title="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer with Calculations and Checkout */}
          {items.length > 0 && (
            <div className="border-t border-stone-200 p-5 bg-stone-50 space-y-4">
              {/* Promo Code Input */}
              <form onSubmit={handleApplyPromo} className="flex space-x-2">
                <div className="relative flex-1">
                  <Tag className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    placeholder="Promo code (e.g. VANGUARD15)"
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value)}
                    className="w-full text-xs pl-9 pr-3 py-2 border border-stone-300 uppercase tracking-wider bg-white focus:outline-none focus:border-stone-900"
                  />
                </div>
                <button
                  type="submit"
                  className="px-3 py-2 bg-stone-900 text-white text-xs font-semibold hover:bg-stone-800 transition"
                >
                  Apply
                </button>
              </form>
              {promoError && <p className="text-[11px] text-rose-600">{promoError}</p>}
              {discountCode && (
                <div className="flex items-center justify-between text-xs text-emerald-700 bg-emerald-50 px-2.5 py-1.5 border border-emerald-200">
                  <span className="flex items-center gap-1 font-semibold">
                    <Check className="w-3 h-3" /> Code '{discountCode}' applied
                  </span>
                  <span>-${discountAmount.toFixed(2)}</span>
                </div>
              )}

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs text-stone-600 border-t border-stone-200 pt-3">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-stone-900">${subtotal.toFixed(2)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-medium">
                    <span>Discount</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Express Shipping</span>
                  <span>
                    {estimatedShipping === 0 ? (
                      <span className="text-emerald-700 font-semibold">FREE</span>
                    ) : (
                      `$${estimatedShipping.toFixed(2)}`
                    )}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated Tax (8%)</span>
                  <span>${estimatedTax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-stone-900 border-t border-stone-200 pt-2">
                  <span>Estimated Total</span>
                  <span className="text-base">${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Checkout Trigger */}
              <button
                id="cart-proceed-checkout-btn"
                onClick={() => {
                  onClose();
                  onProceedToCheckout();
                }}
                className="w-full py-3.5 bg-stone-950 hover:bg-amber-600 text-white text-xs font-bold tracking-widest uppercase transition flex items-center justify-center gap-2 shadow-lg"
              >
                <span>Proceed to Secure Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center space-x-2 text-[10px] text-stone-500 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>256-Bit SSL Encrypted Sartorial Payment Gateway</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
