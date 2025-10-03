// Mock data for categories, subcategories, and products

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  imageUrl: string;
  subcategories: Subcategory[];
}

export interface Subcategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  imageUrl: string;
}

export interface Product {
  id: string | number;
  name: string;
  price: number;
  imageUrl: string;
  description?: string;
  colors?: Array<{ name: string; hex: string }>;
  inStock?: boolean;
}

// Mock categories data
const categories: Category[] = [
  {
    id: '1',
    name: 'Man',
    slug: 'man',
    description: 'Premium leather goods for men',
    imageUrl: '/assets/productspecificatin/wallets.png',
    subcategories: [
      {
        id: '1-1',
        name: 'Wallets',
        slug: 'wallets',
        description: 'Premium leather wallets',
        imageUrl: '/assets/productspecificatin/wallets.png'
      },
      {
        id: '1-2',
        name: 'Belts',
        slug: 'belts',
        description: 'Classic leather belts',
        imageUrl: '/assets/productspecificatin/wallets.png'
      }
    ]
  },
  {
    id: '2',
    name: 'Women',
    slug: 'women',
    description: 'Elegant leather goods for women',
    imageUrl: '/assets/productspecificatin/wallets.png',
    subcategories: [
      {
        id: '2-1',
        name: 'Handbags',
        slug: 'handbags-women',
        description: 'Stylish leather handbags',
        imageUrl: '/assets/productspecificatin/wallets.png'
      }
    ]
  },
  {
    id: '3',
    name: 'Travel',
    slug: 'travel',
    description: 'Travel essentials and luggage',
    imageUrl: '/assets/productspecificatin/wallets.png',
    subcategories: [
      {
        id: '3-1',
        name: 'Luggage',
        slug: 'luggage',
        description: 'Premium travel luggage',
        imageUrl: '/assets/productspecificatin/wallets.png'
      }
    ]
  }
];

// Mock products data
const products: Product[] = [
  {
    id: 1,
    name: 'Premium Leather Wallet',
    price: 2500,
    imageUrl: '/assets/productspecificatin/wallets.png',
    description: 'Handcrafted leather wallet with multiple compartments',
    colors: [
      { name: 'Black', hex: '#000000' },
      { name: 'Brown', hex: '#8B4513' }
    ],
    inStock: true
  },
  {
    id: 2,
    name: 'Classic Leather Belt',
    price: 1800,
    imageUrl: '/assets/productspecificatin/wallets.png',
    description: 'Genuine leather belt with brass buckle',
    colors: [
      { name: 'Black', hex: '#000000' },
      { name: 'Brown', hex: '#8B4513' }
    ],
    inStock: true
  },
  {
    id: 3,
    name: 'Elegant Handbag',
    price: 4500,
    imageUrl: '/assets/productspecificatin/wallets.png',
    description: 'Sophisticated leather handbag for everyday use',
    colors: [
      { name: 'Black', hex: '#000000' },
      { name: 'Tan', hex: '#D2B48C' }
    ],
    inStock: true
  },
  {
    id: 4,
    name: 'Travel Duffel Bag',
    price: 3500,
    imageUrl: '/assets/productspecificatin/wallets.png',
    description: 'Spacious duffel bag for all your travel needs',
    colors: [
      { name: 'Black', hex: '#000000' },
      { name: 'Navy', hex: '#000080' }
    ],
    inStock: true
  }
];

// Helper functions
export const getAllCategories = (): Category[] => {
  return categories;
};

export const getCategoryBySlug = (slug: string): Category | undefined => {
  return categories.find(category => category.slug === slug);
};

export const getSubcategoryBySlug = (categorySlug: string, subcategorySlug: string): Subcategory | undefined => {
  const category = getCategoryBySlug(categorySlug);
  if (!category) return undefined;
  
  return category.subcategories.find(subcategory => subcategory.slug === subcategorySlug);
};

export const getProductsByCategory = (categorySlug: string): Product[] => {
  // Return all products for now - in a real app, you'd filter by category
  return products;
};

export const getProductsBySubcategory = (categorySlug: string, subcategorySlug: string): Product[] => {
  // Return all products for now - in a real app, you'd filter by subcategory
  return products;
};

export const getProductById = (id: string | number): Product | undefined => {
  return products.find(product => product.id === id);
};

