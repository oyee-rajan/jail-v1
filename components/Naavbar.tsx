import Image from 'next/image';
import React from 'react';
// Import icons from a library like react-icons for a polished look
import { FiSearch, FiShoppingCart, FiUser, FiMenu } from 'react-icons/fi';
import { GoHeart } from "react-icons/go";

// Define the type for a navigation link for better type safety
interface NavItem {
  name: string;
  href: string;
}

const Naavbar: React.FC = () => {
  // Define the main navigation links
  const menuItems: NavItem[] = [
    { name: 'CLOTHING', href: '/clothing' },
    { name: 'TRAVEL ', href: '/bag' },
     { name: 'BAG ', href: '/bag' },
    { name: 'PURSE', href: '/purse' },
    { name: 'MAN', href: '/man' },
    { name: 'WOMEN', href: '/women' },
  ];

  return (
    // Main Navbar container: full width, dark background matching the image, flex for alignment
    <nav className="bg-neutral-900 text-white p-4 sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto flex justify-between items-center h-12">
        
        {/* 1. Logo Section (Left Aligned) */}
        <div className="flex-shrink-0">
          {/* Use the public path for the image. In Next.js, images in 'public' 
              can be accessed from the root, like '/assets/...' */}
          <Image 
            src="/assets/navbar/jail.png" // Adjust path if necessary
            alt="ALIBI Logo" 
            // ESTIMATED DIMENSIONS: Adjust these values to match the actual logo size
            width={120} 
            height={40} 
            // Tailwind classes for size and object fit
            className="h-8 md:h-10 cursor-pointer object-contain" 
          />
        
        </div>

        {/* 2. Menu Section (Center Aligned for Desktop) */}
       <div className='flex flex-col items-center justify-between w-full'>
    {/* 1. Navigation Links (Menu) - Centered and White/Interactive */}
    <div className="hidden md:flex justify-center space-x-7 lg:space-x-10 uppercase text-[15px] tracking-widest pt-2 pb-1">
        {menuItems.map((item) => (
            <a 
                key={item.name} 
                href={item.href}
                // Removed position classes (h, w, top, left) for proper centering and flow
                // Text is white by default, hover/active makes it slightly brighter
                className="text-white text-sm font-light hover:text-gray-300 active:text-gray-100 transition duration-150"
            >
                {item.name}
              
            </a>
        ))}
    </div>

    {/* 2. Discount Message - Centered and Below the Links */}
    <div className='items-center text-center pt-2'>
        {/* Use a slightly different color or smaller text to distinguish it */}
        <p className="text-white text-sm  ">
            Get discount on sling bag
        </p>
    </div>
</div>
      

        {/* 3. About Us and Icons (Right Aligned) */}
        <div className="flex flex-col items-center space-y-2 md:space-x-6 justify-between">
          
          {/* About Us Link - Visible on larger screens */}
          <a 
            href="/about-us" 
            className="uppercase text-sm font-light tracking-widest hidden lg:block  hover:text-gray-300 active:text-gray-100  transition duration-300 mr-2"
          >
            About us
          </a>
          
          {/* Icons */}
          <div className='flex space-x-4 md:space-x-6'>
 <button title="Search" className="text-xl hover:text-gray-300 active:text-gray-100  transition duration-300">
            <FiSearch />
          </button>
          
          <button title="Account" className="text-xl  hover:text-gray-300 active:text-gray-100  transition duration-300">
            <FiUser />
          </button>

             <button title="Account" className="text-xl  hover:text-gray-300 active:text-gray-100  transition duration-300">
            <GoHeart />
          </button>
          
          <button title="Shopping Cart" className="text-xl  hover:text-gray-300 active:text-gray-100  transition duration-300">
            <FiShoppingCart />
          </button>
          </div>
         
          
          {/* Hamburger Menu for Mobile */}
          <button title="Menu" className="md:hidden text-xl hover:text-amber-500 transition duration-300">
            <FiMenu />
          </button>
        </div>

      </div>
    </nav>
  );
}

export default Naavbar;