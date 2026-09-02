import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  CreditCard,
  Smartphone,
  ShieldCheck,
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  MapPin,
  Utensils,
  Percent,
  CheckCircle2,
  Lock,
  ArrowRight
} from 'lucide-react';
import { PaymentMethod } from '../types';

export const CheckoutModal: React.FC = () => {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    cart,
    updateCartItemQuantity,
    removeFromCart,
    clearCart,
    cartSubtotal,
    placeOrder,
    user,
    currentRestaurant
  } = useApp();

  const [orderType, setOrderType] = useState<'delivery' | 'dine_in' | 'pickup'>('delivery');
  const [tableNumber, setTableNumber] = useState('Table 4');
  const [deliveryAddress, setDeliveryAddress] = useState(
    user?.savedAddresses?.[0]?.address || '120 Spring St, Apt 4B, New York, NY 10012'
  );
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('apple_pay');

  // Card details state
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [cardExpiry, setCardExpiry] = useState('08/28');
  const [cardCvv, setCardCvv] = useState('892');
  const [cardName, setCardName] = useState(user?.name || 'Alexander Wright');

  // UPI state
  const [upiId, setUpiId] = useState('alexander@okaxis');

  // Tip & Promo
  const [tipPercentage, setTipPercentage] = useState<number>(18);
  const [customTip, setCustomTip] = useState<string>('');
  const [promoCode, setPromoCode] = useState('');
  const [appliedDiscountPercent, setAppliedDiscountPercent] = useState<number>(0);
  const [promoMessage, setPromoMessage] = useState<string | null>(null);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  // Calculations
  const discountAmount = useMemo(() => {
    return Number(((cartSubtotal * appliedDiscountPercent) / 100).toFixed(2));
  }, [cartSubtotal, appliedDiscountPercent]);

  const discountedSubtotal = Math.max(0, cartSubtotal - discountAmount);
  const tax = Number((discountedSubtotal * 0.08875).toFixed(2));
  const deliveryFee = orderType === 'delivery' && cartSubtotal > 0 ? 4.99 : 0;

  const tipAmount = useMemo(() => {
    if (customTip && !isNaN(Number(customTip))) {
      return Number(Number(customTip).toFixed(2));
    }
    return Number(((discountedSubtotal * tipPercentage) / 100).toFixed(2));
  }, [discountedSubtotal, tipPercentage, customTip]);

  const finalTotal = Number((discountedSubtotal + tax + deliveryFee + tipAmount).toFixed(2));

  const handleApplyPromo = () => {
    if (promoCode.toUpperCase() === 'NOCTURNE15' || promoCode.toUpperCase() === 'WELCOME15') {
      setAppliedDiscountPercent(15);
      setPromoMessage('15% VIP Gastronomy Discount applied!');
    } else if (promoCode.toUpperCase() === 'CHEF20') {
      setAppliedDiscountPercent(20);
      setPromoMessage("20% Executive Chef's Special discount applied!");
    } else {
      setPromoMessage('Invalid promo code. Try "NOCTURNE15" or "CHEF20".');
    }
  };

  const handleCheckout = () => {
    if (cart.length === 0) return;
    setIsProcessingPayment(true);

    // Simulate fast secure biometric / token payment delay
    setTimeout(() => {
      placeOrder({
        orderType,
        paymentMethod,
        deliveryAddress: orderType === 'delivery' ? deliveryAddress : undefined,
        tableNumber: orderType === 'dine_in' ? tableNumber : undefined,
        tipAmount
      });
      setIsProcessingPayment(false);
    }, 1200);
  };

  if (!isCheckoutOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl max-h-[92vh] bg-neutral-900 border border-neutral-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-neutral-800 flex items-center justify-between bg-neutral-950">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-amber-400" />
            <h2 className="text-base sm:text-lg font-bold text-neutral-100 font-serif-display">
              Dining Order & Secure Checkout
            </h2>
          </div>
          <button
            onClick={() => setIsCheckoutOpen(false)}
            className="p-1.5 rounded-full hover:bg-neutral-800 text-neutral-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <div className="overflow-y-auto flex-1 p-4 sm:p-6 space-y-6">
          {/* Cart Items List */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                1. Your Selected Items ({cart.length})
              </span>
              {cart.length > 0 && (
                <button
                  onClick={clearCart}
                  className="text-xs text-rose-400 hover:underline flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Clear
                </button>
              )}
            </div>

            {cart.length === 0 ? (
              <div className="py-8 text-center rounded-2xl bg-neutral-950/40 border border-neutral-800 p-4 text-xs text-neutral-500">
                Your order cart is currently empty. Browse the menu to add artisanal dishes!
              </div>
            ) : (
              <div className="divide-y divide-neutral-800 border border-neutral-800 rounded-2xl bg-neutral-950/40 overflow-hidden">
                {cart.map(item => (
                  <div key={item.id} className="p-3.5 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <img
                        src={item.menuItem.image}
                        alt={item.menuItem.name}
                        className="w-12 h-12 rounded-xl object-cover shrink-0"
                      />
                      <div className="min-w-0 space-y-0.5">
                        <h4 className="text-xs font-bold text-neutral-200 truncate">
                          {item.menuItem.name}
                        </h4>
                        {item.selectedOptions && item.selectedOptions.length > 0 && (
                          <p className="text-[10px] text-neutral-400 truncate">
                            {item.selectedOptions.map(o => o.optionName).join(', ')}
                          </p>
                        )}
                        <span className="text-xs font-semibold text-neutral-300 font-serif-display block">
                          ${(item.itemPrice * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>

                    {/* Quantity controls */}
                    <div className="flex items-center gap-2 shrink-0">
                      <div className="flex items-center bg-neutral-800 rounded-lg p-0.5">
                        <button
                          onClick={() => updateCartItemQuantity(item.id, -1)}
                          className="p-1 rounded text-neutral-400 hover:text-white"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-6 text-center text-xs font-bold">{item.quantity}</span>
                        <button
                          onClick={() => updateCartItemQuantity(item.id, 1)}
                          className="p-1 rounded text-neutral-400 hover:text-white"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="p-1.5 text-neutral-500 hover:text-rose-400 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {cart.length > 0 && (
            <>
              {/* Order Delivery / Dine-in Type */}
              <div className="space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                  2. Order Experience
                </span>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setOrderType('delivery')}
                    className={`py-2.5 px-2 rounded-xl text-xs font-semibold transition-all flex flex-col items-center gap-1 ${
                      orderType === 'delivery'
                        ? 'bg-amber-500 text-neutral-950 shadow-md font-bold'
                        : 'bg-neutral-800/60 text-neutral-300 border border-neutral-750'
                    }`}
                  >
                    <span>🛵 Delivery</span>
                    <span className="text-[10px] opacity-80">~$4.99 • 25-35m</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setOrderType('dine_in')}
                    className={`py-2.5 px-2 rounded-xl text-xs font-semibold transition-all flex flex-col items-center gap-1 ${
                      orderType === 'dine_in'
                        ? 'bg-amber-500 text-neutral-950 shadow-md font-bold'
                        : 'bg-neutral-800/60 text-neutral-300 border border-neutral-750'
                    }`}
                  >
                    <span>🍽️ Dine-in Table</span>
                    <span className="text-[10px] opacity-80">Order to seat</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setOrderType('pickup')}
                    className={`py-2.5 px-2 rounded-xl text-xs font-semibold transition-all flex flex-col items-center gap-1 ${
                      orderType === 'pickup'
                        ? 'bg-amber-500 text-neutral-950 shadow-md font-bold'
                        : 'bg-neutral-800/60 text-neutral-300 border border-neutral-750'
                    }`}
                  >
                    <span>🛍️ Express Pickup</span>
                    <span className="text-[10px] opacity-80">Free • 15-20m</span>
                  </button>
                </div>

                {orderType === 'delivery' ? (
                  <div className="space-y-1">
                    <label className="text-[11px] text-neutral-400">Delivery Address</label>
                    <input
                      type="text"
                      value={deliveryAddress}
                      onChange={e => setDeliveryAddress(e.target.value)}
                      className="w-full px-3 py-2 bg-neutral-800 border border-neutral-750 rounded-xl text-xs text-neutral-100 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                ) : orderType === 'dine_in' ? (
                  <div className="space-y-1">
                    <label className="text-[11px] text-neutral-400">Table Number / Location</label>
                    <input
                      type="text"
                      value={tableNumber}
                      onChange={e => setTableNumber(e.target.value)}
                      className="w-full px-3 py-2 bg-neutral-800 border border-neutral-750 rounded-xl text-xs text-neutral-100 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                ) : null}
              </div>

              {/* Secure Payment Methods */}
              <div className="space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-neutral-400 flex items-center justify-between">
                  <span>3. Payment Method</span>
                  <span className="text-[10px] text-emerald-400 font-normal flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3" /> 256-Bit SSL Encrypted
                  </span>
                </span>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('apple_pay')}
                    className={`p-3 rounded-xl border text-center transition-all flex flex-col items-center justify-center gap-1 ${
                      paymentMethod === 'apple_pay'
                        ? 'bg-amber-500/15 border-amber-500 text-amber-300 font-bold'
                        : 'bg-neutral-800/60 border-neutral-800 text-neutral-300 hover:bg-neutral-800'
                    }`}
                  >
                    <Smartphone className="w-4 h-4" />
                    <span className="text-xs">Apple Pay</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('google_pay')}
                    className={`p-3 rounded-xl border text-center transition-all flex flex-col items-center justify-center gap-1 ${
                      paymentMethod === 'google_pay'
                        ? 'bg-amber-500/15 border-amber-500 text-amber-300 font-bold'
                        : 'bg-neutral-800/60 border-neutral-800 text-neutral-300 hover:bg-neutral-800'
                    }`}
                  >
                    <Smartphone className="w-4 h-4" />
                    <span className="text-xs">Google Pay</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`p-3 rounded-xl border text-center transition-all flex flex-col items-center justify-center gap-1 ${
                      paymentMethod === 'card'
                        ? 'bg-amber-500/15 border-amber-500 text-amber-300 font-bold'
                        : 'bg-neutral-800/60 border-neutral-800 text-neutral-300 hover:bg-neutral-800'
                    }`}
                  >
                    <CreditCard className="w-4 h-4" />
                    <span className="text-xs">Credit Card</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('upi')}
                    className={`p-3 rounded-xl border text-center transition-all flex flex-col items-center justify-center gap-1 ${
                      paymentMethod === 'upi'
                        ? 'bg-amber-500/15 border-amber-500 text-amber-300 font-bold'
                        : 'bg-neutral-800/60 border-neutral-800 text-neutral-300 hover:bg-neutral-800'
                    }`}
                  >
                    <Smartphone className="w-4 h-4" />
                    <span className="text-xs">UPI / QR</span>
                  </button>
                </div>

                {/* Card input details if Card selected */}
                {paymentMethod === 'card' && (
                  <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-3">
                    <div>
                      <label className="text-[10px] text-neutral-400">Card Number</label>
                      <input
                        type="text"
                        value={cardNumber}
                        onChange={e => setCardNumber(e.target.value)}
                        className="w-full px-3 py-1.5 text-xs bg-neutral-900 border border-neutral-750 rounded-lg text-neutral-100 font-mono"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-[10px] text-neutral-400">Expiry (MM/YY)</label>
                        <input
                          type="text"
                          value={cardExpiry}
                          onChange={e => setCardExpiry(e.target.value)}
                          className="w-full px-3 py-1.5 text-xs bg-neutral-900 border border-neutral-750 rounded-lg text-neutral-100 font-mono"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-neutral-400">CVV</label>
                        <input
                          type="password"
                          value={cardCvv}
                          onChange={e => setCardCvv(e.target.value)}
                          className="w-full px-3 py-1.5 text-xs bg-neutral-900 border border-neutral-750 rounded-lg text-neutral-100 font-mono"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* UPI details */}
                {paymentMethod === 'upi' && (
                  <div className="p-3.5 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-2">
                    <label className="text-[11px] text-neutral-400">Enter Virtual Payment Address (UPI ID)</label>
                    <input
                      type="text"
                      value={upiId}
                      onChange={e => setUpiId(e.target.value)}
                      placeholder="username@bank"
                      className="w-full px-3 py-1.5 text-xs bg-neutral-900 border border-neutral-750 rounded-lg text-neutral-100 font-mono"
                    />
                  </div>
                )}
              </div>

              {/* Staff Gratuity / Tip */}
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                  4. Culinary & Service Gratuity
                </span>
                <div className="grid grid-cols-5 gap-2">
                  {[15, 18, 20, 25].map(pct => (
                    <button
                      key={pct}
                      type="button"
                      onClick={() => {
                        setTipPercentage(pct);
                        setCustomTip('');
                      }}
                      className={`py-2 rounded-xl text-xs font-bold transition-all ${
                        tipPercentage === pct && !customTip
                          ? 'bg-amber-500 text-neutral-950'
                          : 'bg-neutral-800/60 text-neutral-300 border border-neutral-750'
                      }`}
                    >
                      {pct}%
                    </button>
                  ))}
                  <button
                    type="button"
                    onClick={() => {
                      setTipPercentage(0);
                      setCustomTip('0');
                    }}
                    className={`py-2 rounded-xl text-xs font-medium transition-all ${
                      tipPercentage === 0 && customTip === '0'
                        ? 'bg-neutral-700 text-white'
                        : 'bg-neutral-800/60 text-neutral-400 border border-neutral-750'
                    }`}
                  >
                    No Tip
                  </button>
                </div>
              </div>

              {/* Promo Code Input */}
              <div className="space-y-1.5">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Promo code (e.g. NOCTURNE15)"
                    value={promoCode}
                    onChange={e => setPromoCode(e.target.value)}
                    className="flex-1 px-3 py-2 bg-neutral-800 border border-neutral-750 rounded-xl text-xs text-neutral-100 placeholder-neutral-500 uppercase font-mono"
                  />
                  <button
                    type="button"
                    onClick={handleApplyPromo}
                    className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-amber-400 font-bold text-xs rounded-xl border border-neutral-700"
                  >
                    Apply
                  </button>
                </div>
                {promoMessage && (
                  <p
                    className={`text-[11px] ${
                      appliedDiscountPercent > 0 ? 'text-emerald-400 font-medium' : 'text-rose-400'
                    }`}
                  >
                    {promoMessage}
                  </p>
                )}
              </div>

              {/* Summary calculations */}
              <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-2 text-xs">
                <div className="flex justify-between text-neutral-400">
                  <span>Subtotal:</span>
                  <span>${cartSubtotal.toFixed(2)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-400 font-medium">
                    <span>VIP Discount ({appliedDiscountPercent}%):</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-neutral-400">
                  <span>Taxes (8.875%):</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                {deliveryFee > 0 && (
                  <div className="flex justify-between text-neutral-400">
                    <span>Delivery Service:</span>
                    <span>${deliveryFee.toFixed(2)}</span>
                  </div>
                )}
                {tipAmount > 0 && (
                  <div className="flex justify-between text-neutral-400">
                    <span>Staff Tip:</span>
                    <span>${tipAmount.toFixed(2)}</span>
                  </div>
                )}

                <div className="flex justify-between text-sm font-bold text-neutral-100 pt-2 border-t border-neutral-800">
                  <span>Final Total:</span>
                  <span className="text-amber-400 font-serif-display text-base font-extrabold">
                    ${finalTotal.toFixed(2)}
                  </span>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Footer Payment Action Button */}
        {cart.length > 0 && (
          <div className="p-4 bg-neutral-950 border-t border-neutral-800">
            <button
              onClick={handleCheckout}
              disabled={isProcessingPayment}
              className="w-full py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-extrabold text-xs sm:text-sm flex items-center justify-between px-6 transition-all shadow-xl shadow-amber-500/20 disabled:opacity-50"
            >
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4" />
                <span>
                  {isProcessingPayment
                    ? 'Authorizing Secure Payment...'
                    : `Pay with ${paymentMethod.replace('_', ' ').toUpperCase()}`}
                </span>
              </div>
              <span className="font-serif-display text-base">
                ${finalTotal.toFixed(2)}
              </span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
