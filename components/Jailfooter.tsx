// components/JailLuxuryFooter.tsx
"use client";

import Image from "next/image";
import React from "react";

const JailLuxuryFooter: React.FC = () => {
  return (
    // Outer container for the entire footer section
    <footer className="relative w-full overflow-hidden py-12 text-gray-400">
      {/* Background Image (Image 2) */}
      <Image
        src="/assets/hero/ft.png" // Assuming you save Image 2 here
        alt="Dark gradient background"
        fill
        priority
        className="object-cover object-center z-0"
        sizes="100vw"
      />

      {/* Content Wrapper - positioned above the background image */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        {/* Main Grid for Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-x-8 gap-y-12 pb-8 border-b border-gray-700/50">
          {/* === COLUMN 1: Brand Info & Separator === */}
          {/* Centering all items in the column */}
          <div className="flex flex-col items-center md:border-r md:border-white/30 md:pr-8 text-center">
            <div className="w-full flex flex-col items-center">
              {/* JAIL LUXURY Logo */}
              <div className="mb-4 flex items-center justify-center">
                {/* JAIL Luxury Logo (Image) */}
                <Image
                  src="/assets/hero/jail.png"
                  alt="Jail Luxury Logo"
                  width={50}
                  height={50}
                  priority={false}
                />

                {/* ADDED: LUXURY Text */}
                <span className="text-white text-3xl font-bold ml-2">
                  LUXURY
                </span>
              </div>
              {/* Full list element: Description and Contact */}
              <p className="text-sm leading-relaxed mb-4">
                Jail is a luxury e-commerce store which sells premium leather
                products
              </p>
              <p className="text-sm">
                Mobile:{" "}
                <a
                  href="tel:+918585858586"
                  className="text-white hover:text-yellow-500 transition-colors"
                >
                  +91-8585858586
                </a>
              </p>
              <p className="text-sm mt-1">
                Email:{" "}
                <a
                  href="mailto:support@jailluxury.com"
                  className="text-white hover:text-yellow-500 transition-colors"
                >
                  support@jailluxury.com
                </a>
              </p>
            </div>
          </div>

          {/* === COLUMN 2: Company & Help (Side-by-Side) & Separator === */}
          <div className="md:border-r md:border-white/30 md:pr-8 flex flex-col items-center">
            {/* Inner Flex container to place Company and Help side-by-side, centered */}
            <div className="flex flex-row gap-8 justify-center w-full">
              {/* Company Section (Full list element) */}
              <div className="flex flex-col items-center text-center">
                <h3 className="text-black text-lg mb-4 bg-white px-3 py-1 rounded-md inline-block">
                  Company
                </h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    <a
                      href="/about"
                      className="hover:text-white transition-colors"
                    >
                      About Us
                    </a>
                  </li>
                  <li>
                    <a
                      href="/contact"
                      className="hover:text-white transition-colors"
                    >
                      Contact Us
                    </a>
                  </li>
                </ul>
              </div>

              {/* Vertical Separator for Company/Help (Internal Line) */}
              <div className="self-stretch w-px bg-white/30 h-auto hidden sm:block"></div>

              {/* Help Section (Full list element) */}
              <div className="flex flex-col items-center text-center">
                <h3 className="text-black text-lg mb-4 bg-white px-3 py-1 rounded-md inline-block">
                  Help
                </h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    <a
                      href="/terms"
                      className="hover:text-white transition-colors"
                    >
                      Terms and Conditions
                    </a>
                  </li>
                  <li>
                    <a
                      href="/privacy"
                      className="hover:text-white transition-colors"
                    >
                      Privacy Policy
                    </a>
                  </li>
                  <li>
                    <a
                      href="/returns"
                      className="hover:text-white transition-colors"
                    >
                      Returns and Refunds Policy
                    </a>
                  </li>
                  <li>
                    <a
                      href="/shipping"
                      className="hover:text-white transition-colors"
                    >
                      Shipping Policy
                    </a>
                  </li>
                  <li>
                    <a
                      href="/cancellation"
                      className="hover:text-white transition-colors"
                    >
                      Cancellation Policy
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* === COLUMN 3: Shop Products & Separator === */}
          <div className="md:border-r md:border-white/30 md:pr-8 flex flex-col items-center text-center">
            <h3 className="text-black text-lg mb-4 bg-white px-3 py-1 rounded-md inline-block">
              Shop Products
            </h3>
            {/* Full list element: Products */}
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="/products/bags"
                  className="hover:text-white transition-colors"
                >
                  Bags
                </a>
              </li>
              <li>
                <a
                  href="/products/belts"
                  className="hover:text-white transition-colors"
                >
                  Belts
                </a>
              </li>
              <li>
                <a
                  href="/products/duffle-bags"
                  className="hover:text-white transition-colors"
                >
                  Duffle Bags
                </a>
              </li>
              <li>
                <a
                  href="/products/gloves"
                  className="hover:text-white transition-colors"
                >
                  Gloves
                </a>
              </li>
              <li>
                <a
                  href="/products/jackets"
                  className="hover:text-white transition-colors"
                >
                  Jackets
                </a>
              </li>
              <li>
                <a
                  href="/products/shoes"
                  className="hover:text-white transition-colors"
                >
                  Shoes
                </a>
              </li>
              <li>
                <a
                  href="/products/trolley"
                  className="hover:text-white transition-colors"
                >
                  Trolley
                </a>
              </li>
              <li>
                <a
                  href="/products/wallets"
                  className="hover:text-white transition-colors"
                >
                  Wallets
                </a>
              </li>
            </ul>
          </div>

          {/* === COLUMN 4: Location === */}
          <div className="flex flex-col items-center text-center">
            <h3 className="text-black text-lg mb-4 bg-white px-3 py-1 rounded-md inline-block">
              Location
            </h3>
            {/* Full list element: Address */}
            <address className="not-italic text-sm leading-relaxed">
              3633 Prabhhash Complex
              <br />
              Mukundapur Bhagwanpur – 24
              <br />
              South Pargana
              <br />
              Kolkata 700150
              <br />
              India
            </address>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="pt-8 text-center text-sm">
          <p>&copy; Copyright 2025 Jail Luxury. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default JailLuxuryFooter;
