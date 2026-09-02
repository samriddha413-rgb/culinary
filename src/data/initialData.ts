import { Restaurant, MenuItem, RestaurantReview, Order, UserProfile, TableBooking } from '../types';

export const INITIAL_RESTAURANTS: Restaurant[] = [
  {
    id: 'rest-1',
    name: "L'Osteria Nocturne",
    tagline: 'Artisanal Woodfired & Modern Mediterranean Gastronomy',
    cuisine: ['Contemporary Italian', 'Mediterranean', 'Woodfired'],
    priceRange: '$$$',
    rating: 4.88,
    reviewCount: 342,
    bannerImage: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1600&q=80',
    logoImage: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=300&q=80',
    location: {
      address: '428 Mercer Street, SoHo',
      city: 'New York',
      postalCode: '10013',
      neighborhood: 'SoHo District',
      latitude: 40.7243,
      longitude: -73.9978,
    },
    phone: '+1 (212) 555-8942',
    email: 'reservations@osterianocturne.com',
    website: 'https://osterianocturne.com',
    openingHours: [
      { day: 'Monday - Thursday', open: '12:00 PM', close: '10:30 PM' },
      { day: 'Friday - Saturday', open: '12:00 PM', close: '11:45 PM' },
      { day: 'Sunday', open: '11:00 AM', close: '10:00 PM' },
    ],
    features: ['Woodfired Oven', 'Sommelier Selection', 'Patio Seating', 'Live Jazz Weekends', 'Valet Parking'],
    categories: ['Starters & Antipasti', 'Handmade Pasta', 'Woodfired Mains', 'Dolci & Desserts', 'Artisanal Beverages'],
    tables: [
      { id: 'T-01', name: 'Table 1 (Window Booth)', seats: 2, type: 'window' },
      { id: 'T-02', name: 'Table 2 (Window Booth)', seats: 4, type: 'window' },
      { id: 'T-03', name: 'Table 3 (Main Hall)', seats: 4, type: 'indoor' },
      { id: 'T-04', name: 'Table 4 (Main Hall)', seats: 6, type: 'indoor' },
      { id: 'T-05', name: "Table 5 (Chef's Counter)", seats: 2, type: 'chef_counter' },
      { id: 'T-06', name: "Table 6 (Chef's Counter)", seats: 2, type: 'chef_counter' },
      { id: 'T-07', name: 'Table 7 (Garden Patio)', seats: 4, type: 'patio' },
      { id: 'T-08', name: 'Table 8 (Garden Patio)', seats: 6, type: 'patio' },
      { id: 'T-09', name: 'Table 9 (Private Wine Cellar)', seats: 8, type: 'private_booth' },
    ],
  },
  {
    id: 'rest-2',
    name: 'Kyoto Umami Lab',
    tagline: 'Modern Robata & Omotenashi Kaiseki Experience',
    cuisine: ['Japanese', 'Robatayaki', 'Omakase'],
    priceRange: '$$$$',
    rating: 4.94,
    reviewCount: 218,
    bannerImage: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=1600&q=80',
    logoImage: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=300&q=80',
    location: {
      address: '78 Franklin Avenue',
      city: 'Brooklyn',
      postalCode: '11205',
      neighborhood: 'DUMBO',
      latitude: 40.7022,
      longitude: -73.9871,
    },
    phone: '+1 (718) 555-4491',
    email: 'omakase@kyotoumamilab.com',
    website: 'https://kyotoumamilab.com',
    openingHours: [
      { day: 'Tuesday - Sunday', open: '5:00 PM', close: '11:00 PM' },
      { day: 'Monday', open: 'Closed', close: 'Closed', isClosed: true },
    ],
    features: ['Robata Grill', 'Sake Pairing', 'Zero Waste Kitchen', 'Chef Counter Seating'],
    categories: ['Raw & Sashimi', 'Binchotan Skewers', 'Kaiseki Mains', 'Matcha Sweets'],
    tables: [
      { id: 'K-01', name: "Counter 1 (Chef's Stage)", seats: 2, type: 'chef_counter' },
      { id: 'K-02', name: "Counter 2 (Chef's Stage)", seats: 2, type: 'chef_counter' },
      { id: 'K-03', name: 'Tatami Room 1', seats: 4, type: 'indoor' },
      { id: 'K-04', name: 'Zen Garden Booth', seats: 4, type: 'patio' },
    ],
  },
  {
    id: 'rest-sakho-laksha',
    name: 'Sakho laksha',
    tagline: 'Signature Himalayan Aromatics, Claypot Curries & Rich Laksha Craft',
    cuisine: ['Himalayan & Nepalese', 'Laksha & Noodle Bar', 'South Asian Fusion', 'Claypot Grills'],
    priceRange: '$$',
    rating: 4.93,
    reviewCount: 168,
    bannerImage: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=1600&q=80',
    logoImage: 'https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&w=300&q=80',
    location: {
      address: '20/175 Ellscott Bvd',
      city: 'Mickleham',
      postalCode: 'VIC 3064',
      neighborhood: 'Merrifield Estate, Mickleham',
      latitude: -37.5312,
      longitude: 144.9142,
    },
    phone: '+61 3 9088 7412',
    email: 'info@sakholaksha.com.au',
    website: 'https://sakholaksha.com.au',
    openingHours: [
      { day: 'Monday - Thursday', open: '11:30 AM', close: '10:00 PM' },
      { day: 'Friday - Saturday', open: '11:30 AM', close: '11:00 PM' },
      { day: 'Sunday', open: '12:00 PM', close: '9:30 PM' },
    ],
    features: ['Signature 12-Hour Laksha Broth', 'Handcrafted Himalayan Momos', 'Claypot Charcoal Specials', 'Outdoor Verandah', 'Halal-Friendly Options'],
    categories: ['Signature Laksha & Broths', 'Handmade Momos & Starters', 'Claypot Curries & Grills', 'Wok Noodles & Rice', 'Artisanal Drinks & Sweets'],
    tables: [
      { id: 'SL-01', name: 'Table 1 (Verandah Garden)', seats: 2, type: 'patio' },
      { id: 'SL-02', name: 'Table 2 (Verandah Garden)', seats: 4, type: 'patio' },
      { id: 'SL-03', name: 'Table 3 (Main Hall)', seats: 4, type: 'indoor' },
      { id: 'SL-04', name: 'Table 4 (Main Hall)', seats: 6, type: 'indoor' },
      { id: 'SL-05', name: 'Table 5 (Window Booth)', seats: 4, type: 'window' },
      { id: 'SL-06', name: 'Table 6 (Spice Master Counter)', seats: 2, type: 'chef_counter' },
      { id: 'SL-07', name: 'Table 7 (Family Banquet Suite)', seats: 8, type: 'private_booth' },
    ],
  }
];

