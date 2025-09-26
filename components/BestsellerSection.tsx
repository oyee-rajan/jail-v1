import React from 'react';
import Image from 'next/image';

// --- Data Structures ---

interface ProductDetails {
  name: string;
  mrp: string;
  colors: string[];
}

// Data for the fixed products shown at the bottom
const productLeft: ProductDetails = {
  name: 'Leather Watch Case',
  mrp: '₹12,699',
  colors: ['bg-red-900', 'bg-green-700', 'bg-black'],
};

const productRight: ProductDetails = {
  name: 'Steamer Carryon',
  mrp: '₹31,000',
  colors: ['bg-red-900', 'bg-yellow-400', 'bg-white'],
};

// Tailwind class for the gold border line
const goldBorder = 'border-t border-b border-yellow-800';

// --- Component ---

const BestSellerSectionStatic: React.FC = () => {
  return (
    <section className="bg-black py-16 text-white font-serif">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* --- Top Section: FOR HIM / FOR HER --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
          
          {/* Left Card: FOR HIM */}
          <div className="relative aspect-[4/3] overflow-hidden">
            <Image
              // public\assets\Hero\Rectangle 634.png
              src="/assets/Hero/Rectangle 634.png"
              alt="Man wearing a black leather backpack in a forest"
              layout="fill"
              objectFit="cover"
              className="brightness-90"
              priority={true}
            />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <span className="text-4xl font-light tracking-wider text-white">
                FOR HIM
              </span>
            </div>
          </div>
          
          {/* Right Card: FOR HER */}
          <div className="relative aspect-[4/3] overflow-hidden">
             <Image
              // public\assets\Hero\Rectangle 355.png
              src="/assets/Hero/Rectangle 355.png"
              alt="Woman wearing a black and red shoulder bag"
              layout="fill"
              objectFit="cover"
              className="brightness-90"
              priority={true}
            />
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <span className="text-4xl font-light tracking-wider text-white">
                FOR HER
              </span>
            </div>
          </div>
        </div>

        {/* --- Center Section: OUR BEST SELLER & Tabs (Static) --- */}
        <div className="flex flex-col items-center">
          <p className="text-sm tracking-widest text-white/80 uppercase mb-4">
            OUR BEST SELLER
          </p>
          
          <div className={`w-full ${goldBorder}`}>
            <div className="flex justify-center space-x-8 py-3">
              {/* Static tab display */}
              <span className="text-lg font-medium text-yellow-600 border-b-2 border-yellow-600 pb-1 px-4">
                MEN
              </span>
              <span className="text-lg font-medium text-white/60 pb-1 px-4">
                WOMEN
              </span>
            </div>
          </div>
        </div>

        {/* --- Bottom Section: Single Featured Image with overlaid text details --- */}
        <div className="mt-10 relative">
          
          {/* Single Rectangular Image */}
          <div className="relative w-full aspect-[2/1] md:aspect-[3/1] overflow-hidden">
             <Image
                // E:\six.ind\Projects\jail\public\assets\Hero\image 371.png
                src="/assets/Hero/image 371.png"
                alt="Leather watch case and steamer carryon suitcase"
                layout="fill"
                objectFit="cover"
                priority={false} 
              />
          </div>
          
          {/* Product Details Overlay (Positioned to match the image layout) */}
          <div className="grid grid-cols-2 gap-8 absolute inset-0 pt-20 md:pt-48 pb-0 md:pb-4 text-center">
            
            {/* Left Product Details */}
            <div className="flex flex-col items-center justify-end">
              <p className="text-lg font-normal">{productLeft.name}</p>
              <p className="text-sm text-gray-400">MRP {productLeft.mrp}</p>
              <div className="flex justify-center space-x-2 mt-2">
                {productLeft.colors.map((colorClass, index) => (
                  <div key={index} className={`w-3 h-3 rounded-full ${colorClass} border border-gray-600`}></div>
                ))}
              </div>
            </div>

            {/* Right Product Details */}
            <div className="flex flex-col items-center justify-end">
              <p className="text-lg font-normal">{productRight.name}</p>
              <p className="text-sm text-gray-400">MRP {productRight.mrp}</p>
              <div className="flex justify-center space-x-2 mt-2">
                {productRight.colors.map((colorClass, index) => (
                  <div key={index} className={`w-3 h-3 rounded-full ${colorClass} border border-gray-600`}></div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* --- Bottom Link --- */}
        <div className="text-center mt-12">
          <a href="#" className="text-sm tracking-widest text-white/70 hover:text-white transition-colors duration-200 border-b border-white/70 pb-1">
            EXPLORE BEST SELLERS
          </a>
        </div>

      </div>
    </section>
  );
};

export default BestSellerSectionStatic;