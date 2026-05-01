import React from 'react';
import { motion } from 'framer-motion';
import { FiChevronLeft } from 'react-icons/fi'; // Added import
import { useNavigate } from 'react-router-dom'; // Added import

const Structure = () => {
  const navigate = useNavigate(); // Hook for back navigation

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#030A17] font-poppins text-gray-800 dark:text-slate-200 transition-colors duration-300 pt-16 md:pt-32 pb-20">
      
      {/* ── MOBILE BACK NAVIGATION BAR (Adaptive Fix) ── */}
      <div className="
        lg:hidden flex items-center px-4 py-3 
        bg-white dark:bg-[#030A17] 
        text-gray-900 dark:text-white 
        border-b border-gray-200 dark:border-gray-800 
        sticky top-[52px] z-40 
        mt-[-16px]
      ">
        <button onClick={() => navigate(-1)} className="p-1">
          <FiChevronLeft size={20} />
        </button>
        <span className="flex-1 text-center font-bold text-sm uppercase tracking-wider pr-6">PSC Officials</span>
      </div>

      <motion.div 
        className="max-w-6xl mx-auto px-6 lg:px-8 flex flex-col items-center mt-8 md:mt-0"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        
        {/* ── 1. HEADER LOGO & TITLE ── */}
        <motion.div variants={itemVariants} className="text-center mb-16">
          <img src="/favicon.svg" alt="PSC Logo" className="w-32 h-32 md:w-40 md:h-40 object-contain mx-auto mb-6 drop-shadow-xl" />
          <h2 className="text-xl md:text-2xl text-gray-500 dark:text-slate-400 font-medium tracking-widest uppercase mb-1">Chairman</h2>
          <h1 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white tracking-tight uppercase">Philippine Sports Commission</h1>
        </motion.div>

        {/* ── 2. CHAIRMAN PROFILE SECTION ── */}
        <motion.div variants={itemVariants} className="w-full max-w-4xl relative mb-32 isolate">
          
          {/* Chairman Image (Z-Index 0 so it sits BEHIND the card) */}
          <div className="relative z-0 flex justify-center -mb-16 pointer-events-none">
            <img 
              src="/chairman.png" 
              alt="Chairman John Patrick Gregorio" 
              className="h-[300px] md:h-[450px] object-cover drop-shadow-2xl"
              style={{ objectPosition: 'top center' }} 
            />
          </div>

          {/* Chairman Description Card (Z-Index 10 so it sits ON TOP of the image) */}
          <div className="relative z-10 bg-white/90 dark:bg-[#0a0f1c]/90 border border-gray-200 dark:border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl backdrop-blur-xl">
            <p className="text-sm md:text-base leading-relaxed font-medium text-gray-800 dark:text-slate-300 text-center md:text-justify max-w-3xl mx-auto">
              <span className="font-bold text-gray-900 dark:text-white">John Patrick Gregorio</span>, the 13th Chairman of the Philippine Sports Commission, brings strong leadership in sports, governance, and tourism. He has held key roles in organizations like the PBA, SBP, ABAP, PRA, and POC, contributing to athlete development and the Philippines' historic Olympic success. He continues to drive innovation and growth in national sports while promoting Filipino excellence on the global stage.
            </p>
          </div>
          
        </motion.div>

       {/* ── 3. ORGANIZATIONAL STRUCTURE SECTION ── */}
        <motion.div variants={itemVariants} className="w-full max-w-5xl flex flex-col items-center text-center mb-12">
          <h2 className="text-xl md:text-2xl text-gray-500 dark:text-slate-400 font-medium tracking-widest uppercase mb-1">Organizational Structure</h2>
          <h1 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white tracking-tight uppercase">Philippine Sports Commission</h1>
        </motion.div>

        <motion.div variants={itemVariants} className="w-full max-w-6xl space-y-8">
           <img src="/organizationalStructure.png" alt="Organizational Structure of the Philippine Sports Commission" className="w-full h-auto object-contain mx-auto rounded-xl drop-shadow-xl bg-white dark:bg-[#0a0f1c]/50 p-4 border border-gray-200 dark:border-white/10" />
           <img src="/originalOrganizationalStructure.png" alt="Original Organizational Structure of the Philippine Sports Commission" className="w-full h-auto object-contain mx-auto rounded-xl drop-shadow-xl bg-white dark:bg-[#0a0f1c]/50 p-4 border border-gray-200 dark:border-white/10" />
        </motion.div>

      </motion.div>
    </div>
  );
};

export default Structure;