import React from 'react';
import { motion } from 'framer-motion';

const OfficialsSection = () => {
  return (
    // Adjusted top/bottom padding for mobile (py-12), preserved desktop padding (lg:py-32)
    <section className="relative w-full py-12 md:py-24 lg:py-32 overflow-hidden bg-white dark:bg-[#030A17] transition-colors duration-300">
      
      {/* ── SMOOTH TRANSITION GRADIENT FROM PREVIOUS SECTION ── */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-gray-50 dark:from-transparent to-transparent z-10 pointer-events-none" />

      {/* ── BACKGROUND IMAGE W/ LOW OPACITY ── */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/sectionBackground.png" 
          alt="Section Background" 
          className="w-full h-full object-cover opacity-5 dark:opacity-10"
        />
        {/* Dark mode gradient overlay to blend it into the dark theme */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#030A17]/80 to-[#030A17] hidden dark:block pointer-events-none" />
      </div>

      {/* Adjusted side padding for mobile (px-2) to maximize space for the side-by-side layout */}
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 relative z-20">
        
        {/* 2-Column Grid Layout */}
        {/* MOBILE FIX: Changed default mobile layout to grid-cols-2 (side-by-side). Reduced gap on mobile (gap-4). Desktop remains lg:grid-cols-2 lg:gap-20 */}
        <div className="grid grid-cols-2 lg:grid-cols-2 gap-4 lg:gap-20 items-center">
          
          {/* LEFT COLUMN: Enlarged Chairman Graphic */}
          <div className="relative w-full flex items-center justify-center lg:justify-start">
            
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="relative w-full max-w-[500px] lg:max-w-[600px]"
            >
              {/* Using the full provided image directly with no extra CSS boxes */}
              <img 
                src="/chairman.png" 
                alt="John Patrick Gregorio - PSC 13th Chairman"     
                className="w-full h-auto object-contain drop-shadow-2xl"
              />
            </motion.div>

          </div>

          {/* RIGHT COLUMN: Typography & Content */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col gap-2 lg:gap-8"
          >
            {/* MOBILE FIX: Scaled text down drastically (text-[12px]) and adjusted clamping to fit side-by-side layout. Desktop untouched. */}
            <h2 className="text-[12px] sm:text-4xl lg:text-9xl font-black uppercase tracking-tight 
              bg-clip-text text-transparent 
              bg-gradient-to-r from-red-600 to-red-400 
              dark:from-ph-yellow dark:to-yellow-300 
              drop-shadow-sm leading-none px-0 lg:px-2"
            >
              PSC CHAIRMAN
            </h2>
            
            {/* Content Paragraphs */}
            {/* MOBILE FIX: Scaled paragraph text to text-[6px] with tight leading. Desktop remains text-lg. */}
            <div className="space-y-2 lg:space-y-6 text-[6px] sm:text-sm lg:text-lg text-gray-700 dark:text-gray-300 font-medium leading-tight lg:leading-relaxed pr-2 lg:pr-0">
              <p>
                John Patrick Gregorio, the 13th Chairman of the Philippine Sports Commission, brings strong leadership in sports, governance, and tourism.
              </p>
              <p>
                He has held key roles in organizations like the PBA, SBP, ABAP, PRA, and POC, contributing to athlete development and the Philippines' historic Olympic success. He continues to drive innovation and growth in national sports while promoting Filipino excellence on the global stage.
              </p>
            </div>

            {/* Call to Action Link */}
            {/* MOBILE FIX: Scaled link text to text-[5px]. Desktop remains text-base. */}
            <div className="pt-0 lg:pt-2">
              <a 
                href="/about/structure" 
                className="inline-flex items-center gap-1 lg:gap-2 text-ph-blue dark:text-cyan-400 font-bold text-[5px] sm:text-xs lg:text-base hover:text-blue-800 dark:hover:text-cyan-300 transition-colors group"
              >
                Learn more about PSC officials
                <span className="group-hover:translate-x-1 transition-transform duration-300">›</span>
              </a>
            </div>
            
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default OfficialsSection;