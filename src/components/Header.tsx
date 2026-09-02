import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Utensils,
  Moon,
  Sun,
  Smartphone,
  Monitor,
  Bell,
  ShoppingBag,
  User,
  Search,
  MapPin,
  ChevronDown,
  Wifi,
  WifiOff,
  Sparkles,
  ShieldCheck,
  Check
} from 'lucide-react';
import { DeviceFrameType } from '../types';

export const Header: React.FC = () => {
  const {
    isDarkMode,
    toggleDarkMode,
    deviceFrame,
    setDeviceFrame,
    currentRestaurant,
    restaurants,
    setCurrentRestaurantId,
    cartCount,
    setIsCheckoutOpen,
    unreadNotificationCount,
    notifications,
    markAllNotificationsRead,
    user,
    setIsAuthModalOpen,
    setActiveTab,
    isOfflineSimulated,
    setIsOfflineSimulated,
    searchQuery,
    setSearchQuery
  } = useApp();

  const [isRestDropdownOpen, setIsRestDropdownOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-neutral-900/85 dark:bg-neutral-950/85 border-b border-neutral-800/80 transition-colors">
      {/* Top Banner for Offline Mode Simulation */}
      {isOfflineSimulated && (
        <div className="bg-amber-500/15 border-b border-amber-500/30 text-amber-400 px-4 py-1.5 text-xs font-medium flex items-center justify-between">
          <div className="flex items-center gap-2">
            <WifiOff className="w-3.5 h-3.5 animate-pulse" />
            <span>Simulated Offline Mode Active • Serving cached favorites & offline menu data</span>
          </div>
          <button
            onClick={() => setIsOfflineSimulated(false)}
            className="underline hover:text-amber-300 transition-colors"
          >
            Go Online
          </button>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-3">
        {/* Left: Brand & Restaurant Switcher */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveTab('explore')}
            className="flex items-center gap-2.5 text-left group"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-neutral-950 font-bold shadow-md shadow-amber-500/10 group-hover:scale-105 transition-transform">
              <Utensils className="w-5 h-5" />
            </div>
            <div className="hidden sm:block">
              <span className="text-base font-bold tracking-tight text-neutral-100 font-serif-display block leading-none">
                Culinaire
              </span>
              <span className="text-[10px] tracking-wider uppercase text-neutral-400 font-medium">
                Haute Gastronomy
              </span>
            </div>
          </button>

          {/* Restaurant Location Selector Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsRestDropdownOpen(!isRestDropdownOpen)}
              className="flex items-center gap-1.5 text-xs px-2.5 py-1.5 rounded-lg bg-neutral-800/60 hover:bg-neutral-800 text-neutral-200 border border-neutral-700/60 transition-colors"
            >
              <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span className="font-medium truncate max-w-[120px] sm:max-w-[160px]">
                {currentRestaurant.name}
              </span>
              <ChevronDown className="w-3 h-3 text-neutral-400 ml-0.5" />
            </button>

            {isRestDropdownOpen && (
              <div className="absolute left-0 mt-2 w-72 rounded-xl bg-neutral-900 border border-neutral-800 shadow-2xl py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="px-3 py-1.5 text-[11px] font-semibold text-neutral-400 uppercase tracking-wider">
                  Select Master Location
                </div>
                {restaurants.map(rest => (
                  <button
                    key={rest.id}
                    onClick={() => {
                      setCurrentRestaurantId(rest.id);
                      setIsRestDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2.5 flex items-center justify-between hover:bg-neutral-800/70 transition-colors ${
                      rest.id === currentRestaurant.id ? 'bg-amber-500/10 text-amber-400' : 'text-neutral-200'
                    }`}
                  >
                    <div>
                      <div className="text-xs font-semibold">{rest.name}</div>
                      <div className="text-[11px] text-neutral-400 flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3" /> {rest.location.neighborhood}, {rest.location.city}
                      </div>
                    </div>
                    {rest.id === currentRestaurant.id && <Check className="w-4 h-4 text-amber-400" />}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Center: Search bar (Desktop) */}
        <div className="hidden md:flex flex-1 max-w-md mx-4">
          <div className="relative w-full">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search truffle pasta, wagyu, mocktails..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-1.5 text-xs bg-neutral-800/50 hover:bg-neutral-800/80 focus:bg-neutral-900 text-neutral-100 placeholder-neutral-500 rounded-full border border-neutral-700/60 focus:border-amber-500/60 focus:outline-none transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-neutral-400 hover:text-neutral-200"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Right: Actions (Device Switcher, Offline, Notifications, Cart, Auth) */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Device Frame Mode Switcher (Web / iOS / Android) */}
          <div className="hidden lg:flex items-center bg-neutral-800/60 p-0.5 rounded-lg border border-neutral-700/60 text-xs">
            <button
              onClick={() => setDeviceFrame('responsive')}
              title="Desktop Web Layout"
              className={`px-2 py-1 rounded-md flex items-center gap-1 transition-all ${
                deviceFrame === 'responsive'
                  ? 'bg-neutral-700 text-amber-400 font-semibold shadow-sm'
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              <Monitor className="w-3.5 h-3.5" />
              <span className="text-[11px]">Web</span>
            </button>
            <button
              onClick={() => setDeviceFrame('ios')}
              title="iOS React Native Preview (iPhone 16 Pro)"
              className={`px-2 py-1 rounded-md flex items-center gap-1 transition-all ${
                deviceFrame === 'ios'
                  ? 'bg-neutral-700 text-amber-400 font-semibold shadow-sm'
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span className="text-[11px]">iOS</span>
            </button>
            <button
              onClick={() => setDeviceFrame('android')}
              title="Android React Native Preview (Pixel 9)"
              className={`px-2 py-1 rounded-md flex items-center gap-1 transition-all ${
                deviceFrame === 'android'
                  ? 'bg-neutral-700 text-amber-400 font-semibold shadow-sm'
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span className="text-[11px]">Android</span>
            </button>
          </div>

          {/* Offline Mode Toggle Button */}
          <button
            onClick={() => setIsOfflineSimulated(!isOfflineSimulated)}
            title={isOfflineSimulated ? 'Offline mode active' : 'Test offline cache mode'}
            className={`p-2 rounded-lg border transition-colors ${
              isOfflineSimulated
                ? 'bg-amber-500/20 text-amber-400 border-amber-500/50'
                : 'bg-neutral-800/60 text-neutral-400 hover:text-neutral-200 border-neutral-700/60'
            }`}
          >
            {isOfflineSimulated ? <WifiOff className="w-4 h-4" /> : <Wifi className="w-4 h-4" />}
          </button>

          {/* Dark / Light Toggle */}
          <button
            onClick={toggleDarkMode}
            title={isDarkMode ? 'Switch to Light theme' : 'Switch to Dark theme'}
            className="p-2 rounded-lg bg-neutral-800/60 hover:bg-neutral-800 text-neutral-300 border border-neutral-700/60 transition-colors"
          >
            {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-neutral-300" />}
          </button>

          {/* Notifications Bell */}
          <div className="relative">
            <button
              onClick={() => setIsNotifOpen(!isNotifOpen)}
              title="Notification Center"
              className="p-2 rounded-lg bg-neutral-800/60 hover:bg-neutral-800 text-neutral-300 border border-neutral-700/60 transition-colors relative"
            >
              <Bell className="w-4 h-4" />
              {unreadNotificationCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-amber-500 text-neutral-950 text-[10px] font-bold flex items-center justify-center animate-pulse">
                  {unreadNotificationCount}
                </span>
              )}
            </button>

            {/* Notification popover */}
            {isNotifOpen && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl bg-neutral-900 border border-neutral-800 shadow-2xl p-3 z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="flex items-center justify-between pb-2 border-b border-neutral-800">
                  <span className="text-xs font-bold text-neutral-100 uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Push Notifications & Alerts
                  </span>
                  {unreadNotificationCount > 0 && (
                    <button
                      onClick={markAllNotificationsRead}
                      className="text-[11px] text-amber-400 hover:text-amber-300"
                    >
                      Mark all read
                    </button>
                  )}
                </div>
                <div className="max-h-72 overflow-y-auto divide-y divide-neutral-800/60 py-1">
                  {notifications.length === 0 ? (
                    <div className="py-6 text-center text-xs text-neutral-500">
                      No notifications yet
                    </div>
                  ) : (
                    notifications.map(n => (
                      <div
                        key={n.id}
                        className={`py-2.5 px-1.5 transition-colors rounded-lg ${
                          !n.read ? 'bg-amber-500/5' : ''
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-semibold text-neutral-200">{n.title}</span>
                          <span className="text-[10px] text-neutral-500">{n.timestamp}</span>
                        </div>
                        <p className="text-[11px] text-neutral-400 mt-1 leading-relaxed">
                          {n.message}
                        </p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Cart Bag Icon */}
          <button
            onClick={() => setIsCheckoutOpen(true)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-neutral-950 font-semibold text-xs transition-colors shadow-md shadow-amber-500/20"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="hidden sm:inline">Order</span>
            {cartCount > 0 && (
              <span className="bg-neutral-950 text-amber-400 px-1.5 py-0.2 rounded-full text-[10px] font-bold">
                {cartCount}
              </span>
            )}
          </button>

          {/* User Profile / Social Auth */}
          <button
            onClick={() => setIsAuthModalOpen(true)}
            className="flex items-center gap-1.5 p-1 rounded-lg hover:bg-neutral-800 border border-transparent hover:border-neutral-700/60 transition-colors"
          >
            {user ? (
              <img
                src={user.avatar}
                alt={user.name}
                className="w-8 h-8 rounded-lg object-cover ring-1 ring-amber-500/50"
              />
            ) : (
              <div className="w-8 h-8 rounded-lg bg-neutral-800 flex items-center justify-center text-neutral-400">
                <User className="w-4 h-4" />
              </div>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
