import React, { useRef, useState, useEffect } from 'react';

// Define the properties for each slide item
interface SlideItem {
  id: number;
  imageUrl: string;
}

const ImageSlider: React.FC = () => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [isManualStop, setIsManualStop] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Define your slides data with image URLs. Replace these with your own URLs.
  const slides: SlideItem[] = [
    { id: 1, imageUrl: 'https://placehold.co/400x600/808080/FFFFFF?text=Product+1' },
    { id: 2, imageUrl: 'https://placehold.co/400x600/949494/FFFFFF?text=Product+2' },
    { id: 3, imageUrl: 'https://placehold.co/400x600/7a7a7a/FFFFFF?text=Product+3' },
    { id: 4, imageUrl: 'https://placehold.co/400x600/5e5e5e/FFFFFF?text=Product+4' },
    { id: 5, imageUrl: 'https://placehold.co/400x600/8c8c8c/FFFFFF?text=Product+5' },
    { id: 6, imageUrl: 'https://placehold.co/400x600/6f6f6f/FFFFFF?text=Product+6' },
    { id: 7, imageUrl: 'https://placehold.co/400x600/858585/FFFFFF?text=Product+7' },
    { id: 8, imageUrl: 'https://placehold.co/400x600/666666/FFFFFF?text=Product+8' },
  ];
  
  // Effect for automatic scrolling
  useEffect(() => {
    // Stop the auto-scroll if the user has manually interacted or if the component is paused
    if (isManualStop || isPaused) {
      return;
    }

    const intervalId = setInterval(() => {
      if (sliderRef.current) {
        // Calculate the scroll amount (item width + gap)
        const scrollAmount = 256 + 16; 
        const container = sliderRef.current;
        const newScrollLeft = container.scrollLeft + scrollAmount;
        
        // Loop back to the beginning if we've reached the end
        if (newScrollLeft >= container.scrollWidth - container.clientWidth) {
          container.scrollLeft = 0;
          setCurrentIndex(0);
        } else {
          container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
          setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
        }
      }
    }, 1500); // DURATION CHANGED TO 1500ms (1.5 seconds)

    // Cleanup function to clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [isManualStop, isPaused, slides.length]);

  // Handle user interaction events
  const handleMouseEnter = () => setIsPaused(true);
  const handleMouseLeave = () => setIsPaused(false);

  // Manual scroll functions
  const scrollLeft = () => {
    if (sliderRef.current) {
      setIsManualStop(true);
      sliderRef.current.scrollBy({ left: -272, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      setIsManualStop(true); // Stop auto-scroll permanently on manual right-arrow click
      sliderRef.current.scrollBy({ left: 272, behavior: 'smooth' });
    }
  };

  return (
    <div 
      className="relative w-full max-w-full mx-auto py-12 bg-white overflow-hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      
      {/* Scrollable Content Container */}
      <div 
        ref={sliderRef}
        // Snap-scrolling is enabled here for native feel
        className="flex overflow-x-scroll space-x-4 p-4 scroll-smooth snap-x snap-mandatory"
        style={{ WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none' }} 
      >
        {slides.map((slide) => (
          <div 
            key={slide.id} 
            className="flex-none w-[256px] h-[384px] relative overflow-hidden shadow-xl snap-center"
          >
            <img
              src={slide.imageUrl}
              alt={`Product ${slide.id}`}
              className="w-full h-full object-cover"
              // The user can replace this img tag with a different component later
            />
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <button 
        onClick={scrollLeft}
        aria-label="Scroll left"
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white w-10 h-10 rounded-full flex items-center justify-center transition-opacity duration-300 z-20 hover:opacity-100 focus:outline-none opacity-50"
      >
        &lt;
      </button>

      <button 
        onClick={scrollRight}
        aria-label="Scroll right"
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white w-10 h-10 rounded-full flex items-center justify-center transition-opacity duration-300 z-20 hover:opacity-100 focus:outline-none opacity-50"
      >
        &gt;
      </button>
    </div>
  );
};

export default ImageSlider;
