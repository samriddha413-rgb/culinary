import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  Star,
  Clock,
  Flame,
  Plus,
  Minus,
  Sparkles,
  Heart,
  Check,
  ShieldCheck,
  MessageSquare,
  ShoppingBag
} from 'lucide-react';
import { CartItem } from '../types';

export const DishDetailModal: React.FC = () => {
  const {
    selectedDishModal,
    setSelectedDishModal,
    addToCart,
    toggleFavoriteItem,
    isItemFavorite,
    reviews
  } = useApp();

  const dish = selectedDishModal;
  const [quantity, setQuantity] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState<CartItem['selectedOptions']>([]);
  const [specialInstructions, setSpecialInstructions] = useState('');

  // Preselect default required options when modal opens
  useEffect(() => {
    if (dish && dish.optionGroups) {
      const defaults: CartItem['selectedOptions'] = [];
      dish.optionGroups.forEach(group => {
        if (group.required && group.options.length > 0) {
          defaults.push({
            groupId: group.id,
            groupTitle: group.title,
            optionId: group.options[0].id,
            optionName: group.options[0].name,
            price: group.options[0].price
          });
        }
      });
      setSelectedOptions(defaults);
      setQuantity(1);
      setSpecialInstructions('');
    }
  }, [dish]);

  if (!dish) return null;

  const handleOptionSelect = (groupId: string, groupTitle: string, optionId: string, optionName: string, price: number, isSingleSelect: boolean) => {
    setSelectedOptions(prev => {
      if (isSingleSelect) {
        // Replace existing in group
        const filtered = prev.filter(o => o.groupId !== groupId);
        return [...filtered, { groupId, groupTitle, optionId, optionName, price }];
      } else {
        // Toggle multi-select
        const exists = prev.some(o => o.groupId === groupId && o.optionId === optionId);
        if (exists) {
          return prev.filter(o => !(o.groupId === groupId && o.optionId === optionId));
        } else {
          return [...prev, { groupId, groupTitle, optionId, optionName, price }];
        }
      }
    });
  };

  const optionsTotal = selectedOptions.reduce((sum, opt) => sum + opt.price, 0);
  const itemUnitPrice = dish.price + optionsTotal;
  const totalPrice = itemUnitPrice * quantity;

  const handleAdd = () => {
    addToCart(dish, quantity, selectedOptions, specialInstructions);
    setSelectedDishModal(null);
  };

  // Find reviews mentioning this dish
  const dishReviews = reviews.filter(r => r.dishId === dish.id || r.dishRecommended === dish.name);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl max-h-[90vh] bg-neutral-900 border border-neutral-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col">
        {/* Close Button */}
        <button
          onClick={() => setSelectedDishModal(null)}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-neutral-950/70 hover:bg-neutral-950 text-neutral-300 hover:text-white backdrop-blur-md border border-neutral-700/60 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Scrollable Content */}
        <div className="overflow-y-auto flex-1">
          {/* Hero Image */}
          <div className="relative h-64 sm:h-72 w-full bg-neutral-950">
            <img
              src={dish.image}
              alt={dish.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-transparent to-transparent" />

            {/* Favorite button */}
            <button
              onClick={() => toggleFavoriteItem(dish.id)}
              className={`absolute top-4 left-4 p-2.5 rounded-full backdrop-blur-md transition-all ${
                isItemFavorite(dish.id)
                  ? 'bg-rose-500 text-white'
                  : 'bg-neutral-950/70 text-neutral-300 hover:text-rose-400'
              }`}
            >
              <Heart className={`w-4 h-4 ${isItemFavorite(dish.id) ? 'fill-white' : ''}`} />
            </button>

            {/* Rating pill */}
            <div className="absolute bottom-4 left-4 flex items-center gap-2">
              <span className="px-3 py-1 rounded-xl bg-neutral-950/80 backdrop-blur-md border border-neutral-800 text-amber-400 text-xs font-bold flex items-center gap-1.5">
                <Star className="w-3.5 h-3.5 fill-amber-400" /> {dish.rating}
                <span className="text-neutral-400 font-normal">({dish.reviewCount} reviews)</span>
              </span>
              <span className="px-3 py-1 rounded-xl bg-neutral-950/80 backdrop-blur-md border border-neutral-800 text-neutral-300 text-xs flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-neutral-400" /> {dish.preparationTimeMinutes} mins
              </span>
            </div>
          </div>

          {/* Dish Information */}
          <div className="p-6 space-y-6">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase font-bold tracking-wider text-amber-500">
                  {dish.category}
                </span>
                {dish.calories && (
                  <span className="text-xs text-neutral-400">
                    {dish.calories} calories / serving
                  </span>
                )}
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-neutral-100 font-serif-display mt-1">
                {dish.name}
              </h2>
              <p className="text-sm text-neutral-300 mt-2 leading-relaxed font-light">
                {dish.description}
              </p>
            </div>

            {/* Dietary Tags */}
            <div className="flex flex-wrap gap-2">
              {dish.dietaryTags.map(tag => (
                <span
                  key={tag}
                  className="px-2.5 py-1 rounded-lg bg-neutral-800 text-neutral-300 text-xs font-medium border border-neutral-700/60 flex items-center gap-1"
                >
                  <Sparkles className="w-3 h-3 text-amber-400" />
                  {tag.replace('_', ' ')}
                </span>
              ))}
            </div>

            {/* Customization Options */}
            {dish.optionGroups && dish.optionGroups.length > 0 && (
              <div className="space-y-4 pt-2 border-t border-neutral-800">
                <h3 className="text-sm font-bold text-neutral-200">Customize Your Plate</h3>
                {dish.optionGroups.map(group => {
                  const isSingleSelect = group.required;
                  return (
                    <div key={group.id} className="space-y-2.5">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-neutral-300">{group.title}</span>
                        <span className="text-[10px] text-amber-400/80 font-medium">
                          {group.required ? 'Required • Choose 1' : 'Optional'}
                        </span>
                      </div>

                      <div className="space-y-2">
                        {group.options.map(opt => {
                          const isSelected = selectedOptions.some(
                            o => o.groupId === group.id && o.optionId === opt.id
                          );
                          return (
                            <button
                              key={opt.id}
                              type="button"
                              onClick={() =>
                                handleOptionSelect(
                                  group.id,
                                  group.title,
                                  opt.id,
                                  opt.name,
                                  opt.price,
                                  isSingleSelect
                                )
                              }
                              className={`w-full p-3 rounded-xl border text-left flex items-center justify-between transition-all ${
                                isSelected
                                  ? 'bg-amber-500/10 border-amber-500/60 text-amber-300'
                                  : 'bg-neutral-800/40 border-neutral-800 text-neutral-300 hover:bg-neutral-800/70'
                              }`}
                            >
                              <div className="flex items-center gap-2.5">
                                <div
                                  className={`w-4 h-4 rounded-${
                                    isSingleSelect ? 'full' : 'md'
                                  } border flex items-center justify-center ${
                                    isSelected
                                      ? 'bg-amber-500 border-amber-500 text-neutral-950'
                                      : 'border-neutral-600'
                                  }`}
                                >
                                  {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                                </div>
                                <span className="text-xs font-medium">{opt.name}</span>
                              </div>
                              <span className="text-xs font-semibold">
                                {opt.price > 0 ? `+$${opt.price.toFixed(2)}` : 'Included'}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Special Instructions */}
            <div className="space-y-2 pt-2 border-t border-neutral-800">
              <label className="text-xs font-semibold text-neutral-300 block">
                Special Kitchen Requests
              </label>
              <textarea
                rows={2}
                placeholder="E.g. Extra parmesan, dressing on side, allergy notes..."
                value={specialInstructions}
                onChange={e => setSpecialInstructions(e.target.value)}
                className="w-full p-3 bg-neutral-800/50 border border-neutral-800 rounded-xl text-xs text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-amber-500/60 resize-none"
              />
            </div>

            {/* Customer Reviews for this dish */}
            {dishReviews.length > 0 && (
              <div className="space-y-2.5 pt-2 border-t border-neutral-800">
                <span className="text-xs font-semibold text-neutral-300 flex items-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5 text-amber-400" /> Diner Reviews for this dish
                </span>
                <div className="space-y-2">
                  {dishReviews.map(r => (
                    <div key={r.id} className="p-3 bg-neutral-800/30 rounded-xl border border-neutral-800/80 space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-neutral-200">{r.userName}</span>
                        <div className="flex items-center gap-1 text-amber-400">
                          <Star className="w-3 h-3 fill-amber-400" /> {r.rating}
                        </div>
                      </div>
                      <p className="text-xs text-neutral-400 font-light leading-relaxed">
                        "{r.comment}"
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Sticky Action Bar */}
        <div className="p-4 bg-neutral-950 border-t border-neutral-800 flex items-center justify-between gap-4">
          {/* Quantity Controls */}
          <div className="flex items-center bg-neutral-900 rounded-xl border border-neutral-800 p-1">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              disabled={quantity <= 1}
              className="p-2 rounded-lg text-neutral-400 hover:text-neutral-100 hover:bg-neutral-800 disabled:opacity-40 transition-colors"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="w-8 text-center text-xs font-bold text-neutral-100">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="p-2 rounded-lg text-neutral-400 hover:text-neutral-100 hover:bg-neutral-800 transition-colors"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAdd}
            className="flex-1 py-3 px-6 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs flex items-center justify-between transition-all shadow-lg shadow-amber-500/20"
          >
            <span className="flex items-center gap-2">
              <ShoppingBag className="w-4 h-4" />
              Add to Order
            </span>
            <span className="font-serif-display text-sm font-extrabold">
              ${totalPrice.toFixed(2)}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
