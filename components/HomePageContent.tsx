"use client";
import Image from "next/image";
import React from "react";
import CollectionDisplay from "./Collectiondisplay";
import ShopByCategories from "./ShopbyCategories";
import BestSellerSection from "./BestsellerSection";
import CategoryShowcase from "./CategoryShowcase";
import ImageSlider from "./ImageSlider";
import JailLuxurySection from "./JailLuxurySection";
import Jailfooter from "./Jailfooter";

const HomePageContent: React.FC = () => {
  return (
    <div className="bg-neutral-800 text-white min-h-screen">
      {/* Hero Section - ALIBI Banner */}
      {/* Hero Section - ALIBI Banner */}
      <div className="relative w-full h-[500px] mb-8">
        {/* CORRECTED SRC PATH: /assets/Hero/herobanner.png */}

        <Image
          src="/assets/Hero/herobanner.png"
          alt="Quality Leather Goods Hero Banner"
          fill
          priority
          className=" z-1 object-cover object-center"
          sizes="(max-width: 768px) 100vw, 100vw"
        />

        <div></div>
        <button className=" cursor-pointer absolute bg-gray-400 w-[245px] h-11 top-[452px] bottom-4 left-1/2 rounded-md z-2 -translate-x-1/2">
          View Collecton
        </button>
        <h2 className="absolute top-[500px] left-1/2 -translate-x-1/2 font-light text-[20px] leading-[120%] tracking-[0.14em] w-[203px] h-[24px] opacity-100 z-20 text-white">
          From our gallery
        </h2>
      </div>
      <div>
        <ImageSlider />
      </div>
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-12 ">
        <div className=" flex gap-3 mb-16 justify-center">
          {/* FIRST CARD: DUFFLE (Top/Bottom Positioning) */}
          <div className="w-[670px] h-[455px] bg-[url('/assets/Hero/Component%2024.png')] bg-cover bg-no-repeat opacity-100 p-10">
            <div className="flex flex-col items-center justify-between h-full text-white">
              {/* TOP CONTENT (Title & Slogan) */}
              <div className="flex flex-col items-center">
                <h1 className="font-normal text-[40px] leading-[120%] tracking-[0.14em] font-archivo ">
                  DUFFLE
                </h1>
                <p className="text-[20px] leading-[120%] tracking-[0em] font-poppins font-[200] mt-2 text-center">
                  Crafted for every on the go moment
                </p>
              </div>

              {/* BOTTOM CONTENT (Button) */}
              <button className="cursor-pointer bg-black h-[36px] w-[130px] relative text-white hover:bg-neutral-900 transition-colors">
                Shop
              </button>
            </div>
          </div>

          {/* SECOND CARD: WALLET (MODIFIED to match Top/Bottom Positioning) */}
          <div className="w-[670px] h-[455px] bg-[url('/assets/Hero/Wallet.png')] bg-cover bg-no-repeat opacity-100 p-10">
            {/*
          APPLIED CHANGES:
          - Added 'p-10' padding to the container.
          - Changed 'justify-center' to 'justify-between'.
          - Grouped the h1 and p into a separate div for top alignment.
        */}
            <div className="flex flex-col items-center justify-between h-full text-white">
              {/* TOP CONTENT (Title & Slogan) */}
              <div className="flex flex-col items-center">
                <h1 className="font-normal text-[40px] leading-[120%] tracking-[0.14em] font-archivo ">
                  WALLET
                </h1>
                <p className="text-[20px] leading-[120%] tracking-[0em] font-poppins font-[200] mt-2 text-center">
                  Made to feel the worth
                </p>
              </div>

              {/* BOTTOM CONTENT (Button) */}
              <button className="cursor-pointer bg-black h-[36px] w-[130px] relative text-white hover:bg-neutral-900 transition-colors">
                Shop
              </button>
            </div>
          </div>
        </div>

        {/* another section */}
        <div>
          <ShopByCategories />
        </div>

        <div className="gap-1">
          <CollectionDisplay />
        </div>
        <div>
          <BestSellerSection />
        </div>
        <div>
          <CategoryShowcase />
        </div>

        {/* About Us Section */}
      </div>{" "}
      <div>
        <JailLuxurySection />
      </div>
      {/* Footer Section */}
      <div>
        <Jailfooter/>
      </div>
    </div>

  );
};

export default HomePageContent;
