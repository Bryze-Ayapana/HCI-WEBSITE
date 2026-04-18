import React, { useState, useEffect } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const NewsUpdates = () => {
  const [isLoading, setIsLoading] = useState(true);

  // ── UPPER BANNER LOGIC ──
  const [upperIndex, setUpperIndex] = useState(0);
  const upperBanners = [
    { id: 1, src: '/upperBanner1.png', alt: '2025 Junior Level Science Scholarships' },
    { id: 2, src: '/upperBanner2.png', alt: 'Upper Banner 2' },
    { id: 3, src: '/upperBanner3.png', alt: 'Upper Banner 3' },
  ];

  // ── LOWER CAROUSEL LOGIC ──
  const [lowerIndex, setLowerIndex] = useState(0);
  const lowerBanners = [
    { id: 1, src: '/lowerBanner1.png', date: 'March 19, 2026', title: 'Explore augmented reality for classroom instruction' },
    { id: 2, src: '/lowerBanner2.png', date: 'March 18, 2026', title: 'Scholar-volunteer sparks curiosity through storytelling' },
    { id: 3, src: '/lowerBanner3.png', date: 'March 15, 2026', title: 'Region III launches its first 21st CLEM classroom' },
    { id: 4, src: '/lowerBanner4.png', date: 'March 10, 2026', title: 'New sports science facility opens' },
  ];

  // ADDED: Dynamic visible cards state to handle 2 on mobile, 3 on desktop
  const [visibleCards, setVisibleCards] = useState(3);

  useEffect(() => {
    // Determine how many cards to show based on screen width
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setVisibleCards(2); // 2 cards for mobile
      } else {
        setVisibleCards(3); // 3 cards for desktop
      }
    };

    // Set initial value
    handleResize();

    // Listen for window resizes
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  // Handlers for the lower carousel
  const nextLower = () => {
    setLowerIndex((prev) => (prev + 1 > lowerBanners.length - visibleCards ? 0 : prev + 1));
  };

  const prevLower = () => {
    setLowerIndex((prev) => (prev === 0 ? lowerBanners.length - visibleCards : prev - 1));
  };

  // Auto-scroll the upper banner every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setUpperIndex((prev) => (prev + 1) % upperBanners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [upperBanners.length]);

  return (
    <section className="py-20 bg-transparent dark:bg-transparent transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header Title & Description */}
        <div className="mb-12 flex flex-col items-center text-center">
          {/* MOBILE FIX: Scaled mobile text down to text-[45px] so "PSC TODAY" fits on one line. Desktop remains unchanged. */}
          <h2 className="text-[45px] sm:text-7xl md:text-[100px] lg:text-[130px] leading-none tracking-tight flex items-center justify-center gap-2 uppercase drop-shadow-lg">
            
            {/* PSC */}
            <span className="font-semibold bg-gradient-to-r from-ph-yellow to-yellow-500 dark:from-[#fbd11e] dark:to-[#fdff8d] bg-clip-text text-transparent">
              PSC
            </span>
            
            {/* TODAY */}
            <span className="font-semibold bg-gradient-to-r from-ph-blue to-blue-700 dark:from-cyan-400 dark:to-blue-500 bg-clip-text text-transparent">
              TODAY
            </span>
            
          </h2>
          
          {/* Section Introduction */}
          {/* MOBILE FIX: Scaled text down to text-[10px] for mobile to match the design. Desktop remains unchanged. */}
          <p className="mt-4 text-[10px] sm:text-xs md:text-sm text-gray-500 dark:text-gray-400 max-w-xl font-normal tracking-wide leading-relaxed">
            Stay up to date with the latest news, events, and milestones. Discover the stories, updates, and triumphs shaping the journey of every Filipino athlete.
          </p>
        </div>

        {isLoading ? (
          // Simple loading skeleton structure
          <div className="animate-pulse space-y-6">
             <div className="w-full h-[180px] md:h-[400px] bg-gray-200 dark:bg-gray-800 rounded-xl"></div>
             <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
               <div className="h-36 md:h-48 bg-gray-200 dark:bg-gray-800 rounded-xl"></div>
               <div className="h-36 md:h-48 bg-gray-200 dark:bg-gray-800 rounded-xl"></div>
               <div className="hidden md:block h-48 bg-gray-200 dark:bg-gray-800 rounded-xl"></div>
             </div>
          </div>
        ) : (
          <div className="space-y-6">
            
            {/* ── 1. UPPER CAROUSEL (FEATURED BANNER) ── */}
            {/* MOBILE FIX: Changed mobile height from 300px to 180px for a better landscape ratio. Desktop remains unchanged. */}
            <div className="relative w-full h-[180px] sm:h-[300px] md:h-[400px] rounded-xl overflow-hidden shadow-lg border border-gray-200 dark:border-transparent group">
              
              {/* Image */}
              <img
                src={upperBanners[upperIndex].src}
                alt={upperBanners[upperIndex].alt}
                className="w-full h-full object-cover transition-opacity duration-500"
              />
              
              {/* Gradient overlay */}
              <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />

              {/* Controls */}
              <div className="absolute bottom-2 sm:bottom-4 right-2 sm:right-4 flex gap-2 z-10">
                {upperBanners.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setUpperIndex(idx)}
                    className={`h-2.5 rounded-full transition-all duration-300 drop-shadow-md ${
                      upperIndex === idx 
                        ? 'bg-white w-8' 
                        : 'bg-white/60 hover:bg-white w-2.5'
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* ── 2. LOWER CAROUSEL (NEWS CARDS) ── */}
            <div className="relative group">
              
              {/* Left Arrow Button */}
              {/* MOBILE FIX: Made arrows always visible on mobile (opacity-100) and pulled them slightly outside (-left-3). Desktop remains unchanged. */}
              <button
                onClick={prevLower}
                className="absolute -left-3 md:left-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 md:w-10 md:h-10 bg-black/60 md:bg-black/40 hover:bg-black/70 backdrop-blur text-white flex items-center justify-center rounded-full transition-all opacity-100 md:opacity-0 group-hover:opacity-100"
              >
                <FiChevronLeft size={20} className="md:w-6 md:h-6" />
              </button>

              {/* Overflow Container */}
              <div className="overflow-hidden rounded-xl px-1 py-1">
                {/* The sliding track */}
                <div
                  className="flex transition-transform duration-500 ease-in-out gap-4 md:gap-6"
                  style={{ transform: `translateX(-${lowerIndex * (100 / visibleCards)}%)` }}
                >
                  {lowerBanners.map((item) => (
                    // MOBILE FIX: Replaced min-w-full with min-w-[calc(50%-8px)] to fit exactly 2 cards. Desktop remains unchanged.
                    // Changed mobile height to h-32 to match the screenshot aspect ratio. Desktop remains h-56.
                    <div key={item.id} className="min-w-[calc(50%-8px)] md:min-w-[calc(33.333%-16px)] relative h-32 sm:h-48 md:h-56 rounded-xl overflow-hidden shadow-md group/card cursor-pointer">
                      <img
                        src={item.src}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-500"
                      />
                      
                      {/* Dark gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                      
                      {/* Date Badge */}
                      {/* MOBILE FIX: Scaled date text to text-[8px] and reduced padding. Desktop remains text-[10px]. */}
                      <div className="absolute top-2 md:top-3 right-2 md:right-3 bg-black/60 backdrop-blur-md text-white text-[8px] md:text-[10px] font-bold px-2 py-1 md:px-3 rounded-md">
                        {item.date}
                      </div>

                      {/* Title Text */}
                      {/* MOBILE FIX: Scaled title to text-[10px] with tighter leading. Desktop remains text-sm. */}
                      <div className="absolute bottom-0 left-0 w-full p-2 md:p-4">
                        <h3 className="text-white text-[10px] md:text-sm font-bold leading-tight md:leading-snug line-clamp-2 md:line-clamp-2">
                          {item.title}
                        </h3>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Arrow Button */}
              {/* MOBILE FIX: Made arrows always visible on mobile and pulled them slightly outside. */}
              <button
                onClick={nextLower}
                className="absolute -right-3 md:right-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 md:w-10 md:h-10 bg-black/60 md:bg-black/40 hover:bg-black/70 backdrop-blur text-white flex items-center justify-center rounded-full transition-all opacity-100 md:opacity-0 group-hover:opacity-100"
              >
                <FiChevronRight size={20} className="md:w-6 md:h-6" />
              </button>

            </div>
          </div>
        )}

      </div>
    </section>
  );
};

export default NewsUpdates;