import React, { createContext, useContext, useState, useEffect, useMemo, ReactNode } from 'react';
import {
  Restaurant,
  MenuItem,
  RestaurantReview,
  CartItem,
  Order,
  UserProfile,
  TableBooking,
  TableAlertSubscription,
  NotificationItem,
  DeviceFrameType,
  ActiveTab,
  DietaryTag,
  PaymentMethod,
  OrderStatus
} from '../types';
import {
  INITIAL_RESTAURANTS,
  INITIAL_MENU_ITEMS,
  INITIAL_REVIEWS,
  INITIAL_USER,
  INITIAL_ORDERS,
  INITIAL_BOOKINGS
} from '../data/initialData';
import confetti from 'canvas-confetti';

interface AppContextType {
  // Theme & Device
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  deviceFrame: DeviceFrameType;
  setDeviceFrame: (frame: DeviceFrameType) => void;
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  isOfflineSimulated: boolean;
  setIsOfflineSimulated: (val: boolean) => void;

  // Restaurants & Master Admin Editing
  restaurants: Restaurant[];
  currentRestaurant: Restaurant;
  setCurrentRestaurantId: (id: string) => void;
  updateRestaurant: (restaurant: Restaurant) => void;

  // Menu Items & Admin CRUD
  menuItems: MenuItem[];
  currentRestaurantMenu: MenuItem[];
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedDietaryTags: DietaryTag[];
  toggleDietaryTag: (tag: DietaryTag) => void;
  addMenuItem: (item: Omit<MenuItem, 'id'>) => void;
  updateMenuItem: (item: MenuItem) => void;
  deleteMenuItem: (id: string) => void;

  // Cart
  cart: CartItem[];
  cartCount: number;
  cartSubtotal: number;
  cartTotal: number;
  addToCart: (item: MenuItem, quantity?: number, selectedOptions?: CartItem['selectedOptions'], specialInstructions?: string) => void;
  updateCartItemQuantity: (cartItemId: string, delta: number) => void;
  removeFromCart: (cartItemId: string) => void;
  clearCart: () => void;

  // Active Selected Dish Modal
  selectedDishModal: MenuItem | null;
  setSelectedDishModal: (item: MenuItem | null) => void;

  // Orders & Real-time Tracking
  orders: Order[];
  activeOrder: Order | null;
  setActiveOrderId: (id: string | null) => void;
  placeOrder: (details: {
    orderType: 'dine_in' | 'delivery' | 'pickup';
    paymentMethod: PaymentMethod;
    deliveryAddress?: string;
    tableNumber?: string;
    tipAmount?: number;
    specialNotes?: string;
  }) => Order;
  updateOrderStatus: (orderId: string, newStatus: OrderStatus) => void;
  cancelOrder: (orderId: string) => void;

  // Table Bookings & Push Availability Alerts
  bookings: TableBooking[];
  activeBookingModal: boolean;
  setActiveBookingModal: (open: boolean) => void;
  bookTable: (details: {
    partySize: number;
    date: string;
    timeSlot: string;
    tableType: string;
    specialRequest?: string;
    customerName: string;
    customerEmail: string;
    customerPhone: string;
  }) => TableBooking;
  cancelBooking: (bookingId: string) => void;
  updateBookingStatus: (bookingId: string, status: TableBooking['status']) => void;
  
  // Table Alert Subscriptions (Push notifications)
  tableAlerts: TableAlertSubscription[];
  subscribeTableAlert: (params: { date: string; timeSlot: string; partySize: number }) => void;
  triggerTableAvailabilityAlert: (date: string, timeSlot: string) => void;

  // Reviews & Ratings
  reviews: RestaurantReview[];
  currentRestaurantReviews: RestaurantReview[];
  addReview: (review: Omit<RestaurantReview, 'id' | 'date' | 'helpfulCount'>) => void;
  voteReviewHelpful: (reviewId: string) => void;

