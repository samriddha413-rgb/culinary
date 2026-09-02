import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  User,
  Mail,
  ShieldCheck,
  CheckCircle2,
  LogOut,
  MapPin,
  Heart,
  CalendarCheck,
  Smartphone,
  Sparkles
} from 'lucide-react';

export const AuthModal: React.FC = () => {
  const {
    isAuthModalOpen,
    setIsAuthModalOpen,
    user,
    loginWithProvider,
    logout,
    orders,
    bookings,
    favorites
  } = useApp();

  const [emailInput, setEmailInput] = useState('');

  if (!isAuthModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-neutral-900 border border-neutral-800 rounded-3xl p-6 sm:p-7 space-y-6 shadow-2xl">
        {/* Close button */}
        <button
          onClick={() => setIsAuthModalOpen(false)}
          className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-neutral-800 text-neutral-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {user ? (
          /* Logged In Profile View */
          <div className="space-y-6">
            <div className="text-center space-y-3">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-20 h-20 rounded-full mx-auto object-cover ring-2 ring-amber-500/50 shadow-xl"
              />
              <div>
                <h3 className="text-lg font-bold text-neutral-100 font-serif-display">{user.name}</h3>
                <p className="text-xs text-neutral-400">{user.email}</p>
                <span className="inline-block mt-1 px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-400 text-[10px] font-bold border border-amber-500/30">
                  {user.provider.toUpperCase()} AUTHENTICATED
                </span>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-2 py-3 border-y border-neutral-800 text-center">
              <div className="space-y-0.5">
                <span className="text-base font-bold text-neutral-100 font-serif-display">
                  {orders.length}
                </span>
                <span className="text-[10px] text-neutral-400 block">Orders</span>
              </div>
              <div className="space-y-0.5">
                <span className="text-base font-bold text-neutral-100 font-serif-display">
                  {bookings.length}
                </span>
                <span className="text-[10px] text-neutral-400 block">Bookings</span>
              </div>
              <div className="space-y-0.5">
                <span className="text-base font-bold text-neutral-100 font-serif-display">
                  {favorites.itemIds.length}
                </span>
                <span className="text-[10px] text-neutral-400 block">Saved Dishes</span>
              </div>
            </div>

            {/* Saved Address */}
            {user.savedAddresses && user.savedAddresses.length > 0 && (
              <div className="space-y-2">
                <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider">
                  Default Delivery Location
                </span>
                <div className="p-3 rounded-2xl bg-neutral-950 border border-neutral-800 text-xs flex items-center gap-2.5 text-neutral-300">
                  <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
                  <span className="truncate">{user.savedAddresses[0].address}</span>
                </div>
              </div>
            )}

            <button
              onClick={() => {
                logout();
                setIsAuthModalOpen(false);
              }}
              className="w-full py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-750 text-rose-400 font-bold text-xs flex items-center justify-center gap-2 transition-colors border border-neutral-700"
            >
              <LogOut className="w-4 h-4" /> Sign Out
            </button>
          </div>
        ) : (
          /* Social Login Options */
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mx-auto">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-neutral-100 font-serif-display">
                Sign in to Culinaire
              </h3>
              <p className="text-xs text-neutral-400 max-w-xs mx-auto">
                Access table reservations, real-time live order tracking, and synced offline favorites.
              </p>
            </div>

            {/* Social Buttons */}
            <div className="space-y-2.5">
              {/* Google */}
              <button
                onClick={() => loginWithProvider('google')}
                className="w-full py-3 px-4 rounded-2xl bg-white hover:bg-neutral-100 text-neutral-900 font-bold text-xs flex items-center justify-center gap-3 transition-colors shadow-md"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                <span>Continue with Google</span>
              </button>

              {/* Apple */}
              <button
                onClick={() => loginWithProvider('apple')}
                className="w-full py-3 px-4 rounded-2xl bg-neutral-950 hover:bg-black text-white font-bold text-xs flex items-center justify-center gap-3 transition-colors border border-neutral-700"
              >
                <svg className="w-4 h-4 fill-white" viewBox="0 0 170 170">
                  <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.69-3.08-7.7-7.94-12.04-14.58-6.19-9.52-11.05-20.2-14.58-32.05-3.53-11.84-5.3-23.36-5.3-34.55 0-14.75 3.69-26.68 11.06-35.8 7.37-9.12 16.59-13.79 27.67-14.02 5.02 0 10.49 1.34 16.4 4.02 5.91 2.68 9.94 4.08 12.09 4.19 1.79 0 6.03-1.51 12.74-4.52 6.71-3.01 12.4-4.24 17.07-3.69 13.06 1.12 23.34 6.25 30.84 15.41-11.49 6.92-17.13 16.3-16.92 28.14.22 9.28 3.8 17.07 10.74 23.36 6.94 6.28 15.09 9.87 24.45 10.77-2.12 6.47-4.68 12.72-7.69 18.75zM119.22 31.86c0-7.37 2.68-14.19 8.04-20.46 5.36-6.28 11.95-10.16 19.78-11.65.67 4.25.33 8.71-1.02 13.39-1.35 4.69-3.79 9.1-7.32 13.23-3.91 4.58-8.38 7.82-13.41 9.72-5.02 1.89-9.04 2.82-12.07 2.79.22-2.35.33-4.69.33-7.02z" />
                </svg>
                <span>Continue with Apple</span>
              </button>
            </div>

            <div className="relative flex py-2 items-center">
              <div className="flex-grow border-t border-neutral-800"></div>
              <span className="flex-shrink mx-4 text-[10px] text-neutral-500 uppercase tracking-wider">
                Or Instant Demo
              </span>
              <div className="flex-grow border-t border-neutral-800"></div>
            </div>

            {/* Quick Demo Gourmet Button */}
            <button
              onClick={() => loginWithProvider('guest')}
              className="w-full py-2.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-bold transition-all"
            >
              Sign in as Demo Gourmet Diner 🥂
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
