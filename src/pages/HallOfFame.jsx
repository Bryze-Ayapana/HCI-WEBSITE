import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiDownload, FiArrowRight, FiChevronLeft, FiChevronRight, FiPlay, FiCheckCircle, FiCalendar, FiX, FiMaximize2 } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

// ── Enshrinee batches ──
const batches = [
  { id: 1, src: '/enshrinessBatch1.png', label: '1st Batch Enshrinees' },
  { id: 2, src: '/enshrinessBatch2.png', label: '2nd Batch Enshrinees' },
  { id: 3, src: '/enshrinessBatch3.png', label: '3rd Batch Enshrinees' },
  { id: 4, src: '/enshrinessBatch4.png', label: '4th Batch Enshrinees' },
];

// YouTube video ID extracted from the link
const YT_VIDEO_ID = 'as1DOuAqGrc';

const HallOfFame = ({ darkMode = false }) => {
  const [activeBatch, setActiveBatch] = useState(0);
  const [ytPlaying, setYtPlaying] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxSrc, setLightboxSrc] = useState('');
  const [lightboxLabel, setLightboxLabel] = useState('');
  const navigate = useNavigate();

  const handlePrev = () => setActiveBatch(p => (p === 0 ? batches.length - 1 : p - 1));
  const handleNext = () => setActiveBatch(p => (p === batches.length - 1 ? 0 : p + 1));

  const openLightbox = (src, label) => {
    setLightboxSrc(src);
    setLightboxLabel(label);
    setLightboxOpen(true);
  };
  const closeLightbox = () => setLightboxOpen(false);

  const handleNominate = () => {
    const a = document.createElement('a');
    a.href = '/nominationForm.pdf';
    a.download = 'PSC_Hall_of_Fame_Nomination_Form.pdf';
    a.click();
  };

  const handleDownloadFullText = () => {
    const a = document.createElement('a');
    a.href = '/forms.pdf';
    a.download = 'RA8757_Full_Text.pdf';
    a.click();
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 text-gray-900 dark:text-zinc-100 transition-colors duration-300 overflow-x-hidden">

      {/* ── MOBILE BACK NAVIGATION BAR (Adaptive & Magkadikit Fix) ── */}
      <div className="
        lg:hidden flex items-center px-4 py-3 
        bg-white dark:bg-[#030A17] 
        text-gray-900 dark:text-white 
        border-b border-gray-200 dark:border-gray-800 
        sticky top-[52px] z-40 
        mt-[52px]
      ">
        <button onClick={() => navigate(-1)} className="p-1">
          <FiChevronLeft size={20} />
        </button>
        <span className="flex-1 text-center font-bold text-sm uppercase tracking-wider pr-6">Hall of Fame</span>
      </div>

      {/* ══════════════════════════════════════
          IMAGE LIGHTBOX OVERLAY
      ══════════════════════════════════════ */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-zinc-950/90 backdrop-blur-md" />

            {/* Image panel */}
            <motion.div
              className="relative z-10 max-w-5xl w-full max-h-[90vh] rounded-2xl overflow-hidden shadow-2xl"
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              onClick={e => e.stopPropagation()}
            >
              <img
                src={lightboxSrc}
                alt={lightboxLabel}
                className="w-full h-full object-contain bg-zinc-900"
                style={{ maxHeight: '85vh' }}
              />
              {/* Label bar */}
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-zinc-950 to-transparent px-8 py-6">
                <p className="text-[#D4AF37] text-xs font-black tracking-widest uppercase mb-1">Philippine Sports Commission</p>
                <h3 className="text-white text-xl font-black">{lightboxLabel}</h3>
              </div>
              {/* Close button */}
              <button
                onClick={closeLightbox}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-zinc-900/80 border border-white/20 flex items-center justify-center text-white hover:bg-zinc-800 transition-all"
              >
                <FiX size={18} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ══════════════════════════════════════
          HERO BANNER — image only, no text, no gradient
      ══════════════════════════════════════ */}
      <section className="relative w-full overflow-hidden bg-black flex items-center">
        <img
          src="/HallOfFameBanner.png"
          alt="Hall of Fame Banner"
          /* 
             h-auto prevents black borders on mobile, 
             w-full keeps it from cutting, 
             md classes maintain original desktop look! 
          */
          className="w-full h-auto md:h-[85vh] md:min-h-[600px] object-cover"
        />
        {/* Thin gold top accent line only */}
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
      </section>

      {/* ══════════════════════════════════════
          REPUBLIC ACT SECTION
      ══════════════════════════════════════ */}
      <section className="py-24 bg-white dark:bg-zinc-900/50 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="flex flex-col lg:flex-row items-center gap-16">

            {/* Text */}
            <motion.div
              className="flex-1"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              {/* Eyebrow — slightly larger */}
              <span className="text-[11px] font-black tracking-[0.22em] uppercase text-[#003b93] dark:text-[#D4AF37] mb-4 block">
                The Legal Foundation
              </span>

              <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight mb-6 text-gray-900 dark:text-white leading-none">
                Republic Act No. 8757
              </h2>

              <p className="text-gray-600 dark:text-zinc-400 text-base leading-relaxed mb-4 font-medium">
                Established on March 25, 1999, RA 8757 institutionalized the Philippine Sports Hall of Fame to immortalize the names of Filipino athletes, coaches, and sports administrators who have contributed significantly to the promotion and development of sports in the Philippines.
              </p>

              <p className="text-gray-600 dark:text-zinc-400 text-base leading-relaxed mb-16 font-medium">
                This act ensures that the legacy of our sporting heroes is preserved for future generations, serving as a beacon of inspiration for aspiring young athletes across the archipelago.
              </p>

              {/* Only Download Full Text — Implementing Rules removed */}
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={handleDownloadFullText}
                  className="flex items-center gap-2 px-7 py-3.5 rounded-full font-bold text-sm text-white transition-all hover:opacity-90 active:scale-95 shadow-lg"
                  style={{ background: 'linear-gradient(135deg, #003b93, #0051c3)' }}
                >
                  <FiDownload size={16} />
                  Download Full Text
                </button>
              </div>
            </motion.div>

            {/* Forms image */}
            <motion.div
              className="w-full lg:w-5/12 aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl relative"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              <img src="/forms.png" alt="RA 8757 Document" className="w-full h-full object-cover" />
              <div
                className="absolute top-0 right-0 w-24 h-24"
                style={{ background: 'linear-gradient(225deg, rgba(212,175,55,0.3) 0%, transparent 60%)' }}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          GALLERY OF ENSHRINEES
      ══════════════════════════════════════ */}
      <section className="py-24 bg-gray-50 dark:bg-zinc-950 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6 md:px-10">

          {/* Header row */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-6">
            <div>
              {/* Eyebrow — slightly larger */}
              <span className="text-[11px] font-black tracking-[0.22em] uppercase text-[#003b93] dark:text-[#D4AF37] mb-3 block">
                Class of Champions
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-gray-900 dark:text-white leading-none antialiased">
                {batches[activeBatch].label}
              </h2>
            </div>

            {/* Batch navigation */}
            <div className="flex items-center gap-3">
              <div className="flex gap-2 mr-2">
                {batches.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveBatch(i)}
                    className="transition-all duration-300 rounded-full"
                    style={{
                      width: i === activeBatch ? '28px' : '8px',
                      height: '8px',
                      background: i === activeBatch ? '#D4AF37' : 'rgba(212,175,55,0.3)',
                    }}
                  />
                ))}
              </div>
              <button
                onClick={handlePrev}
                className="w-11 h-11 rounded-full border border-gray-300 dark:border-zinc-700 flex items-center justify-center text-gray-600 dark:text-zinc-300 hover:bg-white dark:hover:bg-zinc-800 transition-all"
              >
                <FiChevronLeft size={18} />
              </button>
              <button
                onClick={handleNext}
                className="w-11 h-11 rounded-full flex items-center justify-center text-white transition-all"
                style={{ background: 'linear-gradient(135deg, #BF953F, #D4AF37)' }}
              >
                <FiChevronRight size={18} />
              </button>
            </div>
          </div>

          {/* Batch image — clickable / hover to view full */}
          <motion.div
            key={activeBatch}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="relative w-full rounded-2xl overflow-hidden shadow-2xl group cursor-pointer"
            style={{ maxHeight: '600px' }}
            onClick={() => openLightbox(batches[activeBatch].src, batches[activeBatch].label)}
          >
            <img
              src={batches[activeBatch].src}
              alt={batches[activeBatch].label}
              className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
              style={{ maxHeight: '600px' }}
            />

            {/* Hover overlay */}
            <div className="absolute inset-0 bg-zinc-950/0 group-hover:bg-zinc-950/40 transition-all duration-300 flex items-center justify-center">
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center gap-3">
                <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm border border-white/40 flex items-center justify-center">
                  <FiMaximize2 size={24} className="text-white" />
                </div>
                <span className="text-white text-sm font-bold tracking-widest uppercase bg-zinc-950/50 px-4 py-2 rounded-full backdrop-blur-sm">
                  View Full Image
                </span>
              </div>
            </div>

            {/* Bottom gradient with label */}
            <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-zinc-950 to-transparent flex items-end p-8 pointer-events-none">
              <div>
                <p className="text-[#D4AF37] text-xs font-black tracking-widest uppercase mb-1">Philippine Sports Commission</p>
                <h3 className="text-white text-2xl font-black">{batches[activeBatch].label}</h3>
              </div>
            </div>
          </motion.div>

          {/* Thumbnail strip — also clickable */}
          <div className="flex gap-4 mt-4 overflow-x-auto pb-2">
            {batches.map((batch, i) => (
              <button
                key={batch.id}
                onClick={() => setActiveBatch(i)}
                onDoubleClick={() => openLightbox(batch.src, batch.label)}
                className="flex-none w-32 h-20 rounded-xl overflow-hidden transition-all duration-300 relative group/thumb"
                style={{
                  outline: i === activeBatch ? '2px solid #D4AF37' : '2px solid transparent',
                  outlineOffset: '2px',
                }}
              >
                <img src={batch.src} alt={batch.label} className="w-full h-full object-cover object-top" />
                {i !== activeBatch && <div className="absolute inset-0 bg-zinc-950/50 group-hover/thumb:bg-zinc-950/20 transition-all" />}
                {/* Expand hint on active thumb hover */}
                {i === activeBatch && (
                  <div
                    className="absolute inset-0 bg-zinc-950/0 group-hover/thumb:bg-zinc-950/40 transition-all flex items-center justify-center opacity-0 group-hover/thumb:opacity-100"
                    onClick={e => { e.stopPropagation(); openLightbox(batch.src, batch.label); }}
                  >
                    <FiMaximize2 size={14} className="text-white" />
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          VIDEO SECTION — YouTube embed
      ══════════════════════════════════════ */}
      <section className="py-24 bg-white dark:bg-zinc-900 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="flex flex-col items-center justify-center text-center mb-16">
            <span className="text-[11px] font-black tracking-[0.22em] uppercase text-[#003b93] dark:text-[#D4AF37] mb-4 block">
              Ceremony Highlights
            </span>

            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-gray-900 dark:text-white mb-6 leading-none">
              4th Enshrinement Ceremony
            </h2>

            <p className="text-gray-500 dark:text-zinc-500 font-medium leading-relaxed max-w-2xl mx-auto text-center">
              Relive the moments of triumph and the induction of our latest sporting heroes into the eternal halls of greatness.
            </p>
          </div>

          {/* YouTube embed with custom play overlay */}
          <div className="relative group rounded-2xl overflow-hidden shadow-2xl bg-zinc-900 aspect-video">

            {ytPlaying ? (
              /* ── Embedded YouTube iframe ── */
              <iframe
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${YT_VIDEO_ID}?autoplay=1&rel=0&modestbranding=1`}
                title="4th Hall of Fame Enshrinement Ceremony"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              /* ── Custom thumbnail + play overlay ── */
              <>
                {/* YouTube high-quality thumbnail as bg */}
                <img
                  src={`https://img.youtube.com/vi/${YT_VIDEO_ID}/maxresdefault.jpg`}
                  alt="4th Hall of Fame Enshrinement Ceremony"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  onError={e => { e.target.src = `https://img.youtube.com/vi/${YT_VIDEO_ID}/hqdefault.jpg`; }}
                />

                {/* Dim overlay */}
                <div className="absolute inset-0 bg-zinc-950/50" />

                {/* Play button */}
                <button
                  onClick={() => setYtPlaying(true)}
                  className="absolute inset-0 flex items-center justify-center z-10"
                  aria-label="Play video"
                >
                  <div
                    className="w-24 h-24 rounded-full flex items-center justify-center text-zinc-950 shadow-2xl transition-transform duration-300 hover:scale-110"
                    style={{ background: 'linear-gradient(135deg, #BF953F, #FCF6BA, #B38728)' }}
                  >
                    <FiPlay size={32} className="ml-1" />
                  </div>
                </button>

                {/* Bottom meta */}
                <div className="absolute bottom-8 left-8 right-8 z-10 pointer-events-none">
                  <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-zinc-400 mb-1">Live Recording</p>
                  <h3 className="text-white text-2xl font-black">The 2021 Hall of Fame Induction</h3>
                  <p className="text-zinc-300 text-sm font-medium">A Celebration of Resilience and Excellence</p>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          CALL FOR NOMINATIONS
      ══════════════════════════════════════ */}
      <section className="py-24 bg-gray-50 dark:bg-zinc-950 px-6 md:px-10 transition-colors duration-300">
        <div className="max-w-7xl mx-auto">
          <div
            className="relative rounded-3xl overflow-hidden p-12 md:p-20"
            style={{
              background: darkMode
                ? '#18181b'
                : 'linear-gradient(135deg, #001f5b 0%, #003b93 50%, #0a1f4a 100%)',
            }}
          >
            {/* Decorative blobs */}
            <div
              className="absolute -top-1/2 -left-1/4 w-full h-full rounded-full opacity-20 blur-[120px]"
              style={{ background: darkMode ? '#27272a' : '#0051c3' }}
            />
            <div
              className="absolute -bottom-1/2 -right-1/4 w-full h-full rounded-full opacity-10 blur-[120px]"
              style={{ background: '#D4AF37' }}
            />

            {/* Gold top border */}
            <div
              className="absolute top-0 left-0 right-0 h-[2px]"
              style={{ background: 'linear-gradient(90deg, transparent, #D4AF37, transparent)' }}
            />

            <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center gap-16">

              {/* Left: text */}
              <div className="flex-1">
                {/* Super bold large heading */}
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-white dark:text-white leading-none tracking-tighter mb-4">
                  Continuing the{' '}
                  <span
                    className="text-transparent bg-clip-text"
                    style={{ backgroundImage: 'linear-gradient(135deg, #BF953F, #FCF6BA, #D4AF37)' }}
                  >
                    Legacy.
                  </span>
                </h2>

                {/* Smaller body text, fixed the HTML typo in className */}
                <p
                  className="text-sm leading-relaxed max-w-xl font-medium mb-12"
                  style={{ color: darkMode ? 'rgba(200,200,210,0.75)' : 'rgb(219,234,254)' }}
                >
                  Do you know a Filipino athlete, coach, or trainer whose contributions have reshaped our sporting history? Help us identify the next set of legends to be immortalized in the Philippine Sports Hall of Fame.
                </p>

                {/* Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-12 mb-8">
                  <div className="flex gap-4">
                    <FiCheckCircle size={20} className="text-[#D4AF37] flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-white font-bold text-sm mb-1">Qualification Check</h4>
                      <p
                        className="text-xs leading-relaxed font-medium"
                        style={{ color: darkMode ? 'rgba(180,180,190,0.70)' : 'rgb(147,197,253)' }}
                      >
                        Nominees must have competed or served at the highest level of international competition.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <FiCalendar size={20} className="text-[#D4AF37] flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-white font-bold text-sm mb-1">Open Submission</h4>
                      <p
                        className="text-xs leading-relaxed font-medium"
                        style={{ color: darkMode ? 'rgba(180,180,190,0.70)' : 'rgb(147,197,253)' }}
                      >
                        Nominations are currently open for the 5th Enshrinement Batch.
                      </p>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleNominate}
                  className="inline-flex items-center gap-3 px-10 py-5 rounded-full font-black uppercase tracking-widest text-sm transition-all hover:opacity-90 active:scale-95 shadow-[0_0_40px_rgba(212,175,55,0.4)]"
                  style={{
                    background: 'linear-gradient(135deg, #BF953F, #FCF6BA, #B38728, #FBF5B7, #AA771C)',
                    color: darkMode ? '#09090b' : '#003b93',
                  }}
                >
                  Nominate a Legend
                  <FiArrowRight size={16} />
                </button>
              </div>

              {/* Right: deadline cards */}
              <div className="w-full lg:w-72 flex flex-col gap-4">
                <div
                  className="backdrop-blur-lg rounded-2xl p-8 border"
                  style={{
                    background: darkMode ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.10)',
                    borderColor: darkMode ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.10)',
                  }}
                >
                  <p className="text-white/60 text-xs font-bold uppercase tracking-widest mb-3">
                    Deadline for Submission
                  </p>
                  <p className="text-white text-3xl font-black leading-tight">
                    October 31,<br />2024
                  </p>
                </div>

                <div
                  className="backdrop-blur-lg rounded-2xl p-6 border"
                  style={{
                    background: darkMode ? 'rgba(255,255,255,0.02)' : 'rgba(255,255,255,0.05)',
                    borderColor: darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.10)',
                  }}
                >
                  <p className="text-white/60 text-xs font-bold uppercase tracking-widest mb-2">
                    Current Open Batch
                  </p>
                  <p className="text-[#D4AF37] text-xl font-black">5th Enshrinement</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default HallOfFame;