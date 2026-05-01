import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronLeft, FiSliders } from 'react-icons/fi'; // Added Icons
import { useNavigate } from 'react-router-dom'; // Added navigation hook

const Podium = () => {
  const navigate = useNavigate();

  // ── UPPER CAROUSEL BANNER LOGIC ──
  const [currentBanner, setCurrentBanner] = useState(0);
  const podiumBanners = [
    { id: 1, src: '/podiumBanner1.png', alt: 'Podium Banner 1' },
    { id: 2, src: '/podiumBanner2.png', alt: 'Podium Banner 2' },
    { id: 3, src: '/podiumBanner3.png', alt: 'Podium Banner 3' },
    { id: 4, src: '/podiumBanner4.png', alt: 'Podium Banner 4' },
    { id: 5, src: '/podiumBanner5.png', alt: 'Podium Banner 5' },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % podiumBanners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [podiumBanners.length]);

  // ── SCROLL MANAGEMENT ──
  const galleryRef = useRef(null);

  const scrollToGalleryTop = () => {
    if (galleryRef.current) {
      const yOffset = -150; 
      const y = galleryRef.current.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  // ── SIDEBAR FILTER & MAGAZINE DATA LOGIC (2016 to 2025) ──
  const years = Array.from({ length: 10 }, (_, i) => 2025 - i);
  const [selectedYears, setSelectedYears] = useState([]);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false); // State for mobile dropdown filter

  const toggleYear = (year) => {
    setSelectedYears((prev) => 
      prev.includes(year) ? prev.filter((y) => y !== year) : [...prev, year]
    );
    scrollToGalleryTop();
  };

  const setAllYears = () => {
    setSelectedYears([]);
    scrollToGalleryTop();
  };

  const activeYears = (selectedYears.length > 0 ? selectedYears : years)
    .slice()
    .sort((a, b) => b - a);

  // ── DYNAMIC ISSUE MAPPING ──
  const getIssuesForYear = (year) => {
    const shortYear = year.toString().slice(-2);
    
    const counts = {
      2025: 1, 2024: 4, 2023: 2, 2022: 4, 2021: 4, 
      2020: 4, 2019: 4, 2018: 2, 2017: 4, 2016: 2
    };

    const count = counts[year] || 4;
    
    return Array.from({ length: count }, (_, i) => {
      const issueNum = i + 1;
      let flipLink = '#';
      
      if (year === 2025 && issueNum === 1) {
        flipLink = 'https://online.fliphtml5.com/hnuko/qfju/#p=1';
      } else if (year === 2024) {
        const links2024 = ['https://online.fliphtml5.com/hnuko/yzkx/#p=1', 'https://online.fliphtml5.com/hnuko/lkwd/#p=1', 'https://online.fliphtml5.com/hnuko/uwda/#p=1', 'https://online.fliphtml5.com/hnuko/hlwy/'];
        flipLink = links2024[i];
      } else if (year === 2023) {
        const links2023 = ['https://online.fliphtml5.com/hnuko/dpnu/#p=1', 'https://online.fliphtml5.com/sgvnx/bhyd/#p=1'];
        flipLink = links2023[i];
      } else if (year === 2022) {
        const links2022 = ['https://fliphtml5.com/qvikq/resj', 'https://online.fliphtml5.com/ntzoc/fksc/#p=1', 'https://online.fliphtml5.com/ylxky/uupe/#p=1', 'https://online.fliphtml5.com/ntzoc/scne/'];
        flipLink = links2022[i];
      } else if (year === 2021) {
        const links2021 = ['https://fliphtml5.com/qvikq/msog', 'https://fliphtml5.com/qvikq/femb', 'https://fliphtml5.com/qvikq/gyom', 'https://fliphtml5.com/qvikq/twgi'];
        flipLink = links2021[i];
      } else if (year === 2020) {
        const links2020 = ['https://fliphtml5.com/njneo/uswc', 'https://fliphtml5.com/njneo/deco', 'https://fliphtml5.com/qvikq/fuuh', 'https://fliphtml5.com/qvikq/bget'];
        flipLink = links2020[i];
      } else if (year === 2019) {
        const links2019 = ['https://fliphtml5.com/zytfe/bjys', 'https://fliphtml5.com/njneo/dgla', 'https://fliphtml5.com/njneo/nwor', 'https://fliphtml5.com/njneo/qpqh'];
        flipLink = links2019[i];
      } else if (year === 2018) {
        const links2018 = ['https://fliphtml5.com/zytfe/pcux', 'https://fliphtml5.com/zytfe/nrii'];
        flipLink = links2018[i];
      } else if (year === 2017) {
        const links2017 = ['https://fliphtml5.com/qvikq/ehvo', 'https://fliphtml5.com/qvikq/pffo', 'https://fliphtml5.com/zytfe/hunm', 'https://fliphtml5.com/zytfe/vbzb'];
        flipLink = links2017[i];
      } else if (year === 2016) {
        const links2016 = ['https://fliphtml5.com/qvikq/ynee', 'https://fliphtml5.com/qvikq/odfj'];
        flipLink = links2016[i];
      } else {
        flipLink = `https://online.fliphtml5.com/hnuko/placeholder_${year}_${issueNum}`;
      }

      return {
        id: `${year}-${issueNum}`,
        src: `/magazineCover${issueNum}_${shortYear}.png`,
        alt: `The Podium - Issue ${issueNum}, ${year}`,
        year: year,
        link: flipLink
      };
    });
  };

  return (
    <div className="min-h-screen pt-16 md:pt-40 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col gap-10 md:gap-16 relative z-10 transition-colors duration-300">
      
      {/* ── MOBILE BACK NAVIGATION BAR (Adaptive Fix) ── */}
      <div className="
        lg:hidden flex items-center px-4 py-3 
        bg-white dark:bg-[#030A17] 
        text-gray-900 dark:text-white 
        border-b border-gray-200 dark:border-gray-800 
        sticky top-[52px] z-50 
        -mx-4 mt-[-16px]
      ">
        <button onClick={() => navigate(-1)} className="p-1">
          <FiChevronLeft size={20} />
        </button>
        <span className="flex-1 text-center font-bold text-sm uppercase tracking-wider pr-6">The Podium</span>
      </div>

      {/* ── 1. UPPER CAROUSEL ── */}
      <section className="relative w-full h-[300px] md:h-[600px] rounded-2xl overflow-hidden shadow-2xl group border border-gray-200 dark:border-white/10 bg-gray-100 dark:bg-gray-800">
        <AnimatePresence initial={false}>
          <motion.img key={currentBanner} src={podiumBanners[currentBanner].src} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.8 }} className="absolute inset-0 w-full h-full object-cover" />
        </AnimatePresence>
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-20">
          {podiumBanners.map((_, idx) => (
            <button key={idx} onClick={() => setCurrentBanner(idx)} className={`h-2.5 rounded-full transition-all duration-300 ${currentBanner === idx ? 'w-8 bg-ph-yellow' : 'w-2.5 bg-white/50 hover:bg-white/80'}`} />
          ))}
        </div>
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
      </section>

      {/* ── 2. SIDEBAR FILTER & CATEGORIZED GALLERY ── */}
      <section ref={galleryRef} className="flex flex-col lg:flex-row gap-8 lg:gap-10 items-start w-full scroll-mt-32">
        
        {/* DESKTOP LEFT COLUMN: Filter Sidebar (Hidden on Mobile) */}
        <div className="hidden lg:flex w-full lg:w-[250px] flex-shrink-0 flex-col gap-6 sticky top-32 lg:border-r border-gray-200 dark:border-white/10 lg:pr-6">
          <div className="flex flex-col relative">
           <h1 className="text-[40px] md:text-[50px] font-black uppercase tracking-tight 
            bg-gradient-to-r 
            from-yellow-500 to-amber-600 
            dark:from-blue-500 dark:to-cyan-400 
            bg-clip-text text-transparent leading-tight break-words pb-2">
              THE PODIUM
            </h1>
            <p className="text-xs md:text-[15px] text-gray-700 dark:text-gray-50 font-medium m-0 leading-none -translate-y-5 relative z-0">
              Ang galing ng Pilipino
            </p>
          </div>

          <div className="bg-white dark:bg-[#111827] border border-gray-200 dark:border-white/10 rounded-xl p-4 shadow-sm">
            <div className="flex justify-between items-center border-b border-gray-200 dark:border-white/10 pb-2 mb-3">
              <h3 className="font-bold text-gray-900 dark:text-white uppercase tracking-wider text-[11px]">FILTER</h3>
              {selectedYears.length > 0 && (
                <button onClick={setAllYears} className="text-[11px] text-red-500 hover:text-red-700 dark:hover:text-red-400 font-medium transition-colors">Clear</button>
              )}
            </div>
            <div className="flex flex-col gap-2 max-h-[50vh] overflow-y-auto pr-2 custom-scrollbar">
              <label className="flex items-center gap-2.5 cursor-pointer group mb-0.5">
                <input type="checkbox" checked={selectedYears.length === 0} onChange={setAllYears} className="w-3.5 h-3.5 rounded border-gray-300 text-blue-600 accent-blue-600" />
                <span className={`text-[13px] font-bold transition-colors duration-200 ${selectedYears.length === 0 ? 'text-blue-600 dark:text-cyan-400' : 'text-gray-700 dark:text-gray-300 group-hover:text-blue-500'}`}>All Years</span>
              </label>
              {years.map((year) => (
                <label key={year} className="flex items-center gap-2.5 cursor-pointer group">
                  <input type="checkbox" checked={selectedYears.includes(year)} onChange={() => toggleYear(year)} className="w-3.5 h-3.5 rounded border-gray-300 text-blue-600 accent-blue-600" />
                  <span className={`text-[13px] font-medium transition-colors duration-200 ${selectedYears.includes(year) ? 'text-blue-600 dark:text-cyan-400' : 'text-gray-700 dark:text-gray-300 group-hover:text-blue-500'}`}>{year}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN (Gallery & Mobile Header) */}
        <div className="flex-1 w-full flex flex-col gap-6 lg:gap-14 min-h-[100vh] relative"> 
          
          {/* MOBILE ONLY: Inline Header with Filter Button (Matches reference image) */}
          <div className="flex lg:hidden justify-between items-start w-full mb-4">
            <div className="flex flex-col relative">
             <h1 className="text-2xl font-black uppercase tracking-tight text-ph-yellow leading-tight break-words pb-1">
                THE PODIUM
              </h1>
              <p className="text-sm text-gray-700 dark:text-gray-200 font-medium m-0 leading-none">
                Ang Galing ng Pilipino
              </p>
            </div>
            
            {/* Mobile Filter Button */}
            <div className="relative">
              <button 
                onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
                className="flex items-center gap-2 px-3 py-1.5 bg-[#0a1128] text-white rounded text-xs font-bold shadow-md border border-white/10"
              >
                <FiSliders size={12} /> YEAR
              </button>

              {/* Mobile Filter Dropdown */}
              <AnimatePresence>
                {isMobileFilterOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-[#111827] border border-gray-200 dark:border-white/10 rounded-xl p-4 shadow-2xl z-20"
                  >
                    <div className="flex justify-between items-center border-b border-gray-200 dark:border-white/10 pb-2 mb-3">
                      <h3 className="font-bold text-gray-900 dark:text-white uppercase tracking-wider text-[11px]">FILTER</h3>
                      {selectedYears.length > 0 && (
                        <button onClick={() => { setAllYears(); setIsMobileFilterOpen(false); }} className="text-[11px] text-red-500 font-medium">Clear</button>
                      )}
                    </div>
                    <div className="flex flex-col gap-2 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                      <label className="flex items-center gap-2.5 cursor-pointer">
                        <input type="checkbox" checked={selectedYears.length === 0} onChange={() => { setAllYears(); setIsMobileFilterOpen(false); }} className="w-3.5 h-3.5 rounded text-blue-600" />
                        <span className="text-[13px] font-bold text-gray-700 dark:text-gray-300">All Years</span>
                      </label>
                      {years.map((year) => (
                        <label key={year} className="flex items-center gap-2.5 cursor-pointer">
                          <input type="checkbox" checked={selectedYears.includes(year)} onChange={() => toggleYear(year)} className="w-3.5 h-3.5 rounded text-blue-600" />
                          <span className="text-[13px] font-medium text-gray-700 dark:text-gray-300">{year}</span>
                        </label>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* MAGAZINE GALLERY */}
          <div className="flex flex-col gap-10 lg:gap-14">
            {activeYears.map((year) => {
              const issues = getIssuesForYear(year);
              return (
                <motion.div
                  layout="position"
                  key={year}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex flex-col gap-4 lg:gap-6"
                >
                  <div className="border-b border-gray-300 dark:border-white/10 pb-2">
                    <h2 className="text-lg lg:text-2xl font-black text-gray-900 dark:text-white tracking-tight">
                      {year}
                    </h2>
                  </div>

                  {/* Grid updated to show 3 items per row on mobile to match image */}
                  <div className="grid grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-6">
                    {issues.map((issue) => (
                      <motion.div 
                        layout="position"
                        key={issue.id}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => window.open(issue.link, '_blank')}
                        className="relative p-[2px] lg:p-[3px] rounded-lg lg:rounded-xl transition-all duration-300 bg-transparent hover:bg-gradient-to-br hover:from-amber-500 hover:to-orange-500 dark:hover:from-blue-500 dark:hover:to-cyan-400 shadow hover:shadow-xl cursor-pointer group"
                      >
                        <div className="relative aspect-[3/4] bg-gray-100 dark:bg-[#0a0a0a] rounded-md lg:rounded-lg overflow-hidden h-full w-full">
                          <img 
                            src={issue.src} 
                            alt={issue.alt}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                               e.target.onerror = null; 
                               e.target.style.display = 'none';
                               e.target.parentNode.innerHTML = `<div class="flex items-center justify-center h-full w-full text-[10px] lg:text-xs text-gray-400 text-center p-2 lg:p-4 bg-gray-200 dark:bg-gray-800">Cover Coming Soon<br/>${issue.year}</div>`;
                            }}
                          />
                          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                            <span className="text-white font-bold tracking-widest uppercase text-[10px] lg:text-xs px-2 py-1 lg:px-4 lg:py-2 border border-white/50 rounded backdrop-blur-sm">
                              Read
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Podium;