  // Favorites & Offline Access
  favorites: {
    itemIds: string[];
    restaurantIds: string[];
  };
  toggleFavoriteItem: (itemId: string) => void;
  toggleFavoriteRestaurant: (restaurantId: string) => void;
  isItemFavorite: (itemId: string) => boolean;
  isRestaurantFavorite: (restaurantId: string) => boolean;
  offlineSavedItems: MenuItem[];

  // User & Auth
  user: UserProfile | null;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  loginWithProvider: (provider: 'google' | 'apple' | 'email' | 'guest', customEmail?: string) => void;
  logout: () => void;
  updateUserProfile: (profile: Partial<UserProfile>) => void;

  // Notifications
  notifications: NotificationItem[];
  unreadNotificationCount: number;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  pushNotificationToast: NotificationItem | null;
  dismissToast: () => void;

  // Checkout Modal State
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;

  // Analytics & Data Export
  exportAnalyticsData: (format: 'csv' | 'json' | 'summary') => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'culinaire_app_state_v1';

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // 1. Theme & Device frame
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);
  const [deviceFrame, setDeviceFrame] = useState<DeviceFrameType>('responsive');
  const [activeTab, setActiveTab] = useState<ActiveTab>('explore');
  const [isOfflineSimulated, setIsOfflineSimulated] = useState<boolean>(false);

  // 2. Restaurants
  const [restaurants, setRestaurants] = useState<Restaurant[]>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_restaurants`);
    if (!saved) return INITIAL_RESTAURANTS;
    try {
      const parsed: Restaurant[] = JSON.parse(saved);
      const existingIds = new Set(parsed.map(r => r.id));
      const missing = INITIAL_RESTAURANTS.filter(r => !existingIds.has(r.id));
      return [...parsed, ...missing];
    } catch {
      return INITIAL_RESTAURANTS;
    }
  });
  const [currentRestaurantId, setCurrentRestaurantId] = useState<string>(() => {
    return 'rest-sakho-laksha';
  });

  // 3. Menu Items
  const [menuItems, setMenuItems] = useState<MenuItem[]>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_menu`);
    if (!saved) return INITIAL_MENU_ITEMS;
    try {
      const parsed: MenuItem[] = JSON.parse(saved);
      const existingIds = new Set(parsed.map(m => m.id));
      const missing = INITIAL_MENU_ITEMS.filter(m => !existingIds.has(m.id));
      return [...parsed, ...missing];
    } catch {
      return INITIAL_MENU_ITEMS;
    }
  });
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedDietaryTags, setSelectedDietaryTags] = useState<DietaryTag[]>([]);
  const [selectedDishModal, setSelectedDishModal] = useState<MenuItem | null>(null);

  // 4. Cart
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_cart`);
    return saved ? JSON.parse(saved) : [];
  });
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);

  // 5. Orders & Live Tracking
  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_orders`);
    return saved ? JSON.parse(saved) : INITIAL_ORDERS;
  });
  const [activeOrderId, setActiveOrderId] = useState<string | null>(orders[0]?.id || null);

  // 6. Table Bookings & Alerts
  const [bookings, setBookings] = useState<TableBooking[]>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_bookings`);
    return saved ? JSON.parse(saved) : INITIAL_BOOKINGS;
  });
  const [activeBookingModal, setActiveBookingModal] = useState<boolean>(false);
  const [tableAlerts, setTableAlerts] = useState<TableAlertSubscription[]>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_alerts`);
    return saved ? JSON.parse(saved) : [];
  });

  // 7. Reviews
  const [reviews, setReviews] = useState<RestaurantReview[]>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_reviews`);
    if (!saved) return INITIAL_REVIEWS;
    try {
      const parsed: RestaurantReview[] = JSON.parse(saved);
      const existingIds = new Set(parsed.map(r => r.id));
      const missing = INITIAL_REVIEWS.filter(r => !existingIds.has(r.id));
      return [...parsed, ...missing];
    } catch {
      return INITIAL_REVIEWS;
    }
  });

  // 8. User & Favorites
  const [user, setUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_user`);
    return saved ? JSON.parse(saved) : INITIAL_USER;
  });
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);

  // 9. Notifications
  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: 'notif-1',
      title: 'Order Preparing 🍳',
      message: 'Chef has started crafting your Truffle & Burrata Crostini and Tagliolini.',
      type: 'order_update',
      timestamp: '6 mins ago',
      read: false
    },
    {
      id: 'notif-2',
      title: 'Table Confirmed ✨',
      message: "Window Booth reserved tonight at 8:00 PM at L'Osteria Nocturne.",
      type: 'booking_confirmed',
      timestamp: '2 hours ago',
      read: true
    }
  ]);
  const [pushNotificationToast, setPushNotificationToast] = useState<NotificationItem | null>(null);

  // Persistent storage sync
  useEffect(() => {
    try {
      localStorage.setItem(`${LOCAL_STORAGE_KEY}_restaurants`, JSON.stringify(restaurants));
      localStorage.setItem(`${LOCAL_STORAGE_KEY}_menu`, JSON.stringify(menuItems));
      localStorage.setItem(`${LOCAL_STORAGE_KEY}_cart`, JSON.stringify(cart));
      localStorage.setItem(`${LOCAL_STORAGE_KEY}_orders`, JSON.stringify(orders));
      localStorage.setItem(`${LOCAL_STORAGE_KEY}_bookings`, JSON.stringify(bookings));
      localStorage.setItem(`${LOCAL_STORAGE_KEY}_alerts`, JSON.stringify(tableAlerts));
      localStorage.setItem(`${LOCAL_STORAGE_KEY}_reviews`, JSON.stringify(reviews));
      if (user) {
        localStorage.setItem(`${LOCAL_STORAGE_KEY}_user`, JSON.stringify(user));
      }
    } catch (e) {
      console.warn('Storage sync error:', e);
    }
  }, [restaurants, menuItems, cart, orders, bookings, tableAlerts, reviews, user]);

  // Handle Dark mode on HTML element
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode(prev => !prev);

  // Toast trigger helper
  const showPushToast = (title: string, message: string, type: NotificationItem['type'] = 'system', data?: any) => {
    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      title,
      message,
      type,
      timestamp: 'Just now',
      read: false,
      data
    };
    setNotifications(prev => [newNotif, ...prev]);
    setPushNotificationToast(newNotif);

    // If browser notifications allowed
    if ('Notification' in window && Notification.permission === 'granted') {
      try {
        new Notification(title, { body: message, icon: '/favicon.ico' });
      } catch (e) {
        // Safe fallback
      }
    }

    // Auto dismiss toast after 6s
    setTimeout(() => {
      setPushNotificationToast(current => (current?.id === newNotif.id ? null : current));
    }, 6000);
  };

  const dismissToast = () => setPushNotificationToast(null);

  // Current active restaurant
  const currentRestaurant = useMemo(() => {
    return restaurants.find(r => r.id === currentRestaurantId) || restaurants[0];
  }, [restaurants, currentRestaurantId]);

  // Current restaurant menu
  const currentRestaurantMenu = useMemo(() => {
    return menuItems.filter(item => item.restaurantId === currentRestaurant.id);
  }, [menuItems, currentRestaurant.id]);

  // Current restaurant reviews
  const currentRestaurantReviews = useMemo(() => {
    return reviews.filter(rev => rev.restaurantId === currentRestaurant.id);
  }, [reviews, currentRestaurant.id]);

  // Dietary filter helper
  const toggleDietaryTag = (tag: DietaryTag) => {
    setSelectedDietaryTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  // Master Restaurant update
  const updateRestaurant = (updated: Restaurant) => {
    setRestaurants(prev => prev.map(r => (r.id === updated.id ? updated : r)));
    showPushToast('Restaurant Updated', `${updated.name} settings saved successfully.`);
  };

  // Menu CRUD
  const addMenuItem = (itemData: Omit<MenuItem, 'id'>) => {
    const newItem: MenuItem = {
      ...itemData,
      id: `menu-${Date.now()}`
    };
    setMenuItems(prev => [newItem, ...prev]);
    showPushToast('Dish Added to Menu', `"${newItem.name}" is now live on the menu.`);
  };

  const updateMenuItem = (updated: MenuItem) => {
    setMenuItems(prev => prev.map(item => (item.id === updated.id ? updated : item)));
    showPushToast('Dish Updated', `"${updated.name}" details updated.`);
  };

  const deleteMenuItem = (id: string) => {
    const target = menuItems.find(m => m.id === id);
    setMenuItems(prev => prev.filter(item => item.id !== id));
    showPushToast('Dish Removed', `"${target?.name || 'Item'}" was removed from menu.`);
  };

  // Cart operations
  const addToCart = (
    item: MenuItem,
    quantity = 1,
    selectedOptions: CartItem['selectedOptions'] = [],
    specialInstructions = ''
  ) => {
    const optionsPrice = selectedOptions.reduce((acc, opt) => acc + opt.price, 0);
    const itemPrice = item.price + optionsPrice;

    // Check if duplicate line exists
    const lineKey = `${item.id}_${JSON.stringify(selectedOptions)}_${specialInstructions}`;
    const existingIndex = cart.findIndex(c => c.id === lineKey);

    if (existingIndex > -1) {
      setCart(prev =>
        prev.map((c, idx) => (idx === existingIndex ? { ...c, quantity: c.quantity + quantity } : c))
      );
    } else {
      const newCartLine: CartItem = {
        id: lineKey,
        menuItem: item,
        quantity,
        selectedOptions,
        specialInstructions,
        itemPrice
      };
      setCart(prev => [...prev, newCartLine]);
    }

    showPushToast('Added to Cart', `${quantity}x ${item.name} added to your dining order.`);
  };

  const updateCartItemQuantity = (cartItemId: string, delta: number) => {
    setCart(prev =>
      prev
        .map(item => {
          if (item.id === cartItemId) {
            const nextQty = item.quantity + delta;
            return nextQty > 0 ? { ...item, quantity: nextQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const removeFromCart = (cartItemId: string) => {
    setCart(prev => prev.filter(item => item.id !== cartItemId));
  };

  const clearCart = () => setCart([]);

  const cartCount = useMemo(() => cart.reduce((acc, item) => acc + item.quantity, 0), [cart]);
  const cartSubtotal = useMemo(() => cart.reduce((acc, item) => acc + item.itemPrice * item.quantity, 0), [cart]);
  const cartTotal = useMemo(() => {
    const tax = cartSubtotal * 0.08875;
    const delivery = cartSubtotal > 0 ? 4.99 : 0;
    return Number((cartSubtotal + tax + delivery).toFixed(2));
  }, [cartSubtotal]);

  // Order Placement & Live Simulation Loop
  const placeOrder = (details: {
    orderType: 'dine_in' | 'delivery' | 'pickup';
    paymentMethod: PaymentMethod;
    deliveryAddress?: string;
    tableNumber?: string;
    tipAmount?: number;
    specialNotes?: string;
  }): Order => {
    const subtotal = cartSubtotal;
    const tax = Number((subtotal * 0.08875).toFixed(2));
    const deliveryFee = details.orderType === 'delivery' ? 4.99 : 0;
    const tip = details.tipAmount || 0;
    const total = Number((subtotal + tax + deliveryFee + tip).toFixed(2));
    const orderNum = `#CN-${Math.floor(1000 + Math.random() * 9000)}`;

    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      orderNumber: orderNum,
      restaurantId: currentRestaurant.id,
      restaurantName: currentRestaurant.name,
      customerName: user?.name || 'Alexander Wright',
      customerEmail: user?.email || 'alexander@example.com',
      customerPhone: user?.phone || '+1 (555) 392-1084',
      items: [...cart],
      subtotal,
      tax,
      deliveryFee,
      tip,
      discount: 0,
      total,
      status: 'placed',
      orderType: details.orderType,
      tableNumber: details.tableNumber,
      deliveryAddress: details.deliveryAddress,
      paymentMethod: details.paymentMethod,
      paymentStatus: 'paid',
      paymentTransactionId: `txn_${details.paymentMethod}_${Math.random().toString(36).substring(2, 9)}`,
      createdAt: new Date().toISOString(),
      estimatedDeliveryMinutes: details.orderType === 'delivery' ? 28 : 18,
      statusTimestamps: {
        placed: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      },
      liveDriver: details.orderType === 'delivery' ? {
        name: 'Matteo V.',
        phone: '+1 (555) 912-4029',
        vehicle: 'Vespa E-Sprint (Matte Silver)',
        rating: 4.95,
        lat: currentRestaurant.location.latitude - 0.005,
        lng: currentRestaurant.location.longitude + 0.003
      } : undefined
    };

    setOrders(prev => [newOrder, ...prev]);
    setActiveOrderId(newOrder.id);
    clearCart();
    setIsCheckoutOpen(false);

    // Confetti celebration
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {}

    showPushToast(
      'Order Placed Successfully! 🎉',
      `Order ${orderNum} confirmed (${details.paymentMethod.replace('_', ' ').toUpperCase()}). Live tracking started.`,
      'order_update',
      { orderId: newOrder.id }
    );

    return newOrder;
  };

  // Real-time automatic order status progression simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setOrders(prevOrders => {
        let changed = false;
        const updated = prevOrders.map(order => {
          if (order.status === 'completed' || order.status === 'cancelled') return order;

          const now = Date.now();
          const orderCreated = new Date(order.createdAt).getTime();
          const elapsedSecs = (now - orderCreated) / 1000;

          // Stage 1: Placed -> Confirmed (after 10s)
          if (order.status === 'placed' && elapsedSecs > 10) {
            changed = true;
            const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            showPushToast('Kitchen Confirmed Order ✅', `${order.orderNumber} is accepted by the executive chef.`, 'order_update');
            return {
              ...order,
              status: 'confirmed' as OrderStatus,
              statusTimestamps: { ...order.statusTimestamps, confirmed: timeStr }
            };
          }

          // Stage 2: Confirmed -> Preparing (after 30s)
          if (order.status === 'confirmed' && elapsedSecs > 30) {
            changed = true;
            const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            showPushToast('Cooking in Progress 🍳', `${order.orderNumber} is now sizzling in the kitchen.`, 'order_update');
            return {
              ...order,
              status: 'preparing' as OrderStatus,
              statusTimestamps: { ...order.statusTimestamps, preparing: timeStr }
            };
          }

          // Stage 3: Preparing -> Out for delivery / Ready (after 60s)
          if (order.status === 'preparing' && elapsedSecs > 65) {
            changed = true;
            const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            const nextStatus: OrderStatus = order.orderType === 'delivery' ? 'out_for_delivery' : 'ready_for_pickup';
            showPushToast(
              order.orderType === 'delivery' ? 'Out for Delivery 🛵' : 'Order Ready! 🍽️',
              order.orderType === 'delivery' ? `Courier Matteo is en route with ${order.orderNumber}.` : `Table service ready for ${order.orderNumber}.`,
              'order_update'
            );
            return {
              ...order,
              status: nextStatus,
              statusTimestamps: {
                ...order.statusTimestamps,
                [order.orderType === 'delivery' ? 'out_for_delivery' : 'ready']: timeStr
              },
              estimatedDeliveryMinutes: Math.max(5, order.estimatedDeliveryMinutes - 10)
            };
          }

          return order;
        });

        return changed ? updated : prevOrders;
      });
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const updateOrderStatus = (orderId: string, newStatus: OrderStatus) => {
    setOrders(prev =>
      prev.map(ord => {
        if (ord.id === orderId) {
          const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
          return {
            ...ord,
            status: newStatus,
            statusTimestamps: { ...ord.statusTimestamps, [newStatus]: timeStr }
          };
        }
        return ord;
      })
    );
    showPushToast('Order Status Updated', `Order status changed to ${newStatus}.`);
  };

  const cancelOrder = (orderId: string) => {
    setOrders(prev =>
      prev.map(ord => (ord.id === orderId ? { ...ord, status: 'cancelled' as OrderStatus } : ord))
    );
    showPushToast('Order Cancelled', 'Order has been cancelled and refund processed.');
  };

  const activeOrder = useMemo(() => {
    return orders.find(o => o.id === activeOrderId) || orders[0] || null;
  }, [orders, activeOrderId]);

  // Table Bookings
  const bookTable = (details: {
    partySize: number;
    date: string;
    timeSlot: string;
    tableType: string;
    specialRequest?: string;
    customerName: string;
    customerEmail: string;
    customerPhone: string;
  }): TableBooking => {
    const tableId = `bk-${Math.floor(1000 + Math.random() * 9000)}`;
    const newBooking: TableBooking = {
      id: tableId,
      restaurantId: currentRestaurant.id,
      restaurantName: currentRestaurant.name,
      partySize: details.partySize,
      date: details.date,
      timeSlot: details.timeSlot,
      tableType: details.tableType,
      specialRequest: details.specialRequest,
      customerName: details.customerName,
      customerEmail: details.customerEmail,
      customerPhone: details.customerPhone,
      status: 'confirmed',
      createdAt: new Date().toISOString(),
      tableNumber: `Table ${Math.floor(1 + Math.random() * 8)}`
    };

    setBookings(prev => [newBooking, ...prev]);
    setActiveBookingModal(false);

    try {
      confetti({ particleCount: 70, spread: 60, origin: { y: 0.7 } });
    } catch (e) {}

    showPushToast(
      'Table Reserved! 🥂',
      `Table for ${details.partySize} at ${currentRestaurant.name} confirmed for ${details.date} at ${details.timeSlot}.`,
      'booking_confirmed',
      { bookingId: newBooking.id }
    );

    return newBooking;
  };

  const cancelBooking = (bookingId: string) => {
    setBookings(prev =>
      prev.map(b => (b.id === bookingId ? { ...b, status: 'cancelled' as TableBooking['status'] } : b))
    );
    showPushToast('Reservation Cancelled', 'Your table reservation was cancelled.');
  };

  const updateBookingStatus = (bookingId: string, status: TableBooking['status']) => {
    setBookings(prev => prev.map(b => (b.id === bookingId ? { ...b, status } : b)));
    showPushToast('Booking Updated', `Reservation status changed to ${status}.`);
  };

  // Table alert subscription & push notification trigger
  const subscribeTableAlert = (params: { date: string; timeSlot: string; partySize: number }) => {
    const newAlert: TableAlertSubscription = {
      id: `alert-${Date.now()}`,
      restaurantId: currentRestaurant.id,
      date: params.date,
      timeSlot: params.timeSlot,
      partySize: params.partySize,
      email: user?.email || 'alexander@example.com',
      phone: user?.phone || '+1 (555) 392-1084',
      notified: false,
      createdAt: new Date().toISOString()
    };

    setTableAlerts(prev => [newAlert, ...prev]);

    // Request notification permission if supported
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }

    showPushToast(
      'Table Availability Alert Set 🔔',
      `We'll instantly notify you via push notification if a table for ${params.partySize} opens at ${params.timeSlot} on ${params.date}.`,
      'table_alert'
    );
  };

  const triggerTableAvailabilityAlert = (date: string, timeSlot: string) => {
    showPushToast(
      'Table Now Available! 🍽️',
      `A table just opened up for ${timeSlot} on ${date} at ${currentRestaurant.name}! Tap to book immediately.`,
      'table_alert'
    );
  };

  // Reviews
  const addReview = (reviewData: Omit<RestaurantReview, 'id' | 'date' | 'helpfulCount'>) => {
    const newRev: RestaurantReview = {
      ...reviewData,
      id: `rev-${Date.now()}`,
      date: 'Just now',
      helpfulCount: 0
    };
    setReviews(prev => [newRev, ...prev]);

    // Recalculate restaurant rating
    const currentRestReviews = [newRev, ...reviews.filter(r => r.restaurantId === reviewData.restaurantId)];
    const avg = currentRestReviews.reduce((acc, r) => acc + r.rating, 0) / currentRestReviews.length;
    
    setRestaurants(prev =>
      prev.map(r => (r.id === reviewData.restaurantId ? { ...r, rating: Number(avg.toFixed(2)), reviewCount: r.reviewCount + 1 } : r))
    );

    showPushToast('Review Published ⭐', 'Thank you for sharing your culinary experience!');
  };

  const voteReviewHelpful = (reviewId: string) => {
    setReviews(prev =>
      prev.map(rev => (rev.id === reviewId ? { ...rev, helpfulCount: rev.helpfulCount + 1 } : rev))
    );
  };

  // Favorites & Offline Access
  const toggleFavoriteItem = (itemId: string) => {
    setUser(prev => {
      if (!prev) return null;
      const exists = prev.favoriteItemIds.includes(itemId);
      const updated = exists
        ? prev.favoriteItemIds.filter(id => id !== itemId)
        : [...prev.favoriteItemIds, itemId];
      return { ...prev, favoriteItemIds: updated };
    });
  };

  const toggleFavoriteRestaurant = (restaurantId: string) => {
    setUser(prev => {
      if (!prev) return null;
      const exists = prev.favoriteRestaurantIds.includes(restaurantId);
      const updated = exists
        ? prev.favoriteRestaurantIds.filter(id => id !== restaurantId)
        : [...prev.favoriteRestaurantIds, restaurantId];
      return { ...prev, favoriteRestaurantIds: updated };
    });
  };

  const isItemFavorite = (itemId: string) => Boolean(user?.favoriteItemIds.includes(itemId));
  const isRestaurantFavorite = (restaurantId: string) => Boolean(user?.favoriteRestaurantIds.includes(restaurantId));

  const favorites = useMemo(() => {
    return {
      itemIds: user?.favoriteItemIds || [],
      restaurantIds: user?.favoriteRestaurantIds || []
    };
  }, [user]);

  // Offline Saved Items Cache
  const offlineSavedItems = useMemo(() => {
    const favItemIds = new Set(user?.favoriteItemIds || []);
    return menuItems.filter(item => favItemIds.has(item.id));
  }, [menuItems, user?.favoriteItemIds]);

  // Auth & Social Media Login
  const loginWithProvider = (provider: 'google' | 'apple' | 'email' | 'guest', customEmail?: string) => {
    let name = 'Alexander Wright';
    let email = customEmail || 'alex.wright@example.com';
    let avatar = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80';

    if (provider === 'google') {
      name = 'Alexander Wright (Google)';
      email = customEmail || 'alex.wright.g@gmail.com';
    } else if (provider === 'apple') {
      name = 'Alexander Wright (Apple)';
      email = 'alex.wright@privaterelay.appleid.com';
    } else if (provider === 'guest') {
      name = 'Guest Gourmet';
      email = 'guest@culinaire.app';
      avatar = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80';
    }

    const newUser: UserProfile = {
      id: `usr-${Date.now()}`,
      name,
      email,
      avatar,
      provider,
      phone: '+1 (555) 392-1084',
      savedAddresses: [
        { id: 'addr-1', label: 'Apartment SoHo', address: '120 Spring St, Apt 4B, New York, NY 10012', isDefault: true }
      ],
      favoriteItemIds: user?.favoriteItemIds || ['menu-1', 'menu-3'],
      favoriteRestaurantIds: user?.favoriteRestaurantIds || ['rest-1'],
      createdAt: new Date().toISOString()
    };

    setUser(newUser);
    setIsAuthModalOpen(false);
    showPushToast('Signed In', `Welcome back, ${name}!`);
  };

  const logout = () => {
    setUser(null);
    showPushToast('Signed Out', 'You have been signed out.');
  };

  const updateUserProfile = (profileData: Partial<UserProfile>) => {
    setUser(prev => (prev ? { ...prev, ...profileData } : null));
    showPushToast('Profile Updated', 'Your profile details have been saved.');
  };

  // Notifications read
  const unreadNotificationCount = useMemo(() => notifications.filter(n => !n.read).length, [notifications]);

  const markNotificationRead = (id: string) => {
    setNotifications(prev => prev.map(n => (n.id === id ? { ...n, read: true } : n)));
  };

  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  // Analytics & Report Export
  const exportAnalyticsData = (format: 'csv' | 'json' | 'summary') => {
    const reportData = {
      exportDate: new Date().toISOString(),
      restaurant: currentRestaurant.name,
      summary: {
        totalRevenue: orders.reduce((acc, o) => acc + (o.paymentStatus === 'paid' ? o.total : 0), 0),
        totalOrders: orders.length,
        averageOrderValue: orders.length > 0 ? (orders.reduce((acc, o) => acc + o.total, 0) / orders.length).toFixed(2) : 0,
        totalBookings: bookings.length,
        averageRating: currentRestaurant.rating,
        reviewCount: currentRestaurant.reviewCount
      },
      orders: orders.map(o => ({
        orderId: o.orderNumber,
        customer: o.customerName,
        total: o.total,
        status: o.status,
        date: o.createdAt,
        type: o.orderType,
        payment: o.paymentMethod
      })),
      bookings: bookings.map(b => ({
        id: b.id,
        customer: b.customerName,
        partySize: b.partySize,
        date: b.date,
        timeSlot: b.timeSlot,
        status: b.status,
        table: b.tableNumber
      })),
      topMenuItems: menuItems.slice(0, 5).map(m => ({
        name: m.name,
        category: m.category,
        price: m.price,
        rating: m.rating,
        reviews: m.reviewCount
      }))
    };

    if (format === 'json') {
      const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Culinaire_Analytics_${currentRestaurant.name.replace(/\s+/g, '_')}_${new Date().toISOString().slice(0, 10)}.json`;
      a.click();
      URL.revokeObjectURL(url);
      showPushToast('Export Completed', 'Analytics JSON dataset downloaded.');
    } else if (format === 'csv') {
      const headers = ['Order Number', 'Customer', 'Date', 'Type', 'Payment Method', 'Total ($)', 'Status'];
      const rows = orders.map(o => [
        o.orderNumber,
        `"${o.customerName}"`,
        `"${new Date(o.createdAt).toLocaleString()}"`,
        o.orderType,
        o.paymentMethod,
        o.total.toFixed(2),
        o.status
      ]);

      const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Culinaire_Orders_Report_${new Date().toISOString().slice(0, 10)}.csv`;
      a.click();
      URL.revokeObjectURL(url);
      showPushToast('CSV Report Downloaded', 'Orders CSV report generated successfully.');
    } else {
      window.print();
    }
  };

  return (
    <AppContext.Provider
      value={{
        isDarkMode,
        toggleDarkMode,
        deviceFrame,
        setDeviceFrame,
        activeTab,
        setActiveTab,
        isOfflineSimulated,
        setIsOfflineSimulated,
        restaurants,
        currentRestaurant,
        setCurrentRestaurantId,
        updateRestaurant,
        menuItems,
        currentRestaurantMenu,
        selectedCategory,
        setSelectedCategory,
        searchQuery,
        setSearchQuery,
        selectedDietaryTags,
        toggleDietaryTag,
        addMenuItem,
        updateMenuItem,
        deleteMenuItem,
        cart,
        cartCount,
        cartSubtotal,
        cartTotal,
        addToCart,
        updateCartItemQuantity,
        removeFromCart,
        clearCart,
        selectedDishModal,
        setSelectedDishModal,
        orders,
        activeOrder,
        setActiveOrderId,
        placeOrder,
        updateOrderStatus,
        cancelOrder,
        bookings,
        activeBookingModal,
        setActiveBookingModal,
        bookTable,
        cancelBooking,
        updateBookingStatus,
        tableAlerts,
        subscribeTableAlert,
        triggerTableAvailabilityAlert,
        reviews,
        currentRestaurantReviews,
        addReview,
        voteReviewHelpful,
        favorites,
        toggleFavoriteItem,
        toggleFavoriteRestaurant,
        isItemFavorite,
        isRestaurantFavorite,
        offlineSavedItems,
        user,
        isAuthModalOpen,
        setIsAuthModalOpen,
        loginWithProvider,
        logout,
        updateUserProfile,
        notifications,
        unreadNotificationCount,
        markNotificationRead,
        markAllNotificationsRead,
        pushNotificationToast,
        dismissToast,
        isCheckoutOpen,
        setIsCheckoutOpen,
        exportAnalyticsData
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