export const INITIAL_MENU_ITEMS: MenuItem[] = [
  {
    id: 'menu-1',
    restaurantId: 'rest-1',
    name: 'Truffle & Burrata Crostini',
    description: 'Crispy sourdough, Pugliese burrata, black summer truffle carpaccio, wild thyme honey & crushed pistachios.',
    price: 19.5,
    category: 'Starters & Antipasti',
    image: 'https://images.unsplash.com/photo-1592417817098-8f3d6ef22e43?auto=format&fit=crop&w=800&q=80',
    dietaryTags: ['vegetarian', 'chef_special'],
    preparationTimeMinutes: 12,
    calories: 420,
    isAvailable: true,
    isPopular: true,
    rating: 4.9,
    reviewCount: 84,
    optionGroups: [
      {
        id: 'opt-bread',
        title: 'Artisanal Bread Choice',
        required: true,
        options: [
          { id: 'o-sourdough', name: 'Toasted Rustic Sourdough', price: 0 },
          { id: 'o-gf-bread', name: 'Gluten-Free Seed Loaf', price: 2.5 }
        ]
      },
      {
        id: 'opt-extra-truffle',
        title: 'Enhance Your Dish',
        required: false,
        options: [
          { id: 'o-extra-truffle', name: 'Extra Fresh Shaved Truffle (3g)', price: 6.0 },
          { id: 'o-prosciutto', name: '24-Month San Daniele Prosciutto', price: 5.5 }
        ]
      }
    ]
  },
  {
    id: 'menu-2',
    restaurantId: 'rest-1',
    name: 'Charred Octopus with Romesco',
    description: 'Spanish octopus grilled over almond wood, Catalan smoked paprika romesco, crispy fingerling potatoes, preserved lemon gremolata.',
    price: 24.0,
    category: 'Starters & Antipasti',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
    dietaryTags: ['dairy_free', 'gluten_free', 'chef_special'],
    preparationTimeMinutes: 15,
    calories: 380,
    isAvailable: true,
    isPopular: true,
    rating: 4.95,
    reviewCount: 96,
  },
  {
    id: 'menu-3',
    restaurantId: 'rest-1',
    name: 'Hand-Cut Tagliolini al Tartufo',
    description: 'Silk 40-yolk egg pasta ribbon, cultured alpine butter, 36-month Parmigiano-Reggiano Vacche Rosse, generous fresh Norcia black truffles.',
    price: 34.0,
    category: 'Handmade Pasta',
    image: 'https://images.unsplash.com/photo-1621996346565-e3d5d6281691?auto=format&fit=crop&w=800&q=80',
    dietaryTags: ['vegetarian', 'chef_special'],
    preparationTimeMinutes: 16,
    calories: 680,
    isAvailable: true,
    isPopular: true,
    rating: 4.98,
    reviewCount: 142,
    optionGroups: [
      {
        id: 'opt-portion',
        title: 'Portion Size',
        required: true,
        options: [
          { id: 'o-standard', name: 'Standard Entrée (140g)', price: 0 },
          { id: 'o-grande', name: 'Grande Chef Serving (200g)', price: 9.0 }
        ]
      },
      {
        id: 'opt-protein',
        title: 'Add Savory Protein',
        required: false,
        options: [
          { id: 'o-guanciale', name: 'Crispy Roman Guanciale', price: 4.5 },
          { id: 'o-prawns', name: 'Wild Mediterranean Red Prawns (3 pcs)', price: 11.0 }
        ]
      }
    ]
  },
  {
    id: 'menu-4',
    restaurantId: 'rest-1',
    name: 'Wild Boar & Porcini Pappardelle',
    description: 'Slow-braised 8-hour Tuscan wild boar ragù, Chianti Classico reduction, wild juniper berry essence, shaved Pecorino di Fossa.',
    price: 29.5,
    category: 'Handmade Pasta',
    image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=800&q=80',
    dietaryTags: ['dairy_free'],
    preparationTimeMinutes: 18,
    calories: 740,
    isAvailable: true,
    isPopular: false,
    rating: 4.87,
    reviewCount: 68,
  },
  {
    id: 'menu-5',
    restaurantId: 'rest-1',
    name: 'Dry-Aged Bistecca Fiorentina (18oz)',
    description: 'Prime Chianina beef aged 45 days, seared over white oak embers, rosemary sea salt, roasted garlic confit, bone marrow jus.',
    price: 58.0,
    category: 'Woodfired Mains',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
    dietaryTags: ['gluten_free', 'keto'],
    preparationTimeMinutes: 24,
    calories: 910,
    isAvailable: true,
    isPopular: true,
    rating: 4.93,
    reviewCount: 112,
    optionGroups: [
      {
        id: 'opt-temp',
        title: 'Meat Doneness',
        required: true,
        options: [
          { id: 'o-rare', name: 'Rare (Warm red center - Recommended)', price: 0 },
          { id: 'o-med-rare', name: 'Medium Rare', price: 0 },
          { id: 'o-medium', name: 'Medium', price: 0 }
        ]
      }
    ]
  },
  {
    id: 'menu-6',
    restaurantId: 'rest-1',
    name: 'Mediterranean Branzino al Cartoccio',
    description: 'Wild sea bass baked in parchment with cherry tomatoes, Taggiasca olives, caper berries, white wine, and Sicilian oregano.',
    price: 38.0,
    category: 'Woodfired Mains',
    image: 'https://images.unsplash.com/photo-1534939561126-855b8675edd7?auto=format&fit=crop&w=800&q=80',
    dietaryTags: ['gluten_free', 'dairy_free', 'halal'],
    preparationTimeMinutes: 20,
    calories: 520,
    isAvailable: true,
    isPopular: false,
    rating: 4.82,
    reviewCount: 45,
  },
  {
    id: 'menu-7',
    restaurantId: 'rest-1',
    name: 'Smoked Vanilla Tiramisù Nocturne',
    description: 'Single-origin espresso soaked savoiardi, mascarpone mousse infused with smoked Bourbon vanilla, 72% Venezuelan dark cacao dust.',
    price: 14.5,
    category: 'Dolci & Desserts',
    image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=800&q=80',
    dietaryTags: ['vegetarian', 'chef_special'],
    preparationTimeMinutes: 8,
    calories: 460,
    isAvailable: true,
    isPopular: true,
    rating: 4.96,
    reviewCount: 120,
  },
  {
    id: 'menu-8',
    restaurantId: 'rest-1',
    name: 'Smoked Rosemary & Blood Orange Spritz',
    description: 'House-made blood orange cordial, sparkling San Pellegrino mineral water, torch-smoked rosemary sprig, non-alcoholic botanicals.',
    price: 11.0,
    category: 'Artisanal Beverages',
    image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=800&q=80',
    dietaryTags: ['vegan', 'gluten_free', 'halal'],
    preparationTimeMinutes: 5,
    calories: 95,
    isAvailable: true,
    isPopular: true,
    rating: 4.89,
    reviewCount: 52,
  },
  // Items for restaurant 2
  {
    id: 'menu-9',
    restaurantId: 'rest-2',
    name: 'A5 Miyazaki Wagyu Nigiri (2 pcs)',
    description: 'Binchotan blowtorched A5 wagyu, nikiri glaze, fresh Shizuoka wasabi, micro shiso.',
    price: 28.0,
    category: 'Raw & Sashimi',
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=800&q=80',
    dietaryTags: ['dairy_free', 'chef_special'],
    preparationTimeMinutes: 8,
    calories: 290,
    isAvailable: true,
    isPopular: true,
    rating: 4.99,
    reviewCount: 78,
  },
  {
    id: 'menu-10',
    restaurantId: 'rest-2',
    name: 'Black Cod with Kyoto Saikyo Miso',
    description: 'Alaskan black cod marinated 72 hours in sweet white Saikyo miso, charred hajikami ginger, yuzu glaze.',
    price: 42.0,
    category: 'Kaiseki Mains',
    image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=800&q=80',
    dietaryTags: ['gluten_free', 'dairy_free', 'halal'],
    preparationTimeMinutes: 18,
    calories: 490,
    isAvailable: true,
    isPopular: true,
    rating: 4.94,
    reviewCount: 94,
  },
  {
    id: 'menu-sl-1',
    restaurantId: 'rest-sakho-laksha',
    name: 'Royal Sakho Signature Laksha Bowl',
    description: '12-hour simmered aromatic coconut curry broth, vermicelli & egg noodles, Australian king prawns, poached chicken, fried tofu puffs, quail eggs & fresh laksa mint.',
    price: 23.5,
    category: 'Signature Laksha & Broths',
    image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=800&q=80',
    dietaryTags: ['chef_special', 'halal', 'dairy_free'],
    preparationTimeMinutes: 14,
    calories: 680,
    isAvailable: true,
    isPopular: true,
    rating: 4.97,
    reviewCount: 142,
    optionGroups: [
      {
        id: 'opt-sl-spice',
        title: 'Broth Heat Level',
        required: true,
        options: [
          { id: 'sp-mild', name: 'Mild & Creamy Coconut', price: 0 },
          { id: 'sp-med', name: 'Signature Medium Heat (Chef Recommended)', price: 0 },
          { id: 'sp-hot', name: 'Flaming Dragon Spicy', price: 0 }
        ]
      },
      {
        id: 'opt-sl-noodle',
        title: 'Noodle Choice',
        required: true,
        options: [
          { id: 'ndl-combo', name: 'Classic Duo (Egg Noodles + Rice Vermicelli)', price: 0 },
          { id: 'ndl-rice', name: 'Flat Rice Noodles (Gluten-Free)', price: 1.0 },
          { id: 'ndl-thick', name: 'Thick Udon Style', price: 1.0 }
        ]
      },
      {
        id: 'opt-sl-extra',
        title: 'Gourmet Additions',
        required: false,
        options: [
          { id: 'ext-prawn', name: 'Extra Wild King Prawns (3 pcs)', price: 6.5 },
          { id: 'ext-tofu', name: 'Extra Crispy Tofu Puffs', price: 2.5 },
          { id: 'ext-egg', name: 'Ramen Soft-Boiled Egg', price: 2.0 }
        ]
      }
    ]
  },
  {
    id: 'menu-sl-2',
    restaurantId: 'rest-sakho-laksha',
    name: 'Himalayan Jhol Momo (Spiced Sesame Chutney)',
    description: 'Steaming hand-pinched dumplings packed with juicy minced chicken and Himalayan wild herbs, submerged in a rich roasted sesame, tomato & timur pepper broth.',
    price: 17.0,
    category: 'Handmade Momos & Starters',
    image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=800&q=80',
    dietaryTags: ['chef_special', 'halal'],
    preparationTimeMinutes: 12,
    calories: 460,
    isAvailable: true,
    isPopular: true,
    rating: 4.95,
    reviewCount: 98,
    optionGroups: [
      {
        id: 'opt-sl-momo-style',
        title: 'Preparation Style',
        required: true,
        options: [
          { id: 'momo-jhol', name: 'Classic Steamed in Hot Jhol Sesame Broth', price: 0 },
          { id: 'momo-kothey', name: 'Kothey (Pan-Seared Golden Bottoms)', price: 1.0 },
          { id: 'momo-chilli', name: 'C-Momo (Wok-Tossed in Hot Chilli Garlic)', price: 2.0 }
        ]
      },
      {
        id: 'opt-sl-filling',
        title: 'Filling Selection',
        required: true,
        options: [
          { id: 'fil-chicken', name: 'Spiced Free-Range Chicken', price: 0 },
          { id: 'fil-veg', name: 'Garden Veggie, Paneer & Truffle', price: 0 }
        ]
      }
    ]
  },
  {
    id: 'menu-sl-3',
    restaurantId: 'rest-sakho-laksha',
    name: 'Slow-Braised Mickleham Goat Claypot',
    description: 'Victorian pasture-fed goat slow-cooked for 6 hours in roasted Himalayan spices, bay leaves, black cardamom and caramelized shallots. Served with fragrant aged basmati rice.',
    price: 27.5,
    category: 'Claypot Curries & Grills',
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80',
    dietaryTags: ['gluten_free', 'halal'],
    preparationTimeMinutes: 16,
    calories: 720,
    isAvailable: true,
    isPopular: true,
    rating: 4.92,
    reviewCount: 65,
    optionGroups: [
      {
        id: 'opt-sl-bread-side',
        title: 'Accompaniment',
        required: true,
        options: [
          { id: 'acc-basmati', name: 'Saffron Steamed Basmati Rice', price: 0 },
          { id: 'acc-roti', name: 'Handmade Flaky Butter Roti (2 pcs)', price: 2.0 },
          { id: 'acc-garlic-naan', name: 'Garlic Butter Naan', price: 3.0 }
        ]
      }
    ]
  },
  {
    id: 'menu-sl-4',
    restaurantId: 'rest-sakho-laksha',
    name: 'Charred Sizzling Paneer & Lotus Crisp',
    description: 'Fresh buffalo paneer cubes, crunchy lotus root, and charred green peppers flash-tossed in a smoky tamarind-ginger glaze with roasted sesame.',
    price: 20.0,
    category: 'Claypot Curries & Grills',
    image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&w=800&q=80',
    dietaryTags: ['vegetarian', 'gluten_free'],
    preparationTimeMinutes: 12,
    calories: 520,
    isAvailable: true,
    isPopular: false,
    rating: 4.88,
    reviewCount: 41,
  },
  {
    id: 'menu-sl-5',
    restaurantId: 'rest-sakho-laksha',
    name: 'Smoked Wok Seafood Hokkien Noodles',
    description: 'Wok-charred Hokkien and rice noodles with tender calamari, tiger prawns, Asian greens, bean shoots, and house laksha paste with calamansi lime.',
    price: 24.0,
    category: 'Wok Noodles & Rice',
    image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=800&q=80',
    dietaryTags: ['halal', 'dairy_free'],
    preparationTimeMinutes: 13,
    calories: 640,
    isAvailable: true,
    isPopular: true,
    rating: 4.91,
    reviewCount: 57,
  },
  {
    id: 'menu-sl-6',
    restaurantId: 'rest-sakho-laksha',
    name: 'Cardamom & Saffron Kulfi Falooda',
    description: 'Slow-churned pistachio and green cardamom kulfi paired with rose falooda vermicelli, sweet basil seeds, and crushed roasted almonds.',
    price: 13.0,
    category: 'Artisanal Drinks & Sweets',
    image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80',
    dietaryTags: ['vegetarian', 'gluten_free'],
    preparationTimeMinutes: 6,
    calories: 340,
    isAvailable: true,
    isPopular: true,
    rating: 4.96,
    reviewCount: 49,
  },
  {
    id: 'menu-sl-7',
    restaurantId: 'rest-sakho-laksha',
    name: 'Smoked Masala Karak Chai',
    description: 'Slow-brewed Assam leaves simmered with whole cinnamon bark, green cardamom, crushed ginger and organic dairy, with a subtle woody smoke.',
    price: 6.5,
    category: 'Artisanal Drinks & Sweets',
    image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=800&q=80',
    dietaryTags: ['vegetarian', 'gluten_free'],
    preparationTimeMinutes: 5,
    calories: 140,
    isAvailable: true,
    isPopular: true,
    rating: 4.98,
    reviewCount: 88,
  }
];

