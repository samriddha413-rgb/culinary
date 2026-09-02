import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Heart,
  Wifi,
  WifiOff,
  Star,
  ShoppingBag,
  CalendarCheck,
  Trash2,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  HardDrive
} from 'lucide-react';

export const FavoritesView: React.FC = () => {
  const {
    favorites,
    offlineSavedItems,
    restaurants,
    toggleFavoriteItem,
    toggleFavoriteRestaurant,
    addToCart,
    setSelectedDishModal,
    setActiveTab,
    isOfflineSimulated,
    setIsOfflineSimulated
  } = useApp();

  const savedRestaurants = restaurants.filter(r => favorites.restaurantIds.includes(r.id));

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Top Header & Offline Persistence Card */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-neutral-100 font-serif-display">
            Saved Favorites & Offline Vault
          </h1>
          <p className="text-xs text-neutral-400 mt-1">
            Persisted locally for instantaneous access without an active internet connection.
          </p>
        </div>

        {/* Offline Simulation Toggle Button */}
        <button
          onClick={() => setIsOfflineSimulated(!isOfflineSimulated)}
          className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all border ${
            isOfflineSimulated
              ? 'bg-amber-500 text-neutral-950 border-amber-400 shadow-lg shadow-amber-500/20'
              : 'bg-neutral-900 text-neutral-300 hover:text-white border-neutral-750'
          }`}
        >
          {isOfflineSimulated ? <WifiOff className="w-4 h-4" /> : <Wifi className="w-4 h-4" />}
          <span>{isOfflineSimulated ? 'Simulated Offline Mode Active' : 'Test Offline Mode'}</span>
        </button>
      </div>

      {/* Offline Storage Guarantee Banner */}
      <div className="p-4 sm:p-5 rounded-3xl bg-neutral-900 border border-neutral-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
            <HardDrive className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-neutral-200 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Offline Persistence Synchronized</span>
            </div>
            <p className="text-[11px] text-neutral-400 mt-0.5">
              {offlineSavedItems.length} dishes and {savedRestaurants.length} restaurant profiles stored in client cache.
            </p>
          </div>
        </div>

        <span className="px-3 py-1 rounded-full bg-neutral-950 border border-neutral-800 text-[11px] font-mono text-neutral-300">
          State Engine: LocalStorage & PWA Cache
        </span>
      </div>

      {/* Saved Dishes Section */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-neutral-100 font-serif-display flex items-center gap-2">
          <Heart className="w-4 h-4 text-rose-500 fill-rose-500" /> Saved Dishes ({offlineSavedItems.length})
        </h2>

        {offlineSavedItems.length === 0 ? (
          <div className="py-12 text-center rounded-2xl bg-neutral-900/40 border border-neutral-800 p-6 space-y-3">
            <Heart className="w-8 h-8 text-neutral-600 mx-auto" />
            <h3 className="text-sm font-bold text-neutral-300">No favorite dishes saved yet</h3>
            <p className="text-xs text-neutral-500 max-w-xs mx-auto">
              Tap the heart icon on any menu dish to save it for quick reordering and offline viewing.
            </p>
            <button
              onClick={() => setActiveTab('menu')}
              className="px-4 py-2 rounded-xl bg-amber-500 text-neutral-950 font-bold text-xs"
            >
              Browse Menu
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {offlineSavedItems.map(dish => (
              <div
                key={dish.id}
                className="bg-neutral-900/80 rounded-2xl border border-neutral-800 overflow-hidden flex flex-col justify-between"
              >
                <div className="relative aspect-video">
                  <img
                    src={dish.image}
                    alt={dish.name}
                    className="w-full h-full object-cover"
                  />
                  <button
                    onClick={() => toggleFavoriteItem(dish.id)}
                    className="absolute top-2.5 right-2.5 p-2 rounded-full bg-rose-500 text-white shadow-md"
                    title="Remove from favorites"
                  >
                    <Heart className="w-3.5 h-3.5 fill-white" />
                  </button>
                  <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded-md bg-neutral-950/80 text-[10px] font-bold text-amber-400 flex items-center gap-1">
                    <Star className="w-3 h-3 fill-amber-400" /> {dish.rating}
                  </div>
                </div>

                <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-neutral-100 line-clamp-1">{dish.name}</h3>
                    <p className="text-xs text-neutral-400 line-clamp-2 mt-1">{dish.description}</p>
                  </div>

                  <div className="pt-3 border-t border-neutral-800 flex items-center justify-between">
                    <span className="text-sm font-bold text-neutral-100 font-serif-display">
                      ${dish.price.toFixed(2)}
                    </span>
                    <button
                      onClick={() => {
                        if (dish.optionGroups && dish.optionGroups.length > 0) {
                          setSelectedDishModal(dish);
                        } else {
                          addToCart(dish, 1);
                        }
                      }}
                      className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs flex items-center gap-1"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Reorder</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Saved Restaurant Profiles */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-neutral-100 font-serif-display flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-400" /> Bookmarked Dining Establishments ({savedRestaurants.length})
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {savedRestaurants.map(rest => (
            <div
              key={rest.id}
              className="p-5 rounded-3xl bg-neutral-900 border border-neutral-800 space-y-3 flex items-center justify-between gap-4"
            >
              <div className="flex items-center gap-3 min-w-0">
                <img
                  src={rest.logoImage}
                  alt={rest.name}
                  className="w-14 h-14 rounded-2xl object-cover ring-1 ring-amber-500/30 shrink-0"
                />
                <div className="min-w-0">
                  <h3 className="text-sm font-bold text-neutral-100 truncate">{rest.name}</h3>
                  <p className="text-xs text-neutral-400 truncate">{rest.location.neighborhood}, {rest.location.city}</p>
                  <div className="flex items-center gap-2 text-xs text-amber-400 mt-1">
                    <Star className="w-3 h-3 fill-amber-400" />
                    <span className="font-bold">{rest.rating}</span>
                    <span className="text-neutral-400">({rest.reviewCount} reviews)</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => setActiveTab('book')}
                  className="px-3 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs flex items-center gap-1.5"
                >
                  <CalendarCheck className="w-3.5 h-3.5" />
                  <span>Reserve</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
