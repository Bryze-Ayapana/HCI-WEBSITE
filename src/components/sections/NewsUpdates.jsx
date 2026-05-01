import React, { useState, useEffect, useRef } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { Link } from 'react-router-dom'; 

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
    { id: 1, src: '/lowerBanner1.png', date: 'March 19, 2026', title: 'CIGNAL SUPER SPIKERS', subtitle: 'PVL: Cignal takes leave of absence just after silver medal finish' },
    { id: 2, src: '/lowerBanner2.png', date: 'May 01, 2026', title: 'ASEAN Para Games Incentives', subtitle: 'PSC awards cash incentives to ASEAN Para Games medalists' },
    { id: 3, src: '/lowerBanner3.png', date: 'January 10, 2026', title: 'Infrastructure Modernization', subtitle: 'PSC refurbishes tennis center, other Rizal Memorial facilities' },
    { id: 4, src: '/lowerBanner4.png', date: 'May 05, 2026', title: 'FIBA 3x3 World Cup', subtitle: 'Gilas Women reach FIBA 3x3 World Cup knockout stage' },
    // Added ID 5 data below
    { id: 5, src: '/lowerBanner5.png', date: 'May 01, 2026', title: "Alex Eala's Road to Rome", subtitle: 'Alex Eala returns to Nadal academy ahead of Italian Open' },
  ];

  const visibleCards = 4;

  // ── SWIPE & SCROLL LOGIC STATE ──
  const touchStartX = useRef(null);
  const touchEndX = useRef(null);
  const minSwipeDistance = 50;

  const scrollContainerRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const nextLower = () => {
    if (window.innerWidth < 768 && scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 176, behavior: 'smooth' });
    } else {
      setLowerIndex((prev) => (prev + 1 > lowerBanners.length - visibleCards ? 0 : prev + 1));
    }
  };

  const prevLower = () => {
    if (window.innerWidth < 768 && scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -176, behavior: 'smooth' });
    } else {
      setLowerIndex((prev) => (prev === 0 ? lowerBanners.length - visibleCards : prev - 1));
    }
  };

  const onTouchStart = (e) => { touchStartX.current = e.targetTouches[0].clientX; };
  const onTouchMove = (e) => { touchEndX.current = e.targetTouches[0].clientX; };
  const onTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    
    if (window.innerWidth >= 768) {
      if (distance > minSwipeDistance) nextLower();
      if (distance < -minSwipeDistance) prevLower();
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setUpperIndex((prev) => (prev + 1) % upperBanners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [upperBanners.length]);

  return (
    <section className="py-20 bg-transparent dark:bg-[#030A17] transition-colors duration-300 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-12 flex flex-col md:items-center text-left md:text-center">
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-semibold leading-none tracking-tight flex items-center justify-start md:justify-center gap-4 uppercase drop-shadow-lg">
            <span className="bg-gradient-to-r from-ph-yellow to-yellow-500 dark:from-[#fbd11e] dark:to-[#fdff8d] bg-clip-text text-transparent">PSC</span>
            <span className="bg-gradient-to-r from-ph-blue to-blue-700 dark:from-cyan-400 dark:to-blue-500 bg-clip-text text-transparent">TODAY</span>
          </h2>
          <p className="hidden md:block mt-6 text-xs md:text-sm text-gray-500 dark:text-gray-400 max-w-xl font-normal tracking-wide leading-relaxed mx-auto">
            Stay up to date with the latest news, events, and milestones. Discover the stories, updates, and triumphs shaping the journey of every Filipino athlete.
          </p>
        </div>

        {isLoading ? (
          <div className="animate-pulse space-y-6">
             <div className="w-full h-[180px] md:h-[400px] bg-gray-200 dark:bg-gray-800 rounded-xl"></div>
             <div className="flex gap-4 overflow-hidden">
               <div className="min-w-[160px] h-[240px] md:w-1/4 md:h-80 bg-gray-200 dark:bg-gray-800 rounded-xl"></div>
               <div className="min-w-[160px] h-[240px] md:w-1/4 md:h-80 bg-gray-200 dark:bg-gray-800 rounded-xl"></div>
               <div className="min-w-[160px] h-[240px] md:w-1/4 md:h-80 bg-gray-200 dark:bg-gray-800 rounded-xl"></div>
             </div>
          </div>
        ) : (
          <div className="space-y-8 md:space-y-6">
            
            {/* ── 1. UPPER CAROUSEL ── */}
            <div className="relative w-full h-[200px] sm:h-[300px] md:h-[400px] rounded-[24px] overflow-hidden shadow-lg border border-gray-200 dark:border-transparent group">
              <img src={upperBanners[upperIndex].src} alt={upperBanners[upperIndex].alt} className="w-full h-full object-cover transition-opacity duration-500" />
              <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
              <div className="absolute bottom-4 right-4 flex gap-2 z-10">
                {upperBanners.map((_, idx) => (
                  <button
                    key={idx} onClick={() => setUpperIndex(idx)}
                    className={`h-2.5 rounded-full transition-all duration-300 drop-shadow-md ${upperIndex === idx ? 'bg-white w-8' : 'bg-white/60 hover:bg-white w-2.5'}`}
                  />
                ))}
              </div>
            </div>

            {/* "NEWS" Header & "see more" Button */}
            <div className="flex justify-between items-center w-full mt-8 md:mt-12 mb-4 md:mb-6">
              <h3 className="text-gray-900 dark:text-white text-xl md:text-3xl font-black uppercase tracking-tight">NEWS</h3>
              <Link to="/article/1">
                <button className="bg-white/10 md:bg-white/5 text-gray-300 text-[10px] md:text-xs font-bold px-3 py-1.5 md:px-4 md:py-2 rounded-full uppercase tracking-wide hover:bg-white/20 md:hover:bg-white/10 transition-colors border border-gray-300 dark:border-transparent">
                  see more
                </button>
              </Link>
            </div>

            {/* ── 2. LOWER CAROUSEL (NEWS CARDS) ── */}
            <div className="relative group">
              
              <button onClick={prevLower} className="flex absolute left-0 md:-left-12 top-[110px] md:top-1/2 -translate-y-1/2 z-10 w-8 h-8 md:w-10 md:h-10 bg-black/60 md:bg-black/40 hover:bg-black/70 backdrop-blur text-white items-center justify-center rounded-full transition-all md:opacity-0 group-hover:opacity-100 shadow-md">
                <FiChevronLeft size={24} className="scale-75 md:scale-100" />
              </button>

              <div 
                ref={scrollContainerRef}
                className="flex md:block overflow-x-auto md:overflow-hidden snap-x snap-mandatory pb-4 md:pb-0 scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
                onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}
              >
                <div className="flex transition-transform duration-500 ease-in-out gap-4 md:gap-6" style={{ transform: window.innerWidth >= 768 ? `translateX(-${lowerIndex * (100 / visibleCards)}%)` : 'none' }}>
                  {lowerBanners.map((item) => (
                    <Link to={`/article/${item.id}`} key={item.id} className="min-w-[160px] md:min-w-[calc(25%-18px)] snap-start flex flex-col group/card cursor-pointer transition-transform duration-300 hover:-translate-y-2">
                      <div className="relative h-[220px] md:h-80 rounded-2xl overflow-hidden shadow-md w-full">
                        <img src={item.src} alt={item.title} className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-500" />
                        <div className="absolute top-2 md:top-3 left-2 md:left-3 bg-black/60 backdrop-blur-md text-white text-[8px] md:text-[10px] font-bold px-2 py-1 md:px-3 rounded-md">
                          {item.date}
                        </div>
                      </div>

                      <div className="mt-3 flex flex-col px-1">
                        <h3 className="text-gray-900 dark:text-white text-[12px] md:text-[15px] font-black uppercase leading-tight line-clamp-2 md:line-clamp-1 group-hover/card:text-ph-blue dark:group-hover/card:text-ph-yellow transition-colors">
                          {item.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 text-[9px] md:text-[11px] font-medium leading-snug line-clamp-2 mt-0.5 md:mt-1">
                          {item.subtitle}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              <button onClick={nextLower} className="flex absolute right-0 md:-right-12 top-[110px] md:top-1/2 -translate-y-1/2 z-10 w-8 h-8 md:w-10 md:h-10 bg-black/60 md:bg-black/40 hover:bg-black/70 backdrop-blur text-white items-center justify-center rounded-full transition-all md:opacity-0 group-hover:opacity-100 shadow-md">
                <FiChevronRight size={24} className="scale-75 md:scale-100" />
              </button>

            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default NewsUpdates;