export const INITIAL_REVIEWS: RestaurantReview[] = [
  {
    id: 'rev-sl-1',
    restaurantId: 'rest-sakho-laksha',
    userName: 'Liam Davies',
    userAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
    rating: 5,
    dishRecommended: 'Royal Sakho Signature Laksha Bowl',
    comment: 'Sensational addition to Mickleham! The 12-hour broth has unprecedented depth of flavor with perfect coconut creaminess and lemongrass punch. Great cozy ambience and rapid service.',
    date: 'Yesterday, 7:15 PM',
    helpfulCount: 31,
    verifiedDining: true,
    ratingsBreakdown: { food: 5, service: 5, ambiance: 4.9, value: 4.8 }
  },
  {
    id: 'rev-sl-2',
    restaurantId: 'rest-sakho-laksha',
    userName: 'Pooja Sharma',
    userAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    rating: 5,
    dishRecommended: 'Himalayan Jhol Momo (Spiced Sesame Chutney)',
    comment: 'The Jhol Momo is authentic perfection—the roasted sesame and timur pepper broth transported me straight back to Kathmandu. The goat claypot is also fall-off-the-bone tender. 10/10!',
    date: '3 days ago',
    helpfulCount: 22,
    verifiedDining: true,
    ratingsBreakdown: { food: 5, service: 4.9, ambiance: 5, value: 4.7 }
  },
  {
    id: 'rev-1',
    restaurantId: 'rest-1',
    userName: 'Elena Rostova',
    userAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    rating: 5,
    dishRecommended: 'Hand-Cut Tagliolini al Tartufo',
    comment: 'The 40-yolk pasta is genuinely an ethereal experience. The aroma of Norcia truffles hits the table before the plate even touches down. Impeccable pacing and wine suggestions from the sommelier!',
    date: 'Yesterday, 8:45 PM',
    helpfulCount: 24,
    verifiedDining: true,
    ratingsBreakdown: { food: 5, service: 5, ambiance: 4.8, value: 4.5 }
  },
  {
    id: 'rev-2',
    restaurantId: 'rest-1',
    userName: 'Marcus Sterling',
    userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    rating: 5,
    dishRecommended: 'Dry-Aged Bistecca Fiorentina (18oz)',
    comment: 'Booked a window booth for our anniversary. The table was ready precisely on time, candlelit and cozy. The Bistecca was cooked to a textbook medium rare. Will be returning monthly!',
    date: '3 days ago',
    helpfulCount: 18,
    verifiedDining: true,
    ratingsBreakdown: { food: 5, service: 5, ambiance: 5, value: 4.6 }
  },
  {
    id: 'rev-3',
    restaurantId: 'rest-1',
    userName: 'Chloe Chen',
    userAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80',
    rating: 4.8,
    dishRecommended: 'Truffle & Burrata Crostini',
    comment: 'Minimalist, moody interiors with warm lighting. Highly recommend the Burrata crostini with wild thyme honey—flavor balance was sensational. Great non-alcoholic cocktail lineup too.',
    date: 'Last week',
    helpfulCount: 12,
    verifiedDining: true,
    ratingsBreakdown: { food: 5, service: 4.7, ambiance: 5, value: 4.5 }
  }
];

