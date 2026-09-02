import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Clock,
  CheckCircle2,
  ChefHat,
  Bike,
  Utensils,
  MapPin,
  Phone,
  MessageSquare,
  Receipt,
  FileText,
  AlertTriangle,
  RotateCcw,
  Sparkles,
  ShieldCheck,
  CreditCard,
  Check,
  ChevronRight
} from 'lucide-react';
import { OrderStatus } from '../types';

export const OrderTrackerView: React.FC = () => {
  const {
    orders,
    activeOrder,
    setActiveOrderId,
    updateOrderStatus,
    cancelOrder,
    setActiveTab,
    currentRestaurant
  } = useApp();

  const [simulatedCallModal, setSimulatedCallModal] = useState<string | null>(null);

  if (!activeOrder) {
    return (
      <div className="py-20 text-center rounded-3xl bg-neutral-900/40 border border-neutral-800 p-8 space-y-4 animate-in fade-in">
        <div className="w-16 h-16 rounded-2xl bg-neutral-800/80 flex items-center justify-center text-amber-400 mx-auto">
          <Utensils className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold text-neutral-100 font-serif-display">
          No Active Orders Tracked
        </h2>
        <p className="text-xs text-neutral-400 max-w-sm mx-auto">
          Browse the menu and place a dining or delivery order to experience real-time kitchen tracking.
        </p>
        <button
          onClick={() => setActiveTab('menu')}
          className="px-5 py-2.5 rounded-xl bg-amber-500 text-neutral-950 font-bold text-xs hover:bg-amber-400 transition-colors shadow-lg shadow-amber-500/20"
        >
          Browse Menu
        </button>
      </div>
    );
  }

  const steps: { key: OrderStatus; label: string; desc: string; icon: any }[] = [
    { key: 'placed', label: 'Order Placed', desc: 'Received & routed to POS', icon: FileText },
    { key: 'confirmed', label: 'Kitchen Confirmed', desc: 'Accepted by Executive Chef', icon: CheckCircle2 },
    { key: 'preparing', label: 'Cooking & Plating', desc: 'Handcrafted with fresh ingredients', icon: ChefHat },
    {
      key: activeOrder.orderType === 'delivery' ? 'out_for_delivery' : 'ready_for_pickup',
      label: activeOrder.orderType === 'delivery' ? 'Out for Delivery' : 'Ready for Table',
      desc: activeOrder.orderType === 'delivery' ? 'Courier en route with thermal bag' : 'Plated & ready to serve',
      icon: activeOrder.orderType === 'delivery' ? Bike : Utensils
    },
    { key: 'completed', label: 'Served / Delivered', desc: 'Enjoy your culinary experience!', icon: Sparkles }
  ];

  const getStepIndex = (status: OrderStatus) => {
    switch (status) {
      case 'placed':
        return 0;
      case 'confirmed':
        return 1;
      case 'preparing':
        return 2;
      case 'out_for_delivery':
      case 'ready_for_pickup':
        return 3;
      case 'completed':
        return 4;
      default:
        return 0;
    }
  };

  const currentStepIdx = getStepIndex(activeOrder.status);

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Top Header with Order Switcher if multiple */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-bold text-neutral-100 font-serif-display">
              Live Order Tracker
            </h1>
            <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-400 text-xs font-bold border border-amber-500/40 animate-pulse">
              LIVE
            </span>
          </div>
          <p className="text-xs text-neutral-400 mt-1">
            Tracking order <span className="text-neutral-200 font-mono font-bold">{activeOrder.orderNumber}</span> at {activeOrder.restaurantName}
          </p>
        </div>

        {/* Other Orders Dropdown */}
        {orders.length > 1 && (
          <div className="flex items-center gap-2">
            <span className="text-xs text-neutral-400">Order History:</span>
            <select
              value={activeOrder.id}
              onChange={e => setActiveOrderId(e.target.value)}
              className="px-3 py-1.5 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-200 text-xs focus:outline-none focus:border-amber-500"
            >
              {orders.map(o => (
                <option key={o.id} value={o.id}>
                  {o.orderNumber} ({o.status.toUpperCase()}) - ${o.total.toFixed(2)}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Main Grid: Left Status + Map Simulation | Right Receipt */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left 7 Cols: Progress Stepper & Live Map/Simulation */}
        <div className="lg:col-span-7 space-y-6">
          {/* Estimated Arrival / Status Card */}
          <div className="p-6 rounded-3xl bg-neutral-900/90 border border-neutral-800 shadow-xl space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider">
                  Estimated Timing
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-amber-400 font-serif-display mt-0.5">
                  {activeOrder.status === 'completed'
                    ? 'Delivered & Completed ✨'
                    : `${activeOrder.estimatedDeliveryMinutes} Minutes Remaining`}
                </h2>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                <Clock className="w-6 h-6 animate-spin" style={{ animationDuration: '8s' }} />
              </div>
            </div>

            {/* Stepper */}
            <div className="space-y-4 pt-2">
              {steps.map((step, idx) => {
                const Icon = step.icon;
                const isPassed = idx <= currentStepIdx;
                const isCurrent = idx === currentStepIdx;

                return (
                  <div key={step.key} className="flex items-start gap-4 relative">
                    {/* Vertical connecting line */}
                    {idx < steps.length - 1 && (
                      <div
                        className={`absolute left-5 top-10 w-0.5 h-10 transition-colors ${
                          idx < currentStepIdx ? 'bg-amber-500' : 'bg-neutral-800'
                        }`}
                      />
                    )}

                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border transition-all z-10 ${
                        isCurrent
                          ? 'bg-amber-500 text-neutral-950 border-amber-400 shadow-lg shadow-amber-500/30 ring-4 ring-amber-500/20'
                          : isPassed
                          ? 'bg-amber-500/20 text-amber-400 border-amber-500/50'
                          : 'bg-neutral-800/80 text-neutral-600 border-neutral-800'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>

                    <div className="flex-1 pb-4">
                      <div className="flex items-center justify-between">
                        <h4
                          className={`text-xs font-bold ${
                            isCurrent
                              ? 'text-amber-300'
                              : isPassed
                              ? 'text-neutral-100'
                              : 'text-neutral-500'
                          }`}
                        >
                          {step.label}
                        </h4>
                        {activeOrder.statusTimestamps[step.key as keyof typeof activeOrder.statusTimestamps] && (
                          <span className="text-[10px] text-neutral-400 font-mono">
                            {activeOrder.statusTimestamps[step.key as keyof typeof activeOrder.statusTimestamps]}
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-neutral-400 mt-0.5">{step.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Interactive Live Map / Courier Radar Simulation */}
          <div className="p-6 rounded-3xl bg-neutral-900 border border-neutral-800 relative overflow-hidden space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-neutral-200 uppercase tracking-wider flex items-center gap-2">
                <MapPin className="w-4 h-4 text-amber-400" /> Live Delivery Route Radar
              </h3>
              <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/30 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" /> GPS Active
              </span>
            </div>

            {/* Radar Canvas Graphics */}
            <div className="relative h-48 sm:h-56 w-full rounded-2xl bg-neutral-950 border border-neutral-800 overflow-hidden flex items-center justify-center p-4">
              {/* Map grid lines */}
              <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#amber_1px,transparent_1px)] [background-size:16px_16px]" />

              {/* Restaurant Node */}
              <div className="absolute top-8 left-12 text-center">
                <div className="w-9 h-9 rounded-full bg-amber-500 text-neutral-950 font-bold flex items-center justify-center shadow-lg shadow-amber-500/30 ring-2 ring-amber-400/50">
                  <ChefHat className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-bold text-neutral-300 mt-1 block">
                  Kitchen
                </span>
              </div>

              {/* Route Connecting Dashed Path */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                <path
                  d="M 80 45 Q 180 80 320 140"
                  fill="none"
                  stroke="#f59e0b"
                  strokeWidth="2"
                  strokeDasharray="4,4"
                  className="animate-pulse"
                />
              </svg>

              {/* Moving Courier / Driver */}
              <div className="absolute top-20 left-1/2 -translate-x-1/2 text-center animate-bounce duration-1000">
                <div className="w-9 h-9 rounded-full bg-neutral-100 text-neutral-950 flex items-center justify-center shadow-2xl ring-4 ring-amber-500/30">
                  <Bike className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-bold text-amber-400 mt-1 block">
                  Matteo (Vespa)
                </span>
              </div>

              {/* Customer Destination Node */}
              <div className="absolute bottom-6 right-12 text-center">
                <div className="w-9 h-9 rounded-full bg-emerald-500 text-neutral-950 font-bold flex items-center justify-center shadow-lg shadow-emerald-500/30">
                  <MapPin className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-bold text-neutral-300 mt-1 block">
                  {activeOrder.orderType === 'delivery' ? 'Your Address' : 'Dining Table'}
                </span>
              </div>
            </div>

            {/* Courier Profile & Contact Card */}
            {activeOrder.liveDriver && (
              <div className="p-4 rounded-2xl bg-neutral-800/60 border border-neutral-750 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-neutral-700 flex items-center justify-center text-sm font-bold text-amber-400">
                    MV
                  </div>
                  <div>
                    <div className="text-xs font-bold text-neutral-100">
                      {activeOrder.liveDriver.name} • ⭐ {activeOrder.liveDriver.rating}
                    </div>
                    <div className="text-[11px] text-neutral-400">
                      {activeOrder.liveDriver.vehicle}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setSimulatedCallModal(`Calling ${activeOrder.liveDriver?.name} at ${activeOrder.liveDriver?.phone}...`)}
                    className="p-2 rounded-xl bg-neutral-700 hover:bg-neutral-600 text-neutral-200 transition-colors"
                    title="Call Courier"
                  >
                    <Phone className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setSimulatedCallModal(`Connecting live messaging with ${activeOrder.liveDriver?.name}...`)}
                    className="p-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 transition-colors"
                    title="Message Courier"
                  >
                    <MessageSquare className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right 5 Cols: Receipt & Financial Itemization */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 sm:p-7 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
              <div className="flex items-center gap-2">
                <Receipt className="w-5 h-5 text-amber-400" />
                <h3 className="text-sm font-bold text-neutral-100 font-serif-display">
                  Order Invoice Breakdown
                </h3>
              </div>
              <span className="text-xs font-mono text-neutral-400">{activeOrder.orderNumber}</span>
            </div>

            {/* Line items list */}
            <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
              {activeOrder.items.map((item, idx) => (
                <div key={idx} className="flex justify-between items-start text-xs">
                  <div className="space-y-0.5 max-w-[70%]">
                    <div className="font-semibold text-neutral-200">
                      {item.quantity}x {item.menuItem.name}
                    </div>
                    {item.selectedOptions && item.selectedOptions.length > 0 && (
                      <div className="text-[10px] text-neutral-400">
                        {item.selectedOptions.map(o => o.optionName).join(', ')}
                      </div>
                    )}
                    {item.specialInstructions && (
                      <div className="text-[10px] text-amber-400/80 italic">
                        Note: {item.specialInstructions}
                      </div>
                    )}
                  </div>
                  <span className="font-bold text-neutral-100 font-serif-display">
                    ${(item.itemPrice * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            {/* Totals Calculation */}
            <div className="space-y-2 pt-3 border-t border-neutral-800 text-xs">
              <div className="flex justify-between text-neutral-400">
                <span>Subtotal:</span>
                <span>${activeOrder.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-neutral-400">
                <span>Tax & Municipal Fees (8.875%):</span>
                <span>${activeOrder.tax.toFixed(2)}</span>
              </div>
              {activeOrder.deliveryFee > 0 && (
                <div className="flex justify-between text-neutral-400">
                  <span>Express White-Glove Delivery:</span>
                  <span>${activeOrder.deliveryFee.toFixed(2)}</span>
                </div>
              )}
              {activeOrder.tip > 0 && (
                <div className="flex justify-between text-neutral-400">
                  <span>Culinary Staff Gratuity:</span>
                  <span>${activeOrder.tip.toFixed(2)}</span>
                </div>
              )}

              <div className="flex justify-between text-sm font-bold text-neutral-100 pt-2 border-t border-neutral-800">
                <span>Total Amount Paid:</span>
                <span className="text-amber-400 font-serif-display text-base">
                  ${activeOrder.total.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Payment Badge info */}
            <div className="p-3 rounded-xl bg-neutral-800/60 border border-neutral-750 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-amber-400" />
                <span className="capitalize font-medium text-neutral-200">
                  {activeOrder.paymentMethod.replace('_', ' ')}
                </span>
              </div>
              <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">
                PAID & SECURED
              </span>
            </div>

            {/* Delivery address / Dining type */}
            <div className="text-xs text-neutral-400 space-y-1">
              <div className="flex items-center gap-1.5 text-neutral-300 font-medium">
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                <span>
                  {activeOrder.orderType === 'delivery'
                    ? activeOrder.deliveryAddress
                    : `Dine-in at Table ${activeOrder.tableNumber || 'Assigned'}`}
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-2 pt-2">
              <button
                onClick={() => window.print()}
                className="w-full py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-750 text-neutral-200 text-xs font-semibold flex items-center justify-center gap-2 transition-colors border border-neutral-700/60"
              >
                <FileText className="w-3.5 h-3.5" /> Download / Print Official Invoice
              </button>

              {activeOrder.status === 'placed' && (
                <button
                  onClick={() => cancelOrder(activeOrder.id)}
                  className="w-full py-2 rounded-xl text-rose-400 hover:bg-rose-500/10 text-xs font-medium transition-colors"
                >
                  Cancel Order (Instant Refund)
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Simulated Call Modal */}
      {simulatedCallModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-3xl max-w-sm w-full text-center space-y-4 shadow-2xl">
            <div className="w-12 h-12 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center mx-auto animate-pulse">
              <Phone className="w-6 h-6" />
            </div>
            <h4 className="text-sm font-bold text-neutral-100">{simulatedCallModal}</h4>
            <p className="text-xs text-neutral-400">Secure proxy calling line established.</p>
            <button
              onClick={() => setSimulatedCallModal(null)}
              className="w-full py-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs rounded-xl font-bold"
            >
              End Call
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
