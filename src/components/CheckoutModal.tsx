import React, { useState } from 'react';
import { 
  X, 
  CreditCard, 
  Lock, 
  ShieldCheck, 
  Truck, 
  CheckCircle2, 
  ArrowRight,
  Sparkles,
  Loader2,
  PackageCheck
} from 'lucide-react';
import { CartItem, Order, User, TrackingInfo } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  user: User | null;
  discountAmount: number;
  onOrderPlaced: (order: Order) => void;
  onTrackOrder: (trackingNumber: string) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  user,
  discountAmount,
  onOrderPlaced,
  onTrackOrder
}) => {
  const [step, setStep] = useState<'details' | 'payment' | 'processing' | 'success'>('details');
  const [paymentMethod, setPaymentMethod] = useState<'credit_card' | 'apple_pay' | 'google_pay'>('credit_card');

  // Contact & Shipping Form
  const [formData, setFormData] = useState({
    name: user?.savedAddress?.name || user?.name || '',
    email: user?.email || '',
    phone: user?.savedAddress?.phone || '',
    address: user?.savedAddress?.address || '',
    city: user?.savedAddress?.city || '',
    postalCode: user?.savedAddress?.postalCode || '',
    country: user?.savedAddress?.country || 'United States'
  });

  // Shipping Method
  const [shippingMethod, setShippingMethod] = useState<'Standard Delivery' | 'Express Air' | 'White Glove Priority'>('Express Air');

  // Payment Form
  const [cardData, setCardData] = useState({
    number: '4242 •••• •••• 4242',
    name: user?.name || 'Alexander Wright',
    expiry: '08/29',
    cvv: '842'
  });

  const [processingStage, setProcessingStage] = useState('Initializing secure payment...');
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);

  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const shippingCost = 
    shippingMethod === 'White Glove Priority' ? 45 :
    shippingMethod === 'Express Air' ? (subtotal >= 250 ? 0 : 25) : 15;
  const tax = Math.round((subtotal - discountAmount) * 0.08);
  const grandTotal = Math.max(0, subtotal - discountAmount + shippingCost + tax);

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/\D/g, '').substring(0, 16);
    let formatted = val.match(/.{1,4}/g)?.join(' ') || val;
    setCardData({ ...cardData, number: formatted });
  };

  const handleProcessPayment = (overrideMethod?: 'credit_card' | 'apple_pay' | 'google_pay') => {
    const selectedMethod = overrideMethod || paymentMethod;
    setStep('processing');
    setProcessingStage('Connecting to 256-bit encrypted merchant bank gateway...');

    setTimeout(() => {
      setProcessingStage('Verifying tokenized payment credentials & fraud protection...');
    }, 900);

    setTimeout(() => {
      setProcessingStage('Generating real-time global shipment manifest...');
    }, 1800);

    setTimeout(() => {
      // Create new Order
      const newOrderNumber = `VG-${Math.floor(10000 + Math.random() * 90000)}`;
      const newTrackingNumber = `FDX-794${Math.floor(10000000 + Math.random() * 90000000)}`;

      const newTracking: TrackingInfo = {
        trackingNumber: newTrackingNumber,
        carrier: 'FedEx Priority',
        status: 'Order Placed',
        currentStep: 0,
        estimatedDelivery: '2 Business Days (Guaranteed 10:30 AM)',
        origin: 'Atelier Distribution Hub, Florence, Italy',
        destination: `${formData.city || 'San Francisco'}, ${formData.country || 'USA'}`,
        serviceType: 'FedEx International Priority Overnight',
        lastUpdated: 'Just now',
        checkpoints: [
          {
            time: 'Just now',
            status: 'Order Authorized & Tailor Dispatched',
            location: 'Florence Central Atelier, Italy',
            detail: 'Payment confirmed. Garments retrieved for final hand-pressing and cedar-wrapping.',
            completed: true,
            current: true
          },
          {
            time: 'Expected within 4 hrs',
            status: 'Quality Verification & Custom Boxing',
            location: 'Florence Central Atelier, Italy',
            detail: 'Fabric inspection, pick-stitch check, and garment-bag boxing.',
            completed: false
          },
          {
            time: 'Expected Tomorrow',
            status: 'Departed Export International Hub',
            location: 'Milan Malpensa International Airport',
            detail: 'Loaded onto transatlantic express freighter.',
            completed: false
          },
          {
            time: 'Expected 2 Days',
            status: 'Delivered',
            location: `${formData.city}, ${formData.country}`,
            detail: 'Direct courier signature upon delivery.',
            completed: false
          }
        ]
      };

      const order: Order = {
        id: `ord-${Date.now()}`,
        orderNumber: newOrderNumber,
        date: new Date().toISOString().split('T')[0],
        customer: { ...formData },
        items: [...items],
        subtotal,
        shippingFee: shippingCost,
        shippingMethod,
        discount: discountAmount,
        tax,
        total: grandTotal,
        paymentMethod: {
          type: selectedMethod,
          cardBrand: selectedMethod === 'credit_card' ? 'Visa' : undefined,
          last4: selectedMethod === 'credit_card' ? cardData.number.slice(-4) || '4242' : undefined
        },
        paymentStatus: 'Paid',
        tracking: newTracking
      };

      setCompletedOrder(order);
      onOrderPlaced(order);
      setStep('success');
    }, 2600);
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div 
        id="checkout-modal-container"
        className="bg-white w-full max-w-4xl shadow-2xl border border-stone-300 relative overflow-hidden"
      >
        {/* Header */}
        <div className="bg-stone-900 text-white p-4 sm:p-6 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Lock className="w-5 h-5 text-amber-400" />
            <div>
              <span className="text-[10px] tracking-widest text-amber-400 uppercase font-bold">
                Encrypted Checkout
              </span>
              <h2 className="font-['Playfair_Display',serif] text-lg sm:text-xl font-bold">
                Vanguard Atelier Payment Processing
              </h2>
            </div>
          </div>
          {step !== 'processing' && (
            <button
              id="close-checkout-btn"
              onClick={onClose}
              className="text-stone-400 hover:text-white transition"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Step Content */}
        {step === 'processing' && (
          <div className="py-20 px-6 text-center space-y-6">
            <Loader2 className="w-12 h-12 text-amber-600 animate-spin mx-auto" />
            <div className="space-y-2 max-w-md mx-auto">
              <h3 className="font-['Playfair_Display',serif] text-xl font-bold text-stone-900">
                Processing Your Sartorial Order
              </h3>
              <p className="text-xs text-stone-600 animate-pulse font-medium">
                {processingStage}
              </p>
            </div>
            <div className="flex items-center justify-center gap-2 text-[11px] text-stone-600">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>PCI-DSS Level 1 Compliant Transaction</span>
            </div>
          </div>
        )}

        {step === 'success' && completedOrder && (
          <div className="p-6 sm:p-10 space-y-6 text-center">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-600 shadow-sm">
              <PackageCheck className="w-10 h-10" />
            </div>

            <div className="space-y-1">
              <span className="text-xs tracking-widest uppercase font-bold text-amber-600">
                Payment Authorized & Order Confirmed
              </span>
              <h3 className="font-['Playfair_Display',serif] text-2xl sm:text-3xl font-bold text-stone-900">
                Order #{completedOrder.orderNumber}
              </h3>
              <p className="text-xs text-stone-600 max-w-md mx-auto">
                Thank you, {completedOrder.customer.name}. A confirmation receipt has been dispatched to{' '}
                <strong>{completedOrder.customer.email}</strong>.
              </p>
            </div>

            {/* Tracking Badge */}
            <div className="bg-stone-50 border border-stone-200 p-5 max-w-xl mx-auto text-left space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-200 pb-3">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-stone-600 block font-medium">
                    Live Carrier Tracking Number
                  </span>
                  <span className="text-sm font-mono font-bold text-stone-900">
                    {completedOrder.tracking.trackingNumber}
                  </span>
                </div>
                <span className="text-xs font-bold text-amber-800 bg-amber-50 px-2.5 py-1 border border-amber-200 inline-block self-start sm:self-center">
                  {completedOrder.tracking.carrier}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs text-stone-600">
                <div>
                  <span className="text-stone-600 block font-medium">Destination:</span>
                  <strong className="text-stone-800">{completedOrder.customer.city}, {completedOrder.customer.country}</strong>
                </div>
                <div>
                  <span className="text-stone-600 block font-medium">Estimated Delivery:</span>
                  <strong className="text-stone-800">{completedOrder.tracking.estimatedDelivery}</strong>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                id="view-live-tracking-btn"
                onClick={() => {
                  onClose();
                  onTrackOrder(completedOrder.tracking.trackingNumber);
                }}
                className="w-full sm:w-auto px-6 py-3 bg-stone-900 hover:bg-amber-600 text-white text-xs font-bold tracking-widest uppercase transition flex items-center justify-center gap-2"
              >
                <Truck className="w-4 h-4 text-amber-400" />
                <span>Track Live Delivery Now</span>
              </button>
              <button
                onClick={onClose}
                className="w-full sm:w-auto px-6 py-3 border border-stone-300 hover:border-stone-900 text-xs font-bold tracking-widest uppercase transition"
              >
                Continue Browsing
              </button>
            </div>
          </div>
        )}

        {(step === 'details' || step === 'payment') && (
          <div className="grid grid-cols-1 lg:grid-cols-12 max-h-[82vh] overflow-y-auto">
            {/* Left: Input Form */}
            <div className="lg:col-span-7 p-5 sm:p-8 space-y-6 border-b lg:border-b-0 lg:border-r border-stone-200">
              {/* Step Navigator */}
              <div className="flex items-center space-x-3 text-xs font-bold">
                <button
                  onClick={() => setStep('details')}
                  className={`pb-1 border-b-2 transition ${
                    step === 'details' ? 'border-stone-900 text-stone-900' : 'border-transparent text-stone-400'
                  }`}
                >
                  1. Shipping & Contact
                </button>
                <span className="text-stone-300">/</span>
                <button
                  onClick={() => setStep('payment')}
                  className={`pb-1 border-b-2 transition ${
                    step === 'payment' ? 'border-stone-900 text-stone-900' : 'border-transparent text-stone-400'
                  }`}
                >
                  2. Payment & Billing
                </button>
              </div>

              {step === 'details' && (
                <div className="space-y-4">
                  <h3 className="font-['Playfair_Display',serif] text-base font-bold text-stone-900">
                    Recipient Information
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">Full Name</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full text-xs p-2.5 border border-stone-300 focus:outline-none focus:border-stone-900"
                        placeholder="e.g. Lord Sterling"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">Email Address</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full text-xs p-2.5 border border-stone-300 focus:outline-none focus:border-stone-900"
                        placeholder="recipient@domain.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">Street Address</label>
                    <input
                      type="text"
                      required
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="w-full text-xs p-2.5 border border-stone-300 focus:outline-none focus:border-stone-900"
                      placeholder="123 Savile Row, Penthouse 4B"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">City</label>
                      <input
                        type="text"
                        required
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="w-full text-xs p-2.5 border border-stone-300 focus:outline-none focus:border-stone-900"
                        placeholder="London / NYC"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">Postal Code</label>
                      <input
                        type="text"
                        required
                        value={formData.postalCode}
                        onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                        className="w-full text-xs p-2.5 border border-stone-300 focus:outline-none focus:border-stone-900"
                        placeholder="10001"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">Country</label>
                      <select
                        value={formData.country}
                        onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                        className="w-full text-xs p-2.5 border border-stone-300 focus:outline-none focus:border-stone-900 bg-white"
                      >
                        <option value="United States">United States</option>
                        <option value="United Kingdom">United Kingdom</option>
                        <option value="Canada">Canada</option>
                        <option value="Germany">Germany</option>
                        <option value="France">France</option>
                        <option value="Italy">Italy</option>
                        <option value="Japan">Japan</option>
                      </select>
                    </div>
                  </div>

                  {/* Shipping Method Options */}
                  <div className="pt-3">
                    <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider mb-2">
                      Dispatch Speed & Courier
                    </h4>
                    <div className="space-y-2">
                      {[
                        {
                          id: 'Standard Delivery' as const,
                          title: 'Standard International Courier (4-6 Days)',
                          price: subtotal >= 250 ? 'FREE' : '$15.00',
                          carrier: 'DHL Global'
                        },
                        {
                          id: 'Express Air' as const,
                          title: 'FedEx Priority Overnight Air (1-2 Days)',
                          price: subtotal >= 250 ? 'FREE' : '$25.00',
                          carrier: 'FedEx Priority Air'
                        },
                        {
                          id: 'White Glove Priority' as const,
                          title: 'White Glove Garment Bag Courier (Next Morning)',
                          price: '$45.00',
                          carrier: 'UPS Dedicated VIP'
                        }
                      ].map((opt) => (
                        <label
                          key={opt.id}
                          className={`flex items-center justify-between p-3 border cursor-pointer transition ${
                            shippingMethod === opt.id
                              ? 'border-stone-900 bg-stone-50 font-medium'
                              : 'border-stone-200 hover:border-stone-300'
                          }`}
                        >
                          <div className="flex items-center space-x-3">
                            <input
                              type="radio"
                              name="shipping"
                              checked={shippingMethod === opt.id}
                              onChange={() => setShippingMethod(opt.id)}
                              className="text-stone-900 focus:ring-0"
                            />
                            <div>
                              <span className="text-xs font-semibold text-stone-900 block">{opt.title}</span>
                              <span className="text-[11px] text-stone-600 font-medium">{opt.carrier}</span>
                            </div>
                          </div>
                          <span className="text-xs font-bold text-stone-900">{opt.price}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      if (!formData.name || !formData.email || !formData.address) {
                        alert('Please fill in your name, email, and address before proceeding.');
                        return;
                      }
                      setStep('payment');
                    }}
                    className="w-full mt-4 py-3 bg-stone-950 hover:bg-stone-800 text-white text-xs font-bold tracking-widest uppercase transition flex items-center justify-center gap-2"
                  >
                    <span>Continue to Payment</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}

              {step === 'payment' && (
                <div className="space-y-5">
                  <h3 className="font-['Playfair_Display',serif] text-base font-bold text-stone-900">
                    Payment Gateway Selection
                  </h3>

                  {/* 1-Click Express Buttons */}
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      id="express-apple-pay-btn"
                      onClick={() => handleProcessPayment('apple_pay')}
                      className="py-3 px-4 bg-black text-white hover:bg-stone-800 text-xs font-semibold flex items-center justify-center gap-2 transition"
                    >
                      <span>Pay</span>
                      <span className="text-[11px] opacity-80">Instant Pay</span>
                    </button>
                    <button
                      type="button"
                      id="express-google-pay-btn"
                      onClick={() => handleProcessPayment('google_pay')}
                      className="py-3 px-4 bg-white border border-stone-300 hover:border-stone-900 text-xs font-semibold flex items-center justify-center gap-2 transition"
                    >
                      <span className="text-blue-600 font-bold">G</span>
                      <span className="text-stone-800">Pay</span>
                      <span className="text-[11px] text-stone-500">1-Click</span>
                    </button>
                  </div>

                  <div className="relative flex py-1 items-center">
                    <div className="flex-grow border-t border-stone-200"></div>
                    <span className="flex-shrink mx-3 text-[11px] text-stone-600 uppercase tracking-widest font-medium">
                      Or Credit / Debit Card
                    </span>
                    <div className="flex-grow border-t border-stone-200"></div>
                  </div>

                  {/* Card Form */}
                  <div className="space-y-3 bg-stone-50 p-4 border border-stone-200">
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <label className="text-xs font-semibold text-stone-700">Card Number</label>
                        <div className="flex space-x-1.5 text-[10px] text-stone-600 font-medium">
                          <span>Visa</span>
                          <span>•</span>
                          <span>MC</span>
                          <span>•</span>
                          <span>Amex</span>
                        </div>
                      </div>
                      <div className="relative">
                        <input
                          type="text"
                          required
                          value={cardData.number}
                          onChange={handleCardNumberChange}
                          placeholder="4242 4242 4242 4242"
                          className="w-full text-xs p-2.5 pl-9 border border-stone-300 bg-white font-mono tracking-wider focus:outline-none focus:border-stone-900"
                        />
                        <CreditCard className="w-4 h-4 text-stone-400 absolute left-2.5 top-3" />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-stone-700 mb-1">Expiration</label>
                        <input
                          type="text"
                          required
                          value={cardData.expiry}
                          onChange={(e) => setCardData({ ...cardData, expiry: e.target.value })}
                          placeholder="MM/YY"
                          className="w-full text-xs p-2.5 border border-stone-300 bg-white font-mono focus:outline-none focus:border-stone-900"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-stone-700 mb-1">Security Code (CVV)</label>
                        <input
                          type="password"
                          required
                          maxLength={4}
                          value={cardData.cvv}
                          onChange={(e) => setCardData({ ...cardData, cvv: e.target.value })}
                          placeholder="842"
                          className="w-full text-xs p-2.5 border border-stone-300 bg-white font-mono focus:outline-none focus:border-stone-900"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">Name on Card</label>
                      <input
                        type="text"
                        required
                        value={cardData.name}
                        onChange={(e) => setCardData({ ...cardData, name: e.target.value })}
                        placeholder="Alexander Wright"
                        className="w-full text-xs p-2.5 border border-stone-300 bg-white focus:outline-none focus:border-stone-900"
                      />
                    </div>
                  </div>

                  <div className="flex gap-2 items-center text-[11px] text-stone-500">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span>Your transaction is secured with end-to-end TLS 1.3 tokenization.</span>
                  </div>

                  <div className="flex space-x-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setStep('details')}
                      className="px-4 py-3 border border-stone-300 text-xs font-semibold hover:border-stone-900"
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      id="pay-and-place-order-btn"
                      onClick={() => handleProcessPayment('credit_card')}
                      className="flex-1 py-3.5 bg-stone-950 hover:bg-amber-600 text-white text-xs font-bold tracking-widest uppercase transition flex items-center justify-center gap-2 shadow"
                    >
                      <Lock className="w-3.5 h-3.5" />
                      <span>Authorize Payment (${grandTotal.toFixed(2)})</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Right: Order Summary */}
            <div className="lg:col-span-5 p-5 sm:p-8 bg-stone-50 space-y-4">
              <h3 className="font-['Playfair_Display',serif] text-base font-bold text-stone-900 border-b border-stone-200 pb-2">
                Order Summary ({items.length} items)
              </h3>

              <div className="max-h-56 overflow-y-auto divide-y divide-stone-200 pr-1">
                {items.map((item, idx) => (
                  <div key={idx} className="py-2.5 flex items-center justify-between text-xs">
                    <div className="flex items-center space-x-3">
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-12 h-14 object-cover border border-stone-200"
                      />
                      <div>
                        <span className="font-semibold text-stone-900 block line-clamp-1">
                          {item.product.name}
                        </span>
                        <span className="text-stone-500 text-[11px]">
                          Qty: {item.quantity} • {item.size} • {item.color.name}
                        </span>
                      </div>
                    </div>
                    <span className="font-bold text-stone-900">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t border-stone-200 pt-3 space-y-1.5 text-xs text-stone-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-stone-900">${subtotal.toFixed(2)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-medium">
                    <span>Discount Code Applied</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Shipping ({shippingMethod})</span>
                  <span>{shippingCost === 0 ? <strong className="text-emerald-700">FREE</strong> : `$${shippingCost.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-base font-bold text-stone-950 border-t border-stone-200 pt-3">
                  <span>Total Amount</span>
                  <span>${grandTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
