export type DietaryTag = 'vegan' | 'vegetarian' | 'gluten_free' | 'halal' | 'keto' | 'dairy_free' | 'chef_special' | 'spicy';

export interface MenuItemOption {
  id: string;
  name: string;
  price: number;
}

export interface MenuItemOptionGroup {
  id: string;
  title: string;
  required: boolean;
  maxSelect?: number;
  options: MenuItemOption[];
}

export interface MenuItem {
  id: string;
  restaurantId: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  dietaryTags: DietaryTag[];
  preparationTimeMinutes: number;
  calories?: number;
  isAvailable: boolean;
  isPopular?: boolean;
  rating: number;
  reviewCount: number;
  optionGroups?: MenuItemOptionGroup[];
}

export interface RestaurantReview {
  id: string;
  restaurantId: string;
  dishId?: string;
  dishName?: string;
  dishRecommended?: string;
  userName: string;
  userAvatar: string;
  rating: number;
  comment: string;
  date: string;
  helpfulCount: number;
  verifiedDining: boolean;
  ratingsBreakdown?: {
    food: number;
    service: number;
    ambiance: number;
    value: number;
  };
}

export interface RestaurantLocation {
  address: string;
  city: string;
  postalCode: string;
  latitude: number;
  longitude: number;
  neighborhood: string;
}

export interface OpeningHour {
  day: string;
  open: string;
  close: string;
  isClosed?: boolean;
}

export interface TableSlot {
  id: string;
  time: string; // e.g. "18:00"
  available: boolean;
  capacity: number;
  tableType: 'indoor' | 'patio' | 'window' | 'chef_counter' | 'private_booth';
  zone: string;
}

export interface Restaurant {
  id: string;
  name: string;
  tagline: string;
  cuisine: string[];
  priceRange: '$' | '$$' | '$$$' | '$$$$';
  rating: number;
  reviewCount: number;
  bannerImage: string;
  logoImage: string;
  location: RestaurantLocation;
  phone: string;
  email: string;
  website: string;
  openingHours: OpeningHour[];
  features: string[];
  categories: string[];
  tables: {
    id: string;
    name: string;
    seats: number;
    type: 'indoor' | 'patio' | 'window' | 'chef_counter' | 'private_booth';
  }[];
}

export interface TableBooking {
  id: string;
  restaurantId: string;
  restaurantName: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  partySize: number;
  date: string;
  timeSlot: string;
  tableType: string;
  specialRequest?: string;
  status: 'confirmed' | 'waitlisted' | 'cancelled' | 'seated' | 'completed';
  createdAt: string;
  tableNumber?: string;
}

export interface TableAlertSubscription {
  id: string;
  restaurantId: string;
  date: string;
  timeSlot: string;
  partySize: number;
  email: string;
  phone: string;
  notified: boolean;
  createdAt: string;
}

export interface CartItem {
  id: string; // unique cart line id
  menuItem: MenuItem;
  quantity: number;
  selectedOptions: {
    groupId: string;
    groupTitle: string;
    optionId: string;
    optionName: string;
    price: number;
  }[];
  specialInstructions?: string;
  itemPrice: number; // base + options
}

export type OrderStatus =
  | 'placed'
  | 'confirmed'
  | 'preparing'
  | 'ready_for_pickup'
  | 'out_for_delivery'
  | 'completed'
  | 'cancelled';

export type PaymentMethod = 'apple_pay' | 'google_pay' | 'card' | 'upi' | 'cash';

export interface Order {
  id: string;
  orderNumber: string;
  restaurantId: string;
  restaurantName: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  items: CartItem[];
  subtotal: number;
  tax: number;
  deliveryFee: number;
  tip: number;
  discount: number;
  total: number;
  status: OrderStatus;
  orderType: 'dine_in' | 'delivery' | 'pickup';
  tableNumber?: string;
  deliveryAddress?: string;
  paymentMethod: PaymentMethod;
  paymentStatus: 'paid' | 'pending' | 'refunded';
  paymentTransactionId?: string;
  createdAt: string;
  estimatedDeliveryMinutes: number;
  statusTimestamps: {
    placed: string;
    confirmed?: string;
    preparing?: string;
    ready?: string;
    out_for_delivery?: string;
    completed?: string;
  };
  liveDriver?: {
    name: string;
    phone: string;
    vehicle: string;
    rating: number;
    lat: number;
    lng: number;
  };
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar: string;
  provider: 'google' | 'apple' | 'email' | 'guest';
  phone?: string;
  savedAddresses?: {
    id: string;
    label: string;
    address: string;
    isDefault?: boolean;
  }[];
  favoriteItemIds: string[];
  favoriteRestaurantIds: string[];
  createdAt: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: 'table_alert' | 'order_update' | 'booking_confirmed' | 'promo' | 'system';
  timestamp: string;
  read: boolean;
  data?: any;
}

export type DeviceFrameType = 'responsive' | 'ios' | 'android';
export type ActiveTab = 'explore' | 'menu' | 'book' | 'orders' | 'favorites' | 'reviews' | 'admin';
