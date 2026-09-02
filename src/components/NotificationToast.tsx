import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Bell,
  X,
  Sparkles,
  Utensils,
  CalendarCheck,
  ChevronRight
} from 'lucide-react';

export const NotificationToast: React.FC = () => {
  const { pushNotificationToast, dismissToast, setActiveTab, setActiveOrderId } = useApp();

  if (!pushNotificationToast) return null;

  const handleAction = () => {
    if (pushNotificationToast.type === 'order_update') {
      if (pushNotificationToast.data?.orderId) {
        setActiveOrderId(pushNotificationToast.data.orderId);
      }
      setActiveTab('orders');
    } else if (pushNotificationToast.type === 'table_alert' || pushNotificationToast.type === 'booking_confirmed') {
      setActiveTab('book');
    }
    dismissToast();
  };

  return (
    <div className="fixed top-20 right-4 z-50 max-w-sm w-[calc(100%-2rem)] animate-in slide-in-from-top-4 duration-300">
      <div className="bg-neutral-900/95 backdrop-blur-xl border border-amber-500/40 rounded-2xl p-4 shadow-2xl shadow-black/80 flex items-start gap-3.5 ring-1 ring-amber-500/20">
        <div className="w-9 h-9 rounded-xl bg-amber-500 text-neutral-950 flex items-center justify-center shrink-0 font-bold shadow-md shadow-amber-500/30 mt-0.5">
          {pushNotificationToast.type === 'table_alert' ? (
            <CalendarCheck className="w-5 h-5" />
          ) : pushNotificationToast.type === 'order_update' ? (
            <Utensils className="w-5 h-5" />
          ) : (
            <Bell className="w-5 h-5" />
          )}
        </div>

        <div className="flex-1 min-w-0" onClick={handleAction} role="button">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-neutral-100 truncate">
              {pushNotificationToast.title}
            </span>
            <span className="text-[10px] text-amber-400 font-mono">Now</span>
          </div>
          <p className="text-[11px] text-neutral-300 mt-1 leading-relaxed font-light">
            {pushNotificationToast.message}
          </p>
          <div className="mt-2 text-[10px] text-amber-400 font-bold flex items-center gap-1">
            <span>Tap to View Details</span>
            <ChevronRight className="w-3 h-3" />
          </div>
        </div>

        <button
          onClick={dismissToast}
          className="text-neutral-400 hover:text-white p-1 rounded-lg transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
