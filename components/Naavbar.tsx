"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
// Import icons from a library like react-icons for a polished look
import { FiSearch, FiShoppingCart, FiUser, FiMenu } from "react-icons/fi";
import { GoHeart } from "react-icons/go";

// Define the type for a navigation link for better type safety
interface NavItem {
  name: string;
  href: string;
}

const Naavbar: React.FC = () => {
  // Define the main navigation links
  const menuItems: NavItem[] = [
    { name: "CLOTHING", href: "/Clothing" },
    { name: "TRAVEL ", href: "/Travel" },
    { name: "BAG ", href: "/Bag" },
    { name: "PURSE", href: "/Purse" },
    { name: "MAN", href: "/Man" },
    { name: "WOMEN", href: "/Women" },
  ];

  const router = useRouter();

  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);
  const searchContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (searchOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [searchOpen]);

  // Close search when clicking outside
  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (!searchOpen) return;
      const el = searchContainerRef.current;
      if (el && !el.contains(e.target as Node)) {
        setSearchOpen(false);
      }
    };

    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [searchOpen]);

  const toggleSearch = () => {
    setSearchOpen((s) => !s);
  };

  const onSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;
    // Navigate to a search results page; using query param so you can implement the page under /app/search or pages/search
    router.push(`/search?query=${encodeURIComponent(trimmed)}`);
    // optionally close and clear
    setSearchOpen(false);
    setQuery("");
  };

  return (
    // Main Navbar container: full width, dark background matching the image, flex for alignment
    <nav className="bg-neutral-900 text-white p-4 sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto flex justify-between items-center h-12">
        {/* 1. Logo Section (Left Aligned) */}
        <div className="flex-shrink-0">
          <Link href="/">
            {/* Use the public path for the image. In Next.js, images in 'public' 
              can be accessed from the root, like '/assets/...' */}
            <Image
              src="/assets/Hero/jail.png" // Adjust path if necessary
              alt="ALIBI Logo"
              // ESTIMATED DIMENSIONS: Adjust these values to match the actual logo size
              width={120}
              height={40}
              // Tailwind classes for size and object fit
              className="h-8 md:h-10 cursor-pointer object-contain"
            />
          </Link>
        </div>

        {/* 2. Menu Section (Center Aligned for Desktop) */}
        <div className="flex flex-col items-center justify-between w-full">
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
          <div className="items-center text-center pt-2">
            {/* Use a slightly different color or smaller text to distinguish it */}
            <p className="text-white text-sm  ">Get discount on sling bag</p>
          </div>
        </div>

        {/* 3. About Us and Icons (Right Aligned) */}
        <div className="flex flex-col items-center space-y-2 md:space-x-6 justify-between">
          {/* About Us Link - Visible on larger screens */}
          <Link
            href="/about-us"
            className="uppercase text-sm font-light tracking-widest hidden lg:block  hover:text-gray-300 active:text-gray-100  transition duration-300 mr-2"
          >
            About us
          </Link>

          {/* Icons */}
          <div className="flex items-center space-x-4 md:space-x-6">
            {/* Search: toggle input, submit navigates to /search?query=... */}
            <div ref={searchContainerRef} className="relative">
              <button
                type="button"
                title="Search"
                onClick={toggleSearch}
                className="text-xl hover:text-gray-300 active:text-gray-100 transition duration-300"
                aria-expanded={searchOpen}
                aria-label="Open search"
              >
                <FiSearch />
              </button>

              {searchOpen && (
                <form
                  onSubmit={onSearchSubmit}
                  className="absolute right-0 mt-2 w-72 md:w-80"
                >
                  <div className="flex items-center bg-white text-black rounded-lg shadow-lg ring-1 ring-black/10 overflow-hidden">
                    <input
                      ref={inputRef}
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="Search products, e.g. wallet"
                      aria-label="Search"
                      className="flex-1 px-3 py-2 text-sm bg-transparent outline-none"
                    />
                    <button
                      type="submit"
                      className="bg-neutral-900 text-white px-3 py-2 text-sm hover:bg-black/90 transition"
                      aria-label="Submit search"
                    >
                      Search
                    </button>
                    <button
                      type="button"
                      onClick={() => setSearchOpen(false)}
                      className="px-2 text-gray-500 hover:text-gray-700"
                      aria-label="Close search"
                    >
                      ✕
                    </button>
                  </div>
                </form>
              )}
            </div>

            <Link
              href="/login"
              title="Account"
              aria-label="Go to login"
              className="text-xl hover:text-gray-300 active:text-gray-100 transition duration-300"
            >
              <FiUser />
            </Link>

            <button
              title="Account"
              className="text-xl  hover:text-gray-300 active:text-gray-100  transition duration-300"
            >
              <GoHeart />
            </button>

            <button
              title="Shopping Cart"
              className="text-xl  hover:text-gray-300 active:text-gray-100  transition duration-300"
            >
              <FiShoppingCart />
            </button>
          </div>

          {/* Hamburger Menu for Mobile */}
          <button
            title="Menu"
            className="md:hidden text-xl hover:text-amber-500 transition duration-300"
          >
            <FiMenu />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Naavbar;