export const INITIAL_USER: UserProfile = {
  id: 'usr-demo-1',
  name: 'Alexander Wright',
  email: 'alex.wright@example.com',
  avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
  provider: 'google',
  phone: '+1 (555) 392-1084',
  savedAddresses: [
    { id: 'addr-1', label: 'Apartment SoHo', address: '120 Spring St, Apt 4B, New York, NY 10012', isDefault: true },
    { id: 'addr-2', label: 'Design Studio', address: '450 West Broadway, Fl 3, New York, NY 10012' }
  ],
  favoriteItemIds: ['menu-1', 'menu-3', 'menu-7'],
  favoriteRestaurantIds: ['rest-1'],
  createdAt: '2026-01-15T10:00:00Z'
};

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ord-84920',
    orderNumber: '#CN-8492',
    restaurantId: 'rest-1',
    restaurantName: "L'Osteria Nocturne",
    customerName: 'Alexander Wright',
    customerEmail: 'alex.wright@example.com',
    customerPhone: '+1 (555) 392-1084',
    items: [
      {
        id: 'cart-line-1',
        menuItem: INITIAL_MENU_ITEMS[0],
        quantity: 1,
        selectedOptions: [
          { groupId: 'opt-bread', groupTitle: 'Artisanal Bread Choice', optionId: 'o-sourdough', optionName: 'Toasted Rustic Sourdough', price: 0 },
          { groupId: 'opt-extra-truffle', groupTitle: 'Enhance Your Dish', optionId: 'o-extra-truffle', optionName: 'Extra Fresh Shaved Truffle (3g)', price: 6.0 }
        ],
        itemPrice: 25.5
      },
      {
        id: 'cart-line-2',
        menuItem: INITIAL_MENU_ITEMS[2],
        quantity: 1,
        selectedOptions: [
          { groupId: 'opt-portion', groupTitle: 'Portion Size', optionId: 'o-standard', optionName: 'Standard Entrée (140g)', price: 0 }
        ],
        itemPrice: 34.0
      },
      {
        id: 'cart-line-3',
        menuItem: INITIAL_MENU_ITEMS[7],
        quantity: 2,
        selectedOptions: [],
        itemPrice: 11.0
      }
    ],
    subtotal: 81.5,
    tax: 7.25,
    deliveryFee: 4.99,
    tip: 12.0,
    discount: 0,
    total: 105.74,
    status: 'preparing',
    orderType: 'delivery',
    deliveryAddress: '120 Spring St, Apt 4B, New York, NY 10012',
    paymentMethod: 'apple_pay',
    paymentStatus: 'paid',
    paymentTransactionId: 'txn_ap_8920194012',
    createdAt: new Date(Date.now() - 14 * 60 * 1000).toISOString(),
    estimatedDeliveryMinutes: 18,
    statusTimestamps: {
      placed: new Date(Date.now() - 14 * 60 * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      confirmed: new Date(Date.now() - 12 * 60 * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      preparing: new Date(Date.now() - 6 * 60 * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    },
    liveDriver: {
      name: 'Matteo V.',
      phone: '+1 (555) 912-4029',
      vehicle: 'Vespa E-Sprint (Matte Silver)',
      rating: 4.95,
      lat: 40.7230,
      lng: -73.9985
    }
  }
];

export const INITIAL_BOOKINGS: TableBooking[] = [
  {
    id: 'bk-9102',
    restaurantId: 'rest-1',
    restaurantName: "L'Osteria Nocturne",
    customerName: 'Alexander Wright',
    customerEmail: 'alex.wright@example.com',
    customerPhone: '+1 (555) 392-1084',
    partySize: 2,
    date: 'Tonight',
    timeSlot: '8:00 PM',
    tableType: 'Window Booth',
    specialRequest: 'Corner booth if available. Celebrating birthday.',
    status: 'confirmed',
    createdAt: '2026-09-01T14:30:00Z',
    tableNumber: 'Table 2'
  }
];
