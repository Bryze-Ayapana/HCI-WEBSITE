import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SplashScreen = ({ finishLoading }) => {
  const [isMounted, setIsMounted] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsMounted(false);
      setTimeout(() => finishLoading(), 500);
    }, 2500);
    return () => clearTimeout(timer);
  }, [finishLoading]);

  return (
    <AnimatePresence>
      {isMounted && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#071633] overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.5, ease: 'easeInOut' } }}
        >
          {/* ── ARENA BACKGROUND IMAGE ── */}
          <motion.img
            src="/splashScreenBg.png"
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ opacity: 0.2 }}
            initial={{ scale: 1 }}
            animate={{ scale: 1.05 }}
            transition={{ duration: 3.5, ease: 'easeOut' }}
          />

          {/* ── RADIAL VIGNETTE ── */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse 70% 70% at 50% 50%, transparent 25%, rgba(2,7,20,0.65) 100%)',
            }}
          />

          {/* ── TOP + BOTTOM GRADIENT BARS ── */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'linear-gradient(to bottom, rgba(2,7,20,0.5) 0%, transparent 28%, transparent 72%, rgba(2,7,20,0.5) 100%)',
            }}
          />

          {/* ── FOREGROUND CONTENT ── */}
          <div className="relative z-10 flex flex-col items-center justify-center px-8 text-center">

            {/* ── LOGO ── */}
            <motion.img
              src="/favicon.svg"
              alt="Philippine Sports Commission Logo"
              className="w-[72px] md:w-[96px] lg:w-[120px] mb-4 md:mb-5"
              style={{ filter: 'drop-shadow(0 4px 20px rgba(0,0,0,0.55))' }}
              initial={{ opacity: 0, scale: 0.8, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            />

            {/* ── TEXT ── */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25, ease: 'easeOut' }}
              className="flex flex-col items-center"
            >
              <p
                className="text-[#d8e3f0] leading-[1.7] tracking-[0.04em]"
                style={{
                  fontFamily: "'Libre Baskerville', Georgia, serif",
                  fontSize: 'clamp(11px, 2.2vw, 15px)',
                  fontWeight: 400,
                }}
              >
                Republic of the Philippines
              </p>
              <p
                className="text-[#d8e3f0] leading-[1.7] tracking-[0.04em]"
                style={{
                  fontFamily: "'Libre Baskerville', Georgia, serif",
                  fontSize: 'clamp(11px, 2.2vw, 15px)',
                  fontWeight: 700,
                }}
              >
                Philippine Sports Commission
              </p>
            </motion.div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SplashScreen;