import React, { useRef, useState, useEffect, useMemo } from 'react';

// Define the properties for each slide item
interface SlideItem {
  id: number;
  imageUrl: string;
}

const ImageSlider: React.FC = () => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [isManualStop, setIsManualStop] = useState(false);

  // --- Configuration Constants ---
  const ITEM_WIDTH = 256; // Tailwinf w-[256px]
  const ITEM_GAP = 16;    // Tailwind space-x-4
  const SCROLL_AMOUNT = ITEM_WIDTH + ITEM_GAP; // 272px
  const AUTOSCROLL_DURATION_MS = 1500; // 1.5 seconds

  // Define your original slides data with image URLs.
  const originalSlides: SlideItem[] = useMemo(() => [
    { id: 1, imageUrl: 'https://placehold.co/400x600/808080/FFFFFF?text=Product+1' },
    { id: 2, imageUrl: 'https://placehold.co/400x600/949494/FFFFFF?text=Product+2' },
    { id: 3, imageUrl: 'https://placehold.co/400x600/7a7a7a/FFFFFF?text=Product+3' },
    { id: 4, imageUrl: 'https://placehold.co/400x600/5e5e5e/FFFFFF?text=Product+4' },
    { id: 5, imageUrl: 'https://placehold.co/400x600/8c8c8c/FFFFFF?text=Product+5' },
    { id: 6, imageUrl: 'https://placehold.co/400x600/6f6f6f/FFFFFF?text=Product+6' },
    { id: 7, imageUrl: 'https://placehold.co/400x600/858585/FFFFFF?text=Product+7' },
    { id: 8, imageUrl: 'https://placehold.co/400x600/666666/FFFFFF?text=Product+8' },
  ], []);
  
  // Create the infinite loop data by duplicating the slides three times
  const infiniteSlides = useMemo(() => [
    ...originalSlides.map(s => ({ ...s, key: `a-${s.id}` })), // First copy
    ...originalSlides.map(s => ({ ...s, key: `b-${s.id}` })), // Second (middle) copy
    ...originalSlides.map(s => ({ ...s, key: `c-${s.id}` })), // Third copy
  ], [originalSlides]);

  // Calculate the boundaries for the seamless jump
  const ORIGINAL_COUNT = originalSlides.length; // 8
  // This is the scroll position *at the start* of the middle block (b-1)
  const JUMP_BACK_POSITION = ORIGINAL_COUNT * SCROLL_AMOUNT; 
  // This is the scroll position *after* the middle block (c-1 is visible)
  const RESET_THRESHOLD = 2 * ORIGINAL_COUNT * SCROLL_AMOUNT;

  // --- Effect for automatic scrolling (Infinite Loop) ---
  useEffect(() => {
    // Stop the auto-scroll if the user has manually interacted or if the component is paused
    if (isManualStop || isPaused) {
      return;
    }

    const intervalId = setInterval(() => {
      if (sliderRef.current) {
        const container = sliderRef.current;
        
        // 1. Check if the current scroll position is at the end of the middle block (the second copy).
        if (container.scrollLeft >= RESET_THRESHOLD) {
          // 2. Instant jump: move back to the start of the middle block. 
          // The content is identical, so the user won't notice the position change.
          container.scrollLeft = JUMP_BACK_POSITION;
        }

        // 3. Smooth scroll one item forward to continue the animation.
        container.scrollBy({ left: SCROLL_AMOUNT, behavior: 'smooth' });
      }
    }, AUTOSCROLL_DURATION_MS); 

    // Cleanup function to clear the interval
    return () => clearInterval(intervalId);
  }, [isManualStop, isPaused]); // Dependencies now reflect the infinite logic constants

  // Handle user interaction events
  const handleMouseEnter = () => setIsPaused(true);
  const handleMouseLeave = () => setIsPaused(false);

  // Manual scroll functions
  const scrollLeft = () => {
    if (sliderRef.current) {
      setIsManualStop(true); // Stop auto-scroll permanently on manual interaction
      
      // Manual backward scrolling needs to handle the jump too for smooth movement.
      const container = sliderRef.current;
      
      // If scrolling left from the start of the middle block (index 8), jump to the last item of the second block (index 15)
      if (container.scrollLeft <= JUMP_BACK_POSITION) {
        // Jump to the item just before the reset threshold (end of second block)
        container.scrollLeft = RESET_THRESHOLD - SCROLL_AMOUNT; 
      } else {
        container.scrollBy({ left: -SCROLL_AMOUNT, behavior: 'smooth' });
      }
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      setIsManualStop(true); // Stop auto-scroll permanently on manual interaction
      
      const container = sliderRef.current;

      // If scrolling right passes the reset point, instantly jump back to the start of the middle block.
      if (container.scrollLeft + SCROLL_AMOUNT >= RESET_THRESHOLD) {
        // Scroll one step, then instantly jump back to the start of the middle block
        container.scrollBy({ left: SCROLL_AMOUNT, behavior: 'smooth' });
        setTimeout(() => {
          container.scrollLeft = JUMP_BACK_POSITION;
        }, 300); // 300ms is enough to allow the smooth scroll animation to start before the jump
      } else {
        container.scrollBy({ left: SCROLL_AMOUNT, behavior: 'smooth' });
      }
    }
  };


  return (
    <div 
      className="relative w-full max-w-full mx-auto pt-5 pb-6 bg-gray-50 overflow-hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="text-center ">
        {/* NEW SUBTITLE: Adapted for responsive design and visibility */}
        <p className="font-light text-xl tracking-widest text-gray-700 uppercase">
          From our gallery
        </p>
        
      </div>

      {/* Scrollable Content Container */}
      <div 
        ref={sliderRef}
        // Snap-scrolling is enabled here for native feel
        className="flex overflow-x-scroll space-x-4 -mt-6  scroll-smooth snap-x snap-mandatory"
        style={{ WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none', msOverflowStyle: 'none' }} // Hide scrollbar in modern and IE browsers
      >
        {infiniteSlides.map((slide) => (
          <div 
            key={slide.key} // Use unique keys for duplicated slides
            className="flex-none w-[256px] h-[384px] relative overflow-hidden rounded-xl shadow-2xl bg-white snap-center transition-transform hover:scale-[1.02] duration-300"
          >
            <img
              src={slide.imageUrl}
              alt={`Product ${slide.id}`}
              className="w-full h-full object-cover rounded-xl"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent flex items-end p-4">
              <span className="text-white text-xl font-bold">{`Product ${slide.id}`}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <button 
        onClick={scrollLeft}
        aria-label="Scroll left"
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 z-20 opacity-80 hover:opacity-100 hover:bg-black/70 focus:outline-none shadow-lg"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
      </button>

      <button 
        onClick={scrollRight}
        aria-label="Scroll right"
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 z-20 opacity-80 hover:opacity-100 hover:bg-black/70 focus:outline-none shadow-lg"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
      </button>

      {/* Manual Stop Indicator (Optional - for debugging/clarity) */}
      {isManualStop && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-red-500 text-white text-xs font-medium px-3 py-1 rounded-full shadow-lg">
              Auto-Scroll Disabled
          </div>
      )}
    </div>
  );
};

export default ImageSlider;
