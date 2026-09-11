import React, { useState } from 'react';
import { 
  X, 
  Truck, 
  Search, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  Package, 
  RefreshCw, 
  ExternalLink,
  ShieldCheck,
  Plane,
  Home,
  Bell
} from 'lucide-react';
import { Order, TrackingInfo, TrackingCheckpoint } from '../types';

interface ShippingTrackerModalProps {
  isOpen: boolean;
  onClose: () => void;
  orders: Order[];
  initialTrackingNumber?: string;
  onSimulateAdvanceTracking: (trackingNumber: string) => void;
}

export const ShippingTrackerModal: React.FC<ShippingTrackerModalProps> = ({
  isOpen,
  onClose,
  orders,
  initialTrackingNumber,
  onSimulateAdvanceTracking
}) => {
  const [searchInput, setSearchInput] = useState(initialTrackingNumber || '');
  const [activeTrackingNumber, setActiveTrackingNumber] = useState<string>(
    initialTrackingNumber || orders[0]?.tracking.trackingNumber || ''
  );
  const [subscribedAlerts, setSubscribedAlerts] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  if (!isOpen) return null;

  // Find corresponding order by tracking number or order number
  const matchedOrder = orders.find(
    (o) => 
      o.tracking.trackingNumber.toLowerCase() === activeTrackingNumber.toLowerCase() ||
      o.orderNumber.toLowerCase() === activeTrackingNumber.toLowerCase() ||
      o.id.toLowerCase() === activeTrackingNumber.toLowerCase()
  ) || orders[0];

  const tracking: TrackingInfo = matchedOrder?.tracking;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchInput.trim()) return;
    setActiveTrackingNumber(searchInput.trim());
  };

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 600);
  };

  const handleAdvanceSimulation = () => {
    if (!tracking) return;
    onSimulateAdvanceTracking(tracking.trackingNumber);
  };

  // Steps definition
  const STEPS = [
    { label: 'Order Placed', icon: Package },
    { label: 'Tailored & Packed', icon: CheckCircle2 },
    { label: 'Export Dispatched', icon: Plane },
    { label: 'In Transit', icon: Truck },
    { label: 'Delivered', icon: Home }
  ];

  return (
    <div className="fixed inset-0 z-50 bg-stone-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div 
        id="shipping-tracker-modal"
        className="bg-white w-full max-w-4xl shadow-2xl border border-stone-300 relative overflow-hidden my-auto"
      >
        {/* Header */}
        <div className="bg-stone-900 text-white p-4 sm:p-5 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Truck className="w-5 h-5 text-amber-400" />
            <div>
              <span className="text-[10px] tracking-widest text-amber-400 uppercase font-bold">
                Real-Time Worldwide Logistics
              </span>
              <h2 className="font-['Playfair_Display',serif] text-lg sm:text-xl font-bold">
                Live Shipment & Delivery Tracker
              </h2>
            </div>
          </div>
          <button
            id="close-tracker-btn"
            onClick={onClose}
            className="text-stone-400 hover:text-white transition"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Bar & Order Switcher */}
        <div className="p-4 bg-stone-100 border-b border-stone-200">
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Enter Tracking Number (e.g. FDX-79482910381) or Order # (e.g. VG-89410)"
                className="w-full text-xs pl-9 pr-3 py-2.5 bg-white border border-stone-300 focus:outline-none focus:border-stone-900 uppercase tracking-wider font-mono"
              />
            </div>
            <button
              type="submit"
              className="px-5 py-2.5 bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold tracking-wider uppercase transition"
            >
              Track Shipment
            </button>
          </form>

          {/* Quick Order Pills */}
          <div className="flex items-center space-x-2 mt-3 overflow-x-auto text-xs pb-1">
            <span className="text-stone-500 text-[11px] whitespace-nowrap">Your Orders:</span>
            {orders.map((ord) => (
              <button
                key={ord.id}
                onClick={() => {
                  setActiveTrackingNumber(ord.tracking.trackingNumber);
                  setSearchInput(ord.tracking.trackingNumber);
                }}
                className={`px-2.5 py-1 text-[11px] font-mono border whitespace-nowrap transition ${
                  activeTrackingNumber === ord.tracking.trackingNumber || activeTrackingNumber === ord.orderNumber
                    ? 'bg-stone-900 text-white font-bold border-stone-900'
                    : 'bg-white text-stone-700 border-stone-300 hover:border-stone-500'
                }`}
              >
                {ord.orderNumber} ({ord.tracking.status})
              </button>
            ))}
          </div>
        </div>

        {tracking ? (
          <div className="p-5 sm:p-8 space-y-6 max-h-[75vh] overflow-y-auto">
            {/* Status Summary Banner */}
            <div className="bg-stone-50 border border-stone-200 p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center space-x-2">
                  <span className="text-[10px] tracking-widest uppercase font-bold text-amber-700 bg-amber-100 px-2 py-0.5">
                    {tracking.carrier}
                  </span>
                  <span className="text-xs text-stone-500 font-mono">
                    {tracking.trackingNumber}
                  </span>
                </div>
                <h3 className="font-['Playfair_Display',serif] text-2xl font-bold text-stone-900 mt-1">
                  Status: {tracking.status}
                </h3>
                <p className="text-xs text-stone-600 mt-0.5">
                  Estimated Handover: <strong className="text-stone-900">{tracking.estimatedDelivery}</strong>
                </p>
              </div>

              <div className="flex items-center space-x-3 w-full md:w-auto">
                <button
                  onClick={handleRefresh}
                  className="px-3 py-2 bg-white border border-stone-300 hover:border-stone-900 text-xs font-semibold text-stone-700 flex items-center gap-1.5 transition"
                  title="Refresh status"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin' : ''}`} />
                  <span>Refresh</span>
                </button>

                <button
                  id="simulate-next-event-btn"
                  onClick={handleAdvanceSimulation}
                  className="flex-1 md:flex-initial px-4 py-2 bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-bold tracking-wider uppercase transition flex items-center gap-1.5 shadow"
                  title="Simulate next live transit checkpoint"
                >
                  <Clock className="w-3.5 h-3.5" />
                  <span>Simulate Next Event</span>
                </button>
              </div>
            </div>

            {/* Visual Milestones Progress Step Bar */}
            <div className="py-4">
              <div className="relative">
                {/* Horizontal progress background line */}
                <div className="hidden sm:block absolute top-1/2 left-6 right-6 -translate-y-1/2 h-1 bg-stone-200 -z-0" />
                <div 
                  className="hidden sm:block absolute top-1/2 left-6 -translate-y-1/2 h-1 bg-amber-600 transition-all duration-700 -z-0" 
                  style={{ width: `${Math.min(100, Math.max(0, (tracking.currentStep / (STEPS.length - 1)) * 100))}%` }}
                />

                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 sm:gap-0 relative z-10">
                  {STEPS.map((stepItem, idx) => {
                    const isPassed = idx <= tracking.currentStep;
                    const isCurrent = idx === tracking.currentStep;
                    const StepIcon = stepItem.icon;

                    return (
                      <div key={idx} className="flex flex-col items-center text-center">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-500 ${
                            isCurrent
                              ? 'bg-amber-500 border-amber-600 text-stone-950 scale-110 shadow-lg ring-4 ring-amber-200'
                              : isPassed
                              ? 'bg-stone-900 border-stone-900 text-white'
                              : 'bg-white border-stone-300 text-stone-400'
                          }`}
                        >
                          <StepIcon className="w-4 h-4" />
                        </div>
                        <span className={`text-[11px] mt-2 font-semibold tracking-wide ${
                          isCurrent ? 'text-amber-700 font-bold' : isPassed ? 'text-stone-900' : 'text-stone-400'
                        }`}>
                          {stepItem.label}
                        </span>
                        {isCurrent && (
                          <span className="text-[9px] uppercase tracking-wider text-amber-600 font-bold animate-pulse">
                            Active Stage
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Route Details Box */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-stone-50 p-4 border border-stone-200 text-xs">
              <div className="space-y-1">
                <span className="text-stone-600 uppercase tracking-wider font-semibold text-[10px] block">
                  Origin Fulfillment Facility
                </span>
                <p className="font-semibold text-stone-900 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-stone-700" />
                  {tracking.origin}
                </p>
                <span className="text-stone-600 text-[11px] block font-medium">Service: {tracking.serviceType}</span>
              </div>
              <div className="space-y-1">
                <span className="text-stone-600 uppercase tracking-wider font-semibold text-[10px] block">
                  Destination Delivery Address
                </span>
                <p className="font-semibold text-stone-900 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-amber-700" />
                  {tracking.destination}
                </p>
                <span className="text-stone-600 text-[11px] block font-medium">Recipient: {matchedOrder.customer.name}</span>
              </div>
            </div>

            {/* Timestamped Checkpoints Timeline */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-['Playfair_Display',serif] text-base font-bold text-stone-900">
                  Real-Time Checkpoint Logs
                </h4>
                <span className="text-[11px] text-stone-600 font-medium">
                  Last Updated: {tracking.lastUpdated}
                </span>
              </div>

              <div className="border-l-2 border-stone-200 pl-4 space-y-4 ml-2">
                {tracking.checkpoints.map((cp, idx) => (
                  <div key={idx} className="relative group">
                    {/* Dot on line */}
                    <div
                      className={`absolute -left-[23px] top-1 w-3.5 h-3.5 rounded-full border-2 ${
                        cp.current
                          ? 'bg-amber-500 border-amber-600 ring-2 ring-amber-200'
                          : cp.completed
                          ? 'bg-stone-900 border-stone-900'
                          : 'bg-stone-200 border-stone-300'
                      }`}
                    />

                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                      <div className="flex items-center space-x-2">
                        <span className={`text-xs font-bold ${cp.current ? 'text-amber-800' : 'text-stone-900'}`}>
                          {cp.status}
                        </span>
                        {cp.current && (
                          <span className="text-[9px] bg-amber-100 text-amber-800 px-1.5 py-0.2 uppercase font-bold tracking-wider">
                            Current Milestone
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] text-stone-600 font-mono font-medium">{cp.time}</span>
                    </div>

                    <p className="text-xs text-stone-600 font-medium mt-0.5">{cp.location}</p>
                    <p className="text-xs text-stone-500 mt-1 leading-relaxed">{cp.detail}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* SMS / Email notifications banner */}
            <div className="bg-stone-900 text-stone-200 p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center space-x-3 text-xs">
                <Bell className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span>Receive instant SMS & Email delivery push updates when driver is approaching</span>
              </div>
              <button
                onClick={() => setSubscribedAlerts(!subscribedAlerts)}
                className={`px-4 py-1.5 text-xs font-bold uppercase tracking-wider transition ${
                  subscribedAlerts
                    ? 'bg-emerald-600 text-white'
                    : 'bg-amber-500 hover:bg-amber-400 text-stone-950'
                }`}
              >
                {subscribedAlerts ? 'Subscribed ✓' : 'Subscribe Free'}
              </button>
            </div>
          </div>
        ) : (
          <div className="p-12 text-center text-stone-500 space-y-3">
            <Package className="w-12 h-12 text-stone-300 mx-auto" />
            <h4 className="font-['Playfair_Display',serif] text-lg font-bold text-stone-800">
              No matching shipment found
            </h4>
            <p className="text-xs text-stone-500 max-w-sm mx-auto">
              Please double check the tracking or order number, or select from your active orders above.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
