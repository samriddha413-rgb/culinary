import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { Navigation } from './components/Navigation';
import { ExploreView } from './components/ExploreView';
import { MenuExplorer } from './components/MenuExplorer';
import { TableBookingView } from './components/TableBookingView';
import { OrderTrackerView } from './components/OrderTrackerView';
import { FavoritesView } from './components/FavoritesView';
import { ReviewsView } from './components/ReviewsView';
import { AdminDashboard } from './components/AdminDashboard';
import { DishDetailModal } from './components/DishDetailModal';
import { CheckoutModal } from './components/CheckoutModal';
import { AuthModal } from './components/AuthModal';
import { NotificationToast } from './components/NotificationToast';
import { DeviceFrame } from './components/DeviceFrame';
import { Utensils, ShieldCheck, Heart, Sparkles } from 'lucide-react';

const MainAppContent: React.FC = () => {
  const { activeTab, currentRestaurant, setActiveTab } = useApp();

  return (
    <DeviceFrame>
      <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col font-['Plus_Jakarta_Sans',sans-serif]">
        {/* Persistent App Header */}
        <Header />

        {/* Navigation Bar (Desktop top tabs / Subnav) */}
        <Navigation />

        {/* Main Viewport Container */}
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 pb-24 md:pb-12">
          {activeTab === 'explore' && <ExploreView />}
          {activeTab === 'menu' && <MenuExplorer />}
          {activeTab === 'book' && <TableBookingView />}
          {activeTab === 'orders' && <OrderTrackerView />}
          {activeTab === 'favorites' && <FavoritesView />}
          {activeTab === 'reviews' && <ReviewsView />}
          {activeTab === 'admin' && <AdminDashboard />}
        </main>

        {/* Minimalist Footer */}
        <footer className="border-t border-neutral-800/80 bg-neutral-950/80 mt-auto py-8 text-xs text-neutral-400">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-amber-500 flex items-center justify-center text-neutral-950 font-bold">
                <Utensils className="w-3.5 h-3.5" />
              </div>
              <span className="font-bold text-neutral-200 font-serif-display text-sm">
                Culinaire Master Platform
              </span>
              <span className="text-neutral-500">• {currentRestaurant.name}</span>
            </div>

            <div className="flex items-center gap-4 text-[11px] text-neutral-400">
              <button onClick={() => setActiveTab('explore')} className="hover:text-amber-400 transition-colors">
                Explore
              </button>
              <button onClick={() => setActiveTab('menu')} className="hover:text-amber-400 transition-colors">
                Menu
              </button>
              <button onClick={() => setActiveTab('book')} className="hover:text-amber-400 transition-colors">
                Reserve Table
              </button>
              <button onClick={() => setActiveTab('admin')} className="text-amber-400 hover:underline">
                Master Admin Hub
              </button>
            </div>

            <div className="text-[10px] text-neutral-500 flex items-center gap-1">
              <span>Crafted for Web, iOS & Android Cross-Platform</span>
            </div>
          </div>
        </footer>

        {/* Global Floating Modals & Toasts */}
        <DishDetailModal />
        <CheckoutModal />
        <AuthModal />
        <NotificationToast />
      </div>
    </DeviceFrame>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainAppContent />
    </AppProvider>
  );
}
