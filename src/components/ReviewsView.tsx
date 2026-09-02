import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Star,
  ThumbsUp,
  MessageSquarePlus,
  CheckCircle2,
  Filter,
  Sparkles,
  Award,
  ChevronDown,
  X,
  ShieldCheck
} from 'lucide-react';

export const ReviewsView: React.FC = () => {
  const {
    currentRestaurant,
    currentRestaurantReviews,
    currentRestaurantMenu,
    addReview,
    voteReviewHelpful,
    user
  } = useApp();

  const [isWriteModalOpen, setIsWriteModalOpen] = useState(false);
  const [selectedRatingFilter, setSelectedRatingFilter] = useState<number | 'all'>('all');

  // Form state
  const [rating, setRating] = useState(5);
  const [foodRating, setFoodRating] = useState(5);
  const [serviceRating, setServiceRating] = useState(5);
  const [ambianceRating, setAmbianceRating] = useState(5);
  const [valueRating, setValueRating] = useState(5);
  const [selectedDishName, setSelectedDishName] = useState(currentRestaurantMenu[0]?.name || '');
  const [comment, setComment] = useState('');
  const [authorName, setAuthorName] = useState(user?.name || 'Alexander Wright');

  const filteredReviews = currentRestaurantReviews.filter(r => {
    if (selectedRatingFilter === 'all') return true;
    return Math.floor(r.rating) === selectedRatingFilter;
  });

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;

    addReview({
      restaurantId: currentRestaurant.id,
      userName: authorName,
      userAvatar: user?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
      rating,
      dishRecommended: selectedDishName,
      comment,
      verifiedDining: true,
      ratingsBreakdown: {
        food: foodRating,
        service: serviceRating,
        ambiance: ambianceRating,
        value: valueRating
      }
    });

    setComment('');
    setIsWriteModalOpen(false);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Top Ratings Overview Section */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 sm:p-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          {/* Left 4 Cols: Big Score */}
          <div className="md:col-span-4 text-center md:text-left space-y-2 border-b md:border-b-0 md:border-r border-neutral-800 pb-6 md:pb-0 md:pr-6">
            <span className="text-xs uppercase font-bold tracking-wider text-amber-400">
              Verified Diner Ratings
            </span>
            <div className="flex items-center justify-center md:justify-start gap-3">
              <h2 className="text-4xl sm:text-5xl font-bold text-neutral-100 font-serif-display">
                {currentRestaurant.rating}
              </h2>
              <div>
                <div className="flex items-center text-amber-400">
                  {[1, 2, 3, 4, 5].map(star => (
                    <Star key={star} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <span className="text-xs text-neutral-400 block mt-0.5">
                  Based on {currentRestaurant.reviewCount} reviews
                </span>
              </div>
            </div>
            <button
              onClick={() => setIsWriteModalOpen(true)}
              className="mt-3 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md shadow-amber-500/20 w-full sm:w-auto"
            >
              <MessageSquarePlus className="w-4 h-4" />
              Write a Review
            </button>
          </div>

          {/* Right 8 Cols: Sub-category Ratings Breakdown */}
          <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-3.5 rounded-2xl bg-neutral-950/60 border border-neutral-800 text-center space-y-1">
              <span className="text-xs text-neutral-400">Food Quality</span>
              <div className="text-xl font-bold text-neutral-100 font-serif-display">4.9 / 5.0</div>
              <span className="text-[10px] text-emerald-400 font-medium">Exceptional</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-neutral-950/60 border border-neutral-800 text-center space-y-1">
              <span className="text-xs text-neutral-400">Service</span>
              <div className="text-xl font-bold text-neutral-100 font-serif-display">4.8 / 5.0</div>
              <span className="text-[10px] text-emerald-400 font-medium">Attentive</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-neutral-950/60 border border-neutral-800 text-center space-y-1">
              <span className="text-xs text-neutral-400">Ambiance</span>
              <div className="text-xl font-bold text-neutral-100 font-serif-display">4.9 / 5.0</div>
              <span className="text-[10px] text-emerald-400 font-medium">Romantic & Moody</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-neutral-950/60 border border-neutral-800 text-center space-y-1">
              <span className="text-xs text-neutral-400">Value & Pricing</span>
              <div className="text-xl font-bold text-neutral-100 font-serif-display">4.7 / 5.0</div>
              <span className="text-[10px] text-amber-400 font-medium">High Craft</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <button
            onClick={() => setSelectedRatingFilter('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
              selectedRatingFilter === 'all'
                ? 'bg-amber-500 text-neutral-950 font-bold'
                : 'bg-neutral-900 text-neutral-400 hover:text-neutral-200 border border-neutral-800'
            }`}
          >
            All Reviews ({currentRestaurantReviews.length})
          </button>
          {[5, 4].map(stars => (
            <button
              key={stars}
              onClick={() => setSelectedRatingFilter(stars)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1 transition-colors ${
                selectedRatingFilter === stars
                  ? 'bg-amber-500 text-neutral-950 font-bold'
                  : 'bg-neutral-900 text-neutral-400 hover:text-neutral-200 border border-neutral-800'
              }`}
            >
              <Star className="w-3 h-3 fill-amber-400" />
              <span>{stars} Stars</span>
            </button>
          ))}
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {filteredReviews.map(rev => (
          <div
            key={rev.id}
            className="p-5 sm:p-6 rounded-3xl bg-neutral-900/80 border border-neutral-800 space-y-4 shadow-sm"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <img
                  src={rev.userAvatar}
                  alt={rev.userName}
                  className="w-10 h-10 rounded-full object-cover ring-1 ring-amber-500/30"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-bold text-neutral-100">{rev.userName}</h4>
                    {rev.verifiedDining && (
                      <span className="px-2 py-0.2 rounded-md bg-emerald-500/20 text-emerald-400 text-[10px] font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> Verified Diner
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] text-neutral-500">{rev.date}</span>
                </div>
              </div>

              <div className="flex items-center gap-1 bg-neutral-950 px-2.5 py-1 rounded-lg border border-neutral-800 text-amber-400 font-bold text-xs">
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                <span>{rev.rating}</span>
              </div>
            </div>

            {/* Recommended dish badge */}
            {rev.dishRecommended && (
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-medium">
                <Sparkles className="w-3 h-3" />
                <span>Recommended: {rev.dishRecommended}</span>
              </div>
            )}

            {/* Comment */}
            <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed">
              "{rev.comment}"
            </p>

            {/* Ratings Breakdown Pills if available */}
            {rev.ratingsBreakdown && (
              <div className="flex flex-wrap gap-2 text-[11px] text-neutral-400 pt-1">
                <span className="bg-neutral-950 px-2 py-0.5 rounded-md border border-neutral-800">
                  Food: {rev.ratingsBreakdown.food}⭐
                </span>
                <span className="bg-neutral-950 px-2 py-0.5 rounded-md border border-neutral-800">
                  Service: {rev.ratingsBreakdown.service}⭐
                </span>
                <span className="bg-neutral-950 px-2 py-0.5 rounded-md border border-neutral-800">
                  Ambiance: {rev.ratingsBreakdown.ambiance}⭐
                </span>
              </div>
            )}

            {/* Helpful button */}
            <div className="pt-2 border-t border-neutral-800/80 flex items-center justify-between text-xs text-neutral-400">
              <span>Was this review helpful?</span>
              <button
                onClick={() => voteReviewHelpful(rev.id)}
                className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-neutral-800 hover:bg-neutral-750 text-neutral-300 hover:text-amber-400 transition-colors"
              >
                <ThumbsUp className="w-3.5 h-3.5" />
                <span>Helpful ({rev.helpfulCount})</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Write a Review Modal */}
      {isWriteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="relative w-full max-w-lg bg-neutral-900 border border-neutral-800 rounded-3xl p-6 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
              <h3 className="text-base font-bold text-neutral-100 font-serif-display flex items-center gap-2">
                <Award className="w-4 h-4 text-amber-400" /> Write Dining Review
              </h3>
              <button
                onClick={() => setIsWriteModalOpen(false)}
                className="text-neutral-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitReview} className="space-y-4">
              {/* Star rating selector */}
              <div>
                <label className="text-xs font-semibold text-neutral-300 block mb-1">
                  Overall Rating
                </label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map(num => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setRating(num)}
                      className="p-1 text-2xl transition-transform hover:scale-110"
                    >
                      <Star
                        className={`w-7 h-7 ${
                          num <= rating ? 'fill-amber-400 text-amber-400' : 'text-neutral-600'
                        }`}
                      />
                    </button>
                  ))}
                  <span className="text-xs font-bold text-amber-400 ml-2">{rating}.0 / 5.0</span>
                </div>
              </div>

              {/* Recommended dish dropdown */}
              <div>
                <label className="text-xs font-semibold text-neutral-300 block mb-1">
                  Standout Dish to Recommend
                </label>
                <select
                  value={selectedDishName}
                  onChange={e => setSelectedDishName(e.target.value)}
                  className="w-full px-3 py-2 bg-neutral-800 border border-neutral-750 rounded-xl text-xs text-neutral-100 focus:outline-none focus:border-amber-500"
                >
                  {currentRestaurantMenu.map(m => (
                    <option key={m.id} value={m.name}>
                      {m.name} (${m.price.toFixed(2)})
                    </option>
                  ))}
                </select>
              </div>

              {/* Comment text */}
              <div>
                <label className="text-xs font-semibold text-neutral-300 block mb-1">
                  Your Gastronomic Experience
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Share details about flavor balance, presentation, wine pairings, and hospitality..."
                  value={comment}
                  onChange={e => setComment(e.target.value)}
                  className="w-full p-3 bg-neutral-800 border border-neutral-750 rounded-xl text-xs text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-amber-500 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs shadow-lg shadow-amber-500/20"
              >
                Publish Review
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
