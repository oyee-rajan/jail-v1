'use client';

import React, { useState } from 'react';
import Image from 'next/image';

// --- Data Structures ---

interface Product {
  name: string;
  mrp: string;
  colors: string[];
}

interface ProductCategory {
  image: string;
  alt: string;
  details: Product;
}

interface CategoryData {
  categories: ProductCategory[];
}

// --- Static Hero Data ---
const menHeroData = {
  heroImage: '/assets/Hero/Rectangle 634.png',
  heroAlt: 'Man wearing a black leather backpack in a forest',
  collection: 'FOR HIM',
};

const womenHeroData = {
  heroImage: '/assets/Hero/Rectangle 355.png',
  heroAlt: 'Woman wearing a black and red shoulder bag',
  collection: 'FOR HER',
};

// --- Product Categories Data ---
const menCategories: CategoryData = {
  categories: [
    {
      image: '/assets/Hero/IMG_5738 1.png',
      alt: 'Premium leather wallet',
      details: {
        name: 'Leather Wallet',
        mrp: '₹2,499',
        colors: ['bg-black', 'bg-amber-800', 'bg-gray-800'],
      },
    },
    {
      image: '/assets/Hero/image 86.png',
      alt: 'Genuine leather belt',
      details: {
        name: 'Leather Belt',
        mrp: '₹1,899',
        colors: ['bg-black', 'bg-amber-900', 'bg-gray-700'],
      },
    },
    {
      image: '/assets/Hero/image 85.png',
      alt: 'Formal leather shoes',
      details: {
        name: 'Formal Shoes',
        mrp: '₹8,999',
        colors: ['bg-black', 'bg-amber-800', 'bg-gray-900'],
      },
    },
    {
      image: '/assets/Hero/image 83.png',
      alt: 'Luxury wrist watch',
      details: {
        name: 'Gloves',
        mrp: '₹15,999',
        colors: ['bg-black', 'bg-yellow-600', 'bg-gray-400'],
      },
    },
  ],
};

const womenCategories: CategoryData = {
  categories: [
    {
      image: '/assets/Hero/IMG_5545 1.png',
      alt: 'Elegant sling bag',
      details: {
        name: 'Sling Bag',
        mrp: '₹3,499',
        colors: ['bg-black', 'bg-pink-400', 'bg-red-600'],
      },
    },
    {
      image: '/assets/Hero/Component 24.png',
      alt: 'Travel duffle bag',
      details: {
        name: 'Duffle Bag',
        mrp: '₹4,999',
        colors: ['bg-black', 'bg-purple-600', 'bg-blue-600'],
      },
    },
    {
      image: '/assets/Hero/ANI01001 1.png',
      alt: 'Premium suitcase',
      details: {
        name: 'Steamer Carryon',
        mrp: '₹31,000',
        colors: ['bg-red-900', 'bg-yellow-400', 'bg-white'],
      },
    },
    {
      image: '/assets/Hero/image 81.png',
      alt: 'Jackets',
      details: {
        name: 'Jackets',
        mrp: '₹6,999',
        colors: ['bg-black', 'bg-green-300', 'bg-blue-400'],
      },
    },
  ],
};

// --- Component ---

const BestSellerSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'MEN' | 'WOMEN'>('MEN');

  // Get current categories based on active tab
  const activeCategories = activeTab === 'MEN' ? menCategories.categories : womenCategories.categories;

  // Tailwind class for the gold border line
  const goldBorder = 'border-t border-b border-yellow-800';
  const tabStyles = (tab: 'MEN' | 'WOMEN') => 
    `text-lg font-medium cursor-pointer transition-colors duration-300 ${
      activeTab === tab 
        ? 'text-yellow-600 border-b-2 border-yellow-600' 
        : 'text-white/60 hover:text-white'
    } pb-1 px-4`;

  return (
    <section className="bg-black py-16 text-white font-serif">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* --- Top Section: FOR HIM / FOR HER (Static) --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
          {/* Card 1: FOR HIM (Always shows men's hero image) */}
          <div className="relative aspect-[4/3] overflow-hidden">
            <Image
              src={menHeroData.heroImage}
              alt={menHeroData.heroAlt}
              layout="fill"
              objectFit="cover"
              className="brightness-90"
              priority={true}
            />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <span className="text-4xl font-light tracking-wider text-white">
                {menHeroData.collection}
              </span>
            </div>
          </div>
          
          {/* Card 2: FOR HER (Always shows women's hero image) */}
          <div className="relative aspect-[4/3] overflow-hidden">
            <Image
              src={womenHeroData.heroImage}
              alt={womenHeroData.heroAlt}
              layout="fill"
              objectFit="cover"
              className="brightness-90"
              priority={true}
            />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <span className="text-4xl font-light tracking-wider text-white">
                {womenHeroData.collection}
              </span>
            </div>
          </div>
        </div>

        {/* --- Center Section: OUR BEST SELLER & Tabs --- */}
        <div className="flex flex-col items-center">
          <p className="text-sm tracking-widest text-white/80 uppercase mb-4">
            OUR BEST SELLER
          </p>
          
          <div className={`w-full ${goldBorder}`}>
            <div className="flex justify-center space-x-8 py-3">
              <span 
                className={tabStyles('MEN')} 
                onClick={() => setActiveTab('MEN')}
              >
                MEN
              </span>
              <span 
                className={tabStyles('WOMEN')} 
                onClick={() => setActiveTab('WOMEN')}
              >
                WOMEN
              </span>
            </div>
          </div>
        </div>

        {/* --- Bottom Section: Product Categories (Dynamic based on tab) --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
          {activeCategories.map((category, index) => (
            <div key={`${activeTab}-${index}`} className="relative flex flex-col items-center group cursor-pointer">
              <div className="relative w-full aspect-square overflow-hidden rounded-lg transition-transform duration-300 group-hover:scale-105">
                <Image
                  src={category.image}
                  alt={category.alt}
                  layout="fill"
                  objectFit="cover"
                  className="transition-brightness duration-300 group-hover:brightness-110"
                  priority={index < 2} // Prioritize loading first 2 images
                />
              </div>
              <div className="text-center mt-4">
                <p className="text-lg font-normal transition-colors duration-300 group-hover:text-yellow-400">
                  {category.details.name}
                </p>
                <p className="text-sm text-gray-400">MRP {category.details.mrp}</p>
                <div className="flex justify-center space-x-2 mt-2">
                  {category.details.colors.map((colorClass, colorIndex) => (
                    <div 
                      key={colorIndex} 
                      className={`w-3 h-3 rounded-full ${colorClass} border border-gray-600 transition-transform duration-300 hover:scale-125`}
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* --- Bottom Link --- */}
        <div className="text-center mt-12">
          <a 
            href="#" 
            className="text-sm tracking-widest text-white/70 hover:text-yellow-400 transition-colors duration-200 border-b border-white/70 hover:border-yellow-400 pb-1"
          >
            EXPLORE BEST SELLERS
          </a>
        </div>

      </div>
    </section>
  );
};

export default BestSellerSection;