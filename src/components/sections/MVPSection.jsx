import React from 'react';
import { motion } from 'framer-motion';

const MVPSection = () => {
  return (
    <section className="py-16 md:py-24 bg-transparent dark:bg-[#030A17] transition-colors duration-300 flex flex-col items-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl w-full flex flex-col items-center">
        
        {/* ── HEADING ── */}
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-5xl font-black uppercase tracking-widest text-slate-900 dark:text-white mb-8 md:mb-12 text-center"
        >
          IKAW ANG{' '}
          <span className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-amber-500 dark:from-[#fbd11e] dark:to-[#fdff8d] bg-clip-text text-transparent drop-shadow-sm">
            MVP!
          </span>
        </motion.h2>

        {/* ── VIDEO CONTAINER ── */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="w-full rounded-[2rem] overflow-hidden shadow-2xl shadow-black/20 dark:shadow-black/50 border border-slate-200 dark:border-white/10 relative bg-black/5 dark:bg-black/20"
        >
          <video 
            src="/mvp.mp4" 
            controls     /* ADDED: Brings up the play/pause, volume, and fullscreen interface */
            loop 
            playsInline 
            className="w-full h-auto aspect-video object-cover"
          >
            Your browser does not support the video tag.
          </video>
        </motion.div>

      </div>
    </section>
  );
};

export default MVPSection;