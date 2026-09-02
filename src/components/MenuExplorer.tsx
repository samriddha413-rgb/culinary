import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import {
  Search,
  Filter,
  Star,
  Clock,
  Flame,
  Heart,
  Plus,
  Minus,
  Sparkles,
  Leaf,
  ShieldAlert,
  SlidersHorizontal,
  LayoutGrid,
  List
} from 'lucide-react';
import { DietaryTag, MenuItem } from '../types';

export const MenuExplorer: React.FC = () => {
  const {
    currentRestaurant,
    currentRestaurantMenu,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    selectedDietaryTags,
    toggleDietaryTag,
    setSelectedDishModal,
    addToCart,
    toggleFavoriteItem,
    isItemFavorite,
    cart
  } = useApp();

  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const categories = useMemo(() => {
    return ['All', ...currentRestaurant.categories];
  }, [currentRestaurant]);

  const dietaryFilters: { tag: DietaryTag; label: string; icon: string }[] = [
    { tag: 'chef_special', label: "Chef's Special", icon: '✨' },
    { tag: 'vegetarian', label: 'Vegetarian', icon: '🌱' },
    { tag: 'vegan', label: 'Vegan', icon: '🌿' },
    { tag: 'gluten_free', label: 'Gluten-Free', icon: '🌾' },
    { tag: 'halal', label: 'Halal', icon: '🥩' },
    { tag: 'keto', label: 'Keto', icon: '🥑' },
    { tag: 'dairy_free', label: 'Dairy-Free', icon: '🥛' },
  ];

  // Filter menu items
  const filteredItems = useMemo(() => {
    return currentRestaurantMenu.filter(item => {
      // Category match
      if (selectedCategory !== 'All' && item.category !== selectedCategory) {
        return false;
      }
      // Search match
      if (
        searchQuery &&
        !item.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !item.description.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false;
      }
      // Dietary filters match (AND logic)
      if (
        selectedDietaryTags.length > 0 &&
        !selectedDietaryTags.every(tag => item.dietaryTags.includes(tag))
      ) {
        return false;
      }
      return true;
    });
  }, [currentRestaurantMenu, selectedCategory, searchQuery, selectedDietaryTags]);

  const getCartQuantityForDish = (dishId: string) => {
    return cart.filter(c => c.menuItem.id === dishId).reduce((acc, c) => acc + c.quantity, 0);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Header & Search */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-neutral-100 font-serif-display">
            {currentRestaurant.name} Menu
          </h1>
          <p className="text-xs text-neutral-400 mt-1">
            Artisanal plates, fresh seasonal ingredients, and sommelier-paired beverages.
          </p>
        </div>

        {/* Search input and view mode */}
        <div className="flex items-center gap-2">
          <div className="relative flex-1 md:w-64">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search dishes, ingredients..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs bg-neutral-900 border border-neutral-800 rounded-xl text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-amber-500/60"
            />
          </div>

          <div className="flex items-center bg-neutral-900 p-1 rounded-xl border border-neutral-800">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg transition-colors ${
                viewMode === 'grid' ? 'bg-neutral-800 text-amber-400' : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-lg transition-colors ${
                viewMode === 'list' ? 'bg-neutral-800 text-amber-400' : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Category Navigation Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {categories.map(cat => {
          const count = cat === 'All' ? currentRestaurantMenu.length : currentRestaurantMenu.filter(m => m.category === cat).length;
          const isSelected = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-2 ${
                isSelected
                  ? 'bg-amber-500 text-neutral-950 shadow-md shadow-amber-500/10'
                  : 'bg-neutral-900/80 text-neutral-300 hover:bg-neutral-800 border border-neutral-800'
              }`}
            >
              <span>{cat}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  isSelected ? 'bg-neutral-950/20 text-neutral-950' : 'bg-neutral-800 text-neutral-400'
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Dietary Badges Filter Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        <span className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider flex items-center gap-1 shrink-0 mr-1">
          <Filter className="w-3 h-3" /> Diet:
        </span>
        {dietaryFilters.map(filter => {
          const isActive = selectedDietaryTags.includes(filter.tag);
          return (
            <button
              key={filter.tag}
              onClick={() => toggleDietaryTag(filter.tag)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap flex items-center gap-1.5 transition-all ${
                isActive
                  ? 'bg-amber-500/20 border border-amber-500/50 text-amber-300 font-semibold'
                  : 'bg-neutral-900 text-neutral-400 border border-neutral-800/80 hover:text-neutral-200'
              }`}
            >
              <span>{filter.icon}</span>
              <span>{filter.label}</span>
            </button>
          );
        })}
      </div>

      {/* Menu Grid or List View */}
      {filteredItems.length === 0 ? (
        <div className="py-16 text-center rounded-3xl bg-neutral-900/40 border border-neutral-800/80 p-8 space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-neutral-800/80 flex items-center justify-center text-neutral-400 mx-auto">
            <Search className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-neutral-200">No dishes match your filters</h3>
          <p className="text-xs text-neutral-400 max-w-sm mx-auto">
            Try adjusting your search keywords or dietary restrictions to discover culinary selections.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All');
              selectedDietaryTags.forEach(t => toggleDietaryTag(t));
            }}
            className="px-4 py-2 rounded-xl bg-amber-500 text-neutral-950 font-bold text-xs"
          >
            Reset Filters
          </button>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredItems.map(dish => {
            const inCartQty = getCartQuantityForDish(dish.id);
            const hasOptions = dish.optionGroups && dish.optionGroups.length > 0;

            return (
              <div
                key={dish.id}
                onClick={() => setSelectedDishModal(dish)}
                className="group cursor-pointer bg-neutral-900/70 hover:bg-neutral-900 rounded-2xl border border-neutral-800 hover:border-neutral-700/80 overflow-hidden transition-all duration-200 flex flex-col justify-between shadow-sm hover:shadow-xl"
              >
                {/* Dish Photo */}
                <div className="relative aspect-[16/10] overflow-hidden bg-neutral-800">
                  <img
                    src={dish.image}
                    alt={dish.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/70 via-transparent to-black/20" />

                  {/* Badges */}
                  <div className="absolute top-2.5 left-2.5 flex flex-wrap gap-1">
                    {dish.isPopular && (
                      <span className="px-2 py-0.5 rounded-md bg-amber-500 text-neutral-950 text-[10px] font-bold shadow-sm">
                        Popular
                      </span>
                    )}
                    {dish.dietaryTags.slice(0, 2).map(tag => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded-md bg-neutral-950/80 backdrop-blur-sm text-neutral-200 text-[10px] font-medium border border-neutral-700/60"
                      >
                        {tag.replace('_', ' ')}
                      </span>
                    ))}
                  </div>

                  {/* Favorite button */}
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

                  <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between text-xs text-neutral-200">
                    <div className="flex items-center gap-1 font-bold text-amber-400 bg-neutral-950/70 px-2 py-0.5 rounded-md backdrop-blur-sm">
                      <Star className="w-3 h-3 fill-amber-400" />
                      <span>{dish.rating}</span>
                      <span className="text-[10px] text-neutral-400">({dish.reviewCount})</span>
                    </div>

                    <div className="flex items-center gap-2 text-[11px] text-neutral-300 bg-neutral-950/70 px-2 py-0.5 rounded-md backdrop-blur-sm">
                      <Clock className="w-3 h-3 text-neutral-400" />
                      <span>{dish.preparationTimeMinutes}m</span>
                      {dish.calories && <span>• {dish.calories} kcal</span>}
                    </div>
                  </div>
                </div>

                {/* Info & Add Section */}
                <div className="p-4 space-y-2.5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-base font-bold text-neutral-100 group-hover:text-amber-400 transition-colors">
                      {dish.name}
                    </h3>
                    <p className="text-xs text-neutral-400 line-clamp-2 mt-1 leading-relaxed font-light">
                      {dish.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-neutral-800 flex items-center justify-between">
                    <div>
                      <span className="text-base font-bold text-neutral-100 font-serif-display">
                        ${dish.price.toFixed(2)}
                      </span>
                      {hasOptions && (
                        <span className="block text-[10px] text-neutral-500 font-normal">
                          Customizable
                        </span>
                      )}
                    </div>

                    <div onClick={e => e.stopPropagation()}>
                      <button
                        onClick={() => {
                          if (hasOptions) {
                            setSelectedDishModal(dish);
                          } else {
                            addToCart(dish, 1);
                          }
                        }}
                        className={`px-3.5 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all shadow-sm ${
                          inCartQty > 0
                            ? 'bg-amber-500 text-neutral-950'
                            : 'bg-neutral-800 hover:bg-neutral-700 text-neutral-100 hover:text-amber-400'
                        }`}
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>{hasOptions ? 'Customize' : inCartQty > 0 ? `Added (${inCartQty})` : 'Add'}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* List View */
        <div className="space-y-3">
          {filteredItems.map(dish => {
            const inCartQty = getCartQuantityForDish(dish.id);
            const hasOptions = dish.optionGroups && dish.optionGroups.length > 0;

            return (
              <div
                key={dish.id}
                onClick={() => setSelectedDishModal(dish)}
                className="group cursor-pointer bg-neutral-900/70 hover:bg-neutral-900 p-4 rounded-2xl border border-neutral-800 hover:border-neutral-700 transition-all flex items-center gap-4 justify-between"
              >
                <div className="flex items-center gap-4 min-w-0">
                  <img
                    src={dish.image}
                    alt={dish.name}
                    className="w-20 h-20 rounded-xl object-cover shrink-0"
                  />
                  <div className="min-w-0 space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-bold text-neutral-100 group-hover:text-amber-400 truncate">
                        {dish.name}
                      </h3>
                      {dish.isPopular && (
                        <span className="px-1.5 py-0.2 rounded bg-amber-500 text-neutral-950 text-[9px] font-bold">
                          Popular
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-neutral-400 line-clamp-1 font-light">
                      {dish.description}
                    </p>
                    <div className="flex items-center gap-3 text-xs text-neutral-400">
                      <span className="text-amber-400 font-bold flex items-center gap-1">
                        <Star className="w-3 h-3 fill-amber-400" /> {dish.rating}
                      </span>
                      <span>•</span>
                      <span>{dish.preparationTimeMinutes} mins prep</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0" onClick={e => e.stopPropagation()}>
                  <span className="text-base font-bold text-neutral-100 font-serif-display">
                    ${dish.price.toFixed(2)}
                  </span>
                  <button
                    onClick={() => {
                      if (hasOptions) {
                        setSelectedDishModal(dish);
                      } else {
                        addToCart(dish, 1);
                      }
                    }}
                    className="px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>{hasOptions ? 'Select' : 'Add'}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
