import React from 'react';
import Image from 'next/image';

interface Category {
  id: number;
  name: string;
  imageUrl: string; // Path to the category icon/image
  imageAlt: string;
}

const categories: Category[] = [
  { id: 1, name: 'Duffle', imageUrl: '/assets/categories/duffle.png', imageAlt: 'Duffle bag' },
  { id: 2, name: 'Belts', imageUrl: '/assets/categories/belts.png', imageAlt: 'Leather belt' },
  { id: 3, name: 'Bags', imageUrl: '/assets/categories/bags.png', imageAlt: 'Shoulder bag' },
  { id: 4, name: 'Wallet', imageUrl: '/assets/categories/wallet.png', imageAlt: 'Leather wallet' },
  { id: 5, name: 'Travel', imageUrl: '/assets/categories/travel.png', imageAlt: 'Travel essentials' },
  { id: 6, name: 'Jacket', imageUrl: '/assets/categories/jacket.png', imageAlt: 'Stylish jacket' },
  { id: 7, name: 'Gloves', imageUrl: '/assets/categories/gloves.png', imageAlt: 'Leather gloves' },
  { id: 8, name: 'Shoes', imageUrl: '/assets/categories/shoes.png', imageAlt: 'Brown shoes' },
];

const ShopByCategories: React.FC = () => {
  return (
    // Main container for the entire section
    // Dark background (you can change bg-gray-900 to bg-gray-700 or any other shade)
    // p-8 for padding, text-white for text color
    <section className="bg-neutral-900 py-12 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <h2 className="text-center text-xl sm:text-2xl font-normal tracking-widest uppercase mb-10">
          SHOP BY CATEGORIES
        </h2>

        {/* Categories Grid */}
        {/* flex-wrap to allow items to wrap, justify-center to center items */}
        {/* gap-x-6 for horizontal spacing, gap-y-8 for vertical spacing */}
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-8">
          {categories.map((category) => (
            // Individual Category Item
            // flex flex-col to stack image and text, items-center to center horizontally
            // cursor-pointer for hover effect, transition for smooth animation
            <div 
              key={category.id} 
              className="flex flex-col items-center cursor-pointer group w-24 sm:w-28 md:w-32"
              // Adjust width (w-24, w-28, w-32) to control size of circles
            >
              {/* Circular Image Container */}
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full overflow-hidden mb-3 
                              bg-gray-700 flex items-center justify-center 
                              ring-1 ring-gray-600 group-hover:ring-white transition-all duration-300">
                {/* To use an actual image, uncomment the Image component below
                  and ensure your image paths are correct in the public folder.
                  
                  If you want a purely gray background as placeholder, then comment out 
                  the <Image> component and the `bg-gray-700` on the div above will act as the "image".
                */}
                 <Image
                    src={category.imageUrl}
                    alt={category.imageAlt}
                    layout="fill" // Makes the image fill the parent div
                    objectFit="cover" // Covers the area without distortion
                    className="group-hover:scale-105 transition-transform duration-300 brightness-90 group-hover:brightness-100" // Example hover effect
                    priority={false} // Categories might not be critical on first load
                 />
                {/* If you prefer a simpler gray circle placeholder: */}
                {/* <div className="w-full h-full bg-gray-700"></div> */}
              </div>
              
              {/* Category Name */}
              <p className="text-sm sm:text-base font-light uppercase tracking-wide group-hover:text-gray-300 transition-colors duration-300">
                {category.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ShopByCategories;