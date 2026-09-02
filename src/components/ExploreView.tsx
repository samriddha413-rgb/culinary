import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Star,
  MapPin,
  Clock,
  Phone,
  Globe,
  Flame,
  CalendarCheck,
  ShoppingBag,
  Sparkles,
  Heart,
  ChevronRight,
  ShieldCheck,
  Award,
  CheckCircle2
} from 'lucide-react';

export const ExploreView: React.FC = () => {
  const {
    currentRestaurant,
    restaurants,
    setCurrentRestaurantId,
    currentRestaurantMenu,
    setActiveTab,
    setSelectedDishModal,
    addToCart,
    toggleFavoriteItem,
    isItemFavorite,
    isRestaurantFavorite,
    toggleFavoriteRestaurant
  } = useApp();

  const popularDishes = currentRestaurantMenu.filter(m => m.isPopular || m.rating >= 4.9).slice(0, 4);

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Hero Showcase */}
      <div className="relative rounded-3xl overflow-hidden border border-neutral-800 bg-neutral-900 shadow-2xl">
        <div className="h-64 sm:h-80 md:h-96 w-full relative">
          <img
            src={currentRestaurant.bannerImage}
            alt={currentRestaurant.name}
            className="w-full h-full object-cover object-center filter brightness-[0.75] contrast-[1.05]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent" />

          {/* Top badges */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-neutral-950/80 backdrop-blur-md border border-amber-500/30 text-amber-400 text-xs font-semibold flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5" /> Michelin Guide Selection
              </span>
              <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 backdrop-blur-md border border-emerald-500/30 text-emerald-400 text-xs font-medium flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Open Tonight
              </span>
            </div>

            <button
              onClick={() => toggleFavoriteRestaurant(currentRestaurant.id)}
              className={`p-2.5 rounded-full backdrop-blur-md border transition-all ${
                isRestaurantFavorite(currentRestaurant.id)
                  ? 'bg-rose-500 text-white border-rose-400'
                  : 'bg-neutral-950/70 text-neutral-300 hover:text-rose-400 border-neutral-700/60'
              }`}
            >
              <Heart className={`w-4 h-4 ${isRestaurantFavorite(currentRestaurant.id) ? 'fill-white' : ''}`} />
            </button>
          </div>

          {/* Bottom Hero Info */}
          <div className="absolute bottom-6 left-6 right-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="max-w-2xl space-y-2">
              <div className="flex items-center gap-2 text-amber-400 text-xs font-medium tracking-wide">
                <span>{currentRestaurant.cuisine.join(' • ')}</span>
                <span>•</span>
                <span className="text-neutral-300 font-semibold">{currentRestaurant.priceRange}</span>
              </div>
              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white font-serif-display">
                {currentRestaurant.name}
              </h1>
              <p className="text-sm text-neutral-300 line-clamp-2 max-w-xl font-light leading-relaxed">
                {currentRestaurant.tagline}
              </p>
              <div className="flex flex-wrap items-center gap-4 text-xs text-neutral-300 pt-1">
                <div className="flex items-center gap-1.5 bg-neutral-900/80 px-2.5 py-1 rounded-lg border border-neutral-700/50">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span className="font-bold text-neutral-100">{currentRestaurant.rating}</span>
                  <span className="text-neutral-400">({currentRestaurant.reviewCount} reviews)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-amber-400" />
                  <span>{currentRestaurant.location.address}</span>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex items-center gap-2.5 shrink-0">
              <button
                onClick={() => setActiveTab('book')}
                className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs flex items-center gap-2 transition-all shadow-lg shadow-amber-500/20"
              >
                <CalendarCheck className="w-4 h-4" />
                Reserve Table
              </button>
              <button
                onClick={() => setActiveTab('menu')}
                className="px-5 py-2.5 rounded-xl bg-neutral-900/90 hover:bg-neutral-800 text-neutral-100 border border-neutral-700/80 font-medium text-xs flex items-center gap-2 transition-all"
              >
                <ShoppingBag className="w-4 h-4 text-amber-400" />
                Explore Menu
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Highlights & Features Pills */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {currentRestaurant.features.map((feature, idx) => (
          <div
            key={idx}
            className="p-3.5 rounded-2xl bg-neutral-900/70 border border-neutral-800 flex items-center gap-3"
          >
            <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
              <Sparkles className="w-4 h-4" />
            </div>
            <span className="text-xs font-semibold text-neutral-200">{feature}</span>
          </div>
        ))}
      </div>

      {/* Popular Chef Signatures */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-neutral-100 font-serif-display flex items-center gap-2">
              <Flame className="w-5 h-5 text-amber-500" /> Chef's Signature Dishes
            </h2>
            <p className="text-xs text-neutral-400 mt-0.5">
              Curated gastronomic staples crafted daily with seasonal artisanal ingredients.
            </p>
          </div>
          <button
            onClick={() => setActiveTab('menu')}
            className="text-xs text-amber-400 hover:text-amber-300 font-medium flex items-center gap-1 group"
          >
            Full Menu <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {popularDishes.map(dish => (
            <div
              key={dish.id}
              className="group bg-neutral-900/80 hover:bg-neutral-900 rounded-2xl border border-neutral-800/90 hover:border-neutral-700/80 overflow-hidden transition-all duration-200 flex flex-col justify-between"
            >
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={dish.image}
                  alt={dish.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <button
                  onClick={e => {
                    e.stopPropagation();
                    toggleFavoriteItem(dish.id);
                  }}
                  className={`absolute top-2.5 right-2.5 p-2 rounded-full backdrop-blur-md transition-all ${
                    isItemFavorite(dish.id)
                      ? 'bg-rose-500 text-white'
                      : 'bg-neutral-950/60 text-neutral-300 hover:text-rose-400'
                  }`}
                >
                  <Heart className={`w-3.5 h-3.5 ${isItemFavorite(dish.id) ? 'fill-white' : ''}`} />
                </button>
                <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded-md bg-neutral-950/80 backdrop-blur-sm text-[11px] font-bold text-amber-400 flex items-center gap-1">
                  <Star className="w-3 h-3 fill-amber-400" /> {dish.rating}
                </div>
              </div>

              <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
                <div>
                  <div className="text-[10px] uppercase font-bold text-neutral-500 tracking-wider">
                    {dish.category}
                  </div>
                  <h3 className="text-sm font-bold text-neutral-100 group-hover:text-amber-400 transition-colors line-clamp-1">
                    {dish.name}
                  </h3>
                  <p className="text-xs text-neutral-400 line-clamp-2 mt-1 font-light leading-relaxed">
                    {dish.description}
                  </p>
                </div>

                <div className="pt-3 flex items-center justify-between border-t border-neutral-800/80 mt-2">
                  <span className="text-sm font-bold text-neutral-100 font-serif-display">
                    ${dish.price.toFixed(2)}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => setSelectedDishModal(dish)}
                      className="px-2.5 py-1 text-xs text-neutral-400 hover:text-neutral-200 bg-neutral-800 hover:bg-neutral-750 rounded-lg transition-colors"
                    >
                      Details
                    </button>
                    <button
                      onClick={() => {
                        if (dish.optionGroups && dish.optionGroups.length > 0) {
                          setSelectedDishModal(dish);
                        } else {
                          addToCart(dish, 1);
                        }
                      }}
                      className="px-3 py-1 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs rounded-lg transition-colors shadow-sm"
                    >
                      + Add
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Location, Hours & Contact Details Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-neutral-900/70 border border-neutral-800 space-y-3">
          <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
            <MapPin className="w-4 h-4" />
          </div>
          <h3 className="text-sm font-bold text-neutral-100">Location & Neighborhood</h3>
          <p className="text-xs text-neutral-400 leading-relaxed">
            {currentRestaurant.location.address}, {currentRestaurant.location.neighborhood}, {currentRestaurant.location.city} {currentRestaurant.location.postalCode}
          </p>
          <div className="text-[11px] text-amber-400 font-medium">
            {currentRestaurant.features.slice(0, 2).join(' • ')}
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-neutral-900/70 border border-neutral-800 space-y-3">
          <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
            <Clock className="w-4 h-4" />
          </div>
          <h3 className="text-sm font-bold text-neutral-100">Dining Hours</h3>
          <div className="space-y-1 text-xs text-neutral-400">
            {currentRestaurant.openingHours.map((h, i) => (
              <div key={i} className="flex justify-between">
                <span>{h.day}:</span>
                <span className="text-neutral-200 font-medium">
                  {h.isClosed ? 'Closed' : `${h.open} - ${h.close}`}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-neutral-900/70 border border-neutral-800 space-y-3">
          <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
            <Phone className="w-4 h-4" />
          </div>
          <h3 className="text-sm font-bold text-neutral-100">Direct Concierge</h3>
          <div className="space-y-1.5 text-xs text-neutral-300">
            <div className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-neutral-500" />
              <span>{currentRestaurant.phone}</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="w-3.5 h-3.5 text-neutral-500" />
              <a href={currentRestaurant.website} target="_blank" rel="noreferrer" className="text-amber-400 hover:underline">
                {currentRestaurant.website.replace('https://', '')}
              </a>
            </div>
          </div>
          <div className="pt-1">
            <button
              onClick={() => setActiveTab('book')}
              className="w-full py-2 rounded-lg bg-neutral-800 hover:bg-neutral-750 text-neutral-200 font-medium text-xs text-center transition-colors border border-neutral-700/60"
            >
              Book Table Online
            </button>
          </div>
        </div>
      </div>

      {/* Featured Venues & Locations Grid */}
      <div className="space-y-4 pt-4 border-t border-neutral-800/80">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-neutral-100 font-serif-display">
              Our Curated Venues & Locations
            </h2>
            <p className="text-xs text-neutral-400 mt-0.5">
              Select any dining destination to explore its artisanal menu, reserve tables, or order delivery.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {restaurants.map((rest) => {
            const isSelected = rest.id === currentRestaurant.id;
            return (
              <div
                key={rest.id}
                onClick={() => setCurrentRestaurantId(rest.id)}
                className={`cursor-pointer rounded-2xl border transition-all overflow-hidden p-4 flex flex-col justify-between ${
                  isSelected
                    ? 'bg-neutral-900 border-amber-500/60 shadow-lg shadow-amber-500/5 ring-1 ring-amber-500/30'
                    : 'bg-neutral-900/60 hover:bg-neutral-900 border-neutral-800/80 hover:border-neutral-700'
                }`}
              >
                <div className="space-y-3">
                  <div className="relative h-32 rounded-xl overflow-hidden">
                    <img
                      src={rest.bannerImage}
                      alt={rest.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent" />
                    <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-full bg-neutral-950/80 backdrop-blur-md text-[11px] font-bold text-amber-400 flex items-center gap-1 border border-neutral-700/50">
                      <Star className="w-3 h-3 fill-amber-400" /> {rest.rating}
                    </div>
                    {isSelected && (
                      <div className="absolute bottom-2.5 left-2.5 px-2.5 py-0.5 rounded-md bg-amber-500 text-neutral-950 text-[10px] font-bold flex items-center gap-1 shadow">
                        <CheckCircle2 className="w-3 h-3" /> Active Venue
                      </div>
                    )}
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-neutral-100 font-serif-display">
                      {rest.name}
                    </h3>
                    <p className="text-xs text-amber-400/90 font-medium">
                      {rest.cuisine.slice(0, 2).join(' • ')} • {rest.priceRange}
                    </p>
                    <div className="flex items-start gap-1.5 text-xs text-neutral-400 mt-1.5">
                      <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                      <span className="line-clamp-1">{rest.location.address}, {rest.location.city} {rest.location.postalCode}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 mt-3 border-t border-neutral-800/70 flex items-center justify-between">
                  <span className="text-[11px] text-neutral-400 font-medium">
                    {rest.categories.length} Menu Categories
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentRestaurantId(rest.id);
                      setActiveTab('menu');
                    }}
                    className={`px-3 py-1 text-xs rounded-lg font-medium transition-colors ${
                      isSelected
                        ? 'bg-amber-500 text-neutral-950 font-bold hover:bg-amber-400'
                        : 'bg-neutral-800 hover:bg-neutral-750 text-neutral-200'
                    }`}
                  >
                    View Menu
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
