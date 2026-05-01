import React from 'react';
import { motion } from 'framer-motion';
import { FiTarget, FiAward, FiStar, FiChevronLeft } from 'react-icons/fi'; // Added FiChevronLeft
import { useNavigate } from 'react-router-dom'; // Added useNavigate

const PSCProfile = () => {
  const navigate = useNavigate(); // Hook for back navigation

  const missionPoints = [
    "Coordinating and implementing a national sports program",
    "providing assistance to stakeholders and partners",
    "Creating equitable opportunities for participation in sports by all sectors",
    "supporting the specially talented athletes for high level competitions"
  ];

  const visionSubPoints = [
    "Increased participation in sports by Filipinos",
    "Excellence in sports performance by Filipinos"
  ];

  const objectives = [
    "Increased participation in sports by Filipinos",
    "Excellence in sports performance by Filipinos"
  ];

  // Dynamic Gold Gradient: Mas dark ang start sa light mode para mabasa
  const goldGradient = "bg-gradient-to-r from-[#BF953F] via-[#D4AF37] to-[#AA841F] dark:from-[#BF953F] dark:via-[#FCF6BA] dark:to-[#D4AF37] bg-clip-text text-transparent";

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#030A17] font-poppins text-gray-800 dark:text-slate-200 transition-colors duration-300 overflow-hidden">
      
      {/* ── MOBILE BACK NAVIGATION BAR (Adaptive Fix) ── */}
      <div className="
        lg:hidden flex items-center px-4 py-3 
        bg-white dark:bg-[#030A17] 
        text-gray-900 dark:text-white 
        border-b border-gray-200 dark:border-gray-800 
        sticky top-[52px] z-50 
      ">
        <button onClick={() => navigate(-1)} className="p-1">
          <FiChevronLeft size={20} />
        </button>
        <span className="flex-1 text-center font-bold text-sm uppercase tracking-wider pr-6">PSC Profile</span>
      </div>

      {/* ── HERO SECTION ── */}
      {/* Added mt-[-52px] lg:mt-0 to pull the hero section up under the sticky header on mobile, preventing a gap */}
      <section className="relative pt-40 pb-32 px-6 lg:px-8 flex flex-col items-center justify-center min-h-[75vh] mt-[-52px] lg:mt-0">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: "url('/PSCProfileBg.png')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed'
          }}
        />
        {/* Overlay: Puti sa light mode, Blue-Black sa dark mode */}
        <div className="absolute inset-0 z-0 bg-white/80 dark:bg-gradient-to-b dark:from-[#001f5b]/90 dark:via-[#030A17]/95 dark:to-[#030A17]" />

        <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center">
          <motion.img
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            src="/favicon.svg"
            alt="PSC Logo"
            className="w-32 h-32 md:w-40 md:h-40 object-contain mb-8 drop-shadow-2xl mt-12 lg:mt-0" 
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-xl md:text-2xl text-gray-600 dark:text-slate-300 font-medium tracking-wide mb-2">About the</h2>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 dark:text-white tracking-tight uppercase mb-10">
              Philippine Sports Commission
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-6 text-sm md:text-base text-gray-700 dark:text-slate-400 font-medium leading-relaxed max-w-3xl"
          >
            <p>The birth of the Philippine Sports Commission was championed in the 1987 Philippine Constitution declaring the importance of sports in forming a healthy and functioning citizenry.</p>
            <p>But even at the onset of the 20th century, sports already posed as a vital component of the Filipino lifestyle as upheld by the formation of various governing sports bodies, which would later pave the way for the creation of a main umbrella organization that is PSC.</p>
          </motion.div>
        </div>
      </section>

      {/* ── MISSION SECTION ── */}
      <section className="py-20 px-6 lg:px-8 relative z-10 bg-gray-50 dark:bg-[#030A17]">
        <div className="max-w-5xl mx-auto text-center">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className={`text-5xl md:text-6xl font-black tracking-tighter uppercase mb-8 ${goldGradient}`}>
            Mission
          </motion.h2>

          <p className="text-lg md:text-xl text-gray-600 dark:text-slate-300 font-medium leading-relaxed max-w-3xl mx-auto mb-16">
            To serve as the prime catalyst and advocate for the propagation and development of Philippine sports by helping shape policies and setting priorities through the following:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {missionPoints.map((point, index) => (
              <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}
                className="flex items-center gap-6 p-8 rounded-2xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/[0.02] hover:shadow-lg dark:hover:bg-white/[0.05] transition-all backdrop-blur-sm shadow-md dark:shadow-xl group">
                <FiTarget size={32} className="text-gray-400 dark:text-slate-500 group-hover:text-blue-600 dark:group-hover:text-ph-yellow transition-colors" />
                <p className="text-sm md:text-base text-gray-700 dark:text-slate-300 font-medium leading-snug">{point}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── VISION SECTION ── */}
      <section className="py-20 px-6 lg:px-8 relative z-10 bg-gray-50 dark:bg-[#030A17]">
        <div className="max-w-5xl mx-auto text-center">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className={`text-5xl md:text-6xl font-black tracking-tighter uppercase mb-8 ${goldGradient}`}>
            Vision
          </motion.h2>

          <p className="text-lg md:text-xl text-gray-600 dark:text-slate-300 font-medium leading-relaxed max-w-4xl mx-auto mb-16">
            A Commission with a unified sports program which will enhance the quality of life of the Filipinos, instill national pride and attain international prestige through excellence in sports.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {visionSubPoints.map((text, index) => (
              <motion.div 
                key={index} 
                initial={{ opacity: 0, y: 20 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true }}
                className="group flex items-center gap-6 p-10 rounded-2xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/[0.02] shadow-md dark:shadow-xl backdrop-blur-md hover:bg-white/50 dark:hover:bg-white/[0.05] transition-all"
              >
                <FiAward 
                  size={32} 
                  className="text-gray-400 dark:text-slate-500 group-hover:text-blue-600 dark:group-hover:text-ph-yellow transition-colors duration-300" 
                />
                <p className="text-xs md:text-sm font-bold uppercase tracking-widest text-gray-800 dark:text-slate-100 text-left group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                  {text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── OBJECTIVE SECTION ── */}
      <section className="py-20 px-6 lg:px-8 relative z-10 bg-gray-50 dark:bg-[#030A17] pb-40">
        <div className="max-w-5xl mx-auto text-center">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className={`text-5xl md:text-6xl font-black tracking-tighter uppercase mb-8 ${goldGradient}`}>
            Objective
          </motion.h2>

          <p className="text-lg md:text-xl text-gray-500 dark:text-slate-400 font-medium leading-relaxed max-w-3xl mx-auto mb-16 italic">
            In view of the foregoing guiding principles, vision and mission statement, the PSC will pursue two basic objectives:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {objectives.map((text, index) => (
              <motion.div 
                key={index} 
                initial={{ opacity: 0, y: 20 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true }}
                className="group flex items-center gap-6 p-10 rounded-2xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/[0.02] shadow-md dark:shadow-xl backdrop-blur-md hover:bg-white/50 dark:hover:bg-white/[0.05] transition-all"
              >
                <FiStar 
                  size={32} 
                  className="text-gray-400 dark:text-slate-500 group-hover:text-blue-600 dark:group-hover:text-ph-yellow transition-colors duration-300" 
                />
                <p className="text-xs md:text-sm font-bold uppercase tracking-widest text-gray-800 dark:text-slate-100 text-left group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                  {text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default PSCProfile;