import React from 'react';
import { Truck, ShieldCheck, RefreshCw, Scissors, ArrowRight, Lock } from 'lucide-react';

interface FooterProps {
  onOpenTracker: () => void;
  onOpenAuth: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenTracker, onOpenAuth }) => {
  return (
    <footer className="bg-stone-950 text-stone-300 border-t border-stone-800">
      {/* Value Pillars Banner */}
      <div className="border-b border-stone-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex items-start space-x-3.5">
              <div className="p-2.5 bg-stone-900 border border-stone-800 text-amber-400">
                <Truck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                  Worldwide Express Air
                </h4>
                <p className="text-stone-400 text-xs mt-1">
                  Complimentary on all orders exceeding $250. Real-time GPS tracked courier delivery.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3.5">
              <div className="p-2.5 bg-stone-900 border border-stone-800 text-amber-400">
                <Scissors className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                  Sartorial Craft & Tailoring
                </h4>
                <p className="text-stone-400 text-xs mt-1">
                  Woven in Biella, Italy and Savile Row. Double-pleat trousers and canvassed blazers.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3.5">
              <div className="p-2.5 bg-stone-900 border border-stone-800 text-amber-400">
                <RefreshCw className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                  30-Day Hassle-Free Returns
                </h4>
                <p className="text-stone-400 text-xs mt-1">
                  Pre-printed courier return labels included in every bespoke cedar garment box.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3.5">
              <div className="p-2.5 bg-stone-900 border border-stone-800 text-amber-400">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                  Encrypted Payments
                </h4>
                <p className="text-stone-400 text-xs mt-1">
                  Integrated Apple Pay, Google Pay, and 256-bit bank level SSL authorization.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-4">
            <span className="font-['Playfair_Display',serif] text-2xl font-bold tracking-[0.2em] text-white uppercase block">
              VANGUARD
            </span>
            <p className="text-stone-400 text-xs leading-relaxed max-w-sm">
              Established in 1984. Dedicated to timeless menswear, natural noble fibers (cashmere, merino wool, extra-long staple Egyptian cotton), and modern sartorial craftsmanship.
            </p>
            <div className="pt-2">
              <button
                onClick={onOpenTracker}
                className="inline-flex items-center space-x-2 text-xs text-amber-400 hover:text-amber-300 font-semibold uppercase tracking-wider"
              >
                <Truck className="w-4 h-4" />
                <span>Track Your Active Shipment in Real-Time →</span>
              </button>
            </div>
          </div>

          {/* Col 2 */}
          <div className="space-y-3">
            <h5 className="text-xs font-bold text-white uppercase tracking-wider">Wardrobe</h5>
            <ul className="space-y-2 text-xs text-stone-400">
              <li><a href="#" className="hover:text-white transition">Italian Suiting & Blazers</a></li>
              <li><a href="#" className="hover:text-white transition">Mongolian Cashmere</a></li>
              <li><a href="#" className="hover:text-white transition">Melton Wool Overcoats</a></li>
              <li><a href="#" className="hover:text-white transition">Egyptian Cotton Shirts</a></li>
              <li><a href="#" className="hover:text-white transition">Forward Pleated Trousers</a></li>
              <li><a href="#" className="hover:text-white transition">Goodyear-Welted Footwear</a></li>
            </ul>
          </div>

          {/* Col 3 */}
          <div className="space-y-3">
            <h5 className="text-xs font-bold text-white uppercase tracking-wider">Client Services</h5>
            <ul className="space-y-2 text-xs text-stone-400">
              <li><button onClick={onOpenTracker} className="hover:text-white transition">Real-Time Order Tracking</button></li>
              <li><button onClick={onOpenAuth} className="hover:text-white transition">Atelier Member Login</button></li>
              <li><a href="#" className="hover:text-white transition">Sizing & Measurement Guide</a></li>
              <li><a href="#" className="hover:text-white transition">Care & Cedar Storage Guide</a></li>
              <li><a href="#" className="hover:text-white transition">Bespoke In-Store Appointments</a></li>
            </ul>
          </div>

          {/* Col 4: Newsletter */}
          <div className="space-y-3">
            <h5 className="text-xs font-bold text-white uppercase tracking-wider">The Vanguard Dispatch</h5>
            <p className="text-stone-400 text-xs">
              Receive private previews of limited edition drops and private seasonal sales.
            </p>
            <form onSubmit={(e) => { e.preventDefault(); alert('Subscribed to The Vanguard Dispatch.'); }} className="space-y-2">
              <div className="flex">
                <input
                  type="email"
                  required
                  placeholder="Your executive email"
                  className="w-full text-xs p-2.5 bg-stone-900 border border-stone-700 text-white focus:outline-none focus:border-amber-400"
                />
                <button
                  type="submit"
                  className="bg-amber-500 hover:bg-amber-400 text-stone-950 px-3 font-bold text-xs"
                >
                  Join
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-stone-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-stone-500">
          <p>© 2026 Vanguard Men's Wear & Atelier Co. All rights reserved.</p>
          <div className="flex items-center space-x-4">
            <span>Visa</span>
            <span>Mastercard</span>
            <span>American Express</span>
            <span>Apple Pay</span>
            <span>Google Pay</span>
            <span className="flex items-center gap-1 text-emerald-500 font-medium">
              <Lock className="w-3 h-3" /> SSL 256-Bit
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
