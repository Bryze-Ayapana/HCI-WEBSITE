import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentWord, setCurrentWord] = useState(0);
  
  const images = [
    '/headerPicture1.png',
    '/headerPicture2.png',
    '/headerPicture3.png',
    '/headerPicture4.png',
    '/headerPicture5.png',
    '/headerPicture6.png',
    '/headerPicture7.png',
    '/headerPicture8.png',
  ];

  // ADDED: The mobile cropping array you requested
  const mobileImagePositions = [
    'object-[60%_center]',
    'object-[55%_center]',
    'object-[55%_center]',
    'object-[75%_center]',
    'object-[65%_center]',
    'object-[50%_center]',
    'object-[45%_center]',
    'object-[50%_center]',
  ];

  const cyclingWords = ['HOME', 'PRIDE', 'LEGACY'];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 10000); 
    return () => clearInterval(timer);
  }, [images.length]);

  useEffect(() => {
    const wordTimer = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % cyclingWords.length);
    }, 3000);
    return () => clearInterval(wordTimer);
  }, [cyclingWords.length]);

  return (
    // CHANGED: h-[85vh] is now h-[100dvh] so the mobile image extends fully to the bottom. lg:h-[112vh] is completely untouched.
    <section className="relative h-[100dvh] lg:h-[112vh] w-full overflow-hidden bg-white dark:bg-[#030A17] pt-32 transition-colors duration-300"> 
      <div className="absolute inset-0 z-0">
        <AnimatePresence initial={false}>
          <motion.img
            key={currentIndex}
            src={images[currentIndex]}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "linear" }}
            // ADDED: The dynamic mobileImagePositions array, kept object-center for lg screens
            className={`w-full h-full object-cover ${mobileImagePositions[currentIndex]} lg:object-center absolute inset-0`}
            alt="PSC Hero Background"
          />
        </AnimatePresence>
      </div>

      {/* ── LIGHT AND DARK MODE LOCALIZED OVERLAYS ── */}
      
      {/* Left side overlay: ~800px width, white gradient to transparent (light mode only) */}
      <div className="absolute left100 top-0 h-full w-[0px] bg-gradient-to-r from-white/20 dark:from-[#030A17]/50 via-white/10 dark:via-[#030A17]/20 to-transparent z-10 pointer-events-none transition-colors duration-300" />
      
      {/* Bottom overlay: ~166px height, white gradient to transparent (light mode only) */}
      <div className="absolute bottom-0 left-0 w-full h-[100px] bg-gradient-to-t from-white/-90 dark:from-[#030A17]/70 via-white/30 dark:via-[#030A17]/40 to-transparent z-10 pointer-events-none transition-colors duration-300" />

      {/* Hero Text Content */}
      <div className="relative h-full w-full z-20 px-4 md:px-20 lg:px-32 flex flex-col items-start justify-end pb-24">
        {/* Changed to flex-col to naturally stack the elements without colliding */}
        <div className="max-w-7xl w-full flex flex-col">
          
          <p className="text-white text-xs md:text-sm font-bold uppercase tracking-[0.15em] m-0 p-0 drop-shadow-lg relative translate-y-3 md:translate-y-4 z-10">
            Welcome to the
          </p>

          <h1 className="text-4xl md:text-6xl lg:text-7xl uppercase tracking-tight leading-[0.9] m-0 p-0 font-bold drop-shadow-2xl relative z-0">
            <div className="text-white font-bold leading-none m-0 p-0 flex items-center">
              The&nbsp;
              <AnimatePresence mode="wait">
                <motion.span
                  key={currentWord}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="inline-block font-bold bg-gradient-to-r from-[#fbd11e] to-[#fdff8d] bg-clip-text text-transparent drop-shadow-2xl"
                >
                  {cyclingWords[currentWord]}
                </motion.span>
              </AnimatePresence>
              &nbsp;of Every
            </div>
            <div className="text-white font-bold leading-none m-0 p-0">
              Filipino Athlete
            </div>
          </h1>

          {/* CHANGED: Replaced mt-3 with a negative translation to pull it up tightly under the heading */}
          <div className="m-0 p-0 text-white text-xs md:text-sm font-normal tracking-tight drop-shadow-lg relative -translate-y-2 md:-translate-y-3 z-10">
            <p className="m-0">Pusong Pinoy. Lakas ng Atletang Pilipino.</p>
          </div>
        </div>
      </div>

      {/* Smooth blend gradient to next section */}
      <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-b from-transparent via-white/20 dark:via-gray-900/50 to-gray-50 dark:to-gray-900 z-20 pointer-events-none transition-colors duration-300" />
    </section>
  );
};

export default Hero;