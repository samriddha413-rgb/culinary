import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Sliders,
  Store,
  UtensilsCrossed,
  CalendarCheck,
  Clock,
  TrendingUp,
  Download,
  FileSpreadsheet,
  FileText,
  Plus,
  Edit2,
  Trash2,
  Check,
  X,
  Sparkles,
  Save,
  Bell,
  ChefHat,
  DollarSign,
  Users,
  Eye
} from 'lucide-react';
import { DietaryTag, MenuItem, Restaurant } from '../types';

export const AdminDashboard: React.FC = () => {
  const {
    currentRestaurant,
    updateRestaurant,
    menuItems,
    currentRestaurantMenu,
    addMenuItem,
    updateMenuItem,
    deleteMenuItem,
    bookings,
    updateBookingStatus,
    orders,
    updateOrderStatus,
    exportAnalyticsData,
    triggerTableAvailabilityAlert
  } = useApp();

  const [activeAdminSubtab, setActiveAdminSubtab] = useState<
    'overview' | 'restaurant_profile' | 'menu_manager' | 'bookings_manager' | 'orders_kds'
  >('overview');

  // Restaurant profile edit form state
  const [restForm, setRestForm] = useState<Restaurant>(currentRestaurant);

  // New / Edit Dish Modal
  const [isDishModalOpen, setIsDishModalOpen] = useState(false);
  const [editingDish, setEditingDish] = useState<MenuItem | null>(null);
  const [dishFormData, setDishFormData] = useState<Omit<MenuItem, 'id'>>({
    restaurantId: currentRestaurant.id,
    name: '',
    description: '',
    price: 20,
    category: currentRestaurant.categories[0] || 'Starters & Antipasti',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
    dietaryTags: ['chef_special'],
    preparationTimeMinutes: 15,
    calories: 450,
    isAvailable: true,
    rating: 5.0,
    reviewCount: 1
  });

  // Calculate Analytics
  const totalRevenue = orders.reduce((sum, o) => sum + (o.paymentStatus === 'paid' ? o.total : 0), 0);
  const averageOrderValue = orders.length > 0 ? totalRevenue / orders.length : 0;
  const activeBookingsCount = bookings.filter(b => b.status === 'confirmed').length;

  const handleSaveRestaurantProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateRestaurant(restForm);
  };

  const handleOpenNewDish = () => {
    setEditingDish(null);
    setDishFormData({
      restaurantId: currentRestaurant.id,
      name: '',
      description: '',
      price: 22,
      category: currentRestaurant.categories[0] || 'Handmade Pasta',
      image: 'https://images.unsplash.com/photo-1621996346565-e3d5d6281691?auto=format&fit=crop&w=800&q=80',
      dietaryTags: ['vegetarian'],
      preparationTimeMinutes: 15,
      calories: 500,
      isAvailable: true,
      rating: 5.0,
      reviewCount: 0
    });
    setIsDishModalOpen(true);
  };

  const handleOpenEditDish = (dish: MenuItem) => {
    setEditingDish(dish);
    setDishFormData({
      ...dish
    });
    setIsDishModalOpen(true);
  };

  const handleSaveDish = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingDish) {
      updateMenuItem({
        ...dishFormData,
        id: editingDish.id
      });
    } else {
      addMenuItem(dishFormData);
    }
    setIsDishModalOpen(false);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Admin Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-bold text-neutral-100 font-serif-display">
              Master Admin & Analytics Hub
            </h1>
            <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-400 text-xs font-bold border border-amber-500/40">
              Master Copy
            </span>
          </div>
          <p className="text-xs text-neutral-400 mt-1">
            Configure {currentRestaurant.name} branding, edit menus, manage table reservations, and export data reports.
          </p>
        </div>

        {/* Quick Report Export Actions */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => exportAnalyticsData('csv')}
            className="px-3.5 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-200 border border-neutral-750 text-xs font-semibold flex items-center gap-2 transition-colors"
          >
            <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
            <span>Export CSV</span>
          </button>
          <button
            onClick={() => exportAnalyticsData('json')}
            className="px-3.5 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-200 border border-neutral-750 text-xs font-semibold flex items-center gap-2 transition-colors"
          >
            <Download className="w-4 h-4 text-amber-400" />
            <span>Dataset JSON</span>
          </button>
          <button
            onClick={() => exportAnalyticsData('summary')}
            className="px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 text-xs font-bold flex items-center gap-2 transition-colors shadow-md shadow-amber-500/20"
          >
            <FileText className="w-4 h-4" />
            <span>Print Report</span>
          </button>
        </div>
      </div>

      {/* Admin Subtabs Bar */}
      <div className="flex items-center gap-2 overflow-x-auto border-b border-neutral-800 pb-3 scrollbar-none">
        {[
          { id: 'overview', label: 'Analytics & KPIs', icon: TrendingUp },
          { id: 'restaurant_profile', label: 'Restaurant & Locations', icon: Store },
          { id: 'menu_manager', label: `Menu Manager (${currentRestaurantMenu.length})`, icon: UtensilsCrossed },
          { id: 'bookings_manager', label: `Table Bookings (${bookings.length})`, icon: CalendarCheck },
          { id: 'orders_kds', label: `Kitchen Orders (${orders.length})`, icon: ChefHat }
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeAdminSubtab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveAdminSubtab(tab.id as any)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all whitespace-nowrap ${
                isActive
                  ? 'bg-amber-500 text-neutral-950 shadow-md font-bold'
                  : 'bg-neutral-900 text-neutral-400 hover:text-neutral-200 border border-neutral-800'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab 1: Overview & Analytics */}
      {activeAdminSubtab === 'overview' && (
        <div className="space-y-6">
          {/* Key Metric KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-3xl bg-neutral-900 border border-neutral-800 space-y-1">
              <div className="flex items-center justify-between text-neutral-400">
                <span className="text-xs font-semibold">Gross Revenue</span>
                <DollarSign className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-neutral-100 font-serif-display">
                ${totalRevenue.toFixed(2)}
              </div>
              <span className="text-[11px] text-emerald-400 font-medium">
                +14.8% vs last week
              </span>
            </div>

            <div className="p-5 rounded-3xl bg-neutral-900 border border-neutral-800 space-y-1">
              <div className="flex items-center justify-between text-neutral-400">
                <span className="text-xs font-semibold">Total Orders Processed</span>
                <ChefHat className="w-4 h-4 text-amber-400" />
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-neutral-100 font-serif-display">
                {orders.length}
              </div>
              <span className="text-[11px] text-neutral-400 font-medium">
                Avg Ticket: ${averageOrderValue.toFixed(2)}
              </span>
            </div>

            <div className="p-5 rounded-3xl bg-neutral-900 border border-neutral-800 space-y-1">
              <div className="flex items-center justify-between text-neutral-400">
                <span className="text-xs font-semibold">Active Table Reservations</span>
                <CalendarCheck className="w-4 h-4 text-amber-400" />
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-neutral-100 font-serif-display">
                {activeBookingsCount}
              </div>
              <span className="text-[11px] text-emerald-400 font-medium">
                86% Weekend Occupancy
              </span>
            </div>

            <div className="p-5 rounded-3xl bg-neutral-900 border border-neutral-800 space-y-1">
              <div className="flex items-center justify-between text-neutral-400">
                <span className="text-xs font-semibold">Customer Satisfaction</span>
                <Sparkles className="w-4 h-4 text-amber-400" />
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-neutral-100 font-serif-display">
                {currentRestaurant.rating} ⭐
              </div>
              <span className="text-[11px] text-neutral-400 font-medium">
                {currentRestaurant.reviewCount} verified ratings
              </span>
            </div>
          </div>

          {/* Revenue Breakdown & Popular Items Table */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-7 bg-neutral-900 border border-neutral-800 rounded-3xl p-6 space-y-4">
              <h3 className="text-sm font-bold text-neutral-100 font-serif-display">
                Menu Item Performance & Margins
              </h3>
              <div className="divide-y divide-neutral-800 overflow-hidden">
                {currentRestaurantMenu.slice(0, 5).map(item => (
                  <div key={item.id} className="py-3 flex items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-10 h-10 rounded-xl object-cover shrink-0"
                      />
                      <div>
                        <h4 className="font-bold text-neutral-200">{item.name}</h4>
                        <span className="text-[10px] text-neutral-400">{item.category}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-neutral-100 font-serif-display">
                        ${item.price.toFixed(2)}
                      </div>
                      <span className="text-[10px] text-amber-400 font-medium">
                        ⭐ {item.rating} ({item.reviewCount} reviews)
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5 bg-neutral-900 border border-neutral-800 rounded-3xl p-6 space-y-4">
              <h3 className="text-sm font-bold text-neutral-100 font-serif-display">
                Peak Dining Hours Analytics
              </h3>
              <div className="space-y-3 text-xs">
                {[
                  { time: '6:00 PM - 7:00 PM', pct: 65, label: 'Early Evening Dining' },
                  { time: '7:30 PM - 9:00 PM', pct: 98, label: 'Peak Gastronomy Rush' },
                  { time: '9:00 PM - 10:30 PM', pct: 82, label: 'Late Night Sommelier' }
                ].map((slot, i) => (
                  <div key={i} className="space-y-1">
                    <div className="flex justify-between text-neutral-300">
                      <span>{slot.time}</span>
                      <span className="font-bold text-amber-400">{slot.pct}% Capacity</span>
                    </div>
                    <div className="h-2 w-full bg-neutral-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-amber-500 to-amber-400 rounded-full"
                        style={{ width: `${slot.pct}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-2 text-xs">
                <span className="font-bold text-neutral-200 block">Table Availability Broadcast</span>
                <p className="text-[11px] text-neutral-400">
                  Send a push notification blast to all customers waitlisted for table cancellations.
                </p>
                <button
                  onClick={() => triggerTableAvailabilityAlert('Tonight', '8:00 PM')}
                  className="w-full py-2 bg-neutral-800 hover:bg-neutral-700 text-amber-400 rounded-xl font-bold transition-colors flex items-center justify-center gap-1.5"
                >
                  <Bell className="w-3.5 h-3.5" /> Broadcast Availability Alert
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Restaurant Profile & Master Location Editor */}
      {activeAdminSubtab === 'restaurant_profile' && (
        <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
            <div>
              <h2 className="text-lg font-bold text-neutral-100 font-serif-display">
                Master Restaurant Identity & Location
              </h2>
              <p className="text-xs text-neutral-400 mt-0.5">
                Update restaurant profile, street address, operating hours, and contact details.
              </p>
            </div>
          </div>

          <form onSubmit={handleSaveRestaurantProfile} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-neutral-300 block mb-1">
                  Establishment Name
                </label>
                <input
                  type="text"
                  required
                  value={restForm.name}
                  onChange={e => setRestForm({ ...restForm, name: e.target.value })}
                  className="w-full px-3 py-2 bg-neutral-800 border border-neutral-750 rounded-xl text-xs text-neutral-100 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-neutral-300 block mb-1">
                  Tagline / Culinary Philosophy
                </label>
                <input
                  type="text"
                  required
                  value={restForm.tagline}
                  onChange={e => setRestForm({ ...restForm, tagline: e.target.value })}
                  className="w-full px-3 py-2 bg-neutral-800 border border-neutral-750 rounded-xl text-xs text-neutral-100 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-neutral-300 block mb-1">
                  Street Address
                </label>
                <input
                  type="text"
                  required
                  value={restForm.location.address}
                  onChange={e =>
                    setRestForm({
                      ...restForm,
                      location: { ...restForm.location, address: e.target.value }
                    })
                  }
                  className="w-full px-3 py-2 bg-neutral-800 border border-neutral-750 rounded-xl text-xs text-neutral-100 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-neutral-300 block mb-1">
                  Neighborhood & City
                </label>
                <input
                  type="text"
                  required
                  value={restForm.location.neighborhood}
                  onChange={e =>
                    setRestForm({
                      ...restForm,
                      location: { ...restForm.location, neighborhood: e.target.value }
                    })
                  }
                  className="w-full px-3 py-2 bg-neutral-800 border border-neutral-750 rounded-xl text-xs text-neutral-100 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-neutral-300 block mb-1">
                  Direct Phone
                </label>
                <input
                  type="text"
                  value={restForm.phone}
                  onChange={e => setRestForm({ ...restForm, phone: e.target.value })}
                  className="w-full px-3 py-2 bg-neutral-800 border border-neutral-750 rounded-xl text-xs text-neutral-100 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-neutral-300 block mb-1">
                  Reservation Email
                </label>
                <input
                  type="email"
                  value={restForm.email}
                  onChange={e => setRestForm({ ...restForm, email: e.target.value })}
                  className="w-full px-3 py-2 bg-neutral-800 border border-neutral-750 rounded-xl text-xs text-neutral-100 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-xs font-semibold text-neutral-300 block mb-1">
                  Hero Banner Image URL
                </label>
                <input
                  type="url"
                  value={restForm.bannerImage}
                  onChange={e => setRestForm({ ...restForm, bannerImage: e.target.value })}
                  className="w-full px-3 py-2 bg-neutral-800 border border-neutral-750 rounded-xl text-xs text-neutral-100 focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs flex items-center gap-2 shadow-lg shadow-amber-500/20"
            >
              <Save className="w-4 h-4" /> Save Profile Settings
            </button>
          </form>
        </div>
      )}

      {/* Tab 3: Menu Manager */}
      {activeAdminSubtab === 'menu_manager' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-neutral-100 font-serif-display">
              Menu Items Catalog ({currentRestaurantMenu.length})
            </h2>
            <button
              onClick={handleOpenNewDish}
              className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs flex items-center gap-1.5 shadow-md"
            >
              <Plus className="w-4 h-4" /> Add New Dish
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {currentRestaurantMenu.map(dish => (
              <div
                key={dish.id}
                className="p-4 rounded-2xl bg-neutral-900 border border-neutral-800 flex flex-col justify-between space-y-3"
              >
                <div className="flex items-start gap-3">
                  <img
                    src={dish.image}
                    alt={dish.name}
                    className="w-16 h-16 rounded-xl object-cover shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <span className="text-[10px] font-bold text-amber-500 uppercase">
                      {dish.category}
                    </span>
                    <h4 className="text-xs font-bold text-neutral-100 truncate">{dish.name}</h4>
                    <p className="text-[11px] text-neutral-400 line-clamp-1">{dish.description}</p>
                    <div className="text-xs font-bold text-neutral-200 mt-1 font-serif-display">
                      ${dish.price.toFixed(2)}
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-neutral-800 flex items-center justify-between text-xs">
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      dish.isAvailable ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'
                    }`}
                  >
                    {dish.isAvailable ? 'In Stock' : 'Sold Out'}
                  </span>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleOpenEditDish(dish)}
                      className="p-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 transition-colors"
                      title="Edit dish"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => deleteMenuItem(dish.id)}
                      className="p-1.5 rounded-lg bg-neutral-800 hover:bg-rose-900/40 text-neutral-400 hover:text-rose-400 transition-colors"
                      title="Delete dish"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: Table Bookings Queue */}
      {activeAdminSubtab === 'bookings_manager' && (
        <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 space-y-4">
          <h2 className="text-lg font-bold text-neutral-100 font-serif-display">
            Live Reservation Queue ({bookings.length})
          </h2>

          {bookings.length === 0 ? (
            <div className="py-8 text-center text-xs text-neutral-500">
              No reservations recorded yet.
            </div>
          ) : (
            <div className="divide-y divide-neutral-800">
              {bookings.map(booking => (
                <div key={booking.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-neutral-100">{booking.customerName}</span>
                      <span className="text-xs text-neutral-400 font-mono">({booking.id})</span>
                      <span
                        className={`px-2 py-0.2 rounded-full text-[10px] font-bold ${
                          booking.status === 'confirmed'
                            ? 'bg-emerald-500/20 text-emerald-400'
                            : 'bg-neutral-800 text-neutral-400'
                        }`}
                      >
                        {booking.status.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-xs text-neutral-400">
                      {booking.date} at {booking.timeSlot} • {booking.partySize} Guests • {booking.tableType} ({booking.tableNumber || 'Auto-assign'})
                    </p>
                    <p className="text-[11px] text-neutral-500">
                      Contact: {booking.customerEmail} | {booking.customerPhone}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateBookingStatus(booking.id, 'seated')}
                      className="px-3 py-1.5 bg-emerald-500 text-neutral-950 rounded-xl text-xs font-bold"
                    >
                      Seat Guest
                    </button>
                    <button
                      onClick={() => updateBookingStatus(booking.id, 'cancelled')}
                      className="px-3 py-1.5 bg-neutral-800 text-neutral-400 hover:text-rose-400 rounded-xl text-xs"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab 5: Kitchen Orders KDS */}
      {activeAdminSubtab === 'orders_kds' && (
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-neutral-100 font-serif-display">
            Kitchen Display System (KDS) & Order Dispatcher
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {orders.map(order => (
              <div
                key={order.id}
                className="p-5 rounded-3xl bg-neutral-900 border border-neutral-800 space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-amber-400 font-mono">
                      {order.orderNumber}
                    </span>
                    <span className="text-xs uppercase font-bold px-2 py-0.5 rounded bg-neutral-800 text-neutral-200">
                      {order.status}
                    </span>
                  </div>
                  <div className="text-xs text-neutral-300 font-semibold">
                    {order.customerName} ({order.orderType})
                  </div>
                  <div className="text-xs text-neutral-400 space-y-1">
                    {order.items.map((it, idx) => (
                      <div key={idx}>
                        {it.quantity}x {it.menuItem.name}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-neutral-800 flex items-center justify-between">
                  <span className="text-sm font-bold text-neutral-100 font-serif-display">
                    ${order.total.toFixed(2)}
                  </span>
                  <div className="flex items-center gap-1.5">
                    {order.status === 'placed' && (
                      <button
                        onClick={() => updateOrderStatus(order.id, 'confirmed')}
                        className="px-3 py-1 bg-amber-500 text-neutral-950 text-xs font-bold rounded-lg"
                      >
                        Accept
                      </button>
                    )}
                    {order.status === 'confirmed' && (
                      <button
                        onClick={() => updateOrderStatus(order.id, 'preparing')}
                        className="px-3 py-1 bg-amber-500 text-neutral-950 text-xs font-bold rounded-lg"
                      >
                        Start Cooking
                      </button>
                    )}
                    {order.status === 'preparing' && (
                      <button
                        onClick={() =>
                          updateOrderStatus(
                            order.id,
                            order.orderType === 'delivery' ? 'out_for_delivery' : 'ready_for_pickup'
                          )
                        }
                        className="px-3 py-1 bg-amber-500 text-neutral-950 text-xs font-bold rounded-lg"
                      >
                        Ready / Dispatch
                      </button>
                    )}
                    {(order.status === 'out_for_delivery' || order.status === 'ready_for_pickup') && (
                      <button
                        onClick={() => updateOrderStatus(order.id, 'completed')}
                        className="px-3 py-1 bg-emerald-500 text-neutral-950 text-xs font-bold rounded-lg"
                      >
                        Complete
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Dish Add/Edit Modal */}
      {isDishModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="relative w-full max-w-lg bg-neutral-900 border border-neutral-800 rounded-3xl p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
              <h3 className="text-base font-bold text-neutral-100 font-serif-display">
                {editingDish ? 'Edit Menu Dish' : 'Add New Culinary Plate'}
              </h3>
              <button
                onClick={() => setIsDishModalOpen(false)}
                className="text-neutral-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveDish} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-neutral-300 block mb-1">Dish Name</label>
                <input
                  type="text"
                  required
                  value={dishFormData.name}
                  onChange={e => setDishFormData({ ...dishFormData, name: e.target.value })}
                  className="w-full px-3 py-2 bg-neutral-800 border border-neutral-750 rounded-xl text-xs text-neutral-100 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-neutral-300 block mb-1">Category</label>
                  <select
                    value={dishFormData.category}
                    onChange={e => setDishFormData({ ...dishFormData, category: e.target.value })}
                    className="w-full px-3 py-2 bg-neutral-800 border border-neutral-750 rounded-xl text-xs text-neutral-100 focus:outline-none focus:border-amber-500"
                  >
                    {currentRestaurant.categories.map(cat => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-neutral-300 block mb-1">Price ($)</label>
                  <input
                    type="number"
                    step="0.5"
                    required
                    value={dishFormData.price}
                    onChange={e => setDishFormData({ ...dishFormData, price: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-neutral-800 border border-neutral-750 rounded-xl text-xs text-neutral-100 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-neutral-300 block mb-1">Description</label>
                <textarea
                  rows={2}
                  required
                  value={dishFormData.description}
                  onChange={e => setDishFormData({ ...dishFormData, description: e.target.value })}
                  className="w-full p-3 bg-neutral-800 border border-neutral-750 rounded-xl text-xs text-neutral-100 focus:outline-none focus:border-amber-500 resize-none"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-neutral-300 block mb-1">Photo URL</label>
                <input
                  type="url"
                  required
                  value={dishFormData.image}
                  onChange={e => setDishFormData({ ...dishFormData, image: e.target.value })}
                  className="w-full px-3 py-2 bg-neutral-800 border border-neutral-750 rounded-xl text-xs text-neutral-100 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="submit"
                  className="flex-1 py-3 bg-amber-500 text-neutral-950 font-bold text-xs rounded-xl shadow-md"
                >
                  {editingDish ? 'Save Changes' : 'Create Dish'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
