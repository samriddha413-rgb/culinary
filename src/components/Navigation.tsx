import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Compass,
  UtensilsCrossed,
  CalendarCheck,
  Clock,
  Heart,
  Star,
  Sliders
} from 'lucide-react';
import { ActiveTab } from '../types';

export const Navigation: React.FC = () => {
  const { activeTab, setActiveTab, orders, favorites, bookings } = useApp();

  const hasActiveOrder = orders.some(
    o => o.status !== 'completed' && o.status !== 'cancelled'
  );

  const tabs: { id: ActiveTab; label: string; icon: React.FC<{ className?: string }>; badge?: number | string; pulse?: boolean }[] = [
    { id: 'explore', label: 'Explore', icon: Compass },
    { id: 'menu', label: 'Menu', icon: UtensilsCrossed },
    { id: 'book', label: 'Book Table', icon: CalendarCheck, badge: bookings.length > 0 ? bookings.length : undefined },
    { id: 'orders', label: 'Live Orders', icon: Clock, pulse: hasActiveOrder, badge: hasActiveOrder ? 'LIVE' : undefined },
    { id: 'favorites', label: 'Saved', icon: Heart, badge: favorites.itemIds.length > 0 ? favorites.itemIds.length : undefined },
    { id: 'reviews', label: 'Ratings', icon: Star },
    { id: 'admin', label: 'Master Admin', icon: Sliders }
  ];

  return (
    <>
      {/* Desktop / Tablet Sub-Navbar */}
      <div className="hidden md:block bg-neutral-900/50 border-b border-neutral-800/80 sticky top-16 z-30 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-1 py-2 overflow-x-auto scrollbar-none">
            {tabs.map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
                    isActive
                      ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30 shadow-sm'
                      : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/50'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-amber-400' : 'text-neutral-400'}`} />
                  <span>{tab.label}</span>
                  {tab.badge && (
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                        tab.pulse
                          ? 'bg-amber-500 text-neutral-950 animate-pulse'
                          : 'bg-neutral-800 text-neutral-300'
                      }`}
                    >
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Mobile / Native Bottom Tab Bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-neutral-950/95 backdrop-blur-lg border-t border-neutral-800/80 pb-safe">
        <div className="grid grid-cols-7 items-center h-14 max-w-lg mx-auto px-1">
          {tabs.map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex flex-col items-center justify-center h-full w-full py-1 relative transition-colors ${
                  isActive ? 'text-amber-400' : 'text-neutral-500 hover:text-neutral-300'
                }`}
              >
                <div className="relative">
                  <Icon className={`w-4 h-4 transition-transform ${isActive ? 'scale-110' : ''}`} />
                  {tab.pulse && (
                    <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                  )}
                </div>
                <span className="text-[9px] font-medium tracking-tight mt-1 truncate max-w-full px-0.5">
                  {tab.label === 'Master Admin' ? 'Admin' : tab.label}
                </span>
                {isActive && (
                  <span className="absolute top-0 w-8 h-0.5 bg-amber-400 rounded-full" />
                )}
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
};
